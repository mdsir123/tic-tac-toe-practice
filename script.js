let board = document.querySelector(".board")
let startBtn = document.querySelector(".button")

let gameOn = false
let cross = true

let count = 0

let msg = document.querySelector(".message")

let allCells = document.querySelectorAll(".cell")


let victoryAudio = new Audio("./vicAud.mp3")
let gameStart = new Audio("./gamestart.mp3")
let clickAudio = new Audio("./click12.aac")
let tieAudio = new Audio("./tie.mp3")
let wrongAudio = new Audio("./wrong.mp3")

startBtn.addEventListener("click", ()=>{
    if(!gameOn){
        startBtn.innerHTML = "Reset"
        msg.innerHTML = "Player X's turn"
        gameStart.play();
        cross = true
        count = 0
    } else {
        msg.innerHTML = ""
        startBtn.innerHTML = "Start"
    }
    reset();

    gameOn = !gameOn
})

function reset(){
    for(let i = 0; i < allCells.length; i++){
        allCells[i].innerHTML = ""
    }
}

board.addEventListener("click", (e)=>{
    if(gameOn && e.target.innerHTML == ""){
        let myCell = e.target;
        count++
        clickAudio.play()
        if(cross){
            myCell.innerHTML = "X";
            myCell.style.color = "red"
            msg.innerHTML = "Player 0's turn"
        } else {
            myCell.innerHTML = 0
            myCell.style.color = 'black'
            msg.innerHTML = "Player X's turn"
        }
        cross = !cross


        let output = checkWinner()
        if(output == 1){
            msg.innerHTML = "Player X wins the Game";
            victoryAudio.play()
            restartGame()
        } else if(output == 0){
            msg.innerHTML = "Player 0 wins the Game"
            victoryAudio.play()
            restartGame()
        }else if(count == 9){
            msg.innerHTML = "TIE"
            tieAudio.play()
            restartGame()
        }
    } else {
        wrongAudio.play()
    }
})

function checkWinner(){

    if(
        (allCells[0].innerHTML == "0" && allCells[1].innerHTML == "0" && allCells[2].innerHTML == "0" ) ||
        (allCells[3].innerHTML == "0" && allCells[4].innerHTML == "0" && allCells[5].innerHTML == "0" ) ||
        (allCells[6].innerHTML == "0" && allCells[7].innerHTML == "0" && allCells[8].innerHTML == "0" ) ||
        (allCells[0].innerHTML == "0" && allCells[3].innerHTML == "0" && allCells[6].innerHTML == "0" ) ||
        (allCells[1].innerHTML == "0" && allCells[4].innerHTML == "0" && allCells[7].innerHTML == "0" ) ||
        (allCells[2].innerHTML == "0" && allCells[5].innerHTML == "0" && allCells[8].innerHTML == "0" ) ||
        (allCells[0].innerHTML == "0" && allCells[4].innerHTML == "0" && allCells[8].innerHTML == "0" ) ||
        (allCells[6].innerHTML == "0" && allCells[4].innerHTML == "0" && allCells[2].innerHTML == "0" )
    ) return 0

    else if(
        (allCells[0].innerHTML == "X" && allCells[1].innerHTML == "X" && allCells[2].innerHTML == "X" ) ||
        (allCells[3].innerHTML == "X" && allCells[4].innerHTML == "X" && allCells[5].innerHTML == "X" ) ||
        (allCells[6].innerHTML == "X" && allCells[7].innerHTML == "X" && allCells[8].innerHTML == "X" ) ||
        (allCells[0].innerHTML == "X" && allCells[3].innerHTML == "X" && allCells[6].innerHTML == "X" ) ||
        (allCells[1].innerHTML == "X" && allCells[4].innerHTML == "X" && allCells[7].innerHTML == "X" ) ||
        (allCells[2].innerHTML == "X" && allCells[5].innerHTML == "X" && allCells[8].innerHTML == "X" ) ||
        (allCells[0].innerHTML == "X" && allCells[4].innerHTML == "X" && allCells[8].innerHTML == "X" ) ||
        (allCells[6].innerHTML == "X" && allCells[4].innerHTML == "X" && allCells[2].innerHTML == "X" )
    ) return 1

    else return -1
}

function restartGame(){
    startBtn.innerHTML = "Game is Starting..."
    startBtn.disabled = true
    board.classList.add("disabled")

    setTimeout(() => {
        reset()
        startBtn.disabled = false
        board.classList.remove("disabled")
        // startBtn.innerHTML = "Start"
        // msg.innerHTML = ""
        // gameOn = false

        startBtn.click()
    }, 3000);
}