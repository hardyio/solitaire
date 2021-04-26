import Deck from './deck.js';

class Solitaire{
  constructor() {
    this.deck = new Deck();
  }
  startGame() {
    this.deck.shuffle();
    console.log(this.deck);
  }
}

let game = new Solitaire();
game.startGame();