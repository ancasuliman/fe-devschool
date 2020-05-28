import { LitElement, html, css } from 'lit-element';
import { ibCardStyles } from '../styles/ib-card-styles.js';

class IbHistory extends LitElement {
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
      accounts: { type: Array },
      accountNumber: { type: String },
    };
  }

  constructor() {
    super();
  }

  render() {
    return html`
      <main class="ib-card profile profile-details history">
        <nav>
          <h1>Transactions History</h1>
          <div class="profile-actions">
            <button @click=${this._onClickBackToProfile}>
              <img src="../resources/previous.svg" />
              <span>Back to profile</span>
            </button>
          </div>
        </nav>
        <section>
          <h2>Incoming transactions</h2>
          <div class="history-transaction">
            <strong>Sender name</strong>
            <strong>Sender Account</strong>
            <strong>Sum transacted</strong>
            <strong>Transaction details</strong>
          </div>
          ${this._displayInHistory}
          <h2 style="margin-top: 2rem;">Outcoming transactions</h2>
          <div class="history-transaction">
            <strong>Receiver name</strong>
            <strong>Receiver Account</strong>
            <strong>Sum transacted</strong>
            <strong>Transaction details</strong>
          </div>
          ${this._displayOutHistory}
        </section>
      </main>
    `;
  }

  _onClickBackToProfile() {
    this.dispatchEvent(new CustomEvent('back-to-profile-clicked', { bubbles: true }));
  }

  get _displayInHistory() {
    if (this.accountNumber) {
      const account = this.accounts.filter(
        currentAccount => currentAccount.accountNumber === this.accountNumber
      );

      if (account && account[0].inTransactions) {
        return account[0].inTransactions.map(inTransaction => {
          return html`
            <div class="history-transaction">
              <p>${inTransaction.senderFirstName} ${inTransaction.senderLastName}</p>
              <p>${inTransaction.senderAccountNumber}</p>
              <p>${inTransaction.sum}$</p>
              <p>${inTransaction.details}</p>
            </div>
          `;
        });
      }
    }
  }

  get _displayOutHistory() {
    if (this.accountNumber) {
      const account = this.accounts.filter(
        currentAccount => currentAccount.accountNumber === this.accountNumber
      );

      if (account && account[0].outTransactions) {
        return account[0].outTransactions.map(outTransaction => {
          console.log(outTransaction.sum);
          return html`
            <div class="history-transaction">
              <p>${outTransaction.receiverFirstName} ${outTransaction.receiverLastName}</p>
              <p>${outTransaction.receiverAccountNumber}</p>
              <p>${outTransaction.sum}$</p>
              <p>${outTransaction.details}</p>
            </div>
          `;
        });
      }
    }
  }
}

window.customElements.define('ib-history', IbHistory);
