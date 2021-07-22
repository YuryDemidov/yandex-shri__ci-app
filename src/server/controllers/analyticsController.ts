import path from 'path';
import { Request, Response } from 'express';

export const analyticsController = (req: Request, res: Response) => {
  return res.sendFile(path.join(__dirname, 'analytics.html'));
};
