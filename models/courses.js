const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            requried: true
        },
        image: {
            type: String,
            requried: true,

        },
        description: {
            type: String,
            requried: true
        }
    }
)

const courseModel = mongoose.model('Course', courseSchema);

module.exports = courseModel;