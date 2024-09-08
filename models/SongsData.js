const mongoose = require('mongoose');
const { Schema } = mongoose;

const DataSchema = new Schema({
    name:{
        type: String,
        sparse: true
    },
    songs:{
        type: [Object],
        sparse: true
    }
  });

  module.exports = mongoose.model('songsdata', DataSchema);