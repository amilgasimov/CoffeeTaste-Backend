const router = require('express').Router();
const coffeeController = require('../controllers/coffeeController');
const { body } = require("express-validator");
const validate = require("../middleware/Validation");

router.get('/api/coffees', coffeeController.getAll)

router.post(
    "/api/login",
    [
        body("username").notEmpty().withMessage("username is required"),
        body("password").notEmpty().withMessage("Password is required"),
    ],
    validate,
    coffeeController.login
);
router.post(
    "/api/register",
    [
        body("username")
            .notEmpty()
            .withMessage("username is required"),
        body("password")
            .notEmpty()
            .withMessage("Password is required")
            .matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/)
            .withMessage(
                "Password must be at least 6 characters long and contain at least one letter and one number"
            ),
    ],
    validate,
    coffeeController.register
);

module.exports = router