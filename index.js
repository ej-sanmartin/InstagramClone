require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const MongoClient = require('mongodb').MongoClient;

const PORT = process.env.PORT || 5000;
const MONGO_URI = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_CLUSTERNAME}-edsbd.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;

// Bring in mongoose models
require('./models/user');

mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
mongoose.connection.on('connected', () => console.log("Conected to MongoDB"));
mongoose.connection.on('error', (err) => console.log("Error conecting with MongoDB: ", err));

const app = express();

app.listen(PORT, () => console.log(`Server is running on ${PORT}`));
