import { Router } from "express";

import AddUserController from "../controllers/User/AddUser.controller";
import GetUserController from "../controllers/User/GetUser.controller";

const userRoute = Router();

userRoute.post("/user/add", AddUserController);
userRoute.get("/users/:id", GetUserController);

module.exports = userRoute;
