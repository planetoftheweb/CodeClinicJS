$(function() {

'use strict';

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