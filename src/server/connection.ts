// connectToDB.ts
import { ConnectOptions } from 'mongoose';
import Database from '@/server/config/database';

const uri = process.env.MONGODB_URI;
const options: ConnectOptions = {
  maxPoolSize: 100,
  minPoolSize: 0,
};

const database = Database.getInstance();

const connectToDB = async () => {
  if (!uri) {
    throw new Error('No Mongoose URI');
  }
  try {
    await database.connectToDB(uri, options);
  } catch (err: any) {
    console.error(err.message);
  }
};

export default connectToDB;
