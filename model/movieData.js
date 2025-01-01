const mongoose = require('mongoose');

// going to create schema (each collection have each schema)

const movieSchema = mongoose.Schema({
    movieName : String,
    movieDirector : String,
    movieDescription : String 
})

// this schema is mapping to the collection
const movieData = mongoose.model('movie',movieSchema);

module.exports = movieData;// export that particular schema