import { Nav } from './Nav.js'
import type { User } from './types.js'

type HomePageProps = { user?: User }

const routes: { method: 'GET' | 'POST'; path: string; description: string; link?: string }[] = [
  { method: 'GET',  path: '/auth/login',                         description: 'Standard login',                                        link: '/auth/login' },
  { method: 'GET',  path: '/auth/login/force',                   description: 'Force re-authentication (prompt=login)',                link: '/auth/login/force' },
  { method: 'GET',  path: '/auth/login/consent',                 description: 'Re-show consent screen',                               link: '/auth/login/consent' },
  { method: 'GET',  path: '/auth/login/to-profile',              description: 'Login → redirect to /profile',                         link: '/auth/login/to-profile' },
  { method: 'GET',  path: '/auth/callback',                      description: 'OIDC callback (auto-handled by SDK)' },
  { method: 'GET',  path: '/auth/logout',                        description: 'Logout — clears session + IdP session',                link: '/auth/logout' },
  { method: 'POST', path: '/auth/backchannel-logout',            description: 'Backchannel logout endpoint (IdP → app)' },
  { method: 'GET',  path: '/auth/silent',                        description: 'Attempt silent login (prompt=none)',                   link: '/auth/silent' },
  { method: 'GET',  path: '/profile',                            description: 'Protected — user claims (redirects if unauthenticated)', link: '/profile' },
  { method: 'GET',  path: '/dashboard',                          description: 'Protected — session metadata (redirects if unauthenticated)', link: '/dashboard' },
  { method: 'GET',  path: '/about',                              description: 'SDK feature reference',                                link: '/about' },
  { method: 'GET',  path: '/api/me',                             description: 'Protected — user claims (JSON, 401 on unauth)',         link: '/api/me' },
  { method: 'GET',  path: '/api/session',                        description: 'Protected — full session object (JSON)',               link: '/api/session' },
  { method: 'GET',  path: '/api/token',                          description: 'Protected — access token (JSON)',                      link: '/api/token' },
  { method: 'GET',  path: '/api/token/connection?connection=X',  description: 'Protected — token for a federated connection (JSON)' },
  { method: 'GET',  path: '/api/claims/:claim',                  description: 'Protected — single claim value (JSON)' },
]

export function HomePage({ user }: HomePageProps) {
  return (
    <>
      <Nav user={user} />
      <main>
        {user ? (
          <>
            <div className="page-header">
              <div>
                <h1>Welcome back{user.name ? `, ${user.name}` : ''}!</h1>
              </div>
              <div className="actions">
                <a href="/profile" className="btn btn-primary">Profile</a>
                <a href="/dashboard" className="btn btn-secondary">Dashboard</a>
                <a href="/auth/logout" className="btn btn-danger">Logout</a>
              </div>
            </div>

            <div className="card">
              <h2 style={{ margin: '0 0 0.75rem', textTransform: 'none', fontSize: '0.9rem', color: '#374151', letterSpacing: 0 }}>Quick API</h2>
              <div className="actions">
                <a href="/api/me" className="btn btn-secondary">GET /api/me</a>
                <a href="/api/session" className="btn btn-secondary">GET /api/session</a>
                <a href="/api/token" className="btn btn-secondary">GET /api/token</a>
                <a href="/auth/login/force" className="btn btn-secondary">Force re-auth</a>
              </div>
            </div>
          </>
        ) : (
          <div className="hero">
            <h1>Hono + Auth0 SDK Demo</h1>
            <p>Explore every feature of the <strong>@auth0/auth0-hono</strong> SDK — OIDC middleware for the Hono framework.</p>
            <div className="actions">
              <a href="/auth/login" className="btn btn-primary">Login</a>
              <a href="/auth/login/force" className="btn btn-secondary">Force re-auth</a>
              <a href="/auth/login/consent" className="btn btn-secondary">Re-consent</a>
              <a href="/auth/silent" className="btn btn-secondary">Try silent login</a>
              <a href="/about" className="btn btn-secondary">SDK features</a>
            </div>
          </div>
        )}

        <h2>All Routes</h2>
        <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
          <table>
            <thead>
              <tr>
                <th>Method</th>
                <th>Path</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              {routes.map((r) => (
                <tr key={r.path}>
                  <td>
                    <span className={`route-tag ${r.method.toLowerCase()}`}>{r.method}</span>
                  </td>
                  <td>
                    {r.link
                      ? <a href={r.link}><code>{r.path}</code></a>
                      : <code>{r.path}</code>
                    }
                  </td>
                  <td style={{ color: '#64748b' }}>{r.description}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </>
  )
}
