$(function() {
  'use strict';

  var target, myImages, droppedImage, file;
  var resultsText = document.querySelector('#results');

  target = $('.dropzone');

  function compareImages(imageURL) {
      //the following gets an image data from a URL
      var xhr = new XMLHttpRequest();
      xhr.onload = function(e) {
        resemble(e.target.responseURL).compareTo(file).onComplete(function(data) {
          if (data.misMatchPercentage < 20) {
            resultsText.querySelector('h3').insertAdjacentHTML('afterend', '<img class="match" src="' + e.target.responseURL + '" alt="photo">');
          } else {
            resultsText.querySelector('h3').insertAdjacentHTML('afterend', '<img src="' + e.target.responseURL + '" alt="photo">');
          }
        });
      }; //xhr
      xhr.open('GET', imageURL, true);
      xhr.responseType = 'blob';
      xhr.send();
    } //compareImages

  function getImages(url) {
    var request = new XMLHttpRequest();
    var list = [];
    request.onload = function() {
      var data = this.responseXML.querySelectorAll('img');
      for (var key in data) {
        if (data.hasOwnProperty(key)) {
          var image = data[key].src;
          if ((image !== undefined) &&
            ((image.lastIndexOf('.jpg') > 0))) {
            list.push(image);
          } //image filters
        } // hasOwnProperty
      } //key in data

      resultsText.innerHTML = '<h3>Searching Images...</h3>';
      for (var item in list) {
        if (list.hasOwnProperty(item)) {
          compareImages(list[item]);
        } //hasOwnProperty
      } // for item in list

    }; //onload

    request.open('GET', url);
    request.responseType = 'document';
    request.send();

    return list;
  }

  function dropZone(target, onDrop) {
    target.
    bind('dragover', function() {
      target.addClass('dragover');
      return false;
    }).
    bind('dragend', function() {
      target.removeClass('dragover');
      return false;
    }).
    bind('dragleave', function() {
      target.removeClass('dragover');
      return false;
    }).
    bind('drop', function(e) {
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
      onDrop(file);
    });
  }
  dropZone(target, function(file) {}); // execute when an image is dropped

  //Wait for events
  document.forms.compare.addEventListener('submit', function(e) {
    var formURL = document.compare.url.value;
    e.preventDefault();
    if (droppedImage !== undefined) {
      getImages(formURL);
    } else {
      resultsText.innerHTML = '<p class="alert alert-danger">Sorry, you must drop an image to compare against before hitting the compare button.</p>';
    }
  }, false);

}); // Page Loaded
