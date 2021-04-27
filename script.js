import Deck from './deck.js';
import MainDeck from './mainDeck.js';
import DestinationDeck from './destinationDeck.js';

class Solitaire{
  constructor() {
    this.deck = new Deck();
    this.mainDeck;
    this.mainDeckLocation = document.querySelector(".main-deck");
    this.destinations = [];
    this.destinationsLocations = Array.from(document.querySelectorAll(".destination"));
    this.piles = [];
    this.pilesLocations = Array.from(document.querySelectorAll(".location"));
    this.leftDeck = document.querySelector(".left-deck");
  }
  layoutCards() {
    let slicePoint = 24;
    this.mainDeck = new MainDeck(this.deck.cards.slice(0,slicePoint), this.mainDeckLocation);
    for (let i = 1; i < 8; i++) {
      this.piles.push(new Deck(this.deck.cards.slice(slicePoint, slicePoint + i), this.pilesLocations[i-1]));
      slicePoint += i;
    }
    for (let i = 0; i < 4; i++) {
      this.destinations.push(new DestinationDeck([], this.destinationsLocations[i]));
    }
    this.mainDeck.render();
    this.piles.forEach((pile) => {
      pile.render();
    });
    this.destinations.forEach((destination) => {
      destination.render();
    });
  }
  init() {
    this.leftDeck.addEventListener("click", (event) => {
      if(event.target.classList.contains("reverse")) {
        this.mainDeck.showNext();
      }
    });
  }
  startGame() {
    this.deck.shuffle();
    this.layoutCards();
    this.init();
  }
}

let game = new Solitaire();
game.startGame();