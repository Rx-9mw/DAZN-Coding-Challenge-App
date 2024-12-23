require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const userRoutes = require('./Routes/User_Routes');

// Connecting to the Mongodb database with mongoose.
mongoose
  .connect(process.env.DATABASE_URL, {
    dbName: process.env.DATABASE_NAME,
    user: process.env.USER,
    pass: process.env.PASSWORD
  })
  .then(() => {
    console.log('Database is connected...');
  });

// Parsing the incoming requests to JSON.
app.use(express.json());

// Routing all /users requests to the User_Routes
app.use('/users', userRoutes);

// Handling all other not existing routes.
app.all('*', (req, res) => {
  res.status(404).send('Not Found!');
})

// Listening for requests.
app.listen(process.env.APP_PORT, () => {
  console.log(`Server is running on port ${process.env.APP_PORT}...`)
});