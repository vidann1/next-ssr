// server.js
import * as next from "next";
import routes from "./routes";
const app = next({ dev: process.env.NODE_ENV !== "production" });
const handler = routes.getRequestHandler(app);

// Without express
import { createServer } from "http";

app.prepare().then(() => {
  createServer(handler).listen(3000);
});
