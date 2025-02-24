import { createRoute, z } from "@hono/zod-openapi";
import { authenticateToken } from "../../libs/middlewares/authenticateToken";

export const getAllUsers = createRoute({
    method: "get",
    path: "/",
    summary: "Get all users",
    description: "Get all users",
    tags: ["Users"],
    middleware: [authenticateToken],
    security: [],
    responses: {
        200: {
            description: "Success",
        },
        401: {
            description: "Unauthorized",
        },
    }
})

export const getMe = createRoute({
    method: "get",
    path: "/me",
    summary: "Get present user profile",
    description: "Get present user profile",
    tags: ["Users"],
    middleware: [authenticateToken],
    security: [],
    responses: {
        200: {
            description: "Success",
        },
        401: {
            description: "Unauthorized",
        },
    }
})