import express from "express";
const app = express();
import dotenv from "dotenv";
const api = require("./routes/index");
const cors = require("cors");
const dbConnect = require("./middleware/connection");

dotenv.config();

app.use(express.json());

// Setup CORS
const ALLOWED_ORIGINS = [
  process.env.FRONTEND_URL,
  `https://localhost:${process.env.PORT}`,
];
app.use((req, res, next) => {
  let origin = req.headers.origin;
  let theOrigin =
    ALLOWED_ORIGINS.indexOf(origin) >= 0 ? origin : ALLOWED_ORIGINS[0];
  res.header("Access-Control-Allow-Origin", theOrigin);
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );

  next();
});

// api route
app.use("/api/v1", api);

// invalid route
app.all("*", (req, res) => {
  res.status(404).send("route is invalid");
});

// mongodb conection
dbConnect
  .once("open", (_: any) => {
    console.log("Database connected");
  })
  .on("error", (err: any) => {
    console.error("connection error:", err);
  });

app.listen(process.env.PORT, () => {
  console.log(
    `⚡️[server]: Server is running at https://localhost:${process.env.PORT}`
  );
});
