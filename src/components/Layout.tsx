import type { PropsWithChildren } from 'react'

type LayoutProps = PropsWithChildren<{ title?: string }>

const css = `
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  body { font-family: system-ui, -apple-system, sans-serif; background: #f8fafc; color: #0f172a; line-height: 1.6; }
  a { color: #2563eb; text-decoration: none; }
  a:hover { text-decoration: underline; }

  nav { background: #fff; border-bottom: 1px solid #e2e8f0; padding: 0 2rem; display: flex; align-items: center; gap: 1.25rem; height: 58px; position: sticky; top: 0; z-index: 100; box-shadow: 0 1px 4px rgba(0,0,0,.05); }
  nav .brand { font-weight: 700; font-size: 1.05rem; color: #0f172a; letter-spacing: -0.01em; }
  nav .spacer { flex: 1; }
  nav a, nav span { font-size: 0.875rem; }
  nav .badge { background: #f1f5f9; padding: 0.25rem 0.65rem; border-radius: 99px; font-size: 0.8rem; color: #475569; font-weight: 500; }

  main { max-width: 900px; margin: 2.5rem auto; padding: 0 1.5rem 3rem; }

  h1 { font-size: 1.75rem; font-weight: 700; letter-spacing: -0.02em; color: #0f172a; }
  h2 { font-size: 0.75rem; font-weight: 600; margin: 2rem 0 0.75rem; color: #64748b; text-transform: uppercase; letter-spacing: 0.06em; }
  p { margin-bottom: 0.875rem; color: #475569; }

  .card { background: #fff; border: 1px solid #e2e8f0; border-radius: 12px; padding: 1.5rem; margin-bottom: 1.5rem; box-shadow: 0 1px 3px rgba(0,0,0,.04); }

  .stat-card { background: #fff; border: 1px solid #e2e8f0; border-radius: 12px; padding: 1rem 1.25rem; box-shadow: 0 1px 3px rgba(0,0,0,.04); }
  .stat-label { font-size: 0.72rem; color: #94a3b8; text-transform: uppercase; letter-spacing: 0.06em; margin-bottom: 0.3rem; }
  .stat-value { font-size: 1.05rem; font-weight: 600; color: #0f172a; }

  table { width: 100%; border-collapse: collapse; font-size: 0.875rem; }
  th, td { text-align: left; padding: 0.65rem 0.875rem; border-bottom: 1px solid #f1f5f9; }
  th { background: #f8fafc; font-weight: 600; color: #64748b; font-size: 0.72rem; text-transform: uppercase; letter-spacing: 0.05em; }
  tr:last-child td { border-bottom: none; }
  td code { background: #f1f5f9; color: #0f172a; padding: 0.1rem 0.4rem; border-radius: 4px; font-family: ui-monospace, monospace; font-size: 0.82rem; word-break: break-all; }

  .btn { display: inline-flex; align-items: center; gap: 0.4rem; padding: 0.5rem 1.1rem; border-radius: 8px; font-size: 0.875rem; font-weight: 500; cursor: pointer; border: none; text-decoration: none; }
  .btn:hover { opacity: 0.85; text-decoration: none; }
  .btn-primary { background: #2563eb; color: #fff; }
  .btn-secondary { background: #fff; color: #374151; border: 1px solid #d1d5db; }
  .btn-secondary:hover { background: #f9fafb; opacity: 1; }
  .btn-danger { background: #dc2626; color: #fff; }

  .actions { display: flex; gap: 0.6rem; flex-wrap: wrap; }

  .page-header { display: flex; align-items: flex-start; justify-content: space-between; margin-bottom: 1.75rem; gap: 1rem; flex-wrap: wrap; }
  .page-header h1 { margin-bottom: 0; }

  .grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); gap: 1rem; margin-bottom: 1.5rem; }

  .route-tag { display: inline-block; padding: 0.15rem 0.5rem; border-radius: 4px; font-size: 0.72rem; font-weight: 700; font-family: ui-monospace, monospace; }
  .get  { background: #dbeafe; color: #1d4ed8; }
  .post { background: #dcfce7; color: #15803d; }

  .avatar { width: 48px; height: 48px; border-radius: 50%; border: 2px solid #e2e8f0; object-fit: cover; }
  .avatar-lg { width: 64px; height: 64px; border-radius: 50%; border: 2px solid #e2e8f0; object-fit: cover; }
  .user-row { display: flex; align-items: center; gap: 1rem; margin-bottom: 1.5rem; }
  .user-info h1 { margin: 0 0 0.2rem; font-size: 1.5rem; }
  .user-info p { margin: 0; }

  pre { background: #0f172a; color: #e2e8f0; padding: 1.25rem; border-radius: 10px; overflow-x: auto; font-size: 0.8rem; font-family: ui-monospace, monospace; line-height: 1.6; margin-bottom: 1.5rem; }

  .hero { margin-bottom: 2rem; }
  .hero h1 { font-size: 2rem; margin-bottom: 0.5rem; }
  .hero p { font-size: 1rem; color: #64748b; margin-bottom: 1.25rem; }
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
