import { Router } from "express";

import CreateBookmarkController from "../controllers/Bookmark/Create.controller";
import DeleteBookmarkController from "../controllers/Bookmark/Delete.controller";
import BookmarksController from "../controllers/Bookmark/Bookmarks.controller";
import BookmarkController from "../controllers/Bookmark/Bookmark.controller";
import UpdateBookmarkController from "../controllers/Bookmark/UpdateBookmark.controller";

const bookmarkRoute = Router();

bookmarkRoute.post("/bookmarks", CreateBookmarkController);
bookmarkRoute.delete("/bookmarks/:id", DeleteBookmarkController);
bookmarkRoute.get("/bookmarks", BookmarksController);
bookmarkRoute.get("/bookmarks/:id", BookmarkController);
bookmarkRoute.patch("/bookmarks/:id", UpdateBookmarkController);

module.exports = bookmarkRoute;
