const mongoose  = require('mongoose');

const employeeSchema = mongoose.Schema({
    first_name: {
        type: String,
        required: true,
    },
    // last_name: {
    //     type: String,
    //     required: true,
    // },
    // gender: {
    //     type: String,
    //     enum: ["male", "female"],
    //     default: 'male'
    // },
    // email: {
    //     type: String,
    //     trim: true,
    //     lowercase: true,
    //     unique: true
    // },
    // password: {
    //     type: String,
    //     required: true,
    // }
});

module.exports = mongoose.model('Employee', employeeSchema);