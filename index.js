const express = require('express');
const mongoose = require('mongoose');
const app = express();
const cors = require('cors');
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());
app.listen(port, () => {
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
