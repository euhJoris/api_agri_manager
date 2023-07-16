const { Router } = require("express");
const userController = require("../controllers/userController");

const _userController = new userController();

Router.get('/users', _userController.getUsers);
Router.post('/newUser', _userController.createUser);
Router.put('/updUser/:data', _userController.updateUser);
Router.delete('/delUser/:data', _userController.deleteUser);