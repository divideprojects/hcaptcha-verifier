import { Context } from 'hono'
import YouTube from 'youtube-sr'

// function to search for videos from youtube.com
async function searchYoutube(c: Context) {
  let query: string = await c.req.query('query')
  let limit: number = +(await c.req.query('limit')) || 10
  const videos = await YouTube.search(query, { limit: limit, type: 'video' })
  return c.json(videos)
}

export default searchYoutube
