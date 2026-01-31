const swaggerrJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Contacts API',
            version: '1.0.0',
            description: 'API documentation for the Contacts project'
        }
    },
    apis: ['./routes/*.js'],
};

const swaggerSpec = swaggerrJsdoc(options);

module.exports = {
    swaggerUi,
    swaggerSpec
};