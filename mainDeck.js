import Deck from './deck.js';

class MainDeck extends Deck {
  constructor(cards, location) {
    super(cards, location);
    this.currentShow = this.numberOfCards - 1;
    this.reverseDeck = document.querySelector(".reverse");
  }
  remove(selected) {
    this.cards.splice(selected,1);
    this.currentShow += 1;
    this.showNext();
  }
  getEmptyHTML() {
    const emptyDiv = document.createElement("div");
    emptyDiv.classList.add("empty-space");
    return emptyDiv;
  }
  render() {
    this.location.innerHTML = "";
    let cardDiv = this.cards[this.currentShow].getHTML();
    cardDiv.setAttribute("id", this.currentShow);
    this.location.appendChild(cardDiv);
  }
}

export default MainDeck;