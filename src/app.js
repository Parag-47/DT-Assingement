import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import cors from "cors";
import eventRouter from "./routes/events.routes.js";

const app = express();

app.use(helmet());
app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
  })
);
app.use(morgan("combined"));
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use("/api/v3/app", eventRouter);

export default app;