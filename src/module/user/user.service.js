const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const userModel = require('./user.model');
const db = require('../../db/db');
const validators = require('./user.validator');

const errors = require('../../errors/errors');
const log = require('../../utils/logHelper');
const sanitize = require('../../utils/sanitizeUser');
require('dotenv').config();

const createUser = (username, email, age, password, role , context) => {
    const hashedPassword = bcrypt.hashSync(password, 10);
    try{
        const result = userModel.createUser(username, email, age, hashedPassword, role);
        log(context, 'User created', {email});
        return result;
    } catch(err){
        if(err.code === 'SQLITE_CONSTRAINT_UNIQUE'){
            throw errors.conflict('Email already exists');
        }
        throw err; // propagates error
    }
}
const getUsers = (page, limit, filters) => {
    const allowedFilters = ['username', 'email', 'age'];
    const conditions = [];
    const values = [];

    for(let key in filters){
        if(allowedFilters.includes(key)){
            conditions.push(`${key} = ?`);
           if(key == 'age'){
                values.push(parseInt(filters[key]));
           } else {
             values.push(filters[key]);
           }
        }
    }
    const whereClause = conditions.length ? `WHERE ${conditions.join(' AND ')}` : '';
    const offset = (page - 1) * limit;
    const {users, total } = userModel.getUsers({limit, offset, whereClause, values});
    const totalPages = Math.ceil(total / limit);
    const userData = users.map(sanitize);
    
    return {
        "data" : userData,
        "meta" : {
            page,
            limit,
            totalPages
        }
    };

}
const getUserById = (id) => {
    const user = userModel.getUserById(id);
    if(!user) throw errors.notFound('Not Found');
    return sanitize(user);
}
const updateUser = (id, data) => {
    if (Object.keys(data).length === 0) {
        throw errors.validation('No fields to update');
    }
    const existingUser = userModel.getUserById(id);
    if(!existingUser) throw errors.notFound('Not Found');

    try {
        const info = userModel.updateUser({ id, data });
        if(info.changes === 0){
            throw errors.notFound('Not found');
        }
        const user = userModel.getUserById(id);
        return sanitize(user);
    } catch (error) {
        
        if(error.message.includes('UNIQUE')){
            throw errors.conflict('Email already exists');
        }
        throw error;
    }

}
const deleteUser = (id) => {
    
        const info = userModel.deleteUser(id);
        if(info.changes === 0){
            throw errors.notFound('Not Found');
        }
        return;
}

module.exports = {
    createUser,
    getUsers,
    getUserById,
    updateUser,
    deleteUser
};