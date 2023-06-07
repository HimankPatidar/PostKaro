const mongoose = require("mongoose")
const {Review} = require("./review")
const Schema = mongoose.Schema


const postSchema = new Schema({
    title:String,
    image: [{url:String, public_id:String}],
    description: String,
    location: String,
    
    author:{
     type:Schema.Types.ObjectId,
     ref:'User'   
    },
    reviews:[ {  type: Schema.Types.ObjectId,  ref:'Review'  }  ]
    
})



const Postmodel = mongoose.model("userpost", postSchema)

module.exports = {Postmodel}