import { validationResult } from 'express-validator';
export const validate = (req, _res, next) => { const errors = validationResult(req); if (!errors.isEmpty()) { const err = new Error(errors.array()[0].msg); err.status = 422; return next(err); } next(); };
