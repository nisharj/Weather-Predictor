async function getWeather() {
    const apiKey = '1eef4819a5f95b53dbc16d2262c40b19';

    // Get city from input or dropdown
    let city = document.getElementById('cityInput').value.trim();

    if (!city) {
        alert("Please enter a city.");
        return;
    }

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error('City not found');

        const data = await response.json();

        // Fill in weather info
        document.getElementById('cityName').innerText = data.name;
        document.getElementById('weatherIcon').src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
        document.getElementById('weatherIcon').alt = data.weather[0].description;
        document.getElementById('description').innerText = data.weather[0].description;
        document.getElementById('temp').innerText = data.main.temp;
        document.getElementById('humidity').innerText = data.main.humidity;
        document.getElementById('wind').innerText = data.wind.speed;

        // Show weather box
        document.getElementById('weather-box').style.display = 'block';
    } 
    catch (error) {
        alert(error.message);
    }
}
