const mongoose = require('mongoose');

// email needs to be unique
// name min 5
const memberSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: String,
    email: String,
    status: String
});

module.exports = mongoose.model('Member', memberSchema);