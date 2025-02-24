import { createRoute, z } from "@hono/zod-openapi";
import { StoreSchema } from "./store.schema";
import { authenticateToken } from "../../libs/middlewares/authenticateToken";

export const postCreateStoreRoute = createRoute({
    method: "post",
    path: "/new",
    summary: "Create Store",
    description: "User create own store",
    middleware: [authenticateToken],
    tags: ["Store"],
    request: {
        body: {
            content: {
                "application/json": {
                    schema: StoreSchema
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
          description: "not found",
        },
      },
})