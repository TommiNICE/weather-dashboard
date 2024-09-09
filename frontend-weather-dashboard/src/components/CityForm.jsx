import { useState, useEffect } from 'react'
import weatherService from '../services/weathers'


const CityForm = () => {
  const [city, setCity] = useState('')
  const [weather, setWeather] = useState([])
  
  useEffect(() => {
    if (city) {
      weatherService.getWeatherData(city)
       .then(response => {
        const dailyForecasts = response.list.map(item => ({
          dateTime: new Date(item.dt * 1000),
          temperature: item.main.temp,
          description: item.weather[0].description,
          icon: item.weather[0].icon,
          windSpeed: item.wind.speed
        }))
          setWeather(dailyForecasts)
          console.log('Weather for city:', weather)
        })
       .catch(error => {
          console.log('Error fetching weather:', error.message)
        })
    }
  }, [city])

  const handleCityChange = (event) => {
    setCity(event.target.value)
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    setCity('')
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={city}
          onChange={handleCityChange}
          placeholder="Enter city name"
        />
        <button type="submit">Get Weather</button>
      </form>
      {weather.map((forecast, index) => (
      <div key={index}>
        <p>Date: {forecast.dateTime.toLocaleString()}</p>
        <p>Temperature: {forecast.temperature}°C</p>
        <p>Description: {forecast.description}</p>
        <p>Wind Speed: {forecast.windSpeed} m/s</p>
        <img src={`http://openweathermap.org/img/wn/${forecast.icon}.png`} alt="Weather icon" />
      </div>
    ))}
    </div>
  )
}

export default CityForm
