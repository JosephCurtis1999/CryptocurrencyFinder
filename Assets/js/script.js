// variables for News Data API key
var apiKeyND = "pub_421842bf54a3bf0ae27130d690ea3e6b77ef";
//joe api pub_421842bf54a3bf0ae27130d690ea3e6b77ef
// nadine api pub_42803e674039751e4b30dc24c745534322c8
// rizwan api pub_4446310fc80473d1921d5256b1882cf7f047
var displayCurrency = document.getElementById("display-currency");
var modal = document.getElementById("modal1");
// Shows date at the top of the page
var currentDate =
  moment().format("dddd") + " " + moment().format("Do MMM YYYY");

var momentNow = moment();
$("#currentDay").html(momentNow.format("DD MMMM YYYY"));

var coinForm = document.getElementById("coin-form");

var getCryptoCurrency = function (userInput) {
  // the below function is to to display the news
  getCryptoCurrencyData(userInput);
  // the below function is to save the user search to local storage
  saveSearch(userInput);
};
// the function is responsible for the news api.
var getCryptoCurrencyData = function (userInput) {
  var apiURL =
    "https://newsdata.io/api/1/news?apikey=" +
    // there are two variables within this url, includes the api key and userinput that we have taken from the event listener
    apiKeyND +
    "&language=en&category=business,technology,politics,top,world&q=" +
    userInput;
  fetch(apiURL)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      // upon search displays a title for the table

      displayCurrency.textContent = userInput.toUpperCase() + " | ";

      for (var i = 0; i < 4; i++) {
        // using for loop to display the title for each news
        var titleEl = document.getElementById("title-" + i);
        titleEl.textContent = data.results[i].title;
        // console.log(titleEl)
        // using for loop to display the source for each news
        var sourceEl = document.getElementById("source-" + i);
        if (data.results[i].creator == null) {
          sourceEl.textContent = " ";
        } else {
          sourceEl.textContent =
            data.results[i].creator +
            " | " +
            // using split and position '0' in array to only display the date as it also inclded the time which we removed
            data.results[i].pubDate.split(" ")[0];
        }
        // console.log(sourceEl)
        // using for loop to display the content for each news
        var contentEl = document.getElementById("content-" + i);
        if (data.results[i].content == null) {
          contentEl.textContent = " ";
        } else {
          // using slice to limit the preview to 190 characters and adding '...' to end.
          contentEl.textContent = data.results[i].content.slice(0, 190) + "...";
        }
        // console.log(contentEl)
        // 'read more' text append to '...' for user to click on link to access complete content
        var readMoreEl = document.getElementById("read-more-" + i);
        readMoreEl.href = data.results[i].link;
        // console.log(readMoreEl)
        // using for loop to display custom image for each news article called
        var imageEl = document.getElementById("image-news-" + i);
        if (data.results[i].image_url == null) {
          // if the called news article displays null then it will default to saved images
          imageEl.setAttribute("src", "./Assets/Images/img" + i + ".jpg");
        } else {
          imageEl.setAttribute("src", data.results[i].image_url);
        }

        // searchIndex = i;
      }
    });
  getCryptoSymbol(userInput);
};
// This function is responsible for the cryptocurrency table content
var getCryptoSymbol = function (userInput) {
  var apiURLPrimary =
    "https://min-api.cryptocompare.com/data/top/totalvolfull?limit=100&tsym=USD";
  fetch(apiURLPrimary)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      // the below for loop ensures when the user inputs the full crypto name is recognised by the api. Previously it was only recognising the shortened version.
      for (var i = 0; i < 100; i++) {
        var coinFullName = data.Data[i].CoinInfo.FullName;
        var symbol = data.Data[i].CoinInfo.Name;
        if (coinFullName.toUpperCase() == userInput.toUpperCase()) {
          // console.log(symbol)
          // direct link to cryptocoin chart located at bottom of table of contents
          var chartEl = document.getElementById("chart");
          chartEl.setAttribute(
            "href",
            "https://www.cryptocompare.com" + data.Data[i].CoinInfo.Url
          );
          // displayed the shortened version of the crypto coin as well as the associated coin symbol and coin icon providing a better user experience.
          var symbol3El = document.getElementById("display-3symbol");
          symbol3El.textContent = data.Data[i].CoinInfo.Name + " - ";
          var symbolEl = document.getElementById("display-symbol");

          var iconEl = document.getElementById("display-icon");
          iconEl.setAttribute(
            "src",
            "https://www.cryptocompare.com" + data.Data[i].CoinInfo.ImageUrl
          );
          symbolEl.textContent = data.Data[i].DISPLAY.USD.FROMSYMBOL;
          getCryptoPrice(userInput, symbol);
          return;
        }
      }
    });
};
// fetch's data and displays in GBP, EUR and USD.
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

// Unable to do a for loop so each piece of info has been defined below and coded to display to 2 decimal points and repeated for each currency as shown in the 3 sections below.
var displayInEur = function (data, symbol) {
  var priceEl = document.getElementById("price-0-0");
  priceEl.textContent = data.RAW[symbol].EUR.PRICE.toFixed(2);
  var changeEl = document.getElementById("change-0-1");
  changeEl.textContent = data.RAW[symbol].EUR.CHANGE24HOUR.toFixed(2);
  var volumeEl = document.getElementById("volume-0-2");
  volumeEl.textContent = data.RAW[symbol].EUR.VOLUME24HOUR.toFixed(2);
  var openEl = document.getElementById("open-0-3");
  openEl.textContent = data.RAW[symbol].EUR.OPENDAY.toFixed(2);
  var marketEl = document.getElementById("cap-0-4");
  marketEl.textContent = data.RAW[symbol].EUR.MKTCAP.toFixed(2);
  var supplyEl = document.getElementById("supply-0-5");
  supplyEl.textContent = data.RAW[symbol].EUR.SUPPLY.toFixed(2);
};

var displayInGBP = function (data, symbol) {
  var priceEl = document.getElementById("price-1-0");
  priceEl.textContent = data.RAW[symbol].GBP.PRICE.toFixed(2);
  var changeEl = document.getElementById("change-1-1");
  changeEl.textContent = data.RAW[symbol].GBP.CHANGE24HOUR.toFixed(2);
  var volumeEl = document.getElementById("volume-1-2");
  volumeEl.textContent = data.RAW[symbol].GBP.VOLUME24HOUR.toFixed(2);
  var openEl = document.getElementById("open-1-3");
  openEl.textContent = data.RAW[symbol].GBP.OPENDAY.toFixed(2);
  var marketEl = document.getElementById("cap-1-4");
  marketEl.textContent = data.RAW[symbol].GBP.MKTCAP.toFixed(2);
  var supplyEl = document.getElementById("supply-1-5");
  supplyEl.textContent = data.RAW[symbol].GBP.SUPPLY.toFixed(2);
};

var displayInUSD = function (data, symbol) {
  var priceEl = document.getElementById("price-2-0");
  priceEl.textContent = data.RAW[symbol].USD.PRICE.toFixed(2);
  var changeEl = document.getElementById("change-2-1");
  changeEl.textContent = data.RAW[symbol].USD.CHANGE24HOUR.toFixed(2);
  var volumeEl = document.getElementById("volume-2-2");
  volumeEl.textContent = data.RAW[symbol].USD.VOLUME24HOUR.toFixed(2);
  var openEl = document.getElementById("open-2-3");
  openEl.textContent = data.RAW[symbol].USD.OPENDAY.toFixed(2);
  var marketEl = document.getElementById("cap-2-4");
  marketEl.textContent = data.RAW[symbol].USD.MKTCAP.toFixed(2);
  var supplyEl = document.getElementById("supply-2-5");
  supplyEl.textContent = data.RAW[symbol].USD.SUPPLY.toFixed(2);
};



var saveSearch=function(userInput){
  var finalSearch ={
    currency:userInput
  }
  var allSearches= localStorage.getItem("allSearches")
  if(allSearches==null){
    allSearches=[]
  }
  else{
    allSearches=JSON.parse(allSearches)
  }
  allSearches.push(finalSearch)
  localStorage.setItem("allSearches",JSON.stringify(allSearches))

  var clearSearch = document.getElementById("clear-search");
  clearSearch.addEventListener("click",function(){
    localStorage.clear();
    location.reload();
  })

  var historyEl = document.getElementById("history");
  historyEl.innerHTML=""
  if (allSearches !== null) {
    for (var i = 0; i < allSearches.length; i++) {
        var listItemEl = document.createElement("li");
        var buttonEl = document.createElement("button");
        buttonEl.textContent = allSearches[i].currency.toUpperCase();
        listItemEl.setAttribute("class", "collection-item hoverable");
        buttonEl.setAttribute("class", "custom-btn-history");
        historyEl.appendChild(listItemEl);
        listItemEl.appendChild(buttonEl);
        buttonEl.addEventListener("click", function () {
          userInput = this.textContent;
          console.log(this.textContent)
          getCryptoCurrencyData(userInput);
      })
      
  }return;
    }
    return;
}

//Event Listener for form
coinForm.addEventListener("submit", function (event) {
  event.preventDefault();
  // text area set to trim
  var userInput = document.getElementById("textarea1").value.trim();
  // console.log(userInput);
  // modal displays when the user does not enter any text and clicks search
  if (userInput == "") {
    modal.style.display = "block";
    var okButton = document.getElementById("ok-button");
    okButton.addEventListener("click", function (event) {
      modal.style.display = "none";
      return;
    });
    return;
  }
  else{
        var topListUrl = "https://min-api.cryptocompare.com/data/top/mktcapfull?limit=99&tsym=GBP"
        //this is the unordered list 
        fetch(topListUrl)
          .then(function (response) {
            return response.json();
          })
          .then(function (data) {
            console.log(data);
          
        for(var i=0;i<99;i++){
          if(userInput.toUpperCase()== data.Data[i].CoinInfo.FullName.toUpperCase()){
            var sliderEl = document.getElementById("slider-div")
            sliderEl.style.display="none";
            var contentdivEl=document.getElementById("content-div")
            contentdivEl.style.display="block";
            var footerEl=document.getElementById("footerEl")
            footerEl.style.display="none"
            var navbarEl1=document.getElementById("nav1")
            navbarEl1.style.display="block";
            var navbarEl2=document.getElementById("nav2")
            navbarEl2.style.display="block";
            var initialmenu=document.getElementById("menu1")
            initialmenu.style.display="none";
            var menu=document.getElementById("menu")
            menu.style.display="block";
            var date1=document.getElementById("currentDay")
            date1.innerHTML=""
            var top15page=document.getElementById("nav3")
            top15page.innerHTML=""
            var cryptobasicspage=document.getElementById("nav4")
            cryptobasicspage.innerHTML=""
        
            getCryptoCurrency(userInput);
            getCryptoSymbol(userInput);
            return;
          }
       
        }
        modal.style.display = "block";
        var okButton = document.getElementById("ok-button")
        okButton.addEventListener("click",function(event){
          modal.style.display="none"
          return;})
      })
  }
});

$(document).ready(function () {
  $(".slider").slider();
});

var displayMarquee = function(){
//this URL is from cryptocompare it returns the top 10 cryptocurrencies based on mktcap
  var topListUrl = "https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=GBP"
  //this is the unordered list 
  var marqueeList = document.getElementById("display-marquee")
  fetch(topListUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
    //I repeated the same for loop twice in order to prevent any empty white space in the banner
    //loops over top 10 currencies
  for(var i=0;i<10;i++){
    //creates a list time each time 
    var marqueeListItem1 = document.createElement("li")
    //appends the list item to unordered list
    marqueeList.appendChild(marqueeListItem1)
    //content of each list item is 3 letters name of cryptocurrency + mktcap --> example: BTC: 00000 £
    marqueeListItem1.textContent= data.Data[i].CoinInfo.Name+": £ "+ data.Data[i].RAW.GBP.MKTCAP.toFixed(0)
  }

  for(var i=0;i<10;i++){
    var marqueeListItem2 = document.createElement("li")
    marqueeList.appendChild(marqueeListItem2)
    marqueeListItem2.textContent= data.Data[i].CoinInfo.Name+": £ "+ data.Data[i].RAW.GBP.MKTCAP.toFixed(0)
  }
  })
}

displayMarquee()

var historydiv = document.getElementById("history")
var clearSearchbtn = document.getElementById("clear-search")
var hideEl = document.getElementById("hide")
var arrow=document.getElementById("arrow")

var dropdown = function(){
if(arrow.textContent="arrow_drop_up"){
hideEl.addEventListener("click",function(event){
  event.preventDefault()
  arrow.textContent="arrow_drop_down"
  clearSearchbtn.style.display="none"
  historydiv.style.display="none"
  clearSearchbtn.style.textAlign="center"
  dropup()
})
}}

var dropup=function(){
if(arrow.textContent="arrow_drop_down"){
  hideEl.addEventListener("click",function(event){
    event.preventDefault()
    arrow.textContent="arrow_drop_up"
   
    clearSearchbtn.style.display="block"
    historydiv.style.display="block"
    clearSearchbtn.style.textAlign="center"
    dropdown()
})}
}

$('.dropdown-trigger').dropdown();
dropdown()