import { Router } from "express";

import verify from "../controllers/Auth/Auth.controller";

const authRoute = Router();

authRoute.post("/auth/verify", verify);

module.exports = authRoute;
