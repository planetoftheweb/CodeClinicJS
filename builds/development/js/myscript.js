$(function() {
  'use strict';

  var dropNode = document.querySelector('.app');
  var documentNode = document.querySelector('.dropzone');
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
    
    for (var i = 0; i < files.length; i++) {
      var fileAsImage = new FileReader();
      fileAsImage.readAsDataURL(files[i]);

      fileAsImage.onloadend = function() {
        var newImage = document.createElement('img');
        newImage.src = this.result;
        documentNode.appendChild(newImage);
        console.log(i);
      }; // file is finished loading
    } // loop through the files
  }); // Files dropped on browser


}); //page loaded
