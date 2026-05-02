const userModel = require('../user/user.model');
const errors = require('../../errors/errors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
require('dotenv').config();

const loginUser = (email, password) => {
    const user = userModel.getUserByEmail(email);
    const isMatch = bcrypt.compareSync(password, user.password);
    if(!user || !isMatch){
        log(user.id, 'Failed login attempt', {email});
        throw errors.validation('Invalid credentials');
    }
    const accessToken = jwt.sign(
        {id: user.id, email: user.email, role: user.role},
        process.env.SECRET,
        {expiresIn: '15m'}
    );
    const refreshToken = jwt.sign(
        {id: user.id},
        process.env.REFRESH_TOKEN_SECRET,
        {expiresIn: '7d'}
    );
    const result = userModel.saveRefreshToken(user.id, refreshToken);
    return {
        accessToken,
        refreshToken
    };
}

module.exports = loginUser;