import Deck from './deck.js';

class MainDeck extends Deck {
  constructor(cards, location) {
    super(cards, location);
    this.currentShow = this.numberOfCards - 1;
    this.reverseDeck = document.querySelector(".left-deck .reverse");
  }
  showNext() {
    this.currentShow -= 1;
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
  showPrevious() {
    if(this.currentShow === this.numberOfCards) {
      if(this.numberOfCards === 0) {
        this.reverseDeck.classList.add("hidden-reverse");
        this.reverseDeck.classList.remove("reverse");
      }
      this.location.innerHTML = "";
      this.location.appendChild(this.getEmptyHTML());
      return;
    }
    this.render();
  }
  remove(selected) {
    this.cards.splice(selected,1);
    this.showPrevious();
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