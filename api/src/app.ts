import express from "express";
import cors from "cors";

import memberRouter
  from "./routes/member";

import trainerRouter
  from "./routes/trainer";

const app = express();

app.use(express.json());

app.use(cors({
  origin: "http://localhost:4200"
}));

app.get(
  "/api/health",
  (_request, response) => {

    response.json({
      success: true,
      message: "API is running"
    });
  }
);

app.use(
  "/api/members",
  memberRouter
);

app.use(
  "/api/trainers",
  trainerRouter
);

export default app;