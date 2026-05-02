const { randomUUID } = require('crypto');

const requestId = (req, res, next) => {
    const requestId = randomUUID();
    req.id = requestId;
    next();
}

module.exports = requestId;