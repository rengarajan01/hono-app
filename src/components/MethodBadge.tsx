export function MethodBadge({ method }: { method: string }) {
  return <span className={`route-tag ${method.toLowerCase()}`}>{method}</span>
}
