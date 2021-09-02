const { response } = require('express');
const express = require('express');
const path = require('path');
const members = require('./Members');
const logger = require('./middleware/logger');
const app = express();


//Init middleware
app.use(logger);


// app.get('/', (require, response) => {
//     // response.send('<h1>Hello World</h1>');
//     response.sendFile(path.join(__dirname, 'public', 'index.html'));
// });

// Gets all members
app.get('/api/members', (req, res) => {
    res.json(members);
})
// Get single member
app.get('/api/members/:id', (req, res, id) => {
    const found = members.some(member => member.id === parseInt(req.params.id));
    if (found) {
        res.json(members.filter(members => members.id === parseInt(req.params.id)));
    }else {
        res.status(400).json({ msg: `no member with id: ${req.params.id}`});
    }
}
);
// SET STATIC FOLDER

app.use(express.static(path.join(__dirname, 'public')));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log('Server started on port:', PORT)); 