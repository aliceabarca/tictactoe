var playerOneContainer = document.querySelector('.player-1-container');
var playerTwoContainer = document.querySelector('.player-2-container');
var gridItems = document.querySelectorAll('.grid-item');
var playersTurnHeading = document.querySelector('.players-turn');
var playerOneWinCount = document.querySelector('.player-1-container .win-count');
var playerTwoWinCount = document.querySelector('.player-2-container .win-count');
var ticTacToeGrid = documen.querySelector('.tic-tac-toe-grid');

ticTacToeGrid.addEventListener('click',)


function createPlayer(player, token, id) {
  return {
    player: player,
    token: token,
    id: id,
    win: false
  }
}