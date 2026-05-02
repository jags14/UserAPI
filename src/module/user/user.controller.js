const userModel = require('./user.model');
const db = require('../../db/db');
const userService = require('./user.service')
const catchAsync = require('../../utils/catchAsync');
const requestId = require('../../middlewares/requestId');
const AppError = require('../../errors/AppError');
const jwt = require('jsonwebtoken');

// Get Users List
const getAllUsers = catchAsync(async (req, res) => {
    const {page, limit} = req.pagination;
    const filters = req.filters;
    const {data, meta} = userService.getUsers(page, limit, filters);
    return res.status(200).json({
        status: 'success',
        data,
        meta
    });
});
const getUserById = catchAsync(async (req, res) => {
    const user = userService.getUserById(req.params.id);
    return res.status(200).json({
        status: 'success',
        data: user
    });
});
const deleteUser = catchAsync(async (req, res) => {
    const id = parseInt(req.params.id);
    userService.deleteUser(id);
    return res.status(200).json({"message": "User deleted"});
});
const updateUser = catchAsync(async (req, res) => {
    const id = parseInt(req.params.id);
    const result = userService.updateUser(id, req.body);
    return res.status(200).json({message: "User updated successfully"});
});
const createUser = catchAsync(async (req, res) => {
    const {username, email, age, password, role} = req.body;
    const context = {
        requestId: req.id,
        ip: req.ip,
        userId: req.user?.id
    }
    console.log(`Inside controller role: ${role}, context: ${context}`);
    userService.createUser(username, email, age, password, role , context);
    return res.status(201).json({message: 'User created successfully'});
});

module.exports = {
    getAllUsers,
    getUserById,
    createUser,
    deleteUser,
    updateUser
};