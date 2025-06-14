import {configDotenv} from "dotenv";

type EnvironmentVariables = {
    PORT: number,
    SUPABASE_URL: string,
    SUPABASE_SERVICE_KEY: string,
    SUPABASE_BUCKET: string,
    CLEANUP_API_KEY: string
    APP_HOST: string,
}

configDotenv();

export const env:EnvironmentVariables = {
    PORT: Number(process.env.PORT),
    SUPABASE_URL: process.env.SUPABASE_URL!,
    SUPABASE_SERVICE_KEY: process.env.SUPABASE_SERVICE_KEY!,
    SUPABASE_BUCKET: process.env.SUPABASE_BUCKET!,
    CLEANUP_API_KEY: process.env.CLEAN_API_KEY!,
    APP_HOST: process.env.APP_HOST!,
};