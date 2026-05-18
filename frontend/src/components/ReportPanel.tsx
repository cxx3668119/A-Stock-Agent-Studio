import { FileCheck2 } from 'lucide-react'
import { reportSections } from '../data/mock'

export function ReportPanel() {
  return (
    <section className="rounded-[28px] border border-line bg-surface-2 p-5 shadow-card">
      <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="font-serif text-3xl tracking-[-.04em]">结构化投研报告</h2>
          <p className="mt-1 text-sm text-muted">基于行情、财务、新闻与 Agent 风险审查生成</p>
        </div>
        <div className="inline-flex items-center gap-2 rounded-full border border-line bg-surface px-3 py-2 text-xs text-muted">
          <FileCheck2 size={15} className="text-orange" />
          Evidence linked
        </div>
      </div>

      <div className="grid gap-3">
        {reportSections.map((section, index) => (
          <article key={section.title} className="rounded-3xl border border-line bg-[rgba(247,244,234,.68)] p-4" style={{ animationDelay: `${index * 80}ms` }}>
            <div className="mb-3 flex items-center justify-between gap-3">
              <h3 className="font-serif text-xl tracking-[-.02em] text-ink">{section.title}</h3>
              <span className="rounded-full bg-white/70 px-2.5 py-1 font-mono text-[11px] text-muted">{section.label}</span>
            </div>
            <p className="text-sm leading-7 text-muted">{section.body}</p>
          </article>
        ))}
      </div>
    </section>
  )
}
