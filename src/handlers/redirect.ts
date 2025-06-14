import type {Context} from "hono";
import prisma from "../lib/prisma.js";
import {StatusCodes} from "http-status-codes";

export async function redirectToPage(c:Context){
    console.log("redirectToPage called");
    const slug = c.req.param("slug");
    const record = await prisma.upload.findUnique({
        where:{
            shortlink: slug
        }
    })

    if(!record || record.expiresAt.getTime() < new Date().getTime()) {
        return c.text('Link expired or not found', StatusCodes.NOT_FOUND)
    }

    return c.redirect(record.path, StatusCodes.MOVED_TEMPORARILY);
}