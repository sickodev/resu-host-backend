import {Hono} from "hono";
import {cleanUp} from "../handlers/cleanup.js";

const cleanup = new Hono();

cleanup.get("/", cleanUp)

export {cleanup}