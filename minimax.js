function bestMove() {
    return minimax(spaces, 0, true).index;
}

function minimax(spaces, depth, isMaximizing) {
    
    var win = playerWon();
    if (win === 'X') {
        return { score: 10, depth: depth };
    }
    if (win === 'O') {
        return { score: -10, depth:depth };
    }

    draw = playerDraw();
    if (draw === 'tie') {
        return { score: 0, depth: depth };
    }
    var moves = [];
    var move = {};

    for (let i = 0; i < spaces.length; i++) {
        for (let j = 0; j < spaces[i].length; j++) {
            if (spaces[i][j] === null) {
                move.index = {i: i, j: j};
                if (isMaximizing) {
                    spaces[i][j] = tick_x;
                    var result = minimax(spaces, depth + 1, false);
                    spaces[i][j] = null;
                    move.score = result.score;
                } else {
                    spaces[i][j] = tick_circle;
                    var result = minimax(spaces, depth + 1, true);
                }
                spaces[i][j] = null;
                move.score = result.score;
                move.depth = result.depth;
                //moves.push(move);
                moves.push({index: move.index, score: move.score, depth: move.depth});
            }
        }
    }

    var bestMove;
    var minimum_depth = Infinity;
    if (isMaximizing) {
        var bestScore = -Infinity;
        for (var i = 0; i < moves.length; i++) {
            if (moves[i].score > bestScore || (moves[i].score == bestScore && moves[i].depth < minimum_depth)) {
                bestScore = moves[i].score;
                bestMove = i;
                minimum_depth = moves[i].depth;
            }
        }
    } else {
        var bestScore = Infinity;
        for (var i = 0; i < moves.length; i++) {
            if (moves[i].score < bestScore || (moves[i].score == bestScore && moves[i].depth < minimum_depth))  {
                bestScore = moves[i].score;
                bestMove = i;
                minimum_depth = moves[i].depth;
            }
        }
    }
    return moves[bestMove];
}