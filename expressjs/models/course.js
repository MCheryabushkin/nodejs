const { Schema, model } = require('mongoose');

const course = new Schema({
    title: {
        type: String,
        required: true  // обязательное поле
    },
    price: {
        type: Number,
        required: true
    },
    img: String
    // id добавляется автоматически 
});

module.exports = model('Course', course);