import { Router } from "express";

import CreateBookmarkController from "../controllers/Bookmark/Create.controller";
import DeleteBookmarkController from "../controllers/Bookmark/Delete.controller";
import BookmarksController from "../controllers/Bookmark/Bookmarks.controller";

const bookmarkRoute = Router();

bookmarkRoute.post("/bookmarks/create", CreateBookmarkController);
bookmarkRoute.delete("/bookmarks/:id/delete", DeleteBookmarkController);
bookmarkRoute.get("/bookmarks", BookmarksController);

module.exports = bookmarkRoute;
