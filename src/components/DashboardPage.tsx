import { Nav } from './Nav.js'
import type { User, Session } from './types.js'

type DashboardPageProps = { user: User; session: Session }

function formatDate(epochSeconds?: number) {
  if (!epochSeconds) return 'N/A'
  return new Date(epochSeconds * 1000).toLocaleString()
}

function tokenStatus(expiresAt?: number): { label: string; cls: string } {
  if (!expiresAt) return { label: 'Unknown', cls: 'expiring' }
  const secsLeft = expiresAt - Math.floor(Date.now() / 1000)
  if (secsLeft <= 0) return { label: 'Expired', cls: 'expired' }
  if (secsLeft < 300) {
    const m = Math.floor(secsLeft / 60), s = secsLeft % 60
    return { label: `Expiring · ${m}m ${s}s`, cls: 'expiring' }
  }
  const m = Math.floor(secsLeft / 60)
  return { label: `Valid · ${m}m remaining`, cls: 'valid' }
}

function StatCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="stat-card">
      <p className="stat-label">{label}</p>
      <p className="stat-value" title={value}>{value}</p>
    </div>
  )
}

export function DashboardPage({ user, session }: DashboardPageProps) {
  const tokenSets = session.tokenSets ?? []
  const primaryToken = tokenSets[0]
  const status = tokenStatus(primaryToken?.expiresAt)

  return (
    <>
      <Nav user={user} />
      <main>
        <div className="page-banner">
          <div>
            <h1>Session Dashboard</h1>
            <p className="banner-sub">Session metadata and token state for the current login.</p>
          </div>
          <a href="/api/session" className="btn btn-secondary">Raw JSON</a>
        </div>

        <div className="grid">
          <StatCard label="Subject" value={user.sub} />
          <StatCard label="Token sets" value={String(tokenSets.length)} />
          <StatCard label="Refresh token" value={session.refreshToken ? 'Present' : 'None'} />
          <StatCard label="Expires" value={formatDate(primaryToken?.expiresAt)} />
        </div>

        {primaryToken && (
          <>
            <h2>Primary Token</h2>
            <div className="card card-table">
              <table>
                <thead><tr><th>Field</th><th>Value</th></tr></thead>
                <tbody>
                  <tr>
                    <td>Status</td>
                    <td><span className={`token-badge ${status.cls}`}>{status.label}</span></td>
                  </tr>
                  <tr>
                    <td>Expires at</td>
                    <td><code>{formatDate(primaryToken.expiresAt)}</code></td>
                  </tr>
                  <tr>
                    <td>Scope</td>
                    <td><code>{String(primaryToken.scope ?? 'N/A')}</code></td>
                  </tr>
                  <tr>
                    <td>Access token</td>
                    <td>
                      <code>{primaryToken.accessToken ? `${String(primaryToken.accessToken).slice(0, 32)}…` : 'N/A'}</code>
                      {primaryToken.accessToken && (
                        <button className="btn-copy" data-copy={String(primaryToken.accessToken)}>Copy</button>
                      )}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </>
        )}

        <h2>Full Session</h2>
        <pre>{JSON.stringify(session, null, 2)}</pre>
      </main>
    </>
  )
}
