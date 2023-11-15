//0 stands for Player Owned Tile

const board = document.getElementById("board")
const scoreDisplay = document.getElementById("scoreDisplay")
let curPScore = 0
let curBScore = 0
let jsBoard = []
let botSquares = []
let start = true
let pause = false
let gameStopper = false
let round = 0

function gridSquare(index, tileValue){
    this.index = index
    this.tileValue = tileValue
}
//CHANGE ARRAY TO 3 ARRAYS REPRESENTING ROWS
function createBoard(){
    board.innerHTML = ""
    jsBoard = []
    jsRows = []
    start = true
    pause = false
    gameStopper = false
    round = 0
    for(let i = 0; i < 9; i++){
        jsRows.push(new gridSquare(`square_${i}`, 0))
        if(i === 2 || i === 5 || i === 8){
            jsBoard.push(jsRows)
            jsRows = []
        }
        const domSquare = document.createElement("div")
        domSquare.addEventListener("click", playRound)
        domSquare.classList.add("boardSquare")
        domSquare.setAttribute("id", `square_${i}`)
        board.appendChild(domSquare)
    }
}

function playRound(){
    let pMove
    for(row in jsBoard){
        for(tile in jsBoard[row]){
            if(jsBoard[row][tile].index === this.id && jsBoard[row][tile].tileValue === 0 && pause != true){
                pMove = [row, tile]
                jsBoard[row][tile].tileValue = 1
                const addText = document.createElement("p")
                addText.innerText = "X"
                this.appendChild(addText)
                round += 1
            }
        }
    }
    if(pMove != undefined){
        checkPlayerMoves()
        botRound(pMove)
    }
    if(pause === false && round === 5){
        pause = true
        gameStopper = true
        setTimeout(createBoard, 1000)
    }
}

function checkPlayerMoves(){
    //Checking player horizontals
    if(gameStopper === false){
        if(
            (jsBoard[0].reduce((a, b)=> a+b.tileValue, 0) === 3)||
            (jsBoard[1].reduce((a, b)=> a+b.tileValue, 0) === 3)||
            (jsBoard[2].reduce((a, b)=> a+b.tileValue, 0) === 3)
        ){
            curPScore += 1
            setTimeout(createBoard, 1000)
            gameStopper = true
            pause = true
            
        }
    }
    //Checking player verticals
    if(gameStopper === false){
        for(column in jsBoard[0]){
            if(jsBoard[0][column].tileValue+jsBoard[1][column].tileValue+jsBoard[2][column].tileValue === 3){
                curPScore += 1
                setTimeout(createBoard, 1000)
                gameStopper = true
                pause = true
            }
        }
    }
    //Checking player diagonals
    if(gameStopper === false){
        if(
            (jsBoard[0][0].tileValue+jsBoard[1][1].tileValue+jsBoard[2][2].tileValue === 3)||
            (jsBoard[2][0].tileValue+jsBoard[1][1].tileValue+jsBoard[0][2].tileValue === 3)
        ){
            curPScore += 1
            setTimeout(createBoard, 1000)
            pause = true
            gameStopper = true
        }
    }
    scoreDisplay.innerText = `You: ${curPScore} Bot: ${curBScore}`
}



function botRound(playerMove){
    let botDirection = Math.floor(Math.random() * 3)
    let botText = document.createElement("p")
    botText.innerText = "O"
    let botChoice
    //botDirection ===    0 = horizontal, 1 = vertical, 2 = diagonal
    //3Steps, checks if it can win and if it can't tries to block the player on that directional, if it cant, picks first non occupied square
    if(pause === false){
        if(botDirection === 0){
            for(i in jsBoard){
                if(jsBoard[i].reduce((a, b)=> a+b.tileValue, 0) === -2){
                    for(item in jsBoard[i]){
                        if(item.tileValue === 0){
                            botChoice = item.index
                        }
                    }
                }
            }
            if(botChoice === undefined){
                for(i in jsBoard){
                    if(botChoice === undefined){
                        if(jsBoard[i].reduce((a, b)=> a+b.tileValue, 0) >= 1){
                            for(item in i){
                                if(item.tileValue === 0){
                                    botChoice = item.index
                                }
                            }
                        }
                    }
                }
            }
            if(botChoice === undefined){
                for(i in jsBoard[playerMove[0]]){
                    if(i.tileValue === 0){
                        botChoice = i.index
                    }
                }
            }
        }
        else if(botDirection === 1){
            for(column in jsBoard[0]){
                if(jsBoard[0][column]+jsBoard[1][column]+jsBoard[2][column] === -2){
                    if(jsBoard[0][column].tileValue === 0){
                        botChoice = jsBoard[0][column].index
                    }
                    else if(jsBoard[1][column].tileValue === 0){
                        botChoice = jsBoard[1][column].index
                    }
                    else if(jsBoard[2][column].tileValue === 0){
                        botChoice = jsBoard[2][column].index
                    }
                }
            }
            if(botChoice === undefined){
                for(column in jsBoard[0]){
                    if(jsBoard[0][column]+jsBoard[1][column]+jsBoard[2][column] >= 1){
                        if(jsBoard[0][column].tileValue === 0){
                            botChoice = jsBoard[0][column].index
                        }
                        else if(jsBoard[1][column].tileValue === 0){
                            botChoice = jsBoard[1][column].index
                        }
                        else if(jsBoard[2][column].tileValue === 0){
                            botChoice = jsBoard[2][column].index
                        }
                    }
                }
            }
            if(botChoice === undefined){
                for(i in jsBoard){
                    if(jsBoard[i][playerMove[1]].tileValue === 0){
                        botChoice = jsBoard[i][playerMove[1]].index
                    }
                }
            }
        }
        else if(botDirection === 2){
            if(
                (jsBoard[0][0].tileValue+jsBoard[1][1].tileValue+jsBoard[2][2].tileValue === -2)||
                (jsBoard[2][0].tileValue+jsBoard[1][1].tileValue+jsBoard[0][2].tileValue === -2)||
                (jsBoard[0][0].tileValue+jsBoard[1][1].tileValue+jsBoard[2][2].tileValue >= 1)||
                (jsBoard[2][0].tileValue+jsBoard[1][1].tileValue+jsBoard[0][2].tileValue >= 1)
            ){
                switch(0){
                    case jsBoard[0][0].tileValue:
                        botChoice = jsBoard[0][0].index
                        break;
                    case jsBoard[1][1].tileValue:
                        botChoice = jsBoard[1][1].index
                        break;
                    case jsBoard[2][2].tileValue:
                        botChoice = jsBoard[2][2].index
                        break;
                    case jsBoard[2][0].tileValue:
                        botChoice = jsBoard[2][0].index
                        break;
                    case jsBoard[0][2].tileValue:
                        botChoice = jsBoard[0][2].index
                        break;
                    default:{
                        for(i in jsBoard){
                            for(item in jsBoard[i]){
                                if(jsBoard[i][item].tileValue === 0){
                                    botChoice = jsBoard[i][item].index
                                }
                            }
                        }
                    }
                }
            }
        }
        if(botChoice === undefined){
            for(i in jsBoard){
                for(item in jsBoard[i]){
                    if(jsBoard[i][item].tileValue === 0){
                        botChoice = jsBoard[i][item].index
                    }
                }
            }
        }
        for(i in jsBoard){
            for(item in jsBoard[i]){
                if(jsBoard[i][item].index === botChoice){
                    jsBoard[i][item].tileValue = -1
                }
            }
        }
        if(botChoice != null){
            botChoice = document.getElementById(botChoice)
            botChoice.appendChild(botText)
        }
    }
    //Checking bot horizontals
    if(gameStopper === false){
        if(
        (jsBoard[0].reduce((a, b)=> a+b.tileValue, 0) === -3)||
        (jsBoard[1].reduce((a, b)=> a+b.tileValue, 0) === -3)||
        (jsBoard[2].reduce((a, b)=> a+b.tileValue, 0) === -3)
        ){
        curBScore += 1
        setTimeout(createBoard, 1000)
        gameStopper = true
        pause = true
        }
    }
    //Checking bot verticals
    if(gameStopper === false){
        for(column in jsBoard[0]){
            if(jsBoard[0][column].tileValue+jsBoard[1][column].tileValue+jsBoard[2][column].tileValue === -3){
                curBScore += 1
                setTimeout(createBoard, 1000)
                gameStopper = true
                pause = true
            }
        }
    }
    //Checking bot diagonals
    if(gameStopper === false){
        if(
            (jsBoard[0][0].tileValue+jsBoard[1][1].tileValue+jsBoard[2][2].tileValue === -3)||
            (jsBoard[2][0].tileValue+jsBoard[1][1].tileValue+jsBoard[0][2].tileValue === -3)
        ){
            curBScore += 1
            setTimeout(createBoard, 1000)
            pause = true
            gameStopper = true
        }
    }
    scoreDisplay.innerText = `You: ${curPScore} Bot: ${curBScore}`
}

createBoard()