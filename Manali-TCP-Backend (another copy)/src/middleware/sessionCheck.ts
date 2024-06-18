import { Response, Request, NextFunction } from 'express';
import redisHelper from '../helpers/redis.helper';
import sendResponse from '../responses/response.helper';
import { RESPONSE_MESSAGES, STATUS_CODES, REDIS_VARIABLES } from '../constants';


export const sessionCheck = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.cookies?.token;
    const userAgent = await redisHelper.getDataFromRedisKey(
      REDIS_VARIABLES.UserAgent,
      token
    );

    const userAgentRequest = req.headers['user-agent'];

    if (userAgent === userAgentRequest && token) {
      const data = await redisHelper.getDataFromRedisKey(
        REDIS_VARIABLES.UserData,
        token
      );
      if (data) {
        const updatedSeconds = Math.floor(Date.now() / 1000) + 60 * 60;

        // updating the token time for session login
        await redisHelper.storeInRedis(
          REDIS_VARIABLES.UserData,
          { [token]: data },
          updatedSeconds
        );

        // if the user access token is found and valid proceed the user to its request
        next();
      } else {
        return sendResponse(res, {
          message: RESPONSE_MESSAGES.UNAUTHORIZED,
          status: STATUS_CODES.UNAUTHORIZED
        });
      }
    }
  } catch (err) {
    console.log(err, 'this is the error');
    return sendResponse(res, {
      message: RESPONSE_MESSAGES.INTERNAL_SERVER_ERROR,
      status: STATUS_CODES.INTERNALSERVER
    });
  }
};
