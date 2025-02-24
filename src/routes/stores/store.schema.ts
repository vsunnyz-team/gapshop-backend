import { z } from "@hono/zod-openapi";

export const StoreSchema = z.object({
  name: z.string().openapi({
    description: "ชื่อร้านที่ User ต้องการจะใช้",
  }),
  description: z.string().openapi({
    description: "รายละเอียดร้านน",
  }),
  address: z.string().openapi({
    description: "ที่อยู่ร้าน",
  }),
  email: z.string().email("รูปแบบอีเมลไม่ถูกต้อง").openapi({
    description: "อีเมลของทางร้าน",
  }),
  phone: z
    .string()
    .min(10, "รูปแบบเบอร์โทรศัพท์ไม่ถูกต้อง")
    .max(10, "รูปแบบเบอร์โทรศัพท์ไม่ถูกต้อง")
    .openapi({
      description: "เบอร์โทรศัพท์ของทางร้าน",
    }),
});
