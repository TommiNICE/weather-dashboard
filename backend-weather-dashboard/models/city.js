const mongoose = require('mongoose')

const citySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
          }
    },
    population: Number,
    country: String,
    weather: String,
    favorite: Boolean
})

citySchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

module.exports = mongoose.model('City', citySchema)
