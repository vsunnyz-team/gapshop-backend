import { OpenAPIHono } from "@hono/zod-openapi";
import { postTransportRoute } from "./transports.controller";
import prisma from "../../libs/prisma";

const app = new OpenAPIHono();

app.openapi(postTransportRoute, async (c) => {
  const body = await c.req.json();

  try {
    const createTransport = await prisma.$transaction([
      prisma.transports.create({
        data: {
          name: body.name,
          description: body.description,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      }),
    ]);
    return c.json({
      message: "Transport created successfully",
      data: createTransport,
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
