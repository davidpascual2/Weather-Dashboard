
var APIKey = '8635650944450d2222bebb2cadec5082';
var userFormEl = document.querySelector("#user-form")

var inputEl = document.querySelector("#search-input"); //coment out? id already defined elsewhere
var buttonEl = document.querySelector("#search-button");
var searchHistoryEl = document.querySelector("#search-history");
var currentWeatherEl = document.querySelector(".current-weather");
var searchedCityEl = document.querySelector("#searched-city");
var fiveDayForecastEl = document.querySelector(".five-day-forecast");
// var cityNameEl = document.querySelector(".city-name")

//create event listener for search button
buttonEl.addEventListener("click", callWeatherAPI);

//use fetch request to get current condtions on open weather maps (url fed to fetch)
function callWeatherAPI(event) {
    event.preventDefault() //without this error uncaught can occur
    let citySearch = inputEl.value.trim(); //value extracts value from html input  // used to be: document.querySelector("#search-input").value;
        console.log(citySearch)
        inputEl.value = ""; //clears out usersearch input after search is clicked // SHOULD THIS BE PLACED HERE?
        
    let latLonAPI = `http://api.openweathermap.org/geo/1.0/direct?q=${citySearch}&limit=1&appid=${APIKey}`;

    fetch(latLonAPI)
        .then(function(response){
        // console.log(response)
        if(response.ok) {
            return response.json();
        } 
        // else {
        //     // alert("error") //fix
        // }
        })
        .then(function (response) {
        console.log(response) //get city lat and lon

        let lat = response[0].lat // "stores" response in variable
        let lon = response[0].lon
        let cityName = response[0].name
        console.log(lat, lon)
        displaycityName(cityName); //what does this do?
        // console.log(response)
        
        
        let apiURL = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely,hourly,alerts&units=imperial&appid=${APIKey}`;

        fetch(apiURL)
            .then(function(response){
                // console.log(response)
                return response.json()
            })
        
            .then(function (response) {
                // console.log(response);
                printResults(response); 
                // displaycityName(cityName)
            })
        
    })

    .catch(function(error){
        // alert("unable to connect")
        console.log(error)
    });
}


 //displays city on webpage...// ask tutor about this function 
function displaycityName(name) {
    searchedCityEl.innerHTML = "";
    let cityNameEl = document.createElement("h2");
    cityNameEl.classList.add("#searched-city");
    cityNameEl.textContent = name;
    searchedCityEl.append(cityNameEl);
}

//create function to display current weather conditions
function printResults(currentWeatherConditions) {
    console.log(currentWeatherConditions);

    let currentTemp = document.createElement("p");
    currentTemp.classList.add("card-text");
    currentTemp.textContent = `Temp: ${currentWeatherConditions.current.temp} F`;
    currentWeatherEl.append(currentTemp);

    let currentWind = document.createElement("p");
    currentWind.classList.add("card-text");
    currentWind.textContent = `Wind Speed: ${currentWeatherConditions.current.wind_speed} MPH`;
    currentWeatherEl.append(currentWind);

    let currentHumidity = document.createElement("p");
    currentHumidity.classList.add("card-text");
    currentHumidity.textContent = `Humidity: ${currentWeatherConditions.current.humidity}%`;
    currentWeatherEl.append(currentHumidity);

    let currentUV = document.createElement("p");
    currentUV.classList.add("card-text");
    currentUV.textContent = `UV Index: ${currentWeatherConditions.current.uvi}`;
    currentWeatherEl.append(currentUV);
}

//create function to render recently searched cities and make button
function recentSearches(name) {
    let userSearchHistory = document.createElement("li"); //global scope of local scope???
    userSearchHistory.classList.add("list-group-item");
    //create button for recent searches
    let recentSearchButton = document.createElement("button");
    recentSearchButton.textContent = name;
    //add class to button
    recentSearchButton.classList.add("recent-search-btn", "btn", "btn-secondary")
    //append or add button to list
    userSearchHistory.append(recentSearchButton);
    //append new created element to search history element
    searchHistoryEl.append(userSearchHistory);


    recentSearchButton.addEventListener("click", function(event) {
        event.preventDefault();
        let btnClicked = event.target.textContent
        console.log(btnClicked)
        let latLonAPI = `http://api.openweathermap.org/geo/1.0/direct?q=${btnClicked}&limit=1&appid=${APIKey}`;

        fetch(latLonAPI)
            .then(function(response){
            // console.log(response)
            if(response.ok) {
                return response.json();
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
            displaycityName(cityName);

            let apiURL = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely,hourly,alerts&units=imperial&appid=${APIKey}`;

            fetch(apiURL)
            .then(function(response){
                // console.log(response)
                return response.json()
            })
        
            .then(function (response) {
                console.log(response)
                // printResults(response);
            })
            })

    });
};




    
    //create class and append 



//create function to display 5 day forcast

    //create an array and loop through each day
    //use cards
    //append 5 day forcast



    //print weather from user search 
// function printResults(currentWeatherResult) {
//     console.log(currentWeatherResult);

//     let date = currentWeatherResult.current.dt;
//     console.log(date);
//     let dateEl = document.createElement("h3");
//     dateEl.textContent = moment(date, "X").format("M,D,YYYY");
//     console.log(dateEl);

//     currentWeatherEl.append(dateEl)

// }


//temp
//wind
//humidity
//UV index