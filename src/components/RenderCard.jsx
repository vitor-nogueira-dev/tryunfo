import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Card from './Card';
import './css/RenderCard.css'

export default class RenderCard extends Component {
  getSavedCard = () => {
    const { addCart } = this.props;
    const array = localStorage.getItem('cards');
    return array ? JSON.parse(array) : addCart;
  };

  render() {
    const { filterName, searchRare, searchTrunfo, deleteCard } = this.props;
    return (
      <div className="container-cards">
        {this.getSavedCard()
          .filter(({ cardName }) => cardName.toLowerCase()
            .includes(filterName))
          .filter((cart) => (searchRare === 'todas'
            ? cart : cart.cardRare === searchRare))
          .filter((cart) => (searchTrunfo ? cart.cardTrunfo : cart))
          .map((carta, index) => (
            <div key={ index } className="cards">
              <Card { ...carta } />
              <button
                className="btn btn-danger"
                type="button"
                value={ carta.cardName }
                data-testid="delete-button"
                onClick={ () => deleteCard(carta.cardName, carta.cardTrunfo) }
              >
                Excluir
              </button>
            </div>
          ))}
      </div>

    );
  }
}

RenderCard.propTypes = {
  addCart: PropTypes.shape({
    filter: PropTypes.func,
  }),
  deleteCard: PropTypes.func,
  filterName: PropTypes.string,
  searchRare: PropTypes.string,
  searchTrunfo: PropTypes.any,
}.isRequired;
