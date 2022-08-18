const express = require('express');
const mongoose = require('mongoose');
const app = express();

app.use(express.json());
app.listen(3000, () => {
    console.log(`Server Started at ${3000}`)
})

require('dotenv').config();
const mongoString = process.env.DATABASE_ENV;
mongoose.connect(mongoString);
const database = mongoose.connection
database.on('error', (error) => {
    console.log(error)
})

database.once('connected', () => {
    console.log('Database Connected');
})
const routes = require('./routes/router');

app.use('/api', routes)
