import { User } from "../models/user.model";
import ApiError from "../utils/ApiError";
import ApiResponse from "../utils/ApiResponse";
import asyncHandler from "../utils/asyncHandler";
import { MongoError } from "mongodb";
import zod from "zod";

const signupBody = zod.object({
  email: zod.string().email(),
  password: zod.string().min(8).max(50),
  firstName: zod.string().min(3).max(50),
  lastName: zod.string().min(3).max(50),
});

export const createUser = asyncHandler(async (req, res) => {
  const { success } = signupBody.safeParse(req.body);

  if (!success) {
    return res.status(400).json(new ApiError(400, "Invalid request body"));
  }

  const { email, password, firstName, lastName } = req.body;

  if (!email || !password || !firstName || !lastName) {
    return res.status(400).json(new ApiError(400, "Missing required fields"));
  }
  let user = null;

  try {
    user = await User.create({
      email,
      password,
      firstName,
      lastName,
    });
  } catch (error) {
    if (error instanceof MongoError && error.code === 11000) {
      return res.status(400).json(new ApiError(400, "Email already taken"));
    }
  }

  if (!user) {
    return res.status(500).json(new ApiError(500, "Something went wrong"));
  }

  return res
    .status(201)
    .json(new ApiResponse(201, user, "User created successfully"));
});
