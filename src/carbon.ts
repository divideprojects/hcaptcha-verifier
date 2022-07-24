import { Context } from 'hono'

async function carbonIt(c: Context) {
  const code = c.req.query('code')
  const backgroundColor = c.req.query('backgroundColor') || '#1F816D'

  const r = await fetch('https://api.safone.tech/carbon', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      code: code,
      backgroundColor: backgroundColor,
    }),
  })

  let img: string = 'data:image/png;base64,' + (await r.json()).image
  return c.html(`<img src="${img}">`)
}

export default carbonIt
