import { LovelaceCardConfig } from 'custom-card-helpers';

export interface MediaPlayerDynamicGroupsConfig {
  type: string;
  media_player_tree: MediaPlayerTree;
  card: LovelaceCardConfig;
  show_speaker_selector: boolean;
  title?: string;
  keep?: KeepConfig;
}

export interface KeepConfig {
  margin?: boolean;
  background?: boolean;
  box_shadow?: boolean;
  border_radius?: boolean;
  outer_padding?: boolean;
}

export interface MediaPlayerTree {
  entityId: string;
  children?: MediaPlayerTree[];
}

export interface MediaPlayerTreeWithState {
  entityId: string;
  children?: MediaPlayerTreeWithState[];
  entityState: MediaPlayerState;
}

export enum MediaPlayerState {
  OFF = 'off',
  IDLE = 'idle',
  PLAYING = 'playing',
  UNAVAILABLE = 'unavailable',
  PAUSED = 'paused',
}
