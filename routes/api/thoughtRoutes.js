const router = require('express').Router();

// require here controllers function

router.route('/').get('getAllThoughts here')
.post('postNewThought here');

router.route('/:thoughtId').get('getOneThought')
.put('updateThouoghtId')
.delete('deleteThoughtId');

router.route('/:thoughtId/reactions').post('postReaction');
router.route('/:thoughtId/reactions/:reactionId').delete('deleteReaction');

module.exports = router;

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