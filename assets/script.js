//define variables
var APIKey = '8635650944450d2222bebb2cadec5082'
var inputEl = document.querySelector(".search-bar");
var buttonEl = document.querySelector("#search-button");
var recentSearchEl = document.querySelector(".recent-search");
var currentWeatherEl = document.querySelector(".current-weather");
var ForecastEl = document.querySelector(".forecast");

//create event listener for search button
buttonEl.addEventListener("click", currentWeather);
//use fetch request to get the information (url fed to fetch)
function currentWeather() {
    let apiURL = `https://api.openweathermap.org/data/2.5/onecall?lat={lat}&lon={lon}&exclude={part}&appid=${APIKey}`;
    fetch(apiURL)
    .then(response);{
        console.log(response);
    }
    
}


//create function to display 5 day forcast 

//create function to display cities temp, wind, hum, and UV index

//create function to render recently searched cities
    //create array  and loop through
    //use cards
    //append 5 day forcast