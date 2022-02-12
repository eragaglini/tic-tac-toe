const boxes = document.querySelectorAll('.box');
const text = document.querySelector('#heading');
//const option = document.querySelector('.options');
const board = document.querySelector('#board');

const option_three = document.querySelector('#three');
const option_five = document.querySelector('#five');
const option_seven = document.querySelector('#seven');

//const spaces = [];
let spaces = [];
const tick_circle = 'O';
const tick_x = 'X';
let currentPlayer = tick_circle;

const drawBoard = (size) => {
    for (let i = 0; i < size; i++) {
        var row = document.createElement("div");
        row.id = i;
        board.appendChild(row);
        spaces[i] = [];
        for (let j = 0; j < size; j++) {
            var input = document.createElement("input");
            input.id = j;
            input.readOnly = true;
            input.type = "text";
            input.setAttribute('class', 'box');
            row.appendChild(input);
            spaces[i][j] = null;
        }
    }
    const boxes = document.querySelectorAll('.box');
    boxes.forEach((box, i) => {
        box.addEventListener('click', boxClicked);
    });
};

const resetBoard = () => {
    while (board.firstChild) {
        board.removeChild(board.firstChild);
    }
};

const boxClicked = (e) => {
    let gameOver = playerMove(e.target);
    ai_move = bestMove();
    if (ai_move) {
        row = board.childNodes[ai_move.i];
        target = row.childNodes[ai_move.j];
    }
    if (!gameOver) {
        playerMove(target);
    }
};

const playerMove = (target) => {
    target.removeEventListener("click", boxClicked, false);
    const row_id = target.parentNode.id;
    const id = target.id;
    if (!spaces[row_id][id]) {
        spaces[row_id][id] = currentPlayer;
        target.value = currentPlayer;
        if (playerWon()) {
            text.innerText = `${currentPlayer} has won!`;

            setTimeout(function name(params) {
                text.innerText = `Play`;
                var x = document.getElementById("board");
                x.style.display = x.style.display === 'none' ? '' : 'none';
                var x = document.getElementById("menu");
                x.style.display = x.style.display === 'none' ? '' : 'none';
            }, 1000)
            return true;
        }

        if (playerDraw()) {
            text.innerText = `It's a draw!!`;
            
            setTimeout(function name(params) {
                text.innerText = `Play`;
                var x = document.getElementById("board");
                x.style.display = x.style.display === 'none' ? '' : 'none';
                var x = document.getElementById("menu");
                x.style.display = x.style.display === 'none' ? '' : 'none';
            }, 1000)
            return true;
        }
        currentPlayer = currentPlayer === tick_circle ? tick_x : tick_circle;
    }
};


const playerWon = () => {
    //const allEqual = arr => arr.every(v => v === currentPlayer)
    const allEqual = arr => arr.length && arr.reduce(function(a, b) {
        return (a === b) ? a : false;
    }) === arr[0];

    for (let index = 0; index < spaces.length; index++) {
        if (allEqual(spaces[index]) && spaces[index][0] !== null) {
            return spaces[index][0];
        }
    }

    const arrayColumn = (arr, n) => arr.map(x => x[n]);
    for (let index = 0; index < spaces[0].length; index++) {
        let column = arrayColumn(spaces, index);
        if (allEqual(column) && column[0] !== null) {
            return column[0];
        }
    }


    let diagonalArray = [];
    for (let i = 0; i < spaces.length; i++) {
        for (let j = 0; j < spaces.length; j++) {
            if (i == j) {
                diagonalArray.push(spaces[i][j]);
            }
        }
    }
    if (allEqual(diagonalArray) && diagonalArray[0] !== null) {
        // return true;
        return diagonalArray[0];
    }

    diagonalArray = [];
    for (let i = 0; i < spaces.length; i++) {
        for (let j = 0; j < spaces.length; j++) {
            if ((i + j) == (spaces.length - 1)) {
                diagonalArray.push(spaces[i][j]);
            }
        }
    }
    if (allEqual(diagonalArray) && diagonalArray[0] !== null) {
        return diagonalArray[0];
    }

    return false;
};

const playerDraw = () => {
    let draw = [];
    for (var i = 0; i < spaces.length; i++) {
        for (var j = 0; j < spaces.length; j++) {
            draw.push(spaces[i][j]);
        }
    }
    if (draw.every(element => element !== null)) {
        return 'tie';
    }
};

const restart = (size) => {
    console.log(size);
    resetBoard();
    currentPlayer = tick_circle;
    spaces = [];
    spaces.forEach((space, i) => {
        spaces[i] = null;
    });
    boxes.forEach((box) => {
        box.value = '';
    });
    text.innerText = `Play`;

    // show the grid and remove the menu
    var x = document.getElementById("menu");
    x.style.display = x.style.display === 'none' ? '' : 'none';
    var x = document.getElementById("board");
    x.style.display = x.style.display === 'none' ? '' : 'none';
    //var size = parseInt(document.getElementById('size').value);
    drawBoard(size);
};
option_three.addEventListener('click', function(){
    restart(3);
});
option_five.addEventListener('click', function(){
    restart(5);
});
option_seven.addEventListener('click', function(){
    restart(7);
});
board.style.display = board.style.display === 'none' ? '' : 'none';