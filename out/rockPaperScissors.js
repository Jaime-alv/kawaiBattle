"use strict";
var GameResult;
(function (GameResult) {
    GameResult[GameResult["LOOSE"] = 0] = "LOOSE";
    GameResult[GameResult["TIE"] = 1] = "TIE";
    GameResult[GameResult["WIN"] = 2] = "WIN";
})(GameResult || (GameResult = {}));
var GameChoice;
(function (GameChoice) {
    GameChoice["ROCK"] = "Rock";
    GameChoice["PAPER"] = "Paper";
    GameChoice["SCISSORS"] = "Scissors";
})(GameChoice || (GameChoice = {}));
class GameStatus {
    constructor() {
        this.player = 0;
        this.computer = 0;
    }
}
const rockButton = document.querySelector("#rock");
const paperButton = document.querySelector("#paper");
const scissorsButton = document.querySelector("#scissors");
var gameRound = 0;
function getComputerChoice() {
    let index = Math.floor(Math.random() * Object.keys(GameChoice).length);
    let randomChoice = Object.values(GameChoice)[index];
    return randomChoice;
}
function comparePlayerVsComputer(playerSelection, computerSelection) {
    if (playerSelection == computerSelection) {
        return GameResult.TIE;
    }
    if ((playerSelection == GameChoice.PAPER && computerSelection == GameChoice.ROCK) ||
        (playerSelection == GameChoice.ROCK && computerSelection == GameChoice.SCISSORS) ||
        (playerSelection == GameChoice.SCISSORS && computerSelection == GameChoice.PAPER)) {
        return GameResult.WIN;
    }
    return GameResult.LOOSE;
}
function playRound(playerChoice) {
    let computerChoice = getComputerChoice();
    let game = comparePlayerVsComputer(playerChoice, computerChoice);
    return game;
}
function getPlayerChoice() {
    let index = Math.floor(Math.random() * Object.keys(GameChoice).length);
    let randomChoice = Object.values(GameChoice)[index];
    return randomChoice;
}
rockButton?.addEventListener("click", () => {
    playRound(GameChoice.ROCK);
});
paperButton?.addEventListener("click", () => {
    playRound(GameChoice.PAPER);
});
scissorsButton?.addEventListener("click", () => {
    playRound(GameChoice.SCISSORS);
});
function updateResultCount(game) {
    let playerCounter = document.querySelector("#player");
    let computerCounter = document.querySelector("#computer");
    playerCounter.textContent = game.player.toString();
    computerCounter.textContent = game.computer.toString();
}
function debugSystem() {
    let content = document.querySelector(".content");
    let randomThough = document.createElement("div");
    randomThough.textContent = "hello world";
    content.appendChild(randomThough);
}
const newGame = new GameStatus();
updateResultCount(newGame);
debugSystem();
//# sourceMappingURL=rockPaperScissors.js.map