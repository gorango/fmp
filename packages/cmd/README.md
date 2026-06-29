# FMP CLI

Terminal interface for all Financial Modeling Prep tools. Wraps `fmp-tools` for command-line execution. Can also run as an MCP server for AI tool integration (`--mcp`).

## Installation

```bash
bun add -g fmp-cmd
```

Or run directly without installing:

```bash
bunx fmp-cmd <tool> [json-args...]
```

## Usage

```bash
fmp <tool> [json-args...]
```

**Examples:**

```bash
# List all available tools
fmp --list

# Search for a symbol
fmp searchSymbol '{"query": "AAPL"}'

# Company profile with field selection
fmp companyProfile '{"symbol": "MSFT", "values": ["symbol", "companyName", "marketCap", "sector"]}'

# Income statement with options
fmp incomeStatement '{"symbol": "AAPL", "options": {"period": "annual", "limit": 5}}'
```

Arguments are passed as a single JSON object. The result is printed as formatted JSON to stdout.

## MCP Server

Start the MCP (Model Context Protocol) server for AI tool integration:

```bash
fmp --mcp
```

Run it directly without installing:

```bash
bunx fmp-cmd --mcp
```

Configure in your AI client (e.g., Claude Desktop, VS Code settings, `opencode.json`):

```json
{
	"mcpServers": {
		"fmp": {
			"command": "fmp",
			"args": ["--mcp"]
		}
	}
}
```

## Env

Requires `FMP_KEY` and optionally `REDIS_URL` set in the environment (or in a `.env` file).
