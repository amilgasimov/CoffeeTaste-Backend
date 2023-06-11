const express = require('express');
const app = express();
const db = require('./config/db');
app.use(express.json());
db.connect();
const coffeeRoutes = require('./routes/coffeeRoutes');


app.use("/coffees", coffeeRoutes);

app.listen(8080, () => {
    console.log('Server is running...');
})