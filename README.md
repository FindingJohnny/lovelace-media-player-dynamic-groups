# Media Player Dynamic Groups Card

Media Player Dynamic Groups is a card to help dynaically show media_players depending on which speakers/speaker groups are currently playing.

![Screenshot - Expanded Group Volume Controls](/docs/media-player-dynamic-groups-expanded?raw=true "Screenshot")
![Screenshot - Collapsed Group Volume Controls](/docs/media-player-dynamic-groups-collapsed?raw=true "Screenshot")

## Required 

## Options

| Name | Type | Requirement | Description | Default |
| ---- | ---- | ----------- | ----------- | ------- |
| `type` | string | **Required** | `media-player-dynamic-groups` | |
| `title` | string  | **Optional** | Header of the card | |
| `cards` | object  | **Required** | The media_player card you want to embed. Note this card must have a property called `entity` | `none` |
| `media_player_tree` | object | **Required** | The tree of Media Player Entities used to determine which media_player(s) is/are currently shown. See [Media Player Tree Object](#media-player-tree-object) | |
| `keep` | object | **Optional** | See [keep object](#keep-object). Come directly from [stack-in-card](https://github.com/custom-cards/stack-in-card). | |

## Media Player Tree Object

| Name | Type | Requirement | Description |
| `entityId` | string | true | 'entityId' of a media player |
| `children` | `MediaPlayerTree[]` | false | Optional additional `MediaPLayerTree` child objects |

## Keep Object

| Name | Type | Requirement | Description | Default |
| ---- | ---- | ----------- | ----------- | ------- |
| `background` | boolean | **Optional** | Will keep the background on **all** the child cards. To keep the background on specific cards only, assign the CSS variable `--keep-background: 'true'` on the card where you want to keep the background.  | `false` |
| `box_shadow` | boolean | **Optional** | Will keep the `box-shadow` on **all** the child cards | `false` |
| `margin` | boolean | **Optional** | Will keep the `margin` between **all** the child cards | `false` |
| `outer_padding` | boolean | **Optional** | Will add a `padding` of `8px` to the card if `margin` is `true` | `true` if `margin` is `true`, else false |
| `border_radius` | boolean | **Optional** | Will keep the `border-radius` on **all** the child cards | `false` |

## Example Card Config Yaml

**Note:** 'media_player_group_tree' must be made entirely of media_player entities and have only 1 entity at it's root.

``` yaml
type: 'custom:group-media-players'
media_player_group_tree:
  entityId: media_player.all_speakers
  children:
    - entityId: media_player.upstairs_speakers
      children:
        - entityId: media_player.office_speaker
        - entityId: media_player.bedroom_speaker
        - entityId: media_player.stairs_speaker
        - entityId: media_player.bedroom_clock
    - entityId: media_player.downstairs_speakers
      children:
        - entityId: media_player.living_room_speaker
        - entityId: media_player.kitchen_speaker
        - entityId: media_player.poker_room_speaker
card:
  type: 'custom:mini-media-player'
  artwork: cover
  hide:
    power: true
    icon: true
    source: true
```

## Installation

Use [HACS](https://hacs.xyz) or follow this [guide](https://github.com/thomasloven/hass-config/wiki/Lovelace-Plugins)

### Raw Yaml Configuration for [HACS](https://hacs.netlify.com/)

```
resources:
  - url: /community_plugin/group-media-player/group-media-player.js
    type: js
```

## Special Thanks

Templated from [stack-in-card](https://github.com/custom-cards/stack-in-card)

- Great code here. Really helped with managing state through various sub-cards.

## Notice

- Still in development.
- This is software I write in my freetime to make Home Assistant's UI better for my own personal use! I'm happy to share it! But please know you are using it at your own risk! :)