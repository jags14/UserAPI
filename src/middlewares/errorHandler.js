const errorHandler = (err, req, res, next) => {
    console.error({
        level: 'error',
        requestId: req.id,
        message: err.message,
        stack: err.stack

    });
    if(err.isOperational && err.statusCode){
        return res.status(err.statusCode).json({
            level: 'error',
            requestId: req.id,
            message: err.message
        });
    }
    // Unexpected/Unknown errors
    return res.status(500).json({
        level: 'error',
        requestId: req.id,
        message: 'Internal Server Error'
    });
}

module.exports = errorHandler;