const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const JobportelSchema = new Schema({
    company: String,
    position: String,
    salary: Number,
    vacancy: Number,
    reruirement: String,

})

module.exports = mongoose.model('Job', JobportelSchema);