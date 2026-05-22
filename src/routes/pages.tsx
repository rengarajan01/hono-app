import { Hono } from 'hono'
import { requiresAuth, getUser, getSession } from '@auth0/auth0-hono'
import type { OIDCEnv } from '@auth0/auth0-hono'
import { Home } from '../pages/Home.js'
import { About } from '../pages/About.js'
import { Profile } from '../pages/Profile.js'
import { Dashboard } from '../pages/Dashboard.js'
import { ApiExplorer } from '../pages/ApiExplorer.js'

export const pageRoutes = new Hono<OIDCEnv>()

pageRoutes.get('/', (c) => {
  const user = c.var.auth0.user ?? undefined
  return c.render(<Home user={user} />, { title: 'Hono + Auth0 Demo' })
})

pageRoutes.get('/about', (c) => {
  const user = c.var.auth0.user ?? undefined
  return c.render(<About user={user} />, { title: 'About | Hono + Auth0' })
})

pageRoutes.get('/profile', requiresAuth(), (c) => {
  const user = getUser(c)
  return c.render(<Profile user={user} />, { title: 'Profile' })
})

pageRoutes.get('/dashboard', requiresAuth(), async (c) => {
  const user = getUser(c)
  const session = await getSession(c)
  return c.render(<Dashboard user={user} session={session!} />, { title: 'Dashboard' })
})

pageRoutes.get('/explorer', requiresAuth(), (c) => {
  const user = getUser(c)
  return c.render(<ApiExplorer user={user} />, { title: 'API Explorer' })
})
