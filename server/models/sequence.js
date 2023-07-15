const mongoose = require('mongoose');

const sequenceSchema = mongoose.Schema({
    maxStudyId: { type: Number, required: true}
})

module.exports = mongoose.model('Sequences', sequenceSchema);