import express from "express";
import cors from "cors";
import dotev from "dotenv";
import errorHandler from "./middleware/errorHandler.js";

import userRoutes from "./routes/userRoutes.js";
import connectDB from "./config/db.js";

const app = express();
app.use(cors());
dotev.config();

app.use(express.json());

connectDB();

app.use("/api/users", userRoutes);

const port = process.env.PORT || 3001;

app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
