import $ from 'jquery';
import './css/styles.css';
import MemoryGame from './js/business';
import cherries from '../assets/img/front of cards/cherries.png';
import chili from '../assets/img/front of cards/chili.png';
import grapes from '../assets/img/front of cards/grapes.png';
import lemon from '../assets/img/front of cards/lemon.png';
import orange from '../assets/img/front of cards/orange.png';
import pineapple from '../assets/img/front of cards/pineapple.png';
import strawberry from '../assets/img/front of cards/strawberry.png';
import tomato from '../assets/img/front of cards/tomato.png';

$(document).ready(function () {
  // Setting up card images
  $(".cherries-img").attr("src", cherries);
  $(".chili-img").attr("src", chili);
  $(".grapes-img").attr("src", grapes);
  $(".lemon-img").attr("src", lemon);
  $(".orange-img").attr("src", orange);
  $(".pineapple-img").attr("src", pineapple);
  $(".strawberry-img").attr("src", strawberry);
  $(".tomato-img").attr("src", tomato);


  const game = new MemoryGame();
  let matchCount = 0; // Track the number of matches
  const totalPairs = 8; // Total number of card pairs (adjust based on actual cards)

  const cards = Array.from(document.querySelectorAll('.card'));
  const gameContainer = document.querySelector('.memory-game');

  // Add click event listeners for flipping cards
  cards.forEach(card => {
    card.addEventListener('click', function () {
      handleCardClick(card);
    });
  });

  shuffleCards(); // Shuffle cards initially

  function shuffleCards() {
    const shuffledCards = game.shuffleCards(cards); // Shuffle the cards
    gameContainer.innerHTML = ''; // Clear the container
    shuffledCards.forEach(card => {
      card.classList.remove('flipped'); // Reset flipped state
      gameContainer.appendChild(card); // Append shuffled cards
    });
  }
  function showPopup() {
    $('.popup').addClass('show'); // Show popup with fade-in effect
  }


  function flipCard(card) {
    card.classList.add('flipped');
  }

  function unflipCard(card) {
    card.classList.remove('flipped');
  }

  function handleCardClick(card) {
    if (card.classList.contains('flipped')) {
      return;
    }

    flipCard(card);
    game.flippedCards.push(card);

    if (game.flippedCards.length === 2) {
      const [card1, card2] = game.flippedCards;
      const isMatch = game.checkForMatch(card1, card2);

      if (isMatch) {
        matchCount++; // Increase match count on successful match
        $(".numberOfMatches").html(matchCount);

        // Check if all cards are matched
        if (matchCount === 8) {
          setTimeout(showPopup, 500); // Show popup after all matches are made
          console.log(matchCount)
        }
      }

      if (!isMatch) {
        setTimeout(() => {
          unflipCard(card1);
          unflipCard(card2);
        }, 1000);
      }

      game.flippedCards = [];
    }
  }

  
  function showPopup() {
    $('.popup').addClass('show'); // Show popup with fade-in effect
  }
  
  // Reset the game when 'Play Again' button is clicked
  $('#play-again').on('click', function () {
    $('.popup').removeClass('show'); // Hide popup with fade-out effect
    resetGame();
  });
  
  // Reset the game when reset button is clicked
  $('#reset-btn').on('click', function () {
    $('.popup').removeClass('show'); 
    resetGame();
  });
  

  function resetGame() {
    game.resetGame(); // Reset game logic
    matchCount = 0; // Reset match count
    $(".numberOfMatches").html(matchCount); // Reset match count display
    shuffleCards(); // Reshuffle the cards
    cards.forEach(card => {
      card.classList.remove('flipped'); // Reset flipped state
    });
  }
});

