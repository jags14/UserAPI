
const logger = (req, res, next) => {
    const start = Date.now();
    res.on('finish', () => {
        const duration = Date.now() - start;
        console.log(JSON.stringify({
            level: 'info',
            method: req.method,
            path: req.originalUrl,
            status: res.statusCode,
            duration: `${duration}ms`,
            requestId: req.id,
            ip: req.ip

        }));
    });
    next();
}

module.exports = logger;