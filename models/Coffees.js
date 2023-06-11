const { default: mongoose } = require("mongoose");

const coffeeScheme = new mongoose.Schema({
    imageURL: String,
    price: String,
    coffeeName: String,
})

const Coffees = mongoose.model('coffees', coffeeScheme);

module.exports = Coffees;