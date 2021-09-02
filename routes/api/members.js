const express = require('express');
const router = express.Router();
const members = require('../../Members');
const uuid = require('uuid');


// Gets all members
router.get('/', (req, res) => {
    res.json(members);
})
// Get single member
router.get('/:id', (req, res, id) => {
    const found = members.some(member => member.id === parseInt(req.params.id));
    if (found) {
        res.json(members.filter(members => members.id === parseInt(req.params.id)));
    }else {
        res.status(400).json({ msg: `no member with id: ${req.params.id}`});
    }
}
);
// Create member

router.post('/', (req, res) => {
    const newMember = {
        id: uuid.v5(),
        name: req.body.name,
        email: req.body.email,
        status: 'active'
    }

    if(!newMember.name || !newMember.email) {
        res.status(400).json({ msg: 'Please include a name and email'});
    }

    members.push(newMember);
    res.json(members);
});



module.exports = router;