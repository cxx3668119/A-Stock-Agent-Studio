import { Bell, Cpu, SlidersHorizontal } from 'lucide-react'

export function TopBar() {
  return (
    <header className="relative z-10 col-span-3 hidden h-[68px] items-center justify-between border-b border-[var(--dark-line)] bg-[rgba(20,20,19,.86)] px-6 text-[#f5f3ec] lg:flex">
      <div className="flex items-center gap-3">
        <div className="h-2 w-2 rounded-full bg-green shadow-[0_0_0_5px_rgba(107,143,71,.14)]" />
        <span className="text-xs text-[#bdb8ab]">A 股数据源在线 · 最近更新 14:56</span>
      </div>

      <div className="flex items-center gap-3 text-xs text-[#bdb8ab]">
        <span className="rounded-full border border-[var(--dark-line)] bg-white/5 px-3 py-2 font-mono">Model: Qwen / DeepSeek</span>
        <span className="rounded-full border border-[var(--dark-line)] bg-white/5 px-3 py-2 font-mono">Token 3.2k</span>
        <button type="button" className="rounded-full border border-[var(--dark-line)] bg-white/5 p-2 text-[#f5f3ec]">
          <Cpu size={16} />
        </button>
        <button type="button" className="rounded-full border border-[var(--dark-line)] bg-white/5 p-2 text-[#f5f3ec]">
          <Bell size={16} />
        </button>
        <button type="button" className="rounded-full border border-[var(--dark-line)] bg-white/5 p-2 text-[#f5f3ec]">
          <SlidersHorizontal size={16} />
        </button>
      </div>
    </header>
  )
}
