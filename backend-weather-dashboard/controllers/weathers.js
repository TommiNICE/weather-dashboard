require('dotenv').config()
const weatherRouter = require('express').Router()
const axios = require('axios')

const apiKey = process.env.API_KEY

weatherRouter.get('/', async (req, res, next) => {
    const { city } = req.query
    if (!city) {
        return res.status(400).json({ error: 'City must be provided' });
    }
    try {
        console.log(`Fetching data for ${city}`);
        const geoResponse = await axios.get(`http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=${apiKey}`);
        const [location] = geoResponse.data
        let lat = String(location.lat)
        let lon = String(location.lon)
        console.log(`Lat: ${lat}, Lon: ${lon}`)

        if (location) {
            const weatherResponse = await axios.get(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric&`)
            res.json(weatherResponse.data);
        } else {
            res.status(404).json({ error: 'City not found' });
        }

        return
    } catch (error) {
        return res.status(500).json({ error: 'Failed to fetch weather data' });
    }
})

module.exports = weatherRouter

/* https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric */