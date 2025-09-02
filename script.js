//your JS code here. If required.
const submit = document.querySelector("#submit");
const message = document.querySelector(".message");
const cells = document.querySelectorAll(".cell");

let players = ["", ""];
let turn = 0; //player1
let boardState = Array(9).fill(null);

const wins = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
]

submit.addEventListener("click", startGame);

function startGame() {
    const p1 = document.getElementById("player-1").value.trim();
    const p2 = document.getElementById("player-2").value.trim();
    console.log(p1, p2);

    if(!p1 || !p2) {
        alert("Please enter both player names");
        return;
    }

    players = [p1, p2];

    document.querySelector(".userDetail").style.display = "none";
    document.querySelector(".message").style.display = "block";
    document.querySelector(".board").style.display = "grid";
    
    message.innerText = `${players[turn]} you are up`;
    
    renderBoard();
}

function renderBoard() {
    cells.forEach((cell) => {
        cell.addEventListener("click", handleMove)
    })
}

function handleMove(e) {
    const id = e.target.id;
    const mark = turn === 0 ? "X" : "O";
    boardState[id-1] = mark;
    e.target.innerText = mark;
    e.target.classList.add("disabled");

    const winningLine = wins.find(line => line.every(i => boardState[i] === mark));

    if(winningLine) {
        console.log(winningLine);

        winningLine.forEach(i=> {
            document.getElementById(i+1).classList.add("winner");
        })

        message.innerText = `${players[turn]} congrtulation you won!`;
        return;
    }

    turn = 1 - turn;
    message.innerText = `${players[turn]} you are up`;
}