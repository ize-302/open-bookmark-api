const { Router } = require("express");
const mainRouter = Router();
const bookmarkRoute = require("./bookmark.route");
const trashRoute = require("./trash.route");

mainRouter.use("/", bookmarkRoute);
mainRouter.use("/", trashRoute);

mainRouter.get(
  "/",
  (
    _req: any,
    res: {
      status: (arg0: number) => {
        (): any;
        new (): any;
        send: { (arg0: string): void; new (): any };
      };
    }
  ) => {
    res
      .status(200)
      .send(
        "The Incredible True Story & Transformation of the man who saved the world"
      );
  }
);

module.exports = mainRouter;
