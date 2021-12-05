const boxes = document.querySelectorAll('.box');
const text = document.querySelector('#heading');
const strategy = document.querySelector('#strategy');
const restartBtn = document.querySelector('#restart');
const board = document.querySelector('#board');

const spaces = [];
const tick_circle = 'O';
const tick_x = 'X';
let currentPlayer = tick_circle;

const drawBoard = (height, width) => {
  for (let i = 0; i < height; i++) {
    var row = document.createElement("div");
    row.id = i;
    board.appendChild(row);
    spaces[i] = [];
    for (let j = 0; j < width; j++) {
      var input = document.createElement("input");
      input.id = j;
      input.readOnly = true;
      input.type = "text";
      input.setAttribute('class', 'box'); 
      row.appendChild(input);
      //spaces[i].push[j]
    }
  }
  const boxes = document.querySelectorAll('.box');
  boxes.forEach((box, i) => {
    //box.setAttribute('id',i);
    box.addEventListener('click', boxClicked);
  });
  console.log(spaces);
};

const resetBoard = () => {
  while (board.firstChild) {
    board.removeChild(board.firstChild);
  }
};

const boxClicked = (e) => {
  const row_id = e.target.parentNode.id;
  const id = e.target.id;
  console.log(e);
  if (!spaces[row_id][id]) {
    spaces[row_id][id] = currentPlayer;
    e.target.value = currentPlayer;

    if (playerWon()) {
      text.innerText = `${currentPlayer} has won!`;
      // aspettiamo 1 secondo e poi torniamo alla schermata di inizio
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
      return;
    }

    if (playerDraw()) {
      return;
    }
    currentPlayer = currentPlayer === tick_circle ? tick_x : tick_circle;
  }
  //console.log(spaces);
};

const playerWon = () => {
  return false;
};

const playerDraw = () => {
  let draw = 0;
  spaces.forEach((space, i) => {
    if (spaces[i] !== null) draw++;
  });
  /*if (draw === 9) {
    console.log('è teoricamente un pareggio!!');
    text.innerText = `Draw`;
    restart();
  }*/
};

const restart = () => {
  resetBoard();

  spaces.forEach((space, i) => {
    spaces[i] = null;
  });
  boxes.forEach((box) => {
    box.value = '';
  });
  text.innerText = `Play`;
  // inseriamo queste righe di codice per mostrare la griglia
  // e togliere il menù nel momento in cui si inizia a giocare
  var x = document.getElementById("menu");
  x.style.display = x.style.display === 'none' ? '' : 'none';
  var x = document.getElementById("board");
  x.style.display = x.style.display === 'none' ? '' : 'none';
  var height = parseInt( document.getElementById('height').value );
  var width = parseInt( document.getElementById('width').value );
  drawBoard(height, width);
};
restartBtn.addEventListener('click', restart);
board.style.display = board.style.display === 'none' ? '' : 'none';


// styling per il select 

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