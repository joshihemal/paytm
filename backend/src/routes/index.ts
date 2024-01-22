import express from "express";
import userRouter from "./user.route";
import healthCheckRouter from "./healthcheck.route";
const router = express.Router();

router.use("/", healthCheckRouter);
router.use("/user", userRouter);

export default router;

// /api/v1/user/signup
// /api/v1/user/signin
// /api/v1/user/changePassword ....

// /api/v1/account/transferMoney
// /api/v1/account/balance