import { OpenAPIHono } from "@hono/zod-openapi";
import { postSignupRoute } from "./signup.controller.js";
import prisma from "../../../libs/prisma.js";
import bcrypt from "bcryptjs";

const app = new OpenAPIHono();

app.openapi(postSignupRoute, async (c) => {
  const body = await c.req.json();
  const hashpassword = await bcrypt.hash(body.password, 10);
  try {
    const userData = prisma.users.create({
      data: {
        firstName: body.firstName,
        lastName: body.lastName,
        email: body.email,
        password: hashpassword,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    });
    await prisma.$transaction([userData]);
    return c.json({
      message: "User created successfully"
    });
  } catch (e: any) {
    if (e.code === "P2002") {
      return c.json({ message: "Email already exists" });
    } else {
      return c.json({ message: "Something went wrong" },
        e.message
      );
    }
  }

});

export default app;