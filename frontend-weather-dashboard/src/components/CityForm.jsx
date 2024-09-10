import { useState, useEffect } from 'react'
import WeatherForecast from './WeatherForecast'
import weatherService from '../services/weathers'
import CountryInfo from './CountryInfo'

const CityForm = () => {
  const [city, setCity] = useState('')
  const [weather, setWeather] = useState([])
  const [country, setCountry] = useState('')
  
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
          // Fetch country name for the city
          const countryCity = response.city.name
          console.log('Weather for city:', countryCity)
          // Fetch country code for the city
          const countryCode = response.city.country
          setCountry(countryCode)
          console.log('Country code:', country)
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
      <WeatherForecast weather={weather} />
      {/* Display country information, also own component 
      CountryInfo, but using Togglable */}
      <CountryInfo city={city} />
    </div>
  )
}

export default CityForm
