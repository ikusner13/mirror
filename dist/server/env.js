"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.env = void 0;
const zod_1 = require("zod");
//TODO: kill process on error
const envSchema = zod_1.z.object({
    API_PORT: zod_1.z
        .preprocess((arg) => parseInt(arg, 10), zod_1.z.number().positive())
        .default(5000),
    CLIENT_PORT: zod_1.z
        .preprocess((arg) => parseInt(arg, 10), zod_1.z.number().positive())
        .default(3000),
    NODE_ENV: zod_1.z.enum(["development", "production", "test"]),
    WEATHER_API_KEY: zod_1.z.string().min(1),
});
exports.env = envSchema.parse(process.env);
