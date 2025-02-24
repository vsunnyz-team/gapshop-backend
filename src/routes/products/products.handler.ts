import { OpenAPIHono } from "@hono/zod-openapi";
import {
    postCreateProducts,
    getPageProduct
} from "./products.controller"
import prisma from "../../libs/prisma.js";

const app = new OpenAPIHono();

app.openapi(getPageProduct, async (c) => {
    const page = parseInt(c.req.param("page"), 1);
    try {
        const pageSize = 10
        // const skip = (page - 1) * pageSize
        // const take = pageSize
        const getproduct = await prisma.products.findMany({
            skip: 10,
            take: 10,
            orderBy: { createdAt: 'desc' },
        });

        const totalRecords = await prisma.products.count();
        const totalPages = Math.ceil(totalRecords / pageSize);

        return c.json({
            page,
            pageSize,
            totalRecords,
            totalPages,
            data: getproduct
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

app.openapi(postCreateProducts, async (c) => {
    const body = await c.req.json();
    try {
        const gettransport = await prisma.transports.findUnique({
            where: {
                id: body.transportsId,
            }
        });
        const getstore = await prisma.store.findUnique({
            where: {
                id: body.storeId,
            }
        });
        const createProduct = await prisma.$transaction([
            prisma.products.create({
                data: {
                    name: body.name,
                    img: body.img,
                    price: body.price,
                    description: body.description,
                    amount: body.amount,
                    weight: body.weight,
                    width: body.width,
                    length: body.length,
                    height: body.height,
                    status: body.status,
                    tags: body.tags,
                    type: body.type,
                    Store: {
                        connect: getstore ? { id: getstore.id } : undefined,
                    },
                    Transport: {
                        connect: gettransport ? { id: gettransport.id } : undefined,
                    },
                    createdAt: new Date(),
                    updatedAt: new Date(),
                }
            })
        ])
        return c.json({
            message: "Product created successfully",
            data: createProduct,
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