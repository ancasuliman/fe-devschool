import { LitElement, html, css } from 'lit-element';

export class NewItem extends LitElement {
  static get styles() {
    return css`
      .todo-new {
        padding: 30px 40px;
        text-align: center;
      }

      .todo-new:after {
        content: '';
        display: table;
        clear: both;
      }

      h2 {
        margin-bottom: 20px;
      }

      input {
        margin: 0;
        border: 1px solid #d9d9d9;
        border-radius: 0;
        width: 75%;
        padding: 10px;
        float: left;
        font-size: 16px;
        height: 20px;
      }

      .todo-add {
        padding: 10px;
        width: 22%;
        background: #d9d9d9;
        border: none;
        color: #555;
        float: left;
        text-align: center;
        font-size: 16px;
        cursor: pointer;
        transition: 0.3s;
        border-radius: 0;
        height: 42px;
      }

      .todo-add:hover {
        background-color: #bbb;
        border: none;
      }
    `;
  }

  // static get properties() {
  //   return {};
  // }

  render() {
    return html`
      <div class="todo-new">
        <h2>Add a new task</h2>
        <form id="formAdd" @submit=${this._onSubmitNewItem}>
          <input type="text" id="todo" name="todo" placeholder="Task description..." required />
          <button class="todo-add">Add</button>
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
