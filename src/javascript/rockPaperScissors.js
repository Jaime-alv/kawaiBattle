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
        this.round = 0;
    }
}
const newGame = new GameStatus();
const rockButton = document.querySelector("#rock");
const paperButton = document.querySelector("#paper");
const scissorsButton = document.querySelector("#scissors");
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
rockButton.addEventListener("click", () => {
    let roundResult = playRound(GameChoice.ROCK);
    moveOneRound(roundResult);
});
rockButton.addEventListener("mouseover", () => {
    colorBackgroundButton(rockButton);
});
rockButton.addEventListener("mouseout", () => {
    colorBackgroundButtonBack(rockButton);
});
paperButton.addEventListener("click", () => {
    let roundResult = playRound(GameChoice.PAPER);
    moveOneRound(roundResult);
});
paperButton.addEventListener("mouseover", () => {
    colorBackgroundButton(paperButton);
});
paperButton.addEventListener("mouseout", () => {
    colorBackgroundButtonBack(paperButton);
});
scissorsButton.addEventListener("click", () => {
    let roundResult = playRound(GameChoice.SCISSORS);
    moveOneRound(roundResult);
});
scissorsButton.addEventListener("mouseover", () => {
    colorBackgroundButton(scissorsButton);
});
scissorsButton.addEventListener("mouseout", () => {
    colorBackgroundButtonBack(scissorsButton);
});
function updateResultCount(game) {
    let playerCounter = document.querySelector("#player");
    let computerCounter = document.querySelector("#computer");
    let roundCounter = document.querySelector("#round-number");
    playerCounter.textContent = game.player.toString();
    computerCounter.textContent = game.computer.toString();
    roundCounter.textContent = game.round.toString();
}
function moveOneRound(gameResult) {
    let updateGame = upScorePoint(gameResult, newGame);
    updateResultCount(updateGame);
    if (updateGame.computer === 5 || updateGame.player === 5) {
        let message = getWinnerMessage(updateGame);
        andTheWinnerIs(message);
    }
    else {
        giveUserFeedBack(gameResult);
    }
}
function andTheWinnerIs(winner) {
    let lastGameResult = document.querySelector("#game-response");
    lastGameResult.remove();
    let content = document.querySelector(".content");
    let counterElement = document.querySelector(".player-choice");
    counterElement.remove();
    let winnerBanner = document.createElement("div");
    winnerBanner.classList.add("winner");
    winnerBanner.textContent = winner;
    content.appendChild(winnerBanner);
}
function getWinnerMessage(game) {
    if (game.computer === 5) {
        return "Computer wins! Better luck next time.";
    }
    else {
        return "You win! Congratulations.";
    }
}
function giveUserFeedBack(gameResult) {
    let documentElement = document.querySelector("#game-response");
    let message = "";
    switch (gameResult) {
        case GameResult.WIN:
            message = "Player wins!";
            break;
        case GameResult.LOOSE:
            message = "Computer wins!";
            break;
        case GameResult.TIE:
            message = "It's a tie!";
            break;
    }
    documentElement.textContent = message;
}
function upScorePoint(roundResult, game) {
    switch (roundResult) {
        case GameResult.LOOSE:
            game.computer += 1;
            break;
        case GameResult.TIE:
            break;
        case GameResult.WIN:
            game.player += 1;
            break;
    }
    game.round += 1;
    return game;
}
function colorBackgroundButton(button) {
    button.style.background = "#5cb85c";
}
function colorBackgroundButtonBack(button) {
    button.style.background = "#428bca";
}
updateResultCount(newGame);
//# sourceMappingURL=rockPaperScissors.js.map