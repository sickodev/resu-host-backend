import {configDotenv} from "dotenv";

type EnvironmentVariables = {
    Port: number,
    SupabaseUrl: string,
    SupabaseServiceKey: string,
    SupabaseBucket: string,
}

export function loadEnvironmentVariables():EnvironmentVariables {
    configDotenv();
    if(process.env.PORT === undefined) {
        console.log("Environment variables not defined");
        return process.exit(1);
    }
    return {
        Port: Number(process.env.PORT),
        SupabaseBucket: process.env.SUPABASE_BUCKET!,
        SupabaseServiceKey: process.env.SUPABASE_SERVICE_KEY!,
        SupabaseUrl: process.env.SUPABASE_URL!,
    };
}