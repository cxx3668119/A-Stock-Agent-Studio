import { ShieldAlert } from 'lucide-react'

export function RiskNotice() {
  return (
    <section className="rounded-[28px] border border-red/20 bg-red/10 p-5 text-red shadow-card">
      <div className="mb-3 flex items-center gap-2 font-semibold">
        <ShieldAlert size={18} />
        风险提示 / 非投资建议声明
      </div>
      <p className="text-sm leading-7 text-[color:var(--red)]/90">
        本报告由 AI 基于公开数据生成，仅用于信息整理和学习研究，不构成任何投资建议。市场有风险，投资需谨慎。
      </p>
    </section>
  )
}
