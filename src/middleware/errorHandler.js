import express from 'express';

const errorHandler = (err, req, res, next) => {
  console.error(err.stack);
  if (err.name === 'ValidationError') {
    return res.status(400).json({ error: err.message });
  }
  if (err.name === 'CastError') {
    return res.status(400).json({ error: 'Invalid ID format' });
  }
  res.status(err.statusCode || 500).json({
    error: { message: err.message || 'Internal Server Error' },
  });
};

export default errorHandler;