const { Schema, model } = require('mongoose');
const reactionSchema = require('./Reaction');

const thoughtsSchema = new Schema({
  thoughtText: {
    type: String,
    require: true,
    minLength: 1,
    maxLength: 280,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    get: (timestamp) => dateFormat(timestamp),
  },
  username: {
    type: String,
    require: true,
  },
  reactions: [
    reactionSchema
  ],
  toJSON: {
    virtuals: true,
    getters: true,
  },
  id: false,
});

const Thought = model('Thought', thoughtsSchema);

module.exports = Thought;