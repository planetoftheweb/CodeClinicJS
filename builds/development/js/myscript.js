$(function() {
  'use strict';

  //http://code.activestate.com/recipes/578497-eight-queen-problem-javascript/

  var OCCUPIED = 1; // field is in use
  var FREE = 0; // field is not in use
  var columnNames = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
  var numColumns = 8;
  var solutionsList = [];
  var logging = false;
  var solutionsQty;
  var currentSolution = 0;

  function Queen() {

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
          this.calculateSolutions(row + 1);
        }

        this.columns[column] = -1;
        logging && console.log('<========== BACKTRACKING');
        this.diagDown[diagDownIndex] = FREE;
        this.diagUp[diagonalUpIndex] = FREE;
      }
    };
  }

  var currQueen = new Queen();
  currQueen.calculateSolutions(0);
  solutionsQty = currQueen.solutions.length;
  document.querySelector('#currentSolution').innerHTML = 1;
  document.querySelector('#totalSolutions').innerHTML = solutionsQty;
  logging && console.log('Found ' + currQueen.solutions.length + ' solutions');

  for (var rowIndex = 0; rowIndex < currQueen.solutions.length; ++rowIndex) {
    var solution = currQueen.solutions[rowIndex];
    var line = [];
    for (var colIndex = 0; colIndex < solution.length; ++colIndex) {
      line.push(columnNames[colIndex] + (solution[colIndex] + 1));
    }
    solutionsList.push(line);
  }

  function displaySolution(solutionId) {
    for (var index = 0; index < solutionsList[solutionId].length; index++) {
      document.querySelector('#' + solutionsList[solutionId][index] + ' .queen').style.fill = '#D33682';
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
      currentSolution = solutionsList.length - 1;
    }
    clearBoard();
    document.querySelector('#currentSolution').innerHTML = currentSolution + 1;
    displaySolution(currentSolution);
  });

  document.querySelector('#next').addEventListener('click', function(e) {
    currentSolution++;
    if (currentSolution > solutionsList.length - 1) {
      currentSolution = 0;
    }
    clearBoard();
    document.querySelector('#currentSolution').innerHTML = currentSolution + 1;
    displaySolution(currentSolution);
  });

}); // page loaded
