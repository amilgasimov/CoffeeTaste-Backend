const { default: mongoose } = require("mongoose");

const coffeeScheme = new mongoose.Schema({
    imageURL: String,
    options: Array,
    correctAnswer: String,
})

const Coffees = mongoose.model('coffees', coffeeScheme);

module.exports = Coffees;