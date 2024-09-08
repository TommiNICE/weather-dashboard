import { useState, useEffect } from 'react'
import weatherService from '../services/weathers'


const CityForm = () => {
  const [city, setCity] = useState('')
  const [weather, setWeather] = useState(null)
  
  useEffect(() => {
    if (city) {
      weatherService.getWeatherData(city)
       .then(response => {
          setWeather(response.data)
          console.log('Weather data:', JSON.stringify(response, null, 2))
          console.log('City:', response[1].name)
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
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={city}
        onChange={handleCityChange}
        placeholder="Enter city name"
      />
      <button type="submit">Get Weather</button>

      {weather}
    </form>
  )
}

export default CityForm
