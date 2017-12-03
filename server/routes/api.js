const express = require('express');
const router = express.Router();

// Our endpoints
const users = require('./api/users');
const session = require('./api/session');

/* GET api listing. */
router.get('/', (req, res) => {
  res.send('api works');
});
router.post('/', (req, res) => {
  res.send({ status: 200 });
});

router.use('/users', users);
router.use('/session', session);

module.exports = router;