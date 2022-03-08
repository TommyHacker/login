const express = require('express');
const router = express.Router();
const { isLoggedIn, isAdmin } = require('../middlewares/auth');
const userController = require('../controllers/userController');

router.post('/register', userController.register);
router.post('/login', userController.login);
router.get('/allusers', isLoggedIn, isAdmin, userController.getAllUsers);
router.get('/', isLoggedIn, userController.getUserInfo);
router.patch('/', isLoggedIn, userController.update);
router.delete('/', isLoggedIn, userController.delete);
router.delete('/logout', isLoggedIn, userController.logout);
module.exports = router;
