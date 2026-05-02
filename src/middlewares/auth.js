const jwt = require('jsonwebtoken');
const AppError = require('../errors/AppError');
require('dotenv').config();

const protect = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if(!authHeader || !authHeader.startsWith('Bearer ')){
        return next(new AppError('Unauthorized', 401));
    }
    const token = authHeader.split(' ')[1];
    
    try {
        const decoded = jwt.verify(token, process.env.SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        return next(new AppError('Invalid token', 401));
    }
};

module.exports = {
    protect
}