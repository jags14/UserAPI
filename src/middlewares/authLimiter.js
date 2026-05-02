const rateLimiter = require('express-rate-limit');

const limit = rateLimiter.rateLimit({
    windowMs: 10*60*1000,
    limit: 5,
    message: {
        message: "Too many Login attempts, try again later"
    }
});

module.exports = { limit };