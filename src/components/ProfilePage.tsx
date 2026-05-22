import { Nav } from './Nav.js'
import type { User } from './types.js'

type ProfilePageProps = { user: User }

const HIGHLIGHT_CLAIMS = ['sub', 'name', 'email', 'picture', 'email_verified', 'nickname', 'given_name', 'family_name']

const filterScript = `(function(){
  var input = document.getElementById('claim-filter');
  if (!input) return;
  input.addEventListener('input', function() {
    var q = this.value.toLowerCase();
    document.querySelectorAll('#claims-tbody tr').forEach(function(row) {
      row.style.display = row.textContent.toLowerCase().includes(q) ? '' : 'none';
    });
  });
})();`

export function ProfilePage({ user }: ProfilePageProps) {
  const highlighted = HIGHLIGHT_CLAIMS.filter((k) => user[k] !== undefined)
  const rest = Object.keys(user).filter((k) => !HIGHLIGHT_CLAIMS.includes(k))
  const displayName = user.name ?? user.nickname ?? user.email ?? user.sub

  return (
    <>
      <Nav user={user} />
      <main>
        <div className="page-banner">
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
          <a href="/api/me" className="btn btn-secondary">Raw JSON</a>
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
        <div className="card card-table">
          <table>
            <thead><tr><th>Claim</th><th>Value</th></tr></thead>
            <tbody id="claims-tbody">
              {highlighted.map((key) => (
                <tr key={key}>
                  <td><strong>{key}</strong></td>
                  <td>
                    <code>{String(user[key])}</code>
                    <button className="btn-copy" data-copy={String(user[key])}>Copy</button>
                  </td>
                </tr>
              ))}
              {rest.map((key) => (
                <tr key={key}>
                  <td>{key}</td>
                  <td>
                    <code>{JSON.stringify(user[key])}</code>
                    <button className="btn-copy" data-copy={JSON.stringify(user[key])}>Copy</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
      <script dangerouslySetInnerHTML={{ __html: filterScript }} />
    </>
  )
}
