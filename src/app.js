import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import authRoutes from "../routes/authRoutes.js"


dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());
const PORT=5001;

app.use(authRoutes);
 

app.listen(PORT, () => console.log("Server running  :)"));