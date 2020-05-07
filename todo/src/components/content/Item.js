import { LitElement, html, css } from 'lit-element';

export class Item extends LitElement {
  // static get styles() {
  //   return css``;
  // }

  static get properties() {
    return {
      item: { type: Object },
    };
  }

  render() {
    return html`
      <li>
        <p>${this.item.todo}</p>
        <button @click=${this._onDeleteItem}>x</button>
      </li>
    `;
  }

  _onDeleteItem(event) {
    event.preventDefault();
    this.dispatchEvent(new CustomEvent('delete-item', { detail: this.item }));
  }
}

window.customElements.define('todo-item', Item);
