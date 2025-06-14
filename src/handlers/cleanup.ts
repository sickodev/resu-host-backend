import type {Context} from "hono";
import {env} from "../utils/env.js";
import {StatusCodes} from "http-status-codes";
import {cleanupExpiredUploads} from "../jobs/cleanup.js";

export async function cleanUp(c: Context) {
    const authHeader = c.req.header('Authorization');
    const expectedKey = `Bearer ${env.CLEANUP_API_KEY}`

    if (authHeader === expectedKey) {
        return c.json({
            status: 401,
            message: 'Not authorized'
        }, StatusCodes.UNAUTHORIZED)
    }

    try {
        const purged = await cleanupExpiredUploads()
        return c.json(
            {
                status: 200,
                message: 'Cleanup completed',
                purged
            }, 200)
    } catch (err) {
        console.error('Cleanup error:', err)
        return c.json(
            {
                status: 500,
                message: 'Cleanup failed'
            }, 500)
    }
}