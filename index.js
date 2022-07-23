// get the secret for account from ENV
const hcaptcha_test_token = '0x0000000000000000000000000000000000000000'
const hcaptcha_url = 'https://hcaptcha.com/siteverify'

// function to send a post request to hcaptcha_url with body as secret and response which is the token
// return the response from hcaptcha_url
// if the response is true then return true else return false
async function verifyCaptcha(secret, token) {
  const response = await fetch(hcaptcha_url, {
    method: 'POST',
    body: new URLSearchParams({
      response: token,
      secret: secret,
    }),
  })
  return response
}

// function to handler post request
async function handlePost(request) {
  const object = await request.json()
  const postReq = await verifyCaptcha(object.secret_key, object.token)
  return new Response(JSON.stringify(await postReq.json(), null, 2))
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
