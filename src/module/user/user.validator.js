const ValidationError = require('../../errors/ValidationError');
const NotFoundError = require('../../errors/NotFoundError');
const ConflictError = require('../../errors/ConflictError');

const validateCreateUser = (req, res, next) => {
    const {username, email, age, password, role} = req.body;
    // check valid fields
    if( !username || !email || !email.includes('@') || !password || password.length < 6 || !role){
        return next(new ValidationError('Missing or Invalid fields'));
    }
    if(age != null){
        const parsedAge = parseInt(age);
        if(isNaN(parsedAge)){
            return next(new ValidationError('Invalid age'));
        }
        req.body.age = parsedAge;
    }
    next();
}
const validateUpdateUser = (req, res, next) => {
    const allowedFields = ['username', 'email', 'age'];
    const updateKeys = Object.keys(req.body);
    // empty update check
    if (!req.body || Object.keys(req.body).length === 0) {
        return next(new ValidationError('No valid fields to update'));
    }
    for (let key of updateKeys){
        if(!allowedFields.includes(key)){
            return next(new ValidationError(`Invalid field: ${key}`));
        }
        if(key === 'age'){
            const parsedAge = parseInt(req.body.age);
            if(isNaN(parsedAge)){
                return next(new ValidationError('Invalid age'));
            }
            req.body.age = parsedAge;
        }
    }
    next();

}
const validateGetUsers = (req, res, next) => {
    let {page, limit, ...filters} = req.query;
    // page and limit validation check
    page = page ? parseInt(page) : 1;
    limit = limit ? parseInt(limit) : 5;
    if(isNaN(page) || page < 1 || isNaN(limit) || limit < 1){
        return next(new ValidationError('Invalid Page or Limit'));
    }
    console.log(`inside validateGetUsers page: ${page}, limit: ${limit}, filters: ${filters}`);
    const allowedFields = ['username', 'email', 'age'];

    // validate filters
    for(let key of Object.keys(filters)){
        if(!allowedFields.includes(key)){
            return next(new ValidationError(`Invalid filter: ${key}`));
        }
        if(key === 'age'){
            const age = parseInt(filters[key]);
            if(isNaN(age)){
                return next(new ValidationError('Invalid age filter'));
            }
            req.filters.age = age;
        }
    }

    req.pagination = {page, limit};
    req.filters = filters;
    next();
}

const validIdParam = (req, res, next) => {
    const id = parseInt(req.params.id);
    console.log(`inside validIdParam validator, id = ${id}`);
    if(isNaN(id) || id < 1){
        console.log(`inside if block of validIdParam validator, id = ${id}`);
        return next(new ValidationError('Invalid ID'));
    }
    req.params.id = id;
    next();
}

module.exports = {
    validateCreateUser,
    validateUpdateUser,
    validateGetUsers,
    validIdParam
}