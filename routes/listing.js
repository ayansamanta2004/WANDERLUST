const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsyc.js");
const Listing = require("../models/listing.js");
const { isLoggedIn, isOwner, validateListing } = require("../middleware.js");
const listiongController = require("../controllers/listings.js");

// const multer = require("multer");
// const { storage } = require("../cloudConfig.js");
// const upload = multer({ storage });
// const upload = multer({
//     storage,
//     limits: { fileSize: 5 * 1024 * 1024 } // 5MB limit
// });


router
    .route("/")
    // Index Route
    .get(wrapAsync(listiongController.index))
    // Create Route
    .post(isLoggedIn, validateListing, wrapAsync(listiongController.createListing));
    // .post(upload.single('listing[image]'), (req, res) => {
    //     res.send(req.file);
    //     // console.log(req.file);
    //     // res.send("Uploaded");
    // });


// New Route
router.get("/new", isLoggedIn, listiongController.renderNewForm);


router
    .route("/:id")
    // Show Route
    .get(wrapAsync(listiongController.showListings))
    // Update Route
    .put(isLoggedIn, isOwner, validateListing, wrapAsync(listiongController.updateListing))
    // Delete Route
    .delete(isLoggedIn, isOwner, wrapAsync(listiongController.destroyListing));


// Index Route
// router.get("/", wrapAsync(listiongController.index));


// New Route
// router.get("/new", isLoggedIn, listiongController.renderNewForm);
// Create Route
// router.post("/", isLoggedIn, validateListing, wrapAsync(listiongController.createListing));


// Show Route
// router.get("/:id", wrapAsync(listiongController.showListings));


// Edit Route
router.get("/:id/edit", isLoggedIn, isOwner, wrapAsync(listiongController.renderEditForm));
// Update Route
// router.put("/:id", isLoggedIn, isOwner, validateListing, wrapAsync(listiongController.updateListing));


// Delete Route
// router.delete("/:id", isLoggedIn, isOwner, wrapAsync(listiongController.destroyListing));

module.exports = router;