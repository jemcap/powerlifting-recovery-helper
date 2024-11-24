import express from "express";
import cors from "cors";
import dotev from "dotenv";

import userRoutes from "./routes/userRoutes.js";

const app = express();
app.use(cors());
dotev.config();

app.use(express.json());

app.use("/api/users", userRoutes);

const port = process.env.PORT || 3001;

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
