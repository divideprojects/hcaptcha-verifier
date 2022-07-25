import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { logger } from 'hono/logger'
import { prettyJSON } from 'hono/pretty-json'
import hCaptchaVerifier from './verifier'
import pingBack from './ping-back'
import searchYoutube from './yt-search'
import cryptoPrices from './crypto'
import carbonIt from './carbon'
import executeCode, { getLanguages } from './piston'
import shortenLink from './shorten'

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

// search youtube
app.get('/ytsearch', searchYoutube)

// ceypto endpoint
app.get('/crypto', cryptoPrices)

// carbon code
app.get('/carbon', carbonIt)

// execute code
const execute = new Hono()
execute.get('/', executeCode)
execute.get('/languages', getLanguages)
app.route('/execute', execute)

// url shortner
app.get('/shorten', shortenLink)

// if user goes anywhere else, give 404 error
app.notFound(c => c.json({ error: 'Not Found' }, 404))

// export the app
export default app
