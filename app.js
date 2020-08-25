/* NOTE - GAME RULES
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

// VAR - VARIABLES 

var scores, roundScore, activePlayer, diceDOM, gamePlaying, prevRoll, winningScore;

// PRESET - PRESET 

initialize();
winningScore = 100;

// FEATURE - ROLL THE DICE  

document.querySelector('.btn-roll').addEventListener('click', function () {

    // if there is no winner yet then you can play 
    if (gamePlaying) {
        // random number 
        var dice1 = Math.floor(Math.random() * 5) + 1;
        var dice2 = Math.floor(Math.random() * 5) + 1;
        // display number 
        diceDOM_1.style.display = 'block';
        diceDOM_2.style.display = 'block';
        diceDOM_1.src = "dice-" + dice1 + '.png';
        diceDOM_2.src = "dice-" + dice2 + '.png';


        // if dice === 1 

        if ((dice1 !== 1) && (dice2 !== 1)  && (dice1 + dice2 !== 12)) {

            roundScore += dice1 + dice2 ;
            document.querySelector('#current-' + activePlayer).textContent = roundScore;

        } else {
            score[activePlayer] = 0;
            document.querySelector('#score-' + activePlayer).textContent = '0';

            nextPlayer();
        }
    }
})

// FEATURE - HOLD SCORE 

document.querySelector('.btn-hold').addEventListener('click', function () {

    // if there is no winner yet then you can play
    if (gamePlaying) {
        // add current score to global score 
        score[activePlayer] += roundScore

        // update the UI 
        document.querySelector('#score-' + activePlayer).textContent = score[activePlayer];

        // check if player won the game 
        if (score[activePlayer] >= winningScore) {
            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
            document.querySelector('#name-' + activePlayer).textContent = 'WINNER !';
            document.querySelector('.player-' + activePlayer + '-panel').classList.toggle('active');
            diceDOM_1.style.display = 'none';
            diceDOM_2.style.display = 'none';
            gamePlaying = false;
            // document.querySelector('.btn-roll').style.display = 'none';
            // document.querySelector('.btn-hold').style.display = 'none';
        } else {
            // next player turn
            nextPlayer();
        }
    }

})

// FEATURE - NEW GAME 

document.querySelector('.btn-new').addEventListener('click', function () {

    initialize();

})

// FEATURE - SET WINNING SCORE 

document.querySelector('#GO').addEventListener('click', function () {
    winningScore = Math.abs(document.querySelector('#input').value);
    document.querySelector('.current-win-score').textContent = 'winning score : ' + winningScore;

    initialize() ;
})

// FUNCTION - next player 

function nextPlayer() {

    roundScore = 0;

    // reset current score 
    document.querySelector('#current-0').textContent = 0;
    document.querySelector('#current-1').textContent = 0;
    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');

    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;

    document.querySelector('.dice--1').style.display = 'none';
    document.querySelector('.dice--2').style.display = 'none';
}

// FUNCTION - INITIALIZE 

function initialize() {
    // reset variables 
    score = [0, 0];
    roundScore = 0;
    activePlayer = 0;
    prevRoll = 0;
    diceDomAll= document.querySelectorAll('.dice');
    diceDOM_1 = diceDomAll[0];
    diceDOM_2 = diceDomAll[1];
    gamePlaying = true;

    // reset DOM
    document.querySelector('.dice--1').style.display = 'none';
    document.querySelector('.dice--2').style.display = 'none';
    document.querySelector('#current-0').textContent = 0;
    document.querySelector('#current-1').textContent = 0;
    document.querySelector('#score-0').textContent = 0;
    document.querySelector('#score-1').textContent = 0;
    document.querySelector('#name-0').textContent = 'Player 1';
    document.querySelector('#name-1').textContent = 'Player 2';

    // removing the winner class if exists 
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');

    // reset the active state 
    document.querySelector('.player-0-panel').classList.add('active');
    document.querySelector('.player-1-panel').classList.remove('active');

}