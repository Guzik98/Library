const mongoose = require('mongoose')//wymaga bazydanych

//model autora
const authorSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('Author', authorSchema) //export
