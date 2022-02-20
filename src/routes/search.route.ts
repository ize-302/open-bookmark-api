import { Router } from "express";

import GlobalSearchController from "../controllers/Search/GlobalSearch.controller";

const searchRoute = Router();
searchRoute.get("/search", GlobalSearchController);

module.exports = searchRoute;
