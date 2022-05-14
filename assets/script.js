
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
    let apiURL = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=current,minutely,hourly,alerts&units=imperial&appid=${APIKey}`;
    
    fetch(latLonAPI)
    .then(function(response){
        console.log(response)
        if(response.ok) {
            return response.json()
        } 
        // else {
        //     // alert("error") //fix
        // }
    }).then(function(response){
        console.log(response)

        let lat = response[0].lat // "store" response in variable
        let lon = response[0].lon
        let cityName = response[0].name

        console.log(lat, lon)
    })
    .catch(function(error){
        // alert("unable to connect")
        console.log(error)
    });

    
    fetch(apiURL)
        .then(function(response){
            console.log(response)
            if(response.ok) {
                return response.json()
            }
        })
    
//     .then(function(response){ //.then(response) => { ........... // .then(res => res.json())
//         console.log(response);

//         if (response.ok) {
//             response.json().then(function(data) {
//                 currentWeather(data)
//             })
//         } else {
//             // alert("error") //fix
//         }
//     })
//     .catch(function(error){
//         // alert("unable to connect")
// });
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
