# Hono + Auth0 Demo

A demo application showcasing the [`@auth0/auth0-hono`](https://github.com/auth0/auth0-hono) SDK — an OIDC middleware for the [Hono](https://hono.dev) web framework. Deployed on Cloudflare Workers with server-side React rendering via `@hono/react-renderer`.

## Stack

- **[Hono](https://hono.dev)** — web framework
- **[@auth0/auth0-hono](https://github.com/auth0/auth0-hono)** — OIDC middleware (installed from GitHub main branch)
- **[@hono/react-renderer](https://github.com/honojs/middleware/tree/main/packages/react-renderer)** — server-side React rendering
- **[Cloudflare Workers](https://workers.cloudflare.com)** — deployment target

## SDK Features Demonstrated

| Feature | Where |
|---|---|
| `auth0()` — main middleware, populates `c.var.auth0` | `src/app.tsx` |
| `handleLogin()` — standard, force, consent, redirect variants | `src/routes/auth.ts` |
| `handleCallback()` — auto-mounted by SDK | `wrangler.toml` / SDK default |
| `handleLogout()` — auto-mounted by SDK | `wrangler.toml` / SDK default |
| `handleBackchannelLogout()` — auto-mounted by SDK | `wrangler.toml` / SDK default |
| `requiresAuth()` — redirects browser to login | `src/routes/protected.tsx` |
| `requiresAuth('error')` — returns 401 JSON for API clients | `src/routes/api.ts` |
| `attemptSilentLogin()` — transparent `prompt=none` login | `src/routes/public.tsx` |
| `cancelSilentLogin()` — prevents silent login redirect loop | `src/routes/auth.ts` |
| `getUser(c)` — synchronous user claims from session | `src/routes/protected.tsx`, `src/routes/api.ts` |
| `getSession(c)` — full session object including tokens | `src/routes/protected.tsx`, `src/routes/api.ts` |
| `getAccessToken(c)` — access token with auto-refresh | `src/routes/api.ts` |
| `getAccessTokenForConnection(c, opts)` — federated connection token | `src/routes/api.ts` |
| `Auth0Error` and typed subclasses | `src/app.tsx` error handler |

## Routes

### Pages (SSR)

| Route | Description |
|---|---|
| `GET /` | Home page — attempts silent login transparently |
| `GET /about` | SDK feature reference |
| `GET /profile` | User claims — requires auth (redirects if not logged in) |
| `GET /dashboard` | Session metadata and tokens — requires auth |

### Auth

| Route | Description |
|---|---|
| `GET /auth/login` | Start OIDC login |
| `GET /auth/login/force` | Force re-authentication (`prompt=login`) |
| `GET /auth/login/consent` | Re-show consent screen (`prompt=consent`) |
| `GET /auth/login/to-profile` | Login and redirect to `/profile` |
| `GET /auth/callback` | OIDC callback — auto-mounted by SDK |
| `GET /auth/logout` | Clear session and logout from Auth0 — auto-mounted by SDK |
| `POST /auth/backchannel-logout` | IdP-initiated logout — auto-mounted by SDK |
| `GET /auth/silent` | Explicit silent login trigger |

### API (JSON)

All `/api/*` routes return 401 JSON if unauthenticated (`requiresAuth('error')`).

| Route | Description |
|---|---|
| `GET /api/me` | User identity claims |
| `GET /api/session` | Full session object |
| `GET /api/token` | Access token (auto-refreshed if expired) |
| `GET /api/token/connection?connection=` | Token for a federated connection (e.g. `github`) |
| `GET /api/claims/:claim` | Single claim value by name |

## Project Structure

```
src/
├── index.ts              # Node.js dev server entry (local only)
├── worker.ts             # Cloudflare Workers entry — exports app
├── app.tsx               # Hono app, auth0() middleware, error handler
├── routes/
│   ├── auth.ts           # /auth/* — login variants, silent
│   ├── public.tsx        # / and /about — public routes
│   ├── protected.tsx     # /profile, /dashboard — requiresAuth()
│   └── api.ts            # /api/* — requiresAuth('error')
└── components/
    ├── Layout.tsx         # HTML shell with embedded CSS
    ├── Nav.tsx            # Auth-aware navigation bar
    ├── HomePage.tsx       # Home page
    ├── AboutPage.tsx      # SDK feature reference table
    ├── ProfilePage.tsx    # User claims display
    ├── DashboardPage.tsx  # Session metadata display
    └── types.ts           # Re-exports Auth0User, Auth0Session from SDK
```

## Local Development

### Prerequisites

- Node.js 20+
- An Auth0 application (Regular Web Application)

### Auth0 Setup

In your Auth0 dashboard, configure your application:

- **Allowed Callback URLs**: `http://localhost:3000/auth/callback`
- **Allowed Logout URLs**: `http://localhost:3000`
- **Allowed Web Origins**: `http://localhost:3000`

### Environment Variables

Create a `.env` file in the project root:

```env
AUTH0_DOMAIN=your-tenant.us.auth0.com
AUTH0_CLIENT_ID=your-client-id
AUTH0_CLIENT_SECRET=your-client-secret
AUTH0_SESSION_ENCRYPTION_KEY=a-random-secret-at-least-32-characters-long
APP_BASE_URL=http://localhost:3000
```

### Run

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Deployment (Cloudflare Workers)

### Auth0 Setup

Add your Worker's URL to your Auth0 application:

- **Allowed Callback URLs**: `https://hono-app.your-subdomain.workers.dev/auth/callback`
- **Allowed Logout URLs**: `https://hono-app.your-subdomain.workers.dev`
- **Allowed Web Origins**: `https://hono-app.your-subdomain.workers.dev`

### Environment Variables

In **Cloudflare Dashboard → Workers → hono-app → Settings → Variables and Secrets**, add:

| Name | Type |
|---|---|
| `AUTH0_DOMAIN` | Variable |
| `AUTH0_CLIENT_ID` | Variable |
| `AUTH0_CLIENT_SECRET` | Secret |
| `AUTH0_SESSION_ENCRYPTION_KEY` | Secret |
| `APP_BASE_URL` | Variable — set to your Worker URL |

### Build & Deploy

The project uses Cloudflare's CI pipeline. Push to `main` to trigger a deployment.

```bash
npm run build   # tsc — type-check only
                # wrangler bundles src/worker.ts via esbuild and deploys
```

> **Note:** `nodejs_compat` is enabled in `wrangler.toml` — required because the Auth0 SDK uses `AsyncLocalStorage` internally.
