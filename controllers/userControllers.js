const { User, Thought } = require('../models');

module.exports = {
  async getUsers(req, res) {
    try {
      const usersData = await User.find();
      res.json(usersData);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  async getSingleUser(req, res) {
    try {
      const userData = await User.findOne({ _id: req.params.userId })
        .populate({ path: "thoughts", select: "-__v" })
        .populate({ path: "friends", select: "-__v" })
        .select("-__v")
        .sort({ _id: -1 });

      if (!userData) {
        return res.status(404).json({ message: "No user found with that ID" });
      }

      res.json(userData);
    } catch (err) {
      console.error(err);
      res.status(500).json(err);
    }
  },

  async createUser(req, res) {
    try {
      const newUser = await User.create(req.body);
      res.json(newUser);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  async updateUser(req, res) {
    try {
      const userData = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $set: req.body },
        { runValidators: true, new: true }
      );

      if (!userData) {
        return res.status(404).json({ message: "No User found with this id" });
      }

      res.json(userData);
    } catch (err) {
      console.error(err);
      res.status(500).json(err);
    }
  },

  async deleteUser(req, res) {
    try {
      const user = await User.findOneAndDelete({ _id: req.params.userId });

      if (!user) {
        return res
          .status(404)
          .json({ message: "No user found with that id to delete" });
      }

      await Thought.deleteMany({ _id: { $in: user.thoughts } });
      res.json({ message: "User and associated thoughts deleted" });
    } catch (err) {
      console.error(err);
      res.status(500).json(err);
    }
  },

  async addNewFriend(req, res) {
    try {
      const friend = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $addToSet: { friends: req.params.friendId } },
        { runValidators: true, new: true },
      );

      if (!friend) {
        return res.status(404).json({ message: 'No user found with this id' });
      }

      res.json(friend);
    } catch (err) {
      console.error(err);
      res.status(500).json(err);
    }
  },

  async removeFriend(req, res) {
    try {
      const friend = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $pull: { friends: req.params.friendId } },
        { runValidators: true, new: true }
      );

      if (!friend) {
        return res.json(404).json({ message: 'No user found with this id' });
      }

      res.json(friend);
    } catch (err) {
      console.error(err);
      res.status(500).json(err);
    }
  },

};
