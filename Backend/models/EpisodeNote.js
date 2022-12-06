const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const EpisodeSchema = new Schema({
    Episode: {
        type: Number,
        required: true,
       },
    Note: {
        type: String,
       },
    Episodescore:{
        type: Number,
        min:0,
        max:10,},
    isWatched:{
        type: Boolean,
        default: false,
       }
})

const ContDataSchema = new Schema ({
    Season: {
        type: Number,
        required: true,
    },
    // SeasonName:{
    //     type: String,
    //     required: true,
    // },
    EpisodeNote : [EpisodeSchema]
})

const EpisodeNoteSchema = new Schema({
    Userid: {
        type:String, 
        required:true
    },
    Contid: {
        type:String, 
        required:true
    },
    // ContName: {
    //     type:String,
    //     required:true
    // },
    SeasonNote:[ContDataSchema]
});

const EpisodeNote = mongoose.model('EpisodeNote', EpisodeNoteSchema)
module.exports = EpisodeNote;