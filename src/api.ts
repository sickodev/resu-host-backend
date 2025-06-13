import {Hono} from "hono";
import ping from "./routes/ping.js";
import {StatusCodes} from "http-status-codes";

const api = new Hono().basePath("/api");

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

export default api;