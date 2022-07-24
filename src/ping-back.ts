async function pingBack(c) {
  let link: string = await c.req.query('link')
  let method: string = await c.req.query('method')

  // check if link and method are set
  if (link == (null || '') || method == (null || '')) {
    return c.json({ error: 'Missing parameters' }, 400)
  }

  // change case to upper
  method = method.toUpperCase()

  // send request
  const r = await fetch(link, { method })

  // return response
  return c.json({
    success: r.status == 200,
    url: link,
    status_code: r.status,
  })
}

export default pingBack
