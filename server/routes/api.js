const express = require('express');
const router = express.Router();
const User = require('../models/user');
const jwt = require('jsonwebtoken')

const mongoose = require('mongoose');
const db = "mongodb://kunalganglani:asdfjkl123@ds113670.mlab.com:13670/hrbuddymdc";

mongoose.connect(db, function(err){
    if(err){
        console.error('Error! ' + err)
    } else {
      console.log('Connected to mongodb')      
    }
});

router.get('/', (req , res)=>{
    res.send('from api route');
});

router.post('/register', (req, res) => {
    let userData = req.body
    let user = new User(userData)
    user.save((err, registeredUser) => {
      if (err) {
        console.log(err)      
      } else {
        // send(registeredUser).
          res.sendStatus(200);
        // let payload = {subject: registeredUser._id}
        // let token = jwt.sign(payload, 'secretKey')
        // res.status(200).send({token})
      }
    })
  });

  router.post('/login', (req, res) => {
    let userData = req.body
    User.findOne({email: userData.email}, (err, user) => {
      if (err) {
        console.log(err)    
      } else {
        if (!user) {
          res.send('Invalid Email').status(401);
        } else 
        if ( user.password !== userData.password) {
          res.sendStatus(401).send('Incorrect Username or Password')
        } else {
            res.send(user).sendStatus(200);
        //   let payload = {subject: user._id}
        //   let token = jwt.sign(payload, 'secretKey')
        //   res.status(200).send({token})
        }
      }
    })
  })
  


module.exports = router;