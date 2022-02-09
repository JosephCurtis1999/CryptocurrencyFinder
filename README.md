# CryptoGuide

## Description.

- Nadine, Joe and I have collaborated on this task and created an application that can be utilised by users by offering them a source of information regarding the crypto currency market. The user is greeted by a user-friendly application displaying the top 10 crypto coins according to their market cap as well as a slider of images and a search input engine were by the user can search a crypto coin of their choice. From here the application displays the user with up-to-date financial information in the form of a clearly laid out table as well as a secondary resource of information in the form of directly related news articles.

## Acceptance Criteria - Checklist.

- For this project with utilized materialize as our choice of CSS framework and have successfully deployed our application to Github Pages.

- The application is interactive and allows the user is able to complete a search of their choice of crypto-coin. They user can navigate the page using the titles in the nav bar as well as click on links to view charts as well as news articles.

- For this application we have utilised 2 server-side APIs. The primary API calls quantitative information related to the user’s search and displays monetary information in the form of a table. This includes, Price, 24hr change and Market-cap just to name a few. The user is also offered the same information across multiple currencies, in this case they include GDBP, EUR and USD.
  The secondary API calls new articles which I directly related to the user’s search. As an example, if the user searches ‘Bitcoin’ the news that will be displayed will primarily be related to that coin. If the user searches for ‘Ethereum’ then once again the API will call Ethereum related news articles.

- We have integrated a modal into this application which appears when the user attempts to complete a search before entering any text into the search field.

- We have also utilised client-side storage to store persistent data which the user can access in the search history section of the application. The website responds to the user’s cursor and they are also able to interact with the search history to access previous searches.

- Finally, the application has a clean repository and we have tried our utmost to follow best practice when it came to semantic coding, indentation and descriptive comments.

- ***

## Screenshot of deployed application.

Weather Dashboard - city search.

![city search](./images/search-for-a-city.png)

Weather dashboard displaying current and future conditions.

![deployed application](./images/weather-dashboard-london.png)

City search history populating.

![city search history](./images/weather-dashboard-search-history.png)

Clicking on a city in the search history to display weather conditions once again.

![search history weather recall](./images/weather-dashboard-recall-previous-weather.png)

Weather dashboard displaying saved data in local storage.

![local storage](./images/local-storage.png)

---

## Primary API URL.

https://min-api.cryptocompare.com/

## Secondary API URL.

https://newsdata.io/

---

## The URL of the deployed application.

<!-- https://riz1ash786.github.io/weather-dashboard/ -->

## The URL of the GitHub repository.

https://github.com/JosephCurtis1999/CryptocurrencyFinder
