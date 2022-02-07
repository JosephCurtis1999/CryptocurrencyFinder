// variables for News Data API key
var apiKeyND = "pub_421842bf54a3bf0ae27130d690ea3e6b77ef";

// nadine api pub_42803e674039751e4b30dc24c745534322c8
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
    "&language=en&category=business,technology,politics,top,world&q=" +
    userInput;
  fetch(apiURL)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);

      displayCurrency.textContent = userInput.toUpperCase() + " / ";
      
      for (var i = 0; i < 4; i++) {

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
          contentEl.textContent = data.results[i].content.slice(0, 190) + "...";
        }
        // console.log(contentEl)

        var readMoreEl = document.getElementById("read-more-" + i);
        readMoreEl.href = data.results[i].link;
        // console.log(readMoreEl)

        var imageEl = document.getElementById("image-news-"+i)
        if(data.results[i].image_url==null){
          imageEl.setAttribute("src","./Assets/Images/img"+i+".jpg")
        }
        else{
          imageEl.setAttribute("src",data.results[i].image_url)
        }

        searchIndex = i;
      }
    });
    getCryptoSymbol(userInput)
};

var getCryptoSymbol = function (userInput) {
  var apiURLPrimary = "https://min-api.cryptocompare.com/data/top/totalvolfull?limit=100&tsym=USD";
  fetch(apiURLPrimary)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      for(var i=0;i<100;i++){
        var coinFullName= data.Data[i].CoinInfo.FullName
        var symbol=data.Data[i].CoinInfo.Name;
        if(coinFullName.toUpperCase() == userInput.toUpperCase()){
          // console.log(symbol)
          var chartEl = document.getElementById("chart")
          chartEl.setAttribute("href","https://www.cryptocompare.com"+data.Data[i].CoinInfo.Url)
          var symbol3El = document.getElementById("display-3symbol")
          symbol3El.textContent= data.Data[i].CoinInfo.Name+ " - ";
          var symbolEl = document.getElementById("display-symbol")
          
          var iconEl = document.getElementById("display-icon")
          iconEl.setAttribute("src","https://www.cryptocompare.com"+ data.Data[i].CoinInfo.ImageUrl )
          symbolEl.textContent= data.Data[i].DISPLAY.USD.FROMSYMBOL;
          getCryptoPrice(userInput,symbol);
          return;
        }

      }
    });
};

var getCryptoPrice = function(userInput,symbol){
  var apiURLPrimaryData = "https://min-api.cryptocompare.com/data/pricemultifull?fsyms="+symbol+"&tsyms=USD,EUR,GBP"
  fetch(apiURLPrimaryData)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data)
     displayInEur(data,symbol)
     displayInGBP(data,symbol)
     displayInUSD(data,symbol)
    })
}
var displayInEur=function(data,symbol){
  var priceEl= document.getElementById("price-0-0")
  priceEl.textContent=data.RAW[symbol].EUR.PRICE.toFixed(2)
  var changeEl =document.getElementById("change-0-1")
  changeEl.textContent=data.RAW[symbol].EUR.CHANGE24HOUR.toFixed(2)
  var volumeEl =document.getElementById("volume-0-2")
  volumeEl.textContent=data.RAW[symbol].EUR.VOLUME24HOUR.toFixed(2)
  var openEl =document.getElementById("open-0-3")
  openEl.textContent=data.RAW[symbol].EUR.OPENDAY.toFixed(2)
  var marketEl =document.getElementById("cap-0-4")
  marketEl.textContent=data.RAW[symbol].EUR.MKTCAP.toFixed(2)
  var supplyEl =document.getElementById("supply-0-5")
  supplyEl.textContent=data.RAW[symbol].EUR.SUPPLY.toFixed(2)
}

var displayInGBP=function(data,symbol){
  var priceEl= document.getElementById("price-1-0")
  priceEl.textContent=data.RAW[symbol].GBP.PRICE.toFixed(2)
  var changeEl =document.getElementById("change-1-1")
  changeEl.textContent=data.RAW[symbol].GBP.CHANGE24HOUR.toFixed(2)
  var volumeEl =document.getElementById("volume-1-2")
  volumeEl.textContent=data.RAW[symbol].GBP.VOLUME24HOUR.toFixed(2)
  var openEl =document.getElementById("open-1-3")
  openEl.textContent=data.RAW[symbol].GBP.OPENDAY.toFixed(2)
  var marketEl =document.getElementById("cap-1-4")
  marketEl.textContent=data.RAW[symbol].GBP.MKTCAP.toFixed(2)
  var supplyEl =document.getElementById("supply-1-5")
  supplyEl.textContent=data.RAW[symbol].GBP.SUPPLY.toFixed(2)
}

var displayInUSD=function(data,symbol){
  var priceEl= document.getElementById("price-2-0")
  priceEl.textContent=data.RAW[symbol].USD.PRICE.toFixed(2)
  var changeEl =document.getElementById("change-2-1")
  changeEl.textContent=data.RAW[symbol].USD.CHANGE24HOUR.toFixed(2)
  var volumeEl =document.getElementById("volume-2-2")
  volumeEl.textContent=data.RAW[symbol].USD.VOLUME24HOUR.toFixed(2)
  var openEl =document.getElementById("open-2-3")
  openEl.textContent=data.RAW[symbol].USD.OPENDAY.toFixed(2)
  var marketEl =document.getElementById("cap-2-4")
  marketEl.textContent=data.RAW[symbol].USD.MKTCAP.toFixed(2)
  var supplyEl =document.getElementById("supply-2-5")
  supplyEl.textContent=data.RAW[symbol].USD.SUPPLY.toFixed(2)
}


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
      // getCryptoSymbol(userInput);
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
  if (userInput == "") {
    modal.style.display = "block";
    var okButton = document.getElementById("ok-button")
    okButton.addEventListener("click",function(event){
      modal.style.display="none"
      return;
    })
    return;
  }
  else{
    var sliderEl = document.getElementById("slider-div")
    sliderEl.style.display="none";
    var contentdivEl=document.getElementById("content-div")
    contentdivEl.style.display="block";
    var footerEl=document.getElementById("footerEl")
    footerEl.setAttribute("style","position:relative;")
    getCryptoCurrency(userInput);
    getCryptoSymbol(userInput);}
});


$(document).ready(function(){
  $('.slider').slider();
});

