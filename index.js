const express = require('express');
const app = express();
const db = require('./config/db');
const env = require("dotenv").config();
const jwt = require("jsonwebtoken");
const cors = require("cors");
app.use(express.json());
db.connect();
app.use(cors());
const coffeeRoutes = require('./routes/coffeeRoutes');

app.use((req, res, next) => {
    if (req.url == "/api/register" || req.url == "/api/login") {
        next();
    } else {
        if (req.headers.authorization) {
            let token = req.headers.authorization.split(" ")[1];
            try {
                jwt.verify(token, process.env.privateKey);
                next();
            } catch (error) {
                res.status(401).json({ msg: "Hayırdır komşu nereye böyle..." });
            }
        } else {
            res.status(401).json({ msg: "Hayırdır komşu nereye böyle..." });
        }
    }
});

app.use("/", coffeeRoutes);

app.listen(8080, () => {
    console.log('Server is running...');
})