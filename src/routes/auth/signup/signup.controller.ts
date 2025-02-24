import { createRoute, z } from "@hono/zod-openapi";
import { SignupSchema } from "./signup.schema.js";

export const postSignupRoute = createRoute({
  method: "post",
  path: "/",
  summary: "Signup",
  description: "Signup for a new account",
  tags: ["Auth"],
  middleware: [],
  security: [],
  request: {
    body: {
      content: {
        "application/json": { schema: SignupSchema },
      },
    },
  },
  responses: {
    200: {
      description: "Signup successful",
    },
    401: {
      description: "Unauthorized",
    },
    404: {
      description: "Not Found",
    },
  },
});
