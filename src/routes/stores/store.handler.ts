import { OpenAPIHono } from "@hono/zod-openapi";
import { postCreateStoreRoute } from "./store.controller";
import prisma from "../../libs/prisma";

const app = new OpenAPIHono();

app.openapi(postCreateStoreRoute, async (c) => {
  const body = await c.req.json();
  const user = c.get("user");
  try {
    const createStore = await prisma.$transaction([
      prisma.store.create({
        data: {
          name: body.name,
          description: body.description,
          address: body.address,
          email: body.email,
          phone: body.phone,
          User: {
            connect: user,
          },
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      }),
    ]);
    return c.json({
      message: "Store created successfully",
      data: createStore,
    });
  } catch (e: any) {
    return c.json(
      {
        message: "Something went wrong",
      },
      e.message
    );
  }
});

export default app;
