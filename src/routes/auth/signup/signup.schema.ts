import { z } from "@hono/zod-openapi";

export const SignupSchema = z.object({
  firstName: z
    .string()
    .min(4, "ชื่อจริง ต้องมีความยาวอย่างน้อย 4 ตัวอักษร")
    .max(20, "ชื่อจริง ต้องมีความยาวไม่เกิน 20 ตัวอักษร")
    .openapi({
      example: "Suthan",
    }),
  lastName: z
    .string()
    .min(4, "นามสกุล ต้องมีความยาวอย่างน้อย 4 ตัวอักษร")
    .max(20, "นามสกุล ต้องมีความยาวไม่เกิน 20 ตัวอักษร")
    .openapi({
      example: "Ganesh",
    }),
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
});
