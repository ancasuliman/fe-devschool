import { LitElement, html, css } from 'lit-element';

import './Item';

export class Items extends LitElement {
  // static get styles() {
  //   return css``;
  // }

  static get properties() {
    return {
      todoItems: { type: Array },
    };
  }

  buildTodoElements() {
    if (this.todoItems) {
      return this.todoItems.map(
        todoItem =>
          html` <todo-item .item=${todoItem} @delete-item=${this._onDeleteItem}></todo-item> `
      );
    }
  }

  render() {
    return html`
      <h2>Your current tasks:</h2>
      <ul>
        ${this.buildTodoElements()}
      </ul>
    `;
  }

  _onDeleteItem(event) {
    this.dispatchEvent(new CustomEvent('delete-item', { detail: event.detail }));
  }
}

window.customElements.define('todo-items', Items);
