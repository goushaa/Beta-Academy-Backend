const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            requried: true
        },
        email: {
            type: String,
            requried: true,

        },
        comment: {
            type: String,
            requried: true
        }
    }
)

const contactModel = mongoose.model('Contact', contactSchema);

module.exports = contactModel;