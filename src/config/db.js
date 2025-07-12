// Configuring MongoDB connection
import { connect } from 'mongoose';

const connectDB = async () => {
  try {
    await connect(process.env.MONGO_URI, {
      maxPoolSize: 100,
      writeConcern: { w: 'majority' }, // Ensure data consistency  It means the write must be acknowledged by the majority of the nodes in the replica set.
    });
    console.log('MongoDB connected');
  } catch (error) {
    console.error('MongoDB connection error:', error);  
    process.exit(1);  //Exits the application using process.exit(1) — 1 signals an abnormal termination.
  }
};

export default connectDB;