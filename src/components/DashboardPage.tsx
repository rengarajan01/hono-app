import { Nav } from './Nav.js'
import type { User, Session } from './types.js'

type DashboardPageProps = { user: User; session: Session }

function formatDate(epochSeconds?: number) {
  if (!epochSeconds) return 'N/A'
  return new Date(epochSeconds * 1000).toLocaleString()
}

function StatCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="stat-card">
      <p className="stat-label">{label}</p>
      <p className="stat-value">{value}</p>
    </div>
  )
}

export function DashboardPage({ user, session }: DashboardPageProps) {
  const tokenSets = session.tokenSets ?? []
  const primaryToken = tokenSets[0]

  return (
    <>
      <Nav user={user} />
      <main>
        <div className="page-header">
          <h1>Session Dashboard</h1>
          <div className="actions">
            <a href="/profile" className="btn btn-secondary">Profile</a>
            <a href="/api/session" className="btn btn-secondary">Raw JSON</a>
            <a href="/" className="btn btn-secondary">Home</a>
            <a href="/auth/logout" className="btn btn-danger">Logout</a>
          </div>
        </div>

        <div className="grid">
          <StatCard label="Subject (sub)" value={user.sub} />
          <StatCard label="Token sets" value={String(tokenSets.length)} />
          <StatCard label="Has refresh token" value={session.refreshToken ? 'Yes' : 'No'} />
          <StatCard label="Token expires" value={formatDate(primaryToken?.expiresAt)} />
        </div>

        {primaryToken && (
          <>
            <h2>Primary Token Set</h2>
            <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
              <table>
                <thead><tr><th>Field</th><th>Value</th></tr></thead>
                <tbody>
                  <tr><td>Expires at</td><td><code>{formatDate(primaryToken.expiresAt)}</code></td></tr>
                  <tr><td>Scope</td><td><code>{String(primaryToken.scope ?? 'N/A')}</code></td></tr>
                  <tr>
                    <td>Access token</td>
                    <td>
                      <code>{primaryToken.accessToken
                        ? `${String(primaryToken.accessToken).slice(0, 24)}…`
                        : 'N/A'}
                      </code>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </>
        )}

        <h2>Full Session (JSON)</h2>
        <pre>{JSON.stringify(session, null, 2)}</pre>
      </main>
    </>
  )
}
