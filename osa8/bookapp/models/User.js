const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    minlength: 4
  },
  favoriteGenre: {
    type: String,
    require: true
  },
})

module.exports = mongoose.model('User', schema)