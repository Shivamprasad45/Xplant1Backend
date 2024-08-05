import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import DbConnect from "../connections/mongoose_con";
import { Plant_Coords_route } from "../router/Plant_coords_route";
import cors from "cors";
import bodyParser from "body-parser";
import axios from "axios";
dotenv.config();
import cron from "node-cron";

const app: Express = express();
const port = process.env.PORT || 3001;
// Configure CORS with specific options
app.use(bodyParser.urlencoded({ extended: true }));
const corsOptions = {
  origin: "*", // Allow requests from this origin (adjust as needed)
  methods: ["GET", "POST", "PUT", "DELETE"], // Allow these HTTP methods
  allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"], // Allow these headers
  credentials: true, // Allow credentials (cookies, authorization headers, TLS client certificates)
  optionsSuccessStatus: 200, // Some legacy browsers (IE11, various SmartTVs) choke on 204
};

app.use(cors(corsOptions));
DbConnect();


const fetchData = async () => {
  try {
    const response = await axios.get("http://localhost:3001/");
    console.log("Data fetched:", response.data);
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

// Call fetchData immediately, then every 10 seconds
fetchData();
// Schedule a task to run every 10 seconds
cron.schedule("*/30 * * * *", fetchData);
app.use("/", Plant_Coords_route);
app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
