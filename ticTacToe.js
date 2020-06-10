var canvas = document.getElementById("board");
var board = canvas.getContext("2d");
var boardState = ["", "", "", "", "", "", "", "", ""];
var Players = ["X", "O"];
var currentPlayer = 0;
var winnigSlots = [];
var added = false;
var startingPlayer = 0;
var difficulties = ["Off", "Random", "Easy", "Hard"], difficulty = 0;
var locked = false;
var score1 = 0, score2 = 0, tiecount = 0;

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
    document.getElementById("startingPlayerButton").innerHTML = "Starting Player: " + Players[startingPlayer];
    document.getElementById("difficultyButton").innerHTML = "Difficulty of Bot: " + difficulties[difficulty];
}

function resetBoard() {
    boardState = ["", "", "", "", "", "", "", "", ""];
    currentPlayer = startingPlayer;
    for (i = 1; i < 10; i++) {
        document.getElementById("slot" + i).innerHTML = "";
        document.getElementById("slot" + i).setAttribute("style", "background-color: rgba(240, 248, 255, 0)");
    }
    winnigSlots = [];
    locked = false;
    if (difficulty && startingPlayer == 1) {
        currentPlayer = 1;
        calculateBotSlot();
    }
    console.log("--------------New Game--------------")
}

function changeStartingPlayer() {
    if (startingPlayer) {
        startingPlayer = 0;
    } else {
        startingPlayer = 1;
    }
    if (isBoardEmpty()) {
        currentPlayer = startingPlayer;
        calculateBotSlot();
    }
    document.getElementById("startingPlayerButton").innerText = "Starting Player: " + Players[startingPlayer];
}

function changeDifficulty() {
    if (isBoardEmpty()) {
        difficulty = difficulty < difficulties.length - 1 ? difficulty + 1 : 0;
        document.getElementById("difficultyButton").innerHTML = "Difficulty of Bot: " + difficulties[difficulty];
        if (difficulty && startingPlayer == 1) {
            currentPlayer = 1;
            calculateBotSlot();
        }
    } else {
        alert("Finish the current game before you can change the difficulty!");
    }
}

function slot(slotNmbr) {
    if (boardState[slotNmbr - 1] == "" && !locked) {
        document.getElementById("slot" + slotNmbr).innerHTML = Players[currentPlayer];
        boardState[slotNmbr - 1] = Players[currentPlayer];
        calculateWinner();
    }
}

function calculateWinner() {
    locked = true;
    if (calculateRows() || calculateColums() || calculateDiagonals()) {
        setTimeout(function () { resetBoard(); }, 2000);
        drawWinningSlots();
    } else {
        if (boardState.includes("")) {
            if (currentPlayer) {
                currentPlayer = 0;
                locked = false;
            } else {
                currentPlayer = 1;
                calculateBotSlot();
            }
        } else { //if the board is tied
            locked = true;
            tiecount++;
            if (tiecount != 1) {
                document.getElementById("ties").innerHTML = tiecount + " Ties";
            } else {
                document.getElementById("ties").innerHTML = tiecount + " Tie";
            }
            setTimeout(function () { resetBoard(); }, 2000);
            for (i = 1; i < 10; i++) {
                document.getElementById("slot" + i).setAttribute("style", "background-color: rgba(224, 40, 40, 0.795) !important");
            }
        }
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
}

var slotNmbr = -1;
var possibleSlots = [];
function calculateBotSlot() {
    locked = true; // lock the board for the Bot to plan his move
    if (difficulty != 0) {
        var index = boardState.indexOf("");
        possibleSlots = [];
        while (index != -1) {
            possibleSlots.push(index);
            index = boardState.indexOf("", index + 1);
        }
        slotNmbr = -1;
        switch (difficulty) {
            case 1:
                randomMove();
                break;
            case 2:
                var observing = [];
                checkVertically();
                checkHorizontally();
                checkDiagonally();
                randomMove();
                break;
            case 3:
                break;
        }

        if (document.getElementById("slot" + (slotNmbr + 1)).innerHTML == "") {
            document.getElementById("slot" + (slotNmbr + 1)).innerHTML = "<br>" + Players[currentPlayer];
            boardState[slotNmbr] = Players[currentPlayer];
            calculateWinner();
        } else {
            console.log("Error with Slot " + (slotNmbr + 1))
        }
    } else {
        locked = false;
    }

    function checkVertically() {
        if (slotNmbr == -1) {
            observing = [];
            for (let column = 0; column < 3; column++) { //check for winning vertically ( | )
                for (let row = 0; row < 9; row += 3) {
                    observing.push(boardState[column + row]);
                }
                if (observing.filter((x) => (x == "O")).length == 2 && observing.includes("")) {
                    slotNmbr = observing.indexOf("") * 3 + column;
                    console.log("now I win vertically! Slot: " + (slotNmbr + 1));
                }
                observing = [];
            }
        }
    }
    function checkHorizontally() {
        if (slotNmbr == -1) {
            observing = [];
            for (let row = 0; row < 3; row++) { //check for winning horizontally ( ── )
                observing = boardState.slice(row * 3, row * 3 + 3);
                if (observing.filter((x) => (x == "O")).length == 2 && observing.includes("")) {
                    slotNmbr = observing.indexOf("") + 3 * row;
                    console.log("now I win horizontally! Slot:" + (slotNmbr + 1));
                }
            }
        }
    }
    function checkDiagonally() {
        if (slotNmbr == -1) { //check for winning diagonally ( \ )
            observing = [];
            for (let i = 0; i < 3; i++) {
                observing.push(boardState[i * 4]);
            }
            if (observing.filter((x) => (x == "O")).length == 2 && observing.includes("")) {
                slotNmbr = observing.indexOf("") * 4;
                console.log("now I win diagonally! Slot:" + (slotNmbr + 1));
            }
        }
        if (slotNmbr == -1) { //check for winning diagonally ( / )
            observing = [];
            for (let i = 0; i < 3; i++) {
                observing.push(boardState[i * 2 + 2]);
            }
            if (observing.filter((x) => (x == "O")).length == 2 && observing.includes("")) {
                slotNmbr = observing.indexOf("") * 2 + 2;
                console.log("now I win diagonally! Slot:" + (slotNmbr + 1));
            }
        }
    }
    function randomMove() {
        if (slotNmbr == -1) {
            slotNmbr = possibleSlots[Math.floor(Math.random() * possibleSlots.length)]; //random move
        }
    }
}

function drawWinningSlots() {
    winnigSlots.map((x) => document.getElementById("slot" + (x + 1)).setAttribute("style", "background-color: rgba(13, 218, 40, 0.87) !important"));
    if (boardState[winnigSlots[0]] == Players[0]) {
        score1++;
    } else {
        score2++;
    }
    document.getElementById("scorePlayer1").innerHTML = "Score of Player 1: " + score1;
    document.getElementById("scorePlayer2").innerHTML = "Score of Player 2: " + score2;
}

function isBoardEmpty() {
    return !boardState.includes("X") && !boardState.includes("O");
}