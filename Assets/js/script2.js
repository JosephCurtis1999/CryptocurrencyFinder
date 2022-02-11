var displaytable = function(){
    //this URL is from cryptocompare it returns the top 10 cryptocurrencies based on mktcap
      var topListUrl = "https://min-api.cryptocompare.com/data/top/mktcapfull?limit=15&tsym=GBP"
      //this is the unordered list 
      fetch(topListUrl)
        .then(function (response) {
          return response.json();
        })
        .then(function (data) {
          console.log(data);

for(var i=0;i<15;i++){
    var tbody = document.getElementById("tbody")
    var tr= document.createElement("tr")
    tbody.appendChild(tr)
    
    var icon = document.createElement("td");
    var imageIcon = document.createElement("img")
    imageIcon.setAttribute("style","width:30px; height:30px;")
    imageIcon.setAttribute("src","https://www.cryptocompare.com"+data.Data[i].CoinInfo.ImageUrl)
    tr.appendChild(icon)
    icon.appendChild(imageIcon)

    var number= document.createElement("td");
    tr.appendChild(number)
    number.textContent=(i+1)

    var name= document.createElement("td");
    tr.appendChild(name)
    name.textContent=data.Data[i].CoinInfo.FullName

    var price = document.createElement("td")
    tr.appendChild(price)
    price.textContent= "£ "+data.Data[i].RAW.GBP.PRICE

    var change = document.createElement("td")
    tr.appendChild(change)
    change.textContent= "£ "+data.Data[i].RAW.GBP.CHANGE24HOUR.toFixed(2)

    var volume = document.createElement("td")
    tr.appendChild(volume)
    volume.textContent= "£ "+data.Data[i].RAW.GBP.VOLUME24HOUR.toFixed(2)

    var mktcap= document.createElement("td")
    tr.appendChild(mktcap)
    mktcap.textContent= "£ "+data.Data[i].RAW.GBP.MKTCAP

    var link = document.createElement("td");
    var button = document.createElement("button")
    var url = document.createElement("a")
    button.setAttribute("class","btn waves-effect waves-light custom-page-button")
    url.textContent="Click Here"
    url.href= "https://www.cryptocompare.com"+ data.Data[i].CoinInfo.Url
    tr.appendChild(link)
    link.appendChild(button)
    button.appendChild(url)

}
})
}

displaytable()

$('.dropdown-trigger').dropdown();