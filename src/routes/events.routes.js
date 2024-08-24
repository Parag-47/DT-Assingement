import { Router } from "express";
import { upload } from "../middlewares/multer.middleware.js";
import validateDto from "../middlewares/validateDto.middleware.js";
import validate from "../validation/jsonSchema.js";
import { createEvent, getAllEvents, updateEvent, deleteEvent } from "../controllers/events.controller.js";

const eventRouter = Router();

eventRouter.post("/events", upload.fields([
  {
    name: "images",
    maxCount: 5,
  },
]), validateDto(validate), createEvent);

eventRouter.get("/events", getAllEvents);

eventRouter.put("/events/:id", upload.fields([
  {
    name: "images",
    maxCount: 5,
  },
]), validateDto(validate), updateEvent);

eventRouter.delete("/events/:id", deleteEvent);

export default eventRouter;