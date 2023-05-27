import React, { useState } from 'react';
import './task.css'

const WeatherApp = () => {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);

  const API_KEY = 'a873e1c4b89df77d719ec0c445a4baf2';

  const handleInputChange = (event) => {
    setCity(event.target.value);
  };

  const handleSearch = () => {
    if (city.trim() !== '') {
      fetchWeatherData();
    }
  };

  const fetchWeatherData = async () => {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
        
      );
      console.log("res sdasd",response.ok)
      if (response.ok) {
        const data = await response.json();
        setWeatherData(data);
        setError(null);
      } else {
        setError('City not found');
        setWeatherData(null);
      }
    } catch (error) {
      setError('Failed to fetch weather data');
      setWeatherData(null);
    }
  };

  return (
    <div className="weather-app-container">
      <h1>Weather App</h1>
      <div className="search-container">
        <input
          type="text"
          placeholder="Enter a city name"
          value={city}
          onChange={handleInputChange}
        />
        <button onClick={handleSearch}>Search</button>
      </div>
      {error && <div className="error-message">{error}</div>}
      {weatherData && (
        <div className="weather-info">
          <h2>{weatherData.name}</h2>
          <p>Temperature: {weatherData.main.temp}°C</p>
          <p>Description: {weatherData.weather[0].description}</p>
        </div>
      )}
    </div>
  );
};

export default WeatherApp;