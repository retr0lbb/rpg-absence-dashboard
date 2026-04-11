import z from "zod/v4"

const envSchema = z.object({
    DATABASE_URL: z.url().nonempty(),
    DIRECT_URL: z.url().nonempty()
})

export const env = envSchema.parse(process.env)