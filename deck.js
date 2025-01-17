import {SUITS, VALUES, CARD_VALUE_MAP} from './constants.js';

class Deck {
  constructor(cards = freshDeck(), location) {
    this.cards = cards;
    this.location = location;
    this.hiddenCards = this.numberOfCards - 1;
  }
  get numberOfCards() {
    return this.cards.length;
  }
  get last() {
    return this.cards[this.numberOfCards-1];
  }
  get isEmpty() {
    return this.numberOfCards === 0 ? true : false;
  }
  canPush(cardToPush) {
    if(this.numberOfCards === 0 && cardToPush.value === "K") {
      return true;
    }
    if(this.numberOfCards === this.hiddenCards) {
      return false;
    }
    if(cardToPush.color === this.last.color) {
      return false;
    }
    if(CARD_VALUE_MAP[cardToPush.value] + 1 != CARD_VALUE_MAP[this.last.value]) {
      return false;
    }
    return true;
  }
  push(cards) {
    cards.forEach((card) => {
      this.cards.push(card);
    });
    this.render();
  }
  remove(selected) {
    this.cards = this.cards.slice(0,selected);
    this.render();
  }
  flipLastCard() {
    this.hiddenCards -= 1;
    this.render();
  }
  shuffle() {
    for (let i = this.numberOfCards - 1; i > 0; i--) {
      const newIndex = Math.floor(Math.random() * (i + 1));
      const oldValue = this.cards[newIndex];
      this.cards[newIndex] = this.cards[i];
      this.cards[i] = oldValue;
    }
  }
  getEmptyHTML() {
    const emptyDiv = document.createElement("div");
    emptyDiv.classList.add("slot", "empty-slot");
    return emptyDiv;
  }
  render() {
    this.location.innerHTML= "";
    this.cards.forEach((card, index) => {
      let cardDiv
      if(index >= this.hiddenCards) {
        cardDiv = card.getHTML();
      } else {
        cardDiv = card.getReverseHTML();
      }
      cardDiv.setAttribute("id", index);
      this.location.appendChild(cardDiv);
    });
    if(this.isEmpty) {
      this.location.appendChild(this.getEmptyHTML());
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