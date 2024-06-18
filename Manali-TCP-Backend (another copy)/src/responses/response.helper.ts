import { STATUS_CODES, RESPONSE_MESSAGES } from '../constants';
import { ESResponse } from '../interfaces';
import { Response } from 'express';

/**
 * sends response
 * @param res
 * @param resData
 */
function sendResponse(res: Response, resData: ESResponse) {
  try {
    //check if a status code arrive
    const statusCode = resData?.status || STATUS_CODES.SUCCESS;

    console.log(statusCode, 'this is the status code', resData);

    //check if there is any message or status code 500 then send response accordingly
    if (resData?.message)
      res
        ?.status(statusCode)
        .send({ message: resData.message, data: resData.data });
    else if (statusCode === STATUS_CODES.INTERNALSERVER)
      res
        .status(statusCode)
        .send({ message: RESPONSE_MESSAGES.INTERNAL_SERVER_ERROR });
    else res.status(statusCode).send({ data: resData.data });
  } catch (err) {
    res
      .status(STATUS_CODES.INTERNALSERVER)
      .send({ message: RESPONSE_MESSAGES.INTERNAL_SERVER_ERROR });
  }
}

export default sendResponse;
