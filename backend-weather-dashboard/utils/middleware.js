const jwt = require('jsonwebtoken')
const User = require('../models/user')
const logger = require('./logger')

const requestLogger = (request, response, next) => {
  console.log('---')
  console.log('Time:', new Date().toISOString())
  console.log('Method:', request.method)
  console.log('Path:  ', request.path)
  console.log('Query: ', request.query)
  console.log('Headers:', request.headers)
  console.log('Body:  ', request.body)
  console.log('IP:    ', request.ip)
  console.log('---')
  next()
}

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

const tokenExtractor = (request, response, next) => {
  const token = request.get('authorization')
  if (token && token.startsWith('Bearer ')) {
    request.token = token.replace('Bearer ', '')
  }
  next()
}

const userExtractor = (request, response, next) => {
  const decodedToken = jwt.verify(request.token, process.env.SECRET)
  if (!decodedToken.id) {
    return response.status(401).json({ error: 'token invalid' })
  }

  User.findById(decodedToken.id)
   .then(user => {
      if (!user) {
        return response.status(401).json({ error: 'token invalid' })
      }
      request.user = user
      next()
    })
   .catch(error => next(error))
}

const errorHandler = (error, request, response, next) => {
  logger.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  } else if(error.name === 'MongoServerError') {
    if(error.code === 11000) {
      return response.status(400).json({ error: 'duplicate value entered' })
    }
  } else if(error.name === 'JsonWebTokenError') {
    return response.status(400).json({ error: 'token missing or invalid' })
  }

  next(error)
}

module.exports = {
  requestLogger,
  unknownEndpoint,
  tokenExtractor,
  userExtractor,
  errorHandler
}