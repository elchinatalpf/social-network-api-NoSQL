const router = require('express').Router();

// require here functions from controllers

router.route('/').get('Add here function from controllers')
.post('Add here function to post');

router.route('/:userId').get('add here get single user')
.put('update user by id')
.delete('delete user by id');

router.route('/:userId/friends/:friendId').post('postFriend here')
.delete('deleteFriend here');

module.exports = router;

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