const express = require('express');
const router = express.Router();
const { isAdmin, isLoggedIn } = require('../middlewares/auth');
const adminController = require('../controllers/adminController');

router.use(isLoggedIn, isAdmin);

router.get('/allusers', adminController.getAllUsers);
router.get('/', adminController.getUser);
router.patch('/', adminController.updateUser);
router.delete('/', adminController.deleteUser);

module.exports = router;
