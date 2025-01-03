const apiKey = '1c31894833d56246a0593b53949144bf';

function setDefaultBackground() {
    // Set the default background when the page loads
    const defaultBackground = 'default-bg.jpg';
    document.body.style.backgroundImage = `url(${defaultBackground})`;
    document.body.style.backgroundSize = 'cover'; // Set background size
    document.body.style.backgroundPosition = 'center'; // Set background position
}

function getWeather() {
    const cityInput = document.getElementById('cityInput').value.trim();
    const cityName = cityInput.charAt(0).toUpperCase() + cityInput.slice(1).toLowerCase();
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`;

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('City not found');
            }
            return response.json();
        })
        .then(data => {
            displayWeather(data);
        })
        .catch(error => {
            alert(error.message);
        });
}

function displayWeather(data) {
    const cityName = data.name;
    const temperature = Math.round(data.main.temp);
    const description = data.weather[0].description;
    const weatherIcon = data.weather[0].icon;

    // Display weather information
    document.getElementById('cityName').innerText = `Weather in ${cityName}`;
    document.getElementById('temperature').innerText = `Temperature: ${temperature}°C`;
    document.getElementById('description').innerText = `Condition: ${description}`;
    document.getElementById('weatherIcon').src = `https://openweathermap.org/img/wn/${weatherIcon}.png`;

    // Change background based on the weather condition
    const weatherCondition = data.weather[0].main.toLowerCase();
    let backgroundUrl = '';
    if (weatherCondition.includes('cloud')) {
        backgroundUrl = './images/cloudy-bg.jpg';
    } else if (weatherCondition.includes('rain')) {
        backgroundUrl = './images/rain1.jpg';
    } else if (weatherCondition.includes('drizzle')) {
        backgroundUrl = './images/drizzle.jpg';
    } else if (weatherCondition.includes('clear')) {
        backgroundUrl = './images/sunny-bg.jpg';
    } else if (weatherCondition.includes('mist')) {
        backgroundUrl = './images/mist-bg.jpg';
    } else if (weatherCondition.includes('fog')) {
        backgroundUrl = './images/fog.jpg';
    } else if (weatherCondition.includes('haze')) {
        backgroundUrl = './images/haze.jpg';
    } else if (weatherCondition.includes('snow')) {
        backgroundUrl = './images/snow3.jpg';
    } else {
        backgroundUrl = 'default-bg.jpg';
    }
    document.body.style.backgroundImage = `url(${backgroundUrl})`;

    const weatherInfo = document.getElementById('weatherInfo');
    weatherInfo.classList.remove('hidden');
    weatherInfo.classList.add('show');
}

// Call the function when the page loads
window.onload = function() {
    setDefaultBackground();  // Set default background
};