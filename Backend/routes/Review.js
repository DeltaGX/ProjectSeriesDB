const express= require("express");
const router = express.Router();
const {
  createReview,
  deleteReview,
  getReview,
  getReviews,
  updateReview,
} = require("../controllers/Review.js");
const {verifyUser}= require("../config/verifyToken.js");

router.post("/:contid/:id", verifyUser, createReview);
//UPDATE
router.put("/:contid/:id", verifyUser, updateReview);
//DELETE
router.delete("/:contid/:id", verifyUser, deleteReview);
//GET 
router.get("/:contid/:id", getReview);
//GET ALL CONT REVIEW
router.get("/:contid", getReviews);

module.exports = router