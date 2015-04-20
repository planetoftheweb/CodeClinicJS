$(function() {
  'use strict';

  var documentNode = document.querySelector('#status');

  // Compare Strings
  function strComp(a, b) {
    return (a > b) ? 1 : (a === b) ? 0 : -1;
  }

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

    //Loop should go here

    //Read files as an image to display in the DOM
    var fileAsImage = new FileReader();
    fileAsImage.readAsDataURL(files[0]);

    fileAsImage.onloadend = function() {
      var newImage = document.createElement('img');
      newImage.src = this.result;
      documentNode.appendChild(newImage);

      //Read the dropped images as data and extract the EXIF info
      var fileAsData = new FileReader();
      fileAsData.file = files[0];
      fileAsData.readAsBinaryString(files[0]);

      fileAsData.onloadend = function() {
        var jpeg = new JpegMeta.JpegFile(this.result, this.file.name);
        var groups = [];
        var props;
        var group;
        var prop;
        documentNode.innerHTML += 'JPEG File ' + jpeg + '<br />';

        for (group in jpeg.metaGroups) {
          if (jpeg.metaGroups.hasOwnProperty(group)) {
            groups.push(jpeg.metaGroups[group]);
          }
        }

        groups.sort(function(a, b) {
          if (a.description === 'General') {
            return -1;
          } else if (b.description === 'General') {
            return 1;
          } else {
            return strComp(a.description, b.description);
          }
        });

        for (var i = 0; i < groups.length; i++) {
          group = groups[i];
          props = [];
          documentNode.innerHTML += '<h4>' + group.description + '</h4>';
          for (prop in group.metaProps) {
            if (group.metaProps.hasOwnProperty(prop)) {
              props.push(group.metaProps[prop]);
            }
          }
          props.sort(function(a, b) {
            return strComp(a.description, b.description);
          });
          for (var j = 0; j < props.length; j++) {
            prop = props[j];
            documentNode.innerHTML += '<em>' + prop.description + ':</em> ' + prop.value + '<br />';
          }
        } // Loop through groups
      }; //Read the files as data and extract EXIF info
    };// read the files as an image
  }); // Files Dropped
}); //page loaded
