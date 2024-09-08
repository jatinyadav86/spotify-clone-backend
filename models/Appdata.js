const mongoose = require('mongoose');
const { Schema } = mongoose;

const DataSchema = new Schema({
    catagory:{
        type: String,
        sparse: true
    },
    playlists:{
        type: [Object],
        sparse: true
    }
  });

  module.exports = mongoose.model('appdata', DataSchema);