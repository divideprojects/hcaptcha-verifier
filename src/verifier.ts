// get the secret for account from ENV
const hcaptcha_test_token = '0x0000000000000000000000000000000000000000'
const hcaptcha_url = 'https://hcaptcha.com/siteverify'

// function to send a post request to hcaptcha_url with body as secret and response which is the token
// return the response from hcaptcha_url
// if the response is true then return true else return false
async function verifyCaptcha(secret: string, token: string) {
  const response = await fetch(hcaptcha_url, {
    method: 'POST',
    body: new URLSearchParams({
      response: token ? token : hcaptcha_test_token,
      secret: secret,
    }),
  })
  return response
}

async function hCaptchaVerifier(c, _) {
  const object = await c.req.json()
  const postReq = await verifyCaptcha(object.secret_key, object.token)
  return new Response(JSON.stringify(await postReq.json(), null, 2))
}

export default hCaptchaVerifier
