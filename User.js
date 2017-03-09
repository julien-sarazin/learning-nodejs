const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/fb-db');

mongoose.models('User', {
    email: String,
    profile: Object
});


module.exports = User;