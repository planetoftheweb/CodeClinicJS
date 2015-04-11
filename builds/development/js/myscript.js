$(function() {
  'use strict';

  var OCCUPIED = 1; // field is in use
  var FREE = 0; // field is not in use
  var OUTPUT = 1; // when 1 show solutions
  var boardSize;
  var columnNames = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];


  document.querySelector('#C3 .queen').style.fill = 'red';


  function Queen() {
    this.position = 8;
    this.columns = [-1, -1, -1, -1, -1, -1, -1, -1];

    this.diagonals1 = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    this.diagonals2 = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    this.solutions = [];

    // searches for all possible solutions
    this.calculateSolutions = function(row) {
      for (var column = 0; column < 8; column++) {
        // current column blocked?
        if (this.columns[column] >= 0) {
          continue;
        }

        // relating diagonale '\' depending on current row and column
        var ixDiag1 = row + column;
        if (this.diagonals1[ixDiag1] === OCCUPIED) {
          continue;
        }

        // relating diagonale '/' depending on current row and column
        var ixDiag2 = this.position - 1 - row + column;
        if (this.diagonals2[ixDiag2] === OCCUPIED) {
          continue;
        }

        // occupying column and diagonals depending on current row and column
        this.columns[column] = row;
        this.diagonals1[ixDiag1] = OCCUPIED;
        this.diagonals2[ixDiag2] = OCCUPIED;

        if (row === 7) {
          this.solutions.push(this.columns.slice());
        } else {
          this.calculateSolutions(row + 1);
        }

        this.columns[column] = -1;
        this.diagonals1[ixDiag1] = FREE;
        this.diagonals2[ixDiag2] = FREE;
      }
    };
  }

  var board = new Queen();
  board.calculateSolutions(0);
  console.log('Found ' + board.solutions.length + ' solutions');

  for (var indexA = 0; indexA < board.solutions.length; ++indexA) {
    var solution = board.solutions[indexA];
    var line = '';
    for (var indexB = 0; indexB < solution.length; ++indexB) {
      line += columnNames[indexB] + (solution[indexB] + 1 + ' ');
    }
    //    console.log(line);
  }

}); // page loaded
