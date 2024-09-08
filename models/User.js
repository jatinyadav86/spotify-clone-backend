const mongoose = require('mongoose');
const { Schema } = mongoose;

const UserSchema = new Schema({
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        unique: true,
        sparse: true
    },
    phone:{
        type: Number,
        unique: true,
        sparse: true
    },
    password:{
        type: String,
        required: true
    },
    isReplay:{
        type: Boolean,
        default: false
    }
  });
  const User = mongoose.model('user', UserSchema);
  module.exports = User;