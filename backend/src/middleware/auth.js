import jwt from 'jsonwebtoken';
import { AppError } from '../utils/AppError.js';
export const protect = (req, _res, next) => {
  try { const token = req.cookies?.token || req.headers.authorization?.replace(/^Bearer\s+/i, ''); if (!token) throw new AppError('Authentication required', 401); req.user = jwt.verify(token, process.env.JWT_SECRET); next(); }
  catch { next(new AppError('Authentication required', 401)); }
};
