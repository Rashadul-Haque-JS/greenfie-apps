import mongoose from 'mongoose';
import { IApps } from '@/utils/types';

// Define Apps schema
const AppsSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  video: {
    type: String,
    required: true,
  },
  ingredients: {
    type: [String],
    required: true,
  },
  directions: {
    type: [String],
    required: true,
  },
});

// Check if model is already defined before defining it
// to avoid the "Cannot overwrite model once compiled" error
const Apps = mongoose.models.Apps || mongoose.model('Apps', AppsSchema);

// Define CRUD operations
export async function createApp(data: IApps) {
  const app = new Apps(data);
  await app.save();
  return app.toObject();
}

export async function getApps() {
  const apps = await Apps.find();
  return apps.map((app) => app.toObject());
}

export async function getApp(id: string) {
  const app = await Apps.findById(id);
  return app ? app.toObject() : null;
}

export async function updateApp(id: string, data: IApps) {
  const app = await Apps.findByIdAndUpdate(id, data, { new: true });
  return app ? app.toObject() : null;
}

export async function deleteApp(id: string) {
  const app = await Apps.findByIdAndDelete(id);
  return app ? app.toObject() : null;
}

export default Apps;
