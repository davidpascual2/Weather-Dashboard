
var APIKey = '8635650944450d2222bebb2cadec5082';
var userFormEl = document.querySelector("#user-form")
var inputEl = document.querySelector("#search-input"); //coment out? id already defined elsewhere
var buttonEl = document.querySelector("#search-button");
var searchHistoryEl = document.querySelector("#search-history");
var currentWeatherEl = document.querySelector(".current-weather");
var searchedCityEl = document.querySelector("#searched-city");
var fiveDayForecastEl = document.querySelector("#five-day-forecast");




// var cityNameEl = document.querySelector(".city-name")

//create event listener for search button
buttonEl.addEventListener("click", callWeatherAPI);

//use fetch request to get current condtions on open weather maps (url fed to fetch)
function callWeatherAPI(event) {

    event.preventDefault() //without this error uncaught can occur
    let citySearch = inputEl.value.trim() || event.target.innerText //value extracts value from html input  // used to be: document.querySelector("#search-input").value;
        console.log("just city name",citySearch)
        inputEl.value = ""; //clears out usersearch input after search is clicked // SHOULD THIS BE PLACED HERE?

        //save to local storage
        var cityStorage = localStorage.getItem("city"); //returns array of local storage

        if (cityStorage) { //if local storage is found 
            var cityStorageObject = JSON.parse(cityStorage); //returns array of local storage
            if(!cityStorageObject.includes(citySearch)) {
                // if greater than 5 then will be removed
            if (cityStorageObject.length > 5) { //if there is not more than 5, will move to "else"
                cityStorageObject.pop(); //removes last element from array
                cityStorageObject.unshift(citySearch); //if greater than 5, adds element to beginning of array
            }else {
                cityStorageObject.unshift(citySearch); // if less than 5, element will be added to array
            }
            }
            
            localStorage.setItem("city", JSON.stringify(cityStorageObject));

            renderHistory(cityStorageObject);

        }else{ // if thre is nothing in local storage
            var searchHistoryList = []; // create array to store values
            searchHistoryList.push(citySearch) // add to array list
            localStorage.setItem("city", JSON.stringify(searchHistoryList)); //give object

            searchHistoryEl.innerHTML = searchHistoryList;
            console.log("inside of else state search historyEl",searchHistoryEl);
            
            renderHistory(searchHistoryList);
        } 

        
    

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
//function to show search history
// function renderHistory(history) {
// searchHistoryEl.innerHTML = "" // run each time the user searches for something 
// for(i = 0; i < history.length; i++) {
//  var li = document.createElement("li");
//  li.innerText = history[i]
// searchHistoryEl.append(li);
// }

function renderHistory(history) {
    searchHistoryEl.innerHTML = "" // run each time the user searches for something 
    for(i = 0; i < history.length; i++) {
     var li = document.createElement("li");
     var recentSearchButton = document.createElement("button");
     recentSearchButton.innerText = history[i]
     recentSearchButton.classList.add("recent-search-btn", "btn", "btn-secondary")
    //  li.innerText = history[i]
    recentSearchButton.addEventListener("click", callWeatherAPI)
    searchHistoryEl.append(li);
    searchHistoryEl.append(recentSearchButton);
    }

    // recentSearchButton.addEventListener("click", function(event) {
    //     event.preventDefault();
    //     console.log("hello world!!!!!")
    //     let btnClicked = event.target.textContent;
    //     console.log("recent search history button clicked")
    //     let latLonAPI = `http://api.openweathermap.org/geo/1.0/direct?q=${btnClicked}&limit=1&appid=${APIKey}`;

    //     fetch(latLonAPI)
    //         .then(function(response){
    //         // console.log(response)
    //         if(response.ok) {
    //             return response.json();
    //         } 
    //         // else {
    //         //     // alert("error") //fix
    //         // }
    //         })
    //         .then(function (response) {
    //         console.log(response)
    
    //         let lat = response[0].lat // "stores" response in variable
    //         let lon = response[0].lon
    //         let cityName = response[0].name
    //         console.log(lat, lon)
    //         displaycityName(cityName);

    //         let apiURL = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely,hourly,alerts&units=imperial&appid=${APIKey}`;

    //         fetch(apiURL)
    //         .then(function(response){
    //             // console.log(response)
    //             return response.json()
    //         })
        
    //         .then(function (response) {
    //             console.log(response)
    //             printResults(response);
    //         })
    //         })

    // });
}


 //displays city on webpage...// ask tutor about this function 
function displaycityName(name) {
    currentWeatherEl.innerHTML = ""; //replace searchedCityEl with currentWeatherEl
    let cityNameEl = document.createElement("h2");
    cityNameEl.classList.add("#searched-city");
    cityNameEl.textContent = name;
    currentWeatherEl.append(cityNameEl); //replace searchedCityEl with currentWeatherEl

}

//create function to display current weather conditions
function printResults(currentWeatherConditions) {
    console.log(currentWeatherConditions);

    let weatherIcon = currentWeatherConditions.current.weather[0].icon;
    let weatherIconEl = document.createElement("img");
    weatherIconEl.src = `http://openweathermap.org/img/wn/${weatherIcon}@2x.png`; 
    currentWeatherEl.append(weatherIconEl);

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
    currentUV.textContent = `UV Index: `;
    let uviColor = document.createElement("span");
    

    //if statment that changes the color of UV according to condition
    if (currentWeatherConditions.current.uvi > 7) {
        uviColor.classList.add("extreme");
    } else if (currentWeatherConditions.current.uvi > 3) {
        uviColor.classList.add("moderate");
    } if (currentWeatherConditions.current.uvi > 0) {
        uviColor.classList.add("low");
    };
    currentUV.append(uviColor);
    uviColor.textContent = currentWeatherConditions.current.uvi;
    currentWeatherEl.append(currentUV);
    

    //five day forecast Section
    var forecastSection = document.createElement("div");
    forecastSection.classList.add("row");
    fiveDayForecastEl.innerHTML = ""
    fiveDayForecastEl.append(forecastSection);

    for (let i=0; i < 5; i++) {
        let forecastDiv = document.createElement("div");
        forecastDiv.classList.add("col");

        let forecastEl = document.createElement("div")
        forecastEl.classList.add("card");
        
        let cardBody = document.createElement("div")
        cardBody.classList.add("card-body");

        let cardDate = currentWeatherConditions.daily[i + 1].dt; //have tutot explain this line
        let cardDateEl = document.createElement("h5");
        cardDateEl.textContent = moment(cardDate, "X").format("M/D/YYYY");
        cardDateEl.classList.add("card-title")
//--------------------------------------------------------------------//
        let cardIcon = currentWeatherConditions.daily[i + 1].weather[0].icon;
        let cardIconEl = document.createElement("img");
        cardIconEl.src = `http://openweathermap.org/img/wn/${cardIcon}@2x.png`;
        // cardIcon.classList.add("card-text")

        let cardTemp = document.createElement("p")
        cardTemp.textContent = `temp: ${currentWeatherConditions.daily[i + 1].temp.day} F`;
        cardTemp.classList.add("card-text");

        let cardWind = document.createElement("p");
        cardWind.textContent = `Wind: ${currentWeatherConditions.daily[i + 1].wind_speed} mph`;
        cardWind.classList.add("card-text"); // why is day not needed?

        let cardHumidity = document.createElement("p");
        cardHumidity.textContent = `Humidity: ${currentWeatherConditions.daily[i + 1].humidity} %`;
        cardHumidity.classList.add("card-text");


        // let cardUV = document.createElement("p");
        // cardUV.textcontent = `UV Index: ${currentWeatherConditions.daily[i + 1].uvi.day}`;
        // cardUV.classList.add("card-text");



        cardBody.append(cardDateEl, cardIconEl, cardTemp, cardWind, cardHumidity);
        forecastEl.append(cardBody);
        forecastDiv.append(forecastEl);
        // forecastSection.innerHTML = "";
        forecastSection.append(forecastDiv);
        

    }
}

//create function to render recently searched cities and make button
// function recentSearches(name) {
//     let userSearchHistory = document.createElement("li"); //global scope of local scope???
//     userSearchHistory.classList.add("list-group-item");
//     //create button for recent searches
//     let recentSearchButton = document.createElement("button");
//     recentSearchButton.textContent = name;
//     //add class to button
//     recentSearchButton.classList.add("recent-search-btn", "btn", "btn-secondary")
//     //append or add button to list
//     userSearchHistory.append(recentSearchButton);
//     //append new created element to search history element
//     searchHistoryEl.append(userSearchHistory);


//     recentSearchButton.addEventListener("click", function(event) {
//         event.preventDefault();
//         let btnClicked = event.target.textContent
//         console.log(btnClicked)
//         let latLonAPI = `http://api.openweathermap.org/geo/1.0/direct?q=${btnClicked}&limit=1&appid=${APIKey}`;

//         fetch(latLonAPI)
//             .then(function(response){
//             // console.log(response)
//             if(response.ok) {
//                 return response.json();
//             } 
//             // else {
//             //     // alert("error") //fix
//             // }
//             })
//             .then(function (response) {
//             console.log(response)
    
//             let lat = response[0].lat // "stores" response in variable
//             let lon = response[0].lon
//             let cityName = response[0].name
//             console.log(lat, lon)
//             displaycityName(cityName);

//             let apiURL = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely,hourly,alerts&units=imperial&appid=${APIKey}`;

//             fetch(apiURL)
//             .then(function(response){
//                 // console.log(response)
//                 return response.json()
//             })
        
//             .then(function (response) {
//                 console.log(response)
//                 // printResults(response);
//             })
//             })

//     });
// };

// console.log("hello")