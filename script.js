'use strict';

// state

let scores = [0, 0];
let roundScore = 0;
let activePlayer = 0;
let winningScore = 100;

// DOM elements selection

let currentScore = document.querySelector('#current--' + activePlayer);
let score = document.querySelector('#score--' + activePlayer);

const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const btnNew = document.querySelector('.btn--new');

const diceImg = document.querySelector('.dice');

// functions
function winner (){
    document.querySelector('.player--' + activePlayer).classList.add('player--winner');
    document.getElementById('name--' + activePlayer).innerText = 'Winner' ;

    btnRoll.style.display ='none' ;
    btnHold.style.display = 'none' ;

    settingTheDice(6, 'none');
}

let changeActivePlayer = () => {
  document.querySelector('.player--0').classList.toggle('player--active');
  document.querySelector('.player--1').classList.toggle('player--active');
};

function settingTheDice(num, state = 'block') {
  diceImg.style.display = state;
  diceImg.src = `dice-${num}.png`;
}

const randomNumber = max => Math.floor(Math.random() * max) + 1;

function rollTheDice() {
  let diceNum = randomNumber(6);

  if (diceNum === 1) {
    roundScore = 0;
    currentScore.innerText = 0;

    scores[activePlayer] = 0;
    score.innerText = 0;

    switchPlayer();
    console.log('got 1!!! round score : ', roundScore);
  } else {
    settingTheDice(diceNum);

    roundScore += diceNum;
    currentScore.innerText = roundScore;

    console.log(roundScore);
  }
}

function holdScore() {
  scores[activePlayer] += roundScore;
  score.innerText = scores[activePlayer];
  roundScore = 0;
  currentScore.innerText = 0;

  if (scores[activePlayer] >= winningScore) {
    winner() ;
  }else{
      switchPlayer() ;
  }
}

const switchPlayer = () => {
  activePlayer === 0 ? (activePlayer = 1) : (activePlayer = 0);
  console.log(`player switched , current player is : ${activePlayer + 1}`);

  currentScore = document.querySelector('#current--' + activePlayer);
  score = document.querySelector('#score--' + activePlayer);

  changeActivePlayer();
};

function initialize() {
  scores = [0, 0];
  roundScore = 0;
  activePlayer = 0;

  document.querySelector('#current--0').innerText = 0;
  document.querySelector('#score--0').innerText = 0;
  document.querySelector('.player--0').classList.add('player--active');
  document.querySelector('.player--1').classList.remove('player--active');

  document.querySelector('#current--1').innerText = 0;
  document.querySelector('#score--1').innerText = 0;

  document.querySelector('.player--0').classList.remove('player--winner');
  document.getElementById('name--0').innerText = 'Player 1' ;
  
  document.querySelector('.player--1').classList.remove('player--winner');
  document.getElementById('name--1').innerText = 'player 2' ;

  btnRoll.style.display ='block' ;
  btnHold.style.display = 'block' ;

  settingTheDice(6, 'none');
}

// event listeners

btnRoll.addEventListener('click', rollTheDice);
btnHold.addEventListener('click', holdScore);
btnNew.addEventListener('click', initialize);

initialize();