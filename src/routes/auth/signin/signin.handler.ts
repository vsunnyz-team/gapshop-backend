import { OpenAPIHono } from "@hono/zod-openapi";
import { postsigninRoute } from "./signin.controller";
import { sign } from 'hono/jwt'
import {
    setCookie,
  } from 'hono/cookie'
import prisma from "../../../libs/prisma";
import bcrypt from "bcryptjs";

const app = new OpenAPIHono();

app.openapi(postsigninRoute, async (c) => {
    const body = await c.req.json();
    const user = await prisma.users.findUnique({
        where: {
            email: body.email
        }
    })
    if (!user) {
        return c.json({
            message: "User not found"
        }, 404)
    }
    const validPassword = await bcrypt.compare(body.password, user.password)
    if (!validPassword) {
        return c.json({
            message: "Password is incorrect"
        }, 400)
    }
    
    const payload = {
        email: user.email,
    }

    const token = await sign(payload, process.env.SERCET_KEY as string)
    setCookie(c, 'token', token, {secure: true});
    return c.json({
        message: "Signin successful",
        token
    })
});

export default app;