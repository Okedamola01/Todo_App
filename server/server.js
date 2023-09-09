require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const mongoose  = require('mongoose');
const connectDB = require('./config/dbConn');
const PORT = process.env.PORT || 2000;


//Connect to MongoDB
connectDB();

// Enable CORS for all routes
app.use(cors());

//testing
app.use(express.json({ extended: false }));
app.get("/", (req, res) =>
{
    res.send("<h1>Server is working!</h1>");
});

//Routes
app.use('/todo', require('./routes/todo'));

mongoose.connection.once('open', () =>
{
    console.log('Server connected to MongoDB!');
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});