import swaggerJSDoc from 'swagger-jsdoc';
import dotenv from 'dotenv';

dotenv.config();
const port = process.env.PORT || '3000';
const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'My API',
      version: '1.0.0',
      description: 'API documentation for My Project'
    },
    servers: [
      {
        url: `http://localhost:${port}`
      }
    ],
    components:{
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: "bearer",
          bearerFormat: 'JWT'
        }
      }
    }
  },
  apis: [`${__dirname}/app/routes/*.ts`] // Path to the API routes folder
};

const swaggerSpec = swaggerJSDoc(options);

export default swaggerSpec;
