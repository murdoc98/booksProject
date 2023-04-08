import { Router } from 'express';
import swaggerUI from 'swagger-ui-express';
import swaggerJsdoc from 'swagger-jsdoc';

const router = Router();

// Swagger conf
const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Book\'s project',
      version: '1.0',
      description:
        'Books project api',
      license: {
        name: 'MIT',
        url: 'https://spdx.org/licenses/MIT.html'
      },
      contact: {
        name: 'Murdoc\'s Project',
        url: 'https://github.com/murdoc98'
      }
    },
    servers: [
      {
        url: 'http://localhost:1025/api',
        description: 'Development server'
      },
      {
        url: 'https://evaio.mx/api',
        description: 'Production server'
      }
    ]
  },
  apis: ['./*.doc.yml']
};
const specs = swaggerJsdoc(options);
router.use(
  '/api-docs',
  swaggerUI.serve,
  swaggerUI.setup(specs, { explorer: true })
);
export default router;