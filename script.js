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
    console.log("displayBoard");
}

function handleBoardCellClicked(x, y) {
    console.log("Clicked", x, y);
}