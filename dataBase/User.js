const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    firstName: {type: String, trim: true, default: ''},
    lastName: {type: String, trim: true, default: ''},
    email: {type: String, trim: true, required: true, lowercase: true, unique: true},
    age: {type: Number},
    password: {type: String, min: 5, required: true}
}, {
    timestamps: true
});

module.exports = mongoose.model('User', UserSchema);