import { LitElement, html, css } from 'lit-element';

export class NewItem extends LitElement {
  // static get styles() {
  //   return css``;
  // }

  // static get properties() {
  //   return {};
  // }

  render() {
    return html`
      <div class="header">
        <h2 style="margin:5px">Add a new task</h2>
        <form id="formAdd" @submit=${this._onSubmitNewItem}>
          <input type="text" id="todo" name="todo" placeholder="Task description..." required />
          <button>Add</button>
        </form>
      </div>
    `;
  }

  _onSubmitNewItem(event) {
    event.preventDefault();

    const form = event.target;
    const data = new FormData(form);
    data.set('id', Date.now());
    const newTodoItem = Object.fromEntries(data);
    this.dispatchEvent(new CustomEvent('item-added', { detail: newTodoItem }));
  }
}

window.customElements.define('todo-new-item', NewItem);
