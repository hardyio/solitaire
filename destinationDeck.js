import Deck from './deck.js';

class DestinationDeck extends Deck {
  constructor(cards, location) {
    super(cards, location);
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