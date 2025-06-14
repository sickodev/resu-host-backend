import baseX from 'base-x';
import { PrismaClient } from '@prisma/client'
import {randomBytes} from "node:crypto";

const BASE62 = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
const base62 = baseX(BASE62)

export async function shorten(prisma: PrismaClient, length = 6): Promise<string>{
    while(true){
        const slug = base62.encode(randomBytes(6)).slice(0, length)
        const exists = await prisma.upload.findUnique({
            where:{
                shortlink: slug,
            }
        })
        if(!exists){
            return slug
        }
    }
}