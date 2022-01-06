import { Router } from "express";

import CreateBookmarkController from "../controllers/Bookmark/Create.controller";
import DeleteBookmarkController from "../controllers/Bookmark/Delete.controller";
import BookmarksController from "../controllers/Bookmark/Bookmarks.controller";
import BookmarkController from "../controllers/Bookmark/Bookmark.controller";

const bookmarkRoute = Router();

bookmarkRoute.post("/bookmarks/create", CreateBookmarkController);
bookmarkRoute.delete("/bookmarks/:id", DeleteBookmarkController);
bookmarkRoute.get("/bookmarks", BookmarksController);
bookmarkRoute.get("/bookmarks/:id", BookmarkController);

module.exports = bookmarkRoute;
