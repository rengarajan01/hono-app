import { Nav } from './Nav.js'
import type { User } from './types.js'

type AboutPageProps = { user?: User }

export function AboutPage({ user }: AboutPageProps) {
  return (
    <>
      <Nav user={user} />
      <main>
        <h1>About</h1>
        <div className="card">
          <p>
            This is a demo application showcasing the <strong>@auth0/auth0-hono</strong> SDK —
            a lightweight OIDC middleware for the <a href="https://hono.dev" target="_blank">Hono</a> web framework.
          </p>
          <p>
            The UI is built with React components rendered server-side via{' '}
            <strong>@hono/react-renderer</strong>, with no client-side JavaScript.
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
                ['requiresOrg()', 'Enforces user has org_id claim; optionally validates a specific org'],
                ['claimEquals(claim, value)', 'Returns 403 if a user claim does not match the expected value'],
                ['claimIncludes(claim, ...values)', 'Returns 403 if a user array claim does not include any of the values'],
                ['claimCheck(fn)', 'Returns 403 if a custom predicate over the user object returns false'],
                ['handleLogin()', 'Starts interactive OIDC login flow'],
                ['handleLogin({ prompt: "login" })', 'Forces re-authentication even with an active session'],
                ['handleLogin({ prompt: "consent" })', 'Re-shows the consent screen'],
                ['handleLogin({ redirectAfterLogin })', 'Redirects to a specific page after login'],
                ['handleCallback()', 'Completes OIDC code exchange and writes session cookie'],
                ['handleLogout()', 'Clears local session and redirects to Auth0 logout endpoint'],
                ['handleBackchannelLogout()', 'POST endpoint for IdP-initiated backchannel logout'],
                ['attemptSilentLogin()', 'Tries prompt=none login transparently (used on home page)'],
                ['cancelSilentLogin()', 'Prevents silent login loop on the login route itself'],
                ['getUser(c)', 'Synchronously returns user claims from c.var.auth0 (throws if unauthenticated)'],
                ['getSession(c)', 'Async — returns full session object including token metadata, or null'],
                ['getAccessToken(c)', 'Async — returns access token, refreshing silently if expired'],
                ['getAccessTokenForConnection(c, opts)', 'Async — returns token scoped to a federated social connection'],
                ['updateSession(c, data)', 'Merges custom data into the session and persists it'],
              ].map(([feature, desc]) => (
                <tr key={feature}>
                  <td><code>{feature}</code></td>
                  <td>{desc}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="actions">
          <a href="/" className="btn btn-secondary">Home</a>
          {!user && <a href="/auth/login" className="btn btn-primary">Login</a>}
        </div>
      </main>
    </>
  )
}
