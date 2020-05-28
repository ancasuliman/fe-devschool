import { LitElement, html, css } from 'lit-element';
import { ibCardStyles } from '../styles/ib-card-styles.js';

class IbTransfer extends LitElement {
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
      <main class="ib-card profile transaction">
        <nav>
          <h1>New Transfer</h1>
          <div class="profile-actions">
            <button @click=${this._onClickBackToProfile}>
              <img src="../resources/previous.svg" />
              <span>Back to profile</span>
            </button>
          </div>
        </nav>
        <section>
          <p>${this.message}</p>
          <h2>Your transaction details</h2>
          <form @submit=${this._onSubmitTransaction}>
            <input type="text" name="accountNumberSender" placeholder="Your account number" />
            <input type="text" name="accountNumberReceiver" placeholder="Destination account" />
            <input type="number" name="sum" placeholder="Sum" />
            <input type="text" name="details" placeholder="Details" />
            <button>Transfer</button>
          </form>
        </section>
      </main>
    `;
  }

  _onSubmitTransaction(event) {
    event.preventDefault();

    const fd = new FormData(event.target);
    const data = Object.fromEntries(fd);

    this._performTransaction(data);
  }

  _onClickBackToProfile() {
    this.dispatchEvent(new CustomEvent('back-to-profile-clicked', { bubbles: true }));
  }

  async _performTransaction(transactionData) {
    const url = 'http://localhost:8080/transaction';
    const result = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
        authorization: this.userdata.token,
      },
      body: JSON.stringify({
        sum: transactionData.sum,
        details: transactionData.details,
        accountNumberSender: transactionData.accountNumberSender,
        accountNumberReceiver: transactionData.accountNumberReceiver,
      }),
    });

    if (result.ok) {
      const data = await result.json();

      this.message = 'Transaction made successfully.';
      this.dispatchEvent(new CustomEvent('transaction-made', { bubbles: true }));
    }
  }
}

window.customElements.define('ib-transfer', IbTransfer);
