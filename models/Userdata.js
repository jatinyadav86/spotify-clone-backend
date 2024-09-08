const mongoose = require('mongoose');
const { Schema } = mongoose;

const DataSchema = new Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    history:{
        type: [Object],
        sparse: true
    },
    liked:{
        type: [Object],
        sparse: true 
    },
    playlists1:{
        type: Array,
        sparse: true
    },
    playlists2:{
        type: [Object],
        sparse: true
    }
  });

  module.exports = mongoose.model('data', DataSchema);