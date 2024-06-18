import * as Joi from 'joi';
import * as express from 'express';

export const userValidation = (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  const schema = Joi.object({
    access_token: Joi.string().min(7).required()
  });

  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(401).send('User validation failed');
  }
  next();
};
