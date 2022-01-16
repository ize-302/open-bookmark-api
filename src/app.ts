import express from "express";
const app = express();
import dotenv from "dotenv";
const api = require("./routes/index");
const cors = require("cors");
const dbConnect = require("./middleware/connection");
import { ReasonPhrases, StatusCodes } from "http-status-codes";

dotenv.config();

app.use(express.json());

// Setup CORS
let corsOptions = {
  origin: process.env.FRONTEND_URL,
  optionsSuccessStatus: 200, // For legacy browser support
};
app.use(cors(corsOptions));

// api route
app.use("/api/v1", api);

// invalid route
app.all("*", (req, res) => {
  res.status(StatusCodes.NOT_FOUND).json({ message: ReasonPhrases.NOT_FOUND });
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
