import type { User } from './types.js'

const s = { width: 14, height: 14, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 2, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const, 'aria-hidden': true }

const HomeIcon    = () => <svg {...s}><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
const InfoIcon    = () => <svg {...s}><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
const UserIcon    = () => <svg {...s}><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
const GridIcon    = () => <svg {...s}><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/></svg>
const CodeIcon    = () => <svg {...s}><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>
const LogOutIcon  = () => <svg {...s}><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>

type NavProps = { user?: User }

export function Nav({ user }: NavProps) {
  return (
    <nav>
      <a href="/" className="brand">Hono + Auth0</a>
      <div className="nav-spacer" />
      <a href="/" className="nav-link"><HomeIcon /> Home</a>
      <a href="/about" className="nav-link"><InfoIcon /> About</a>
      {user ? (
        <>
          <a href="/profile" className="nav-link"><UserIcon /> Profile</a>
          <a href="/dashboard" className="nav-link"><GridIcon /> Dashboard</a>
          <a href="/explorer" className="nav-link"><CodeIcon /> API</a>
          <span className="nav-badge">
            {user.picture && <img src={user.picture} alt="" aria-hidden="true" className="nav-avatar" />}
            <span className="nav-badge-text">{user.name ?? user.email ?? user.sub}</span>
          </span>
          <a href="/auth/logout" className="btn btn-danger" aria-label="Log out">
            <LogOutIcon /> Logout
          </a>
        </>
      ) : (
        <a href="/auth/login" className="btn btn-primary">Login</a>
      )}
    </nav>
  )
}
