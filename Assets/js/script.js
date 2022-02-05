// variables for API keys
var apiKeyND = "pub_42803e674039751e4b30dc24c745534322c8";

var displayCurrency=document.getElementById("display-currency")
var modal = document.getElementById("modal1");
// Shows date at the top of the page
var currentDate =
  moment().format("dddd") + " " + moment().format("Do MMM YYYY");

var momentNow = moment();
$("#currentDay").html(momentNow.format("DD MMMM YYYY"));

var coinForm = document.getElementById("coin-form");
//api news
// my api key for news pub_42803e674039751e4b30dc24c745534322c8

var getCryptoCurrency=function(userInput){
  getCryptoCurrencyData(userInput)
  saveSearch(userInput) 
}

var getCryptoCurrencyData=function(userInput){
  var apiURL = "https://newsdata.io/api/1/news?apikey="+apiKeyND+"&country=gb&q="+userInput;
  fetch(apiURL)
      .then(function (response) {
      return response.json();}
      )
      .then(function (data) {
      console.log(data)
      if(data.totalResults==0){
        modal.style.display = "block";
        return;
      }
      displayCurrency.textContent= userInput.toUpperCase();
      for(var i=0;i<4;i++){
        var titles="";
        var titles=data.results[i].title
        console.log(titles)
        var titleEl=document.getElementById("title-"+i)
        titleEl.textContent=data.results[i].title;
        // console.log(titleEl)

        var sourceEl=document.getElementById("source-"+i)
        sourceEl.textContent=data.results[i].creator[0] +" | "+ data.results[i].pubDate.split(" ")[0];
        // console.log(sourceEl)
      
        var contentEl=document.getElementById("content-"+i)
        contentEl.textContent=data.results[i].content.slice(0, 110)+"...";
        // console.log(contentEl)

        var readMoreEl=document.getElementById("read-more-"+i)
        readMoreEl.href=data.results[i].link;
        // console.log(readMoreEl)
        searchIndex=i;
  
      }   
    })
}

var saveSearch=function(userInput){
  var historyEl=document.getElementById("history");
  var localStorageCurrencies="";
  var existingCurrencies= JSON.parse(localStorage.getItem(localStorageCurrencies));
  var newCurrency ={
    currency:userInput
  } 
  var updatedCurrencies= [newCurrency];
  if(existingCurrencies){
    updatedCurrencies=updatedCurrencies.concat(existingCurrencies);
  }
  localStorage.setItem(localStorageCurrencies, JSON.stringify(updatedCurrencies));
    for(var i=0;i<updatedCurrencies.length;i++){
      var listItemEl=document.createElement("li")
      var buttonEl=document.createElement("button");
      listItemEl.setAttribute("class","collection-item hoverable")
      buttonEl.setAttribute("class","custom-btn-history")
      buttonEl.textContent=updatedCurrencies[i].currency.toUpperCase();
      historyEl.appendChild(listItemEl)
      listItemEl.appendChild(buttonEl)
      buttonEl.addEventListener("click",function(){
        userInput=updatedCurrencies[i].currency;
        getCryptoCurrencyData(userInput);
        return;
      })
      return;
    }
}

//Event Listener for form
coinForm.addEventListener("submit", function (event) {
  event.preventDefault();
  var userInput = document.getElementById("textarea1").value.trim();
  console.log(userInput);
  getCryptoCurrency(userInput);
})
