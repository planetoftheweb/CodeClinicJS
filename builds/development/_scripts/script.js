(function() {
  'use strict';

  function createTable(source, target) {
    var ajaxRequest = new XMLHttpRequest();
    var tableRows, tableData, output, targetNode;

    targetNode = document.querySelector(target);
    ajaxRequest.onload = function(e) {
      tableRows = e.target.responseText.split('\r');
      output = '<table>';

      for (var row = 0; row < tableRows.length; row++) {
        tableData = tableRows[row].split(',');
        output += '<tr>';

        for (var cell = 0; cell < tableData.length; cell++) {
          if (row===0) {
            output+= '<th>'+ tableData[cell] + '</th>';
          } else {
            output+= '<td>'+ tableData[cell] + '</td>';
          } // row 0
        } // go through cells

      } // go through rows

      output += '</table>';
      targetNode.innerHTML = output;
    }; //ajaxRequest

    ajaxRequest.open('GET', source, true);
    ajaxRequest.responseType = 'text';
    ajaxRequest.send();
  } //create Table

  createTable('_assets/first_semester.csv', '#one');
  createTable('_assets/second_semester.csv', '#two');

})();
