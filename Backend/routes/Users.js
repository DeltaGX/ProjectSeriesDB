const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const passport = require('passport');
const User = require('../models/User.js');
const {createError} = require('../config/Error.js');
const jwt = require("jsonwebtoken");
const {updateUser,getUser,patchUsernote,getUsernote} = require("../controllers/users.js");
const {verifyUser}= require("../config/verifyToken.js");

// register
router.post('/register', async (req, res, next) => {
  try{
    const newUser = new User({
      UserName:req.body.UserName,
      Email:req.body.Email,
      password:req.body.password,
    })
    if (newUser.password.length < 6) {
          next(createError(400,"Password must be at least 6 characters"));
    } 
    else if (!newUser.UserName || !newUser.Email || !newUser.password ) {
          next(createError(400,"Please Enter All Field"));
    } else {
      User.findOne({UserName: newUser.UserName}).then (user=>{
        if (user) {
          next(createError(400,"Username already exists"));
        } else {
          User.findOne({ Email: newUser.Email }).then(user => {
              if (user) {
                  next(createError(400,"Email already exists"));
              } else {
                  const salt = bcrypt.genSaltSync(10);
                  const hashPassword = bcrypt.hashSync(newUser.password, salt);
                  newUser.password = hashPassword
                  newUser.save();
                  res.status(200).send("User has been created.");
                  }   
          })
        }
      })}}    
      // .catch(err => next(err));  
      catch (err){
        next(err);
      }
})

// Login
router.post("/login" ,async(req, res, next) => {
  try {
    const user = await User.findOne({ Email: req.body.Email });
    if (!user) {
      return next(createError(404, "Email not found!"));
    }
    const isPasswordCorrect = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!isPasswordCorrect){
      return next(createError(400, "Wrong password or username!"));
    }
    const token = jwt.sign({ id: user._id},process.env.JWT);
    const { password, ...otherDetails } = user._doc;
    res
      .cookie("access_token", token, {
        httpOnly: true,
      })
      .status(200)
      .json({ details: { ...otherDetails }});
  } catch (err) {
    next(err);
  }
})

// router.get("/checkauthentication", verifyToken, (req,res,next)=>{
//   res.send("hello user, you are logged in")
// })
// router.get("/checkuser/:id", verifyUser, (req,res,next)=>{
//   res.send("hello user, you are logged in and you can delete your account")
// })

//UPDATE USER AND NOTE
router.put("/:id", verifyUser, updateUser);
//GET
router.get("/:id", verifyUser, getUser);
//PATCH 
// router.patch("/:id/", verifyUser, patchUsernote); obsolete
//verifyUser
router.get("/verify/:id/", verifyUser);
//getusernote
router.get("/:id/usernote", verifyUser, getUsernote);


module.exports = router;










// //passport login
// router.post('/login', checkNotAuthenticated, passport.authenticate('local', {
//     successRedirect: '/',
//     failureRedirect: '/login',
//     failureFlash: true
//   }))
