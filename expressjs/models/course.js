const { Schema, model } = require('mongoose');

const courceSchema = new Schema({
    title: {
        type: String,
        required: true  // обязательное поле
    },
    price: {
        type: Number,
        required: true
    },
    img: String,
    // id добавляется автоматически 
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
});

courceSchema.method('toClient', function() {
    const course = this.toObject();

    course.id = course._id;
    delete course._id;

    return course;
})

module.exports = model('Course', courceSchema);