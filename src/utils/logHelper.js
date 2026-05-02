const log = (context, message, extra = {}) => {
    console.log(JSON.stringify({
        requestId: context?.requestId,
        message,
        ...extra
    }));
};

module.exports = log