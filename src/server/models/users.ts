import mongoose from 'mongoose';

export interface IUser{
    name: string;
    email: string;
    password: string;
}
// Define user schema
const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

// Define user model
const User = mongoose.model('User', UserSchema);

// Define CRUD operations
export async function createUser(data:IUser) {
  const user = new User(data);
  await user.save();
  return user.toObject();
}

export async function getUsers() {
  const users = await User.find();
  return users.map((user) => user.toObject());
}

export async function getUser(id:string) {
  const user = await User.findById(id);
  return user ? user.toObject() : null;
}

export async function updateUser(id:string, data:IUser) {
  const user = await User.findByIdAndUpdate(id, data, { new: true });
  return user ? user.toObject() : null;
}

export async function deleteUser(id:string) {
  const user = await User.findByIdAndDelete(id);
  return user ? user.toObject() : null;
}
