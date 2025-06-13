import { serve } from '@hono/node-server'
import api from "./api.js";
import {loadEnvironmentVariables} from "./utils/env.js";

loadEnvironmentVariables();

api.get('/', (c) => {
  return c.text('Hello Hono!')
})

serve({
  fetch: api.fetch,
  port: Number(process.env.PORT) || 8080,
}, (info) => {
  console.log(`Server is running on http://localhost:${info.port}`)
})
