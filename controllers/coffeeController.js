const Coffees = require("../models/Coffees");


const coffeeController = {
    getAll: (req, res) => {
        Coffees.find()
            .then(data => {
                res.json(data);
            })
            .catch(err => {
                res.status(500).json(err);
            })
    }
}

module.exports = coffeeController;