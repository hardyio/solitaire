import Deck from './deck.js';

class DestinationDeck extends Deck {
  constructor(cards, location) {
    super(cards, location);
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