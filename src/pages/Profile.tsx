import { PageLayout } from '../components/PageLayout.js'
import { CardTable } from '../components/CardTable.js'
import { CopyButton } from '../components/CopyButton.js'
import type { User } from '../types/index.js'

type ProfileProps = { user: User }

const HIGHLIGHT_CLAIMS = ['sub', 'name', 'email', 'picture', 'email_verified', 'nickname', 'given_name', 'family_name']

export function Profile({ user }: ProfileProps) {
  const highlighted = HIGHLIGHT_CLAIMS.filter((k) => user[k] !== undefined)
  const rest = Object.keys(user).filter((k) => !HIGHLIGHT_CLAIMS.includes(k))
  const displayName = user.name ?? user.nickname ?? user.email ?? user.sub

  return (
    <PageLayout user={user} scriptSrc="/scripts/filter.js">
      <div className='hero'>
        <h1>Hey!</h1>
        <div className="user-row">
          {user.picture && <img src={user.picture} alt={`${displayName}'s avatar`} className="avatar-lg" />}
          <div>
            <p className="user-name">{displayName}</p>
            {user.email && (
              <p className="user-email">
                {user.email}
                {user.email_verified
                  ? <span className="verified">✓ verified</span>
                  : <span className="text-muted"> · unverified</span>
                }
              </p>
            )}
          </div>
        </div>
      </div>

      <h2>Identity Claims</h2>
      <div className="filter-bar">
        <input
          id="claim-filter"
          className="filter-input"
          type="text"
          placeholder="Filter claims…"
          autoComplete="off"
        />
      </div>
      <CardTable>
        <thead><tr><th>Claim</th><th>Value</th></tr></thead>
        <tbody id="claims-tbody">
          {highlighted.map((key) => (
            <tr key={key}>
              <td><strong>{key}</strong></td>
              <td>
                <code>{String(user[key])}</code>
                <CopyButton value={String(user[key])} />
              </td>
            </tr>
          ))}
          {rest.map((key) => (
            <tr key={key}>
              <td>{key}</td>
              <td>
                <code>{JSON.stringify(user[key])}</code>
                <CopyButton value={JSON.stringify(user[key])} />
              </td>
            </tr>
          ))}
        </tbody>
      </CardTable>
    </PageLayout>
  )
}
