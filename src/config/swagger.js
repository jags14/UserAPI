const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUI = require('swagger-ui-express');

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'User API',
            version: '1.0.0',
            description: 'Backend APIs for user management system'
        },

    },
    servers: [
        {
            url: 'http://localhost:3000/api/v1'
        }
    ],
    apis: ['./src/docs/**/*.js', './src/module/**/*.js']
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;
