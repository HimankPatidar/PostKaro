const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ReviewSchema = new Schema({
    body:String,
    rating:Number,
    author:{
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    // text:String,
    // timestamp:{ type: Date, default: Date.now }
});

module.exports = mongoose.model("Review", ReviewSchema);