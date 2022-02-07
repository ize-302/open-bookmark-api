import { Router } from "express";

import verify from "../controllers/Auth/Auth.controller";
import refreshtoken from "../controllers/Auth/RefreshToken.controller";
import logout from "../controllers/Auth/Logout.controller";

const authRoute = Router();

authRoute.post("/auth/verify", verify);
authRoute.post("/auth/refreshtoken", refreshtoken);
authRoute.post("/auth/logout", logout);

module.exports = authRoute;
