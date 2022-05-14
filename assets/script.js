
var APIKey = '8635650944450d2222bebb2cadec5082';
var userFormEl = document.querySelector("#user-form")

var inputEl = document.querySelector("#search-city");
var buttonEl = document.querySelector("#search-button");
var searchHistoryEl = document.querySelector(".search-history");
var currentWeatherEl = document.querySelector(".current-weather");
var ForecastEl = document.querySelector(".forecast");
// var cityNameEl = document.querySelector(".city-name")

//create event listener for search button
buttonEl.addEventListener("click", currentWeather);

//use fetch request to get current condtions on open weather maps (url fed to fetch)
function currentWeather(event) {
    event.preventDefault() //without this error uncaught can occur
    let searchCity = document.querySelector("#search-city").value; //value extracts value from html input
        console.log(searchCity)
        
    let latLonAPI = `http://api.openweathermap.org/geo/1.0/direct?q=${searchCity}&limit=1&appid=${APIKey}`;

    fetch(latLonAPI)
    .then(function(response){
        console.log(response)
        if(response.ok) {
            return response.json()
        } 
        // else {
        //     // alert("error") //fix
        // }
    })
    .then(function(response){
        console.log(response)

        let lat = response[0].lat // "stores" response in variable
        let lon = response[0].lon
        let cityName = response[0].name
        console.log(lat, lon)

        
        let apiURL = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=current,minutely,hourly,alerts&units=imperial&appid=${APIKey}`;

        fetch(apiURL)
        .then(function(response){
            console.log(response)
            if(response.ok) {
                return response.json()
            }
        })
        .then(function (response) {
            console.log(response) //display function????
        })
    })

    .catch(function(error){
        // alert("unable to connect")
        console.log(error)
    });
}


//create function to display 5 day forcast 
function weatherForcast(){

}

//create function to display cities temp, wind, hum, and UV index


//create function to render recently searched cities
function renderCities() {
    
}
    //create array  and loop through
    //use cards
    //append 5 day forcast
    
    function callWeatherApi() {
        // Get lat + long coordinates first 
        let userSearch = document.querySelector("#location-search").value;
        let coordinateUrl = "http://api.openweathermap.org/geo/1.0/direct?q=" + userSearch + "&limit=1&appid=" + APIkey;
      
        fetch(coordinateUrl)
          .then(function (response) {
            // Add modal to alert user if city name cannot be found 
            if (!response.ok) {
              return;
            }
            return response.json();
          })
          .then(function (data) {
            console.log(data);
            let lat = data[0].lat
            let long = data[0].lon
            let cityName = data[0].name
            displayCityName(cityName);
            addSearchHistory(cityName);
      
            let oneCallUrl = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + long + "&units=imperial&exclude=hourly,minutely&appid=" + APIkey;
      
            fetch(oneCallUrl)
              .then(function (response) {
                return response.json()
              })
              .then(function (data) {
                // display results on page SOMEHOW
                printResults(data);
      
              })
          }
          );
      
      };