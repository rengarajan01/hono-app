import { Nav } from './Nav.js'
import type { User } from './types.js'

type AboutPageProps = { user?: User }

type Feature = { export: string; description: string; link?: string }

const FEATURES: Feature[] = [
  { export: 'auth0()',                          description: 'Main middleware — initialises OIDC client, populates c.var.auth0' },
  { export: 'requiresAuth()',                   description: 'Redirects unauthenticated browsers to login',                         link: '/profile' },
  { export: 'requiresAuth("error")',            description: 'Returns HTTP 401 JSON for unauthenticated API requests',              link: '/api/me' },
  { export: 'handleLogin()',                    description: 'Starts interactive OIDC login flow',                                  link: '/auth/login' },
  { export: 'handleCallback()',                 description: 'Completes OIDC code exchange, writes session cookie (auto-mounted)' },
  { export: 'handleLogout()',                   description: 'Clears session and redirects to Auth0 logout (auto-mounted)' },
  { export: 'handleBackchannelLogout()',        description: 'POST endpoint for IdP-initiated logout (auto-mounted)' },
  { export: 'getUser(c)',                       description: 'Synchronous — user claims from session, throws if unauthenticated',   link: '/api/me' },
  { export: 'getSession(c)',                    description: 'Async — full session with token metadata, or null',                   link: '/api/session' },
  { export: 'getAccessToken(c)',               description: 'Async — access token, auto-refreshed if expired',                    link: '/api/token' },
  { export: 'getAccessTokenForConnection(c, …)', description: 'Async — token scoped to a federated social connection',             link: '/explorer' },
  { export: 'Auth0Error',                       description: 'Typed error class with .code and .description' },
]

export function AboutPage({ user }: AboutPageProps) {
  return (
    <>
      <Nav user={user} />
      <main>
        <div className="page-banner">
          <div>
            <h1>About</h1>
            <p className="banner-sub">
              Demo for <strong>@auth0/auth0-hono</strong> — OIDC middleware for{' '}
              <a href="https://hono.dev" target="_blank" rel="noreferrer">Hono</a>,
              deployed on <strong>Cloudflare Workers</strong> with server-side React. No client JS.
            </p>
          </div>
        </div>

        <h2>SDK Features</h2>
        <div className="card card-table">
          <table>
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
                      ? <a href={f.link} className="btn btn-secondary btn-sm">Try →</a>
                      : <span className="text-muted">—</span>
                    }
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </>
  )
}
