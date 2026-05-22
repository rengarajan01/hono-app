import { PageLayout } from '../components/PageLayout.js'
import { EndpointCard } from '../components/EndpointCard.js'
import type { Endpoint, User } from '../types/index.js'

const ENDPOINTS: Endpoint[] = [
  {
    id: 'me',
    method: 'GET',
    path: '/api/me',
    url: '/api/me',
    description: 'Returns the authenticated user identity claims',
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
    inputPlaceholder: 'Claim name, e.g. sub, email, name',
  },
  {
    id: 'conn',
    method: 'GET',
    path: '/api/token/connection?connection=...',
    url: '/api/token/connection?connection=__INPUT__',
    description: 'Returns a token scoped to a federated social connection',
    inputPlaceholder: 'Connection name, e.g. github, google-oauth2',
  },
]

export function ApiExplorer({ user }: { user: User }) {
  return (
    <PageLayout user={user} scriptSrc="/scripts/endpoint.js">
      <div className='hero'>
        <div>
          <h1>API Explorer</h1>
          <p className="hero-sub">Execute endpoints live and inspect the JSON response. All routes require authentication.</p>
        </div>
      </div>

      <div className="ep-list">
        {ENDPOINTS.map((ep) => <EndpointCard key={ep.id} ep={ep} />)}
      </div>
    </PageLayout>
  )
}
