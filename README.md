# Financial Modeling Prep (FMP) SDK & Tools

TypeScript SDK, Vercel AI SDK tools, CLI, MCP server, and code generation for the [Financial Modeling Prep](https://financialmodelingprep.com) API.

## Packages

| Package  | Description                                                                                                                                                                  |
| -------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `sdk`    | Core SDK: typed API client for all FMP endpoints (quotes, financials, SEC filings, insider trades, crypto, forex, economics, ESG, etc.) with Redis caching and rate limiting |
| `tools`  | Auto-generated [Vercel AI SDK](https://sdk.vercel.ai) tool wrappers with Zod input schemas                                                                                   |
| `cmd`    | CLI binary (`fmp`) — call any tool from the terminal or start an MCP server (`--mcp`)                                                                                        |
| `mcp`    | [MCP server](https://modelcontextprotocol.io) exposing all tools over stdio                                                                                                  |
| `gen`    | Code generator — reads `fmp-sdk` AST via `ts-morph`, generates `fmp-tools` and docs                                                                                          |
| `skills` | Agent skill installer for AI coding assistants                                                                                                                               |

## Architecture

`fmp-sdk` is the data layer. `fmp-gen` reads its source AST to auto-generate `fmp-tools` (AI SDK `tool()` definitions). `fmp-cmd` and `fmp-mcp` consume `fmp-tools` to expose a CLI and MCP server respectively.

## Prerequisites

- [Bun](https://bun.sh) 1.2+
- `FMP_KEY` environment variable (get one at [financialmodelingprep.com](https://financialmodelingprep.com))
- `REDIS_URL` for caching (optional but recommended)
- `SEC_USER_AGENT` for company filings (optional)

## Development

```bash
bun lint                    # oxlint + oxfmt across all packages
bun run typecheck           # tsc --noEmit across all packages
bun test --filter fmp-* # run tests (skipped without FMP_KEY)

# Regenerate tools after SDK changes
bun run --filter fmp-gen generate:tools
bun run --filter fmp-gen generate:docs
```

## License

MIT
