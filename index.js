const express = require('express');
const app = express();
const db = require('./config/db');
app.use(express.json());
db.connect();
const flagRoutes = require('./routes/flagRoutes');

app.use("/flags", flagRoutes);

app.listen(8080, () => {
    console.log('Server is running...');
})