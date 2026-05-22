import { Hono } from 'hono'
import { attemptSilentLogin } from '@auth0/auth0-hono'
import type { OIDCEnv } from '@auth0/auth0-hono'
import { HomePage } from '../components/HomePage.js'
import { AboutPage } from '../components/AboutPage.js'

export const publicRoutes = new Hono<OIDCEnv>()

publicRoutes.get('/', attemptSilentLogin(), (c) => {
  const user = c.var.auth0.user ?? undefined
  return c.render(<HomePage user={user} />, { title: 'Hono + Auth0 Demo' })
})

publicRoutes.get('/about', (c) => {
  const user = c.var.auth0.user ?? undefined
  return c.render(<AboutPage user={user} />, { title: 'About — Hono + Auth0' })
})
