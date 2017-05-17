const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let tweetSchema = new Schema({
  status: String,
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  answer: [{
    id: String,
    description: String,
    author: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    },
    created: Date
  }],
  hastag: [String],
  created: Date
});

let Tweet = mongoose.model('Tweet', tweetSchema);

module.exports = Tweet;
