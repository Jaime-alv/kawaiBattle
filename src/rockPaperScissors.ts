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

const newGame = new GameStatus();

const rockButton = document.querySelector("#rock");
const paperButton = document.querySelector("#paper");
const scissorsButton = document.querySelector("#scissors");

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


rockButton?.addEventListener("click", () => {
    let roundResult = playRound(GameChoice.ROCK);
    moveOneRound(roundResult)

});

paperButton?.addEventListener("click", () => {
    let roundResult = playRound(GameChoice.PAPER);
    moveOneRound(roundResult)
});

scissorsButton?.addEventListener("click", () => {
    let roundResult = playRound(GameChoice.SCISSORS);
    moveOneRound(roundResult)
});

function updateResultCount(game: GameStatus) {
    let playerCounter: HTMLElement = document.querySelector("#player")!;
    let computerCounter: HTMLElement = document.querySelector("#computer")!;
    playerCounter.textContent = game.player.toString();
    computerCounter.textContent = game.computer.toString();
}

function moveOneRound(gameResult: GameResult) {
    let updateGame = upScorePoint(gameResult, newGame);
    updateResultCount(updateGame)
}

function upScorePoint(roundResult: GameResult, game: GameStatus): GameStatus {
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
    return game;
}


updateResultCount(newGame);

