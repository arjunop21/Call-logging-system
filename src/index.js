// Application entry point
import express, { json } from 'express';
import connectDB from './config/db.js';
import errorHandler from './middleware/errorHandler.js';
import callLogRoutes from './routes/callLogs.js';
import clientRoutes from './routes/clients.js';
import officerRoutes from './routes/officers.js';

import dotenv from 'dotenv';
dotenv.config();


const app = express();

// Middleware
app.use(json());

// Connect to MongoDB
connectDB();

// Routes
app.use('/api/callLogs', callLogRoutes);
app.use('/api/clients', clientRoutes);
app.use('/api/officers', officerRoutes);

// Error Handler
app.use(errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});