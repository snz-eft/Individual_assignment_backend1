exports.globalErrorHandler = (err, req, res) => {
  const message =
    err instanceof Error ? err.message : 'Internal Server Error';
  const statusCode = err instanceof Error ? 400 : 500;

  res.status(statusCode).json({ error: true, message });
};

