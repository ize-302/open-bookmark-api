import { Router } from "express";

import AddUserController from "../controllers/User/AddUser.controller";
import GetUserInfoController from "../controllers/User/GetUserInfo.controller";
import MyBookmarksController from "../controllers/User/MyBookmarks.controller";
import GetUserPublicBookmarksController from "../controllers/User/GetUserPublicBookmarks.controller";
import FollowUserController from "../controllers/User/Follow.controller";
import UnfollowUserController from "../controllers/User/Unfollow.controller";

const userRoute = Router();

userRoute.post("/users/add", AddUserController);
userRoute.get("/users/:id/info", GetUserInfoController);
userRoute.get("/users/mybookmarks", MyBookmarksController);
userRoute.get("/users/:id/bookmarks", GetUserPublicBookmarksController);
userRoute.post("/users/:id/follow", FollowUserController);
userRoute.post("/users/:id/unfollow", UnfollowUserController);

module.exports = userRoute;
