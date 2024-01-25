const gameInfo = document.querySelector(".game-info");
const boxes = document.querySelectorAll(".box");
const newGameBtn = document.querySelector(".new-game-btn");

let currentPlayer;
let gameGrid;

const winningPositions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

// let's create function to initilise the game
function initGame() {
    currentPlayer = "X";
    gameGrid = ["", "", "", "", "", "", "", "", ""];
    // UI pr empty bhi krna padega boxes ko
    boxes.forEach((box, index) => {
        box.innerText = "";
        boxes[index].style.pointerEvents = 'all';

        // initilize boxes wth css properties again
        box.classList = `box box-${index + 1}`
        // or
        // box.classList.remove("win");

    })
    newGameBtn.classList.remove('active');
    gameInfo.innerText = `Current Player - ${currentPlayer}`;
}

initGame();

function swapTurn() {
    if (currentPlayer == "X") {
        currentPlayer = "O"
    }
    else {
        currentPlayer = "X"
    }
    // UI update 
    gameInfo.innerText = `Current Player - ${currentPlayer}`;
}

function checkGameOver() {
    let answer = "";
    winningPositions.forEach((position) => {

        // console.log('position[0]: ', position[0])
        // console.log('(gameGrid[position[0]]: ', gameGrid[position[0]])

        // all 3 boxes should be non empty and exactly same value
        if ((gameGrid[position[0]] !== "" || gameGrid[position[1]] !== "" || gameGrid[position[2]] !== "") && (gameGrid[position[0]] == gameGrid[position[1]] && gameGrid[position[1]] == gameGrid[position[2]])) {
            // check if winner is x 
            if (gameGrid[position[0]] === 'X') {
                answer = "X";
            }
            else {
                answer = "O";
            }

            // disable pointer events
            boxes.forEach((box) => {
                box.style.pointerEvents = "none";
            })

            // now we know X/ O is winner
            boxes[position[0]].classList.add('win')
            boxes[position[1]].classList.add('win')
            boxes[position[2]].classList.add('win')

        }
    })

    // we've a winner
    if (answer !== "") {
        gameInfo.innerText = `Winner Player - ${currentPlayer}`;
        newGameBtn.classList.add('active');
        return;
    }

    // when there is tie
    let fillCount = 0;
    gameGrid.forEach((box) => {
        if (box !== "") {
            fillCount++;
        }
    });

    // //board is filled game is Tie
    if (fillCount == 9) {
        gameInfo.innerText = "Game Tied";
        newGameBtn.classList.add('active')

    }
}

function handleClick(index) {

    if (gameGrid[index] === "") {
        boxes[index].innerText = currentPlayer;
        gameGrid[index] = currentPlayer;
        boxes[index].style.pointerEvents = 'none';
        // swap karo turn ko
        swapTurn();
        // check koi jeet to nahi gaya
        checkGameOver();
    }
}

boxes.forEach((box, index) => {
    box.addEventListener("click", () => {
        handleClick(index);
    });
});

newGameBtn.addEventListener('click', initGame);