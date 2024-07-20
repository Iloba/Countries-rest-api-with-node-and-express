const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes/api.js');
const databaseUrl = 'mongodb://localhost/countries';
const errorHandler = require('./middleware/error');

//initialize app
const app = express();


app.use(express.json());
app.use('/api/v5', routes);

app.use(errorHandler);
//connect to database
mongoose.connect(databaseUrl, { useNewUrlParser: true });

//get connection object
const conn = mongoose.connection;

//check if connection was successful
conn.on('open', () => console.log("Database is ready to connect and Connected Successfully"));











//open server port
app.listen(8080, () => {
    console.log("Server Started");
});


// Use the environment variable PORT if defined, otherwise default to 8080
// const port = process.env.PORT || 8080;

// // Basic route
// app.get('/', async (req, res) => {
//     res.send('Hello World!');
// });

// // Start the server
// app.listen(port, () => {
//     console.log(`Server is listening on port ${port}`);
// });

// button.addEventListener('click', =>{ console.log("You clicked me")}