const apiKey = '4638d2b572bbb0be5512c7fb3194ce1b'; // Your OpenWeatherMap API key

// DOM elements
const searchButton = document.getElementById('search-button');
const cityInput = document.getElementById('city-input');
const cityName = document.getElementById('city-name');
const weatherDescription = document.getElementById('weather-description');
const temperature = document.getElementById('temperature');
const humidity = document.getElementById('humidity');
const windSpeed = document.getElementById('wind-speed');
const appContainer = document.querySelector('.app-container'); // Main container for the background color change

// Weather emoji and background mapping based on weather description
const weatherEmojiMap = {
  "clear sky": "☀️", // Sunny
  "few clouds": "🌤️", // Partly cloudy
  "scattered clouds": "⛅", // Partly cloudy
  "broken clouds": "☁️", // Cloudy
   "overcast clouds": "☁️", // Overcast cloud
  "shower rain": "🌧️", // Rainy
  "rain": "🌧️", // Rainy
  "thunderstorm": "⛈️", // Thunderstorm
  "snow": "❄️", // Snowy
  "mist": "🌫️", // Misty
  "haze": "🌫️", // Hazy
  "fog": "🌫️", // Foggy
  "drizzle": "🌦️", // Light rain
  "clear": "☀️", // Clear (good weather)
};

const weatherBackgroundMap = {
    "clear sky": "url('https://media.istockphoto.com/id/1328689113/photo/summer-blue-sky-and-white-cloud-white-background-beautiful-clear-cloudy-in-sunlight-calm.jpg?s=612x612&w=0&k=20&c=37qEuwdxyQSx9kuS-_Gz0WiKFX6jMXZN9aRY47mN2vI=')", // Sunny

    "few clouds": "url('https://media.istockphoto.com/id/492866927/photo/few-little-fluffy-white-clouds-in-blue-sky.jpg?s=612x612&w=0&k=20&c=0BeCgArlnZP5ugmn4qz-gNOnGNd7wucrj1sB-CizI-Q=')", // Light clouds
    "scattered clouds": "url('https://live.staticflickr.com/2106/1909487867_de140c7eb8_b.jpg')", // Scattered clouds
    "broken clouds": "url('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTySM1icKTNjTifKlmoj1L1Xn8HwE6HK78kuA&s')", // Broken clouds
  "overcast clouds": "url('https://images.unsplash.com/photo-1499346030926-9a72daac6c63?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80')",
    "shower rain": "url('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTlYqRhuoX_px2oZvnW3QgXuRIjO8pPP2wSTA&s')", // Rain
    "rain": "url('https://st4.depositphotos.com/16122460/29142/i/450/depositphotos_291421362-stock-photo-heavy-rain-falling-down-on.jpg')", // Heavy rain    
    "thunderstorm": "url('https://media.13newsnow.com/assets/WVEC/images/e23dc125-7f4c-4783-8b28-925ec0d61d6f/e23dc125-7f4c-4783-8b28-925ec0d61d6f_750x422.jpg')", // Thunderstorm
    "snow": "url('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT03AczGad7XydtVmb75dTFEmAOsWvJZxMzzQ&s')", // Snow
    "mist": "url('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRmo-I0Dlb1x8VJ2A5UYb6A_T45MQFZYawKwg&s')", // Mist
    "haze": "url('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS-kuvWHo_8BXB2L-5I04eK58PCTa101eNqpw&s')", // Haze
    "fog": "url('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ7hDHQh-QF0Gdwcuq9nOb8xxCnkhcjWw3x2A&s')", // Fog
    "drizzle": "url('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRVGfJ6pW2hVs3r3uF5SLqyguC1et3yzWkphX5YPmavuLMVvWDcwCmOKAAKC_knISqxwgw&usqp=CAU')" // Drizzle
  };

const backgroundColors = {
  "clear sky": "#ffeb3b", // Sunny yellow
  "few clouds": "#80deea", // Light blue
  "scattered clouds": "#81d4fa", // Blue
  "broken clouds": "#90a4ae", // Grayish clouds
  "overcast clouds": "#78909c",
  "shower rain": "#0097a7", // Rainy blue
  "rain": "#00796b", // Dark greenish-blue
  "thunderstorm": "#d32f2f", // Red for thunderstorm
  "snow": "#ffffff", // Snow white
  "mist": "#cfd8dc", // Misty gray
  "haze": "#b0bec5", // Light gray
  "fog": "#9e9e9e", // Foggy gray
  "drizzle": "#0288d1", // Light rain blue
  "clear": "#ffeb3b", // Clear (good weather)
};

// Function to fetch weather data by city
const getWeatherByCity = async (city) => {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (data.cod !== 200) {
      alert('City not found');
      return;
    }

    // Extracting weather condition and updating the UI
    const condition = data.weather[0].description.toLowerCase();
    const emoji = weatherEmojiMap[condition] || "❓"; // Default emoji if no match
    const backgroundColor = backgroundColors[condition] || "#eeeeee"; // Default background color
    const backgroundImage = weatherBackgroundMap[condition] || "url('https://example.com/default.jpg')"; // Default image

    // Update UI with weather data
    cityName.textContent = data.name;
    weatherDescription.textContent = `${condition} ${emoji}`;
    temperature.textContent = `Temperature: ${data.main.temp}°C`;
    humidity.textContent = `Humidity: ${data.main.humidity}%`;
    windSpeed.textContent = `Wind Speed: ${data.wind.speed} m/s`;

    // Update background color and background image dynamically based on weather condition
    appContainer.style.backgroundColor = backgroundColor;
    appContainer.style.backgroundImage = backgroundImage;
    appContainer.style.backgroundSize = 'cover';
    appContainer.style.backgroundPosition = 'center';

  } catch (error) {
    console.error('Error fetching weather data:', error);
    // alert('Failed to fetch weather data');
  }
};

// Event listener for search button (manual city input)
searchButton.addEventListener('click', () => {
  const city = cityInput.value.trim();
  if (city) {
    getWeatherByCity(city); // Get weather for the entered city
  } else {
    alert('Please enter a city name');
  }
});

// Optional: Allow pressing Enter to search for city manually
cityInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    searchButton.click();
  }
});

// Call geolocation to get weather based on user's location when the page loads
window.onload = () => {
  getUserLocation(); // Automatically fetch weather for the user's current location
};
