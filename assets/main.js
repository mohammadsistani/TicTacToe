let isStart = true;
let currentPlayer = "X";
const resultEl = document.getElementById('result');
let playerTurnEl = document.querySelector("#player__turn");
let restartBtn = document.getElementById("restart_btn");
let cells = document.querySelectorAll(".cell");
let gameStates = new Array(9);



const winingSituations = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6],
]
function handlePlayerChange(){
    currentPlayer = currentPlayer==="X"?"O":"X";
    playerTurnEl.innerHTML = `Player <span>${currentPlayer}</span> play`;
}

function showResultMessage(result){
    if(result === "X"){
        resultEl.innerHTML=`Player X has Won`;
    }if(result === "O"){
        resultEl.innerHTML=`Player O has Won`;
    }if(result === "draw"){
        resultEl.innerHTML = "Game is Draw";
    }
}
function handleResultValidation(){
    let roundWon =false;
    let win;
    for(let i=0;i<=7;i++){
        const winSituation = winingSituations[i];
        let a = gameStates[winSituation[0]];
        let b = gameStates[winSituation[1]];
        let c = gameStates[winSituation[2]];
        if(a === undefined || b === undefined || c === undefined){
            continue;
        }
        if(a===b && b===c){
            roundWon=true;
            win = a ==="X" ? "X" : "O";
            break;
        }
        
    }
    if(roundWon){
        isStart=false;
        showResultMessage(win)
        return;
    }

    if(!gameStates.includes(undefined)){
        isStart = false;
        showResultMessage("draw");
    }

    handlePlayerChange();
}

function handleClickCell(clickCellEvent){
    const clickedCell = clickCellEvent.target;
    const clickedCellIndex = parseInt(clickedCell.getAttribute('data-cell-index'));

    if (gameStates[clickedCellIndex] !== undefined || !isStart) {
        return;
    }
    clickedCell.setAttribute("data-player-id",currentPlayer);
    handleCellPlayed(clickedCell,clickedCellIndex);
    handleResultValidation();
}
function handleCellPlayed(cell,cellIndex){
    gameStates[cellIndex] = currentPlayer;
    console.log(gameStates);
}

function restartGame(){
    for(cell of cells){
        if(cell.hasAttribute("data-player-id")){
            cell.removeAttribute("data-player-id");
        }
    }
    gameStates = new Array(9);
    resultEl.innerHTML = "";
    isStart = true;
    currentPlayer = "X";
}



cells.forEach((cell, idx, cellsarray) => {
  cell.addEventListener("click", handleClickCell);
});

restartBtn.addEventListener('click',restartGame);


