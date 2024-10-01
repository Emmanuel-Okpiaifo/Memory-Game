// MemoryGame class
export default class MemoryGame {
  constructor() {
    this.flippedCards = [];
    this.matches = 0;
  }
  shuffleCards(cards) {
    const cardArray = Array.from(cards);
    cardArray.sort(() => Math.random()- 0.5);
    return cardArray;
  }
  checkMatch(card1, card2) {
    const img1 = card1.querySelector('.back img').src;
    const img2 = card2.querySelector('.back img').src;
    return img1 === img2
  }
  checkForMatch(card1, card2) {
    if (this.checkMatch(card1, card2)) {
      this.matches ++;
      return true
     } else{
      return false
    }
  }
  resetGame() {
    this.matches = 0;
  }
}
  