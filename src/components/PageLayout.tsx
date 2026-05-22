import type { ReactNode } from 'react'
import { Nav } from './Nav.js'
import type { User } from '../types/index.js'

type PageLayoutProps = { user?: User; children: ReactNode; scriptSrc?: string }

export function PageLayout({ user, children, scriptSrc }: PageLayoutProps) {
  return (
    <>
      <Nav user={user} />
      <main>{children}</main>
      {scriptSrc && <script src={scriptSrc} />}
    </>
  )
}
