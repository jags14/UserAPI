const express = require('express');
const router = express.Router();
const userControllers = require('./user.controller');
const userValidators = require('./user.validator');
const auth = require('../../middlewares/auth');
const authorize = require('../../middlewares/authorization');
// const authLimiter = require('../../middlewares/authLimiter');

// router.get('/', auth.protect, authorize('user', 'admin'), userValidators.validateGetUsers, userControllers.getAllUsers);
router.get('/', userValidators.validateGetUsers, userControllers.getAllUsers);
router.get('/:id', userValidators.validIdParam, userControllers.getUserById);
router.delete('/:id', auth.protect, authorize('admin'), userValidators.validIdParam, userControllers.deleteUser);
router.put('/:id', userValidators.validIdParam, userValidators.validateUpdateUser, userControllers.updateUser);
router.post('/', userValidators.validateCreateUser,  userControllers.createUser);
module.exports = router;