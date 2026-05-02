const express = require('express');
const router = express.Router();
const userControllers = require('../controllers/userController');
const userValidators = require('../middlewares/validateUser');
const auth = require('../middlewares/auth');
const authorize = require('../middlewares/authorization');
const authLimiter = require('../middlewares/authLimiter');

// console.log({
//     protect: typeof auth.protect,
//     authorize: typeof authorize,
//     authorizeCall: typeof authorize('user'),
//     validateGetUsers: typeof userValidators.validateGetUsers,
//     controller: typeof userControllers.getAllUsers
// });

// router.get('/', auth.protect, authorize('user', 'admin'), userValidators.validateGetUsers, userControllers.getAllUsers);
router.get('/', userValidators.validateGetUsers, userControllers.getAllUsers);
router.get('/:id', userValidators.validIdParam, userControllers.getUserById);
router.delete('/:id', auth.protect, authorize('admin'), userValidators.validIdParam, userControllers.deleteUser);
router.put('/:id', userValidators.validIdParam, userValidators.validateUpdateUser, userControllers.updateUser);
router.post('/', userValidators.validateCreateUser,  userControllers.createUser);



module.exports = router;