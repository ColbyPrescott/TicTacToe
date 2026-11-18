const dom = {
    boardHeader: document.getElementById("boardHeader"),
    boardTable: document.getElementById("boardTable"),
};

let board;
let currentPlayer;
let winner;

function main() {
    resetGame();
    displayBoard();
    addButtonEventListeners();
}
window.addEventListener("load", main);

function addButtonEventListeners() {
    Array.from(dom.boardTable.children).forEach((row, j) => 
        Array.from(row.children).forEach((cell, i) => {
            cell.addEventListener("click", () => handleBoardCellClicked(i, j));
        })
    );
}

function resetGame() {
    board = [['', '', ''], ['', '', ''], ['', '', '']];
    currentPlayer = 'X';
    winner = undefined;
}

function displayBoard() {
    if (winner === undefined)
        dom.boardHeader.innerText = `Current player: ${currentPlayer}`;
    else if (winner === true)
        dom.boardHeader.innerText = "Tie!";
    else
        dom.boardHeader.innerText = `Player ${winner} won!`;

    for (let x = 0; x < board.length; x++) {
        for (let y = 0; y < board[x].length; y++) {
            const cell = dom.boardTable.children[y].children[x];
            cell.textContent = board[x][y];
            cell.disabled = board[x][y] != '';
        }
    }
}

function handleBoardCellClicked(x, y) {
    board[x][y] = currentPlayer;
    currentPlayer = currentPlayer == 'X' ? 'O' : 'X';
    checkGameOver();
    displayBoard();
}

function handleWin(player, x1, y1, x2, y2) {
    winner = player;
    console.log(`Player ${player} won! Line (${x1}, ${y1}) to (${x2}, ${y2})`);
}

function handleTie() {
    winner = true;
    console.log("Tie!");
}

function checkGameOver() {
    const checkWinLine = (startX, startY, dx, dy) => {
        let target = board[startX][startY];
        if (target == '')
            return false;
        
        let x = startX + dx, y = startY + dy;
        while (
            x >= 0 && x < board.length &&
            y >= 0 && y < board[0].length &&
            board[x][y] == target
        ) {
            x += dx;
            y += dy;
        }

        if (x == board.length || y == board[0].length) {
            handleWin(target, startX, startY, x - dx, y - dy);
            return true;
        }
        return false;
    };

    for (let x = 0; x < board.length; x++)
        if (checkWinLine(x, 0, 0, 1))
            return;

    for (let y = 0; y < board[0].length; y++)
        if (checkWinLine(0, y, 1, 0))
            return;

    if (checkWinLine(0, 0, 1, 1))
        return;
    if (checkWinLine(board.length - 1, 0, -1, 1))
        return;

    if (board.every(col => col.every(cell => cell != '')))
        handleTie();
}