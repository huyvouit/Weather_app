const searchInput = document.querySelector("#input-bar");
const APP_ID = '701eed5683bd07b643c9f6b0e8acb352';
const DEFAULT = "--"
const citynName = document.querySelector(".nameCity");
const stateName = document.querySelector(".state");
const icon = document.querySelector(".iconWeather");
const temperature = document.querySelector(".temperature");
const humidity = document.querySelector(".value-humidity");
const wind = document.querySelector(".value-wind");
const sunrise = document.querySelector(".value-sunrise");
const sunset = document.querySelector(".value-sunset");

searchInput.addEventListener("change",(e)=>{
    
    fetch(`http://api.openweathermap.org/data/2.5/weather?q=${e.target.value}&appid=${APP_ID}&units=metric&lang=vi`)
    .then( async  response => {
        const data = await response.json();
        
        citynName.innerHTML = data.name || DEFAULT;
        stateName.innerHTML = data.weather[0].description || DEFAULT;
        icon.setAttribute('src', `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`) || DEFAULT;
        temperature.innerHTML = Math.round(data.main.temp) || DEFAULT;
        wind.innerHTML = ` ${(data.wind.speed * 3.6).toFixed(2)} km/h` || DEFAULT;
        humidity.innerHTML = ` ${data.main.humidity}%` || DEFAULT;
        sunrise.innerHTML = moment.unix(data.sys.sunrise).format('H:mm') || DEFAULT;
        sunset.innerHTML = moment.unix(data.sys.sunset).format('H:mm') || DEFAULT;

        
    });
    
});