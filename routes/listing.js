const express = require("express");
const router = express.Router();
const wrapAsync = require("../untility/wrapAsync.js");
const Listing = require("../models/listing.js");
const { isLoggedin, isOwner, validateListing } = require("../middleware.js");
const listingController = require("../controllers/listing.js");
const multer  = require('multer');
const {storage} = require("../cloudConfig.js");
const upload = multer({ storage });

//-INDEX -CREATE
router.route("/")
.get(wrapAsync(listingController.index))   //Index Route
.post(isLoggedin,upload.single('listing[image]'), validateListing, wrapAsync(listingController.createListing));   //Create Route
// .post(upload.single("listing[image]"), (res,req) => {
//     res.send(req.file);
// });

//New Route
router.get("/new", isLoggedin, listingController.renderNewFrom);

//-SHOW -UPDATE -DELETE
router.route("/:id")
.get(wrapAsync(listingController.showListing))  //Show Route
.put(isLoggedin, isOwner, validateListing, wrapAsync(listingController.updateListing))   //Update Route
.delete(isLoggedin, isOwner, wrapAsync(listingController.destroyListing));    //Delete Route

//Edit Route
router.get("/:id/edit", isLoggedin, isOwner, wrapAsync(listingController.renderEditFrom));


module.exports = router;