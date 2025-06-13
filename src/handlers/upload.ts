import type {Context} from "hono";
import {StatusCodes} from "http-status-codes";

export function getUploadPing(c:Context) {
    return c.json({
        status: 200,
        message: "Upload endpoint working fine"
    }, StatusCodes.OK);
}

export async function uploadFile(c:Context) {
    const body = await c.req.parseBody();
    const file = body.file;

    if(!file || !(file instanceof File)) {
        return c.json({
            status: 400,
            message: "No file uploaded"
        }, StatusCodes.BAD_REQUEST)
    }

}