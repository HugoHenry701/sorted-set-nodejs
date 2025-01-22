import dotenv from 'dotenv';
dotenv.config();
import mongoose from 'mongoose';
import { StartSeed } from './start';

export const DBSeed = async () => {
  if (!process.env.MONGO_URI) {
    throw new Error('MONGO_URI must be defined.');
  }
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB');
    //seed collections
    await StartSeed();
    mongoose.connection.close();
  } catch (err) {
    console.log(err);
  }
};

DBSeed();
