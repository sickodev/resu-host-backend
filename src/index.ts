import { serve } from '@hono/node-server'
import api from "./api.js";
import {env} from "./utils/env.js";
import {Hono} from "hono";
import {cors} from "hono/cors";
import {redirect} from "./routes/redirect.js";

const app = new Hono();

app.use('*',cors({
  origin: [
      "http://localhost:5173",
      "https://resu-host.vercel.app",
  ],
}))
app.route("/api", api)
app.route("/", redirect)

serve({
  fetch: app.fetch,
  port: env.PORT || 8080,
}, (info) => {
  console.log(`Server is running on http://localhost:${info.port}`)
})
