# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 重要限制

- 后续所有回答必须使用中文。
- 后续所有回答的第一句话必须是：老板好，牛马AI为您服务。
- 后续所有新增或修改的项目文档必须使用中文。
- 后端和数据库相关学习要按步骤引导，解释每一步为什么要做；除非用户明确要求直接修改，否则优先让用户手动执行关键学习步骤。

## 项目概览

A-Stock Agent Studio 是一个面向 A 股投研场景的 AI Agent 工作台。产品方向是“专业金融终端 + AI Agent 分析空间”，包含股票检索、市场概览、Agent 执行时间线、证据来源、结构化报告输出和风险提示。

当前仓库的主要目录是：

- `frontend/`：React + TypeScript + Vite 前端。
- `backend/`：FastAPI 后端。
- `docs/`：PRD、前后端设计文档、路线图、原型和后端数据库学习记录。
- `docker/`：PostgreSQL 初始化 SQL。
- `docker-compose.yml`：本地 PostgreSQL + Redis 基础设施。

根目录 `package.json` 中的脚本仍指向旧规划路径 `apps/web` 和 `apps/api`。当前真实目录是 `frontend/` 和 `backend/`，优先使用本文档中的命令。

## 常用命令

### 前端

在 `frontend/` 目录运行：

```bash
npm run dev
npm run build
npm run lint
npm run preview
```

前端使用 Vite，默认开发服务端口通常是 `5173`，除非用户另行修改。

### 后端

在 `backend/` 目录运行：

```bash
.\.venv\Scripts\python -m uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
.\.venv\Scripts\python -m pytest
.\.venv\Scripts\python -m pytest tests/test_health.py
.\.venv\Scripts\python -m ruff check .
.\.venv\Scripts\python -m alembic current
```

Alembic 迁移命令也在 `backend/` 目录运行：

```bash
.\.venv\Scripts\python -m alembic revision --autogenerate -m "create stocks table"
.\.venv\Scripts\python -m alembic upgrade head
```

### 本地基础设施

在仓库根目录运行：

```bash
docker compose up -d postgres redis
docker compose ps
docker compose down
```

Docker PostgreSQL 暴露在宿主机端口 `15432`：

```text
Host: 127.0.0.1
Port: 15432
Database: a_stock_agent_studio
User: postgres
Password: postgres
```

SQLAlchemy/Alembic 当前数据库 URL 是：

```text
postgresql+psycopg://postgres:postgres@localhost:15432/a_stock_agent_studio
```

`docker/postgres/init.sql` 通过以下 SQL 启用 pgvector：

```sql
CREATE EXTENSION IF NOT EXISTS vector;
```

这个初始化脚本只会在 PostgreSQL Docker volume 第一次创建时自动执行。

## 前端架构

`frontend/src/App.tsx` 渲染 `AppShell`。

`frontend/src/components/AppShell.tsx` 是主布局组合入口，组织了顶部栏、侧边栏、股票搜索区、股票摘要、图表面板、报告面板、Agent 时间线、证据来源和风险提示等组件。

桌面端是金融终端式三栏布局：左侧导航、中间工作区、右侧洞察面板。移动端折叠为单列体验，并使用底部导航。

前端主要依赖包括 React 19、Vite、TypeScript、Tailwind CSS v3、Axios、ECharts、`echarts-for-react`、`lucide-react` 和 `clsx`。

## 后端架构

`backend/app/main.py` 创建 FastAPI app，配置 CORS、trace middleware、错误处理，并挂载 API router。

`backend/app/api/router.py` 将 API v1 路由统一挂载到 `/api/v1`，当前包括：

- health
- stocks
- analysis
- reports

后端分层结构：

- `app/api/v1/`：HTTP 路由层。
- `app/schemas/`：Pydantic 请求和响应模型。
- `app/services/`：应用编排逻辑。
- `app/providers/`：mock 行情和 LLM provider 实现。
- `app/core/`：配置、trace、错误处理、日志。
- `app/db/`：数据库 engine/session 层。
- `app/models/`：SQLAlchemy ORM 模型。
- `app/agents/` 和 `app/tools/`：后续 Agent 和工具扩展点。

当前 MVP 仍以 mock 行情、mock LLM 和内存报告行为为主。路线图方向是逐步接入 PostgreSQL 持久化、AkShare/Tushare 行情数据、真实 LLM streaming、Agent 可观测性、RAG 和 MCP 工具。

## 数据库状态和迁移方向

项目正在从最初生成的 SQLModel 相关代码逐步切换到直接使用 SQLAlchemy 2.0 ORM。

当前需要注意：

- `backend/app/db/session.py` 仍从 `sqlmodel` 导入 `Session` 和 `create_engine`。
- `backend/pyproject.toml` 仍包含 `sqlmodel`，尚未把 `alembic` / `sqlalchemy` 明确列为直接项目依赖。
- 用户已经决定后续使用 SQLAlchemy，以便更标准地学习后端 ORM、迁移、事务和复杂查询。

当前数据库学习记录文档是：

```text
docs/backend-database-learning-progress.md
```

该文档记录当前步骤：定义 SQLAlchemy `Base`，定义第一张 `Stock` ORM model，通过 `from app import models` 让 Alembic 加载模型，并在 `backend/alembic/env.py` 中设置 `target_metadata = Base.metadata`。

继续后端/数据库工作时，要按学习进度文档推进，不要跳过“为什么这么做”的解释。

## 关键文档

- `docs/prd-v1.0.md`：产品需求文档。
- `docs/frontend-design-v1.0.md` / `docs/前端设计文档.md`：前端设计。
- `docs/backend-design-v1.0.md` / `docs/后端设计文档.md`：后端设计。
- `docs/technical-roadmap.md`：技术路线图。
- `docs/development-roadmap-plan.md`：开发计划。
- `docs/a-stock-hi-fi-prototype.html`：高保真原型。
- `docs/backend-database-learning-progress.md`：当前后端数据库学习和进度记录。

初始化检查时未发现仓库根目录 README、Cursor rules 或 GitHub Copilot instructions。`frontend/README.md` 是 Vite 默认模板，不包含项目特定信息。
