import * as config from './config';
const isLoaded = config.loadEnvs();
import App from './app';
import UserController from './controllers/user.controller';
import dbConnectionHandler from './mongoDB/connection';
import redisHelper from './helpers/redis.helper';
import { log } from './utils/helper.utils';
import BookingsController from './controllers/bookings.controller';

// start the service
(async () => {
  try {
    if (isLoaded) {
      const app = new App([new UserController(), new BookingsController()]);

      // connect to the mongodb server
      const isDBconnected = await dbConnectionHandler.createDBConnection();
      if (!isDBconnected) throw new Error('Unable to connect mongodb');

      // connect to the redis server
      const isRedisConnected = await redisHelper.connectRedis();
      if (!isRedisConnected) throw new Error('Unable to connect redis');

      app.listen();
    } else throw new Error("Env's not loaded correctly");
  } catch (err) {
    log.red('Error while starting the service: ', err.message);
  }
})();
