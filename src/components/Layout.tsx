import type { PropsWithChildren } from 'react'

type LayoutProps = PropsWithChildren<{ title?: string }>

export function Layout({ children, title = 'Hono + Auth0' }: LayoutProps) {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>{title}</title>
        <link rel="stylesheet" href="/styles/app.css" />
      </head>
      <body>
        {children}
        <script src="/scripts/copy.js" />
      </body>
    </html>
  )
}
