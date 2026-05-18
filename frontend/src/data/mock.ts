export type AgentStepStatus = 'success' | 'running' | 'pending'

export const stockSummary = {
  name: '贵州茅台',
  code: '600519',
  market: 'SH',
  industry: '白酒 / 消费',
  price: '¥1,684.20',
  change: 1.86,
  updatedAt: '2026-05-17 14:56',
  description: '高端白酒龙头，现金流质量和品牌壁垒仍是主要观察维度。',
}

export const metrics = [
  { label: '市盈率 TTM', value: '25.8x', tone: 'neutral' },
  { label: '市净率', value: '8.7x', tone: 'neutral' },
  { label: '成交额', value: '42.6 亿', tone: 'hot' },
  { label: '换手率', value: '0.21%', tone: 'neutral' },
  { label: 'ROE', value: '31.4%', tone: 'good' },
  { label: '总市值', value: '2.12 万亿', tone: 'neutral' },
]

export const chartData = [
  { date: '05-06', price: 1644, volume: 18 },
  { date: '05-07', price: 1656, volume: 22 },
  { date: '05-08', price: 1638, volume: 20 },
  { date: '05-09', price: 1669, volume: 28 },
  { date: '05-10', price: 1662, volume: 24 },
  { date: '05-13', price: 1678, volume: 32 },
  { date: '05-14', price: 1684, volume: 35 },
]

export const agentSteps: Array<{
  name: string
  description: string
  status: AgentStepStatus
  duration: string
}> = [
  { name: 'Validate Stock', description: '校验 A 股代码与交易所映射', status: 'success', duration: '120ms' },
  { name: 'Market Data Agent', description: '拉取行情、成交量、估值指标', status: 'success', duration: '1.8s' },
  { name: 'Fundamental Agent', description: '整理收入、利润、ROE 与现金流', status: 'success', duration: '2.4s' },
  { name: 'Risk Agent', description: '检查波动、估值、新闻与合规风险', status: 'running', duration: 'live' },
  { name: 'Evidence Check', description: '绑定报告章节与数据来源', status: 'pending', duration: '--' },
]

export const reportSections = [
  {
    title: '基本面观察',
    label: 'Fundamental',
    body: '公司仍体现出较强盈利能力和现金流稳定性，ROE 处于较高区间。后续需要关注消费需求恢复节奏、渠道库存变化以及高端价格带动销情况。',
  },
  {
    title: '技术面观察',
    label: 'Technical',
    body: '近几个交易日价格重心小幅上移，成交额有所放大。短周期波动仍需结合大盘情绪和白酒板块整体强弱进行观察。',
  },
  {
    title: '资金与情绪',
    label: 'Flow',
    body: '样例数据显示成交活跃度温和提升，新闻情绪偏中性。资金面结论应以实时行情、北向资金和板块对比数据进一步确认。',
  },
  {
    title: '风险点',
    label: 'Risk',
    body: '主要风险包括估值波动、行业需求不及预期、宏观消费环境变化、数据源延迟以及 AI 总结可能遗漏重要公告。',
  },
]

export const evidenceSources = [
  { source: 'AkShare', type: '日线行情', time: '14:56', status: '已引用' },
  { source: '财务指标', type: '近四期摘要', time: '14:55', status: '已引用' },
  { source: '新闻公告', type: '最近 10 条', time: '14:54', status: '待复核' },
]

export const navItems = ['市场看板', '个股分析', 'AI 投研报告', 'Agent 工作台', '知识库', '自选股', 'MCP 工具']
