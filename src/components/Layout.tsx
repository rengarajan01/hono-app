import type { PropsWithChildren } from 'react'

type LayoutProps = PropsWithChildren<{ title?: string }>

const css = `
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  /* ── Base ── */
  body {
    font-family: system-ui, -apple-system, sans-serif;
    background-color: #07060f;
    background-image:
      radial-gradient(ellipse 80% 50% at 50% -5%, rgba(99,102,241,0.28) 0%, transparent 70%),
      radial-gradient(ellipse 50% 40% at 90% 90%, rgba(139,92,246,0.12) 0%, transparent 60%);
    background-attachment: fixed;
    color: #e2e0f0;
    line-height: 1.6;
    min-height: 100vh;
  }
  a { color: #818cf8; text-decoration: none; }
  a:hover { color: #a5b4fc; }
  strong { color: #f0eeff; }

  /* ── Nav ── */
  nav {
    background: rgba(7,6,15,0.82);
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    border-bottom: 1px solid rgba(255,255,255,0.07);
    padding: 0 2rem;
    display: flex;
    align-items: center;
    gap: 1.25rem;
    height: 58px;
    position: sticky;
    top: 0;
    z-index: 100;
  }
  .brand {
    font-weight: 800;
    font-size: 1.05rem;
    background: linear-gradient(135deg, #818cf8 0%, #c084fc 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    letter-spacing: -0.01em;
  }
  .nav-link {
    display: inline-flex;
    align-items: center;
    gap: 0.3rem;
    font-size: 0.875rem;
    color: #c4c2e0;
    transition: color .15s;
  }
  .nav-link:hover { color: #f0eeff; }
  .nav-link svg { flex-shrink: 0; }
  .nav-spacer { flex: 1; }
  .nav-badge {
    display: inline-flex;
    align-items: center;
    gap: 0.4rem;
    background: rgba(99,102,241,0.12);
    border: 1px solid rgba(99,102,241,0.25);
    padding: 0.2rem 0.6rem;
    border-radius: 99px;
    font-size: 0.8rem;
    color: #a5b4fc;
    font-weight: 500;
    max-width: 180px;
    overflow: hidden;
  }
  .nav-badge-text { overflow: hidden; white-space: nowrap; text-overflow: ellipsis; min-width: 0; }
  .nav-avatar { width: 20px; height: 20px; border-radius: 50%; object-fit: cover; flex-shrink: 0; }

  /* ── Layout ── */
  main { max-width: 900px; margin: 0 auto; padding: 2.5rem 1.5rem 5rem; }

  /* ── Typography ── */
  h1 { font-size: 1.75rem; font-weight: 700; letter-spacing: -0.02em; color: #f0eeff; }
  h2 {
    font-size: 0.68rem;
    font-weight: 600;
    margin: 2.25rem 0 0.75rem;
    color: #5b5880;
    text-transform: uppercase;
    letter-spacing: 0.09em;
  }
  p { margin-bottom: 0.875rem; color: #9490b8; }
  .text-muted { color: #5b5880; }
  .text-dim { color: #9490b8; }

  /* ── Hero (logged-out home) ── */
  .hero {
    background: linear-gradient(145deg, #130f2a 0%, #0e0b22 50%, #1a0f35 100%);
    border: 1px solid rgba(99,102,241,0.22);
    border-radius: 20px;
    padding: 4rem 3rem;
    margin-bottom: 2.5rem;
    position: relative;
    overflow: hidden;
  }
  .hero::before {
    content: '';
    position: absolute;
    top: -40%; right: -10%;
    width: 500px; height: 500px;
    background: radial-gradient(circle, rgba(99,102,241,0.38) 0%, transparent 65%);
    border-radius: 50%;
    pointer-events: none;
  }
  .hero::after {
    content: '';
    position: absolute;
    bottom: -50%; left: -5%;
    width: 350px; height: 350px;
    background: radial-gradient(circle, rgba(139,92,246,0.2) 0%, transparent 60%);
    border-radius: 50%;
    pointer-events: none;
  }
  .hero h1 { color: #fff; font-size: 2.25rem; margin-bottom: 0.75rem; position: relative; }
  .hero-sub { color: rgba(255,255,255,0.52); font-size: 1rem; margin-bottom: 1.75rem; max-width: 520px; position: relative; }
  .hero strong { color: rgba(255,255,255,0.88); }
  .hero .actions { position: relative; }

  /* ── Welcome banner (logged-in home) ── */
  .welcome {
    background: linear-gradient(135deg, #2e2a72 0%, #4c1d95 100%);
    border: 1px solid rgba(165,180,252,0.18);
    border-radius: 16px;
    padding: 1.75rem 2rem;
    margin-bottom: 2rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 1rem;
  }
  .welcome h1 { color: #fff; font-size: 1.5rem; margin-bottom: 0.15rem; }
  .welcome p { color: rgba(255,255,255,0.55); font-size: 0.875rem; }

  /* ── Cards ── */
  .card {
    background: rgba(255,255,255,0.03);
    border: 1px solid rgba(255,255,255,0.08);
    border-radius: 14px;
    padding: 1.5rem;
    margin-bottom: 1.5rem;
  }
  .card-table { padding: 0; overflow: hidden; }
  .card-label {
    font-size: 0.72rem;
    font-weight: 600;
    color: #5b5880;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    margin-bottom: 1rem;
  }

  /* ── Stat cards ── */
  .stat-card {
    background: rgba(255,255,255,0.03);
    border: 1px solid rgba(255,255,255,0.08);
    border-radius: 14px;
    padding: 1.1rem 1.25rem;
  }
  .stat-label { font-size: 0.68rem; color: #5b5880; text-transform: uppercase; letter-spacing: 0.08em; margin-bottom: 0.3rem; }
  .stat-value { font-size: 1.05rem; font-weight: 600; color: #f0eeff; margin: 0; overflow: hidden; white-space: nowrap; text-overflow: ellipsis; }

  /* ── Grid ── */
  .grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); gap: 1rem; margin-bottom: 1.5rem; }

  /* ── Tables ── */
  table { width: 100%; border-collapse: collapse; font-size: 0.875rem; }
  th, td { text-align: left; padding: 0.7rem 1rem; border-bottom: 1px solid rgba(255,255,255,0.06); }
  th {
    background: rgba(255,255,255,0.04);
    font-weight: 600;
    color: #5b5880;
    font-size: 0.68rem;
    text-transform: uppercase;
    letter-spacing: 0.08em;
  }
  tr:last-child td { border-bottom: none; }
  tbody tr:hover td { background: rgba(255,255,255,0.025); }
  td { color: #c4c2e0; }
  td code {
    background: rgba(99,102,241,0.12);
    color: #c4b5fd;
    padding: 0.1rem 0.45rem;
    border-radius: 4px;
    font-family: ui-monospace, monospace;
    font-size: 0.82rem;
    word-break: break-all;
  }
  .td-muted { color: #9490b8; }

  /* ── Buttons ── */
  .btn {
    display: inline-flex;
    align-items: center;
    gap: 0.4rem;
    padding: 0.5rem 1.1rem;
    border-radius: 9px;
    font-size: 0.875rem;
    font-weight: 500;
    cursor: pointer;
    border: none;
    text-decoration: none;
    white-space: nowrap;
    transition: transform .12s, box-shadow .12s, background .12s;
  }
  .btn:hover { text-decoration: none; transform: translateY(-1px); }
  .btn-primary {
    background: linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%);
    color: #fff;
    box-shadow: 0 2px 12px rgba(99,102,241,.4);
  }
  .btn-primary:hover { box-shadow: 0 5px 22px rgba(99,102,241,.55); }
  .btn-secondary {
    background: rgba(255,255,255,0.07);
    color: #e2e0f0;
    border: 1px solid rgba(255,255,255,0.12);
  }
  .btn-secondary:hover { background: rgba(255,255,255,0.12); }
  .btn-danger {
    background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%);
    color: #fff;
    box-shadow: 0 2px 8px rgba(220,38,38,.3);
  }
  .btn-danger:hover { box-shadow: 0 5px 16px rgba(220,38,38,.48); }
  .btn-ghost {
    background: rgba(255,255,255,0.09);
    color: rgba(255,255,255,0.82);
    border: 1px solid rgba(255,255,255,0.14);
  }
  .btn-ghost:hover { background: rgba(255,255,255,0.16); }

  /* ── Actions row ── */
  .actions { display: flex; gap: 0.6rem; flex-wrap: wrap; align-items: center; }

  /* ── Routes / About table column widths ── */
  .col-try { width: 7rem; }

  /* ── Routes reference table column widths ── */
  .routes-table .col-method { width: 5rem; }
  .routes-table .col-path { width: 38%; }

  /* ── Route method badges ── */
  .route-tag {
    display: inline-block;
    padding: 0.15rem 0.5rem;
    border-radius: 4px;
    font-size: 0.7rem;
    font-weight: 700;
    font-family: ui-monospace, monospace;
  }
  .get  { background: rgba(59,130,246,0.15); color: #93c5fd; }
  .post { background: rgba(34,197,94,0.12);  color: #86efac; }

  /* ── User row (profile) ── */
  .avatar-lg {
    width: 64px; height: 64px;
    border-radius: 50%;
    border: 2px solid rgba(99,102,241,0.4);
    object-fit: cover;
  }
  .user-row { display: flex; align-items: center; gap: 1rem; }
  .user-name { font-size: 1.5rem; font-weight: 700; color: #fff; margin-bottom: 0.15rem; }
  .user-email { color: rgba(255,255,255,0.55); font-size: 0.875rem; margin-bottom: 0; }
  .verified { color: #34d399; font-size: 0.78rem; margin-left: 0.3rem; font-weight: 600; }

  /* ── Pre / JSON ── */
  pre {
    background: rgba(0,0,0,0.45);
    border: 1px solid rgba(255,255,255,0.07);
    color: #a5b4fc;
    padding: 1.25rem;
    border-radius: 12px;
    overflow: auto;
    font-size: 0.8rem;
    font-family: ui-monospace, monospace;
    line-height: 1.6;
    margin-bottom: 1.5rem;
    max-height: 480px;
  }

  /* ── Divider ── */
  .divider { border: none; border-top: 1px solid rgba(255,255,255,0.07); margin: 1.75rem 0; }

  /* ── Page Banner (shared inner-page header) ── */
  .page-banner {
    background: linear-gradient(135deg, #2e2a72 0%, #4c1d95 100%);
    border: 1px solid rgba(165,180,252,0.18);
    border-radius: 16px;
    padding: 1.75rem 2rem;
    margin-bottom: 2rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 1rem;
    position: relative;
    overflow: hidden;
  }
  .page-banner::before {
    content: '';
    position: absolute;
    top: -80%; right: -5%;
    width: 320px; height: 320px;
    background: radial-gradient(circle, rgba(165,130,252,0.25) 0%, transparent 65%);
    border-radius: 50%;
    pointer-events: none;
  }
  .page-banner h1 { color: #fff; margin-bottom: 0.15rem; position: relative; }
  .page-banner .banner-sub { margin-bottom: 0; color: rgba(255,255,255,0.55); font-size: 0.875rem; position: relative; }
  .page-banner strong { color: rgba(255,255,255,0.9); }
  .page-banner a { color: rgba(196,181,253,0.9); }
  .page-banner a:hover { color: #fff; }

  /* ── Filter bar ── */
  .filter-bar { margin-bottom: 1rem; }
  .filter-input {
    background: rgba(255,255,255,0.06);
    border: 1px solid rgba(255,255,255,0.12);
    border-radius: 9px;
    padding: 0.5rem 1rem 0.5rem 2.2rem;
    color: #e2e0f0;
    font-size: 0.875rem;
    width: 100%;
    max-width: 340px;
    outline: none;
    transition: border-color .15s, box-shadow .15s;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='14' height='14' viewBox='0 0 24 24' fill='none' stroke='%235b5880' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Ccircle cx='11' cy='11' r='8'/%3E%3Cpath d='m21 21-4.35-4.35'/%3E%3C/svg%3E");
    background-repeat: no-repeat;
    background-position: 0.75rem center;
  }
  .filter-input::placeholder { color: #5b5880; }
  .filter-input:focus { border-color: rgba(99,102,241,0.5); box-shadow: 0 0 0 3px rgba(99,102,241,0.12); }

  /* ── Token status badge ── */
  .token-badge {
    display: inline-flex; align-items: center; gap: 0.3rem;
    padding: 0.15rem 0.6rem; border-radius: 99px;
    font-size: 0.75rem; font-weight: 600;
  }
  .token-badge.valid   { background: rgba(52,211,153,0.12);  color: #34d399; border: 1px solid rgba(52,211,153,0.25); }
  .token-badge.expiring{ background: rgba(251,191,36,0.12);   color: #fbbf24; border: 1px solid rgba(251,191,36,0.25); }
  .token-badge.expired { background: rgba(239,68,68,0.12);    color: #f87171; border: 1px solid rgba(239,68,68,0.25); }

  /* ── Copy button ── */
  .btn-copy {
    background: rgba(255,255,255,0.06);
    color: #9490b8;
    border: 1px solid rgba(255,255,255,0.1);
    padding: 0.2rem 0.55rem;
    border-radius: 5px;
    font-size: 0.75rem;
    cursor: pointer;
    transition: background .12s, color .12s, border-color .12s;
    margin-left: 0.5rem;
    vertical-align: middle;
  }
  .btn-copy:hover { background: rgba(99,102,241,0.15); color: #a5b4fc; }
  .btn-copy.copied { color: #34d399; border-color: rgba(52,211,153,0.3); }

  /* ── API Explorer ── */
  .ep-list { display: flex; flex-direction: column; gap: 0.875rem; }
  .ep-card {
    background: rgba(255,255,255,0.03);
    border: 1px solid rgba(255,255,255,0.08);
    border-radius: 14px;
    overflow: hidden;
    transition: border-color .2s;
  }
  .ep-card:hover { border-color: rgba(99,102,241,0.3); }
  .ep-header {
    display: flex;
    align-items: center;
    gap: 0.875rem;
    padding: 1rem 1.25rem;
    flex-wrap: wrap;
  }
  .ep-path { font-family: ui-monospace, monospace; font-size: 0.875rem; color: #c4b5fd; flex: 1; min-width: 120px; }
  .ep-desc { font-size: 0.82rem; color: #9490b8; flex: 2; min-width: 180px; }
  .ep-actions { display: flex; align-items: center; gap: 0.6rem; margin-left: auto; }
  .ep-input {
    background: rgba(255,255,255,0.06);
    border: 1px solid rgba(255,255,255,0.12);
    border-radius: 7px;
    padding: 0.38rem 0.75rem;
    color: #e2e0f0;
    font-size: 0.82rem;
    font-family: ui-monospace, monospace;
    width: 220px;
    outline: none;
    transition: border-color .15s, box-shadow .15s;
  }
  .ep-input::placeholder { color: #5b5880; }
  .ep-input:focus { border-color: rgba(99,102,241,0.5); box-shadow: 0 0 0 3px rgba(99,102,241,0.12); }
  .ep-input.input-err { border-color: rgba(239,68,68,0.6); box-shadow: 0 0 0 3px rgba(239,68,68,0.1); }
  .btn-sm { padding: 0.38rem 0.9rem; font-size: 0.8rem; }
  .api-out {
    margin: 0;
    padding: 1.1rem 1.25rem;
    border-radius: 0;
    border-top: 1px solid rgba(255,255,255,0.07);
    font-size: 0.8rem;
    max-height: 400px;
    overflow-y: auto;
  }
  .api-out.ok { border-top-color: rgba(52,211,153,0.2); color: #a7f3d0; }
  .api-out.err { border-top-color: rgba(239,68,68,0.2); color: #fca5a5; }
  .api-out.loading { color: #5b5880; }
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
      <body>
        {children}
        <script dangerouslySetInnerHTML={{ __html: `(function(){document.addEventListener('click',function(e){var b=e.target.closest('[data-copy]');if(!b)return;navigator.clipboard.writeText(b.dataset.copy).then(function(){var o=b.textContent;b.textContent='Copied!';b.classList.add('copied');setTimeout(function(){b.textContent=o;b.classList.remove('copied');},1500);});});})();` }} />
      </body>
    </html>
  )
}
