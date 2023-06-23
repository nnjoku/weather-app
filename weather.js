//  using api documentation from https://openweathermap.org/current


function getWeatherDetails() {
    // Get input value
    var cityInput = document.querySelector(".city-input").value;
    var apiKey = "";
    var apiUrl = 'https://api.openweathermap.org/data/2.5/weather?q=' + cityInput + '&appid=' + apiKey;

    // Fetch weather details using apiURL

    fetch(apiUrl)
        .then(function (response) {
            if (response.ok) {
                return response.json();
            } else {
                alert("Please enter a valid city name");
            } throw new Error("invalid city name");
        }).then(function (data) {
            
            displayWeatherDetails(data);
        })
}
//  display weather details on page and update inner html
function displayWeatherDetails(data) {

   

    var city = document.querySelector(".city");
    city.innerHTML = `${data.name}, ${data.sys.country}`;

    var temperature = document.querySelector(".temperature");
    temperature.innerHTML = `${Math.round((data.main.temp)-273.15)}°C`;

    var highOrLow = document.querySelector(".high-or-low");
    highOrLow.innerHTML = `High: ${Math.round((data.main.temp_max)-273.15)}°C, Low: ${Math.round((data.main.temp_min) - 273.15)}°C`; //convert to celsius

    var windSpeed = document.querySelector(".wind-speed");
    windSpeed.innerHTML = `Wind Speed: ${Math.round((data.wind.speed) * 1.609344) } km/h`;

    var weatherIcon = document.querySelector(".weather-icon");
    weatherIcon.src = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;

    var condition = document.querySelector(".weather-description");
    condition.innerHTML = (data.weather[0].description);

    var realFeel = document.querySelector(".real-feel");
    realFeel.innerHTML = `Real Feel: ${Math.round((data.main.feels_like) - 273.15)}°C`;
}
    
// Event listener for the button click
const searchEntry = document.querySelector('.search-btn').addEventListener('click', getWeatherDetails);

// Event listener for the enter key press
document.querySelector('.city-input').addEventListener('keyup', function(event) {
  if (event.key === 'Enter') {
    getWeatherDetails();
  }
});