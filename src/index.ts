import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { logger } from 'hono/logger'
import hCaptchaVerifier from './verifier'
import pingBack from './ping-back'
import { prettyJSON } from 'hono/pretty-json'

// Create a new hono client and initiate middlewares
const app = new Hono()
app.use('*', prettyJSON())
app.use('*', cors())
app.use('*', logger())

// main page of api
app.get('/', async c => c.html(`<h1>Welcome to the Divide API</h1>`))

// check alive status
app.get('/alive', async c => c.json({ alive: true }))

// handler hcapctha verifier requests
app.post('/verify', hCaptchaVerifier)

// handler ping back requests
app.get('/pingback', pingBack)

// if user goes anywhere else, give 404 error
app.notFound(c => c.json({ error: 'Not Found' }, 404))

// export the app
export default app
