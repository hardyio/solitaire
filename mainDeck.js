import Deck from './deck.js';

class MainDeck extends Deck {
  constructor(cards, location) {
    super(cards, location);
    this.currentShow = this.numberOfCards - 1;
    this.reverseDeck = document.querySelector(".reverse");
  }
  showNext() {
    this.currentShow -= 1;
    if(this.currentShow === this.numberOfCards) {
      this.currentShow = -1;
    }
    if(this.currentShow > 0) {
      this.render();
      return;
    }
    if(this.currentShow === 0) {
      this.reverseDeck.classList.add("hidden-reverse");
      this.render();
      return;
    }
    if(this.currentShow === -1) {
      if(this.numberOfCards) {
        this.reverseDeck.classList.remove("hidden-reverse");
      }
      this.location.innerHTML = "";
      this.location.appendChild(this.getEmptyHTML());
      return;
    }
    if(this.currentShow === -2) {
      this.currentShow = this.numberOfCards - 1;
      this.render()
      return;
    }
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