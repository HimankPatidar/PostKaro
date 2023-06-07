const express = require('express');
const router = express.Router();
const passport = require('passport');
const multer = require('multer');
const cloudinary = require('cloudinary').v2;
// const catchAsync = require('../utils/CatchAsync');
const User = require('../models/users');

cloudinary.config({
    cloud_name:'dm0temaqd',
    api_key:'144128571589694',
    api_secret:'ad6apHCamecvKSVSG4QMzwU0ktQ'
  })
const storage = multer.diskStorage({});
const upload = multer({ storage });



router.get('/register', (req, res) => {
    res.render('users/register');
});
router.post('/register', upload.single('image'), async (req, res, next) => {
    try {
      const { email, username, password, about } = req.body;
      const user = new User({ email, username, about });
  
      // Check if a file was uploaded
      if (req.file) {
        const result = await cloudinary.uploader.upload(req.file.path); // Upload the image to Cloudinary
        user.image = [{ url: result.secure_url, public_id: result.public_id }]; // Save the image URL and public ID in the user object
      }
  
      const registeredUser = await User.register(user, password);
      req.login(registeredUser, err => {
        if (err) return next(err);
        res.redirect('/posts');
      });
    } catch (error) {
      res.send(error);
      res.redirect('register');
    }
  });
  

router.get("/login", (req,res)=>{
    res.render("users/login")
})

// router.post('/login', passport.authenticate('local', { failureRedirect: '/login', failureFlash: true }), function(req, res) {
//     res.redirect('/posts');
//   });
router.post('/login', passport.authenticate('local', { failureFlash: true, failureRedirect: '/login' }), (req, res) => {
    const redirectUrl = req.session.returnTo || '/posts';
    delete req.session.returnTo;
    res.redirect(redirectUrl);
})

router.get('/logout', (req, res, next) => {
    req.logout(function (err) {
        if (err) {
            return next(err);
        }
        res.redirect('/posts');
    });
}); 




module.exports = router;