$(function() {
  'use strict';

  //http://code.activestate.com/recipes/578497-eight-queen-problem-javascript/

  var OCCUPIED = 1; // field is in use
  var FREE = 0; // field is not in use
  var columnNames = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
  var numColumns = 4;
  var solutionsList = [];

  function Queen(numColumns) {

    this.width = numColumns;
    this.lastRow = this.width - 1;
    this.columns = new Array(this.width);

    var numberOfDiagonals = 2 * this.width - 1;
    this.diagDown = new Array(numberOfDiagonals);
    this.diagUp = new Array(numberOfDiagonals);
    this.solutions = [];

    for (var index = 0; index < numberOfDiagonals; ++index) {
      if (index < this.width) {
        this.columns[index] = -1;
      }
      this.diagDown[index] = FREE;
      this.diagUp[index] = FREE;
    }
    this.position = numColumns;


    // searches for all possible solutions
    this.calculateSolutions = function(row) {
      for (var column = 0; column < numColumns; column++) {
        console.log('-----------');
        console.log('Pos: ' + columnNames[row] + (column + 1));
        // current column blocked?
        if (this.columns[column] >= 0) {
          console.log('column blocked');
          continue;
        }

        // relating diagonale '\' depending on current row and column
        var diagDownIndex = row + column;
        if (this.diagDown[diagDownIndex] === OCCUPIED) {
          console.log('diagDown occupied');
          continue;
        }

        // relating diagonale '/' depending on current row and column
        var diagonalUpIndex = this.position - 1 - row + column;
        if (this.diagUp[diagonalUpIndex] === OCCUPIED) {
          console.log('diagUp occupied');
          continue;
        }

        // occupying column and diagonals depending on current row and column
        this.columns[column] = row;
        this.diagDown[diagDownIndex] = OCCUPIED;
        this.diagUp[diagonalUpIndex] = OCCUPIED;

        if (row === (this.width - 1)) {
          this.solutions.push(this.columns.slice(0));
          console.log('================= SUCCESS =================');
          console.log(this.solutions);

          for (var rowIndex = 0; rowIndex < this.solutions.length; ++rowIndex) {
            var solution = this.solutions[rowIndex];
            var line = '';
            for (var colIndex = 0; colIndex < this.solutions.length; ++colIndex) {
              line += columnNames[colIndex] + (solution[colIndex] + 1 + ' ');
            }
            console.log(line);
          }
        } else {
          this.calculateSolutions(row + 1);
        }

        this.columns[column] = -1;
        console.log('<========== BACKTRACKING');
        this.diagDown[diagDownIndex] = FREE;
        this.diagUp[diagonalUpIndex] = FREE;
      }
    };
  }

  var board = new Queen(numColumns);
  board.calculateSolutions(0);

  console.log('Found ' + board.solutions.length + ' solutions');

  for (var rowIndex = 0; rowIndex < board.solutions.length; ++rowIndex) {
    var solution = board.solutions[rowIndex];
    var line = [];
    for (var colIndex = 0; colIndex < solution.length; ++colIndex) {
      line.push(columnNames[colIndex] + (solution[colIndex]));
    }
    solutionsList.push(line);
  }

  console.log(solutionsList);

  function displaySolution(solutionId) {

  }

}); // page loaded
