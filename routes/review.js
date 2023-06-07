const express = require('express');
const router = express.Router({ mergeParams: true });
// const ExpressError = require("../middleware")
// const {isReviewAuthor} = require("../middleware")
const {reviewCreate, reviewDelete} = require("../controller/review")


router.post('/', (reviewCreate))


router.delete('/:review_id',  reviewDelete)

module.exports = router;