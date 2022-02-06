import { Router } from "express";

import verify from "../controllers/Auth/Auth.controller";
import refreshtoken from "../controllers/Auth/RefreshToken.controller";

const authRoute = Router();

authRoute.post("/auth/verify", verify);
authRoute.post("/auth/refreshtoken", refreshtoken);

module.exports = authRoute;
