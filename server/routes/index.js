const express = require('express');
const router = express.Router();
var User = require('../controllers/users');
var passport = require('passport');

router.post('/signup', User.create);
router.post('/signin', passport.authenticate('local', {
  session: false
}), function(req, res) {
  var user = req.user;
  res.json(user);
});

module.exports = router;
