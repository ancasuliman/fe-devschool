import { LitElement, html, css } from 'lit-element';
import { ibCardStyles } from '../styles/ib-card-styles.js';

class IbLogin extends LitElement {
  static get styles() {
    return [
      ibCardStyles,
      css`
        :host {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          height: 100%;
          background-color: #f79f79;
        }
      `,
    ];
  }

  static get properties() {
    return {
      loginUnsuccessful: { type: Boolean },
    };
  }

  constructor() {
    super();

    this.loginUnsuccessful = false;
  }

  render() {
    return html`
      <section class="ib-card login">
        <h1>Member Login</h1>
        <strong ?hidden=${this.loginUnsuccessful === false}>Wrong username and/or password.</strong>
        <form @submit=${this._onSubmitLogin}>
          <input type="text" name="username" placeholder="Username" required />
          <input type="password" name="password" placeholder="Password" required />
          <button>Login</button>
        </form>
        <button @click=${this._onClickRegister}>Not a member? Register now!</button>
      </section>
    `;
  }

  _onSubmitLogin(event) {
    event.preventDefault();

    this.loginUnsuccessful = false;
    const fd = new FormData(event.target);
    const data = Object.fromEntries(fd);

    this._performLogin(data);
  }

  _onClickRegister() {
    this.dispatchEvent(new CustomEvent('register-clicked'));
  }

  async _performLogin(loginData) {
    const url = 'http://localhost:8080/session/login';
    const result = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
      body: JSON.stringify({
        username: loginData.username,
        password: loginData.password,
      }),
    });

    if (result.ok) {
      const data = await result.json();

      this.dispatchEvent(
        new CustomEvent('token-received', {
          detail: { username: loginData.username, token: data.token },
        })
      );
    } else {
      this.loginUnsuccessful = true;
    }
  }
}

window.customElements.define('ib-login', IbLogin);
