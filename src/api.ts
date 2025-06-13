import {Hono} from "hono";
import ping from "./routes/ping.js";

const api = new Hono().basePath("/api");

api.route("/ping", ping);

export default api;