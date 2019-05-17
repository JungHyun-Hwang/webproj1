const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    id: { type: String, required : true, unique: true},
    pw: { type: String, required : true},
    name: { type: String, required: true},
    age: { type: Number, default: '0' }
})

const User = mongoose.model('WebProj1', userSchema)

module.exports = User
