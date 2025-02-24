import { z } from "@hono/zod-openapi";

export const BrandsSchema = z.object({
    name: z.string(),
    description: z.string().nullable(),
    logo: z.string().nullable(),
})