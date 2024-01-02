import { z } from "zod";

//TODO: kill process on error
const envSchema = z.object({
  API_PORT: z
    .preprocess((arg) => parseInt(arg as string, 10), z.number().positive())
    .default(5000),
  CLIENT_PORT: z
    .preprocess((arg) => parseInt(arg as string, 10), z.number().positive())
    .default(3000),
  NODE_ENV: z.enum(["development", "production", "test"]),
  WEATHER_API_KEY: z.string().min(1),
});

export const env = envSchema.parse(process.env);
