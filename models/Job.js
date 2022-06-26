const mongoose = require('mongoose');

const JobSchema = new mongoose.Schema({
    company:{
        type: String,
        required: [true, 'Please Provide Company name'],
        maxLength: 50
    },
    position:{
        type: String,
        required: [true, 'Please Provide Position'],
        maxLength: 200
    },
    status: {
        type: String,
        enum: ['interview', 'declined', 'pending'],
        default: 'pending'
    },
    createdBy:{
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: [true, 'Please provide User']
    }
}, {timestamps: true})

module.exports = mongoose.model('Jobs', JobSchema)