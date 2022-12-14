const mongoose = require('mongoose');
const Schema = mongoose.Schema;

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
    Note: {
        type:String
    },
    Status:{
        type:String, enum: ['PlantoWatch','Watching','Complete','Onhold','Stopped']
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
    },})

const Usernote = mongoose.model('Usernote', UserNoteSchema)

module.exports = User;