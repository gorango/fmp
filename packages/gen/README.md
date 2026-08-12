# FMP Codegen

Reads `@financialmodelingprep/sdk` source files using `ts-morph` and generates:

- **`@financialmodelingprep/tools`** — Vercel AI SDK tool definitions wrapping every SDK API function
- **Documentation** — JSON docs index consumed by downstream packages

## Usage

```bash
# Generate AI tools into packages/tools/src/
bun run generate:tools

# Generate documentation JSON into packages/tools/src/
bun run generate:docs
```

## How It Works

1. `schema.ts` parses `packages/sdk/src/api.ts` with `ts-morph`, walks exported function signatures and return types, and produces typed `ToolSchema` objects.
2. `tools.ts` takes schemas and renders Vercel AI SDK `tool()` definitions with Zod input schemas and an execute wrapper that calls `@financialmodelingprep/sdk`.
3. `docs.ts` takes schemas and produces a human-readable JSON doc index.

## Output

Generated files land in `packages/tools/src/`:

- `tools.ts` — AI SDK tool definitions
- `docs.json` — Structured tool documentation
