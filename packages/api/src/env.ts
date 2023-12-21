import { z } from "zod";

const envSchema = z.object({
  // NODE_ENV: z.enum(["development", "production", "test"]),
  PORT: z
    .preprocess((arg) => parseInt(arg as string, 10), z.number().positive())
    .default(3000),
});

export const env = envSchema.parse(process.env);
