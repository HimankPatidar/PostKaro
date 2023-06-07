// const mongoose = require('mongoose');
// const passportLocalMongoose = require('passport-local-mongoose');

// const Schema = mongoose.Schema;

// const UserSchema = new Schema({
//     username: {
//         type: String,
//         unique: true
//     },
//     email:{
//         type:String,
//         required:true,
//         unique:true
//     },
//     image:String,
//     friends: [
//         {
//           type: Schema.Types.ObjectId,
//           ref: 'User'
//         }
//       ]
// });

// UserSchema.plugin(passportLocalMongoose)

// module.exports = mongoose.model("User", UserSchema)

const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: {
    type: String,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  image: [{url:String, public_id:String}],// Add the image field
  about: String, // Add the 'about' field for user description

  friends: [
    {
      type: Schema.Types.ObjectId,
      ref: 'User'
    }
  ]
});

UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', UserSchema);
