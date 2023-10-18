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