const sanitize = (user) => {
    const {password, refreshToken, ...safeUser} = user;
    return safeUser;
}

module.exports = sanitize;