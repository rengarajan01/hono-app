import { Nav } from './Nav.js'
import type { User } from './types.js'

type ProfilePageProps = { user: User }

const HIGHLIGHT_CLAIMS = ['sub', 'name', 'email', 'picture', 'email_verified', 'nickname', 'given_name', 'family_name']

export function ProfilePage({ user }: ProfilePageProps) {
  const highlighted = HIGHLIGHT_CLAIMS.filter((k) => user[k] !== undefined)
  const rest = Object.keys(user).filter((k) => !HIGHLIGHT_CLAIMS.includes(k))

  return (
    <>
      <Nav user={user} />
      <main>
        <div className="page-header">
          <div className="user-row" style={{ marginBottom: 0 }}>
            {user.picture && <img src={user.picture} alt="avatar" className="avatar-lg" />}
            <div className="user-info">
              <h1>{user.name ?? user.nickname ?? user.email ?? user.sub}</h1>
              {user.email && <p>{user.email}{user.email_verified ? ' ✓' : ' (unverified)'}</p>}
            </div>
          </div>
          <div className="actions">
            <a href="/dashboard" className="btn btn-secondary">Dashboard</a>
            <a href="/api/me" className="btn btn-secondary">Raw JSON</a>
            <a href="/" className="btn btn-secondary">Home</a>
            <a href="/auth/logout" className="btn btn-danger">Logout</a>
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
      </main>
    </>
  )
}
