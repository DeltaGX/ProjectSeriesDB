let api_key='cc9998af9f9a12b4c78dcb7f12951729';
let img_url='https://image.tmdb.org/t/p/w500/kqjL17yufvn9OVLyXYpvtyrFfak.jpg';
let genres_list_http='https://api.themoviedb.org/3/genre/movie/list?';
let movie_genres_http = "https://api.themoviedb.org/3/discover/movie?";
let movie_detail_http = "https://api.themoviedb.org/3/movie";

const express = require("express");
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');
const flash = require('express-flash');
const session = require('express-session');
const methodOverride = require('method-override')
const cors = require("cors");
const cookieParser = require("cookie-parser");
const router = express.Router();
require('dotenv').config();

const app = express();
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use(cors({credentials: true, origin: true}));
app.use(flash());
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false
}))
app.use(passport.initialize());
app.use(passport.session());
app.use(cookieParser());
app.use(methodOverride('_method'));
//* done connect

//connect to mongodb
mongoose.connect(process.env.DB_URI, {useNewUrlParser:true, useUnifiedTopology:true})
.then( () => {
    console.log('DB Connected!');
})
.catch( (err) => {
    console.log(err);
});
//Route
app.use('/users', require('./routes/Users.js'));
app.use('/review', require('./routes/Review.js'));

//error callback
app.use((err, req, res, next) => {
  const errorStatus = err.status || 500;
  const errorMessage = err.message || "Something went wrong!";
  return res.status(errorStatus).json({
    success: false,
    status: errorStatus,
    message: errorMessage,
    stack: err.stack,
  });
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});





















