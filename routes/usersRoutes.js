const express = require("express");
const router = express.Router();
const UserController = require('../controllers/usersController')

const userController = new UserController();

router.get('/users', userController.getUsers);
router.get('/users/:id', userController.searchUser);
router.post('/users', userController.createUser);
router.put('/users', userController.updateUser);
router.delete('/users/:id', userController.deleteUser);

module.exports = router;