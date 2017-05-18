const User = require('../models/users');
var passwordHash = require('password-hash');
var jwthelpers = require('../helper/jwtHelpers');

let userControllers = {
  showAll: function(req, res) {
    User.find().exec((err, users) => {
      if (err) {
        res.send(err);
      } else {
        res.send(users);
      }
    });
  },
  showOne: function(req, res) {
    User.findOne({
      _id: req.params.id
    }).exec((err, user) => {
      if (err) {
        res.send(err);
      } else {
        res.send(user);
      }
    });
  },
  update: (req, res, next) => {
    let id = req.params.id;
    console.log(id);
    User.findOne({
      _id: id
    }).exec(function(err, result) {
      if (result) {
        console.log(result);
        User.update({
          _id: id
        }, {
          $set: {
            username: req.body.username || result.username,
            email: req.body.email || result.email,
            img_url: req.body.img_url || result.img_url,
            password: passwordHash.generate(req.body.password) || result.password
          }
        }, function(err, result) {
          if (result) {
            res.send(result);
          } else {
            res.send(err);
          }
        });
      } else {
        res.send(err);
      }
    });
  },
  create: (req, res, next) => {
    User.create({
      username: req.body.username,
      img_url: req.body.img_url,
      password: passwordHash.generate(req.body.password),
      email: req.body.email
    }, function(err, result) {
      if (result) {
        res.send({
          data: result,
          token: jwthelpers.sign(result),
        });
      } else {
        res.send(err);
      }
    });
  },
  delete: function(req, res) {
    User.findByIdAndRemove(req.params.id, (err, user) => {
      if (err) {
        res.send(err);
      } else {
        res.send(user);
      }
    });
  },
  signin: (username, password, cb) => {
    User.findOne({
      username: username
    }).exec(function(err, result) {
      if (!result) {
        cb({
          success: false,
          message: 'Authentication failed. User not found.',
          error: err
        });
      } else if (result) {
        if (passwordHash.verify(password, result.password)) {
          cb(null, {
            success: true,
            message: 'Enjoy your token!',
            token: jwthelpers.sign(result),
            data: result
          });
        } else {
          cb({
            success: false,
            message: 'Authentication failed. Password Wrong.',
            error: err
          });
        }
      }
    })
  }
}

module.exports = userControllers;
