import type { PropsWithChildren } from 'react'

type LayoutProps = PropsWithChildren<{ title?: string }>

const css = `
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  body { font-family: system-ui, -apple-system, sans-serif; background: #f5f5f5; color: #1a1a1a; line-height: 1.6; }
  a { color: #0070f3; text-decoration: none; }
  a:hover { text-decoration: underline; }
  nav { background: #fff; border-bottom: 1px solid #e5e5e5; padding: 0 2rem; display: flex; align-items: center; gap: 1.5rem; height: 56px; }
  nav .brand { font-weight: 700; font-size: 1.1rem; color: #1a1a1a; }
  nav .spacer { flex: 1; }
  nav a, nav span { font-size: 0.9rem; }
  nav .badge { background: #f0f0f0; padding: 0.2rem 0.6rem; border-radius: 99px; font-size: 0.8rem; color: #555; }
  main { max-width: 900px; margin: 2.5rem auto; padding: 0 1.5rem; }
  h1 { font-size: 1.8rem; font-weight: 700; margin-bottom: 1.5rem; }
  h2 { font-size: 1.2rem; font-weight: 600; margin: 1.5rem 0 0.75rem; color: #333; }
  p { margin-bottom: 1rem; color: #555; }
  .card { background: #fff; border: 1px solid #e5e5e5; border-radius: 10px; padding: 1.5rem; margin-bottom: 1.5rem; }
  table { width: 100%; border-collapse: collapse; font-size: 0.9rem; }
  th, td { text-align: left; padding: 0.6rem 0.8rem; border-bottom: 1px solid #e5e5e5; }
  th { background: #f9f9f9; font-weight: 600; color: #555; font-size: 0.8rem; text-transform: uppercase; letter-spacing: 0.04em; }
  td:first-child { font-weight: 500; width: 40%; }
  td code { background: #f0f0f0; padding: 0.1rem 0.4rem; border-radius: 4px; font-family: monospace; font-size: 0.85rem; word-break: break-all; }
  .btn { display: inline-flex; align-items: center; gap: 0.4rem; padding: 0.5rem 1.1rem; border-radius: 6px; font-size: 0.9rem; font-weight: 500; cursor: pointer; border: none; text-decoration: none; }
  .btn-primary { background: #0070f3; color: #fff; }
  .btn-primary:hover { background: #005fcc; text-decoration: none; }
  .btn-secondary { background: #fff; color: #1a1a1a; border: 1px solid #d1d1d1; }
  .btn-secondary:hover { background: #f5f5f5; text-decoration: none; }
  .btn-danger { background: #e00; color: #fff; }
  .btn-danger:hover { background: #c00; text-decoration: none; }
  .actions { display: flex; gap: 0.75rem; flex-wrap: wrap; margin-top: 1.25rem; }
  .grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(260px, 1fr)); gap: 1rem; margin-bottom: 1.5rem; }
  .route-tag { display: inline-block; padding: 0.15rem 0.5rem; border-radius: 4px; font-size: 0.75rem; font-weight: 600; font-family: monospace; margin-right: 0.4rem; }
  .get  { background: #dbeafe; color: #1e40af; }
  .post { background: #dcfce7; color: #166534; }
  .avatar { width: 48px; height: 48px; border-radius: 50%; border: 2px solid #e5e5e5; }
  .user-row { display: flex; align-items: center; gap: 1rem; margin-bottom: 1.5rem; }
  .user-info h1 { margin: 0 0 0.2rem; font-size: 1.4rem; }
  .user-info p { margin: 0; }
  pre { background: #1a1a1a; color: #e5e5e5; padding: 1.2rem; border-radius: 8px; overflow-x: auto; font-size: 0.82rem; font-family: monospace; line-height: 1.5; }
`

export function Layout({ children, title = 'Hono + Auth0' }: LayoutProps) {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>{title}</title>
        <style dangerouslySetInnerHTML={{ __html: css }} />
      </head>
      <body>{children}</body>
    </html>
  )
}
