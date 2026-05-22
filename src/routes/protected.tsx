import { Hono } from 'hono'
import { requiresAuth, getUser, getSession } from '@auth0/auth0-hono'
import type { OIDCEnv } from '@auth0/auth0-hono'
import { ProfilePage } from '../components/ProfilePage.js'
import { DashboardPage } from '../components/DashboardPage.js'
import { ApiExplorerPage } from '../components/ApiExplorerPage.js'

export const protectedRoutes = new Hono<OIDCEnv>()

protectedRoutes.get('/profile', requiresAuth(), (c) => {
  const user = getUser(c)
  return c.render(<ProfilePage user={user} />, { title: 'Profile' })
})

protectedRoutes.get('/dashboard', requiresAuth(), async (c) => {
  const user = getUser(c)
  const session = await getSession(c)
  return c.render(<DashboardPage user={user} session={session!} />, { title: 'Dashboard' })
})

protectedRoutes.get('/explorer', requiresAuth(), (c) => {
  const user = getUser(c)
  return c.render(<ApiExplorerPage user={user} />, { title: 'API Explorer' })
})
