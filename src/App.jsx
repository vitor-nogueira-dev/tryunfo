import React from 'react';
import Card from './components/Card';
import Form from './components/Form';
import Start from './components/Start';
import NextCard from './components/NextCard';
import './components/App.css';
import Shuffled from './components/Shuffled';
import FilterSearch from './components/FilterSearch';
import RenderCard from './components/RenderCard';
import Footer from './components/Footer';

const INITIAL_STATE = {
  cardName: '',
  cardDescription: '',
  cardAttr1: 0,
  cardAttr2: 0,
  cardAttr3: 0,
  cardImage: '',
  cardRare: '',
};

class App extends React.Component {
  state = {
    ...INITIAL_STATE,
    cardTrunfo: false,
    hasTrunfo: false,
    isSaveButtonDisabled: true,
    addCart: [],
    filterName: '',
    searchRare: 'todas',
    searchTrunfo: false,
    start: [],
    firstRound: false,
    disabledStart: true,
    disabledNextCard: true,
    nextCard: 0,
    buttonShuffled: true,
    cardsRest: 0,
  };

  handleValidateData = () => {
    const {
      cardName,
      cardDescription,
      cardImage,
      cardRare,
      cardAttr1,
      cardAttr2,
      cardAttr3,
    } = this.state;
    const number = 90;
    const numberSum = 210;
    const validateName = cardName.length !== 0;
    const validateDescription = cardDescription.length !== 0;
    const validateImage = cardImage.length !== 0;
    const validateRare = cardRare.length !== 0; // pesquisar sobre para informar ao lucas tavares.
    const validateAttr1 = Number(cardAttr1) >= 0 && Number(cardAttr1) <= number;
    const validateAttr2 = Number(cardAttr2) >= 0 && Number(cardAttr2) <= number;
    const validateAttr3 = Number(cardAttr3) >= 0 && Number(cardAttr3) <= number;
    const validateSum = Number(cardAttr1)
    + Number(cardAttr2) + Number(cardAttr3) <= numberSum;
    this.setState({
      isSaveButtonDisabled:
      !(validateName
        && validateDescription
        && validateImage
        && validateRare
        && validateAttr1
        && validateAttr2
        && validateAttr3
        && validateSum
      ),
    });
  };

  onInputChange = ({ target: { name, value, checked } }) => {
    const newValue = (name === 'cardTrunfo' ? checked : value);

    this.setState({ [name]: newValue }, this.handleValidateData);
  };

  getCard = () => {
    const getItem = localStorage.getItem('cards');
    return getItem ? JSON.parse(getItem) : [];
  };

  setCard = () => {
    const { addCart } = { ...this.state };
    localStorage.setItem('cards', JSON.stringify(addCart));

    const cardsShufled = [...addCart];
    const number = 0.5;
    const shuffled = cardsShufled.sort(() => Math.random() - number);
    localStorage.setItem('cardsShuffled', JSON.stringify(shuffled));
    console.log(addCart);
  };

  onSaveButtonClick = (event) => {
    const { cardTrunfo } = this.state;
    event.preventDefault();
    const { ...state } = this.state;

    if (cardTrunfo) {
      this.setState({
        hasTrunfo: true,
        cardTrunfo: false,
      });
    }
    const storage = this.getCard('cards');
    console.log(storage);
    const newCart = { ...state };
    this.setState(() => ({
      addCart: [...storage, newCart],
      ...INITIAL_STATE,
      isSaveButtonDisabled: true,
    }), this.setCard);

    this.setState({ disabledStart: false });
  };

  deleteCard = (name, trunfo) => {
    const arrayStorage = this.getCard();
    console.log(arrayStorage);
    if (trunfo) {
      const cardsRestantes = arrayStorage.filter((card) => card.cardTrunfo !== trunfo);
      localStorage.setItem('cards', JSON.stringify(cardsRestantes));
      localStorage.setItem('cardsShuffled', JSON.stringify(cardsRestantes));
      this.setState({
        addCart: [...cardsRestantes],
        hasTrunfo: false,
        cardTrunfo: false,
      });
    } else {
      const cardsRestantes = arrayStorage.filter((e) => e.cardName !== name);
      localStorage.setItem('cards', JSON.stringify(cardsRestantes));
      localStorage.setItem('cardsShuffled', JSON.stringify(cardsRestantes));
      this.setState({
        addCart: [...cardsRestantes],
      });
    }
  };

  searchFilterName = ({ target: { value } }) => {
    this.setState({ filterName: value.toLowerCase() });
  };

  searchFilterRare = ({ target: { value } }) => {
    this.setState({ searchRare: value });
  };

  searchInputTrunfo = ({ target: { checked } }) => {
    this.setState({ searchTrunfo: checked });
  };

  handleStart = (cards) => {
    const number = 0.5;
    const cardsShufled = [...cards];
    const shuffled = cardsShufled.sort(() => Math.random() - number);

    localStorage.setItem('cardsShuffled', JSON.stringify(shuffled));

    this.setState({
      start: [...shuffled],
      disabledNextCard: false,
      cardsRest: shuffled.length,
    });
  };

  handleNextCart = (number) => {
    this.setState((prevState) => ({
      nextCard: prevState.nextCard + number,
      cardsRest: prevState.cardsRest - number,
    }));
    const { nextCard, start } = this.state;
    const lastLetter = (start.length - 1);

    if (nextCard === lastLetter) {
      this.setState({
        buttonShuffled: false,
        nextCard: 0,
        disabledNextCard: true,
      });
    }
  };

  render() {
    const { cardsRest, disabledStart, addCart } = this.state;
    return (
      <div>
        <h1 className="fs-1 title"> Super Trunfo</h1>
        <div className="container-form">
          <div className="form">
            <Form
              { ...this.state }
              onInputChange={ this.onInputChange }
              onSaveButtonClick={ this.onSaveButtonClick }
            />
          </div>
          <div className="preview-card">
            <Card
              { ... this.state }
            />
          </div>
        </div>
        <FilterSearch
          { ...this.state }
          searchFilterName={ this.searchFilterName }
          searchFilterRare={ this.searchFilterRare }
          searchInputTrunfo={ this.searchInputTrunfo }
        />
        <RenderCard
          { ...this.state }
          deleteCard={ this.deleteCard }
        />
        <div className="container-start">
          <div>
            <button
              className="btn btn-primary"
              disabled={ !!disabledStart }
              type="button"
              onClick={ () => this.handleStart(addCart) }
            >
              Jogar
            </button>
          </div>
          <Start
            { ...this.state }
            handleStart={ this.handleStart }
            handleNextCart={ this.handleNextCart }
          />
          <div>
            <NextCard { ...this.state } handleNextCart={ this.handleNextCart } />
            <div className="cardsRest">
              Cartas Restantes:
              {cardsRest}
            </div>
          </div>
          <Shuffled { ...this.state } handleStart={ this.handleStart } />
        </div>
        <Footer />
      </div>
    );
  }
}
export default App;
