const router = require('express').Router();
const coffeeController = require('../controllers/coffeeController');

router.get('/', coffeeController.getAll)

module.exports = router