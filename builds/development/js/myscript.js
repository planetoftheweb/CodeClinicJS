$(function() {

'use strict';

function getMean(myArray) {
  var mean = myArray.reduce(function(a,b) {
    return a + b;
  })/myArray.length;
  return mean.toFixed(2);
}

function getMedian(myArray) {
  var median;
  var sorted = myArray.sort(myArray);
  var middleIndex = Math.floor(sorted.length/2);

  if(sorted.length % 2 === 0) {
    var medianA = sorted[middleIndex];
    var medianB = sorted[middleIndex - 1];
    median = (medianA + medianB)/2;
  } else {
    median = sorted[middleIndex];
  }

  return median.toFixed(2);
}

var test = [1,2,4,2,10];
console.log('Mean: ' + getMean(test));
console.log('Median: ' + getMedian(test));



function loadChart() {
  $.ajax({
    url: 'http://foundationphp.com/phpclinic/podata.php?&raw&callback=?',
    jsonpCallback: 'jsonReturnData',
    dataType: 'jsonp',
    data: {
      startDate:'20150301',
      endDate: '20150302',
      format: 'json'
    },
    success: function(response) {
      console.log(response);
    } //success

  }); //AJAX Call
} //load Chart

loadChart();

}); // Page Loaded