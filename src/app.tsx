import { Hono } from 'hono'
import { logger } from 'hono/logger'
import { auth0, Auth0Error } from '@auth0/auth0-hono'
import type { OIDCEnv } from '@auth0/auth0-hono'
import { reactRenderer } from '@hono/react-renderer'
import { Layout } from './components/Layout.js'
import { authRoutes } from './routes/auth.js'
import { publicRoutes } from './routes/public.js'
import { protectedRoutes } from './routes/protected.js'
import { apiRoutes } from './routes/api.js'

declare module '@hono/react-renderer' {
  interface Props {
    title?: string
  }
}

export const app = new Hono<OIDCEnv>()

app.use('*', logger())

app.use('*', reactRenderer(({ children, title }) => (
  <Layout title={title}>{children}</Layout>
)))

// auth0() initialises the OIDC client and session on every request.
// customRoutes disables auto-mounting of /auth/* so routes/auth.ts owns them.
// authRequired:false lets us apply requiresAuth() selectively per route.
// response_mode:'query' is required for HTTP origins (localhost).
app.use('*', auth0({
  authRequired: false,
  idpLogout: true,
  authorizationParams: { response_mode: 'query' },
  customRoutes: ['login'],
}))

app.route('/auth', authRoutes)
app.route('/', publicRoutes)
app.route('/', protectedRoutes)
app.route('/api', apiRoutes)

// Auth0Error extends HTTPException — catches all typed auth errors (LoginRequiredError,
// AccessDeniedError, etc.) and returns OAuth2-compliant JSON.
app.onError((err, c) => {
  if (err instanceof Auth0Error) {
    return c.json(
      { error: err.code, error_description: err.description },
      err.status as 400 | 401 | 403 | 500,
    )
  }
  console.error(err)
  return c.json({ error: 'Internal Server Error' }, 500)
})
