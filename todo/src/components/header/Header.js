import { LitElement, html, css } from 'lit-element';

export class Header extends LitElement {
  static get styles() {
    return css`
      header {
        text-align: center;
        padding: 20px 0;
        background-color: #adefd1ff;
      }
    `;
  }

  render() {
    return html`
      <header>
        <h1>To Do App</h1>
      </header>
    `;
  }
}

window.customElements.define('todo-header', Header);
