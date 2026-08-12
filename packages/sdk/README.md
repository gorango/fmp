# Financial Modeling Prep (FMP) SDK

A powerful TypeScript SDK for accessing real-time and historical financial data from the Financial Modeling Prep API — stocks, commodities, crypto, forex, economic indicators, and more.

## Features

- **Comprehensive Data Access**: Stock quotes, historical charts, financial statements, analyst ratings, ESG data, economic indicators.
- **Multi-Asset Support**: Stocks, ETFs, mutual funds, commodities, cryptocurrencies, forex pairs.
- **Advanced Search & Screening**: Symbol, name, CIK search; stock screeners.
- **Calendar & Events**: Dividends, earnings, IPOs, stock splits, economic releases.
- **Type-Safe**: Full TypeScript with Zod validation.
- **AI-Ready Tools**: Auto-generated Vercel AI SDK tool wrappers via `@financialmodelingprep/tools`.

## Installation

```bash
bun add @financialmodelingprep/sdk
```

## Quick Start

```typescript
import * as fmp from '@financialmodelingprep/sdk'

const results = await fmp.searchSymbol('AAPL', { exchange: 'NASDAQ' })
const profile = await fmp.companyProfile('AAPL')
```

## Exports

| Path                                              | Description                 |
| ------------------------------------------------- | --------------------------- |
| `@financialmodelingprep/sdk`                      | Main API client             |
| `@financialmodelingprep/sdk/sec`                  | SEC filing access           |
| `@financialmodelingprep/sdk/types`                | TypeScript type definitions |
| `@financialmodelingprep/sdk/constants`            | Shared constants            |
| `@financialmodelingprep/sdk/constants/returns`    | Return schemas              |
| `@financialmodelingprep/sdk/constants/categories` | Tool categories             |

## License

MIT
