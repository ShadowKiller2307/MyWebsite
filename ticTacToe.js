var canvas = document.getElementById("board");
var board = canvas.getContext("2d");
var boardState = ["", "", "", "", "", "", "", "", ""];
var Players = ["X", "O"];
var currentPlayer = 0;

resetBoard();

function resetBoard() {
    board.clearRect(0, 0, canvas.width, canvas.height);

    board.beginPath();
    board.strokeStyle = "#a7a7a7";
    board.lineWidth = "4";

    board.moveTo(canvas.width / 3, 0);
    board.lineTo(canvas.width / 3, canvas.height);
    board.moveTo(canvas.width / 3 * 2, 0);
    board.lineTo(canvas.width / 3 * 2, canvas.height);

    board.stroke();

    board.beginPath();
    board.lineWidth = "2";
    board.strokeStyle = "#a7a7a7";

    board.moveTo(0, canvas.height / 3);
    board.lineTo(canvas.width, canvas.height / 3);
    board.moveTo(0, canvas.height / 3 * 2);
    board.lineTo(canvas.width, canvas.height / 3 * 2);

    board.stroke();
}

function slot(slotNmbr) {
    if (boardState[slotNmbr - 1] == "") {
        document.getElementById("slot" + slotNmbr).innerHTML = "<br>" + Players[currentPlayer];
        boardState[slotNmbr - 1] = Players[currentPlayer];
        if (currentPlayer) {
            currentPlayer = 0;
        } else {
            currentPlayer = 1;
        }

        calculateWinner();
    }
}

function calculateWinner() {
    calculateRows();
}

function calculateRows() {
    for (i = 0; i < 3; i++) {
        if (boardState[i * 3] == boardState[i * 3 + 1] && boardState[i * 3] == boardState[i * 3 + 2]) {
            console.log("lol");
        }
    }
}