import { LitElement, html, css } from 'lit-element';
import { ibCardStyles } from '../styles/ib-card-styles.js';

class IbProfile extends LitElement {
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
    };
  }

  constructor() {
    super();
  }

  render() {
    return html`
      <main class="ib-card profile profile-details">
        <nav>
          <h1>Accounts for ${this.userdata.username}</h1>
          <div class="profile-actions">
            <button @click=${this._onClickTransfer}>
              <img src="../resources/transfer.svg" />
              <span>Transfer</span>
            </button>
            <button @click=${this._onClickNewAccount}>
              <img src="../resources/pen.svg" />
              <span>New Account</span>
            </button>
            <button @click=${this._onClickLogout}>
              <img src="../resources/logout.svg" />
              <span>Logout</span>
            </button>
          </div>
        </nav>
        <section>
          <h2>Accounts</h2>
          ${this._displayAccounts}
        </section>
      </main>
    `;
  }

  _onClickNewAccount() {
    this.dispatchEvent(new CustomEvent('new-account-clicked'));
  }

  _onClickTransfer() {
    this.dispatchEvent(new CustomEvent('transfer-clicked'));
  }

  _onClickLogout() {
    this.dispatchEvent(new CustomEvent('logout-clicked'));
  }

  get _displayAccounts() {
    if (this.accounts.length !== 0) {
      return this.accounts.map(account => {
        return html`
          <div class="profile-account">
            <h3>${account.accountNumber}</h3>
            <span></span>
            <p>${account.balance}$</p>
            <button @click=${() => this._onHistoryClicked(account.accountNumber)}>
              <img src="../resources/clock.svg" />
              <span>History</span>
            </button>
          </div>
        `;
      });
    }
  }

  _onHistoryClicked(accountNumber) {
    this.dispatchEvent(
      new CustomEvent('history-clicked', {
        detail: { accountNumber: accountNumber },
      })
    );
  }
}

window.customElements.define('ib-profile', IbProfile);
