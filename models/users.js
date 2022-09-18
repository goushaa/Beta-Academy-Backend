const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            requried: true
        },
        password: {
            type: String,
            requried: true,

        }
    }
)

const userModel = mongoose.model('User', userSchema);

module.exports = userModel;