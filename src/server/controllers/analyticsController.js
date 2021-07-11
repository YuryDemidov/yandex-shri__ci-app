import path from 'path';

export const analyticsController = (req, res) => {
  return res.sendFile(path.join(__dirname, 'analytics.html'));
};
