const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const OnlineContentSchema = new Schema({
    name:{
     type: String,
     required: true,
    },
    Synopsis:{
     type: String
    },
    Genre: {
     type: String,
     required: true,
    },
    Status:{
     type: String
    },
    Episode:{
     type: String
    },
    Aired:{
     type:Date
    },
    Source:{
     type: String
    },
    Studio:{
     type: String
    },
    seriesdbscore:{
     type: Number,
     min:0,
     max:10,
    },
    imdbscore:{
     type: Number
    },
    Rottenscore:{
     type: Number
    },
    Rank:{
     type: Number
    }
});

const OnlineCont = mongoose.model('OnlineCont', OnlineContentSchema)
module.exports = OnlineCont