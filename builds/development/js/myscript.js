$(function() {
  'use strict';
  var chartData;
  var chart;

  function getMean(myArray) {
      var mean = myArray.reduce(function(a, b) { return a + b; })/myArray.length;
      return mean.toFixed(2);
  }

  function getMedian(myArray) {
    var median;
    var sorted = myArray.sort(myArray);

    var middle = Math.floor((sorted.length) / 2);
    if(sorted.length % 2 === 0) {
      var medianA = sorted[middle];
      var medianB = sorted[middle-1];
      median = (medianA + medianB) / 2;
    } else {
      median = sorted[middle + 1];
    }
    return median.toFixed(2);
  }

  function initChart(data) {
    chart = c3.generate({
      data: {
          x: 'x',
          columns: data,
          type: 'bar',
          groups: [
              ['Mean Temperature', 'Median Temperature', 'Mean Pressure', 'Median Pressure', 'Median Speed', 'Mean Speed']
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
          }
      },
      subchart: {
          show: true
      }
    }); //generate chart
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
        if ((data[key].t !== null) && 
            (data[key].p !== null) && 
            (data[key].s !== null)) {
          myDates.push(key);
          meanTemps.push(getMean(data[key].t));
          medTemps.push(getMedian(data[key].t));
          meanPress.push(getMean(data[key].p));
          medPress.push(getMedian(data[key].p));
          meanSpeeds.push(getMean(data[key].s));
          medSpeeds.push(getMedian(data[key].s));
          id++;
        }
      } //hasOwnProperty
    } //for loop


    myData.push(myDates, meanTemps, medTemps, meanPress, medSpeeds, meanSpeeds);
    return myData;
  } //processData


$.getJSON( 'http://foundationphp.com/phpclinic/podata.php?raw&callback=?',{
    startDate: '20150301',
    endDate: 20150321
  })
  .always(function() {
    chartData = processData(jsonReturnData);
    initChart(chartData);
  }); // Function
}); // jqxhr

//Events
  document.rangeform.onsubmit=function() {
    'use strict';
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
