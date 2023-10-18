const { Schema, model } = require('mongoose');

// reactionSchema is here

const thoughtsSchema = new Schema({
  thoughText: {
    type: String,
    require: true,
    minLength: 1,
    maxLength: 280,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    // get format here 
  },
  username: {
    type: String,
    require: true,
  },
  reactions: [
// reactionSchema goes here.
  ]
});