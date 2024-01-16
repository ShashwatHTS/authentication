var express = require('express');
const { getAll,singUp, authenticateToken, logIn, refresh } = require('../controller/user.controller');
var router = express.Router();

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});

router.post('/login', logIn)
router.post('/refresh', refresh)

module.exports = router;
