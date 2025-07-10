async function getWeather() {
  const apiKey = '1eef4819a5f95b53dbc16d2262c40b19';
  const location = document.getElementById('cityInput').value.trim();
  const warning = document.getElementById('warning');

  warning.style.display = "none";
  document.getElementById('weather-box').style.display = 'none';

  if (!location) {
    warning.innerText = "❗ Please enter a location.";
    warning.style.display = "block";
    return;
  }

  try {
    // 1. Get coordinates using Geocoding API
    const geoUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${encodeURIComponent(location)}&limit=1&appid=${apiKey}`;
    const geoRes = await fetch(geoUrl);
    const geoData = await geoRes.json();

    if (!geoData.length) throw new Error("❗ Location not found. Please check spelling.");

    const { lat, lon, name, state, country } = geoData[0];

    // 2. Fetch weather using lat & lon
    const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
    const weatherRes = await fetch(weatherUrl);
    const data = await weatherRes.json();

    document.getElementById('cityName').innerText = `${name}`;
    document.getElementById('weatherIcon').src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
    document.getElementById('weatherIcon').alt = data.weather[0].description;
    document.getElementById('description').innerText = data.weather[0].description;
    document.getElementById('temp').innerText = data.main.temp;
    document.getElementById('humidity').innerText = data.main.humidity;
    document.getElementById('wind').innerText = data.wind.speed;

    document.getElementById('weather-box').style.display = 'block';
  } catch (error) {
    warning.innerText = error.message;
    warning.style.display = "block";
  }
}

