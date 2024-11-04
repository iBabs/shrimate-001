import { Router } from "express";
import { logIn, signUp } from "../controllers/userController.js";

const userRoute = Router();

userRoute.post("/register", signUp);
userRoute.post("/login", logIn);

export default userRoute;