import {SUITS, VALUES} from './constants.js';

class Deck {
  constructor(cards = freshDeck(), location) {
    this.cards = cards;
    this.location = location;
  }
  get numberOfCards() {
    return this.cards.length;
  }
  get last() {
    return this.cards[this.numberOfCards-1];
  }
  shuffle() {
    for (let i = this.numberOfCards - 1; i > 0; i--) {
      const newIndex = Math.floor(Math.random() * (i + 1));
      const oldValue = this.cards[newIndex];
      this.cards[newIndex] = this.cards[i];
      this.cards[i] = oldValue;
    }
  }
}

class Card {
  constructor(suit, value) {
    this.suit = suit;
    this.value = value;
  }
  get color() {
    return this.suit === '♣' || this.suit === '♠' ? 'black' : 'red';
  }
  getHTML() {
    const cardDiv = document.createElement('div');
    cardDiv.innerText = this.suit;
    cardDiv.classList.add("slot", "card", this.color);
    cardDiv.dataset.value = `${this.value} ${this.suit}`;
    return cardDiv;
  }
  getReverseHTML() {
    const reverseDiv = document.createElement("div");
    reverseDiv.classList.add("slot", "reverse");
    return reverseDiv;
  }
}

const freshDeck = () => {
  return SUITS.flatMap(suit => {
    return VALUES.map(value => {
      return new Card(suit, value);
    });
  });
}

export default Deck;