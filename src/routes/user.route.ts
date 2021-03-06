import { Router } from "express";

import GetUserInfoController from "../controllers/User/GetUserInfo.controller";
import MyBookmarksController from "../controllers/User/MyBookmarks.controller";
import GetUserPublicBookmarksController from "../controllers/User/GetUserPublicBookmarks.controller";
import FollowUserController from "../controllers/User/Follow.controller";
import UnfollowUserController from "../controllers/User/Unfollow.controller";
import UserFollowersController from "../controllers/User/Followers.controller";
import UserFollowingController from "../controllers/User/Following.controller";

const userRoute = Router();

userRoute.get("/users/:id/info", GetUserInfoController);
userRoute.get("/users/mybookmarks", MyBookmarksController);
userRoute.get("/users/:id/bookmarks", GetUserPublicBookmarksController);
userRoute.post("/users/:id/follow", FollowUserController);
userRoute.post("/users/:id/unfollow", UnfollowUserController);
userRoute.get("/users/:id/followers", UserFollowersController);
userRoute.get("/users/:id/following", UserFollowingController);

module.exports = userRoute;
