const {OnlineCont,Review,User} = require("../models/User.js");

module.exports ={
createReview: async function(req, res, next){
    const UserId = req.params.id;
    const ContId = req.params.contid;
    const newReview = new Review(req.body);
    try {
    newReview.UserID = UserId;
    newReview.ContID = ContId;
    const savedReview = await newReview.save();
    res.status(200).json(savedReview);
  } catch (err) {s
    next(err);
  }
},
updateReview: async function(req, res, next){
    try {
      const updatedReview = await Review.findByIdAndUpdate(
        req.params.id,
        { $set: req.body },
        { new: true }
      );
      res.status(200).json(updatedReview);
  } catch (err) {
    next(err);
  }
},
deleteReview: async function(req, res, next){
  try {
    await Review.findByIdAndDelete(req.params.id);
    res.status(200).json("Review has been deleted.");
  } catch (err) {
    next(err);
  }
},
getReview: async function (req, res, next){
  try {
    const Review = await Review.findById(req.params.id);
    res.status(200).json(Review);
  } catch (err) {
    next(err);
  }
},
getReviews: async function(req, res, next){
  const ContId = req.params.Contid;
  try {
    const Reviews = await Review.find({Onlinecont:ContId});
    res.status(200).json(Reviews);
  } catch (err) {
    next(err);
  }
}
}