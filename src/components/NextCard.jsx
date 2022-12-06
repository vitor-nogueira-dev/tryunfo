import PropTypes from 'prop-types';
import React, { Component } from 'react';

export default class NextCard extends Component {
  render() {
    const { handleNextCart, disabledNextCard } = this.props;
    return (
      <div className="start">
        <button
          disabled={ disabledNextCard }
          className="next-card btn btn-warning"
          type="button"
          onClick={ () => handleNextCart(1) }
        >
          Próxima Carta
        </button>
      </div>
    );
  }
}

NextCard.propTypes = {
  disabledNextCard: PropTypes.bool,
  handleNextCart: PropTypes.func,
}.isRequired;
