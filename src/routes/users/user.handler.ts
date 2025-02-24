import { OpenAPIHono } from "@hono/zod-openapi";
import {
    getAllUsers,
    getMe
} from "./users.controller.js";
import prisma from "../../libs/prisma.js";

const app = new OpenAPIHono();

app.openapi(getAllUsers, async (c) => {
    const users = await prisma.users.findMany();
    return c.json(users);
})

app.openapi(getMe, async (c) => {
    const user = c.get("user");
    return c.json(user);
})
export default app;