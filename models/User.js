const { Schema, model } = require('mongoose');

const userSchema = new Schema({

  
  username: {
    type: String,
    unique: true,
    require: true,
    trim: true,
  },
  email: {
    type:String,
    unique: true,
    require: true,
    match: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
  },
    thoughts: [
      {
        type: Schema.type.ObjectId,
        ref: 'thoughts',
      },
    ],
    friends: [
      {
        type: Schema.type.ObjectId,
      ref: 'user',
    },
    ],
    toJSON: {
      virtuals: true,
    },
    id: false,
});

userSchema.virtual('friendCount')
.get(function () {
  return this.friends.length;
});

const User = model('User', userSchema);

model.exports = User;