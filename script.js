'use strict';

// Selecting Elements
const instructions = document.querySelector('.instructions');
const modal = document.querySelector('.modal');
const closeModal = document.querySelector('.close-modal');
const btnRollDice = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const btnNewGame = document.querySelector('.btn--new');

const score0 = document.querySelector('#score--0');
const score1 = document.querySelector('#score--1');

const currentScore0 = document.querySelector('#current--0');
const currentScore1 = document.querySelector('#current--1');

const player0 = document.querySelector('.player--0');
const player1 = document.querySelector('.player--1');

const dice = document.querySelector('.dice');

let scores, currentScore, activePlayer, playing;
// Starting Conditions
const openInstructions = () => {
  modal.classList.remove('hidden');
};
const closeInstructions = () => {
  modal.classList.add('hidden');
};
const init = function () {
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;

  score0.textContent = 0;
  score1.textContent = 0;

  currentScore0.textContent = 0;
  currentScore1.textContent = 0;

  player0.classList.remove('player--winner');
  player1.classList.remove('player--winner');
  player0.classList.add('player--active');
  player1.classList.remove('player--active');
  dice.classList.add('hidden');
  modal.classList.add('hidden');
};
init();

const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0.classList.toggle('player--active');
  player1.classList.toggle('player--active');
};
// Opening & closing the instructions
instructions.addEventListener('click', openInstructions);
closeModal.addEventListener('click', closeInstructions);
// Rolling Dice Functionality
btnRollDice.addEventListener('click', function () {
  if (playing) {
    // 1. Generating a random dice roll
    let diceNum = Math.trunc(Math.random() * 6) + 1;

    // 2. Display dice
    dice.classList.remove('hidden');
    dice.src = `imgs/dice-${diceNum}.png`;

    // 3. Check for rolled 1: if true,
    if (diceNum !== 1) {
      // Add diceNum to current score
      currentScore += diceNum;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    }
    // switch to next player & current score = 0
    else {
      switchPlayer();
    }
  }
});

btnHold.addEventListener('click', function () {
  if (playing) {
    // 1. Add current score to active player's score
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    // 2. Check if player's score is >= 100
    if (scores[activePlayer] >= 100) {
      // Finish the game
      playing = false;
      dice.classList.add('hidden');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
    } else {
      // Switch to the next player
      switchPlayer();
    }
  }
});

btnNewGame.addEventListener('click', init);
