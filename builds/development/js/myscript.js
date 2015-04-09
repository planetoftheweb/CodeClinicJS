$(function() {

  'use strict';
  var file, droppedImage;
  var target = $('.dropzone');
  var resultsText = document.querySelector('#results');

  function getImages(url) {
    console.log(url);
  }

  function dropZone(target) {
    target
      .on('dragover', function() {
        target.addClass('dragover');
        return false;
      })
      .on('dragend', function() {
        target.removeClass('dragover');
        return false;
      })
      .on('dragleave', function() {
        target.removeClass('dragover');
        return false;
      })
      .on('drop', function(e) {
        var fileReader;
        file = e.originalEvent.dataTransfer.files[0];
        e.stopPropagation();
        e.preventDefault();
        target.removeClass('dragover');

        droppedImage = new Image();
        fileReader = new FileReader();
        fileReader.onload = function(e) {
          droppedImage.src = e.target.result;
          target.html(droppedImage);
        };
        fileReader.readAsDataURL(file);
      }); // on drop
  } //drop zone

  dropZone(target);

  // Wait for events

    document.forms.compare.addEventListener('submit', function(e) {
      var formURL = document.compare.url.value;
      e.preventDefault();
      if (droppedImage !== undefined) {
        getImages(formURL);
      } else {
        resultsText.innerHTML = '<p class="alert alert-danger">Sorry, you must drop and image to compare against before hitting the compare button</p>';
      } 
    }); // form submitted
}); // page loaded