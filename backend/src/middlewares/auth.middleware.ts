import { User } from "../models/user.model";
import ApiError from "../utils/ApiError";
import asyncHandler from "../utils/asyncHandler";
import jwt from "jsonwebtoken";

export const verifyJwtToken = asyncHandler(async (req, res, next) => {
  try {
    const token =
      req.cookies?.token || req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(401).json(new ApiError(401, "Unauthorized request"));
    }
    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    const user = await User.findById(decodedToken?._id).select(
      "-password -refreshToken"
    );

    if (!user) {
      return res.status(401).json(new ApiError(401, "Invalid access token"));
    }

    req.user = user;
    next();
  } catch (error) {
    return res
      .status(401)
      .json(new ApiError(401, error?.message || "Invalid access token"));
  }
});
