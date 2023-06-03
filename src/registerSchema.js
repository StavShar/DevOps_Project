const mongoose = require('mongoose');

const RegisterSchema = new mongoose.Schema({
    name: {
        type: 'String',
        unique: true,
        pattern: '^[A-Z][a-z]*[][A-Z][a-z]*$',
        required: true,
    },
    grade1: {
        type: 'Number',
        minimum: 0,
        maximum: 100,
        required: true,
    },
    grade2: {
        type: 'Number',
        minimum: 0,
        maximum: 100,
        required: true,
    },
    grade3: {
        type: 'Number',
        minimum: 0,
        maximum: 100,
        required: true,
    },
});

module.exports = mongoose.model('register', RegisterSchema);
