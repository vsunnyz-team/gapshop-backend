import { serve } from '@hono/node-server'
import { logger } from "hono/logger";
import { cors } from "hono/cors";
import { OpenAPIHono } from "@hono/zod-openapi";
import { apiReference } from "@scalar/hono-api-reference";

// Importing API routes to Docs
import usersRoute from './routes/users/user.handler.js'
import authRoute from './routes/auth/auth.handler.js'
import storeRoute from './routes/stores/store.handler.js'
import productRoute from './routes/products/products.handler.js'
import brandRoute from './routes/brands/brands.handler.js'
import transportRoute from './routes/transports/transport.handler.js'

const app = new OpenAPIHono()

app.doc("/openapi.json", {
  openapi: "3.0.0",
  info: {
    title: "GapShop API",
    version: "1.0.0",
  },
})


// Create Specs API Routes
app.get(
  "/docs",
  apiReference({
    spec: {
      url: "/openapi.json",
    },
  })
);

app.use(logger());
app.use(cors());

app.route("/auth", authRoute)
app.route("/users", usersRoute)
app.route("/store", storeRoute)
app.route("/product", productRoute)
app.route("/brand", brandRoute)
app.route("/transport", transportRoute)

const port = 3000
console.log(`Server is running on http://localhost:${port}`)

serve({
  fetch: app.fetch,
  port
})
