import ReactECharts from 'echarts-for-react'
import { chartData } from '../data/mock'

export function StockChartPanel() {
  const option = {
    animationDuration: 700,
    grid: { left: 42, right: 18, top: 32, bottom: 42 },
    tooltip: { trigger: 'axis' },
    xAxis: {
      type: 'category',
      data: chartData.map((item) => item.date),
      axisLine: { lineStyle: { color: '#D8D5CC' } },
      axisTick: { show: false },
      axisLabel: { color: '#6B6860' },
    },
    yAxis: [
      {
        type: 'value',
        axisLabel: { color: '#6B6860' },
        splitLine: { lineStyle: { color: '#E8E3D7' } },
      },
      { type: 'value', show: false },
    ],
    series: [
      {
        name: '收盘价',
        type: 'line',
        smooth: true,
        data: chartData.map((item) => item.price),
        symbolSize: 7,
        lineStyle: { color: '#C0453A', width: 3 },
        itemStyle: { color: '#C0453A' },
        areaStyle: { color: 'rgba(192,69,58,.10)' },
      },
      {
        name: '成交量',
        type: 'bar',
        yAxisIndex: 1,
        data: chartData.map((item) => item.volume),
        itemStyle: { color: 'rgba(217,119,87,.22)', borderRadius: [6, 6, 0, 0] },
      },
    ],
  }

  return (
    <section className="rounded-[28px] border border-line bg-surface-2 p-5 shadow-card">
      <div className="mb-2 flex items-center justify-between">
        <div>
          <h2 className="font-serif text-2xl tracking-[-.03em]">行情走势</h2>
          <p className="mt-1 text-sm text-muted">样例 K 线趋势与成交活跃度</p>
        </div>
        <span className="rounded-full bg-red/10 px-3 py-1.5 font-mono text-xs text-red">+1.86%</span>
      </div>
      <ReactECharts option={option} style={{ height: 300, width: '100%' }} />
    </section>
  )
}
