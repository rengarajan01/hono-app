import { Nav } from './Nav.js'
import type { User } from './types.js'

type Endpoint = {
  id: string
  method: 'GET'
  path: string
  url: string
  description: string
  inputPlaceholder?: string
}

const ENDPOINTS: Endpoint[] = [
  {
    id: 'me',
    method: 'GET',
    path: '/api/me',
    url: '/api/me',
    description: 'Returns the authenticated user\'s identity claims',
  },
  {
    id: 'session',
    method: 'GET',
    path: '/api/session',
    url: '/api/session',
    description: 'Returns the full session object including all token metadata',
  },
  {
    id: 'token',
    method: 'GET',
    path: '/api/token',
    url: '/api/token',
    description: 'Returns the current access token, automatically refreshed if expired',
  },
  {
    id: 'claims',
    method: 'GET',
    path: '/api/claims/:claim',
    url: '/api/claims/__INPUT__',
    description: 'Returns the value of a single claim by name',
    inputPlaceholder: 'Claim name — e.g. sub, email, name',
  },
  {
    id: 'conn',
    method: 'GET',
    path: '/api/token/connection?connection=…',
    url: '/api/token/connection?connection=__INPUT__',
    description: 'Returns a token scoped to a federated social connection',
    inputPlaceholder: 'Connection name — e.g. github, google-oauth2',
  },
]

const clientScript = `
(function () {
  document.addEventListener('click', async function (e) {
    var btn = e.target.closest('[data-run]');
    if (!btn || btn.disabled) return;
    var id = btn.dataset.run;
    var url = btn.dataset.url;
    var input = document.getElementById('inp-' + id);
    if (input) {
      var val = input.value.trim();
      if (!val) { input.focus(); input.classList.add('input-err'); return; }
      input.classList.remove('input-err');
      url = url.replace('__INPUT__', encodeURIComponent(val));
    }
    var out = document.getElementById('out-' + id);
    btn.disabled = true;
    var orig = btn.innerHTML;
    btn.innerHTML = '<span style="opacity:0.6">Running…</span>';
    out.style.display = 'block';
    out.className = 'api-out loading';
    out.textContent = 'Fetching…';
    try {
      var r = await fetch(url);
      var raw = await r.text();
      var display;
      try { display = JSON.stringify(JSON.parse(raw), null, 2); } catch (ex) { display = raw; }
      out.textContent = display;
      out.className = 'api-out ' + (r.ok ? 'ok' : 'err');
    } catch (ex) {
      out.textContent = 'Network error: ' + ex.message;
      out.className = 'api-out err';
    }
    btn.disabled = false;
    btn.innerHTML = orig;
  });
})();
`

function EndpointCard({ ep }: { ep: Endpoint }) {
  return (
    <div className="ep-card">
      <div className="ep-header">
        <span className={`route-tag ${ep.method.toLowerCase()}`}>{ep.method}</span>
        <code className="ep-path">{ep.path}</code>
        <span className="ep-desc">{ep.description}</span>
        <div className="ep-actions">
          {ep.inputPlaceholder && (
            <input
              id={`inp-${ep.id}`}
              className="ep-input"
              type="text"
              placeholder={ep.inputPlaceholder}
            />
          )}
          <button
            className="btn btn-primary btn-sm"
            data-run={ep.id}
            data-url={ep.url}
          >
            ▶ Run
          </button>
        </div>
      </div>
      <pre id={`out-${ep.id}`} className="api-out" style={{ display: 'none' }}></pre>
    </div>
  )
}

export function ApiExplorerPage({ user }: { user: User }) {
  return (
    <>
      <Nav user={user} />
      <main>
        <div className="page-banner">
          <div>
            <h1>API Explorer</h1>
            <p className="banner-sub">Execute endpoints live and inspect the JSON response. All routes require authentication.</p>
          </div>
        </div>

        <div className="ep-list">
          {ENDPOINTS.map((ep) => <EndpointCard key={ep.id} ep={ep} />)}
        </div>
      </main>
      <script dangerouslySetInnerHTML={{ __html: clientScript }} />
    </>
  )
}
