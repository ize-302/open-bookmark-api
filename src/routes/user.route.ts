import { Router } from "express";

import AddUserController from "../controllers/User/AddUser.controller";
import GetUserInfoController from "../controllers/User/GetUser.controller";
import MyBookmarksController from "../controllers/User/MyBookmarks.controller";
import UserBookmarksController from "../controllers/User/UserBookmarks.controller";

const userRoute = Router();

userRoute.post("/users/add", AddUserController);
userRoute.get("/users/:id/info", GetUserInfoController);
userRoute.get("/users/mybookmarks", MyBookmarksController);
userRoute.get("/users/:id/bookmarks", UserBookmarksController);

module.exports = userRoute;
