import { Activity, FileText, Gauge, UserRound } from "lucide-react";
import { AgentTimeline } from "./AgentTimeline";
import { EvidenceSources } from "./EvidenceSources";
import { ReportPanel } from "./ReportPanel";
import { RiskNotice } from "./RiskNotice";
import { Sidebar } from "./Sidebar";
import { StockChartPanel } from "./StockChartPanel";
import { StockSearchHero } from "./StockSearchHero";
import { StockSummaryCard } from "./StockSummaryCard";
import { TopBar } from "./TopBar";

export function AppShell() {
  return (
    <div className="min-h-screen p-0">
      <div className="relative mx-auto min-h-screen overflow-hidden bg-transparent shadow-none lg:grid lg:min-h-[1024px]  lg:grid-cols-[248px_minmax(0,1fr)_332px] lg:grid-rows-[68px_1fr]  lg:bg-dark lg:shadow-shell terminal-grid">
        <TopBar />
        <Sidebar />

        <main className="relative z-10 min-w-0 bg-transparent p-4 pb-24 lg:bg-[linear-gradient(180deg,#f7f4ea,#ece9e0)] lg:p-5 lg:pb-5">
          <div className="mx-auto max-w-[980px] space-y-5 lg:max-w-none">
            <MobileHeader />
            <StockSearchHero />
            <div className="grid gap-5 xl:grid-cols-[minmax(0,1fr)_320px]">
              <StockSummaryCard />
              <div className="space-y-5 xl:hidden">
                <AgentTimeline />
              </div>
            </div>
            <StockChartPanel />
            <ReportPanel />
            <div className="grid gap-5 lg:hidden">
              <EvidenceSources />
              <RiskNotice />
            </div>
          </div>
        </main>

        <aside className="relative z-10 hidden space-y-5 overflow-y-auto border-l border-[var(--dark-line)] bg-[rgba(20,20,19,.96)] p-5 lg:block">
          <AgentTimeline />
          <EvidenceSources />
          <RiskNotice />
        </aside>

        <BottomNav />
      </div>
    </div>
  );
}

function MobileHeader() {
  return (
    <header className="mb-2 flex items-center justify-between lg:hidden">
      <div className="flex items-center gap-3">
        <div className="h-10 w-10 rounded-2xl bg-[radial-gradient(circle_at_35%_30%,#F6C5A8,transparent_36%),linear-gradient(135deg,var(--orange),#8E4C38)]" />
        <div>
          <div className="text-sm font-semibold">A-Stock Agent Studio</div>
          <div className="text-xs text-muted">Mobile Research Workspace</div>
        </div>
      </div>
      <div className="rounded-full bg-green/10 px-3 py-1.5 text-xs font-semibold text-green">
        Online
      </div>
    </header>
  );
}

function BottomNav() {
  const items = [
    { label: "市场", icon: Gauge },
    { label: "分析", icon: Activity, active: true },
    { label: "报告", icon: FileText },
    { label: "我的", icon: UserRound },
  ];
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-30 grid grid-cols-4 border-t border-line bg-[rgba(255,253,247,.92)] px-3 py-2 backdrop-blur lg:hidden">
      {items.map((item) => {
        const Icon = item.icon;
        return (
          <button
            key={item.label}
            type="button"
            className={`flex flex-col items-center gap-1 rounded-2xl py-2 text-xs ${item.active ? "text-orange" : "text-muted"}`}
          >
            <Icon size={18} />
            {item.label}
          </button>
        );
      })}
    </nav>
  );
}
