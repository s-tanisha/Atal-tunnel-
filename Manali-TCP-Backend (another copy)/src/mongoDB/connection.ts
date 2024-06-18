import mongoose from 'mongoose';
import { log } from '../utils/helper.utils';

// Database connection and events handler class
class DBConnectionHandler {
  static instance: DBConnectionHandler = null;

  static getInstance = () => {
    if (!DBConnectionHandler.instance) {
      DBConnectionHandler.instance = new DBConnectionHandler();
      delete DBConnectionHandler.constructor;
    }
    return DBConnectionHandler.instance;
  };

  /**
   * connect to the mongodb server
   * @returns boolean
   */
  createDBConnection = async () => {
    try {
      this._bindMongoConnectionEvents();
      await mongoose.connect(process.env.MONGO_URI, {
        connectTimeoutMS: 40000
      });
      return true;
    } catch (err) {
      log.red('Error while connecting to MongoDB: ', err);
      return false;
    }
  };

  //***************** internal used methods *************************/

  /**
   * for binding the mongodb connection events
   */
  _bindMongoConnectionEvents = () => {
    try {
      // fired when connected to mongodb
      mongoose.connection.on('connecting', () => {
        log.blue('Connecting to mongodb server');
      });

      // fired when connected to mongodb
      mongoose.connection.on('connected', () => {
        log.green('MongoDB connected');
      });

      // fired when mongodb connection is disconnected
      mongoose.connection.on('disconnected', () => {
        log.blue('MongoDB disconnected');
      });

        // for future usage
        // this.createDBConnection();
    } catch (err) {
      log.red('Error while binding the mongodb conncetion events: ', err);
    }
  };
}

const dbConnectionHandler = DBConnectionHandler.getInstance();
export default dbConnectionHandler;
