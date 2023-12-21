import { z } from "zod";

const envSchema = z.object({
  GOOGLE__CLIENT_ID: z.string(),
  GOOGLE__CLIENT_SECRET: z.string(),
  GOOGLE__REFRESH_TOKEN: z.string(),
  NODE_ENV: z.enum(["development", "production", "test"]),
  PORT: z
    .preprocess((arg) => parseInt(arg as string, 10), z.number().positive())
    .default(3000),
});

export const env = envSchema.parse(process.env);
