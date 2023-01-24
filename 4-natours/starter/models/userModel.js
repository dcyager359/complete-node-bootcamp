const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const validator = require('validator');

const usersSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'name is required'],
    unique: false,
    trim: true,
  },
  email: {
    type: String,
    required: [true, 'email is required'],
    unique: true,
    lowercase: true,
    trim: true,
    validate: [validator.isEmail, 'invalid email address'],
  },
  photo: {
    type: String,
    required: false,
    unique: false,
    trim: true,
  },
  password: {
    type: String,
    required: [true, 'password is required'],
    unique: false,
    trim: true,
    minlength: 8,
  },
  passwordConfirm: {
    type: String,
    required: [true, 'password confirmation is required'],
    unique: false,
    trim: true,
    minlength: 8,
    validate: {
      validator: function (el) {
        return el === this.password;
      },
      message: 'Passwords do not match',
    },
  },
});

usersSchema.pre('save', async function (next) {
  if (!this.isModified('password') && !this.isModified('passwordConfirm')) {
    return next();
  }

  this.password = await bcrypt.hash(this.password, 12);
  this.passwordConfirm = undefined;

  next();
});

const User = mongoose.model('User', usersSchema);

module.exports = User;
