import { PageLayout } from '../components/PageLayout.js'
import { CardTable } from '../components/CardTable.js'
import { MethodBadge } from '../components/MethodBadge.js'
import type { User } from '../types/index.js'

type HomeProps = { user?: User }

const routes: { method: 'GET' | 'POST'; path: string; description: string; link?: string }[] = [
  { method: 'GET',  path: '/auth/login',                        description: 'Login - starts OIDC flow',                          link: '/auth/login' },
  { method: 'GET',  path: '/auth/callback',                     description: 'OIDC callback (auto-handled by SDK)' },
  { method: 'GET',  path: '/auth/logout',                       description: 'Logout - clears session and IdP session',           link: '/auth/logout' },
  { method: 'POST', path: '/auth/backchannel-logout',           description: 'Backchannel logout (IdP-initiated)' },
  { method: 'GET',  path: '/',                                  description: 'Home page',                                         link: '/' },
  { method: 'GET',  path: '/about',                             description: 'SDK feature reference',                             link: '/about' },
  { method: 'GET',  path: '/profile',                           description: 'User identity claims (requires auth)',              link: '/profile' },
  { method: 'GET',  path: '/dashboard',                         description: 'Session metadata and tokens (requires auth)',       link: '/dashboard' },
  { method: 'GET',  path: '/explorer',                          description: 'Interactive API explorer (requires auth)',          link: '/explorer' },
  { method: 'GET',  path: '/api/me',                            description: 'User claims as JSON, 401 if unauthenticated' },
  { method: 'GET',  path: '/api/session',                       description: 'Full session object as JSON' },
  { method: 'GET',  path: '/api/token',                         description: 'Access token, auto-refreshed if expired' },
  { method: 'GET',  path: '/api/token/connection?connection=X', description: 'Token for a federated connection' },
  { method: 'GET',  path: '/api/claims/:claim',                 description: 'Single claim value by name' },
]

export function Home({ user }: HomeProps) {
  return (
    <PageLayout user={user}>
      {user ? (
        <div className="hero">
          <h1>Welcome back{user.name ? `, ${user.name.split(' ')[0]}` : ''}!</h1>
          <p className="hero-sub">{user.email ?? user.sub}</p>
        </div>
      ) : (
        <div className="hero">
          <h1>Hono + Auth0 SDK Demo</h1>
          <p className="hero-sub">
            A complete demo of the <strong>@auth0/auth0-hono</strong> SDK,
            OIDC middleware for Hono, running on Cloudflare Workers.
          </p>
        </div>
      )}

      <h2>All Routes</h2>
      <CardTable className="routes-table">
        <colgroup>
          <col className="col-method" />
          <col className="col-path" />
          <col />
        </colgroup>
        <thead>
          <tr><th>Method</th><th>Path</th><th>Description</th></tr>
        </thead>
        <tbody>
          {routes.map((r) => (
            <tr key={r.path}>
              <td><MethodBadge method={r.method} /></td>
              <td>{r.link ? <a href={r.link}><code>{r.path}</code></a> : <code>{r.path}</code>}</td>
              <td className="td-muted">{r.description}</td>
            </tr>
          ))}
        </tbody>
      </CardTable>
    </PageLayout>
  )
}
