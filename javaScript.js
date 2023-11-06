//0 stands for Player Owned Tile

const board = document.getElementById("board")
const scoreDisplay = document.getElementById("scoreDisplay")
let curPScore = 0
let curBScore = 0
let jsBoard = []
let start = true

function gridSquare(index, tileValue){
    this.index = index
    this.tileValue = tileValue
}
//SET UP AS OBJECTS SET UP AS OBJECTS
function createBoard(){
    board.innerHTML = ""
    jsBoard = []
    start = true
    for(let i = 0; i < 9; i++){
        const domSquare = document.createElement("div")
        domSquare.addEventListener("click", playRound)
        domSquare.classList.add("boardSquare")
        domSquare.setAttribute("id", `square_${i}`)
        jsBoard.push(new gridSquare(`square_${i}`, undefined))
        board.appendChild(domSquare)
    }
}

function playRound(){
    console.log(this.classList.item(1))
    for(tile in jsBoard){
        if(jsBoard[tile].index === this.id && jsBoard[tile].tileValue === undefined){
            jsBoard[tile].tileValue = 0
            const addText = document.createElement("p")
            addText.innerText = "X"
            this.appendChild(addText)
        }
    }
    checkPlayerMoves()
    botRound()
}
//Check win conditions after all moves in a round
function checkPlayerMoves(){
    //Checking player horizontals
    if(
    (jsBoard[0].tileValue === 0 && jsBoard[1].tileValue === 0 && jsBoard[2].tileValue === 0)||
    (jsBoard[3].tileValue === 0 && jsBoard[4].tileValue === 0 && jsBoard[5].tileValue === 0)||
    (jsBoard[6].tileValue === 0 && jsBoard[7].tileValue === 0 && jsBoard[8].tileValue === 0)
    ){
        curPScore += 1
        setTimeout(createBoard, 1000)
    }
    //Checking player verticals
    if(
        (jsBoard[0].tileValue === 0 && jsBoard[3].tileValue === 0 && jsBoard[6].tileValue === 0)||
        (jsBoard[1].tileValue === 0 && jsBoard[4].tileValue === 0 && jsBoard[7].tileValue === 0)||
        (jsBoard[2].tileValue === 0 && jsBoard[5].tileValue === 0 && jsBoard[8].tileValue === 0)
    ){
        curPScore += 1
        setTimeout(createBoard, 1000)
    }
    //Checking player diagonals
    if(
        (jsBoard[0].tileValue === 0 && jsBoard[4].tileValue === 0 && jsBoard[8].tileValue === 0)||
        (jsBoard[2].tileValue === 0 && jsBoard[4].tileValue === 0 && jsBoard[6].tileValue === 0)
    ){
        curPScore += 1
        setTimeout(createBoard, 1000)
    }
    scoreDisplay.innerText = `You: ${curPScore} Bot: ${curBScore}`
}
function botRound(){
    const addText = document.createElement("p")
    let botChoice
    addText.innerText = "O"
    if(start === true){
        let firstMove = Math.floor(Math.random() * 9)
        if(jsBoard[firstMove].tileValue === 0){
            if(firstMove === 0){
                firstMove = 4
            }
            else{
                firstMove = 0
            }
        }
        botChoice = document.getElementById(`square_${firstMove}`)
        jsBoard[firstMove].tileValue = 1
        start = false
    }
    else{

    }
    botChoice.appendChild(addText)
}



createBoard()