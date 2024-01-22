const express = require("express");
import dotenv from "dotenv";
import mainRouter from "./routes/index";
dotenv.config({
  path: "./.env",
});

const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/v1", mainRouter);
app.listen(process.env.PORT || 3000);

// /api/v1/user/signup
// /api/v1/user/signin
// /api/v1/user/changePassword ....

// /api/v1/account/transferMoney
// /api/v1/account/balance
