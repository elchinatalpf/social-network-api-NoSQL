const router = require('express').Router();

const {
  getUsers,
  getSingleUser,
  createUser,
  updateUser,
  deleteUser,
  addNewFriend,
  removeFriend
} = require('../../controllers/userControllers');

router.route('/').get(getUsers)
.post(createUser);

router.route('/:userId').get(getSingleUser)
.put(updateUser)
.delete(deleteUser);

router.route('/:userId/friends/:friendId').post(addNewFriend)
.delete(removeFriend);

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

// DELETE to remove a friend from a user's friend list