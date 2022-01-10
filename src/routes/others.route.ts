import { Router } from "express";

import FetchUrlTitleController from "../controllers/Others/FetchUrlTitle.controller";

const otherRoute = Router();

otherRoute.get("/fetchUrlTitle", FetchUrlTitleController);

module.exports = otherRoute;
