require('dotenv').config();

const { z } = require("zod");

const schema = z.object({
    DATABASE_NAME: z.string().min(2, "DATABASE_NAME cannot be empty"),
    DATABASE_USERNAME: z.string().min(2, "DATABASE_USERNAME cannot be empty"),
    DATABASE_PASSWORD: z.string().min(2, "DATABASE_PASSWORD cannot be empty"),
    DATABASE_HOST: z.string().min(2, "DATABASE_HOST cannot be empty"),
    JWT_SECRET: z.string().min(2, "JWT_SECRET cannot be empty"),
    BCRYPT_SALT_ROUNDS: z.preprocess(e => parseInt(e), z.number().nonnegative()),
});

module.exports = schema.parse(process.env);