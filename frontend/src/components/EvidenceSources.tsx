import { Link2 } from 'lucide-react'
import { evidenceSources } from '../data/mock'

export function EvidenceSources() {
  return (
    <section className="rounded-[28px] border border-line bg-surface-2 p-5 shadow-card">
      <div className="mb-4 flex items-center gap-2">
        <Link2 size={17} className="text-orange" />
        <h2 className="font-serif text-2xl tracking-[-.03em]">Evidence Sources</h2>
      </div>
      <div className="space-y-3">
        {evidenceSources.map((item) => (
          <div key={item.source} className="rounded-2xl border border-line bg-surface p-3">
            <div className="flex items-center justify-between gap-3">
              <div className="font-semibold text-ink">{item.source}</div>
              <span className="rounded-full bg-orange/10 px-2.5 py-1 text-[11px] text-orange">{item.status}</span>
            </div>
            <div className="mt-2 flex items-center justify-between font-mono text-[11px] text-muted">
              <span>{item.type}</span>
              <span>{item.time}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
