import { Hono } from 'hono'
import { logger } from 'hono/logger'
import { secureHeaders } from 'hono/secure-headers'
import { HTTPException } from 'hono/http-exception'
import { auth0 } from '@auth0/auth0-hono'
import type { OIDCEnv } from '@auth0/auth0-hono'
import { reactRenderer } from '@hono/react-renderer'
import { Layout } from './components/Layout.js'
import { pageRoutes } from './routes/pages.js'
import { apiRoutes } from './routes/api.js'

declare module '@hono/react-renderer' {
  interface Props {
    title?: string
  }
}

export const app = new Hono<OIDCEnv>()

app.use('*', logger())

app.use('*', secureHeaders({
  contentSecurityPolicy: {
    defaultSrc: ["'none'"],
    scriptSrc: ["'self'"],
    styleSrc: ["'self'"],
    imgSrc: ["'self'", 'https:'],
    connectSrc: ["'self'"],
    baseUri: ["'self'"],
    formAction: ["'self'"],
    frameAncestors: ["'none'"],
  },
  xFrameOptions: 'DENY',
  xContentTypeOptions: 'nosniff',
  referrerPolicy: 'strict-origin-when-cross-origin',
  strictTransportSecurity: 'max-age=31536000; includeSubDomains',
  permissionsPolicy: {
    geolocation: [],
    camera: [],
    microphone: [],
    payment: [],
  },
}))

app.use('*', reactRenderer(({ children, title }) => (
  <Layout title={title}>{children}</Layout>
)))

app.use('*', auth0({
  authRequired: false,
  authorizationParams: { response_mode: 'query' },
}))

app.route('/', pageRoutes)
app.route('/api', apiRoutes)

app.onError((err, c) => {
  if (err instanceof HTTPException) return err.getResponse()
  console.error(err)
  return c.json({ error: 'Internal Server Error' }, 500)
})