import {Hono} from "hono";
import {getPing, getPingError} from "../handlers/ping.js";

const ping = new Hono();

ping.get("/", getPing);
ping.get("/error", getPingError)

export default ping;