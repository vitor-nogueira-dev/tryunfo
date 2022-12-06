import PropTypes from 'prop-types';
import React, { Component } from 'react';
import './css/FilterSearch.css';

export default class FilterSearch extends Component {
  render() {
    const {
      searchFilterName,
      searchInputTrunfo,
      searchFilterRare,
      searchTrunfo,
    } = this.props;
    return (
      <div className="search">
        <label htmlFor="filterName">
          <input
            placeholder="pesquisar por nome"
            type="text"
            name="filterName"
            id="filterName"
            data-testid="name-filter"
            onChange={ searchFilterName }
            disabled={ searchTrunfo }
          />
        </label>
        <label htmlFor="searchRare">
          Buscar por Raridade
          <select
            name="searchRare"
            id="searchRare"
            data-testid="rare-filter"
            onChange={ searchFilterRare }
            disabled={ searchTrunfo }
          >
            <option value="todas">todas</option>
            <option value="normal">normal</option>
            <option value="raro">raro</option>
            <option value="muito raro">muito raro</option>
          </select>
        </label>
        <label htmlFor="searchTrunfo" className="search-trunfo">
          Super Trunfo ?
          <input
            type="checkbox"
            name="searchTrunfo"
            id="searchTrunfo"
            data-testid="trunfo-filter"
            onChange={ searchInputTrunfo }
          />
        </label>
      </div>
    );
  }
}

FilterSearch.propTypes = {
  searchFilterName: PropTypes.func,
  searchFilterRare: PropTypes.func,
  searchInputTrunfo: PropTypes.func,
  searchTrunfo: PropTypes.func,
}.isRequired;
