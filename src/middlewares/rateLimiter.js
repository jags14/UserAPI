const rateLimit = require('express-rate-limit');

const limiter = rateLimit.rateLimit({
    windowMs: 15*60*1000,
    limit: 100,
    message: {
        message: 'Too many requests'
    },
    standardHeaders: true,
    legacyHeaders: false
});

module.exports = { limiter };