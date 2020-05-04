import { LitElement, html } from 'lit-element';

import './AppHeader';
import './AppFooter';
import './AppContent';

export class AppMain extends LitElement {
  static get properties() {
    return {
      year: { type: Number },
      title: { type: String },
    };
  }

  constructor() {
    super();
    this.year = 2020;
    this.title = 'Hello';
  }

  render() {
    return html`
      <app-header title=${this.title}></app-header>
      <app-content @button-pressed=${this._onFormChanged}></app-content>
      <app-footer year=${this.year}></app-footer>
    `;
  }

  _onFormChanged(event) {
    if (event.detail.year) {
      this.year = event.detail.year;
    }

    if (event.detail.title) {
      this.title = event.detail.title;
    }
  }
}
