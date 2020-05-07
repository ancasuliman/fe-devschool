import { LitElement, html, css } from 'lit-element';

export class Item extends LitElement {
  static get styles() {
    return css`
      li {
        display: flex;
        flex-direction: row;
      }

      li p {
        width: 90%;
      }

      li button {
        cursor: pointer;
        width: 10%;
        border: none;
        background-color: white;
        color: #555;
        float: left;
        text-align: center;
        font-size: 16px;
        transition: 0.3s;
        border-radius: 0;
      }

      li button:hover {
        background-color: #bbb;
        border: none;
      }
    `;
  }

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
