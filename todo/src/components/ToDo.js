import { LitElement, html } from 'lit-element';
import { read, append, remove } from '../storage';

import './header/Header';
import './content/NewItem';
import './content/Items';
import './footer/Footer';

export class ToDo extends LitElement {
  static get properties() {
    return {
      props: { type: Object },
    };
  }

  constructor() {
    super();

    this.props = {
      todoItems: read(),
      // categories: ['assignments', 'housework', 'personal', 'work'],
      categories: [
        this.buildCategory('assignments', '#adefd1'),
        this.buildCategory('housework', '#efadcb'),
        this.buildCategory('personal', '#efd1ad'),
        this.buildCategory('work', '#adcbef'),
      ],
    };
  }

  buildCategory(categoryString, colorString) {
    return {
      name: categoryString,
      color: colorString,
    };
  }

  render() {
    return html`
      <todo-header>My header</todo-header>
      <todo-new-item
        .categories=${this.props.categories}
        @item-added=${this._onItemAdded}
      ></todo-new-item>
      <todo-items
        .todoItems=${this.props.todoItems}
        @delete-item=${this._onDeleteItem}
      ></todo-items>
      <todo-footer></todo-footer>
    `;
  }

  _onItemAdded(event) {
    const newTodoItem = event.detail;
    append(newTodoItem);
    this.props = { ...this.props, todoItems: read() };
  }

  _onDeleteItem(event) {
    const toDelete = event.detail;
    remove(toDelete);
    this.props = { ...this.props, todoItems: read() };
  }
}
