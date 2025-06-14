import { serve } from '@hono/node-server'
import api from "./api.js";
import {env} from "./utils/env.js";
import {cors} from 'hono/cors'


api.get('/', (c) => {
  return c.text('Hello Hono!')
})

api.use('*',cors({
  origin: ["http://localhost:5173"],
}))

serve({
  fetch: api.fetch,
  port: env.PORT || 8080,
}, (info) => {
  console.log(`Server is running on http://localhost:${info.port}`)
})
