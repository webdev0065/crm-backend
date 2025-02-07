const swaggerJSDoc = require('swagger-jsdoc');

const swaggerOptions = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: 'CRM API',
      description: 'API Documentation for the CRM system',
      version: '1.0.0',
      contact: {
        name: 'CRM Support',
        email: 'support@crm.com'
      }
    },
    servers: [
      {
        // url: 'http://localhost:5000',
         url: 'https://crm-backend-3b53.onrender.com'
       
      }
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT"
        }
      }
    },
    security: [{ bearerAuth: [] }] 
  },
  apis: ['./src/routes/**/*.js']
};

const swaggerSpec = swaggerJSDoc(swaggerOptions);

module.exports = swaggerSpec;
