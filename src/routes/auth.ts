import { Hono } from 'hono'
import { handleLogin } from '@auth0/auth0-hono'
import type { OIDCEnv } from '@auth0/auth0-hono'

// /auth/callback, /auth/logout, /auth/backchannel-logout are auto-mounted by auth0()
// middleware in app.tsx — no need to define them here.
export const authRoutes = new Hono<OIDCEnv>()

authRoutes.get('/login', handleLogin())
authRoutes.get('/login/force', handleLogin({ authorizationParams: { prompt: 'login' } }))
authRoutes.get('/login/consent', handleLogin({ authorizationParams: { prompt: 'consent' } }))
authRoutes.get('/login/to-profile', handleLogin({ redirectAfterLogin: '/profile' }))
