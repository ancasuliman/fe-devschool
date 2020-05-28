import { css } from 'lit-element';

export const ibCardStyles = css`
  .ib-card {
    color: #212121;
    background-color: #ececec;
    border: 1px solid #ececec;
    border-radius: 5px;
    height: auto;
    min-height: 500px;
    box-shadow: 2px 3px 15px rgba(0, 0, 0, 0.5);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-evenly;
    position: relative;
  }

  .ib-card.register,
  .ib-card.login {
    width: 100%;
    max-width: 400px;
  }

  .ib-card.profile {
    justify-content: flex-start;
    width: 100%;
    max-width: 1200px;
  }

  .ib-card.profile nav {
    background-color: #4e7e6f;
    display: flex;
    width: 100%;
    justify-content: space-between;
    min-height: 4rem;
    align-items: center;
  }

  .ib-card.profile nav * {
    color: #fff;
    font-weight: 600;
  }

  .ib-card.profile nav h1 {
    padding-left: 4rem;
  }

  .ib-card.profile nav .profile-actions {
    display: flex;
    padding-right: 4rem;
  }

  .profile-actions button {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    max-height: 3rem;
    padding-right: 1rem;
  }

  .profile-actions button img {
    height: 100%;
  }

  .ib-card h1 {
    margin-block-start: 0em;
    margin-block-end: 0em;
  }

  .ib-card.login strong {
    color: #e74f0d;
    font-weight: 600;
    top: 25%;
    position: absolute;
  }

  .ib-card.register strong {
    color: #4e7e6f;
    font-weight: 600;
  }

  .ib-card.profile > section {
    margin: 2rem;
  }

  .ib-card.profile-details > section {
    width: 100%;
  }

  .ib-card.profile-details h2 {
    margin: 0 4rem 2rem 4rem;
  }

  .ib-card.profile-new > section {
    margin-top: 4rem;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    position: relative;
  }

  .ib-card.profile-new p {
    position: absolute;
    top: -20%;
    color: #4e7e6f;
    font-weight: 600;
  }

  .ib-card.profile-new h2 {
    margin: 2rem 0;
  }

  .ib-card form {
    display: flex;
    flex-direction: column;
    width: 15rem;
  }

  .ib-card.profile-new form {
    width: 100%;
  }

  .ib-card form input {
    height: 2rem;
    margin-bottom: 1.5rem;
    background-color: #c2c2c2;
    border: 1px solid #c2c2c2;
    border-radius: 2px;
    padding-left: 0.5rem;
    color: #212121;
  }

  .ib-card form button {
    height: 2rem;
    margin-top: 1.5rem;
    background-color: #4e7e6f;
    border: 1px solid #4e7e6f;
    border-radius: 2px;
    color: #fff;
    font-weight: 600;
    cursor: pointer;
  }

  .ib-card button {
    background-color: transparent;
    border: none;
    cursor: pointer;
    font-weight: 600;
    color: #4e7e6f;
  }

  .profile-account {
    display: flex;
    align-items: baseline;
    margin: 0 4rem;
    width: auto;
  }

  .profile-account span {
    display: inline-block;
    border-bottom: 1px solid #212121;
    width: 70%;
    margin: 0 2rem;
  }

  .profile-account p {
    font-weight: 600;
    color: #4e7e6f;
  }

  .transaction p {
    font-weight: 600;
    color: #4e7e6f;
  }

  .history-transaction {
    display: flex;
    width: 80%;
    margin: 1rem 4rem;
    justify-content: space-between;
  }

  .profile-account button {
    display: flex;
    align-items: center;
    flex-direction: row;
  }

  .profile-account button span {
    margin: 0;
    border-bottom: none;
  }
`;
