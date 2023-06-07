const {Postmodel} = require("../models/usermodel")
const Review = require("../models/review")


module.exports = {
    async reviewCreate(req,res,next) {
        let post = await Postmodel.findById(req.params.id);

        let review = await Review.create(req.body.review)

        post.reviews.push(review)
        post.save();

        res.redirect(`/posts/${post._id}`)
    },

  

    async reviewDelete(req,res,next){
        await Postmodel.findByIdAndUpdate(req.params.id, {
            $pull: {reviews: req.params.review_id}
        });
        await Review.findByIdAndRemove(req.params.review_id);
        res.redirect(`/posts/${req.params.id}`)
    }
}