import React from 'react'

const WeatherForecast = ( { weather }) => {
  return (
    <div>
        {/* Weather mapping into its own component WeatherForecast */}
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

export default WeatherForecast