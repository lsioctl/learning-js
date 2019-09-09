function validSolution(board){
    const resultSum = 1+2+3+4+5+6+7+8+9;
    // TODO: better in for loop or here ?
    let sum = 0;
    // without presetting the array, like
    // doing lineSum = []
    // we can end with NaN when doing
    // lineSum[i] += board[i][j];
    let lineSum = new Array(9).fill(0);
    let colSum = new Array(9).fill(0);

    for (let k=0; k < 9; k += 3) {
        for (let l=0; l < 9; l += 3) {
            for(let i=k; i < k+3; i++) {
                for (let j=l; j < l+3; j++) {
                    if (board[i][j] == 0 || board[j][i] == 0) {
                        return false;
                    }
                    sum += board[i][j];
                    lineSum[i] += board[i][j];
                    lineSum.push(board)
                    colSum[j] += board[i][j];
                }
            }
            // check if the 3*3 zone sum equals 45
            if (sum != 45) {
                return false;
            }
            sum = 0;
        }
    }
    // now we are sure each 3*3 zone sum equals 45
    // we can check each line and row sun equals 45
    for (let i=0; i < 9; i++) {
        if (colSum[i] != 45 || lineSum[i] != 45) {
            return false;
        }
    }
    return true;
}

console.log(validSolution(
    [[5, 3, 4, 6, 7, 8, 9, 1, 2], 
    [6, 7, 2, 1, 9, 5, 3, 4, 8],
    [1, 9, 8, 3, 4, 2, 5, 6, 7],
    [8, 5, 9, 7, 6, 1, 4, 2, 3],
    [4, 2, 6, 8, 5, 3, 7, 9, 1],
    [7, 1, 3, 9, 2, 4, 8, 5, 6],
    [9, 6, 1, 5, 3, 7, 2, 8, 4],
    [2, 8, 7, 4, 1, 9, 6, 3, 5],
    [3, 4, 5, 2, 8, 6, 1, 7, 9]]));

/*console.log(validSolution([
        [5, 3, 4, 6, 7, 8, 9, 1, 2], 
        [6, 7, 2, 1, 9, 0, 3, 4, 8],
        [1, 0, 0, 3, 4, 2, 5, 6, 0],
        [8, 5, 9, 7, 6, 1, 0, 2, 0],
        [4, 2, 6, 8, 5, 3, 7, 9, 1],
        [7, 1, 3, 9, 2, 4, 8, 5, 6],
        [9, 0, 1, 5, 3, 7, 2, 1, 4],
        [2, 8, 7, 4, 1, 9, 6, 3, 5],
        [3, 0, 0, 4, 8, 1, 1, 7, 9]
      ]));

console.log(validSolution([
  [ 1, 2, 3, 4, 5, 6, 7, 8, 9 ],
  [ 2, 3, 1, 5, 6, 4, 8, 9, 7 ],
  [ 3, 1, 2, 6, 4, 5, 9, 7, 8 ],
  [ 4, 5, 6, 7, 8, 9, 1, 2, 3 ],
  [ 5, 6, 4, 8, 9, 7, 2, 3, 1 ],
  [ 6, 4, 5, 9, 7, 8, 3, 1, 2 ],
  [ 7, 8, 9, 1, 2, 3, 4, 5, 6 ],
  [ 8, 9, 7, 2, 3, 1, 5, 6, 4 ],
  [ 9, 7, 8, 3, 1, 2, 6, 4, 5 ]
]));*/