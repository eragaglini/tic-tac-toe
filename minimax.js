function bestMove() {
    var newState =  minimax(spaces, 0, true, -Infinity, Infinity)[1];
    for (let i = 0; i < spaces.length; i++) {
        for (let j = 0; j < spaces[i].length; j++) {
            if (newState[i][j] !== spaces[i][j]) {
                return {i, j}
            }
        }        
    }

}

function minimax(state, depth, max, alpha, beta) {
    // minimax logic goes here
    let win = playerWon();
    if (win === "X") {
        return [10, state, depth];
    } else if (win === "O") {
        return [-10, state, depth];
    }
    let draw = playerDraw()
    if (draw) {
        return [0, state, depth];
    }

    if (max) {
        let maxState;
        let maxScore = -9999;
        for (let i = 0; i < state.length; i++) {
            for (let j = 0; j < state[i].length; j++) {
                if (state[i][j] == null) {
                    state[i][j] = "X";
                    if (beta <= alpha) {
                        state[i][j] = null;
                        continue;
                    }
                    let temp = minimax(state, depth + 1, false, alpha, beta);
                    if ((temp[0] - temp[2]) > maxScore) {
                        maxScore = temp[0] - temp[2];
                        alpha = maxScore;
                        maxState = JSON.parse(JSON.stringify(state));
                    }
                    state[i][j] = null;
                }
            }
        }
        return [maxScore,maxState,depth];
    } else {
        let minState;
        let minScore = 9999;
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                if (state[i][j] == null) {
                    state[i][j] = "O";
                    if (beta <= alpha) {
                        state[i][j] = null;
                        continue;
                    }
                    let temp = minimax(state, depth + 1, true, alpha, beta);
                    if ((temp[0] + temp[2]) < minScore) {
                        minScore = temp[0] + temp[2];
                        beta = minScore;
                        minState = JSON.parse(JSON.stringify(state));
                    }
                    state[i][j] = null;
                }
            }
        }
        return [minScore,minState,depth];
    }
}