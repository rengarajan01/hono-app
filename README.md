# Hono + Auth0 Demo

A demo application showcasing the [`@auth0/auth0-hono`](https://github.com/auth0/auth0-hono) SDK — OIDC middleware for the [Hono](https://hono.dev) web framework. Runs on Cloudflare Workers with server-side React rendering. No client-side JS framework.

## Stack

- **[Hono](https://hono.dev)** — web framework
- **[@auth0/auth0-hono](https://github.com/auth0/auth0-hono)** — OIDC middleware
- **[@hono/react-renderer](https://github.com/honojs/middleware/tree/main/packages/react-renderer)** — server-side React, no client-side framework
- **[Cloudflare Workers](https://workers.cloudflare.com)** — runtime and deployment target

## SDK Features Demonstrated

| Feature | Where |
|---|---|
| `auth0()` — main middleware, populates `c.var.auth0` | `src/app.tsx` |
| `handleLogin()` — auto-mounted at `/auth/login` | SDK default |
| `handleCallback()` — auto-mounted at `/auth/callback` | SDK default |
| `handleLogout()` — auto-mounted at `/auth/logout` | SDK default |
| `handleBackchannelLogout()` — auto-mounted at `/auth/backchannel-logout` | SDK default |
| `requiresAuth()` — redirects browser to login | `src/routes/pages.tsx` |
| `requiresAuth('error')` — returns 401 JSON for API clients | `src/routes/api.ts` |
| `getUser(c)` — synchronous user claims from session | `src/routes/pages.tsx`, `src/routes/api.ts` |
| `getSession(c)` — full session object including tokens | `src/routes/pages.tsx`, `src/routes/api.ts` |
| `getAccessToken(c)` — access token with auto-refresh | `src/routes/api.ts` |
| `getAccessTokenForConnection(c, opts)` — federated connection token | `src/routes/api.ts` |

## Routes

### Pages (SSR)

| Route | Auth | Description |
|---|---|---|
| `GET /` | optional | Home — route reference |
| `GET /about` | optional | SDK feature reference with live "Try" links |
| `GET /profile` | required | User identity claims |
| `GET /dashboard` | required | Session metadata and token state |
| `GET /explorer` | required | Interactive API endpoint runner |

### Auth (auto-mounted by SDK)

| Route | Description |
|---|---|
| `GET /auth/login` | Start OIDC login |
| `GET /auth/callback` | OIDC callback |
| `GET /auth/logout` | Clear session and logout from Auth0 |
| `POST /auth/backchannel-logout` | IdP-initiated logout |

### API (JSON)

All `/api/*` routes return 401 JSON if unauthenticated (`requiresAuth('error')`).

| Route | Description |
|---|---|
| `GET /api/me` | User identity claims |
| `GET /api/session` | Full session object (tokens redacted) |
| `GET /api/token` | Access token, auto-refreshed if expired |
| `GET /api/token/connection?connection=` | Token for a federated connection (e.g. `github`) |
| `GET /api/claims/:claim` | Single claim value by name |

## Project Structure

```
src/
├── index.ts              # Node.js server entry (dev:node only)
├── worker.ts             # Cloudflare Workers entry
├── app.tsx               # Hono app — middleware, auth0(), error handler
├── types/
│   └── index.ts          # Shared types (User, Session, Endpoint)
├── routes/
│   ├── pages.tsx         # Page routes — public and requiresAuth()
│   └── api.ts            # /api/* — requiresAuth('error'), input validation
└── pages/
│   ├── Home.tsx          # Home page with route reference table
│   ├── About.tsx         # SDK feature reference with Try links
│   ├── Profile.tsx       # User identity claims with filter
│   ├── Dashboard.tsx     # Session metadata and token state
│   └── ApiExplorer.tsx   # Live API endpoint runner
└── components/
    ├── Layout.tsx         # HTML shell — links static CSS and copy script
    ├── PageLayout.tsx     # Nav + main wrapper used by all pages
    ├── Nav.tsx            # Auth-aware navigation bar
    ├── CardTable.tsx      # Card + table wrapper
    ├── StatCard.tsx       # Single stat display card
    ├── EndpointCard.tsx   # API explorer endpoint row
    ├── MethodBadge.tsx    # HTTP method badge (GET / POST)
    └── CopyButton.tsx     # Copy-to-clipboard button

public/
├── styles/
│   └── app.css           # Full design system — served as a static asset
└── scripts/
    ├── copy.js           # Copy-to-clipboard handler
    ├── filter.js         # Claims table filter
    └── endpoint.js       # API explorer fetch runner
```

## Local Development

### Prerequisites

- Node.js 20+
- An Auth0 Regular Web Application

### Auth0 Setup

In your Auth0 dashboard, configure your application:

- **Allowed Callback URLs**: `http://localhost:3000/auth/callback`
- **Allowed Logout URLs**: `http://localhost:3000`
- **Allowed Web Origins**: `http://localhost:3000`

### Environment

Non-secret config lives in `wrangler.toml` under `[vars]`. Secrets go in `.dev.vars` (gitignored):

```env
# .dev.vars
AUTH0_CLIENT_SECRET=your-client-secret
AUTH0_SESSION_ENCRYPTION_KEY=a-random-secret-at-least-32-characters-long
```

### Run

```bash
npm install

# Wrangler runtime (matches production, default)
npm run dev

# Node.js runtime
npm run dev:node
```

Open [http://localhost:3000](http://localhost:3000).

`npm run dev` uses `wrangler dev`, which runs the actual Cloudflare Workers runtime locally and serves static assets from `public/` automatically.

## Deployment (Cloudflare Workers)

### Auth0 Setup

Add your Worker URL to your Auth0 application:

- **Allowed Callback URLs**: `https://hono-app.your-subdomain.workers.dev/auth/callback`
- **Allowed Logout URLs**: `https://hono-app.your-subdomain.workers.dev`
- **Allowed Web Origins**: `https://hono-app.your-subdomain.workers.dev`

### Secrets

Public config goes in `wrangler.toml` under `[vars]`. Secrets must be set via the Cloudflare dashboard or CLI — never commit them.

```bash
npx wrangler secret put AUTH0_CLIENT_SECRET
npx wrangler secret put AUTH0_SESSION_ENCRYPTION_KEY
```

| Variable | How to set |
|---|---|
| `AUTH0_DOMAIN` | `wrangler.toml` `[vars]` |
| `AUTH0_CLIENT_ID` | `wrangler.toml` `[vars]` |
| `APP_BASE_URL` | `wrangler.toml` `[vars]` |
| `AUTH0_CLIENT_SECRET` | Cloudflare secret |
| `AUTH0_SESSION_ENCRYPTION_KEY` | Cloudflare secret |

Before deploying, update `APP_BASE_URL` in `wrangler.toml` to your Worker URL.

### Deploy

```bash
npx wrangler deploy
```

> `nodejs_compat` is required in `wrangler.toml` — the Auth0 SDK uses `AsyncLocalStorage` internally.

## Security

- **Content Security Policy** — `default-src 'none'`; scripts and styles are `'self'`-only (no inline, no CDN)
- **Security headers** — `X-Frame-Options: DENY`, `X-Content-Type-Options: nosniff`, HSTS, `Referrer-Policy`, `Permissions-Policy`
- **Input validation** — claim names and connection names validated against allowlist regex before use
- **Prototype pollution** — `Object.hasOwn` used for all user object property access
- **Token redaction** — access, refresh, and ID tokens are truncated in any JSON responses rendered to the page
- **No `dangerouslySetInnerHTML`** — all scripts and styles are external static files
