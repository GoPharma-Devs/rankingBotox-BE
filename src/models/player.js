const { Schema, model } = require('mongoose');

const playerSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    score: {
        type: Number,
        required: true
    }
});

module.exports = model('Player', playerSchema);
