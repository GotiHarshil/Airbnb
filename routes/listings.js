const express = require("express");
const router = express.Router({ mergeParams: true });
const wrapAsync = require("../utils/wrapAsync.js");
// const ExpressError = require("../utils/ExpressError.js");
const Listing = require("../models/listing.js");
// const { listingSchema } = require("../schema.js");
const User = require("../models/user.js");
const passport = require("passport");
const { isLoggedIn, isOwner, validateListing } = require("../middleware.js");
const multer = require("multer");
const { storage } = require("../cloudConfig.js");
const upload = multer({ storage });

const listingController = require("../controllers/listings.js");

router
  .route("/")
  //Index route
  .get(wrapAsync(listingController.index))
  //Create route
  .post(
    isLoggedIn,
    upload.single("listing[image]"),
    validateListing,
    wrapAsync(listingController.createListing)
  );

router
  .route("/new")
  //New Route
  .get(isLoggedIn, listingController.renderNewForm);

router
  .route("/:id")
  // Show Route
  .get(wrapAsync(listingController.showListing))
  //update Route
  .put(
    isLoggedIn,
    isOwner,
    upload.single("listing[image]"),
    validateListing,
    wrapAsync(listingController.updateListing)
  )
  // Delete Route
  .delete(isLoggedIn, isOwner, wrapAsync(listingController.deleteListing));

router
  .route("/:id/edit")
  //Edit Route
  .get(isLoggedIn, isOwner, wrapAsync(listingController.renderEditForm));

module.exports = router;
