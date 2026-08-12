# Financial Modeling Prep (FMP) SDK & Tools

TypeScript SDK, Vercel AI SDK tools, CLI, MCP server, and code generation for the [Financial Modeling Prep](https://financialmodelingprep.com) API.

## Packages

| Package  | Description                                                                                                                                                                  |
| -------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `sdk`    | Core SDK: typed API client for all FMP endpoints (quotes, financials, SEC filings, insider trades, crypto, forex, economics, ESG, etc.) with Redis caching and rate limiting |
| `tools`  | Auto-generated [Vercel AI SDK](https://sdk.vercel.ai) tool wrappers with Zod input schemas                                                                                   |
| `cli`    | CLI binary (`fmp`) — call any tool from the terminal or start an MCP server (`--mcp`)                                                                                        |
| `mcp`    | [MCP server](https://modelcontextprotocol.io) exposing all tools over stdio                                                                                                  |
| `gen`    | Code generator — reads `@financialmodelingprep/sdk` AST via `ts-morph`, generates `@financialmodelingprep/tools` and docs                                                    |
| `skills` | Agent skill installer for AI coding assistants                                                                                                                               |

## Architecture

`@financialmodelingprep/sdk` is the data layer. `@financialmodelingprep/gen` reads its source AST to auto-generate `@financialmodelingprep/tools` (AI SDK `tool()` definitions). `@financialmodelingprep/cli` and `@financialmodelingprep/mcp` consume `@financialmodelingprep/tools` to expose a CLI and MCP server respectively.

## Prerequisites

- [Bun](https://bun.sh) 1.2+
- `FMP_KEY` environment variable (get one at [financialmodelingprep.com](https://financialmodelingprep.com))
- `REDIS_URL` for caching (optional but recommended)
- `SEC_USER_AGENT` for company filings (optional)

## Development

```bash
bun lint                    # oxlint + oxfmt across all packages
bun run typecheck           # tsc --noEmit across all packages
bun test --filter '@financialmodelingprep/*' # run tests (skipped without FMP_KEY)

# Regenerate tools after SDK changes
bun run --filter @financialmodelingprep/gen generate:tools
bun run --filter @financialmodelingprep/gen generate:docs
```

## License

MIT
