import Deck from './deck.js';
import {CARD_VALUE_MAP} from './constants.js';

class DestinationDeck extends Deck {
  constructor(cards, location) {
    super(cards, location);
  }
  canPush(cardToPush) {
    if(this.numberOfCards) {
      if(CARD_VALUE_MAP[cardToPush.value] === CARD_VALUE_MAP[this.last.value] + 1 && cardToPush.suit === this.last.suit) return true;
    }
    if (cardToPush.value === "A") return true;
    return false;
  }
  push(card) {
    this.cards.push(card);
    this.render();
  }
  remove() {
    this.cards.pop();
    this.render();
  }
  render() {
    this.location.innerHTML= "";
    if(this.isEmpty) {
      this.location.appendChild(this.getEmptyHTML());
      return;
    }
    this.location.appendChild(this.last.getHTML());
  }
}

export default DestinationDeck;