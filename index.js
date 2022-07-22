// get the secret for account from ENV
const hcaptcha_test_token = '0x0000000000000000000000000000000000000000'
const hcaptcha_url = 'https://hcaptcha.com/siteverify'

async function handlePost(request) {
  const { headers } = request
  const contentType = headers.get('content-type') || ''
  body = {}

  if (contentType.includes('form')) {
    const formData = await request.formData()
    var object = {}
    formData.forEach((value, key) => (object[key] = value))
    body = {
      secret_key:
        object['secret_key'] != null
          ? object['secret_key']
          : hcaptcha_test_token,
      token: object['token'],
    }
  }
  const postReq = await fetch(hcaptcha_url, (data = body))
  return new Response(JSON.stringify(await postReq.json()))
}

async function handleGet(_) {
  return new Response(JSON.stringify({ alive: true }, null, 2))
}

addEventListener('fetch', event => {
  const { request } = event
  if (request.method === 'POST') {
    console.info('Token check!')
    return event.respondWith(handlePost(request))
  } else if (request.method === 'GET') {
    console.info('Alive status check!')
    return event.respondWith(handleGet(request))
  }
})
