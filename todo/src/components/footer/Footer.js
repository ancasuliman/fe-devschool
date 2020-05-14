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

  static get properties() {
    return {
      address: { type: Object },
    };
  }

  constructor() {
    super();

    this.coordinates = null;
    this.getLocation();
  }

  success(pos) {
    const coordinates = {
      latitude: pos.coords.latitude,
      longitude: pos.coords.longitude,
    };

    this.getAddress(coordinates);
  }

  error(err) {
    if (err.code === 1) {
      alert('Error: Access is denied!');
    } else if (err.code === 2) {
      alert('Error: Position is unavailable!');
    }
  }

  getLocation() {
    const options = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0,
    };

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(this.success.bind(this), this.error, options);
    }
  }

  async getAddress(coordinates) {
    let response = await fetch(
      `https://nominatim.openstreetmap.org/reverse?format=json&
          lat=${coordinates.latitude}&
          lon=${coordinates.longitude}
          `
    );

    if (response.ok) {
      const data = await response.json();
      this.address = data.display_name;
    }
  }

  render() {
    return html`
      <footer>
        <p>My location is ${this.address}</p>
      </footer>
    `;
  }
}

window.customElements.define('todo-footer', Footer);
