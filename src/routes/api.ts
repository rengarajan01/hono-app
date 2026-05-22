import { Hono } from 'hono'
import {
  requiresAuth,
  getUser,
  getSession,
  getAccessToken,
  getAccessTokenForConnection,
} from '@auth0/auth0-hono'
import type { OIDCEnv } from '@auth0/auth0-hono'

export const apiRoutes = new Hono<OIDCEnv>()

apiRoutes.use('*', requiresAuth('error'))

apiRoutes.get('/me', (c) => {
  return c.json({ user: getUser(c) })
})

apiRoutes.get('/session', async (c) => {
  return c.json({ session: await getSession(c) })
})

apiRoutes.get('/token', async (c) => {
  const tokenSet = await getAccessToken(c)
  return c.json({ accessToken: tokenSet.accessToken })
})

apiRoutes.get('/token/connection', async (c) => {
  const connection = c.req.query('connection')
  if (!connection) return c.json({ error: 'connection query param is required' }, 400)
  if (!/^[a-zA-Z0-9_-]+$/.test(connection)) return c.json({ error: 'Invalid connection name' }, 400)
  const tokenSet = await getAccessTokenForConnection(c, { connection })
  return c.json({ accessToken: tokenSet.accessToken })
})

apiRoutes.get('/claims/:claim', (c) => {
  const user = getUser(c) as Record<string, unknown>
  const claim = c.req.param('claim')
  if (!/^[a-zA-Z0-9_:]+$/.test(claim)) return c.json({ error: 'Invalid claim name' }, 400)
  if (!Object.hasOwn(user, claim)) return c.json({ error: 'Claim not found' }, 404)
  return c.json({ claim, value: user[claim] })
})
