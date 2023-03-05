import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import { IUser } from "@/utils/types";
const UsersSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter your name"],
    trim: true,
  },
  email: {
    type: String,
    required: [true, "Please enter your email address"],
    unique: true,
    lowercase: true,
    trim: true,
    validate: {
      validator: (v: string) => {
        return /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/.test(v);
      },
      message: (props: any) => `${props.value} is not a valid email address`,
    },
  },
  password: {
    type: String,
    required: [true, "Please enter a password"],
  },
  area: {
    type: String,
    required: [true, "Please enter your area"],
    trim: true,
  },
  city: {
    type: String,
    required: [true, "Please enter your city"],
    trim: true,
  },
  country: {
    type: String,
    default: "BD",
  },
  phone: {
    type: String,
    trim: true,
  },
  gender: {
    type: String,
   trim:true,
   required:[true, "Please enter your gender"],
  },
  avatar: {
    type: Buffer,
    required:false
  },
});

const Users = mongoose.models.Users || mongoose.model("Users", UsersSchema);

// Define CRUD operations
export async function createUser(data: IUser) {
  const { password, ...userData } = data;
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  const user = new Users({ ...userData, password: hashedPassword });
  await user.save();
  return user.toObject();
}

export async function getUsers() {
  const users = await Users.find();
  return users.map((user) => user.toObject());
}

export async function getUser(id: string) {
  const user = await Users.findById(id);
  return user ? user.toObject() : null;
}

export async function updateUser(id: string, data: IUser) {
  const user = await Users.findByIdAndUpdate(id, data, { new: true });
  return user ? user.toObject() : null;
}

export async function deleteUser(id: string) {
  const user = await Users.findByIdAndDelete(id);
  return user ? user.toObject() : null;
}

export default Users;
