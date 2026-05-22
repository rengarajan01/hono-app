import type { User } from './types.js'

type NavProps = { user?: User }

export function Nav({ user }: NavProps) {
  return (
    <nav>
      <a href="/" className="brand">Hono + Auth0</a>
      <div className="spacer" />
      {user ? (
        <>
          {user.picture && <img src={user.picture} alt="avatar" className="avatar" />}
          <span className="badge">{user.name ?? user.email ?? user.sub}</span>
          <a href="/profile">Profile</a>
          <a href="/dashboard">Dashboard</a>
          <a href="/auth/logout" className="btn btn-danger">Logout</a>
        </>
      ) : (
        <>
          <a href="/about">About</a>
          <a href="/auth/login" className="btn btn-primary">Login</a>
        </>
      )}
    </nav>
  )
}
