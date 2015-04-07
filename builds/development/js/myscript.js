$(function() {
  'use strict';

  var target, myImages, droppedImage;
  target = $('.dropzone');

  function compareImages(imageURL) {
      //the following gets an image data from a URL
      var xhr = new XMLHttpRequest();
      xhr.onload = function(e) {
        //console.log(e);
      }; //xmr
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
      var file, droppedImage, fileReader;

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

  myImages = getImages('evilsite.html');

  dropZone(target, function(file){

  }); // execute when an image is dropped



}); // Page Loaded
