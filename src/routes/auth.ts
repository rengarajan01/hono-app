import { Hono } from 'hono'
import { handleLogin, attemptSilentLogin, cancelSilentLogin } from '@auth0/auth0-hono'
import type { OIDCEnv } from '@auth0/auth0-hono'

// /auth/callback, /auth/logout, /auth/backchannel-logout are auto-mounted by auth0()
// middleware in app.tsx — no need to define them here.
// We only define /auth/login manually because we need cancelSilentLogin() before it,
// plus the extra login variants below.

export const authRoutes = new Hono<OIDCEnv>()

authRoutes.get('/login', cancelSilentLogin(), handleLogin())
authRoutes.get('/login/force', cancelSilentLogin(), handleLogin({ authorizationParams: { prompt: 'login' } }))
authRoutes.get('/login/consent', cancelSilentLogin(), handleLogin({ authorizationParams: { prompt: 'consent' } }))
authRoutes.get('/login/to-profile', cancelSilentLogin(), handleLogin({ redirectAfterLogin: '/profile' }))
authRoutes.get('/silent', attemptSilentLogin(), (c) => c.redirect('/'))
