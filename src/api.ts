import {Hono} from "hono";
import ping from "./routes/ping.js";
import {StatusCodes} from "http-status-codes";
import upload from "./routes/upload.js";
import {cors} from "hono/cors";
import {cleanup} from "./routes/cleanup.js";

const api = new Hono()

api.notFound((c)=>{
    return c.json({
        status: 404,
        message: "Oops! Seems like you are lost"
    }, StatusCodes.NOT_FOUND)
})

api.onError((err, c)=>{
    console.error(err.message);
    console.log(err.cause);
    return c.json({
        status: 500,
        message: "Oops! Something went wrong"
    }, StatusCodes.INTERNAL_SERVER_ERROR)
})

api.route("/ping", ping);
api.route("/upload", upload);
api.route("/cleanup", cleanup);

export default api;