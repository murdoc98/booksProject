import mongoose, { Connection } from 'mongoose';
import logger from './logger';

const _ = () => new Promise((resolve, reject) => {
  mongoose.connect(`mongodb://${process.env.DB_HOST}/${process.env.DB_NAME}`);
  const db: Connection = mongoose.connection;
  db.on('error', error => {
    logger.error(`Error on db connection.`);
    reject(error);
  });
  db.once('open', () => {
    logger.info(`DB Connection succesfully.`);
    resolve(mongoose);
  });
});

export default _;