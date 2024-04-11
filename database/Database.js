import mongoose from 'mongoose';

export default class Database {

    static connectDB = async () => {
        try {
          await mongoose.connect(process.env.DB_CONNECT, {
            serverSelectionTimeoutMS: 5000 // Keep trying to send operations for 5 seconds
          });
      
          console.log('MongoDB connected successfully.');
        } catch (error) {
          console.error('MongoDB connection error:', error);
          // Exit process with failure
          process.exit(1);
        }
      
        mongoose.connection.on('disconnected', () => {
          console.log('MongoDB disconnected! Reconnecting...');
          connectDB(); // Attempt to reconnect
        });
    };
}
