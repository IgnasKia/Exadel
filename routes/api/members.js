const express = require('express');
const router = express.Router();
const members = require('../../Members');
const uuid = require('uuid');
const Member = require('../api/models/members');
const mongoose = require('mongoose');

router.get('/', async (req, res) => {
	const members = await Member.find({});
	res.json(members);
});

// Get single member
router.get('/:id', (req, res, id) => {
    const memberId = req.params.id;
    Member.findById(memberId)
    .exec()
    .then(doc => {
      console.log("From database", doc);
      if (doc) {
        res.status(200).json(doc);
      } else {
        res
          .status(404)
          .json({ message: "No valid entry found for provided ID" });
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: err });
    });
});

// Create Member
router.post('/', (req, res) => {

    const newMember = new Member({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        email: req.body.email,
        status: 'active'
    });

    newMember.save().then(result => {
        console.log(result);
    })
    .catch(err => console.log(err));

    if (!newMember.name || !newMember.email) {
      return res.status(400).json({ msg: 'Please include a name and email' });
    }
  
    // members.push(newMember);
    res.json(members);
    // res.redirect('/');
  });

// Update member
router.put('/:id', (req, res, id) => {
    const found = members.some(member => member.id === parseInt(req.params.id));
    if (found) {
        const updMember = req.body;
        members.forEach(member => {
            if(member.id === parseInt(req.params.id)) {
                member.name = updMember.name ? updMember.name : member.name;
                member.email = updMember.email ? updMember.email : member.email;

                res.json({ msg: 'Member updated', member});
            }
        });
    }else {
        res.status(400).json({ msg: `no member with id: ${req.params.id}`});
    }
}
);

// Delete member
router.delete('/:id', (req, res, id) => {
    const found = members.some(member => member.id === parseInt(req.params.id));
    if (found) {
        res.json( { msg: 'Member deleted', members: members.filter(members => members.id !== parseInt(req.params.id))});
    }else {
        res.status(400).json({ msg: `no member with id: ${req.params.id}`});
    }
}
);


module.exports = router;