import http from "node:http";
import { mongoConnect } from "./db/mongo.js";
import app from "./app.js";

const PORT = process.env.PORT || 5000;

const server = http.createServer(app);

server.listen(PORT, async () => {
  await mongoConnect();
  console.log(`Server Is Listening On PORT: ${PORT}`);
});