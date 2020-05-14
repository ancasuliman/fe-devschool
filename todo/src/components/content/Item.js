import { LitElement, html, css } from 'lit-element';

export class Item extends LitElement {
  static get styles() {
    return css`
      .todo-item {
        display: flex;
        flex-direction: row;
      }

      .todo-item .todo-description {
        width: 70%;
      }

      .todo-item button {
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

      .todo-item button:hover {
        background-color: #bbb;
        border: none;
      }

      .todo-item .todo-dot {
        margin-left: 10px;
        height: 25px;
        width: 25px;
        border-radius: 50%;
        display: inline-block;
      }

      .todo-item .todo-category {
        display: flex;
        align-items: center;
        justify-content: flex-start;
        width: 20%;
      }

      .todo-item .todo-category-name {
        margin-left: 20px;
        margin-block-start: 0;
        margin-block-end: 0;
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
      <div class="todo-item">
        <p class="todo-description">${this.item.todo}</p>
        <div class="todo-category">
          <span class="todo-dot" style="background-color: ${this.item.color}"></span>
          <p class="todo-category-name">${this.item.category}</p>
        </div>
        <button @click=${this._onDeleteItem}>x</button>
      </div>
    `;
  }

  _onDeleteItem(event) {
    event.preventDefault();
    this.dispatchEvent(new CustomEvent('delete-item', { detail: this.item }));
  }
}

window.customElements.define('todo-item', Item);
