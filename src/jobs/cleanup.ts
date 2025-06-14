import { env } from '../utils/env.js'
import prisma from "../lib/prisma.js";

const BATCH_SIZE = 10

export async function cleanupExpiredUploads(): Promise<number> {
    const now = new Date()
    const expiredFiles = await prisma.upload.findMany({
        where: { expiresAt: { lt: now } },
        select: { id: true, filename: true, path: true }
    })

    if (expiredFiles.length === 0) {
        console.log('No expired files to clean.')
        return 0
    }

    console.log(`🔍 Found ${expiredFiles.length} expired files. Beginning batch cleanup...`)
    let deletedCount = 0

    for (let i = 0; i < expiredFiles.length; i += BATCH_SIZE) {
        const batch = expiredFiles.slice(i, i + BATCH_SIZE)

        const results = await Promise.allSettled(batch.map(async (file) => {
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
                    const err = await res.text()
                    console.error(`❌ Failed to delete storage file ${file.filename}:`, err)
                    return false
                }

                await prisma.upload.delete({ where: { id: file.id } })
                console.log(`✅ Deleted: ${file.filename}`)
                return true
            } catch (err) {
                console.error(`❌ Error deleting ${file.filename}:`, err)
                return false
            }
        }))

        deletedCount += results.filter(r => r.status === 'fulfilled' && r.value === true).length

        await new Promise(res => setTimeout(res, 500)) // Optional throttle
    }

    console.log(`✅ Cleanup job complete. Purged: ${deletedCount}`)
    return deletedCount
}

