$(function() {
  'use strict';

  var documentNode = document.querySelector('#dropzone');
  var imageList = [];

  //When someone puts an image in the app
  document.querySelector('.app').addEventListener('dragenter', function(e) {
    e.preventDefault();
  });

  //When someone drags over our app
  document.querySelector('.app').addEventListener('dragover', function(e) {
    e.preventDefault();
  });

  //When someone drops the image
  document.querySelector('.app').addEventListener('drop', function(e) {
    e.preventDefault();
    var files = e.dataTransfer.files; //get the files from the drop event

    //Loop through all of the dropped images
    for (var i = 0; i < files.length; i++) {
      //Read files as an image to display in the DOM
      var fileAsImage = new FileReader();
      var fileAsData = new FileReader();

      fileAsImage.readAsDataURL(files[i]);
      fileAsData.file = files[i];
      fileAsData.readAsBinaryString(files[i]);

      //when the images are done loading as files
      fileAsImage.onloadend = function() {
        var newImage = document.createElement('img');
        newImage.src = this.result;
        documentNode.appendChild(newImage);
      };// read the files as an image

      //Read the dropped images as data and extract the EXIF info
      fileAsData.onloadend = function() {
        var jpeg = new JpegMeta.JpegFile(this.result, this.file.name);
        if (jpeg.iptc.caption.value!==undefined) {
          console.log(jpeg.iptc.caption.value);
        }
      }; //Read the files as data and extract EXIF
    } // loop through files
  }); // Files Dropped

}); //page loaded
