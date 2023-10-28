const {Schema, model} = require('mongoose')

const SilabasSchema  = new Schema ({
    letter_minuscula: {
        type: String,
        required: true
    },
    letter_mayuscula: {
        type: String,
        required: true
    },
    image_link1: {
        type: String,
        require: true
    },
    image_link2: {
        type: String,
        require: true
    },
    image_link3: {
        type: String,
        require: true
    },
    audio_link1: {
        type: String,
        require: true
    },
    audio_link2: {
        type: String,
        require: true
    },
    audio_link3: {
        type: String,
        require: true
    },
    num: {
        type: Number,
        require: true
    }
});

module.exports = model('Silaba', SilabasSchema);