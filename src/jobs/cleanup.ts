import { env } from '../utils/env.js'
import prisma from "../lib/prisma.js";

const BATCH_SIZE = 20

async function deleteFileAndRecord(file: { id: string; filename: string; path: string }) {
    const filename = file.path.split('/').pop()
    const deleteUrl = `${env.SUPABASE_URL}/storage/v1/object/${env.SUPABASE_BUCKET}/${filename}`

    try {
        const res = await fetch(deleteUrl, {
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${env.SUPABASE_SERVICE_KEY}`,
            },
        })

        if (!res.ok) {
            const errorText = await res.text()
            console.error(`❌ Failed to delete storage file ${file.filename}:`, errorText)
            return
        }

        await prisma.upload.delete({ where: { id: file.id } })
        console.log(`✅ Deleted: ${file.filename}`)

    } catch (err) {
        console.error(`❌ Error deleting ${file.filename}:`, err)
    }
}

async function cleanupExpiredUploads() {
    const now = new Date()
    const expiredFiles = await prisma.upload.findMany({
        where: { expiresAt: { lt: now } },
        select: { id: true, filename: true, path: true }
    })

    if (expiredFiles.length === 0) {
        console.log('No expired files to clean.')
        return
    }

    console.log(`🔍 Found ${expiredFiles.length} expired files. Beginning batch cleanup...`)

    for (let i = 0; i < expiredFiles.length; i += BATCH_SIZE) {
        const batch = expiredFiles.slice(i, i + BATCH_SIZE)

        await Promise.allSettled(
            batch.map(file => deleteFileAndRecord(file))
        )

        // Optional: wait between batches if you want to throttle more
        await new Promise(res => setTimeout(res, 500))
    }

    console.log('✅ Cleanup job complete.')
}

cleanupExpiredUploads()
    .catch(err => {
        console.error('🚨 Cleanup job failed:', err)
    })
    .finally(() => prisma.$disconnect())
