const Review = require("../models/review");
const Listing = require("../models/listing");

module.exports.index = (req, res) => {
  let { id } = req.params;
  res.redirect("/listings/" + id);
};

module.exports.createReview = async (req, res, next) => {
  let { id } = req.params;
  let listing = await Listing.findById(id);
  let newReview = new Review(req.body.review);
  newReview.author = res.locals.currUser._id;

  listing.reviews.push(newReview);

  await newReview.save();
  await listing.save();
  req.flash("success", "New review created");
  res.redirect("/listings/" + id);
};

module.exports.destroyReview = async (req, res) => {
  let { id, reviewId } = req.params;

  await Review.findByIdAndDelete(reviewId);
  await Listing.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });

  req.flash("success", "Review deleted successfully");
  res.redirect("/listings/" + id);
};
