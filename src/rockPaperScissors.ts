enum GameResult {
    LOOSE,
    TIE,
    WIN,
}

enum GameChoice {
    ROCK = "Rock",
    PAPER = "Paper",
    SCISSORS = "Scissors",
}

class GameStatus {
    player: number = 0;
    computer: number = 0;
}

const rockButton = document.querySelector("#rock");
const paperButton = document.querySelector("#paper");
const scissorsButton = document.querySelector("#scissors");
var gameRound = 0;

function getComputerChoice(): GameChoice {
    let index: number = Math.floor(Math.random() * Object.keys(GameChoice).length);
    let randomChoice = Object.values(GameChoice)[index];
    return randomChoice;
}

function comparePlayerVsComputer(playerSelection: GameChoice, computerSelection: GameChoice): GameResult {
    if (playerSelection == computerSelection) {
        return GameResult.TIE;
    }
    if (
        (playerSelection == GameChoice.PAPER && computerSelection == GameChoice.ROCK) ||
        (playerSelection == GameChoice.ROCK && computerSelection == GameChoice.SCISSORS) ||
        (playerSelection == GameChoice.SCISSORS && computerSelection == GameChoice.PAPER)
    ) {
        return GameResult.WIN;
    }
    return GameResult.LOOSE;
}

function playRound(playerChoice: GameChoice): GameResult {
    let computerChoice: GameChoice = getComputerChoice();
    let game = comparePlayerVsComputer(playerChoice, computerChoice);
    return game;
}

function getPlayerChoice(): GameChoice {
    let index: number = Math.floor(Math.random() * Object.keys(GameChoice).length);
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

function updateResultCount(game: GameStatus) {
    let playerCounter: HTMLElement = document.querySelector("#player")!;
    let computerCounter: HTMLElement = document.querySelector("#computer")!;
    playerCounter.textContent = game.player.toString();
    computerCounter.textContent = game.computer.toString();
}

const newGame = new GameStatus();

updateResultCount(newGame);