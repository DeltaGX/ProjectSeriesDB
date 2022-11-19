const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// const StatusSchema = new Schema({
//     PlantoWatch,
//     Watching,
//     Complete,
//     Onhold,
//     Null,
// })

const reviewSchema = new Schema({
    UserID: {
     type:String, 
     required:true
    },
    ContID: {
     type:String, 
     required:true
    },
    UserName: {
     type:String, 
     required:true
    },
    IsRecommend: {
     type:Boolean, 
     required:true
    },
    Review: {
     type:String
    },
    Reviewdate: {
     type:Date, 
     default:Date.now
    },
    }
)

const Review = mongoose.model('Review', reviewSchema)
module.exports = Review