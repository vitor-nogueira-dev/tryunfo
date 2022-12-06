import React, { Component } from 'react';
import App from '../App';

export default class SetItemLocalStorage extends Component {
// removeCard = (name) => {
//   const cards = getCard();
//   const newCards = cards.filter((card) => card.cardName !== name);
  // localStorage.setItem('cards', JSON.stringify(newCards))
// };

  render() {
    return (
      <div>
        <App testes={ this.testes } />
        { this.testes() }
      </div>
    );
  }
}
