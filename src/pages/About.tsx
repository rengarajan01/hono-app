import { PageLayout } from '../components/PageLayout.js'
import { CardTable } from '../components/CardTable.js'
import type { User } from '../types/index.js'

type AboutProps = { user?: User }

type Feature = { export: string; description: string; link?: string }

const FEATURES: Feature[] = [
  { export: 'auth0()',                            description: 'Main middleware, initialises OIDC client and populates c.var.auth0' },
  { export: 'requiresAuth()',                     description: 'Redirects unauthenticated browsers to login',                        link: '/profile' },
  { export: 'requiresAuth("error")',              description: 'Returns HTTP 401 JSON for unauthenticated API requests',             link: '/api/me' },
  { export: 'handleLogin()',                      description: 'Starts interactive OIDC login flow (auto-mounted at /auth/login)' },
  { export: 'handleCallback()',                   description: 'Completes OIDC code exchange, writes session cookie (auto-mounted)' },
  { export: 'handleLogout()',                     description: 'Clears session and redirects to Auth0 logout (auto-mounted)' },
  { export: 'handleBackchannelLogout()',          description: 'POST endpoint for IdP-initiated logout (auto-mounted)' },
  { export: 'getUser(c)',                         description: 'Synchronous, returns user claims from session, throws if unauthenticated', link: '/api/me' },
  { export: 'getSession(c)',                      description: 'Async, returns full session with token metadata or null',             link: '/api/session' },
  { export: 'getAccessToken(c)',                  description: 'Async, returns access token auto-refreshed if expired',              link: '/api/token' },
  { export: 'getAccessTokenForConnection(c, …)', description: 'Async, returns token scoped to a federated social connection',        link: '/explorer' },
  { export: 'Auth0Error',                         description: 'Typed error class with .code and .description' },
]

export function About({ user }: AboutProps) {
  return (
    <PageLayout user={user}>
      <div className='hero'>
        <h1>About</h1>
        <p className="hero-sub">
          Demo for <strong>@auth0/auth0-hono</strong>, OIDC middleware for{' '}
          <a href="https://hono.dev" target="_blank" rel="noopener noreferrer">Hono</a>,
          deployed on <strong>Cloudflare Workers</strong> with server-side React. No client-side framework.
        </p>
      </div>

      <h2>SDK Features</h2>
      <CardTable>
        <thead>
          <tr>
            <th>Export</th>
            <th>Description</th>
            <th className="col-try">Try it</th>
          </tr>
        </thead>
        <tbody>
          {FEATURES.map((f) => (
            <tr key={f.export}>
              <td><code>{f.export}</code></td>
              <td className="td-muted">{f.description}</td>
              <td>
                {f.link
                  ? <a href={f.link} className="btn btn-secondary btn-sm">Try</a>
                  : <span className="text-muted">-</span>
                }
              </td>
            </tr>
          ))}
        </tbody>
      </CardTable>
    </PageLayout>
  )
}
