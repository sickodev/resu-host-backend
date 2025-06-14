import { serve } from '@hono/node-server'
import api from "./api.js";
import {env} from "./utils/env.js";
import {cors} from 'hono/cors'

api.use('*',cors({
  origin: '*',
}))

api.get('/', (c) => {
  return c.text('Hello Hono!')
})

serve({
  fetch: api.fetch,
  port: env.PORT || 8080,
}, (info) => {
  console.log(`Server is running on http://localhost:${info.port}`)
})
