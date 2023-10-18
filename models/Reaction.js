const { Schema, Types } = require('mongoose');

// reactionSchema goes inside thoughtSchema
reactionSchema = new Schema({
  reactionId: {
    type: Schema.Types.ObjectId,
    default: new Types.ObjectId,
  },
  reactionBody: {
    type: String,
    require: true,
    maxLength: 280,
  },
  username: {
    type: String,
    require: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
    get: (timestamp) => dateFormat(timestamp),
  },
});

module.exports = reactionSchema;