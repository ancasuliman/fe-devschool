import { LitElement, html, css } from 'lit-element';
import { read, write, remove } from '../storage';

import './ib-login';
import './ib-register';
import './ib-profile';
import './ib-new-account';
import './ib-transfer';
import './ib-history';

class IbRouting extends LitElement {
  static get styles() {
    return css``;
  }

  static get properties() {
    return {
      page: { type: String },
      userdata: { type: Object },
      accounts: { type: Array },
      chosenAccount: { type: String },
      balanceChanged: { type: Boolean },
    };
  }

  constructor() {
    super();

    this.page = window.location.hash.substr(1);
    this.accounts = [];
    this.chosenAccount = '';
    this.balanceChanged = false;
    window.onhashchange = this._onHashChange.bind(this);
  }

  render() {
    return html`${this._pageTemplate} `;
  }

  _onHashChange(event) {
    const hash = new URL(event.newURL).hash;
    this.page = hash.substring(1);
  }

  _onTokenReceived(event) {
    this.userdata = { username: event.detail.username, token: event.detail.token };
    write(this.userdata);

    window.location.hash = 'profile';
  }

  _onRegisterClicked() {
    window.location.hash = 'register';
  }

  _onLoginClicked() {
    window.location.hash = '';
  }

  _onNewAccountClicked() {
    window.location.hash += '#new-account';
  }

  _onBackToProfileClicked() {
    window.location.hash = 'profile';
  }

  _onTransferClicked() {
    window.location.hash += '#transfer';
  }

  _onHistoryClicked(event) {
    this.chosenAccount = event.detail.accountNumber;
    window.location.hash += '#history';
  }

  _onTransactionMade() {
    this.balanceChanged = true;
  }

  _onLogoutClicked() {
    remove();
    window.location.hash = '';
  }

  async _performGetAccounts() {
    const base = 'http://localhost:8080/account';
    if (this.userdata) {
      const result = await fetch(`${base}?username=${this.userdata.username}`, {
        method: 'GET',
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
          authorization: this.userdata.token,
        },
      });

      if (result.ok) {
        const data = await result.json();
        if (this.accounts.length !== data.length || this.balanceChanged === true)
          this.accounts = data;
      }
    }
  }

  get _pageTemplate() {
    if (!this.page) {
      return html`
        <ib-login
          @token-received=${this._onTokenReceived}
          @register-clicked=${this._onRegisterClicked}
        ></ib-login>
      `;
    }

    if (this.page === 'register') {
      return html` <ib-register @login-clicked=${this._onLoginClicked}></ib-register> `;
    }

    if (!this.userdata) {
      this.userdata = read();
      if (this.userdata == '') {
        window.location.hash = '';
        return html``;
      }
    }

    if (this.page === 'profile') {
      this._performGetAccounts();

      return html`
        <ib-profile
          .userdata=${this.userdata}
          .accounts=${this.accounts}
          @new-account-clicked=${this._onNewAccountClicked}
          @transfer-clicked=${this._onTransferClicked}
          @history-clicked=${this._onHistoryClicked}
          @logout-clicked=${this._onLogoutClicked}
        ></ib-profile>
      `;
    }

    if (this.page === 'profile#new-account') {
      return html`
        <ib-new-account
          .userdata=${this.userdata}
          @back-to-profile-clicked=${this._onBackToProfileClicked}
        ></ib-new-account>
      `;
    }

    if (this.page === 'profile#transfer') {
      return html`<ib-transfer
        .userdata=${this.userdata}
        @back-to-profile-clicked=${this._onBackToProfileClicked}
        @transaction-made=${this._onTransactionMade}
      ></ib-transfer>`;
    }

    if (this.page === 'profile#history') {
      this._performGetAccounts();

      return html`
        <ib-history
          @back-to-profile-clicked=${this._onBackToProfileClicked}
          .accountNumber=${this.chosenAccount}
          .accounts=${this.accounts}
        ></ib-history>
      `;
    }
  }
}

window.customElements.define('ib-routing', IbRouting);
