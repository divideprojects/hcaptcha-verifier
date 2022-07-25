import { Context } from 'hono'

async function cryptoPrices(c: Context) {
  const currency: string = await c.req.query('currency')
  const r = await fetch(
    `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&order=market_cap_desc&sparkline=false`,
    {
      headers: {
        accept: 'application/json',
      },
    },
  )
  return c.json(await r.json())
}

export default cryptoPrices
