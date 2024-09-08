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
        console.log(`Fetching weather data for ${city}`);
        const response = await axios.get(`http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=${apiKey}`);
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch weather data' });
    }
    next()
})

module.exports = weatherRouter