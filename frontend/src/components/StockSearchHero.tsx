import { Sparkles } from "lucide-react";
import { AutoComplete, Input } from "antd";
import { searchStocks } from "../api/stocks";
import { useState, useMemo, useCallback } from "react";
import { debounce } from "../lib/debounce";

export function StockSearchHero() {
  const [queryStr, setQueryStr] = useState("");
  const [inputOptions, setInputOptions] = useState<
    { value: string; label: string }[]
  >([]);

  const getOption = useCallback(async (value: string) => {
    if (!value.trim()) {
      setInputOptions([]);
      return;
    }
    const result = await searchStocks(value);
    if (result.success && result.data.length) {
      setInputOptions(
        result.data.map((item) => ({
          value: item.code,
          label: `${item.name} ${item.code}`,
        })),
      );
    } else {
      setInputOptions([]);
    }
  }, []);
  const debouncedGetOption = useMemo(() => {
    return debounce((value: string) => {
      getOption(value);
    }, 500);
  }, [getOption]);
  return (
    <section className="reveal-up rounded-[32px] border border-line bg-[linear-gradient(135deg,rgba(255,253,247,.92),rgba(247,244,234,.78))] p-5 shadow-card sm:p-7">
      <div className="mb-5 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-line bg-white/60 px-3 py-1.5 text-xs text-muted">
            <Sparkles size={14} className="text-orange" />
            AI Agent Stock Analysis
          </div>
          <h1 className="max-w-[720px] font-serif text-4xl leading-[1.05] tracking-[-.04em] text-ink sm:text-5xl">
            用可追溯的 Agent 流程生成 A 股结构化投研观察。
          </h1>
        </div>
        <div className="rounded-2xl border border-line bg-surface px-4 py-3 font-mono text-xs text-muted">
          trace_id
          <br />
          ASTK-20260517-1456
        </div>
      </div>

      <div className="flex flex-col gap-3 rounded-3xl border border-line bg-surface-2 p-2 sm:flex-row">
        <label className="flex min-h-12 flex-1 items-center gap-3 px-4 text-sm text-muted">
          <AutoComplete
            options={inputOptions}
            value={queryStr}
            onChange={(value) => {
              setQueryStr(value);
              debouncedGetOption(value);
            }}
            className="w-full bg-transparent text-ink outline-none placeholder:text-faint"
          >
            <Input.Search size="large" placeholder="输入股票代码或名称" />
          </AutoComplete>
        </label>
      </div>

      <div className="mt-4 flex flex-wrap gap-2 text-xs text-muted">
        {["贵州茅台 600519", "宁德时代 300750", "招商银行 600036"].map(
          (item) => (
            <button
              key={item}
              type="button"
              className="rounded-full border border-line bg-white/45 px-3 py-1.5 hover:border-orange/50 hover:text-ink"
            >
              {item}
            </button>
          ),
        )}
      </div>
    </section>
  );
}
