const { User, Thought } = require('../models');

module.exports = {
  async getAllThoughts(req, res) {
    try {
      const thoughtsData = await Thought.find();
      res.json(thoughtsData);
    } catch (err) {
      console.error(err);
      res.status(500).json(err);
    }
  },

  async getSingleThought(req, res) {
    try {
      const thoughtData = await Thought.findOne({
        _id: req.params.thoughtId,
      }).select('-__v');

      if (!thoughtData) {
        return res
          .status(404)
          .json({ message: "No thought found with that ID" });
      }

      res.json(thoughtData);
    } catch (err) {
      console.error(err);
      res.status(500).json(err);
    }
  },

  async createNewThought(req, res) {
    try {
      const newThoughtData = await Thought.create(req.body);
      const userData = await User.findOneAndUpdate(
        { _id: req.body.userId },
        { $push: { thoughts: newThoughtData._id } },
        { new: true }
      );

      if (!userData) {
        return res
          .status(404)
          .json({ message: "Thought created but not user found with this ID" });
      }

      res.json({ message: "Thought was created correctly" });
    } catch (err) {
      console.error(err);
      res.status(500).json(err);
    }
  },

  async updateThought(req, res) {
    try {
      const thoughtData = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $set: req.body },
        { runValidators: true, new: true }
      );

      if (!thoughtData) {
        return res.status(404).json({ message: "No thought found with this ID" });
      }

      res.json(thoughtData);
    } catch (err) {
      console.error(err);
      res.status(500).json(err);
    }
  },

  async deleteThought(req, res) {
    try {
      const thoughtData = await Thought.findOneAndDelete({ _id: req.params.thoughtId });

      if (!thoughtData) {
        return res.status(404).json({ message: "No thought found with this ID" });
      }

      const userData = await User.findOneAndUpdate(
        { thoughts: req.params.thoughtId },
        { $pull: { thoughts: req.params.thoughtId } },
        { new: true },
      );

      if (!userData) {
        return res.status(404).json({ message: 'No thought found with this ID' });
      }

      res.json(thoughtData);
    } catch (err) {
      console.error(err);
      res.status(500).json(err);
    }
  },

  async addNewReaction(req, res) {
    try {
      const newReactionData = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $addToSet: { reactions: req.body } },
        { runValidators: true, new: true }
      );

      if (!newReactionData) {
        return res.status(404).json({ message: 'No thought found with this ID' });
      }

      res.json(newReactionData);
    } catch (err) {
      console.error(err);
      res.status(500).json(err);
    }
  },

  async removeThoughtReaction(req, res) {
    try {
      const reactionData = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $pull: { reactions: { reactionId: req.params.reactionId } } },
        { runValidators: true, new: true }
      );

      if (!reactionData) {
        return res.status(404).json({ message: 'No thought found with this ID' });
      }

      res.json(reactionData);
    } catch (err) {
      console.error(err);
      res.status(500).json(err);
    }
  },

};


// /api/thoughts
// GET to get all thoughts
// GET to get a single thought by its _id
// POST to create a new thought (don't forget to push the created
// thought's _id to the associated user's thoughts array field)
// {
//   "thoughtText": "Here's a cool thought...",
//   "username": "lernantino",
//   "userId": "5edff358a0fcb779aa7b118b"
// }

// PUT to update a thought by its _id
// DELETE to remove a thought by its _id

// /api/thoughts/:thoughtId/reactions
// POST to create a reaction stored in a single thought's reactions array field
// DELETE to pull and remove a reaction by the reaction's reactionId value