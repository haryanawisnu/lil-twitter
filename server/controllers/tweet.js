const Tweet = require('../models/tweet');
var popular = [{
  name: "temp",
  count: 0
}];
var hastag = []

function cekdata(params) {
  let temp = false;
  popular.forEach(data => {
    if (data.name == params) {
      temp = true;
    }
  })
  return temp;
}

let tweetControllers = {
  showAll: function(req, res) {
    Tweet.find().populate(['author', 'answer.author']).exec((err, result) => {
      if (err) {
        res.send(err);
      } else {
        res.send(result.reverse());
      }
    });
  },
  showOne: function(req, res) {
    Tweet.findOne({
      _id: req.params.id
    }).populate(['author', 'answer.author']).exec((err, result) => {
      if (err) {
        res.send(err);
      } else {
        res.send(result);
      }
    });
  },
  showAuthor: function(req, res) {
    Tweet.find({
      author: req.params.id
    }).populate(['author', 'answer.author']).exec((err, result) => {
      if (err) {
        res.send(err);
      } else {
        res.send(result.reverse());
      }
    });
  },
  showHastag: function(req, res) {
    hastag = [];
    let val = req.params.hastag;
    val = '#' + val;
    Tweet.find().populate(['author', 'answer.author']).exec((err, result) => {
      if (err) {
        res.send(err);
      } else {
        result.reverse()
        result.forEach(data => {
          data.hastag.forEach(has => {
            if (has == val) {
              hastag.push(data);
            }
          })
        })
        res.send(hastag);
      }
    });
  },
  showPopular: function(req, res) {
    popular = [{
      name: "temp",
      count: 0
    }];
    Tweet.find().populate(['author', 'answer.author']).exec((err, result) => {
      if (err) {
        res.send(err);
      } else {
        result.forEach(data => {
          data.hastag.forEach(has => {
            if (!cekdata(has)) {
              popular.push({
                name: has,
                count: 1
              })
            } else {
              popular.forEach(pop => {
                if (pop.name == has) {
                  pop.count++;
                }
              })
            }
          })
        })
        popular.slice(0, 10)
        res.send({
          popular: popular.sort(function(a, b) {
            return b.count - a.count
          })
        });
      }
    });
  },
  update: (req, res, next) => {
    let question_id = req.params.id;
    let author_id = req.params.userid;
    Tweet.findOne({
      _id: question_id,
      author: author_id
    }).exec(function(err, result) {
      if (result) {
        Tweet.update({
          _id: question_id
        }, {
          $set: {
            status: req.body.status || result.status
          }
        }, function(err, result) {
          if (result) {
            res.send(result);
          } else {
            res.send(err);
          }
        });
      } else {
        res.json({
          success: false,
          err: true,
          message: 'Err Update : Authorized failed'
        });
      }
    });
  },
  create: (req, res, next) => {
    Tweet.create({
      status: req.body.status,
      hastag: req.body.hastag,
      author: req.body.author,
      created: new Date
    }, function(err, result) {
      if (result) {
        res.send(result);
      } else {
        res.send(err);
      }
    });
  },
  delete: function(req, res) {
    let question_id = req.params.id;
    let author_id = req.params.userid;
    Tweet.findOne({
      _id: question_id,
      author: author_id
    }).exec(function(err, result) {
      if (result) {
        Tweet.findByIdAndRemove(question_id, (err, result) => {
          if (err) {
            res.send(err);
          } else {
            res.send(result);
          }
        });
      } else {
        res.json({
          success: false,
          err: true,
          message: 'Err Delete : Authorized failed'
        });
      }
    });
  },
  subupdate: (req, res, next) => {
    let question_id = req.body.id;
    let answer_id = req.body.answerid;
    let author_id = req.body.userid;
    Tweet.findOne({
      _id: question_id
    }).exec(function(err, result) {
      if (result) {
        var ind;
        var temp = result.answer.filter(function(answer, index) {
          if (answer.id == answer_id) {
            ind = index;
            return answer.id;
          }
        })
        if (temp.length == 1) {
          if (temp[0].author == author_id) {
            var arrtemp = result.answer;
            arrtemp[ind].description = req.body.description;
            Tweet.update({
              _id: question_id
            }, {
              $set: {
                answer: arrtemp
              }
            }, function(err, result) {
              if (result) {
                res.send(result);
              } else {
                res.send(err);
              }
            });
          } else {
            res.json({
              success: false,
              err: true,
              message: 'Err Update : Not can Access'
            });
          }
        } else {
          res.json({
            success: false,
            err: true,
            message: 'Err Update : Answer not found'
          });
        }
      } else {
        res.json({
          success: false,
          err: true,
          message: 'Err Update : Tweet not found'
        });
      }
    });
  },
  subcreate: (req, res, next) => {
    let question_id = req.body.id;
    let author_id = req.body.userid;
    Tweet.findOne({
      _id: question_id
    }).exec(function(err, result) {
      if (result) {
        var obj = {};
        obj.id = Math.floor((Math.random() * 99999999999999999) + 1);
        obj.description = req.body.description;
        obj.author = author_id;
        obj.created = new Date;
        result.answer.push(obj);
        Tweet.update({
          _id: question_id
        }, {
          $set: {
            answer: result.answer
          }
        }, function(err, result) {
          if (result) {
            res.send(result);
          } else {
            res.send(err);
          }
        });
      } else {
        res.json({
          success: false,
          err: true,
          message: 'Err Answer : Authorized failed'
        });
      }
    });
  },
  subdelete: function(req, res) {
    let question_id = req.params.id;
    let answer_id = req.params.answerid;
    let author_id = req.params.userid;
    // console.log(question_id + ',' + answer_id + ',' + author_id);
    Tweet.findOne({
      _id: question_id
    }).exec(function(err, result) {
      if (result) {
        var ind;
        var temp = result.answer.filter(function(answer, index) {
          if (answer.id == answer_id) {
            ind = index;
            return answer.id;
          }
        })
        if (temp.length == 1) {
          if (temp[0].author == author_id || result.author == author_id) {
            var arrtemp = result.answer.filter(function(answer, index) {
              if (ind != index) {
                return answer;
              }
            })
            Tweet.update({
              _id: question_id
            }, {
              $set: {
                answer: arrtemp
              }
            }, function(err, result) {
              if (result) {
                res.send(result);
              } else {
                res.send(err);
              }
            });
          } else {
            res.json({
              success: false,
              err: true,
              message: 'Err Delete : Not can Access'
            });
          }
        } else {
          res.json({
            success: false,
            err: true,
            message: 'Err Delete : Answer not found'
          });
        }
      } else {
        res.json({
          success: false,
          err: true,
          message: 'Err Delete : Tweet not found'
        });
      }
    });
  }
}

module.exports = tweetControllers;
