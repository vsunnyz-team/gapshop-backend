import { OpenAPIHono } from "@hono/zod-openapi";
import { postCreateBrandRoute } from "./brands.controller"
import prisma from "../../libs/prisma";

const app = new OpenAPIHono();

app.openapi(postCreateBrandRoute, async (c) => {
    const body = await c.req.json()

    try {
        const createBrands = await prisma.$transaction([
            prisma.brands.create({
                data: {
                    name: body.name,
                    description: body.description,
                    logo: body.logo,
                    createdAt: new Date(),
                    updatedAt: new Date()
                }
            })
        ]);
        return c.json({
            message: "Brand created successfully",
            data: createBrands,
          });
    }
    catch (e: any) {
        return c.json(
            {
              message: "Something went wrong",
              error: e,
              errorMessage: e.message
            },
          );
    }
})

export default app;
