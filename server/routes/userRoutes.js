const express = require('express');

const {
  register,
  login,
  tokenLogin,
  logout,
  getUsersById,
} = require('../controller/userController');

const router = express.Router();

router.post('/login', login);
router.post('/register', register);
router.get('/logout/:id', logout);
router.post('/token/login', tokenLogin);
router.get('/get/:id', getUsersById);

module.exports = router;
