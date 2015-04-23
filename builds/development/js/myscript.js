$(function() {
  'use strict';

  var documentNode = document.querySelector('.dropzone');
  var dropNode = document.querySelector('.app');
  var imageList = [];
  var files;

  function organizeFiles(){
    console.log('Before--------------------');
    console.log(imageList[0][1]);
    console.log(imageList[1][1]);
    imageList.sort(function(a, b){
     if(a[2] < b[2]) {
         return -1;
     } else {
         return 1;
     }
     return 0;
    });
    console.log('after--------------------');
    console.log(imageList[0][1]);
    console.log(imageList[1][1]);

    for (var i = 0; i < files.length; i++) {
      var fileAsImage = new FileReader();
      fileAsImage.readAsDataURL(imageList[i][0]);
      //when the images are done loading as files
      fileAsImage.onloadend = function() {
        var newImage = document.createElement('img');
        newImage.src = this.result;
        documentNode.appendChild(newImage);
      };// read the files as an image
    } // Loop through files


  } // organizeFiles

  //When someone puts an image in the app
  dropNode.addEventListener('dragenter', function(e) {
    e.preventDefault();
  });

  //When someone drags over our app
  dropNode.addEventListener('dragover', function(e) {
    e.preventDefault();
  });

  //When someone drops the image
  dropNode.addEventListener('drop', function(e) {
    e.preventDefault();
    files = e.dataTransfer.files; //get the files from the drop event

    //Loop through all of the dropped images
    for (var i = 0; i < files.length; i++) {
      //Read files as an image to display in the DOM
      var fileAsData = new FileReader();

      fileAsData.file = files[i];
      fileAsData.readAsBinaryString(files[i]);

      //Read the dropped images as data and extract the EXIF info
      fileAsData.onloadend = function() {
        var jpeg = new JpegMeta.JpegFile(this.result, this.file.name);
        var caption = jpeg.iptc.caption;
        if (caption===undefined) {
          caption = '';
        }
        imageList.push([this.file, this.file.name, caption.value]);
        if (imageList.length === i) {
          organizeFiles();
        }
      }; //Read the files as data and extract EXIF
    } // loop through files
  }); // Files Dropped

}); //page loaded