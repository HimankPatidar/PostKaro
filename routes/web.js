const express = require('express');
const router = express.Router();
const CatchAsync = require("../utils/CatchAsync")
const {postController} = require("../controller/postController")
const {isLoggedIn, isAuthor} = require("../middleware")
const {Postmodel} = require("../models/usermodel")
const multer = require("multer")
const upload = multer({'dest': 'uploads/'})


 


router.get('/', postController.homepage)
router.get('/posts', isLoggedIn, postController.getpost)
router.get('/posts/new', isLoggedIn, postController.createpost)
router.post('/posts', upload.array('image',4), postController.newpost)

router.get('/posts/profile', isLoggedIn, postController.profilepage)
router.get('/posts/:id', isLoggedIn,postController.showpost)
router.post('/posts/new', postController.createpost)
router.get('/posts/search', isLoggedIn,  postController.searchPost)


router.get('/posts/:id/edit', isLoggedIn, isAuthor, postController.editpost);

router.put('/posts/:id',isLoggedIn, upload.array('image', 4), postController.updatepostById);

router.delete('/posts/:id',isLoggedIn, postController.deletepostById)

// router.post('/posts/:id/friend', isLoggedIn, postController.addFriend);

// router.delete('/posts/:id/friend', isLoggedIn, postController.removeFriend);

// router.get('/posts/:id', postController.commentid)
// router.post('/posts/:id/comments', validateReview, postController.commentpost)
// router.delete("/posts/:id/reviewsId", postController.deletecomment)

module.exports = router;
