# Financial Modeling Prep (FMP) SDK

A powerful TypeScript SDK for accessing real-time and historical financial data from the Financial Modeling Prep API — stocks, commodities, crypto, forex, economic indicators, and more.

## Features

- **Comprehensive Data Access**: Stock quotes, historical charts, financial statements, analyst ratings, ESG data, economic indicators.
- **Multi-Asset Support**: Stocks, ETFs, mutual funds, commodities, cryptocurrencies, forex pairs.
- **Advanced Search & Screening**: Symbol, name, CIK search; stock screeners.
- **Calendar & Events**: Dividends, earnings, IPOs, stock splits, economic releases.
- **Type-Safe**: Full TypeScript with Zod validation.
- **AI-Ready Tools**: Auto-generated Vercel AI SDK tool wrappers via `fmp-tools`.

## Installation

```bash
bun add fmp-sdk
```

## Quick Start

```typescript
import * as fmp from 'fmp-sdk'

const results = await fmp.searchSymbol('AAPL', { exchange: 'NASDAQ' })
const profile = await fmp.companyProfile('AAPL')
```

## Exports

| Path                | Description                 |
| ------------------- | --------------------------- |
| `fmp-sdk`           | Main API client             |
| `fmp-sdk/types`     | TypeScript type definitions |
| `fmp-sdk/constants` | Shared constants            |

## License

MIT
