const mongoose = require('mongoose');

var orderId ;
$(document).ready(function(){
    var settings = {
  "url": "/create/orderId",
  "method": "POST",
  "timeout": 0,
  "headers": {
    "Content-Type": "application/json"
  },
  "data": JSON.stringify({
    "amount": "50000"
  }),
};

//creates new orderId everytime
$.ajax(settings).done(function (response) {

  orderId=response.orderId;
  console.log(orderId);
  $("button").show();
});
});