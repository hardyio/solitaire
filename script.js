import Deck from './deck.js';
import MainDeck from './mainDeck.js';

class Solitaire{
  constructor() {
    this.deck = new Deck();
    this.mainDeckLocation = document.querySelector(".main-deck");
    this.piles = [];
    this.pilesLocations = Array.from(document.querySelectorAll(".location"));
  }
  layoutCards() {
    let slicePoint = 24;
    this.mainDeck = new MainDeck(this.deck.cards.slice(0,slicePoint), this.mainDeckLocation);
    for (let i = 1; i < 8; i++) {
      this.piles.push(new Deck(this.deck.cards.slice(slicePoint, slicePoint + i), this.pilesLocations[i-1]));
      slicePoint += i;
    }
    this.mainDeck.render();
    this.piles.forEach((pile) => {
      pile.render();
    });
  }
  startGame() {
    this.deck.shuffle();
    this.layoutCards();
  }
}

let game = new Solitaire();
game.startGame();