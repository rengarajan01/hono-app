import { Nav } from './Nav.js'
import type { User } from './types.js'

type ProfilePageProps = { user: User }

// Claims to highlight at the top vs show in the full table
const HIGHLIGHT_CLAIMS = ['sub', 'name', 'email', 'picture', 'email_verified', 'nickname', 'given_name', 'family_name']

export function ProfilePage({ user }: ProfilePageProps) {
  const highlighted = HIGHLIGHT_CLAIMS.filter((k) => user[k] !== undefined)
  const rest = Object.keys(user).filter((k) => !HIGHLIGHT_CLAIMS.includes(k))

  return (
    <>
      <Nav user={user} />
      <main>
        <div className="user-row">
          {user.picture && <img src={user.picture} alt="avatar" className="avatar" style={{ width: 64, height: 64 }} />}
          <div className="user-info">
            <h1>{user.name ?? user.nickname ?? user.email ?? user.sub}</h1>
            {user.email && <p>{user.email}{user.email_verified ? ' ✓' : ' (unverified)'}</p>}
          </div>
        </div>

        <h2>Identity Claims</h2>
        <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
          <table>
            <thead>
              <tr><th>Claim</th><th>Value</th></tr>
            </thead>
            <tbody>
              {highlighted.map((key) => (
                <tr key={key}>
                  <td>{key}</td>
                  <td><code>{String(user[key])}</code></td>
                </tr>
              ))}
              {rest.map((key) => (
                <tr key={key}>
                  <td>{key}</td>
                  <td><code>{JSON.stringify(user[key])}</code></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="actions">
          <a href="/dashboard" className="btn btn-secondary">Session Dashboard</a>
          <a href="/api/me" className="btn btn-secondary">Raw JSON (/api/me)</a>
          <a href="/" className="btn btn-secondary">Home</a>
          <a href="/auth/logout" className="btn btn-danger">Logout</a>
        </div>
      </main>
    </>
  )
}
