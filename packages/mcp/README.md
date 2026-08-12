# FMP MCP Server

[MCP](https://modelcontextprotocol.io) server exposing the Financial Modeling Prep API through the Model Context Protocol. Built on `@financialmodelingprep/tools` — all ~90 tools (stock data, financials, SEC filings, insider trades, etc.) are available to any MCP client.

## Installation

```bash
bun add -g @financialmodelingprep/mcp
```

Or run directly without installing:

```bash
bunx @financialmodelingprep/mcp
```

## Setup

After a global install, the `fmp-mcp` binary is on your PATH. Configure it in your AI client (e.g., Claude Desktop, VS Code settings, `opencode.json`):

```json
{
	"mcpServers": {
		"fmp": {
			"command": "fmp-mcp",
			"env": {
				"FMP_KEY": "<your-api-key>",
				"REDIS_URL": "redis://..."
			}
		}
	}
}
```

Or, without a global install, run it on demand:

```json
{
	"mcpServers": {
		"fmp": {
			"command": "bunx",
			"args": ["@financialmodelingprep/mcp"],
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
