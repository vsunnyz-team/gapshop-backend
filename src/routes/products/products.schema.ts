import { z } from "@hono/zod-openapi";

export const ProductSchema = z.object({
  name: z.string().openapi({
    example: "ข้าวผัดหมู",
  }),
  img: z.string().url().nullable(),
  price: z.number().openapi({
    example: 50,
  }),
  description: z.string().nullable(),
  amount: z.number(),
  weight: z.number(),
  width: z.number(),
  length: z.number(),
  height: z.number(),
  status: z.enum(["Active", "Padding", "Sold"]).default("Padding"),
  tags: z.enum(["New", "Hot"]).nullable(),
  type: z.enum(["Normal", "Set", "Attribute"]).nullable(),
  storeId: z.number(),
  brandId: z.number().nullable(),
  transportsId: z.number(),
});
