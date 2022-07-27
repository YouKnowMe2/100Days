const gameData = [
    [0,0,0],
    [0,0,0],
    [0,0,0],
];
let editedPlayer =0;
let activePlayer = 0;
let currentRound =1;
const players = [
    {
        name: '',
        symbol: 'X'
    },
    {
        name: '',
        symbol: 'O'
    }

];

const playerConfigElement = document.getElementById('config-overlays');
const backDropElement = document.getElementById('backdrop');
const formElement = document.querySelector('form');
const errorElement = document.getElementById('config-error');
const activePlayerNameElement = document.getElementById('active-player-name');
const gameOverElement = document.getElementById('game-over');


const startGameElement = document.getElementById('start-game');
const gameAreaElement = document.getElementById('active-game');
const gameFieldElements  = document.querySelectorAll('#game-board li');
const gameBoard  = document.getElementById('game-board');


const editPlayer1Element = document.getElementById('edit-player-1');
const editPlayer2Element = document.getElementById('edit-player-2');

const cancelConfigElement = document.getElementById('cancel-config');


editPlayer1Element.addEventListener('click',openPlayerConfig);
editPlayer2Element.addEventListener('click',openPlayerConfig);

cancelConfigElement.addEventListener('click',closePlayerConfig);
backDropElement.addEventListener('click',closePlayerConfig);

formElement.addEventListener('submit',savePlayerConfig);

startGameElement.addEventListener('click',startNewGame);

for(const gameFieldElement of gameFieldElements){
    gameFieldElement.addEventListener('click',selectGameField);
}