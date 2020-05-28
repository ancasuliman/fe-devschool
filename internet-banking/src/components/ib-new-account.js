import { LitElement, html, css } from 'lit-element';
import { ibCardStyles } from '../styles/ib-card-styles.js';

class IbNewAccount extends LitElement {
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
      userdata: { type: Object },
      message: { type: String },
    };
  }

  constructor() {
    super();

    this.message = '';
  }

  render() {
    return html`
      <main class="ib-card profile profile-new">
        <nav>
          <h1>New Account</h1>
          <div class="profile-actions">
            <button @click=${this._onClickBackToProfile}>
              <img src="../resources/previous.svg" />
              <span>Back to profile</span>
            </button>
          </div>
        </nav>
        <section>
          <p>${this.message}</p>
          <h2>Set up your new account</h2>
          <form @submit=${this._onCreateNewAccount}>
            <input type="number" name="balance" placeholder="Balance" />
            <button>Create your account</button>
          </form>
        </section>
      </main>
    `;
  }

  _onClickBackToProfile() {
    this.dispatchEvent(new CustomEvent('back-to-profile-clicked', { bubbles: true }));
  }

  _onCreateNewAccount(event) {
    event.preventDefault();

    const fd = new FormData(event.target);
    const data = Object.fromEntries(fd);

    this._performCreateAccount(data);
  }

  async _performCreateAccount(accountData) {
    const url = 'http://localhost:8080/account';
    const myHeaders = new Headers({
      'Content-Type': 'application/json; charset=UTF-8',
      authorization: this.userdata.token,
    });

    const result = await fetch(url, {
      method: 'POST',
      headers: myHeaders,
      body: JSON.stringify({
        username: this.userdata.username,
        balance: accountData.balance,
      }),
    });

    if (result.status === 401 || result.status === 403) {
      alert('You do not have permission to perform this action.');
    }

    if (result.status === 400) {
      this.message = 'Could not perform action.';
    }

    if (result.ok) {
      const data = await result.json();
      this.message = `Account created successfully. Your account number is ${data.accountNumber}`;
    }
  }
}

window.customElements.define('ib-new-account', IbNewAccount);
