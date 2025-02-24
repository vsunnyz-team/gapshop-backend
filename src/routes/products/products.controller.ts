import { createRoute, z } from "@hono/zod-openapi";
import { authenticateToken } from "../../libs/middlewares/authenticateToken";
import { ProductSchema } from "./products.schema";

export const postCreateProducts = createRoute({
  method: "post",
  path: "/new",
  summary: "Create products",
  description: "User Create products for sell in his store",
  middleware: [authenticateToken],
  tags: ["Products"],
  request: {
    body: {
      content: {
        "application/json": {
          schema: ProductSchema,
        },
      },
    },
  },
  responses: {
    200: {
      description: "Create successful",
    },
    401: {
      description: "Unauthorized",
    },
    404: {
      description: "Product not found",
    },
  },
});

export const getPageProduct = createRoute({
  method: "get",
  path: "/:page",
  summary: "list users page records",
  description: "pagination with list row of user",
  tags: ["Products"],
  middleware: [authenticateToken],
  security: [],
  request: {
    params: z.object({
      page: z.string(),
    }),
  },
  responses: {
    200: {
      description: "Success",
    },
    401: {
      description: "Unauthorized",
    },
  },
});
