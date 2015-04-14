$(function() {
  'use strict';

  /* Based on: 
    http://code.activestate.com/recipes/578497-eight-queen-problem-javascript/
    By Thomas Lehmann
  */

  var OCCUPIED = 1; // field is in use
  var FREE = 0; // field is not in use
  var columnNames = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
  var numColumns = 8;
  var allSolutions = [];
  var logging = false;
  var solutionsQty;
  var currentSolution = 0;

  function Board() {

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
    this.tryNewQueen = function(row) {
      for (var column = 0; column < numColumns; column++) {
        logging && console.log('-----------');
        logging && console.log('Pos: ' + columnNames[row] + (column + 1));
        // current column blocked?
        if (this.columns[column] >= 0) {
          logging && console.log('column blocked');
          continue;
        }

        // relating diagonale '\' depending on current row and column
        var diagDownIndex = row + column;
        if (this.diagDown[diagDownIndex] === OCCUPIED) {
          logging && console.log('diagDown occupied');
          continue;
        }

        // relating diagonale '/' depending on current row and column
        var diagonalUpIndex = this.position - 1 - row + column;
        if (this.diagUp[diagonalUpIndex] === OCCUPIED) {
          logging && console.log('diagUp occupied');
          continue;
        }

        // occupying column and diagonals depending on current row and column
        this.columns[column] = row;
        this.diagDown[diagDownIndex] = OCCUPIED;
        this.diagUp[diagonalUpIndex] = OCCUPIED;

        if (row === (this.width - 1)) {
          this.solutions.push(this.columns.slice(0));
          logging && console.log('================= SUCCESS =================');
          logging && console.log(this.solutions);

          for (var rowIndex = 0; rowIndex < this.solutions.length; ++rowIndex) {
            var solution = this.solutions[rowIndex];
            var line = '';
            for (var colIndex = 0; colIndex < this.solutions.length; ++colIndex) {
              line += columnNames[colIndex] + (solution[colIndex] + 1 + ' ');
            }
            logging && console.log(line);
          }
        } else {
          this.tryNewQueen(row + 1);
        }

        this.columns[column] = -1;
        logging && console.log('<========== BACKTRACKING');
        this.diagDown[diagDownIndex] = FREE;
        this.diagUp[diagonalUpIndex] = FREE;
      }
    };
  }

  var myBoard = new Board();
  myBoard.tryNewQueen(0);
  solutionsQty = myBoard.solutions.length;
  document.querySelector('#currentSolution').innerHTML = 1;
  document.querySelector('#totalSolutions').innerHTML = solutionsQty;
  logging && console.log('Found ' + myBoard.solutions.length + ' solutions');

  for (var rowIndex = 0; rowIndex < myBoard.solutions.length; ++rowIndex) {
    var solution = myBoard.solutions[rowIndex];
    var singleSolution = [];
    for (var colIndex = 0; colIndex < solution.length; ++colIndex) {
      singleSolution.push(columnNames[colIndex] + (solution[colIndex] + 1));
    }
    allSolutions.push(singleSolution);
  }

  logging && console.log(allSolutions);

  function displaySolution(solutionId) {
    for (var index = 0; index < allSolutions[solutionId].length; index++) {
      document.querySelector('#' + allSolutions[solutionId][index] + ' .queen').style.fill = '#D33682';
    }
  }

  function clearBoard() {
    for (var colIndex = 0; colIndex < columnNames.length; colIndex++) {
      for (var rowIndex = 0; rowIndex < numColumns; rowIndex++) {
        document.querySelector('#' + columnNames[colIndex] + (rowIndex + 1) + ' .queen').style.fill = 'transparent';
      }
    }
  }

  displaySolution(currentSolution);

  // Events
  document.querySelector('#previous').addEventListener('click', function(e) {
    currentSolution--;
    if (currentSolution < 1) {
      currentSolution = allSolutions.length - 1;
    }
    clearBoard();
    document.querySelector('#currentSolution').innerHTML = currentSolution + 1;
    displaySolution(currentSolution);
  });

  document.querySelector('#next').addEventListener('click', function(e) {
    currentSolution++;
    if (currentSolution > allSolutions.length - 1) {
      currentSolution = 0;
    }
    clearBoard();
    document.querySelector('#currentSolution').innerHTML = currentSolution + 1;
    displaySolution(currentSolution);
  });

  document.querySelector('#Board').addEventListener('click', function(e) {
    if (e.target.tagName === 'path') {
      if (e.target.style.fill === 'rgb(211, 54, 130)') {
        e.target.style.fill = 'transparent';
      } else {
        e.target.style.fill = 'rgb(211, 54, 130)';
      }
    }
  }, false);
}); // page loaded
