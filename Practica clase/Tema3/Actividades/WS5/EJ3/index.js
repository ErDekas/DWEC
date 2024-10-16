class Player {
    constructor(name) {
        this.name = name;
        this.wins = 0;
        this.losses = 0;
        this.choice = null;
    }

    makeChoice(choice) {
        this.choice = choice; // choice can be 'rock', 'paper', or 'scissors'
    }

    win() {
        this.wins++;
    }

    lose() {
        this.losses++;
    }
}

class Game {
    constructor(player1, player2) {
        this.player1 = player1;
        this.player2 = player2;
        this.rounds = 0;
    }

    determineWinner() {
        const { choice: choice1 } = this.player1;
        const { choice: choice2 } = this.player2;

        if (choice1 === choice2) {
            console.log("It's a tie!");
            return;
        }

        const winConditions = {
            rock: 'scissors',
            paper: 'rock',
            scissors: 'paper',
        };

        if (winConditions[choice1] === choice2) {
            console.log(`${this.player1.name} wins!`);
            this.player1.win();
            this.player2.lose();
        } else {
            console.log(`${this.player2.name} wins!`);
            this.player2.win();
            this.player1.lose();
        }
        this.rounds++;
    }
}

// Example usage
const player1 = new Player('Alice');
const player2 = new Player('Bob');

player1.makeChoice('rock');
player2.makeChoice('scissors');

const game = new Game(player1, player2);
game.determineWinner();
