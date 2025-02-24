import { z } from "@hono/zod-openapi";

export const TransportSchema = z.object({
    name: z.string(),
    description: z.string().nullable()
})