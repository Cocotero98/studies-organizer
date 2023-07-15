const mongoose = require('mongoose');

const daySchema = mongoose.Schema({
    name: { type: String, required: true},
    studies: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Study' }],
})

module.exports = mongoose.model('Day', daySchema);