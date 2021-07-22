import { ApiError } from '../validators/errors/ApiError';
import { NextFunction, Request, Response } from 'express';

// eslint-disable-next-line no-unused-vars
export default (err: Error, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof ApiError) {
    return err.sendResponse(res);
  }

  return res.status(500).json({ message: err.message });
};
