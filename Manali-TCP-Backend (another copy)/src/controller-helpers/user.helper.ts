import { Response } from 'express';
import {
  STATUS_CODES,
  RESPONSE_MESSAGES,
  DATA_MODELS,
  REDIS_VARIABLES
} from '../constants';
import { ESResponse } from '@interfaces';
import mongoDataHelper from '../helpers/mongo.data.helper';
import redisHelper from '../helpers/redis.helper';
import { v4 } from 'uuid';
import bcrypt from 'bcrypt';

class UserHelper {
  /**
   * The user sign-in helper handles all the login operations and checks for valid users
   * @param res
   * @param payload
   * @param userAgent
   * @returns
   */
  userSignin = async (
    payload: {
      name: string;
      email: string;
      password: string;
      type: string;
    },
    userAgent: string
  ): Promise<{
    error?: boolean;
    data?: any;
    message?: string;
    status?: number;
    token?: string;
  }> => {
    try {
      const token = v4();
      const updatedSeconds = Math.floor(Date.now() / 1000) + 60 * 60; // one hour time
      const userCheck: any = await mongoDataHelper.findAndQueryData(
        DATA_MODELS.User,
        {
          email: payload.email
        }
      );
      //storing the request user-agent for enhanced security
      if (payload.type === 'login') {
        console.log(payload, 'this is the payload');
        if (userCheck.length === 0) {
          return {
            error: true,
            data: { isLogin: false },
            status: STATUS_CODES.BADREQUEST,
            message: 'User needs to signup'
          };
        }

        const passwordMatch = await bcrypt.compare(
          payload?.password,
          userCheck[0]?.password
        );
        console.log(passwordMatch, 'this is the password match');
        if (!passwordMatch) {
          return {
            error: true,
            data: { isLogin: false },
            status: STATUS_CODES.BADREQUEST,
            message: 'Password is incorrect'
          };
        }
        console.log('User Signin');
        // storing the genereated token in redis with an expiry time so that session login can be implemented
        await redisHelper.storeInRedis(
          REDIS_VARIABLES.UserData,
          { [token]: userCheck[0].id },
          updatedSeconds
        );

        // storing the user-agent of the browser from the req so that additional security is added
        await redisHelper.storeInRedis(
          REDIS_VARIABLES.UserAgent,
          { [token]: userAgent },
          updatedSeconds
        );

        return {
          token: token,
          data: {
            name: userCheck[0].name,
            email: userCheck[0].email
          },
          message: 'User Login Successful',
          error: null,
          status: 200
        };
      } else {
        if (userCheck.length > 0) {
          return {
            error: true,
            data: { isLogin: false },
            status: STATUS_CODES.BADREQUEST,
            message: 'User is already registered'
          };
        }
        // storing the genereated token in redis with an expiry time so that session login can be implemented
        await redisHelper.storeInRedis(
          REDIS_VARIABLES.UserData,
          { [token]: 1 },
          updatedSeconds
        );

        // storing the user-agent of the browser from the req so that additional security is added
        await redisHelper.storeInRedis(
          REDIS_VARIABLES.UserAgent,
          { [token]: userAgent },
          updatedSeconds
        );

        console.log('User Signup');

        return {
          token: token,
          data: {
            name: payload?.name,
            email: payload?.email
          },
          message: 'User Signup Successful!',
          error: null,
          status: 200
        };
      }
    } catch (err) {
      console.log(err, 'this is the error');
      return {
        error: true,
        data: { isLogin: false },
        status: STATUS_CODES.INTERNALSERVER,
        message: RESPONSE_MESSAGES.INTERNAL_SERVER_ERROR
      };
    }
  };

  
  public getUserDetails = async (token: string): Promise<ESResponse> => {
    try {
      if (token) {
        const userId = await redisHelper.getDataFromRedisKey(
          REDIS_VARIABLES.UserData,
          token
        );

        return {
          data: data,
          message: 'User details fetched',
          error: false,
          status: 200
        };
      }
    } catch (err) {
      console.log(err, 'this is the error');
      return {
        error: true,
        data: { isLogin: false },
        status: STATUS_CODES.INTERNALSERVER,
        message: RESPONSE_MESSAGES.INTERNAL_SERVER_ERROR
      };
    }
  };

  /**
   * helper handles the logout
   * @param token
   * @returns
   */
  public userLogout = async (token: string): Promise<ESResponse> => {
    try {
      // this reomves the token from the redis hence preventing the re-login
      await redisHelper.removeFromRedis(REDIS_VARIABLES.UserData, token);
      await redisHelper.removeFromRedis(REDIS_VARIABLES.UserAgent, token);
      return { message: '', error: false, data: null };
    } catch (error) {
      return {
        error: true,
        status: STATUS_CODES.INTERNALSERVER,
        message: RESPONSE_MESSAGES.INTERNAL_SERVER_ERROR
      };
    }
  };

  // Hashing function to hash passwords
  private hashPassword = async (password: string) => {
    const saltRounds = 10;
    return await bcrypt.hash(password, saltRounds);
  };
}

export default new UserHelper();
