import { Router } from "express";

import UserController from "../controllers/User/User.controller";

const userRoute = Router();

userRoute.post("/user", UserController);

module.exports = userRoute;
