const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
    lead:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Lead',
        required: true
    },

    name:{
        type: String,
        required: true
    },

    email:{
        type: String,
        required: true
    },

    phone:{
        type: String,
        required: true
    },

   position:{
    type: String,
    required: true
   },
   notes:{
    type: String,
   },
   createdAt:{type: Date, default: Date.now},

});

module.exports = mongoose.model('Contact',contactSchema);