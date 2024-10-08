const express = require("express");
const router = express.Router({mergeParams: true});
const wrapAsync = require("../utils/wrapAsync.js");
// const ExpressError = require("../utils/ExpressError.js");
const Review = require("../models/review.js");
// const { reviewSchema } = require("../schema.js")
const Listing = require("../models/listing.js");
const {validateReview, isLoggedIn, isReviewAuthor} = require("../middleware.js");

const reviewController = require("../controllers/reviews.js");


router.route("/")
      //All review
      .get(reviewController.index)
      //Create Route
      .post(isLoggedIn, validateReview,  wrapAsync(reviewController.createReview));

router.route("/:reviewId")
      // Delete Route
      .delete(isLoggedIn, isReviewAuthor , wrapAsync(reviewController.destroyReview));

module.exports = router;