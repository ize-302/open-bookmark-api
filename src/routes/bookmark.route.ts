import { Router } from "express";

import CreateBookmarkController from "../controllers/Bookmark/Create.controller";
import DeleteBookmarkController from "../controllers/Bookmark/Delete.controller";
import BookmarksController from "../controllers/Bookmark/Bookmarks.controller";
import BookmarkController from "../controllers/Bookmark/Bookmark.controller";
import UpdateBookmarkController from "../controllers/Bookmark/Update.controller";

const bookmarkRoute = Router();

bookmarkRoute.post("/bookmarks/create", CreateBookmarkController);
bookmarkRoute.get("/bookmarks", BookmarksController);
bookmarkRoute.get("/bookmarks/:id", BookmarkController);
bookmarkRoute.patch("/bookmarks/:id/update", UpdateBookmarkController);
bookmarkRoute.delete("/bookmarks/:id/delete", DeleteBookmarkController);

module.exports = bookmarkRoute;
