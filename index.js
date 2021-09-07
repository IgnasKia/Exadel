const { response } = require('express');
const express = require('express');
const path = require('path');
const logger = require('./middleware/logger');
const exphbs = require('express-handlebars');
const app = express();
const mongoose = require('mongoose');
const Member = require('./routes/api/models/members');
const axios = require('axios');
require('dotenv/config');


// handle this!!!!!!
mongoose.connect(process.env.DB_CONNECTION);
//Init middleware
app.use(logger);

// Handlebars Middleware
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

// Body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Homepage Route
app.get('/', (req, res) => {
    axios.get('http://localhost:5000/api/members')
    .then(function(response){
        res.render('index',{ members : response.data })
    })
    .catch(err =>{
        res.send(err);
    })
});

// SET STATIC FOLDER

app.use(express.static(path.join(__dirname, 'public')));
// Members API routes
app.use('/api/members', require('./routes/api/members'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log('Server started on port:', PORT )); 