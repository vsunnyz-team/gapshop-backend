import { createRoute, z } from "@hono/zod-openapi";
import { authenticateToken } from "../../libs/middlewares/authenticateToken";
import { TransportSchema } from "./tansports.schema"

export const postTransportRoute = createRoute({
    method: "post",
    path: "/new",
    summary: "Create Transport",
    description: "create transport for transport product to user",
    middleware: [authenticateToken],
    tags: ["Transports"],
    request: {
        body: {
            content: {
                "application/json": {
                    schema: TransportSchema
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