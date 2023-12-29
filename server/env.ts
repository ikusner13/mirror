import { z } from "zod";

const envSchema = z.object({
  // NODE_ENV: z.enum(["development", "production", "test"]),
  API_PORT: z
    .preprocess((arg) => parseInt(arg as string, 10), z.number().positive())
    .default(5000),
  CLIENT_PORT: z
    .preprocess((arg) => parseInt(arg as string, 10), z.number().positive())
    .default(3000),
  WEATHER_API_KEY: z.string().min(1),
});

export const env = envSchema.parse(process.env);
