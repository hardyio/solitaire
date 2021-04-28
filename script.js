import Deck from './deck.js';
import MainDeck from './mainDeck.js';
import DestinationDeck from './destinationDeck.js';

class Solitaire{
  constructor() {
    this.deck = new Deck();
    this.mainDeck;
    this.mainDeckLocation = document.querySelector(".main-deck");
    this.destinations = [];
    this.destinationsLocations = Array.from(document.querySelectorAll(".destination"));
    this.piles = [];
    this.pilesLocations = Array.from(document.querySelectorAll(".location"));
    this.leftDeck = document.querySelector(".left-deck");
    this.cardToCheck = false;
    this.selectedCards = {};
  }
  layoutCards() {
    let slicePoint = 24;
    this.mainDeck = new MainDeck(this.deck.cards.slice(0,slicePoint), this.mainDeckLocation);
    for (let i = 1; i < 8; i++) {
      this.piles.push(new Deck(this.deck.cards.slice(slicePoint, slicePoint + i), this.pilesLocations[i-1]));
      slicePoint += i;
    }
    for (let i = 0; i < 4; i++) {
      this.destinations.push(new DestinationDeck([], this.destinationsLocations[i]));
    }
    this.mainDeck.render();
    this.piles.forEach((pile) => {
      pile.render();
    });
    this.destinations.forEach((destination) => {
      destination.render();
    });
  }
  canMoveCards(from,to,cardsToMoveIndex) {
    if(from === 7) {
      if(to > 7) {
        return this.destinations[to - 8].canPush(this.mainDeck.cards[cardsToMoveIndex]);
      }
      return this.piles[to].canPush(this.mainDeck.cards[cardsToMoveIndex]);
    }
    if(from > 7) {
      return this.piles[to].canPush(this.destinations[from - 8].last);
    }
    if(to > 7) {
      return this.destinations[to - 8].canPush(this.piles[from].last);
    }
    return this.piles[to].canPush(this.piles[from].cards[cardsToMoveIndex]);
  }
  moveCards(from,to,cardsToMoveIndex) {
    if(this.canMoveCards(from,to,cardsToMoveIndex)) {
      if(from === 7) {
        if(to > 7) {
          this.destinations[to - 8].push(this.mainDeck.cards[cardsToMoveIndex]);
          this.mainDeck.remove(cardsToMoveIndex);
          return;
        }
        this.piles[to].push([this.mainDeck.cards[cardsToMoveIndex]]);
        this.mainDeck.remove(cardsToMoveIndex);
        return;
      }
      if(from > 7) {
        this.piles[to].push([this.destinations[from - 8].last]);
        this.destinations[from - 8].remove();
        return;
      }
      if(to > 7) {
        this.destinations[to - 8].push(this.piles[from].last);
        this.piles[from].remove(cardsToMoveIndex);
        return;
      }
      this.piles[to].push(this.piles[from].cards.slice(cardsToMoveIndex));
      this.piles[from].remove(cardsToMoveIndex);
    }
  }
  select(pileIndex, cardIndex) {
    this.selectedCards.from = pileIndex;
    this.selectedCards.which = cardIndex;
    if(pileIndex === 7) {
      this.mainDeckLocation.firstChild.classList.add("selected");
      return;
    }
    if(pileIndex > 7) {
      this.destinationsLocations[pileIndex - 8].firstChild.classList.add("selected");
      return;
    }
    const toSelect = Array.from(this.pilesLocations[pileIndex].querySelectorAll(".slot"));
    toSelect.forEach((cardToSelect) => {
      if(cardToSelect.id >= cardIndex) {
        cardToSelect.classList.add("selected");
      }
    });
  }
  unselect() {
    const selected = Array.from(document.querySelectorAll(".selected"));
    selected.forEach((cardSelected) => {
      cardSelected.classList.remove("selected");
    });
  }
  init() {
    this.pilesLocations.forEach((location, pileIndex) => {
      location.addEventListener("click", (event) => {
        if(!this.cardToCheck) {
          if(event.target.classList.contains("card")) {
            this.select(pileIndex, parseInt(event.target.id, 10));
            this.cardToCheck = true;
          } else if(event.target.id == this.piles[pileIndex].numberOfCards - 1) {
            this.piles[pileIndex].flipLastCard();
          }
        } else {
          if(event.target.id == this.piles[pileIndex].numberOfCards -1 || event.target.classList.contains("empty-slot")) {
            this.moveCards(this.selectedCards.from, pileIndex, this.selectedCards.which);
          }
          this.unselect();
          this.cardToCheck = false;
        }
      });
    });
    this.mainDeckLocation.addEventListener("click", (event) => {
      if(!this.cardToCheck && event.target.classList.contains("card")) {
        this.select(7,parseInt(event.target.id, 10));
        this.cardToCheck = true;
        return;
      }
      if(this.cardToCheck) {
        this.unselect();
        this.cardToCheck = false;
      }
    });
    this.leftDeck.addEventListener("click", (event) => {
      if(event.target.classList.contains("reverse")) {
        this.mainDeck.showNext();
      }
    });
    this.destinationsLocations.forEach((location, destinationIndex) => {
      location.addEventListener("click", (event) => {
        if(!this.cardToCheck && event.target.classList.contains("card")) {
          this.select(destinationIndex + 8, this.destinations[destinationIndex].numberOfCards - 1);
          this.cardToCheck = true;
          return;
        }
        if(this.cardToCheck) {
          if(this.selectedCards.from < 7 && this.piles[this.selectedCards.from].numberOfCards - 1 == this.selectedCards.which) {
            this.moveCards(this.selectedCards.from, destinationIndex + 8, this.selectedCards.which);
          }
          if(this.selectedCards.from === 7) {
            this.moveCards(this.selectedCards.from, destinationIndex + 8, this.selectedCards.which);
          }
          this.unselect();
          this.cardToCheck = false;
        }
      });
    });
  }
  startGame() {
    this.deck.shuffle();
    this.layoutCards();
    this.init();
  }
}

let game = new Solitaire();
game.startGame();