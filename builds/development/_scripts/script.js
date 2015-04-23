(function(){
  'use strict';

  function createTable(source, target) {
    var ajaxRequest = new XMLHttpRequest();
    var tableRows, tableData, output, targetNode;

    targetNode = document.querySelector(target);

    ajaxRequest.onload = function(e) {
      console.log(e.target);
    };

    ajaxRequest.open('GET', source, true);
    ajaxRequest.responseType = 'text';
    ajaxRequest.send();

  }

  createTable('_assets/first_semester.csv', '#one');
  createTable('_assets/second_semester.csv', '#two');
})();