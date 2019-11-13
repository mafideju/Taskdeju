const express = require('express');

const router = express.Router();
const {
  getAllUsers,
  // createUser,
  getUserById,
  updateUser,
  deleteUser,
} = require('./../controllers/userController');
const {
  signup,
  login,
  protect,
} = require('./../controllers/authController');

router
  .post('/signup', signup);

router
  .post('/login', login);

router
  .route('/')
  .get(protect, getAllUsers);
// .post(createUser);

router
  .route('/:id')
  .get(getUserById)
  .patch(updateUser)
  .delete(deleteUser);

module.exports = router;
