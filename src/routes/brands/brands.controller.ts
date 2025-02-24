import { createRoute, z } from "@hono/zod-openapi";
import { authenticateToken } from "../../libs/middlewares/authenticateToken";
import { BrandsSchema } from "./brands.schema"

export const postCreateBrandRoute = createRoute({
    method: "post",
    path: "/new",
    summary: "Create Brands",
    description: "Brands creating for product",
    middleware: [authenticateToken],
    tags: ["Brands"],
    request: {
        body: {
            content: {
                "application/json": {
                    schema: BrandsSchema
                }
            }
        }
    },
    responses: {
        200: {
            description: "Create successful",
          },
          401: {
            description: "Unauthorized",
          },
          404: {
            description: "Brand not found",
          },
    }
})