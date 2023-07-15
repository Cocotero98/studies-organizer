const mongoose = require('mongoose');

const studySchema = mongoose.Schema({
    id: { type: String, required: true},
    name: { type: String, required: true},
    time: { type: String, required: true}
})

module.exports = mongoose.model('Study', studySchema);