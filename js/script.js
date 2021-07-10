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

var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition;

const recognition = new SpeechRecognition();
const synth = window.speechSynthesis;
recognition.lang = 'vi-VI';
recognition.continuous = false;

const microphone = document.querySelector('.microphone');

const speak = (text) => {
    if (synth.speaking) {
        console.error('Busy. Speaking...');
        return;
    }

    const utter = new SpeechSynthesisUtterance(text);

    utter.onend = () => {
        console.log('SpeechSynthesisUtterance.onend');
    }
    utter.onerror = (err) => {
        console.error('SpeechSynthesisUtterance.onerror', err);
    }
    utter.volume = 1;
    synth.speak(utter);
};

const handleVoice = (text) => {
    //console.log('text', text);

    // "thời tiết tại Đà Nẵng" => ["thời tiết tại", "Đà Nẵng"]
    const handledText = text.toLowerCase();
    if (handledText.includes('thành phố ')) {
        const location = handledText.split('phố')[1].trim();

        console.log('location', location);
        searchInput.value = location;
        const changeEvent = new Event('change');
        searchInput.dispatchEvent(changeEvent);
        return;
    }
    
    const container = document.querySelector('.container-sm');
    if (handledText.includes('thay đổi màu nền')) {
        const color = handledText.split('màu nền')[1].trim();
        container.style.background = color;
        return;
    }

    if (handledText.includes('màu nền mặc định')) {
        container.style.background = '';
        return;
    }

    if (handledText.includes('mấy giờ')) {
        const textToSpeech = `${moment().hours()} hours ${moment().minutes()} minutes`;
        speak(textToSpeech);
        return;
    }

    speak('Try again');
}

microphone.addEventListener('click', (e) => {
    e.preventDefault();

    recognition.start();
    microphone.classList.add('recording');
    
});

recognition.onspeechend = () => {
    recognition.stop();
    microphone.classList.remove('recording');
}

recognition.onerror = (err) => {
    //console.error(err);
    microphone.classList.remove('recording');
}

recognition.onresult = (e) => {
    //console.log('onresult', e);
    const text = e.results[0][0].transcript;
    handleVoice(text);
}

const time_date = document.querySelector('.time-date');
var d = new Date();
time_date.innerHTML = d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds();
setInterval(myFunction, 1000);
function myFunction() {
    d = new Date();
    time_date.innerHTML = d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds();
}