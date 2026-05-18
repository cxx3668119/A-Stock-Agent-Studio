import { Activity, Bot, DatabaseZap, FileText, Gauge, Layers3, Settings, Star } from 'lucide-react'
import { navItems } from '../data/mock'

const icons = [Gauge, Activity, FileText, Bot, DatabaseZap, Star, Layers3]

export function Sidebar() {
  return (
    <aside className="relative z-10 hidden border-r border-[var(--dark-line)] bg-dark px-4 py-5 text-[#f5f3ec] lg:block">
      <div className="mb-8 flex items-center gap-3 px-2">
        <div className="relative h-9 w-9 rounded-xl bg-[radial-gradient(circle_at_35%_30%,#F6C5A8,transparent_36%),linear-gradient(135deg,var(--orange),#8E4C38)] shadow-[0_10px_30px_rgba(217,119,87,.22)] after:absolute after:inset-[9px] after:rounded-full after:border after:border-l-transparent after:border-white/70" />
        <div>
          <div className="text-sm font-semibold tracking-wide">A-Stock Studio</div>
          <div className="text-[11px] text-[#9d9a91]">AI Research Terminal</div>
        </div>
      </div>

      <nav className="space-y-2">
        {navItems.map((item, index) => {
          const Icon = icons[index]
          const active = item === '个股分析'
          return (
            <button
              key={item}
              type="button"
              className={`flex w-full items-center gap-3 rounded-2xl px-3 py-3 text-left text-sm transition ${
                active
                  ? 'bg-[rgba(217,119,87,.16)] text-[#fffdf7] ring-1 ring-[rgba(217,119,87,.32)]'
                  : 'text-[#bdb8ab] hover:bg-white/5 hover:text-[#fffdf7]'
              }`}
            >
              <Icon size={17} />
              <span>{item}</span>
            </button>
          )
        })}
      </nav>

      <div className="absolute bottom-5 left-4 right-4 rounded-3xl border border-[var(--dark-line)] bg-[#24231f] p-4">
        <div className="mb-2 flex items-center gap-2 text-xs text-[#bdb8ab]">
          <Settings size={14} />
          Local Runtime
        </div>
        <div className="font-mono text-[11px] leading-6 text-[#8f8a7f]">
          Node 22.17<br />
          Vite + React<br />
          SSE Ready
        </div>
      </div>
    </aside>
  )
}
