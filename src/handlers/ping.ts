import type {Context} from "hono";
import {StatusCodes} from "http-status-codes";

export function getPing(c: Context){
    return c.json({
        status: StatusCodes.OK,
        message: "API Working Fine",
    }, StatusCodes.OK);
}

export function getPingError(c: Context){
    return c.json({
        status: StatusCodes.INTERNAL_SERVER_ERROR,
        message: "API Throwing Error",
    }, StatusCodes.INTERNAL_SERVER_ERROR)
}