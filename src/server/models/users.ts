import mongoose from "mongoose";

const UsersSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please enter your full name"],
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
      required: false,
      trim: true,
    },
    city: {
      type: String,
      required: false,
      trim: true,
    },
    country: {
      type: String,
      default: "Bangladesh",
    },
    phone: {
      type: String,
      trim: true,
      required: false,
    },
    gender: {
      type: String,
      required: false,
    },
    confirmToken: {
      type: String,
      default: "",
    },
    confirmed: {
      type: Boolean,
      default: false,
    },
    resetPasswordToken: {
      type: String,
      default: "",
    },
    avatar: {
      type: String,
      required: false,
    },
    restCountry: {
      type: String,
      required: false,
    },
  },
  { timestamps: true }
);

const Users = mongoose.models.Users || mongoose.model("Users", UsersSchema);

export default Users;
