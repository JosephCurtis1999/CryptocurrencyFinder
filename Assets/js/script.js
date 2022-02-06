// variables for News Data API key
var apiKeyND = "pub_42803e674039751e4b30dc24c745534322c8";

var displayCurrency = document.getElementById("display-currency");
var modal = document.getElementById("modal1");
// Shows date at the top of the page
var currentDate =
  moment().format("dddd") + " " + moment().format("Do MMM YYYY");

var momentNow = moment();
$("#currentDay").html(momentNow.format("DD MMMM YYYY"));

var coinForm = document.getElementById("coin-form");
//api news
// my api key for news pub_42803e674039751e4b30dc24c745534322c8

var getCryptoCurrency = function (userInput) {
  getCryptoCurrencyData(userInput);
  saveSearch(userInput);
};

var getCryptoCurrencyData = function (userInput) {
  var apiURL =
    "https://newsdata.io/api/1/news?apikey=" +
    apiKeyND +
    "&country=gb&q=" +
    userInput;
  fetch(apiURL)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      // console.log(data);
      if (data.totalResults == 0) {
        modal.style.display = "block";
        var okButton = document.getElementById("ok-button")
        okButton.addEventListener("click",function(event){
          modal.style.display="none"
        })
        return;
      }
      displayCurrency.textContent = userInput.toUpperCase();
      for (var i = 0; i < 4; i++) {
        // var titles = "";
        // var titles = data.results[i].title;
        // console.log(titles);
        var titleEl = document.getElementById("title-" + i);
        titleEl.textContent = data.results[i].title;
        // console.log(titleEl)

        var sourceEl = document.getElementById("source-" + i);
        if(data.results[i].creator==null){
          sourceEl.textContent= " "
        }
        else{
          sourceEl.textContent =data.results[i].creator+" | " +data.results[i].pubDate.split(" ")[0];
        }
        // console.log(sourceEl)

        var contentEl = document.getElementById("content-" + i);
        if(data.results[i].content==null){
          contentEl.textContent= " "
        }
        else{
          contentEl.textContent = data.results[i].content.slice(0, 110) + "...";
        }
        // console.log(contentEl)

        var readMoreEl = document.getElementById("read-more-" + i);
        readMoreEl.href = data.results[i].link;
        // console.log(readMoreEl)
        searchIndex = i;
      }
    });
    return;
};

var getCryptoSymbol = function (userInput) {
  var apiURLPrimary = "https://min-api.cryptocompare.com/data/top/totalvolfull?limit=10&tsym=USD";
    // "https://min-api.cryptocompare.com/data/pricemultifull?fsyms=BTC&tsyms=USD,EUR";
  fetch(apiURLPrimary)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      for(var i=0;i<10;i++){
        var coinFullName= data.Data[i].CoinInfo.FullName
        var symbol=data.Data[i].CoinInfo.Name;
        console.log(coinFullName)
        console.log(userInput)
        // PROBLEM HERE
        // we're trying to compare user input (bitcoin for example) to all cryptocurrencies available in the api above
        // then we're trying to return the symbol for this crypto (bitcoin will return BTC) 
        // this symbol will be used in the API below
        if(coinFullName == userInput){
          console.log(symbol)
        //   // getCryptoPrice(symbol);
          return;
        }
      }
    });
};

// var getCryptoPrice = function(symbol){
//   var apiURLPrimaryData = "https://min-api.cryptocompare.com/data/pricemultifull?fsyms="+symbol+"&tsyms=USD,EUR,GBP"
//   fetch(apiURLPrimaryData)
//     .then(function (response) {
//       return response.json();
//     })
//     .then(function (data) {
//       console.log(data);
//       // for(i=0;i<3;i++){
//       //   console.log("hello")
//       // }
//       // var imageURL = document.getElementById("display-image-crypto");
//       // imageURL.setAttribute("src",data.Display.BTC.EUR.IMAGEURL)

//     })
// }


var saveSearch = function (userInput) {
  var historyEl = document.getElementById("history");
  var localStorageCurrencies = "";
  var existingCurrencies = JSON.parse(
    localStorage.getItem(localStorageCurrencies)
  );
  var newCurrency = {
    currency: userInput,
  };
  var updatedCurrencies = [newCurrency];
  if (existingCurrencies) {
    updatedCurrencies = updatedCurrencies.concat(existingCurrencies);
  }
  localStorage.setItem(
    localStorageCurrencies,
    JSON.stringify(updatedCurrencies)
  );
  for (var i = 0; i < updatedCurrencies.length; i++) {
    var listItemEl = document.createElement("li");
    var buttonEl = document.createElement("button");
    listItemEl.setAttribute("class", "collection-item hoverable");
    buttonEl.setAttribute("class", "custom-btn-history");
    buttonEl.textContent = updatedCurrencies[i].currency.toUpperCase();
    historyEl.appendChild(listItemEl);
    listItemEl.appendChild(buttonEl);
    buttonEl.addEventListener("click", function () {
      userInput = updatedCurrencies[i].currency;
      getCryptoCurrencyData(userInput);
      return;
    });
    return;
  }
};

//Event Listener for form
coinForm.addEventListener("submit", function (event) {
  event.preventDefault();
  var userInput = document.getElementById("textarea1").value.trim();
  // console.log(userInput);
  getCryptoCurrency(userInput);
  getCryptoSymbol(userInput);
});


