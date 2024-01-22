import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    username: String,
    password: String,
    firstName: String,
    lastName: String,
  },
  { timestamps: true }
);

export const User = mongoose.model('User', userSchema);