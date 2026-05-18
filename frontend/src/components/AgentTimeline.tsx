import { Check, Clock, Loader2 } from 'lucide-react'
import { agentSteps, type AgentStepStatus } from '../data/mock'

function StatusIcon({ status }: { status: AgentStepStatus }) {
  if (status === 'success') return <Check size={14} />
  if (status === 'running') return <Loader2 size={14} className="animate-spin" />
  return <Clock size={14} />
}

export function AgentTimeline() {
  return (
    <section className="rounded-[28px] border border-[var(--dark-line)] bg-dark-2 p-5 text-[#f5f3ec] shadow-card">
      <div className="mb-5 flex items-center justify-between">
        <div>
          <h2 className="font-serif text-2xl tracking-[-.03em]">Agent Execution</h2>
          <p className="mt-1 text-xs text-[#9d9a91]">LangGraph-ready process view</p>
        </div>
        <span className="rounded-full bg-orange/15 px-3 py-1.5 text-xs text-orange">Running</span>
      </div>

      <div className="space-y-3">
        {agentSteps.map((step) => (
          <div key={step.name} className="rounded-2xl border border-[var(--dark-line)] bg-black/10 p-3">
            <div className="flex items-start gap-3">
              <div
                className={`mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full ${
                  step.status === 'success'
                    ? 'bg-green/15 text-green'
                    : step.status === 'running'
                      ? 'bg-orange/15 text-orange'
                      : 'bg-white/5 text-[#8f8a7f]'
                }`}
              >
                <StatusIcon status={step.status} />
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between gap-3">
                  <div className="truncate text-sm font-semibold">{step.name}</div>
                  <div className="font-mono text-[11px] text-[#8f8a7f]">{step.duration}</div>
                </div>
                <p className="mt-1 text-xs leading-5 text-[#bdb8ab]">{step.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
