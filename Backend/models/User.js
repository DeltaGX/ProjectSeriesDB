const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// const GenreSchema = new Schema({
//     id:{
//         type:Number
//     },
//     name:{
//         type:String,
//         require:true
//     }
// })

const UserNoteSchema = new Schema({
    Contid:{
        type:Number,
        required:true,
        unique:true,
    },
    ContType:{
        type:String,
        enum: ['movie','tv']
    },
    ContName:{
        type:String,
    },
    ContPoster:{
        type:String,
    },
    ContGenre:{
        type: Array,
    },
    Note: {
        type:String
    },
    Status:{
        type:String, enum: ['PlantoWatch','Watching','Complete','Onhold','Stopped','']
    },
    Seasonseen:{
        type:Number,
    },
    EPseen:{
        type:Number,
    },
    UserScore:{
        type:Number,
        min:0,
        max:10,
    },
    isFavourite:{
        type:Boolean,
        default:false
    },
    
    
    
})
const userSchema = new Schema({
    // _id: Objectid
    UserName: {
     type:String, 
     required:true, 
     unique:true
    },
    password: {
     type:String, 
     required:true
    },
    Email: {
     type:String, 
     required:true, 
     unique:true
    },
    Usernote: [UserNoteSchema],
    entryDate: {
     type:Date, default:Date.now
    }
});

const User = mongoose.model('User', userSchema)

module.exports = User;

    // Gender: {
    //  type:String, 
    //  required:true
    // },
    // DateOfBirth:{
    //  type:Date, 
    //  required:true
    // },