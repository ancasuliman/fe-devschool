import { LitElement, html } from 'lit-element';
import { read, append, remove } from '../storage';

import './header/Header';
import './content/NewItem';
import './content/Items';
import './footer/Footer';

export class ToDo extends LitElement {
  static get properties() {
    return {
      todoItems: { type: Array },
    };
  }

  constructor() {
    super();

    this.todoItems = read();
  }

  render() {
    return html`
      <todo-header>My header</todo-header>
      <todo-new-item @item-added=${this._onItemAdded}></todo-new-item>
      <todo-items .todoItems=${this.todoItems} @delete-item=${this._onDeleteItem}></todo-items>
      <todo-footer></todo-footer>
    `;
  }

  _onItemAdded(event) {
    const newTodoItem = event.detail;
    append(newTodoItem);
    this.todoItems = read();
  }

  _onDeleteItem(event) {
    const toDelete = event.detail;
    remove(toDelete);
    this.todoItems = read();
  }
}
