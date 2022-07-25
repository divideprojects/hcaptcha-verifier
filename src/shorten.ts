import { Context } from 'hono'

async function shortenLink(c: Context) {
  const url = c.req.query('url')
  const r = await fetch(`https://is.gd/create.php?format=json&url=${url}`)
  return c.json(await r.json())
}

export default shortenLink
