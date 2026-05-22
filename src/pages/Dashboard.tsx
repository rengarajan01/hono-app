import { PageLayout } from '../components/PageLayout.js'
import { CardTable } from '../components/CardTable.js'
import { CopyButton } from '../components/CopyButton.js'
import { StatCard } from '../components/StatCard.js'
import type { User, Session } from '../types/index.js'

type DashboardProps = { user: User; session: Session }

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

export function Dashboard({ user, session }: DashboardProps) {
  const tokenSets = session.tokenSets ?? []
  const primaryToken = tokenSets[0]
  const status = tokenStatus(primaryToken?.expiresAt)

  return (
    <PageLayout user={user}>
      <div className='hero'>
        <div>
          <h1>Session Dashboard</h1>
          <p className="hero-sub">Session metadata and token state for the current login.</p>
        </div>
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
          <CardTable>
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
                  {primaryToken.accessToken && <CopyButton value={String(primaryToken.accessToken)} />}
                </td>
              </tr>
            </tbody>
          </CardTable>
        </>
      )}

      <h2>Full Session</h2>
      <pre>{JSON.stringify(session, (key, value) => {
        if ((key === 'accessToken' || key === 'refreshToken' || key === 'idToken') && typeof value === 'string') {
          return `${value.slice(0, 16)}…[redacted]`
        }
        return value
      }, 2)}</pre>
    </PageLayout>
  )
}
