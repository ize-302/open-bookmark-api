import { StatusCodes } from "http-status-codes";
const { Router } = require("express");
const mainRouter = Router();
const bookmarkRoute = require("./bookmark.route");
const trashRoute = require("./trash.route");
const otherRoute = require("./others.route");
const userRoute = require("./user.route");

mainRouter.use("/", bookmarkRoute);
mainRouter.use("/", trashRoute);
mainRouter.use("/", otherRoute);
mainRouter.use("/", userRoute);

mainRouter.get(
  "/",
  (
    _req: any,
    res: {
      status: (arg0: number) => {
        (): any;
        new (): any;
        json: any;
      };
    }
  ) => {
    res.status(StatusCodes.OK).json({
      message:
        "The Incredible True Story & Transformation of the man who saved the world",
    });
  }
);

module.exports = mainRouter;
