import { LitElement, html, css } from 'lit-element';

export class Footer extends LitElement {
  static get styles() {
    return css`
      footer {
        box-sizing: border-box;
        position: absolute;
        padding: 0 40px;
        width: 900px;
        text-align: center;
      }
    `;
  }

  render() {
    return html`
      <footer>
        <p>LitElement To Do App &copy Anca Suliman</p>
      </footer>
    `;
  }
}

window.customElements.define('todo-footer', Footer);
