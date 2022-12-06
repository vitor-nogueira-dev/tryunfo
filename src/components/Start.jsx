import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Card from './Card';
import './css/Start.css';

export default class Start extends Component {
  render() {
    const { start, nextCard } = this.props;
    return (
      <div>
        <div className="start">
          {
            start
              .filter((card, position) => position === nextCard)
              .map((card) => (
                <div className="cards" key={ card.cardName }><Card { ...card } /></div>
              ))
          }
        </div>
      </div>
    );
  }
}

Start.propTypes = {
  start: PropTypes.bool,
  nextCard: PropTypes.number,
}.isRequired;
