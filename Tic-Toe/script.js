var board = ["", "", "", "", "", "", "", "", ""];
var currentPlayer = "X";
var scores = { X: 0, O: 0 };
var flag = true;

const winningConditions = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
    [0, 4, 8], [2, 4, 6] // Diagonals
];

function makeMove(cell, index) {
    if (board[index] === "" && flag) {
        board[index] = currentPlayer;
        cell.classList.add(currentPlayer);
        cell.textContent = currentPlayer;
        checkWin();
        currentPlayer = currentPlayer === "X" ? "O" : "X";
        updateStatusMessage();
    }
}

function checkWin() {
    for (var condition of winningConditions) {
        var [a, b, c] = condition;
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            flag = false;
            scores[board[a]] += 1;
            updateScoreboard();
            showStatusMessage(`Player ${board[a]} wins!`);
            alert(`Player ${board[a]} wins!`)
            return;
        }
    }
    if (!board.includes("")) {
        flag = false;
        showStatusMessage("It's a draw!");
    }
}

function updateStatusMessage() {
    const statusMessage = document.getElementById("statusMessage");
    if (flag) {
        statusMessage.textContent = `Player ${currentPlayer}'s turn`;
    }
}

function showStatusMessage(message) {
    const statusMessage = document.getElementById("statusMessage");
    statusMessage.textContent = message;
}

function updateScoreboard() {
    document.getElementById("scoreX").textContent = scores.X;
    document.getElementById("scoreO").textContent = scores.O;
}

function resetGame() {
    board = ["", "", "", "", "", "", "", "", ""];
    currentPlayer = "X";
    flag = true;
    document.querySelectorAll(".cell").forEach(cell => {
        cell.classList.remove("X", "O");
        cell.textContent = "";
    });
    showStatusMessage(`Player ${currentPlayer}'s turn`);
}

updateStatusMessage();
