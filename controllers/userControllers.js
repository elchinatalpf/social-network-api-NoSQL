const { User, Thoughts } = require('../models');

module.exports = {

  async getUsers(req, res) {
    try {
      const users = await User.find();
      res.json(users);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  async getSingleUser (req, res) {
    try {
      const userData = await User.findOne({ _id: req.params.userId })
      .populate({ path: 'thoughts', select: '-__v' })
      .populate({ path: 'friends', select: '-__v' })
      .select('-__v')
      .sort({ _id: -1 });

      if (!userData) {
        return res.status(404).json({ message: 'No user found with that ID' });
      }

      res.json(userData);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  async createUser (req, res) {
    try {
      const newUser = await User.create(req.body);
      res.json(newUser);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  async updateUser (req, res) {
    try {
      const userData = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $set: req.body },
        { runValidators: true, new: true },
      );

      if (!userData) {
        return res.status(404).json({ message: 'No User found with this id' });
      }

      res.json(userData);
    } catch (err) {
      res.status(500).json(err);
    }
  },




};

// /api/users
// GET all users
// GET a single user by its _id and populated thought and friend data
// POST a new user
// PUT to update a user by its _id
// DELETE to remove user by its _id

// Bonus
// /api/users/:userId/friends/:friendId
// POST to add a new friend to a user's friend list
// {
//   "username": "lernantino",
//   "email": "lernantino@gmail.com"
// }

// DELETE to remove a friend from a user's friend list