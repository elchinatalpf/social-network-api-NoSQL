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
      const user = await User.findOne({ _id: req.params.userId })
      .select('-__V')
      .populate('users')
    }
  }




};