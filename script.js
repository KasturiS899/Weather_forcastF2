const container = document.getElementById("weather-container"); 
const input = document.getElementById("input");
const addBtn = document.getElementById("add");
const apiKey = `760a2725e1b51d4e16773ff572dbec82`;
let arr = [];


// Fetching data from openweathermap.org
async function getWeather(){
    const city = input.value.trim();
    const URL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`
    let response = await fetch(URL);
    let data = await response.json();
    console.log(data);
    addArr(data);
}

function addArr(data){
    if(data.message === 'Enter valid city name'){
        return;
    }
    for (let i = 0; i < arr.length; i++) {
        const element = arr[i];
        if(data.name === element.name){
            insert = !insert;
            return;
        }
    }
    arr.push(data);
    arr.sort((a,b)=>{
        return a.main.temp - b.main.temp;
    })
    container.innerHTML = '';
    arr.forEach((e) =>{
        WeatherCard(e);
    })
}
function WeatherCard(data){
    const weather = document.createElement("div");
    weather.className = "weather";
    const info = selectLogo(data);
    let logo = info[0];
    let desc = info[1];
    let myStr = `
    <div class="container"> 
    <div class="top">
        <div class="temparature">${Math.round(data.main.temp)}°</div>
        <div class="logo"><img src="${logo}" alt="weather-logo"></div>
    </div>
    <div class="weth"> Weather ${Math.round(data.main.feels_like)}° </div>
    <div class="temp">
        <div class="high">H: ${Math.round(data.main.temp_max)}°</div>
        <div class="low">L: ${Math.round(data.main.temp_min)}°</div>
    </div>    
    <div class="bottom">
        <div class="city">${data.name} , ${data.sys.country}</div>
        <div class="weath-condi">${desc}</div>
    </div>
    </div>`;
    weather.innerHTML = myStr;
    container.appendChild(weather);

}

function selectLogo(data){
    let imageUrl = "";
    let desc = "";
    if(data.weather[0].main === "Clear" || data.weather[0].main === "Sunny"){
        imageUrl = "suncloud.png";
        desc = "Sunny";
    }
    
    else if(data.weather[0].main === "Storm" || Math.round(data.wind.speed) >= 15){
        imageUrl = "Tornado.png";
        desc = "Windy";
        
    }
    
    else if(data.weather[0].main === "Rain" || Math.round(data.rain) >= 10){
        imageUrl = "moonmid.png";
        desc = "Rainy";
        
    }
    else if(data.weather[0].main === "Haze" || data.weather[0].main === "Cloud" || Math.round(data.clouds) >= 65){
        imageUrl = "moodcloud.png";
        desc = "Cloudy";
        
    }else{
        imageUrl = "suncloud.png";
        desc = "Partialy Cloudy";

    }
    let info = [imageUrl,desc];
    return info;
}

addBtn.addEventListener("click",getWeather);
