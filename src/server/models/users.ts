import mongoose from "mongoose";
import { IUser} from "@/utils/types";

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
  confirmToken:{
    type: String,
    default:""
  },
  avatar: {
    type: Buffer,
    required:false
  },
  
});

const Users = mongoose.models.Users || mongoose.model("Users", UsersSchema);

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
