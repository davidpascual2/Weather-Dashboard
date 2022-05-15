
var APIKey = '8635650944450d2222bebb2cadec5082';
var userFormEl = document.querySelector("#user-form")

var inputEl = document.querySelector("#search-input"); //coment out? id already defined elsewhere
var buttonEl = document.querySelector("#search-button");
var searchHistoryEl = document.querySelector(".search-history");
var currentWeatherEl = document.querySelector(".current-weather");
var searchedCityEl = document.querySelector("#searched-city");
var fiveDayForecastEl = document.querySelector(".five-day-forecast");
// var cityNameEl = document.querySelector(".city-name")

//create event listener for search button
buttonEl.addEventListener("click", callWeatherAPI);

//use fetch request to get current condtions on open weather maps (url fed to fetch)
function callWeatherAPI(event) {
    event.preventDefault() //without this error uncaught can occur
    let searchCity = document.querySelector("#search-input").value; //value extracts value from html input
        console.log(searchCity)
        
    let latLonAPI = `http://api.openweathermap.org/geo/1.0/direct?q=${searchCity}&limit=1&appid=${APIKey}`;

    fetch(latLonAPI)
        .then(function(response){
        // console.log(response)
        if(response.ok) {
            return response.json()
        } 
        // else {
        //     // alert("error") //fix
        // }
        })
        .then(function (response) {
        console.log(response)

        let lat = response[0].lat // "stores" response in variable
        let lon = response[0].lon
        let cityName = response[0].name
        console.log(lat, lon)
        displayWeather(cityName);
        
        
        let apiURL = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=current,minutely,hourly,alerts&units=imperial&appid=${APIKey}`;

        fetch(apiURL)
            .then(function(response){
                // console.log(response)
                return response.json()
            })
        
            .then(function (response) {
                console.log(response) //display function????
                displayWeather(response)
            })
        
    })

    .catch(function(error){
        // alert("unable to connect")
        console.log(error)
    });
}

let cityName =document.createElement("h2")

function displayWeather(cityName) {
//     currentWeatherEl.innerHTML = "";
//     cityName.classList.add("#searched-city");
    


    
    

}
//create function to display 5 day forcast 
function fiveDayForcast() {

}

//create function to display cities temp, wind, hum, and UV index


//create function to render recently searched cities
function recentSearches() {
    
}
    //create array  and loop through
    //use cards
    //append 5 day forcast
    




    // <p class="card-text">High Feels like ${
    //     day.feels_like.day
    //   }&deg;C</p>
    //   <p class="card-text">Pressure ${day.pressure}mb</p>
    //   <p class="card-text">Humidity ${day.humidity}%</p>
    //   <p class="card-text">UV Index ${day.uvi}</p>
    //   <p class="card-text">Precipitation ${day.pop * 100}%</p>
    //   <p class="card-text">Dewpoint ${day.dew_point}</p>
    //   <p class="card-text">Wind ${day.wind_speed}m/s, ${