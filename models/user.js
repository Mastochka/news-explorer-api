const mongoose = require('mongoose');
const validators = require('mongoose-validators');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  email: {
    type: String,
    required: true,
    validate: validators.isEmail(),
    unique: true,
  },
});
module.exports = mongoose.model('user', userSchema);
