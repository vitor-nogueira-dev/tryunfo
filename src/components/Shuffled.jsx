import PropTypes from 'prop-types';
import React, { Component } from 'react';

export default class Teste extends Component {
  render() {
    const { buttonShuffled, addCart, handleStart } = this.props;
    return (
      <div>
        <button
          className="btn btn-secondary"
          type="button"
          disabled={ buttonShuffled }
          onClick={ () => handleStart(addCart) }
        >
          Embaralhar Cartas
        </button>
      </div>
    );
  }
}

Teste.propTypes = {
  addCart: PropTypes.func,
  buttonShuffled: PropTypes.bool,
}.isRequired;

// const local = localStorage.getItem('cardsShuffled');
// const arrayGetStorage = JSON.parse(local);
// const cards = arrayGetStorage || start;
