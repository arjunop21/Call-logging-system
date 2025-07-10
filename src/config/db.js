// Configuring MongoDB connection
import { connect } from 'mongoose';

const connectDB = async () => {
  try {
    await connect(process.env.MONGO_URI, {
      retryWrites: false, // Disable retryWrites for better performance in high-load scenarios
      maxPoolSize: 100,
      writeConcern: { w: 'majority' }, // Ensure data consistency
    });
    console.log('MongoDB connected');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};

export default connectDB;