"use strict";

document.rangeform.onsubmit=function() {

  var from = new Date(document.rangeform.from.value);
  var to = new Date(document.rangeform.to.value);
	var earliest = new Date('2011-01-01');
	var yesterday = new Date();
	yesterday.setDate(yesterday.getDate() - 1);

	if (from < earliest || to >= yesterday) {
		alert ('bad date!');
	}
  	console.log(from + '--' + to + '--' +yesterday);
  	return false;
};


var chart = c3.generate({
    data: {
        x : 'date_time',
			  xFormat: '%Y-%m-%d %H:%M:%S',
				url: 'data/2011.csv',
				type: 'bar',
        groups: [
            ['Air_Temp','Barometric_Press','Wind_Speed']
        ],
        hide: ['Dew_Point','Relative_Humidity','Wind_Dir','Wind_Gust'],
			  onclick: function (d) { 
			  	console.log(d);
			  }
    },
    color: {
        pattern: ['#C94C24', '#2D8BCF', '#A2CEA5', 'transparent']
    },
        subchart: {
        show: true
    },
    axis: {
        x: {
            type: 'category',
            tick: {
                count: 12,
                format: '%Y-%m-%d %H:%M:%S',
					      rotate: 0,
								culling: {
                    max: 12 // the number of tick texts will be adjusted to less than this value
                }
            }
        }
    },
    legend: {
			  hide: ['Dew_Point','Relative_Humidity','Wind_Dir','Wind_Gust'],
			  position: 'bottom'
		}
});