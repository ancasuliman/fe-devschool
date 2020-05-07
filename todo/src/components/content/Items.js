import { LitElement, html, css } from 'lit-element';
import { styleMap } from 'lit-html/directives/style-map';
import { classMap } from 'lit-html/directives/class-map';

import './Item';

export class Items extends LitElement {
  static get styles() {
    return css`
      section {
        padding: 0 40px;
        font-size: 18px;
      }

      .even {
        background-color: #eee;
      }
      .odd {
        background-color: #f9f9f9;
      }
    `;
  }

  static get properties() {
    return {
      todoItems: { type: Array },
    };
  }

  buildTodoElements() {
    if (this.todoItems) {
      return this.todoItems.map((todoItem, index) => {
        if (index % 2 == 0)
          return html`
            <todo-item
              class=${classMap({ even: true })}
              .item=${todoItem}
              @delete-item=${this._onDeleteItem}
            ></todo-item>
          `;
        else
          return html`
            <todo-item
              class=${classMap({ odd: true })}
              .item=${todoItem}
              @delete-item=${this._onDeleteItem}
            ></todo-item>
          `;
      });
    }
  }

  render() {
    return html`
      <section>
        <h2>Your current tasks:</h2>
        <div>
          ${this.buildTodoElements()}
        </div>
      </section>
    `;
  }

  _onDeleteItem(event) {
    this.dispatchEvent(new CustomEvent('delete-item', { detail: event.detail }));
  }
}

window.customElements.define('todo-items', Items);
