const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();  

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50,
  },
  email: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50,
    unique: true,  // Ensure email is unique
  },
  disaster: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 100,
  },
  licence: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 50,
    unique: true,  // Ensure licence is unique
  },
  password: {
    type: String,
    required: true,
    maxlength: 1024,
    minlength: 5,
  },
  resrc: {
    type: String,
    maxlength: 1024,
    minlength: 5,
  },
  address: {
    type: String,
    required: true,
    maxlength: 5000,
    minlength:5,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  verified: {
    type: Boolean,
    default: false
  }
});

// Hash password before saving
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();

  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (err) {
    next(err);
  }
});

// Compare password
userSchema.methods.comparePassword = function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

// Generate JWT token
userSchema.methods.generateAuthToken = function () {
  const token = jwt.sign(
    { _id: this._id, isAdmin: this.isAdmin,verified:this.verified },
    process.env.jwtPrivateKey,  // Ensure this key is defined in your .env file
    { expiresIn: '1h' }  // Optional: Set expiration for the token
  );
  return token;
};

const User = mongoose.model("User", userSchema);
module.exports = User;
