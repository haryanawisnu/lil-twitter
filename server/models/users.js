const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let userSchema = new Schema({
  username: String,
  email: String,
  password: String,
  img_url: String,
  created: Date
});

let User = mongoose.model('User', userSchema);

module.exports = User;
