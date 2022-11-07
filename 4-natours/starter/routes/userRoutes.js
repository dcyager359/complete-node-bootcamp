const express = require('express');
// User Routes
const router = express.Router();
const userController = require('../controllers/userController');

// User Endpoint Handlers
router
  .route('/')
  .get(userController.getAllUsers)
  .post(userController.createUser);
router
  .route('/:id')
  .get(userController.getUserById)
  .patch(userController.updateUser)
  .delete(userController.deleteUser);

module.exports = router;
