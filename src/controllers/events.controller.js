import { ObjectId } from "mongodb";
import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import { fileUploader, fileDeleter } from "../utils/cloudinary.js";
import { db } from "../db/mongo.js";

const createEvent = asyncHandler(async (req, res) => {
  req.body.createdAt = new Date();
  req.body.updateAt = new Date();
  req.body.images = [];

  if (req.body.rigor_rank && parseInt(req.body.rigor_rank) === NaN)
    throw new ApiError(401, "Only Numbers Are Allowed In Rigor Rank!");
  else if (req.body.rigor_rank)
    req.body.rigor_rank = parseInt(req.body.rigor_rank);

  let imagesPath;

  if (
    req.files &&
    Array.isArray(req.files.images) &&
    req.files.images.length > 0
  )
    imagesPath = req.files.images;
  else throw new ApiError(401, "Please Provide Event Image!");

  const eventImages = await fileUploader(
    req.body.name,
    req.body.name + "_Image",
    imagesPath
  );

  if (!eventImages.length)
    throw new ApiError(500, "Something Went Wrong While Uploading Images!");

  eventImages.map((image) => req.body.images.push(image.url));

  const event = await db.collection("events").insertOne(req.body);

  if (!event) throw new ApiError(500, "Failed To Create Event!");

  res
    .status(201)
    .json(new ApiResponse(201, true, "Event Created Successfully!", event));
});

const getAllEvents = asyncHandler(async (req, res) => {
  const { id } = req.query;
  const page = parseInt(req.query.page, 10) || 1;
  const pageSize = parseInt(req.query.limit, 10) || 10;
  const sort = req.query?.type === "latest" ? 1 : -1;
  const events = [];

  // Fetch Single Event By Id (This Routing Doesn't Makes Sense Instead Of "Events/?id" It Should've Been Events/:id So It Can Be Handled In Another Route)
  if (id) {
    if (!ObjectId.isValid(id)) throw new ApiError(400, "Incorrect Id!");
    const event = await db
      .collection("events")
      .findOne({ _id: ObjectId.createFromHexString(id) });
    if (!event) return new ApiResponse(200, true, "No Events Found!");
    return res
      .status(200)
      .json(new ApiResponse(200, true, "Event Fetched Successfully!", event));
  }

  // Fetch All Event's
  await db
    .collection("events")
    .aggregate([
      {
        $facet: {
          metadata: [{ $count: "totalCount" }],
          data: [
            { $skip: (page - 1) * pageSize },
            { $limit: pageSize },
            { $sort: { schedule: sort } },
          ],
        },
      },
    ])
    .forEach((event) => events.push(event));

  if (!events) return new ApiResponse(200, true, "No Events Found!");

  res
    .status(201)
    .json(
      new ApiResponse(201, true, "Events Fetched Successfully!", events[0])
    );
});

const updateEvent = asyncHandler(async (req, res) => {
  const { id } = req.params;
  req.body.updateAt = new Date();
  req.body.images = [];

  if (!ObjectId.isValid(id)) throw new ApiError(400, "Incorrect Id!");

  const eventDetails = await db
    .collection("events")
    .findOne({ _id: ObjectId.createFromHexString(id) });

  if (!eventDetails) return new ApiResponse(200, true, "No Events Found!");

  let imagesPath;

  if (
    req.files &&
    Array.isArray(req.files.images) &&
    req.files.images.length > 0
  )
    imagesPath = req.files.images;
  else throw new ApiError(401, "Please Provide Event Image!");

  if (eventDetails.images?.length > 0) {
    const deleteImages = await fileDeleter(eventDetails.images, imagesPath);
    if (!deleteImages) throw new ApiError(500, "Failed To Delete Images!");
  }

  const eventImages = await fileUploader(
    req.body.name,
    req.body.name + "_Image",
    imagesPath
  );

  if (!eventImages.length)
    throw new ApiError(500, "Something Went Wrong While Uploading Images!");

  eventImages.map((image) => req.body.images.push(image.url));

  const updatedEvent = await db
    .collection("events")
    .findOneAndUpdate(
      { _id: ObjectId.createFromHexString(id) },
      { $set: { ...req.body } },
      { returnDocument: "after" }
    );

  if (!updateEvent) return new ApiResponse(200, true, "No Events Found!");

  res
    .status(200)
    .json(
      new ApiResponse(200, true, "Event Fetched Successfully!", updatedEvent)
    );
});

const deleteEvent = asyncHandler(async (req, res) => {
  const { id } = req.params;

  if (!ObjectId.isValid(id)) throw new ApiError(400, "Incorrect Id!");

  const eventDetails = await db
    .collection("events")
    .findOne({ _id: ObjectId.createFromHexString(id) });

  if (!eventDetails) return new ApiResponse(200, true, "No Events Found!");

  if (eventDetails.images?.length > 0) {
    const deleteImages = await fileDeleter(eventDetails.images);
    if (!deleteImages) throw new ApiError(500, "Failed To Delete Images!");
  }

  const event = await db
    .collection("events")
    .findOneAndDelete({ _id: ObjectId.createFromHexString(id) });

  if (!event) return new ApiResponse(200, true, "No Events Found!");

  res
    .status(200)
    .json(new ApiResponse(200, true, "Event Deleted Successfully!", event));
});

export { createEvent, getAllEvents, updateEvent, deleteEvent };