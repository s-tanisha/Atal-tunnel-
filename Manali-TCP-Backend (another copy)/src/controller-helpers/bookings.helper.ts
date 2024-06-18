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
import { formatTimestamp } from '../helpers/formatDate.helper';
import { MailSender } from '../email';

class BookingsHelper {
  /**
   * The user sign-in helper handles all the login operations and checks for valid users
   * @param res
   * @param payload
   * @param userAgent
   * @returns
   */
  addBookingPassData = async (
    payload: {
      carNumber: string;
      location: string;
      date: string;
      email: string;
    },
    token: string
  ): Promise<ESResponse> => {
    try {
      // searching the bookins table for any bookings for the provided USERID
      // checking and compairing the dates and location for any error
      // if user already booked for the same date and location throw him an error of already booked for the same date.
      // if the number of users of the same date have been reached then throw an error of bookings full for the day.
      // else let the user register
      if (payload && token) {
        const userId = await redisHelper.getDataFromRedisKey(
          REDIS_VARIABLES.UserData,
          token
        );

        const userBookingsDetails = await mongoDataHelper.findAndQueryData(
          DATA_MODELS.Bookings,
          {
            user_id: userId
          }
        );

        const currentDate = new Date();

        // date check to be added so will need the createdAt option

        const locationBookingCount = await mongoDataHelper.getCount(
          DATA_MODELS.Bookings,
          {
            location: payload.location,
            date: formatTimestamp(currentDate).date
          }
        );

        const isBookingPresent = userBookingsDetails.some((item) => {
          console.log(
            item?.location,
            payload?.location,
            'location',
            new Date(item?.date)?.getTime(),
            new Date(payload?.date)?.getTime(),
            'time',
            item?.car_number,
            payload.carNumber
          );

          if (
            item?.location?.toUpperCase() ===
              payload?.location?.toUpperCase() &&
            new Date(item?.date)?.getTime() ===
              new Date(payload?.date)?.getTime() &&
            item?.car_number === payload.carNumber
          ) {
            return true;
          }
        });

        const bookingId = v4();

        const data = await mongoDataHelper.savaData(DATA_MODELS.Bookings, {
          id: bookingId,
          user_id: userId,
          car_number: payload?.carNumber.toUpperCase(),
          location: payload?.location.toUpperCase(),
          date: payload?.date
        });

        const mailSent = await MailSender(
          {
            id: bookingId,
            email: payload.email,
            carNumber: payload?.carNumber.toUpperCase(),
            date: payload?.date,
            location: payload?.location.toUpperCase()
          },
          payload.email
        );

        console.log(mailSent, 'this is the mail sent');

        return {
          data: null,
          message: 'Booking Confirmed',
          error: false,
          status: 200
        };
      }
    } catch (err) {
      console.log(err, 'this is the error');
      return {
        error: true,
        data: null,
        status: STATUS_CODES.INTERNALSERVER,
        message: RESPONSE_MESSAGES.INTERNAL_SERVER_ERROR
      };
    }
  };

  getBookingPassData = async (token: string): Promise<ESResponse> => {
    try {
      if (token) {
        const userId = await redisHelper.getDataFromRedisKey(
          REDIS_VARIABLES.UserData,
          token
        );

        return {
          data: "",
          message: 'Booking details for the user fetched',
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
}

export default new BookingsHelper();
