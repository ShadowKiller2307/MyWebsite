var canvas = document.getElementById("board");
var board = canvas.getContext("2d");
var boardState = ["", "", "", "", "", "", "", "", ""];
var Players = ["X", "O"];
var currentPlayer = 0;
var winnigSlots = [];
var added = false;
var bot = false;
var locked = false;

drawBoard();

function drawBoard() {
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

function resetBoard() {
    boardState = ["", "", "", "", "", "", "", "", ""];
    currentPlayer = 0;
    for (i = 1; i < 10; i++) {
        document.getElementById("slot" + i).innerHTML = "";
        document.getElementById("slot" + i).setAttribute("style", "background-color: rgba(240, 248, 255, 0)");
    }
    winnigSlots = [];
    locked = false;
}

function slot(slotNmbr) {
    if (boardState[slotNmbr - 1] == "" && !locked) {
        document.getElementById("slot" + slotNmbr).innerHTML = "<br>" + Players[currentPlayer];
        boardState[slotNmbr - 1] = Players[currentPlayer];
        calculateWinner();
    }
}

function calculateWinner() {
    if (calculateRows() || calculateColums() || calculateDiagonals()) {
        locked = true;
        setTimeout(function () { resetBoard(); }, 2000);
        drawWinningSlots();
    } else {
        if (boardState.includes("")) {
            if (currentPlayer) {
                currentPlayer = 0;
            } else {
                currentPlayer = 1;
            }
        } else { //if the board is tied
            locked = true;
            setTimeout(function () { resetBoard(); }, 2000);
            for (i = 1; i < 10; i++) {
                document.getElementById("slot" + i).setAttribute("style", "background-color: rgba(224, 40, 40, 0.795) !important");
            }
        }
    }
}

function drawWinningSlots() {
    winnigSlots.map((x) => document.getElementById("slot" + (x + 1)).setAttribute("style", "background-color: rgba(13, 218, 40, 0.87) !important"));
}

function calculateRows() {
    for (i = 0; i < 3; i++) {
        if (boardState[i * 3] == boardState[i * 3 + 1] && boardState[i * 3] == boardState[i * 3 + 2] && boardState[i * 3] != "") {
            if (!winnigSlots.includes(i * 3)) {
                added = true;
                winnigSlots.push(i * 3);
            }
            if (!winnigSlots.includes(i * 3 + 1)) {
                added = true;
                winnigSlots.push(i * 3 + 1);
            }
            if (!winnigSlots.includes(i * 3 + 2)) {
                added = true;
                winnigSlots.push(i * 3 + 2);
            }
        }
    }
    if (added) {
        added = false;
        return true;
    }
}

function calculateColums() {
    for (i = 0; i < 3; i++) {
        if (boardState[i] == boardState[i + 3] && boardState[i] == boardState[i + 6] && boardState[i] != "") {
            added = true;
            if (!winnigSlots.includes(i)) {
                added = true;
                winnigSlots.push(i);
            }
            if (!winnigSlots.includes(i + 3)) {
                added = true;
                winnigSlots.push(i + 3);
            }
            if (!winnigSlots.includes(i + 6)) {
                added = true;
                winnigSlots.push(i + 6);
            }
        }
    }
    if (added) {
        added = false;
        return true;
    }
}

function calculateDiagonals() {
    if (boardState[0] == boardState[4] && boardState[0] == boardState[8] && boardState[0] != "") {
        if (!winnigSlots.includes(0)) {
            added = true;
            winnigSlots.push(0);
        }
        if (!winnigSlots.includes(4)) {
            added = true;
            winnigSlots.push(4);
        }
        if (!winnigSlots.includes(8)) {
            added = true;
            winnigSlots.push(8);
        }
    }
    if (boardState[2] == boardState[4] && boardState[2] == boardState[6] && boardState[2] != "") {
        if (!winnigSlots.includes(2)) {
            added = true;
            winnigSlots.push(2);
        }
        if (!winnigSlots.includes(4)) {
            added = true;
            winnigSlots.push(4);
        }
        if (!winnigSlots.includes(6)) {
            added = true;
            winnigSlots.push(6);
        }
    }
    if (added) {
        added = false;
        return true;
    }
}