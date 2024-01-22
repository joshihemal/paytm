import dotenv from "dotenv";
import { app } from "./app";
import connectDB from "./db";
dotenv.config({
  path: "./.env",
});

connectDB().then(() => { 
  app.listen(process.env.PORT || 3000, () => { 
    console.log(`Server running on port ${process.env.PORT || 3000}`); 
  });
}).catch((error) => {
  console.log("MONGODB connection error ", error);
  process.exit(1);
});
