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
// date_time,Air_Temp,Barometric_Press,Dew_Point,Relative_Humidity,Wind_Dir,Wind_Gust,Wind_Speed
// 2011-01-01 00:05:27,18.90,30.30,15.70,87.40,144.20,15.00,12.40

  function processData(data) {
    var myData = [];
    var myItem = ['date','Mean Air Temperature', 'Median Air Temperature', 'Mean Barometic Pressure', 'Median Barometic Pressure', 'Mean Wind Speed', 'Median Wind Speed'];
    myData.push(myItem);
    for ( var key in data) {
      if (data.hasOwnProperty(key)) {
        myItem = [];
        var airTemp = data[key].t;
        var baroPress = data[key].p;
        var winSpeed = data[key].s;

        myItem.push(key, getMean(airTemp), getMedian(airTemp), getMean(baroPress),getMedian(baroPress),getMean(winSpeed),getMedian(winSpeed));
        myData.push(myItem);
      } //hasOwnProperty
    } //for loop

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
        x: 'date',
        columns: chartData,
        type: 'bar',
        groups: [
          ['2015-03-23','2015-03-24','2015-03-25']
        ]
    },
    axis: {
        x: {
            type: 'category' // this needed to load string x value
        }
    }
  });
});
