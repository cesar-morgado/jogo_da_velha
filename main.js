let currentPlayer = 'X';
let gameBoard = ['', '', '', '', '', '', '', '', ''];
let gameActive = true;

function cellClick(index) {
    if (gameBoard[index] === '' && gameActive) {
        gameBoard[index] = currentPlayer;
        document.getElementById(`cell${index}`).innerText = currentPlayer;

        if (checkWinner()) {
            document.getElementById('status').innerText = `Jogador ${currentPlayer} venceu!`;
            gameActive = false;
        } else if (!gameBoard.includes('')) {
            document.getElementById('status').innerText = 'Empate!';
            gameActive = false;
        } else {
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
            document.getElementById('status').innerText = `Turno do Jogador ${currentPlayer}`;
        }
    }
}

function checkWinner() {
    const winningCombinations = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ];

    return winningCombinations.some(combination => {
        const [a, b, c] = combination;
        return gameBoard[a] !== '' && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c];
    });
}

function resetGame() {
    currentPlayer = 'X';
    gameBoard = ['', '', '', '', '', '', '', '', ''];
    gameActive = true;

    for (let i = 0; i < 9; i++) {
        const cell = document.getElementById(`cell${i}`);
        cell.innerText = '';
        cell.addEventListener('click', () => cellClick(i));
    }

    document.getElementById('status').innerText = 'Novo Jogo!';
}

const board = document.getElementById('board');
for (let i = 0; i < 9; i++) {
    const cell = document.createElement('div');
    cell.className = 'cell';
    cell.id = `cell${i}`;
    cell.addEventListener('click', () => cellClick(i));
    board.appendChild(cell);
}

document.getElementById('status').innerText = `Turno do Jogador ${currentPlayer}`;
