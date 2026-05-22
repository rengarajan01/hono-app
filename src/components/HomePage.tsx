import { Nav } from './Nav.js'
import type { User } from './types.js'

type HomePageProps = { user?: User }

const routes: { method: 'GET' | 'POST'; path: string; description: string }[] = [
  { method: 'GET',  path: '/auth/login',                    description: 'Standard login' },
  { method: 'GET',  path: '/auth/login/force',              description: 'Force re-authentication (prompt=login)' },
  { method: 'GET',  path: '/auth/login/consent',            description: 'Re-show consent screen' },
  { method: 'GET',  path: '/auth/login/to-profile',         description: 'Login → redirect to /profile' },
  { method: 'GET',  path: '/auth/callback',                 description: 'OIDC callback (handled automatically)' },
  { method: 'GET',  path: '/auth/logout',                   description: 'Logout — clears session + IdP session' },
  { method: 'POST', path: '/auth/backchannel-logout',       description: 'Backchannel logout endpoint (IdP → app)' },
  { method: 'GET',  path: '/auth/silent',                   description: 'Attempt silent login (prompt=none)' },
  { method: 'GET',  path: '/profile',                       description: 'Protected — user claims (HTML, redirect on unauth)' },
  { method: 'GET',  path: '/dashboard',                     description: 'Protected — session metadata (HTML, redirect on unauth)' },
  { method: 'GET',  path: '/about',                         description: 'Public info page' },
  { method: 'GET',  path: '/api/me',                        description: 'Protected — user claims (JSON, 401 on unauth)' },
  { method: 'GET',  path: '/api/session',                   description: 'Protected — full session object (JSON)' },
  { method: 'GET',  path: '/api/token',                     description: 'Protected — access token (JSON)' },
  { method: 'GET',  path: '/api/token/connection?connection=X', description: 'Protected — token for federated connection (JSON)' },
  { method: 'GET',  path: '/api/claims/:claim',             description: 'Protected — single claim value (JSON)' },
]

export function HomePage({ user }: HomePageProps) {
  return (
    <>
      <Nav user={user} />
      <main>
        <h1>{user ? `Welcome back, ${user.name ?? user.email ?? user.sub}!` : 'Hono + Auth0 SDK Demo'}</h1>

        {!user && (
          <div className="card">
            <p>This app demonstrates every feature of the <strong>@auth0/auth0-hono</strong> SDK with proper route separation.</p>
            <div className="actions">
              <a href="/auth/login" className="btn btn-primary">Login</a>
              <a href="/auth/login/force" className="btn btn-secondary">Force re-auth</a>
              <a href="/auth/login/consent" className="btn btn-secondary">Re-consent</a>
              <a href="/auth/silent" className="btn btn-secondary">Try silent login</a>
            </div>
          </div>
        )}

        {user && (
          <div className="card">
            <div className="actions">
              <a href="/profile" className="btn btn-primary">View Profile</a>
              <a href="/dashboard" className="btn btn-secondary">Dashboard</a>
              <a href="/api/me" className="btn btn-secondary">GET /api/me</a>
              <a href="/api/session" className="btn btn-secondary">GET /api/session</a>
              <a href="/api/token" className="btn btn-secondary">GET /api/token</a>
              <a href="/auth/logout" className="btn btn-danger">Logout</a>
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
                  <td><code>{r.path}</code></td>
                  <td>{r.description}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </>
  )
}
