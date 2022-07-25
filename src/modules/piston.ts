import { Context } from 'hono'

const runtimeUrl = 'https://emkc.org/api/v2/piston/runtimes'

async function executeCode(c: Context) {
  const code = c.req.query('code')
  const language: string = c.req.query('language')
  const version = c.req.query('version') || (await getLanguageVersion(language))
  const apiUrl = 'https://emkc.org/api/v2/piston/execute'
  const r = await fetch(apiUrl, {
    method: 'POST',
    body: JSON.stringify({
      language,
      version,
      files: [{ content: code }],
    }),
  })
  return c.json(await r.json())
}

// function to get runtimes from api
async function getLanguageVersion(language: string) {
  const r = await fetch(runtimeUrl)
  const runtimeData = await r.json()
  const data = runtimeData.map(x => {
    let data = {}
    data[x.language] = x.version
    return data
  })
  const version = data.find(x => Object.keys(x)[0] === language)[language]
  return version
}

async function getLanguages(c: Context) {
  const r = await fetch(runtimeUrl)
  return c.json(await r.json())
}

export default executeCode
export { getLanguages }
