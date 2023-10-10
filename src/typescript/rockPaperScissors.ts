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
    round: number = 0;
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
    moveOneRound(roundResult);
});

paperButton?.addEventListener("click", () => {
    let roundResult = playRound(GameChoice.PAPER);
    moveOneRound(roundResult);
});

scissorsButton?.addEventListener("click", () => {
    let roundResult = playRound(GameChoice.SCISSORS);
    moveOneRound(roundResult);
});

function updateResultCount(game: GameStatus) {
    let playerCounter: HTMLElement = document.querySelector("#player")!;
    let computerCounter: HTMLElement = document.querySelector("#computer")!;
    let roundCounter: HTMLElement = document.querySelector("#round-number")!;
    playerCounter.textContent = game.player.toString();
    computerCounter.textContent = game.computer.toString();
    roundCounter.textContent = game.round.toString();
}

function moveOneRound(gameResult: GameResult) {
    let updateGame = upScorePoint(gameResult, newGame);
    if (updateGame.computer === 5 || updateGame.player === 5) {
        let message: string = getWinnerMessage(updateGame);
        andTheWinnerIs(message);
    } else {
        giveUserFeedBack(gameResult);
        updateResultCount(updateGame);
    }
}

function andTheWinnerIs(winner: string) {
    let content: HTMLElement = document.querySelector(".content")!;
    let counterElement: HTMLElement = document.querySelector(".player-choice")!;
    counterElement.remove();
    let winnerBanner = document.createElement("div");
    winnerBanner.classList.add("winner");
    winnerBanner.textContent = winner;
    content.appendChild(winnerBanner);
}

function getWinnerMessage(game: GameStatus): string {
    if (game.computer === 5) {
        return "Computer wins! Better luck next time.";
    } else {
        return "You win! Congratulations.";
    }
}

function giveUserFeedBack(gameResult: GameResult) {
    let documentElement: HTMLElement = document.querySelector("#game-response")!;
    let message: string = "";
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
    game.round += 1;
    return game;
}

updateResultCount(newGame);
