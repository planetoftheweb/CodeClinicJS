$(function() {

  'use strict';
  var file, droppedImage;
  var target = $('.dropzone');
  var resultsText = document.querySelector('#results');

  function compareImages(imageURL) {
    var xhr = new XMLHttpRequest();
    xhr.onload = function(e) {
      resemble(e.target.responseURL).compareTo(file).onComplete(function(data) {
        if (data.misMatchPercentage < 20) {
          resultsText.querySelector('h3').insertAdjacentHTML('afterend', 
            '<img class="match" src="' + e.target.responseURL + '" alt="photo">');
        } else {
          resultsText.querySelector('h3').insertAdjacentHTML('afterend', 
            '<img src="' + e.target.responseURL + '" alt="photo">');
        }
      });// resemble call
    }; //onload
    xhr.open('GET', imageURL, true);
    xhr.responseType = 'blob';
    xhr.send();
  } //compareImages

  function getImages(url) {
    var request = new XMLHttpRequest();
    var list = [];
    request.onload = function(){
      var data = this.responseXML.querySelectorAll('img');
      for (var key in data) {
        if (data.hasOwnProperty(key)) {
          var image = data[key].src;
          if ((image !== undefined) &&
            ((image.lastIndexOf('.jpg') >0))) {
            list.push(image);
          } //image filters
        } //hasOwnProperty
      } // key in data

      resultsText.innerHTML = '<h3>Searching Images...</h3>';
      for (var item in list) {
        if (list.hasOwnProperty(item)) {
          compareImages(list[item]);
        } //hasOwnProperty
      } // for item in list
    }; // request

    request.open('GET', url);
    request.responseType = 'document';
    request.send();
  } //get Images

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