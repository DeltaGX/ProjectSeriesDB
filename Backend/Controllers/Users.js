const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const passport = require('passport');
const { Router } = require('express');
const {createError} = require('../config/Error.js');

//model
const User = require('../models/User');

module.exports= {
updateUser: async function(req,res,next){
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { runValidators: true, context: 'query', new:'true' }
    );
    res.status(200).json(updatedUser);
  } catch (err) {
    next(err);
  }
},
// patchUsernote: async function(req,res,next){
//   try {
//     const updatedUser = await User.findByIdAndUpdate(
//       req.params.id,
//       {$push: req.body},
//       { runValidators: true, context: 'query' }
//     );
//     res.status(200).json(updatedUser);
//   } catch (err) {
//     next(err);
//   }
// },

getUser: async function(req,res,next){
  try {
    const user = await User.findById(req.params.id);
    res.status(200).json(user);
  } catch (err) {
    next(err);
  }
},

getUsernote: async function(req,res,next){
  try {
    const user = await User.findById(req.params.id);
    res.status(200).json(user.Usernote);
  } catch (err) {
    next(err);
  }
},

Login: async function(req, res, next){
  try {
    const user = await User.findOne({ username: req.body.username });
    if (!user) return next(createError(404, "User not found!"));

    const isPasswordCorrect = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!isPasswordCorrect)
      return next(createError(400, "Wrong Email or Password!"));

    const token = jwt.sign(
      { id: user._id, isAdmin: user.isAdmin },
      process.env.JWT
    );

    const { password, isAdmin, ...otherDetails } = user._doc;
    res
      .cookie("access_token", token, {
        httpOnly: true,
      })
      .status(200)
      .json({ details: { ...otherDetails }, isAdmin });
  } catch (err) {
    next(err);
  }
},

Register: async function(req, res, next){
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
    })    
         .catch(err => next(err));  
}},

// PostUserNote: async function(req,res,next){
//   try {
//     const user = await User.findByIdAndUpdate(req.params.id,
//       { $set: req.body },
//       )
//   } catch (err) {
//     next(err);
//   }
// },
}