import { Nav } from './Nav.js'
import type { User } from './types.js'

type AboutPageProps = { user?: User }

export function AboutPage({ user }: AboutPageProps) {
  return (
    <>
      <Nav user={user} />
      <main>
        <div className="page-header">
          <h1>About</h1>
          <div className="actions">
            <a href="/" className="btn btn-secondary">Home</a>
            {user ? (
              <>
                <a href="/profile" className="btn btn-secondary">Profile</a>
                <a href="/dashboard" className="btn btn-secondary">Dashboard</a>
                <a href="/auth/logout" className="btn btn-danger">Logout</a>
              </>
            ) : (
              <a href="/auth/login" className="btn btn-primary">Login</a>
            )}
          </div>
        </div>

        <div className="card">
          <p>
            This is a demo application showcasing the <strong>@auth0/auth0-hono</strong> SDK —
            a lightweight OIDC middleware for the <a href="https://hono.dev" target="_blank" rel="noreferrer">Hono</a> web framework,
            deployed on <strong>Cloudflare Workers</strong> with server-side React rendering via <strong>@hono/react-renderer</strong>.
          </p>
          <p style={{ marginBottom: 0 }}>
            No client-side JavaScript — every page is rendered server-side, including auth state.
          </p>
        </div>

        <h2>SDK Features Used</h2>
        <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
          <table>
            <thead><tr><th>Feature</th><th>Description</th></tr></thead>
            <tbody>
              {[
                ['auth0()', 'Main middleware — initialises OIDC client, populates c.var.auth0 on every request'],
                ['requiresAuth()', 'Redirects unauthenticated users to login (used on /profile, /dashboard)'],
                ['requiresAuth("error")', 'Returns HTTP 401 for unauthenticated requests (used on all /api/* routes)'],
                ['handleLogin()', 'Starts interactive OIDC login flow'],
                ['handleLogin({ prompt: "login" })', 'Forces re-authentication even with an active session'],
                ['handleLogin({ prompt: "consent" })', 'Re-shows the consent screen'],
                ['handleLogin({ redirectAfterLogin })', 'Redirects to a specific page after login'],
                ['handleCallback()', 'Completes OIDC code exchange and writes session cookie (auto-mounted by SDK)'],
                ['handleLogout()', 'Clears local session and redirects to Auth0 logout endpoint (auto-mounted by SDK)'],
                ['handleBackchannelLogout()', 'POST endpoint for IdP-initiated backchannel logout (auto-mounted by SDK)'],
                ['attemptSilentLogin()', 'Tries prompt=none login transparently (used on home page)'],
                ['cancelSilentLogin()', 'Prevents silent login loop on the login route itself'],
                ['getUser(c)', 'Synchronously returns user claims from c.var.auth0 (throws if unauthenticated)'],
                ['getSession(c)', 'Async — returns full session object including token metadata, or null'],
                ['getAccessToken(c)', 'Async — returns access token, refreshing silently if expired'],
                ['getAccessTokenForConnection(c, opts)', 'Async — returns token scoped to a federated social connection'],
                ['Auth0Error', 'Typed error class with .code and .description for OAuth2-compliant error responses'],
              ].map(([feature, desc]) => (
                <tr key={feature}>
                  <td><code>{feature}</code></td>
                  <td style={{ color: '#64748b' }}>{desc}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {!user && (
          <div className="card">
            <p style={{ marginBottom: '1rem' }}>Try the API routes (returns 401 JSON when unauthenticated):</p>
            <div className="actions">
              <a href="/api/me" className="btn btn-secondary">GET /api/me</a>
              <a href="/api/session" className="btn btn-secondary">GET /api/session</a>
              <a href="/api/token" className="btn btn-secondary">GET /api/token</a>
            </div>
          </div>
        )}
      </main>
    </>
  )
}
