import { createMiddleware } from "hono/factory";
import prisma from "../prisma";
import { getCookie } from "hono/cookie";
import { verify  } from "hono/jwt";

export const authenticateToken = createMiddleware(async (c, next) => {
    console.log("Authenticating is running");
    try{
        const token = getCookie(c, "token");
        const payload = await verify(token as string, process.env.SERCET_KEY as string);
  
        const user = await prisma.users.findUnique({
            where: {
                email: (payload as any).email,
            },
        });
        if(!user){
            throw new Error("Unauthorized");
        }
        c.set("user", user);
        await next();
    }
    catch(e: any){
        return c.json({message: "Unauthorized"}, 401);
    }
});
