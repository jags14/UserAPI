const ConflictError = require("./ConflictError")
const NotFoundError = require("./NotFoundError")
const ValidationError = require("./ValidationError")

const errors = {
    notFound: (msg) => new NotFoundError(msg),
    conflict: (msg) => new ConflictError(msg),
    validation: (msg) => new ValidationError(msg)
};
module.exports = errors;