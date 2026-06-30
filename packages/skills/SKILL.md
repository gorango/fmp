---
name: FMP Skills
description: Financial Modeling Prep (FMP) provides 100+ tools for stocks, ETFs, forex, crypto, commodities, economics, ESG, SEC filings, financial statements, and more. Use when asked about financial data, stock analysis, company research, market data, or economic indicators.
---

## How to use the FMP data tools

The `fmp` CLI lets you call any FMP data tool:

```bash
fmp <toolName> '<json-args>'
```

All tools return JSON to stdout.

### Finding the right tool

Browse tools by category in [assets/categories.json](assets/categories.json). Each category groups related tools (e.g., FINANCIAL STATEMENTS, ANALYST, ESG).

Once you've identified the tool name, look up its parameters and return fields in [assets/tools.json](assets/tools.json). **Do not read the entire file** — it's 1500 lines. Query it with `jq`:

```bash
# Look up a specific tool
jq '.[] | select(.tool_name == "companyProfile")' packages/skills/assets/tools.json

# List all tool names in a category
jq -r '.[] | select(.tool_name == "companyProfile" or .tool_name == "companyExecutives" or .tool_name == "stockPeers") | .tool_name' packages/skills/assets/tools.json
```

### Passing arguments

Arguments are a single JSON object. Omit `{}` for tools that take no arguments:

```bash
fmp searchSymbol '{"query": "AAPL"}'
fmp companyProfile '{"symbol": "AAPL", "values": ["symbol", "companyName", "marketCap"]}'
fmp listCompanySymbols '{}'
```

Use the `values` parameter to select specific return fields (reduces output noise).

### Common workflow patterns

1. **Company deep-dive**: `companyProfile` → `companyExecutives` → `stockPeers` → `companyMarketCap` → `companyDividends`
2. **Stock analysis**: `stockChartFull` + `ratingsSnapshot` + `priceTargetConsensus` + `dcfValuation`
3. **Calendar events**: `earningsCalendar` + `dividendsCalendar` + `iposCalendar` + `economicCalendar` (all accept `from`/`to` date range, max 90 days)
4. **Financial statements**: `incomeStatement` + `balanceSheetStatement` + `cashFlowStatement` (use `period: "quarter"` or `"annual"`)
5. **Screening**: `stockScreener` with market cap, sector, price, and volume filters

### Gotchas

- Date ranges use `from`/`to` in `YYYY-MM-DD` format, max 90-day window
- The `values` field selects return columns (e.g., `["symbol", "companyName"]`); omit for all fields
- `period` parameter: `"quarter"` or `"annual"` on financial statements
- Tools that accept `limit` default to 10-100 depending on the endpoint; set explicitly for more
- Commodity, crypto, forex, and index chart tools mirror stock chart patterns (same param shapes)
