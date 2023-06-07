const { Postmodel } = require("./models/usermodel");
const Review = require("./models/review")

module.exports.isLoggedIn = (req, res, next) => {
    if (!req.isAuthenticated()) {
        req.session.returnTo = req.originalUrl
        return res.redirect('/login');
    }
    next();

}

// module.exports.validateCampground = (req, res, next) => {
//     const { error } = campgroundSchema.validate(req.body);
//     if (error) {
//         const msg = error.details.map(el => el.message).join(',')
//         throw new ExpressError(msg, 400)
//     } else {
//         next();
//     }
// }

module.exports.isReviewAuthor = async(req,res,next)=> {
    let review = await Review.findById(req.params.review_id)
    if(review.author.equals(currentUser._id)){
        return next()
    }
    return res.redirect('/')
}

module.exports.isAuthor = async (req, res, next) => {
    const { id } = req.params;
    const post = await Postmodel.findById(id);
    if (!post.author.equals(req.user._id)) {
        return res.redirect(`/posts/${id}`);
    }
    next();
}


