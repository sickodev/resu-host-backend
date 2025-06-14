import type {Context} from "hono";
import {StatusCodes} from "http-status-codes";
import {env} from "../utils/env.js";
import prisma from "../lib/prisma.js";

export function getUploadPing(c:Context) {
    return c.json({
        status: 200,
        message: "Upload endpoint working fine"
    }, StatusCodes.OK);
}

export async function uploadFile(c: Context) {
    const body = await c.req.parseBody();
    const file = body.file;

    if (!file || !(file instanceof File)) {
        return c.json(
            {
                status: 400,
                message: "No file uploaded",
            },
            StatusCodes.BAD_REQUEST
        );
    }

    const fileName = `${Date.now()}-${file.name}`;
    const uploadURL = `${env.SUPABASE_URL}/storage/v1/object/${env.SUPABASE_BUCKET}/${fileName}`;
    const publicURL = `${env.SUPABASE_URL}/storage/v1/object/public/${env.SUPABASE_BUCKET}/${fileName}`
    const buffer = Buffer.from(await file.arrayBuffer());

    const uploadResult = await fetch(uploadURL, {
        method: "POST",
        headers: {
            Authorization: `Bearer ${env.SUPABASE_SERVICE_KEY}`,
            "Content-Type": file.type,
            "x-upsert": "true",
        },
        body: buffer,
    });

    const responseText = await uploadResult.text();
    let metadata = {};

    try {
        metadata = JSON.parse(responseText);
    } catch (err) {
        throw new Error(`${err}`);
    }

    if (!uploadResult.ok) {
        return c.json(
            {
                status: 500,
                message: "Upload failed",
                error: responseText,
            },
            StatusCodes.INTERNAL_SERVER_ERROR
        );
    }

    const expiresAt = new Date(Date.now() + 1000 * 60 * 60 * 24 * 15);

    // @ts-ignore
    await prisma.upload.create({
        data: {
            filename: file.name,
            path: publicURL,
            expiresAt,
        },
    })

    return c.json(
        {
            status: 200,
            message: "Upload complete",
            data: {
                filePath: uploadURL,
                fileName: fileName,
            },
            metadata,
        },
        StatusCodes.CREATED
    );
}