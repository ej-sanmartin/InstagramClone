require('dotenv').config();
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = mongoose.model("User");
const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const requireLogin = require('../middleware/requireLogin');

const nodemailer = require('nodemailer');
const sendgridTransport = require('nodemailer-sendgrid-transport');

const transporter = nodemailer.createTransport(sendgridTransport({
  auth: {
    api_key: process.env.SENDGRID_API_KEY
  }
}));

router.get('/protected', requireLogin, (req, res) => {
  res.send("Hola");
});

router.post('/signup', (req,res) => {
  const { name,email,password, pic } = req.body;
  if(!email || !password || !name){
     return res.status(422).json({ error: "Please add all the fields" });
  }

  User.findOne({email:email})
  .then((savedUser)=>{
      if(savedUser){
        return res.status(422).json({ error: "user already exists with that email" });
      }

      bcrypt.hash(password, 12)
      .then(hashedPassword => {
        const user = new User({
          email,
          password: hashedPassword,
          name,
          pic
        });

        user.save()
        .then(user => {
          transporter.sendMail({
            to: user.email,
            from: "edgar.sanmartinjr@gmail.com",
            subject: "Sign Up Confirmation",
            html: "<h1>Welcome to Picturesharer!</h1>"
          })
          .then(() => { console.log("Message sent") })
          .catch((error) => {
            console.log(error);
          })
          res.json({ message:"saved successfully" });
        })
        .catch(err => {
          console.log(err);
        })
      })
    })
  .catch(err => {
    console.log(err);
  })
});

router.post('/signin', (req, res) => {
  const { email, password } = req.body;
  if(!email || !password){
    return res.status(422).json({ error: "Please add an email or password" });
  }

  User.findOne({ email: email })
  .then(savedUser =>{
    if(!savedUser){
      return res.status(422).json({ error: "Invalid Credentials" });
    }

    bcrypt.compare(password, savedUser.password)
    .then(doMatch => {
      if(doMatch){
        // res.json({ message: "Successfully signed in!" });
        const token = jwt.sign({ _id: savedUser._id }, process.env.JWT_SECRET);
        const { _id, name, email, followers, following, pic } = savedUser;
        res.json({ token, user: { _id, name, email, followers, following, pic } });
      } else {
        return res.status(422).json({ error: "Invalid Credentials" });
      }
    })
    .catch(err => {
      console.log(err);
    })
  })
});

router.post('/reset-password', (req, res) => {
  crypto.randomBytes(32, (err, buffer) => {
    if(err){
      console.log(err);
    }

    const token = buffer.toString("hex");
    User.findOne({ email: req.body.email })
    .then(user => {
      if(!user){
        return res.status(422).json({ error: "User does not exist with that email." })
      }
      user.resetToken = token;
      user.expireToken = Date.now() + 3600000;
      user.save()
      .then(result => {
        transporter.sendMail({
          to:user.email,
          from: "edgar.sanmartinjr@gmail.com",
          subject: "Password Reset",
          html: `
            <p>You requested for a password reset.</p>
            <h5>Click on this <a href="${process.env.WEBSITE_URL}/reset/${token}">link</a> to reset your password.</h5>
          `
        })
        .then(() => { console.log("Message sent") })
        .catch((error) => {
          console.log(error);
        })
        res.json({ message: "Check your email." })
      })
    })
  })
});

router.post('/new-password', (req, res) => {
  const newPassword = req.body.password;
  const sentToken = req.body.token;
  User.findOne({ resetToken: sentToken, expireToken: { $get: Date.now() } })
  .then(user => {
    if(!user){
      return res.status(422).json({ error: "Try again. Token expired" });
    }
    bcrypt.hash(newPassword, 12)
    .then(hashedPassword => {
      user.password = hashedPassword,
      user.resetToken = undefined,
      user.expireToken = undefined,
      user.save()
      .then((saveduser) => {
        res.json({ message: "Password successfully updated!" });
      })
    })
  })
  .catch(err => {
    console.log(err);
  })
})

module.exports = router;
