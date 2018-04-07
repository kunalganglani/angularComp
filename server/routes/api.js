const express = require('express');
const router = express.Router();
const User = require('../models/user');
const jwt = require('jsonwebtoken')

const mongoose = require('mongoose');
const db = "mongodb://kunalganglani:asdfjkl123@ds113670.mlab.com:13670/hrbuddymdc";
const options = {
  reconnectTries: Number.MAX_VALUE,
  reconnectInterval: 500
};
mongoose.connect(db, options, function (err) {
  if (err) {
    console.error('Error! ' + err)
  } else {
    console.log('Connected to mongodb')
  }
});

function verifyToken(req, res, next) {
  if (!req.headers.authorization) {
    return res.status(401).send('Unauthorized request')
  }
  let token = req.headers.authorization.split(' ')[1]
  if (token === 'null') {
    return res.status(401).send('Unauthorized request')
  }
  let payload = jwt.verify(token, 'secretKey')
  if (!payload) {
    return res.status(401).send('Unauthorized request')
  }
  req.userId = payload.subject
  next()
}
router.get('/members', verifyToken, (req, res) => {
  let specialEvents = [
    {
      "_id": "1",
      "name": "Auto Expo Special",
      "description": "lorem ipsum",
      "date": "2012-04-23T18:25:43.511Z"
    },
    {
      "_id": "2",
      "name": "Auto Expo Special",
      "description": "lorem ipsum",
      "date": "2012-04-23T18:25:43.511Z"
    },
    {
      "_id": "3",
      "name": "Auto Expo Special",
      "description": "lorem ipsum",
      "date": "2012-04-23T18:25:43.511Z"
    },
    {
      "_id": "4",
      "name": "Auto Expo Special",
      "description": "lorem ipsum",
      "date": "2012-04-23T18:25:43.511Z"
    },
    {
      "_id": "5",
      "name": "Auto Expo Special",
      "description": "lorem ipsum",
      "date": "2012-04-23T18:25:43.511Z"
    },
    {
      "_id": "6",
      "name": "Auto Expo Special",
      "description": "lorem ipsum",
      "date": "2012-04-23T18:25:43.511Z"
    }
  ]
  res.json(specialEvents)
});

router.get('/', (req, res) => {
  res.send('from api route');
});

router.post('/register', (req, res) => {
  let userData = req.body
  let user = new User(userData)
  user.save((err, registeredUser) => {
    if (err) {
      console.log(err);
      res.send(err).status("500");
    } else {
      // send(registeredUser).
      // res.sendStatus(200);
      let payload = { subject: registeredUser._id }
      let token = jwt.sign(payload, 'secretKey')
      res.status("200").send({ token })
    }
  })
});
router.get('/users', (req, res) => {
  User.find({}, (err, users) => {
    if (err) {
      console.log(err);
      res.send(err).status("500");
    } else {
      if (users.length === 0) {
        res.send('No users found').status("200");
      } else {
        res.send(users).status("200");
      }
    }
  });
})
router.post('/login', (req, res) => {
  let userData = req.body;
  User.findOne({ email: userData.email }, (err, user) => {
    if (err) {
      console.log(err);
      res.send(err).status("500");
    } else {
      if (!user) {
        res.send('Invalid Email').status("401");
      } else
        if (user.password !== userData.password) {
          res.status("401").send('Invalid Password')
        } else {
          // res.status("200").send(user);
          let payload = { subject: user._id }
          let token = jwt.sign(payload, 'secretKey')
          res.status(200).send({ token })
        }
    }
  })
})

router.get('/events', (req, res) => {
  let events = [
    {
      "_id": "1",
      "name": "Auto Expo",
      "description": "lorem ipsum",
      "date": "2012-04-23T18:25:43.511Z"
    },
    {
      "_id": "2",
      "name": "Auto Expo",
      "description": "lorem ipsum",
      "date": "2012-04-23T18:25:43.511Z"
    },
    {
      "_id": "3",
      "name": "Auto Expo",
      "description": "lorem ipsum",
      "date": "2012-04-23T18:25:43.511Z"
    },
    {
      "_id": "4",
      "name": "Auto Expo",
      "description": "lorem ipsum",
      "date": "2012-04-23T18:25:43.511Z"
    },
    {
      "_id": "5",
      "name": "Auto Expo",
      "description": "lorem ipsum",
      "date": "2012-04-23T18:25:43.511Z"
    },
    {
      "_id": "6",
      "name": "Auto Expo",
      "description": "lorem ipsum",
      "date": "2012-04-23T18:25:43.511Z"
    }
  ]
  res.json(events)
})


module.exports = router;