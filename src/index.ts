import { Hono } from 'hono'
import { cors } from 'hono/cors'
import hCaptchaVerifier from './verifier'
import { prettyJSON } from 'hono/pretty-json'

// Create a new hono client
const app = new Hono()
app.use('*', prettyJSON())
app.use('*', cors())

// main page of api
app.get('/', async c => c.html(`<h1>Welcome to the Divide API</h1>`))

// check alive status
app.get('/alive', async c => c.json({ alive: true }))

// handler hcapctha verifier requests
app.post('/verify', hCaptchaVerifier)

// if user goes anywhere else, give 404 error
app.notFound(c => c.json({ error: 'Not Found' }, 404))

// export the app
export default app
