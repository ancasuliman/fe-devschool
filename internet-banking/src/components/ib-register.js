import { LitElement, html, css } from 'lit-element';
import { ibCardStyles } from '../styles/ib-card-styles.js';

class IbRegister extends LitElement {
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
          background-color: #f7d08a;
        }
      `,
    ];
  }

  static get properties() {
    return {
      registered: { type: Boolean },
    };
  }

  constructor() {
    super();

    this.registered = false;
  }

  render() {
    return html`
      <section class="ib-card register">
        <h1>Register</h1>
        <strong ?hidden=${this.registered === false}>User registered successfully.</strong>
        <form @submit=${this._onSubmitRegister}>
          <input type="text" name="firstname" placeholder="First name" required />
          <input type="text" name="lastname" placeholder="Last name" required />
          <input type="text" name="username" placeholder="Username" required />
          <input type="password" name="password" placeholder="Password" required />
          <button>Register</button>
        </form>
        <button @click=${this._onClickLogin}>Already a member? Login here!</button>
      </section>
    `;
  }

  _onSubmitRegister(event) {
    event.preventDefault();

    this.registered = false;
    const fd = new FormData(event.target);
    const data = Object.fromEntries(fd);

    this._performRegister(data);
  }

  _onClickLogin() {
    this.dispatchEvent(new CustomEvent('login-clicked'));
  }

  async _performRegister(registerData) {
    const url = 'http://localhost:8080/user';
    const result = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
      body: JSON.stringify({
        firstName: registerData.firstname,
        lastName: registerData.lastname,
        username: registerData.username,
        password: registerData.password,
      }),
    });

    if (result.ok) {
      this.registered = true;
    }
  }
}

window.customElements.define('ib-register', IbRegister);
