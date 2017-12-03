const express = require('express');
const router = express.Router();
const User = require('../../models/user');
const jwt = require('../../utils/jwt');

router.post('/', (req, res) => {
  var newUser = new User(req.body);
  newUser.save()
    .then(function() {
      jwt.createToken(newUser)
        .then(function(token) {
          res.status(201).send({ id: newUser._id, access_token: token });
        })
        .catch(function(err) {
          res.status(422).send({ message: err });
        })
    })
    .catch(function(err) {
      res.status(422).send(err);
    });
});

router.get('/:id', (req, res) => {
  User.findById(req.params.id)
    .then(function(user) {
      console.log(user)
      if(user) {
        res.status(200).send(user);
      }

      res.status(404).send({ message: 'User Not Found' });
    })
    .catch(function(err) {
      res.status(422).send(err)
    })

})

module.exports = router;