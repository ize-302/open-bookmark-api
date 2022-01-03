import express from "express";
const app = express();
import dotenv from "dotenv";
const api = require("./routes/index");
const cors = require("cors");
const dbConnect = require("./middleware/connection");

dotenv.config();

app.use(express.json());

// Setup CORS
let corsOptions = {
  origin: `http://localhost:8080`,
  optionsSuccessStatus: 200, // For legacy browser support
};
app.use(cors(corsOptions));

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
