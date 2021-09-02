const { response } = require('express');
const express = require('express');
const path = require('path');

const app = express();

// app.get('/', (require, response) => {
//     // response.send('<h1>Hello World</h1>');
//     response.sendFile(path.join(__dirname, 'public', 'index.html'));
// });


// SET STATIC FOLDER

app.use(express.static(path.join(__dirname, 'public')));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log('Server started on port:', PORT)); 