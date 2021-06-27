import { ApiError } from '../validators/errors/ApiError';

// eslint-disable-next-line no-unused-vars
export default (err, req, res, next) => {
  if (err instanceof ApiError) {
    return err.sendResponse(res);
  }

  return res.status(500).json({ message: err.message });
};
