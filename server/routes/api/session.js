const express = require('express');
const router = express.Router();
const User = require('../../models/user')
const jwt = require('../../utils/jwt');

router.post('/', (req, res) => {
  User.authenticate(req.body)
    .then(function(user) {
      jwt.createToken({ email: user.email, id: user._id })
        .then(function(token) {
          res.status(200).send({ id: user._id, access_token: token });
        })
        .catch(function(err) {
          res.status(422).send({ message: err });
        })
    })
    .catch(function(err) {
      res.status(404).send({ message: err });
    })
});

module.exports = router;