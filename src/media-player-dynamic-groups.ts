import { LitElement, customElement, property, TemplateResult, html, CSSResult } from 'lit-element';
import { ifDefined } from 'lit-html/directives/if-defined';
import { HomeAssistant, LovelaceCardConfig, createThing, LovelaceCard } from 'custom-card-helpers';
import { MagicMediaPlayerConfig, MediaPlayerTreeWithState, MediaPlayerTree } from './types';
import * as pjson from '../package.json';
import * as _ from 'lodash';
import { addStateToTree, getRootMediaPlayerView, buildMediaPlayerList } from './media-player-tree-helpers';

import styles from './styles';

console.info(
  `%c Media Player Dynamic Groups \n%c   Version ${pjson.version}   `,
  'color: orange; font-weight: bold; background: black',
  'color: white; font-weight: bold; background: dimgray',
);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const HELPERS = (window as any).loadCardHelpers ? (window as any).loadCardHelpers() : undefined;

@customElement('media-player-dynamic-groups')
// eslint-disable-next-line @typescript-eslint/no-unused-vars
class StackInCard extends LitElement implements LovelaceCard {
  @property() protected _card?: LovelaceCard;

  @property() protected _mediaPlayerView?: LovelaceCard;

  @property() protected _tree?: MediaPlayerTree;

  @property() protected _mediaPlayerList?: string[];

  @property() protected _treeWithState?: MediaPlayerTreeWithState;

  @property() private _config?: MagicMediaPlayerConfig;

  @property() private _hass?: HomeAssistant;

  protected shouldUpdate2(newState: MediaPlayerTreeWithState, currentState: MediaPlayerTreeWithState): boolean {
    const newString = JSON.stringify(newState);
    const currentString = JSON.stringify(currentState);
    return newString != currentString;
  }

  set hass(hass: HomeAssistant) {
    this._hass = hass;
    if (this._card) {
      this._card.hass = hass;
    }

    if (!this._tree) {
      return;
    }

    if (this._config) {
      const treeWithState = addStateToTree(this._tree, this._hass);
      if (this._treeWithState) {
        if (!this.shouldUpdate2(treeWithState, this._treeWithState)) {
          return;
        }
      }
      this._treeWithState = treeWithState;

      const mediaPlayerArray = getRootMediaPlayerView(this._treeWithState, this._config.card);
      // console.log(`Media Player Card Array; ${JSON.stringify(mediaPlayerArray)}`);

      const mediaPlayerStack = {
        type: `vertical-stack`,
        cards: mediaPlayerArray,
      };

      this._createCard(mediaPlayerStack).then(card => {
        this._card = card;
        this._waitForChildren(card, false);
        window.setTimeout(() => {
          if (!this._config?.keep?.background) this._waitForChildren(card, true);
          if (this._config?.keep?.outer_padding && this._card?.shadowRoot) {
            const stackRoot = this._card.shadowRoot.getElementById('root');
            if (stackRoot) stackRoot.style.padding = '8px';
          }
        }, 500);
      });
    }
  }

  public setConfig(config: MagicMediaPlayerConfig): void {
    if (!config.card) {
      throw new Error(`There is no card parameter defined`);
    }

    if (!config.media_player_tree) {
      throw new Error(`There is no media_player_tree parameter defined`);
    }

    //this._card = config.card;
    this._tree = config.media_player_tree;

    this._config = {
      ...config,
      keep: {
        background: false,
        margin: false,
        box_shadow: false,
        border_radius: false,
        ...config.keep,
      },
    };

    this._mediaPlayerList = buildMediaPlayerList(this._tree);

    if (this._config.keep?.margin && this._config.keep?.outer_padding === undefined)
      this._config.keep.outer_padding = true;
    // this._createCard({
    //   type: `${this._config.mode}-stack`,
    //   cards: this._config.cards,
    // }).then(card => {
    //   this._card = card;
    //   this._waitForChildren(card, false);
    //   window.setTimeout(() => {
    //     if (!this._config?.keep?.background) this._waitForChildren(card, true);
    //     if (this._config?.keep?.outer_padding && this._card?.shadowRoot) {
    //       const stackRoot = this._card.shadowRoot.getElementById('root');
    //       if (stackRoot) stackRoot.style.padding = '8px';
    //     }
    //   }, 500);
    // });
  }

  protected logToConsole(event: any, text = 'EMPTY'): void {
    if (!this._hass) {
      console.log('HASS undefined');
      console.log(this._hass);
      return;
    }

    console.log(`Event Fired: ${text} : ${JSON.stringify(event)}`);
    const json = {
      entity_id: text,
      force_playback: true,
    };
    console.log(json);

    this._hass.callService('spotcast', 'start', json);
  }

  protected buildMediaPlayerItems(mediaPlayer: string): TemplateResult {
    console.log(mediaPlayer);
    return html`
      <paper-item @click="${(event: any): void => this.logToConsole(event, '${item}')}">${mediaPlayer}</paper-item>
    `;
  }

  protected getSpeakerSelectorView(): TemplateResult {
    if (this._config?.show_speaker_selector == true) {
      return html`
        <div display="flex">
          <paper-dropdown-menu class="outputSelect" label="Current Target Speaker">
            <paper-listbox slot="dropdown-content">
              ${this._mediaPlayerList?.map(mediaPlayer => {
                return html`
                  <paper-item @click="${(event: any): void => this.logToConsole(event, mediaPlayer)}"
                    >${mediaPlayer}</paper-item
                  >
                `;
              })}
            </paper-listbox>
          </paper-dropdown-menu>
        </div>
      `;
    } else {
      return html``;
    }
  }

  protected render(): TemplateResult {
    if (!this._hass || !this._card || !this._config) {
      return html``;
    }

    return html`
      <ha-card header=${ifDefined(this._config.title)}>
        <div>${this._card}</div>
        ${this.getSpeakerSelectorView()}
      </ha-card>
    `;
  }

  private _updateStyle(e: LovelaceCard | null, withBg: boolean): void {
    if (!e) return;
    if (!this._config?.keep?.box_shadow) e.style.boxShadow = 'none';
    if (
      !this._config?.keep?.background &&
      withBg &&
      getComputedStyle(e)
        .getPropertyValue('--keep-background')
        .trim() !== 'true'
    ) {
      e.style.background = 'transparent';
    }
    if (!this._config?.keep?.border_radius) e.style.borderRadius = '0';
  }

  private _loopChildren(e: LovelaceCard, withBg: boolean): void {
    const searchElements = e.childNodes;
    searchElements.forEach(childE => {
      if ((childE as Element).tagName === 'media-player-dynamic-groups') return;
      if (!this._config?.keep?.margin && (childE as LovelaceCard).style) {
        (childE as LovelaceCard).style.margin = '0px';
      }
      this._waitForChildren(childE as LovelaceCard, withBg);
    });
  }

  private _updateChildren(element: LovelaceCard | undefined, withBg: boolean): void {
    if (!element) return;
    if (element.shadowRoot) {
      const card = element.shadowRoot.querySelector('ha-card') as LovelaceCard;
      if (!card) {
        // if (element.shadowRoot.querySelector('media-player-dynamic-groups')) return;
        const searchEles = element.shadowRoot.getElementById('root') || element.shadowRoot.getElementById('card');
        if (!searchEles) return;
        this._loopChildren(searchEles as LovelaceCard, withBg);
      } else {
        this._updateStyle(card, withBg);
      }
    } else {
      if (typeof element.querySelector === 'function' && element.querySelector('ha-card')) {
        this._updateStyle(element.querySelector('ha-card'), withBg);
      }
      this._loopChildren(element as LovelaceCard, withBg);
    }
  }

  private _waitForChildren(element: LovelaceCard | undefined, withBg: boolean): void {
    if (((element as unknown) as LitElement).updateComplete) {
      ((element as unknown) as LitElement).updateComplete.then(() => {
        this._updateChildren(element, withBg);
      });
    } else {
      this._updateChildren(element, withBg);
    }
  }

  private async _createCard(config: LovelaceCardConfig): Promise<LovelaceCard> {
    let element: LovelaceCard;
    if (HELPERS) {
      element = (await HELPERS).createCardElement(config);
    } else {
      element = createThing(config);
    }
    if (this._hass) {
      element.hass = this._hass;
    }
    if (element) {
      element.addEventListener(
        'll-rebuild',
        ev => {
          ev.stopPropagation();
          this._rebuildCard(element, config);
        },
        { once: true },
      );
    }
    return element;
  }

  private async _rebuildCard(element: LovelaceCard, config: LovelaceCardConfig): Promise<LovelaceCard> {
    const newCard = await this._createCard(config);
    element.replaceWith(newCard);
    this._card = newCard;
    window.setTimeout(() => {
      if (!this._config?.keep?.background) this._waitForChildren(this._card, true);
      if (this._config?.keep?.outer_padding && this._card?.shadowRoot) {
        const stackRoot = this._card.shadowRoot.getElementById('root');
        if (stackRoot) stackRoot.style.padding = '8px';
      }
    }, 500);
    return newCard;
  }

  public getCardSize(): number {
    return this._card && typeof this._card.getCardSize === 'function' ? this._card.getCardSize() : 1;
  }

  public static get styles(): CSSResult {
    return styles;
  }
}
