import mongoose from 'mongoose';

export const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/n3d_portfolio', {
      serverSelectionTimeoutMS: 3000 // Timeout fast if no local mongodb
    });
    console.log(`[MongoDB] Connected successfully: ${conn.connection.host}`);
    return true;
  } catch (error) {
    console.warn(`[MongoDB Warning] Could not connect to MongoDB database at ${process.env.MONGODB_URI}.`);
    console.warn(`[MongoDB Warning] Server will operate using fallback memory database mode.`);
    return false;
  }
};
