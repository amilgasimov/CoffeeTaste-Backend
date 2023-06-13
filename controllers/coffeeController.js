const Coffees = require("../models/Coffees");
const express = require("express");
const User = require("../models/User");
const app = express();
app.use(express.json());
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const env = require("dotenv").config();

const coffeeController = {
    getAll: (req, res) => {
        Coffees.find()
            .then(data => {
                res.json(data);
            })
            .catch(err => {
                res.status(500).json(err);
            })
    },

    register: async (req, res) => {
        try {
            const { username, password } = req.body;
console.log(req.body);
            const existingUser = await User.findOne({ username });
            if (existingUser) {
                return res.json({
                    success: false,
                    errors: { msg: "User already exists" },
                });
            }

            // Create a new user
            const newUser = new User({ username, password });

            await newUser.save();

            res.json({
                success: true,
                newUser,
            });
        } catch (err) {
            res
                .status(500)
                .json({ success: false, errors: { msg: "Internal Server Error" } });
        }
    },
    login: async (req, res) => {
        try {
            const { username, password } = req.body;

            const user = await User.findOne({ username });

            if (!user) {
                return res.json({
                    success: false,
                    errors: { msg: "User not found" },
                });
            }

            // Compare passwords
            if (password !== user.password) {
                return res.json({
                    success: false,
                    errors: {
                        msg: "Invalid username or password",
                    },
                });
            }

            // Generate a token
            let token = jwt.sign({ username: username }, process.env.privateKey, {
                // algorithm:'ES512'
                issuer: "Code Academy",
            });

            // Return the token to the client
            res.json({ success: true, token });
        } catch (err) {
            res.status(500).json({
                success: false,
                errors: { msg: "Internal Server Error", err: err },
            });
        }
    },
}




module.exports = coffeeController;