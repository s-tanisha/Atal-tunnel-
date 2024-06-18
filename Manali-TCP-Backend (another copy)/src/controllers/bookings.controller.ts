import { Controller } from '../interfaces';
import * as express from 'express';
import { Request, Response } from 'express';
import sendResponse from '../responses/response.helper';
import bookingsHelper from '../controller-helpers/bookings.helper';
import { sessionCheck } from '../middleware/sessionCheck';

class BookingsController implements Controller {
  public path = '/bookings';
  public router = express.Router();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes = () => {
    this.router.post(
      `${this.path}/bookPlace`,
      sessionCheck,
      this.setBookingPlaceDetails
    );
    this.router.get(
      `${this.path}/details`,
      sessionCheck,
      this.getBookingPassDetails
    );
  };

  /**
   * It gets the ser login and sigup details from its helper
   * and sends the cookie with the response
   * @param req
   * @param res
   * @returns
   */
  private setBookingPlaceDetails = async (req: Request, res: Response) => {
    const token = req.cookies?.token;
    const userData = await bookingsHelper.addBookingPassData(req.body, token);

    return sendResponse(res, userData);
  };

  /**
   * It gets the  login and sigup details from its helper
   * and sends the cookie with the response
   * @param req
   * @param res
   * @returns
   */
  private getBookingPassDetails = async (req: Request, res: Response) => {
    const token = req.cookies?.token;
    const bookingsData = await bookingsHelper.getBookingPassData(token);

    return sendResponse(res, bookingsData);
  };
}

export default BookingsController;
