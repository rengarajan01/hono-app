// Re-export SDK types so components stay decoupled from direct SDK imports
export type { Auth0User as User, Auth0Session as Session } from '@auth0/auth0-hono'
export type { Auth0TokenSet as TokenSet } from '@auth0/auth0-hono'
