const express = require('express');
const router = express.Router();
const uuid = require('uuid');
const Member = require('../api/models/members');
const mongoose = require('mongoose');
const Joi = require('@hapi/joi');
const { authSchema } = require('../../helpers/validator');

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

    res.redirect('/');
  });

  // Get member data
router.get('/edit/:id', (req, res, next) => {
  Member.findOneAndUpdate({ _id: req.params.id }, req.body, {new: true}, (err, docs) => {
    if(err){
      console.log("Can't edit");
    }else {
      res.render("edit", {
        member : docs
      });
    }
  }).lean();
});

// Edit post
router.post('/edit/:id', (req, res, next) => {
  Member.findByIdAndUpdate({ _id: req.params.id }, req.body, (err, docs) => {
    if(err){
      console.log("Can't edit");
      next(err);
    }else {
      res.redirect('/');
    }
  });
});

// Delete post
router.get('/delete/:id', (req, res, next) => {
  Member.findByIdAndDelete({_id: req.params.id}, (err, docs) => {
    if(err){
      console.log("Something went wrong");
      next(err);
    }else {
      console.log("Deleted");
      res.redirect('/');
    }
  })
});


module.exports = router;