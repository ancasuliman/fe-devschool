import { LitElement, html, css } from 'lit-element';

export class Header extends LitElement {
  // static get styles() {
  //   return css``;
  // }

  // static get properties() {
  //   return {};
  // }

  render() {
    return html`
      <header>
        <h1>To Do App</h1>
      </header>
    `;
  }
}

window.customElements.define('todo-header', Header);
