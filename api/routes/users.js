const express = require("express");
const router = express.Router();

const checkAuth = require('../middleware/check-auth');
const UsersController = require('../controllers/users');

router.post("/signup", UsersController.users_create);

router.post("/login", UsersController.users_login);

router.delete("/:userId", checkAuth, UsersController.users_delete);

module.exports = router;
