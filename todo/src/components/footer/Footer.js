import { LitElement, html, css } from 'lit-element';

export class Footer extends LitElement {
  // static get styles() {
  //   return css``;
  // }

  // static get properties() {
  //   return {};
  // }

  render() {
    return html`
      <footer>
        <p>LitElement To Do App &copy Anca Suliman</p>
      </footer>
    `;
  }
}

window.customElements.define('todo-footer', Footer);
