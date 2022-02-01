import { Router } from "express";

import CreateCategoryController from "../controllers/Category/Create.controller";
import DeleteCategoryController from "../controllers/Category/Delete.controller";
import UpdateCategoryController from "../controllers/Category/Update.controller";
import CategoriesController from "../controllers/Category/Categories.controller";

const categoryRoute = Router();

categoryRoute.post("/Category/create", CreateCategoryController);
categoryRoute.patch("/Category/:id/update", UpdateCategoryController);
categoryRoute.delete("/Category/:id/delete", DeleteCategoryController);
categoryRoute.get("/Categories", CategoriesController);

module.exports = categoryRoute;
