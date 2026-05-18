import { TrendingUp } from 'lucide-react'
import { metrics, stockSummary } from '../data/mock'
import { formatPercent } from '../lib/format'

export function StockSummaryCard() {
  return (
    <section className="rounded-[28px] border border-line bg-surface-2 p-5 shadow-card">
      <div className="mb-5 flex items-start justify-between gap-4">
        <div>
          <div className="mb-2 flex items-center gap-2">
            <h2 className="font-serif text-3xl leading-none tracking-[-.03em]">{stockSummary.name}</h2>
            <span className="rounded-full bg-orange/10 px-2.5 py-1 font-mono text-xs text-orange">{stockSummary.market}</span>
          </div>
          <div className="font-mono text-sm text-muted">{stockSummary.code} · {stockSummary.industry}</div>
        </div>
        <div className="text-right">
          <div className="font-mono text-2xl font-semibold text-ink">{stockSummary.price}</div>
          <div className="mt-1 inline-flex items-center gap-1 rounded-full bg-red/10 px-2.5 py-1 text-xs font-semibold text-red">
            <TrendingUp size={13} />
            {formatPercent(stockSummary.change)}
          </div>
        </div>
      </div>
      <p className="mb-5 text-sm leading-7 text-muted">{stockSummary.description}</p>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
        {metrics.map((metric) => (
          <div key={metric.label} className="rounded-2xl border border-line bg-surface p-3">
            <div className="text-xs text-muted">{metric.label}</div>
            <div className={`mt-2 font-mono text-lg font-semibold ${metric.tone === 'hot' ? 'text-red' : metric.tone === 'good' ? 'text-green' : 'text-ink'}`}>
              {metric.value}
            </div>
          </div>
        ))}
      </div>
      <div className="mt-4 border-t border-line pt-4 text-xs text-muted">更新时间：{stockSummary.updatedAt} · 数据仅用于学习演示</div>
    </section>
  )
}
