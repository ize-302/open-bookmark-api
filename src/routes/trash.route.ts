import { Router } from "express";

import TrashBookmarkController from "../controllers/Trash/Trash.controller";
import UntrashBookmarkController from "../controllers/Trash/Untrash.controller";

const trashRoute = Router();

trashRoute.patch("/trash/:id/trash", TrashBookmarkController);
trashRoute.patch("/trash/:id/untrash", UntrashBookmarkController);

module.exports = trashRoute;
