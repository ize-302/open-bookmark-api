import express from "express";
const app = express();
import dotenv from "dotenv";
const api = require("./routes/index");
const cors = require("cors");
require("./config/connection");
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

app.listen(process.env.PORT, () => {
  console.log(
    `⚡️[server]: Server is running at https://localhost:${process.env.PORT}`
  );
});
