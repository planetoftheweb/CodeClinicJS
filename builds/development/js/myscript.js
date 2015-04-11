$(function() {
  'use strict';



  var xhr = new XMLHttpRequest();
  xhr.onload = function(e) {
    //console.log(e.target.responseText);
    var insert = document.getElementById('A1');
    insert.innerHTML = e.target.responseText;
  }; //xhr
  xhr.open('GET', 'images/queen.svg', true);
  xhr.send();


  var OCCUPIED = 1; // field is in use
  var FREE = 0; // field is not in use
  var OUTPUT = 1; // when 1 show solutions


  function Queen() {
    this.width = 8;
    this.lastRow = 7;
    this.columns = [];
    this.rcolumns = [];

    this.diagonals1 = [];
    this.diagonals2 = [];
    this.solutions = [];

    for (var index = 0; index < 15; index++) {
      if (index < 8) {
        this.columns[index] = -1;
      }
      this.diagonals1[index] = 0;
      this.diagonals2[index] = 0;
    }

    // starts the search with initial parameters
    this.run = function() {
      this.calculate(0);
    };

    // searches for all possible solutions
    this.calculate = function(row) {
      for (var column = 0; column < 8; ++column) {
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
        var ixDiag2 = this.width - 1 - row + column;
        if (this.diagonals2[ixDiag2] === OCCUPIED) {
          continue;
        }

        // occupying column and diagonals depending on current row and column
        this.columns[column] = row;
        this.diagonals1[ixDiag1] = OCCUPIED;
        this.diagonals2[ixDiag2] = OCCUPIED;

        if (row === this.lastRow) {
          this.solutions.push(this.columns.slice());
        } else {
          this.calculate(row + 1);
        }

        this.columns[column] = -1;
        this.diagonals1[ixDiag1] = FREE;
        this.diagonals2[ixDiag2] = FREE;
      }
    };
  }

  var instance = new Queen();
  instance.run();
  //console.log('Found ' + instance.solutions.length + ' solutions');

  if (OUTPUT === 1) {
    for (var indexA = 0; indexA < instance.solutions.length; ++indexA) {
      var solution = instance.solutions[indexA];
      var line = '';
      for (var indexB = 0; indexB < solution.length; ++indexB) {
        line += '(' + (indexB + 1) + ',' + (solution[indexB] + 1) + ')';
      }
      console.log(line);
    }
  }

}); // page loaded
