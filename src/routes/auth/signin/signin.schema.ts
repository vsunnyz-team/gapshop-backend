import { z } from "@hono/zod-openapi";

export const SigninSchema = z.object({
    email: z.string().email("รูปแบบอีเมลไม่ถูกต้อง").openapi({
        example: "gappy@gmail.com",
    }),
    password: z
        .string()
        .min(4, "Password ต้องมีความยาวอย่างน้อย 4 ตัวอักษร")
        .max(32, "Password ต้องมีความยาวไม่เกิน 32 ตัวอักษร")
        .openapi({
            description: "Password ต้องมีความยาาวอย่างน้อย 4 ตัวอักษร และไม่เกิน 32 ตัวอักษร",
        }),
})
