$(function() {
  'use strict';

  function getMean(myArray) {
    if (myArray!==null) {
      var average = myArray.reduce(function(a, b) { return a + b; })/myArray.length;
      return average;
    }
  }

  function getMedian(myArray) {
    var median;
    if (myArray!==null) {
      var sorted = myArray.sort(myArray);

      var middle = ((sorted.length) / 2);
      if(sorted.length % 2 === 0) {
        var medianA = sorted[middle];
        var medianB = sorted[middle-1];
        median = (medianA + medianB) / 2;
      } else {
        median = sorted[middle + 1];
      }
    }
    return median;
  }

  function processData(data) {
    var myData = [];

    var myDates = ['x'];
    var meanTemps = ['Mean Temperature'];
    var medTemps = ['Median Temperature'];
    var meanPress = ['Mean Pressure'];
    var medPress = ['Median Pressure'];
    var medSpeeds = ['Median Speed'];
    var meanSpeeds = ['Mean Speed'];
    var id = 0;

    for ( var key in data) {
      if (data.hasOwnProperty(key)) {
        myDates.push(key);
        meanTemps.push(getMean(data[key].t));
        medTemps.push(getMedian(data[key].t));
        meanPress.push(getMean(data[key].p));
        medPress.push(getMedian(data[key].p));
        meanSpeeds.push(getMean(data[key].s));
        medSpeeds.push(getMedian(data[key].s));
        id++;
      } //hasOwnProperty
    } //for loop


    myData.push(myDates, meanTemps, medTemps, meanPress, medSpeeds, meanSpeeds);
    return myData;
  } //processData

  var chartData = processData(jsonReturnData);
  console.log(chartData);

  document.rangeform.onsubmit=function() {
    var from = new Date(document.rangeform.from.value);
    var to = new Date(document.rangeform.to.value);
  	var earliest = new Date('2011-01-01');
  	var yesterday = new Date();
  	var validDate = true;
  	//var invalidMessage = '';
  	yesterday.setDate(yesterday.getDate() - 1);

  	if (from < earliest || to >= yesterday) {
  		 validDate = false;
  		$('#badDate').modal('show');
  	}
    	return false;
  };

  var chart = c3.generate({
    data: {
        x: 'x',
        columns: chartData,
        type: 'bar',
        groups: [
            ['Mean Temperature', 'Median Temperature', 'Mean Pressure', 'Median Pressure', 'Median Speed', 'Mean Speed']
        ]
    },
    axis: {
        x: {
            type: 'timeseries',
            tick: {
                format: '%Y-%m-%d'
            }
        }
    }
  }); //generate chart
}); // Function
