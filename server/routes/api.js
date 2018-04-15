const express = require('express');
const router = express.Router();
const User = require('../models/user');
const jwt = require('jsonwebtoken');
var nodemailer = require('nodemailer');

const mongoose = require('mongoose');
const Schema = mongoose.Schema,
    ObjectId = mongoose.Types.ObjectId;
const db = "mongodb://kunalganglani:asdfjkl123@ds113670.mlab.com:13670/hrbuddymdc";
const options = {
  reconnectTries: Number.MAX_VALUE,
  reconnectInterval: 500
};
const databaseConnectionState = {
  state: 'Loading',
  message: 'Application Loading..'
};
mongoose.connect(db, options, function (err) {
  if (err) {
    databaseConnectionState.message = 'Error! ' + err;
    databaseConnectionState.state = 'ConnectionError';
    console.error(databaseConnectionState.message);
  } else {
    databaseConnectionState.state = 'Connected';
    databaseConnectionState.message = 'Connected to the database';
    console.log(databaseConnectionState.message);
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
router.delete('/users/:id', (req, res) => {
  const id = req.params.id;
  const details = {"_id": ObjectId(id)};
  User.remove( details, (err,item)=>{
    if (!err) {
      res.send({'message': 'User with ' + id + ' deleted!'}).status('204');
    } else {
      res.send({ 'error': 'An error has occurred' }).status('500');
    }
  });
});
router.get('/users/:id', (req, res) => {
  User.findById(req.params.id, (err, userFound) => {
    if (err) {
      console.log(err);
      res.send(err).status("500");
    } else {
      res.send(userFound).status("200");
    }
  });
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
});
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