import { MethodBadge } from './MethodBadge.js'
import type { Endpoint } from '../types/index.js'

export type { Endpoint }

export function EndpointCard({ ep }: { ep: Endpoint }) {
  return (
    <div className="ep-card">
      <div className="ep-header">
        <MethodBadge method={ep.method} />
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
      <pre id={`out-${ep.id}`} className="api-out hidden"></pre>
    </div>
  )
}
