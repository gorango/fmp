# Financial Modeling Prep (FMP) SDK

A powerful and comprehensive TypeScript SDK for accessing real-time and historical financial data from the Financial Modeling Prep API. Unlock insights into stocks, commodities, cryptocurrencies, forex, economic indicators, and more with ease.

## Features

- **Comprehensive Data Access**: Fetch stock quotes, historical charts, financial statements, analyst ratings, ESG data, and economic indicators.
- **Multi-Asset Support**: Stocks, ETFs, mutual funds, commodities, cryptocurrencies, and forex pairs.
- **Advanced Search & Screening**: Search by symbol, name, CIK, or use powerful stock screeners.
- **Calendar & Events**: Track dividends, earnings, IPOs, stock splits, and economic releases.
- **AI-Ready Tools**: Auto-generated tool schemas for seamless integration with AI frameworks like Vercel's AI SDK.
- **Type-Safe**: Full TypeScript support with Zod validation for reliable data handling.

## Installation

```bash
npm install fmp-sdk
```

## Quick Start

```typescript
import * as fmp from "fmp";

async function example() {
	// Search for a stock symbol
	const results = await fmp.searchSymbol("AAPL", { exchange: "NASDAQ" });
	console.log(results);

	// Get company profile
	const profile = await fmp.companyProfile("AAPL");
	console.log(profile);

	// Fetch historical stock data
	const chart = await fmp.stockChartFull("AAPL", {
		from: "2023-01-01",
		to: "2023-12-31",
	});
	console.log(chart);
}
```

## API Coverage

- **Search & Directory**: Symbol/name/CIK/CUSIP/ISIN search, stock lists, exchanges, sectors.
- **Analyst Data**: Estimates, ratings, price targets, grades.
- **Market Data**: Real-time quotes, historical charts (EOD, intraday).
- **Company Insights**: Profiles, peers, executives, financial statements, key metrics.
- **Economic & ESG**: Treasury rates, indicators, ESG ratings.
- **Alternative Assets**: ETFs, funds, commodities, crypto, forex.
- **Events**: Dividends, earnings, IPOs, splits, M&A.

## Documentation

Explore the full API reference in the [FMP Documentation](https://financialmodelingprep.com/developer/docs). All functions include detailed JSDoc comments with parameter descriptions and examples.

## Contributing

If you insist...

## License

MIT License - see LICENSE file for details.
