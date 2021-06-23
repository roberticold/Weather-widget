
// API KEYS
let weathear_API_Key = '3a46a64595b7a7c0c8c48d9970e62d2a'
let timeZone_API_Key='STUO0MV3A2AO'


// kelvin constant to convert to Celcius
const KELVIN = 273;



// SELECT ELEMENTS
const iconElement = document.getElementById("weather-icon");
const tempElement = document.getElementById("temperature-value");
const descElement = document.getElementById("temperature-description");
const locationElement = document.getElementById("location");
const userHumidityElement = document.getElementById("humidity");
const userWindElement = document.getElementById("wind");


//Function to DISPLAY WEATHER 
function displayWeather(){
    iconElement.innerHTML = `<img src="icons/${weather.iconId}.png"/>`;
    tempElement.innerHTML = `${weather.temperature.value}°<span>C</span>`;
    descElement.innerHTML = weather.description;
    locationElement.innerHTML = `${weather.city}, ${weather.country}`;
    userHumidityElement.innerHTML = `${weather.userHumidity}%`;
    userWindElement.innerHTML=`${weather.userwind} kmh`;
    

}




// App data
const weather = {};

weather.temperature = {
    unit : "celsius"
}







// CHECK IF BROWSER SUPPORTS GEOLOCATION
if('geolocation' in navigator){
    navigator.geolocation.getCurrentPosition(setPosition, showError);
}else{
    const notificationElement= document.getElementById = "noGeo-message";
    notificationElement.innerHTML = "Browser doesn't Support Geolocation";
}





// SET USER'S POSITION
function setPosition(position){
    
    let user_latitude = position.coords.latitude;
    let user_longitude = position.coords.longitude;
    
    showWeather(user_latitude, user_longitude);
    
}





// SHOW ERROR WHEN THERE IS AN ISSUE WITH GEOLOCATION SERVICE
function showError(error){
    const notificationElement1= document.getElementById = "error-message";
    notificationElement1.innerHTML = `${error.message}`;
}





// Getting the weather from the openweather API by the local geolocation.
function showWeather(latitude, longitude){
    let api_weather_address = `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${weathear_API_Key}`;
    fetch(api_weather_address)
        .then((response)=>{
            let data = response.json();
            return data;
            
            
        })
        .then((data)=>{
            weather.temperature.value = Math.floor(data.main.temp - KELVIN);
            weather.description = data.weather[0].description;
            weather.iconId = data.weather[0].icon;
            weather.city = data.name;
            weather.country = data.sys.country;
            weather.userHumidity=data.main.humidity;
            weather.userwind=data.wind.speed;
            dateTimeFunc(latitude,longitude)
            console.group(data)
            
            
            
            

        })
        .then(function(){
            displayWeather();
            
            
        });

            
    
}            
        





// C to F conversion
function celsiusToFahrenheit(temperature){
    return (temperature * 9/5) + 32;
}

// WHEN THE USER CLICKS ON THE TEMPERATURE ELEMENET
tempElement.addEventListener("click", function(){
    if(weather.temperature.value === undefined) return;
    
    if(weather.temperature.unit == "celsius"){
        let fahrenheit = celsiusToFahrenheit(weather.temperature.value);
        fahrenheit = Math.floor(fahrenheit);
        
        tempElement.innerHTML = `${fahrenheit}°<span>F</span>`;
        weather.temperature.unit = "fahrenheit";
    }else{
        tempElement.innerHTML = `${weather.temperature.value}°<span>C</span>`;
        weather.temperature.unit = "celsius"
    }
});






// Getting the weather for a requested City. Another endpoint for the openweather API


function getWeatherByCity(){
    event.preventDefault();
    let city = document.getElementById('cityInput').value.toLowerCase()
    let city_url_API_Adress=`http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${weathear_API_Key}`
    fetch(city_url_API_Adress)

        .then((response)=>{
            let data1 = response.json();
            return data1

        
            
        })
        .then((data1)=>{
            let city_latitude =data1[0].lat
            let city_longitude =data1[0].lon
            showWeather(city_latitude, city_longitude);
            
            
            

        })
        



}

        





//Getting the date and time from the timedonedb API


function dateTimeFunc(latitude,longitude){
    let timeZone_API_Address = `http://api.timezonedb.com/v2.1/get-time-zone?key=${timeZone_API_Key}&format=json&by=position&lat=${latitude}&lng=${longitude}`
    fetch(timeZone_API_Address)
        .then((response)=>{
            let data2 = response.json();
            
            return data2
            
            
            
  
            
        })
        .then((data2)=>{
            datetime=data2.formatted;
            const usertimezoneElement = document.getElementById("user-time-zone");
            usertimezoneElement.innerHTML = datetime;
            
            

        })
        

    }        
    
