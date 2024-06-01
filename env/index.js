require('dotenv').config();

const { z } = require("zod");

const schema = z.object({
    DATABASE_NAME: z.string(),
    DATABASE_USERNAME: z.string(),
    DATABASE_PASSWORD: z.string(),
    DATABASE_HOST: z.string(),
});

module.exports = schema.parse(process.env);