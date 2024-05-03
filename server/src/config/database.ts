
import mongoose from "mongoose";
mongoose.set("strictQuery", false);

export const connectDatabase = async () => {
  
  try {
    await mongoose.connect(process.env.DB_URL);
    console.log('Connect database successful!');
  } catch (error) {
    console.error('Connect database failed:', error);
  }
};
