// variables for API keys
var apiKeyCMC = "2d0fde73-2204-4cb4-bffb-882e2f622e6b";
var apiKeyND = "pub_421842bf54a3bf0ae27130d690ea3e6b77ef";

// Shows date at the top of the page
var currentDate =
  moment().format("dddd") + " " + moment().format("Do MMM YYYY");

var momentNow = moment();
$("#currentDay").html(momentNow.format("DD MMMM YYYY"));

var coinForm = document.getElementById("coin-form");

coinForm.addEventListener("submit", function (event) {
  event.preventDefault();

  var userInput = document.getElementById("textarea1").value.trim();
  console.log(userInput);
});
