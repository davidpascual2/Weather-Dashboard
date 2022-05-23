
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
    let citySearch = inputEl.value.trim(); //value extracts value from html input  // used to be: document.querySelector("#search-input").value;
        console.log("just city name",citySearch)
        inputEl.value = ""; //clears out usersearch input after search is clicked // SHOULD THIS BE PLACED HERE?

        //save to local storage
        var cityStorage = localStorage.getItem("city"); //returns array of local storage

        if (cityStorage) { //if local storage is found 
            
            var cityStorageObject = JSON.parse(cityStorage); //returns array of local storage
            // if greater than 5 then will be removed
            if (cityStorageObject.length > 5) { //if there is not more than 5, will move to "else"
                cityStorageObject.pop(); //removes last element from array
                cityStorageObject.unshift(citySearch); //if greater than 5, adds element to beginning of array
            }else {
                cityStorageObject.unshift(citySearch); // if less than 5, element will be added to array
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
function renderHistory(history) {
searchHistoryEl.innerHTML = "" // run each time the user searches for something 
for(i = 0; i < history.length; i++) {
 var li = document.createElement("li");
 li.innerText = history[i]
searchHistoryEl.append(li);
}

}


 //displays city on webpage...// ask tutor about this function 
function displaycityName(name) {
    searchedCityEl.innerHTML = "";
    let cityNameEl = document.createElement("h2");
    cityNameEl.classList.add("#searched-city");
    cityNameEl.textContent = name;
    searchedCityEl.append(cityNameEl);
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
    currentUV.textContent = `UV Index: `;
    let uviColor = document.createElement("span");
    currentUV.append(uviColor);
    uviColor.textContent = currentWeatherConditions.current.uvi;

    //if statment that changes the color of UV according to condition
    if (currentWeatherConditions.current.uvi > 7) {
        uviColor.classList.add("extreme");
    } else if (currentWeatherConditions.current.uvi > 3) {
        uviColor.classList.add("moderate");
    } if (currentWeatherConditions.current.uvi > 0) {
        uviColor.classList.add("low");
    };
    currentWeatherEl.append(currentUV);
    

    //five day forecast Section
    var forecastSection = document.createElement("div");
    forecastSection.classList.add("row");
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
        let cardTemp = document.createElement("p")
        cardTemp.textContent = `temp: ${currentWeatherConditions.daily[i + 1].temp.day} F`;
        cardTemp.classList.add("card-text");

        let cardWind = document.createElement("p");
        cardWind.textContent = `Wind speed: ${currentWeatherConditions.daily[i + 1].wind_speed} mph`;
        cardWind.classList.add("card-text"); // why is day not needed?

        let cardHumidity = document.createElement("p");
        cardHumidity.textContent = `Humidity: ${currentWeatherConditions.daily[i + 1].humidity} %`;
        cardHumidity.classList.add("card-text");

        // let cardUV = document.createElement("p");
        // cardUV.textcontent = `UV Index: ${currentWeatherConditions.daily[i + 1].uvi.day}`;
        // cardUV.classList.add("card-text");



        cardBody.append(cardDateEl, cardTemp, cardWind, cardHumidity);
        forecastEl.append(cardBody);
        forecastDiv.append(forecastEl);
        forecastSection.append(forecastDiv);
        

    }
}
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

//local storage
//-------------------------------------------------------//


// buttonEl.addEventListener("click", function() {
// var searchTerm = inputEl.value;
// callWeatherAPI(searchTerm);  //correct
// searchHistoryEl.push(searchTerm)
// localStorage.setItem("search", JSON.stringify(searchHistory));
// renderSearchHistory();

// });

// clearEl.addEventListener("click",function() {
//     searchHistory = [];
//     renderSearchHistory();
// })

// function renderSearchHistory() {
//     historyEl.innerHTML = "";
//     for (let i=0; i < searchHistory.length; i++) {
//         const historyItem = document.createElement("input");
//     //.........
//     historyItem.setAttribute("type", "text");
//     historyItem.setAttribute("readonly", true);
//     historyItem.setAttribute("class", "form-control d-block bg-white");
//     historyItem.setAttribute("value", searchHistory[i]);
//     historyItem.setAttribute("click", function() {
//         getweather(historyItem.value);
//     })
    
//     }
    
// }

// function renderSearchHistory() {
//     historyEl.innerHTML = "";
//     for (let i=0; i<searchHistory.length; i++) {
//         const historyItem = document.createElement("input");
//         // <input type="text" readonly class="form-control-plaintext" id="staticEmail" value="email@example.com"></input>
//         historyItem.setAttribute("type","text");
//         historyItem.setAttribute("readonly",true);
//         historyItem.setAttribute("class", "form-control d-block bg-white");
//         historyItem.setAttribute("value", searchHistory[i]);
//         historyItem.addEventListener("click",function() {
//             getWeather(historyItem.value);
//         })
//         historyEl.append(historyItem);
//     }
// } 

// renderSearchHistory();
// if (searchHistory.length > 0) {
//     getWeather(searchHistory[searchHistory.length - 1])
// }

//---------------

// var searchHistoryList = []; // var = array

// buttonEl.addEventListener("click", function(event){
//     event.preventDefault();

//     var city = inputEl.value.trim(); //var city is equal to user input
//     currentWeatherConditions(city); // (callapifunction)

//     if(!searchHistoryList.includes(city)) {
//         searchHistoryList.push(city);
//         var searchedCity = document.querySelector(`<li class="list-group-item">${city}</li>`);
//         document.querySelector("#search-history").append(searchedCity); // this is refrencing html id. (<ul id="searchHistory" class="list-group">)

//     };

//     localStorage.setItem("city",JSON.stringify(searchHistoryList));
//     console.log(searchHistoryList)
// });

// $(document).on("click", ".list-group-item", function() { //document.querySelector(document).addEventListener("click","list-group-item", ListCity)
//     var listCity = $(this).textContent();
//     currentCondition(listCity);
// });




// var cityStorage = JSON.parse(localStorage.getItem("city"));

//         if (JSON.parse(localStorage.getItem("city"))) {
//             console.log("inside if",cityStorage);
//             // var cityStorageObject = JSON.parse(localStorage.getItem("city"));
//             //if greater than 5 then will be removed
//             // if (cityStorageObject.length > 5) {
//             //     cityStorageObject.pop(); 
//             //     cityStorage.unshift(citySearch);
//             // }else{
//             //     cityStorage.unshift(citySearch);
//             // }
//         }else{
//             var searchHistoryList = [];
//             searchHistoryList.push(cityStorage)
//             localStorage.setItem("city", JSON.stringify(searchHistoryList)); //changed (temp) to (city)

//             searchHistoryEl.innerHTML = searchHistoryList;
//             console.log("inside of else state search historyEl",searchHistoryEl);

//         } 


