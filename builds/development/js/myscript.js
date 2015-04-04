$(function() {

'use strict';

function getMean(myArray) {
  var mean = myArray.reduce(function(a,b) {
    return a + b;
  })/myArray.length;
  return mean.toFixed(2);
} //getMean

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
} //getMedian


function processData(data) {
  var myData = [];

  var myDates = ['x'];
  var meanTemps = ['Mean Temperature'];
  var medTemps = ['Median Temperature'];
  var meanPress = ['Mean Pressure'];
  var medPress = ['Median Pressure'];
  var meanSpeeds = ['Mean Speed'];
  var medSpeeds = ['Median Speed'];

  for (var key in data) {
    if (data.hasOwnProperty(key)) {
      if ((data[key].t !== null) 
        && (data[key].p !== null) 
        && (data[key].s !== null)) {
        myDates.push(key);
        meanTemps.push(getMean(data[key].t));
        medTemps.push(getMedian(data[key].t));
        meanPress.push(getMean(data[key].p));
        medPress.push(getMedian(data[key].p));
        meanSpeeds.push(getMean(data[key].s));
        medSpeeds.push(getMedian(data[key].s));
      } //data is not null
    } // hasOwnProperty
  } // for key in data

  myData.push(myDates, meanTemps, medTemps, meanPress, medSpeeds, meanSpeeds);
  return myData;
} // Process Data

function generateChart(data) {
  var chart = c3.generate({

    data: {
      x: 'x',
      columns: data,
      type: 'bar',
      groups: [
          ['Mean Temperature','Median Temperature',
            'Mean Pressure','Median Pressure',
            'Mean Speed', 'Median Speed']
      ]
    },
    bar: {
      width: {
        ratio: 0.9
      }
    },
    axis: {
      x: {
        type: 'timeseries',
        tick: {
          format: '%Y-%m-%d'
        }
      } // x
    }, // axis
    subchart: {
      show: true
    } //subchart
  }); // chart
} // generateChart


function loadChart() {
  $.ajax({
    url: 'http://foundationphp.com/phpclinic/podata.php?&raw&callback=?',
    jsonpCallback: 'jsonReturnData',
    dataType: 'jsonp',
    data: {
      startDate:'20150305',
      endDate: '20150326',
      format: 'json'
    },
    success: function(response) {
      generateChart(processData(response));
    } //success

  }); //AJAX Call
} //load Chart

loadChart();

}); // Page Loaded