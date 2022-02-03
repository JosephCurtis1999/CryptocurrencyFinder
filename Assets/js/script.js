var apiKeyCMC = "2d0fde73-2204-4cb4-bffb-882e2f622e6b";
var apiKeyND = "pub_421842bf54a3bf0ae27130d690ea3e6b77ef";

var currentDate = moment().format('dddd') + " " + moment().format("Do MMM YYYY");


var interval = setInterval(function () {
    var momentNow = moment();
    $('#currentDay').html(momentNow.format('DD MMMM YYYY'));
}, 100);