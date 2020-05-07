import { MediaPlayerTree, MediaPlayerTreeWithState, MediaPlayerState, MediaPlayerDynamicGroupsConfig } from './types';
import { HomeAssistant, LovelaceCardConfig } from 'custom-card-helpers';

export function buildMediaPlayerList(tree: MediaPlayerTree): string[] {
  const list: string[] = [];
  list.push(tree.entityId);
  tree.children?.forEach(child => list.push(...buildMediaPlayerList(child)));
  return list;
}

export function mapStringToMediaPlayerState(value: string): MediaPlayerState {
  try {
    return value as MediaPlayerState;
  } catch {
    throw new Error(`Media Player does not have a state: ${value}`);
  }
}

export function addStateToTree(tree: MediaPlayerTree, hass: HomeAssistant): MediaPlayerTreeWithState {
  if (!(tree.entityId in hass.states)) {
    throw new Error(`Entity: ${tree.entityId} does not exist.`);
  }
  const treeWithState: MediaPlayerTreeWithState = {
    entityId: tree.entityId,
    children: tree.children?.map(child => addStateToTree(child, hass)),
    entityState: mapStringToMediaPlayerState(hass.states[tree.entityId].state),
  };
  return treeWithState;
}

export function mediaPlayerView(
  entityId: string,
  children: LovelaceCardConfig[],
  view: LovelaceCardConfig,
): LovelaceCardConfig[] {
  if (children.length == 0) {
    return [
      {
        ...view,
        entity: entityId,
      },
    ];
  }
  return [
    {
      ...view,
      entity: entityId,
    },
    {
      type: 'custom:fold-entity-row',
      head: {
        label: 'Speakers',
        type: 'section',
      },
      entities: children,
    },
  ];
}

export function volumeControlView(entityId: string): LovelaceCardConfig {
  return {
    type: 'custom:mini-media-player',
    entity: entityId,
    group: true,
    hide: {
      name: false,
      icon: true,
      info: true,
      power: true,
      source: true,
      sound_mode: true,
      controls: true,
      play_pause: true,
      play_stop: true,
      volume: false,
      mute: false,
      progress: true,
      runtime: true,
      artwork_border: true,
      power_state: true,
      icon_state: true,
      shuffle: true,
    },
  };
}

export function flattenLovelaceCardConfigArray(array: LovelaceCardConfig[][]): LovelaceCardConfig[] {
  return ([] as LovelaceCardConfig[]).concat(...array);
}

export function getVolumeControlViews(tree: MediaPlayerTreeWithState): LovelaceCardConfig[] {
  if (tree.children != null) {
    const children = flattenLovelaceCardConfigArray(tree.children?.map(child => getVolumeControlViews(child)));
    return children;
  } else {
    return [volumeControlView(tree.entityId)];
  }
}

export function getRootMediaPlayerView(
  tree: MediaPlayerTreeWithState,
  cardConfig: LovelaceCardConfig,
): LovelaceCardConfig[] {
  if (tree.entityState == MediaPlayerState.OFF || tree.entityState == MediaPlayerState.IDLE) {
    if (tree.children != null && tree.children != undefined) {
      return flattenLovelaceCardConfigArray(tree.children?.map(child => getRootMediaPlayerView(child, cardConfig)));
    }
    return [];
  }

  if (tree.entityState == MediaPlayerState.PLAYING || tree.entityState == MediaPlayerState.PAUSED) {
    let children: LovelaceCardConfig[] = [];
    if (tree.children != null && tree.children != undefined) {
      children = flattenLovelaceCardConfigArray(tree.children?.map(child => getVolumeControlViews(child)));
    }
    return mediaPlayerView(tree.entityId, children, cardConfig);
  }
  if (tree.entityState == MediaPlayerState.UNAVAILABLE) {
    return [
      {
        type: 'error',
      },
    ];
  }
  throw new Error(`ERROR: Bad Media Player State - ${tree.entityId} : ${tree.entityState}`);
}
