export const notFound = (req, _res, next) => next(Object.assign(new Error(`Route not found: ${req.method} ${req.path}`), { status: 404 }));
export const errorHandler = (err, _req, res, _next) => res.status(err.status || 500).json({ success: false, message: err.status ? err.message : 'Something went wrong. Please try again.' });
