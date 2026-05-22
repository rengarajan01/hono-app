export type { Auth0User as User, Auth0Session as Session } from '@auth0/auth0-hono'

export type Endpoint = {
  id: string
  method: 'GET'
  path: string
  url: string
  description: string
  inputPlaceholder?: string
}
