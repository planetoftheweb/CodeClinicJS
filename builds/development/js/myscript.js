$(function() {
  'use strict';

  var dropNode = document.querySelector('.app');
  var files;


  dropNode.addEventListener('dragenter', function(e) {
    e.preventDefault();
  });

  dropNode.addEventListener('dragover', function(e) {
    e.preventDefault();
  });

  dropNode.addEventListener('drop', function(e) {
    e.preventDefault();
    files = e.dataTransfer.files; //get the files from the drop event.
    console.log(files);
  });


}); //page loaded
