import { Router } from "express";
import { signUp, signIn } from "../controllers/authControllers.js";
import schemavalidate from "../middlewares/schemaValidate.js";
import userSchema from "../schemas/userSchema.js";

const route = Router();
route.post("/sign-up", schemavalidate(userSchema), signUp);
route.post("/sign-in", signIn);

export default route;