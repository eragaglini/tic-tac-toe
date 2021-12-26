const boxes = document.querySelectorAll('.box');
const text = document.querySelector('#heading');
const restartBtn = document.querySelector('#restart');
const board = document.querySelector('#board');

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
  const row_id = target.parentNode.id;
  const id = target.id;
  if (!spaces[row_id][id]) {
    spaces[row_id][id] = currentPlayer;
    target.value = currentPlayer;

    if (playerWon()) {
      text.innerText = `${currentPlayer} has won!`;
      
      var x = document.getElementById("restart");
      x.style.display = x.style.display === 'none' ? '' : 'none';
      setTimeout(function name(params) {
        text.innerText = `Play`;
        var x = document.getElementById("board");
        x.style.display = x.style.display === 'none' ? '' : 'none';
        var x = document.getElementById("menu");
        x.style.display = x.style.display === 'none' ? '' : 'none';
        var x = document.getElementById("restart");
        x.style.display = x.style.display === 'none' ? '' : 'none';
      }, 1000)
      return true;
    }

    if (playerDraw()) {
      text.innerText = `It's a draw!!`;
      
      var x = document.getElementById("restart");
      x.style.display = x.style.display === 'none' ? '' : 'none';
      setTimeout(function name(params) {
        text.innerText = `Play`;
        var x = document.getElementById("board");
        x.style.display = x.style.display === 'none' ? '' : 'none';
        var x = document.getElementById("menu");
        x.style.display = x.style.display === 'none' ? '' : 'none';
        var x = document.getElementById("restart");
        x.style.display = x.style.display === 'none' ? '' : 'none';
      }, 1000)
      return true;
    }
    currentPlayer = currentPlayer === tick_circle ? tick_x : tick_circle;
  }
};

const playerWon = () => {
  const allEqual = arr => arr.every( v => v === currentPlayer )

  for (let index = 0; index < spaces.length; index++) {
    if (allEqual(spaces[index])) {
      return true;
    }
  }

  const arrayColumn = (arr, n) => arr.map(x => x[n]);
  for (let index = 0; index < spaces[0].length; index++) {
    if (allEqual(arrayColumn(spaces, index))) {
      return true;
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
  if (allEqual(diagonalArray)) {
    return true;
  }

  diagonalArray = [];
  for (let i = 0; i < spaces.length; i++) {
    for (let j = 0; j < spaces.length; j++) {
      if ((i + j) == (spaces.length - 1)) {
        diagonalArray.push(spaces[i][j]);
      }
    }
  }
  if (allEqual(diagonalArray)) {
    return true;
  }
};

const playerDraw = () => {
  let draw = [];
  for(var i = 0; i < spaces.length; i++) {
    for(var j = 0; j < spaces.length; j++) {
      draw.push(spaces[i][j]);
    }
  }
  if(draw.every(element => element !== null)) {
    return true;
  }
};

const restart = () => {
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
  var size = parseInt( document.getElementById('size').value );
  drawBoard(size);
};
restartBtn.addEventListener('click', restart);
board.style.display = board.style.display === 'none' ? '' : 'none';


// styling for the select menu

var x, i, j, l, ll, selElmnt, a, b, c;
/* Look for any elements with the class "custom-select": */
x = document.getElementsByClassName("custom-select");
l = x.length;
for (i = 0; i < l; i++) {
  selElmnt = x[i].getElementsByTagName("select")[0];
  ll = selElmnt.length;
  /* For each element, create a new DIV that will act as the selected item: */
  a = document.createElement("DIV");
  a.setAttribute("class", "select-selected");
  a.innerHTML = selElmnt.options[selElmnt.selectedIndex].innerHTML;
  x[i].appendChild(a);
  /* For each element, create a new DIV that will contain the option list: */
  b = document.createElement("DIV");
  b.setAttribute("class", "select-items select-hide");
  for (j = 0; j < ll; j++) {
    /* For each option in the original select element,
    create a new DIV that will act as an option item: */
    c = document.createElement("DIV");
    c.innerHTML = selElmnt.options[j].innerHTML;
    c.addEventListener("click", function(e) {
        /* When an item is clicked, update the original select box,
        and the selected item: */
        var y, i, k, s, h, sl, yl;
        s = this.parentNode.parentNode.getElementsByTagName("select")[0];
        sl = s.length;
        h = this.parentNode.previousSibling;
        for (i = 0; i < sl; i++) {
          if (s.options[i].innerHTML == this.innerHTML) {
            s.selectedIndex = i;
            h.innerHTML = this.innerHTML;
            y = this.parentNode.getElementsByClassName("same-as-selected");
            yl = y.length;
            for (k = 0; k < yl; k++) {
              y[k].removeAttribute("class");
            }
            this.setAttribute("class", "same-as-selected");
            break;
          }
        }
        h.click();
    });
    b.appendChild(c);
  }
  x[i].appendChild(b);
  a.addEventListener("click", function(e) {
    /* When the select box is clicked, close any other select boxes,
    and open/close the current select box: */
    e.stopPropagation();
    closeAllSelect(this);
    this.nextSibling.classList.toggle("select-hide");
    this.classList.toggle("select-arrow-active");
  });
}

function closeAllSelect(elmnt) {
  /* A function that will close all select boxes in the document,
  except the current select box: */
  var x, y, i, xl, yl, arrNo = [];
  x = document.getElementsByClassName("select-items");
  y = document.getElementsByClassName("select-selected");
  xl = x.length;
  yl = y.length;
  for (i = 0; i < yl; i++) {
    if (elmnt == y[i]) {
      arrNo.push(i)
    } else {
      y[i].classList.remove("select-arrow-active");
    }
  }
  for (i = 0; i < xl; i++) {
    if (arrNo.indexOf(i)) {
      x[i].classList.add("select-hide");
    }
  }
}

/* If the user clicks anywhere outside the select box,
then close all select boxes: */
document.addEventListener("click", closeAllSelect);