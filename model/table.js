const mongoose = require('mongoose');
const {ObjectId} = mongoose.Schema;

const tableSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    address: {
        type: String,
    },
    pincode: {
        type: Number,
    },
    city: {
        type: String,
    },
    country: {
        type: String,
    },
    postedBy:{type:ObjectId,ref:'User'},
}, {timestamps: true});

module.exports = mongoose.model('Table', tableSchema);