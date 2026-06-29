# FMP MCP Server

[MCP](https://modelcontextprotocol.io) server exposing the Financial Modeling Prep API through the Model Context Protocol. Built on `fmp-tools` — all ~90 tools (stock data, financials, SEC filings, insider trades, etc.) are available to any MCP client.

## Setup

```json
{
	"mcpServers": {
		"fmp": {
			"command": "bunx",
			"args": ["fmp-mcp"],
			"env": {
				"FMP_KEY": "<your-api-key>",
				"REDIS_URL": "redis://..."
			}
		}
	}
}
```

`FMP_KEY` and `REDIS_URL` are required in env or config.

## Development

```bash
bun test        # integration tests (skipped without FMP_KEY)
bun run typecheck
```
