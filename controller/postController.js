const { response } = require("express")
const {Postmodel} = require("../models/usermodel")
const {PostSchema} = require('../schemas')
const { User } = require("../models/users")
const cloudinary = require("cloudinary");
cloudinary.config({
  cloud_name:'dm0temaqd',
  api_key:'144128571589694',
  api_secret:'ad6apHCamecvKSVSG4QMzwU0ktQ'
})

class postController{
    static homepage = (req,res) => {
        res.render("home")
    }
    

    static getpost = async(req,res) =>{
        try {
            
            const result = await Postmodel.find()
            // console.log(result)
            res.render("showpost", {result})
        } catch (error) {
          console.log(error)  
        }
       
    }
    static createpost = (req,res) =>{
        res.render("new")
    }
   
 static newpost = async (req, res) => {
  try {
    const files = req.files;

    const images = []; 

    for (const file of files) {
      const result = await cloudinary.v2.uploader.upload(file.path); 
      images.push({ url: result.secure_url, public_id: result.public_id });
    }

    const post = new Postmodel({
      title: req.body.post.title,
      image: images,
      description: req.body.post.description,
      location: req.body.post.location,
      author: req.user._id
    });
    

    await post.save();

    res.redirect(`/posts/${post._id}`);
  } catch (error) {
    console.log(error);
  }
};


    static showpost = async(req,res)=>{
  try {
    const postId = req.params.id;

    if (postId === 'search') {

      const username = req.query.username || '';
      const posts = await Postmodel.find({
        username: { $regex: '.*' + username + '.*', $options: 'i' }
      });
      return res.render('search', { posts });
    }

     const post = await Postmodel.findById(req.params.id).
populate({
   path: 'reviews',
   options: {sort: {"_id":-1}}
})


    //  console.log(post)
   
     res.render("show", {post})
  } catch (error) {
            console.log(error)
        }
       
    }
  
    static editpost = async (req, res) => {
      try {
        const post = await Postmodel.findById(req.params.id);
        res.render("edit", { post });
      } catch (error) {
        console.log(error);
      }
    };
    
  
    static updatepostById = async (req, res) => {
      const { id } = req.params;
      const post = await Postmodel.findById(id);
    
      if (!post.author.equals(req.user._id)) {
        console.log('You do not have permission to do that');
        return res.redirect(`/posts/${post._id}`);
      }
    
      try {
        let images = [];
        if (req.files && req.files.length > 0) {
        
          const files = req.files; 
    
          for (const file of files) {
            const result = await cloudinary.v2.uploader.upload(file.path);

            images.push({ url: result.secure_url, public_id: result.public_id });
          }
        }
    
        post.title = req.body.post.title;
        post.location = req.body.post.location;
        post.description = req.body.post.description;

        if(image.length > 0){
          post.image = images
        }
        await post.save();
    
        res.redirect(`/posts/${post._id}`);
      } catch (error) {
        console.log(error);
      }
    };
    
    
    static deletepostById = async(req,res) =>{
        const {id} = req.params;
        await Postmodel.findByIdAndDelete(id);
       
        res.redirect('/posts')
    }

    static profilepage = async(req,res,next) => {
        const post = await Postmodel.find().where('author').equals(req.user._id).limit(10).exec();
        res.render("profilr", {post} )
    }

    static searchPost =  async (req, res) => {
  try {
    let username = '';

    if (req.query.username) {
      username = req.query.username;
    }

    console.log('Username:', username); // Add this line to log the value of username


    const posts = await Postmodel.find({
      username: { $regex: '.*' + username + '.*', $options: 'i' }
    });


      // Fetch the user profile based on the search query
      const user = await User.findOne({
        username: { $regex: new RegExp(username, 'i') }
      });

      console.log('User:', user); // Log the value of user


      res.render('search', { posts: posts, user: user });


  } catch (error) {
    res.status(500).json({ error: 'An error occurred while searching for posts.' });
  }
// }
// static addFriend = async (req, res) => {
//   try {
//     const { id } = req.params;

//     // Find the current user and the user to be added as a friend
//     const currentUser = req.user;
//     const friendUser = await User.findById(id);

//     // Check if the friendUser exists
//     if (!friendUser) {
//       return res.status(404).json({ error: 'User not found' });
//     }

//     // Add the friendUser to the currentUser's friends list
//     currentUser.friends.push(friendUser);
//     await currentUser.save();

//     res.redirect(`/posts/${friendUser._id}`);
//   } catch (error) {
//     console.log(error);
//   }
// };

// static removeFriend = async (req, res) => {
//   try {
//     const { id } = req.params;

//     // Find the current user and the user to be removed from friends
//     const currentUser = req.user;
//     const friendUser = await User.findById(id);

//     // Check if the friendUser exists
//     if (!friendUser) {
//       return res.status(404).json({ error: 'User not found' });
//     }

//     // Remove the friendUser from the currentUser's friends list
//     currentUser.friends.pull(friendUser);
//     await currentUser.save();

//     res.redirect(`/posts/${friendUser._id}`);
//   } catch (error) {
//     console.log(error);
//   }
// };


}
}
module.exports = {postController}