import createServer from './server';
import dbConnection from './dbConnection';
import logger from './logger';

const startServer = async () => {
  const app = createServer();
  await dbConnection();
  app.listen(app.get('PORT'), () => {
    logger.info(`Server running on port ${app.get('PORT')}`);
  });
};

startServer();