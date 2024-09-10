const jwt = require('jsonwebtoken')
const cityRouter = require('express').Router()
const City = require('../models/city')
const middleware = require('../utils/middleware')

cityRouter.get('/', async (req, res) => {
    const cities = await City
        .find({}, 'name')
    res.json(cities.map(city => city.name))
})

cityRouter.get('/:id', async (req, res, next) => {
    try {
        const city = await City.findById(req.params.id)
        if (city) {
            res.json(city)
        } else {
            res.status(404).end()
        }
    } catch (error) {
        next(error)
    }
})

cityRouter.post('/', middleware.userExtractor, async (request, response) => {
    const { name, population, country, weather, favorite } = request.body

    const decodedToken = jwt.verify(request.token, process.env.SECRET)
    console.log(decodedToken)
    if (!decodedToken.id) {
        return response.status(401).json({ error: 'token invalid' })
    }

  const userExists = request.user

    if (!name || !population || !country || !weather) {
        return response.status(400).json({ error: 'Name, population, country, and weather must be provided' })
    }

    const existingCity = await City.findOne({ name: name })
    if (existingCity) {
        return response.status(400).json({ error: 'City with this name already exists' })
    }

    const city = new City({
        name: name,
        population: population,
        country: country,
        weather: weather,
        favorite: favorite === undefined? false : favorite,
        user: userExists.id
    })

    try {
        const savedCity = await city.save()
        response.status(201).json(savedCity)
    } catch (error) {
        response.status(400).json({ error: error.message })
    }
})

module.exports = cityRouter
