// Configuring MongoDB connection
import { connect } from 'mongoose';

const connectDB = async () => {
  try {
    await connect(process.env.MONGO_URI, {
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
