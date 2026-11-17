const dom = {
    boardHeader: document.getElementById("boardHeader"),
    boardTable: document.getElementById("boardTable"),
};

let currentPlayer;
let board;

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
}

function displayBoard() {
    dom.boardHeader.innerText = `Current player: ${currentPlayer}`;

    for (let x = 0; x < board.length; x++)
        for (let y = 0; y < board[x].length; y++)
            dom.boardTable.children[y].children[x].textContent = board[x][y];
}

function handleBoardCellClicked(x, y) {
    board[x][y] = currentPlayer;
    currentPlayer = currentPlayer == 'X' ? 'O' : 'X';
    displayBoard();
}