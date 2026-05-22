import type { ReactNode } from 'react'

type CardTableProps = { children: ReactNode; className?: string }

export function CardTable({ children, className }: CardTableProps) {
  return (
    <div className="card card-table">
      <table className={className}>{children}</table>
    </div>
  )
}
