import { OpenAPIHono } from "@hono/zod-openapi";
import signupRoute from './signup/signup.handler.js'
import signinRoute from './signin/signin.handler.js'

const app = new OpenAPIHono()

app.route("/signup", signupRoute)
app.route("/signin", signinRoute)

export default app;