const { User, Thought } = require('../models');

module.exports = {

  async getAllThoughs(req, res) {
    try {
      const thoughsData = await Thought.find();
      res.json(thoughsData);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  async getSingleThough(req, res) {
    try {
      const thoughData = await Thought.findOne({
        _id: req.params.thoughId
      })
    } catch (err) {
      res.status(500).json(err);
    }
  }
  

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