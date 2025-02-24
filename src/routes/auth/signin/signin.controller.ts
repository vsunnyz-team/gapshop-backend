import { createRoute, z } from "@hono/zod-openapi";
import { SigninSchema } from "./signin.schema.js";

export const postsigninRoute = createRoute({
  method: "post",
  path: "/",
  summary: "Signin",
  description: "Login to the system",
  tags: ["Auth"],
  request: {
    body: {
      content: {
        "application/json": {
          schema: SigninSchema,
        },
      },
    },
  },
  responses: {
    200: {
      description: "Signin successful",
    },
    401: {
      description: "Unauthorized",
    },
    404: {
      description: "User not found",
    },
  },
});
