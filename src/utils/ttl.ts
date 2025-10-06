interface CacheTTLRule {
	pattern: RegExp
	ttl: number
	description?: string
}

// Order matters: more specific patterns should come before general ones.
export const TTL_CONFIG: CacheTTLRule[] = [
	// --- Real-time/Very High Volatility (15-60 seconds) ---
	{ pattern: /^quote$/, ttl: 15, description: 'Single full quote (all asset types)' },
	{ pattern: /^quote-short$/, ttl: 15, description: 'Single short quote (all asset types)' },
	{ pattern: /^batch-quote$/, ttl: 15, description: 'Batch full stock quotes' },
	{ pattern: /^batch-quote-short$/, ttl: 15, description: 'Batch short stock quotes' },
	{ pattern: /^batch-commodity-quotes$/, ttl: 15, description: 'Batch commodity quotes' },
	{ pattern: /^batch-crypto-quotes$/, ttl: 15, description: 'Batch crypto quotes' },
	{ pattern: /^batch-forex-quotes$/, ttl: 15, description: 'Batch forex quotes' },
	{ pattern: /^batch-index-quotes$/, ttl: 15, description: 'Batch index quotes' },
	{ pattern: /^batch-mutualfund-quotes$/, ttl: 15, description: 'Batch mutual fund quotes' },
	{ pattern: /^batch-etf-quotes$/, ttl: 15, description: 'Batch ETF quotes' },
	{ pattern: /^batch-exchange-quote$/, ttl: 15, description: 'Batch exchange quotes' },
	{ pattern: /^aftermarket-trade$/, ttl: 30, description: 'Single aftermarket trade' },
	{ pattern: /^aftermarket-quote$/, ttl: 30, description: 'Single aftermarket quote' },
	{ pattern: /^batch-aftermarket-trade$/, ttl: 30, description: 'Batch aftermarket trades' },
	{ pattern: /^batch-aftermarket-quote$/, ttl: 30, description: 'Batch aftermarket quotes' },
	{ pattern: /^historical-chart\/(1min|5min|15min|30min|1hour|4hour)/, ttl: 60, description: 'Intraday charts (all asset types)' },
	{ pattern: /^biggest-(gainers|losers)$/, ttl: 60 * 5, description: 'Biggest gainers/losers' }, // 5 mins
	{ pattern: /^most-actives$/, ttl: 60 * 5, description: 'Most active stocks' }, // 5 mins
	{ pattern: /^market-capitalization$/, ttl: 60 * 5, description: 'Current market cap (single)' }, // 5 mins (changes with price)
	{ pattern: /^market-capitalization-batch$/, ttl: 60 * 5, description: 'Batch current market cap' }, // 5 mins

	// --- Frequently Updated (5 min - 1 hour) ---
	{ pattern: /^technical-indicators\//, ttl: 60 * 10, description: 'Technical indicators' }, // 10 mins (can be based on minute data)
	{ pattern: /^news\/(general-latest|press-releases-latest|stock-latest|crypto-latest|forex-latest)$/, ttl: 60 * 10, description: 'Latest news feeds' }, // 10 mins
	{ pattern: /^news\/(press-releases|stock|crypto|forex)$/, ttl: 60 * 10, description: 'News search by symbols (if recent range)' }, // 10 mins
	{ pattern: /^fmp-articles$/, ttl: 60 * 30, description: 'FMP Articles list' }, // 30 mins
	{ pattern: /^price-target-(latest-news|news)$/, ttl: 60 * 15, description: 'Price target news' }, // 15 mins
	{ pattern: /^grades-(latest-news|news)$/, ttl: 60 * 15, description: 'Stock grade news' }, // 15 mins
	{ pattern: /^earning-call-transcript-latest$/, ttl: 60 * 30, description: 'Latest earning transcripts meta' }, // 30 mins
	{ pattern: /^sec-filings-(8k|financials)$/, ttl: 60 * 15, description: 'Latest SEC filings by date range' }, // 15 mins
	{ pattern: /^insider-trading\/latest$/, ttl: 60 * 15, description: 'Latest insider trades' }, // 15 mins
	{ pattern: /^mergers-acquisitions-latest$/, ttl: 60 * 30, description: 'Latest M&A' }, // 30 mins
	{ pattern: /^crowdfunding-offerings-latest$/, ttl: 60 * 30, description: 'Latest crowdfunding' }, // 30 mins
	{ pattern: /^fundraising-latest$/, ttl: 60 * 30, description: 'Latest equity offerings' }, // 30 mins
	{ pattern: /^(senate|house)-latest$/, ttl: 60 * 30, description: 'Latest congressional disclosures' }, // 30 mins
	{ pattern: /^latest-financial-statements$/, ttl: 60 * 60, description: 'Latest financial statements meta' }, // 1 hour
	{ pattern: /^institutional-ownership\/latest$/, ttl: 60 * 60, description: 'Latest institutional ownership filings' }, // 1 hour

	// --- Daily Updates (1 hour - 6 hours) ---
	{ pattern: /^historical-price-eod\//, ttl: 60 * 60 * 4, description: 'EOD charts (all types, all assets)' }, // 4 hours
	{ pattern: /^stock-price-change$/, ttl: 60 * 60 * 1, description: 'Stock price change percentages' }, // 1 hour
	{ pattern: /^(sector|industry)-performance-snapshot$/, ttl: 60 * 60 * 4, description: 'Market sector/industry performance snapshot' }, // 4 hours
	{ pattern: /^(sector|industry)-pe-snapshot$/, ttl: 60 * 60 * 4, description: 'Market sector/industry P/E snapshot' }, // 4 hours
	{ pattern: /^(dividends|earnings|ipos|splits)-calendar$/, ttl: 60 * 60 * 2, description: 'Event calendars' }, // 2 hours
	{ pattern: /^economic-calendar$/, ttl: 60 * 60 * 2, description: 'Economic calendar' }, // 2 hours
	{ pattern: /^company-screener$/, ttl: 60 * 60 * 1, description: 'Stock screener' }, // 1 hour
	{ pattern: /^eod-bulk$/, ttl: 60 * 14, description: 'EOD Bulk Data' }, // 15 minutes

	// --- Periodically Updated / Less Volatile (6 hours - 24 hours) ---
	{ pattern: /^profile$/, ttl: 60 * 30, description: 'Company profile by symbol' },
	{ pattern: /^profile-cik$/, ttl: 60 * 30, description: 'Company profile by CIK' },
	{ pattern: /^company-notes$/, ttl: 60 * 60 * 12, description: 'Company notes' },
	{ pattern: /^stock-peers$/, ttl: 60 * 60 * 12, description: 'Stock peers' },
	{ pattern: /^(income-statement|balance-sheet-statement|cash-flow-statement)$/, ttl: 60 * 60 * 8, description: 'Financial statements (periodic)' },
	{ pattern: /^(income-statement-ttm|balance-sheet-statement-ttm|cash-flow-statement-ttm)$/, ttl: 60 * 60 * 8, description: 'TTM Financial statements' },
	{ pattern: /^(income-statement-growth|balance-sheet-statement-growth|cash-flow-statement-growth|financial-growth)$/, ttl: 60 * 60 * 8, description: 'Financial statement growth' },
	{ pattern: /^key-metrics$/, ttl: 60 * 60 * 8, description: 'Key metrics (periodic)' },
	{ pattern: /^ratios$/, ttl: 60 * 60 * 8, description: 'Financial ratios (periodic)' },
	{ pattern: /^key-metrics-ttm$/, ttl: 60 * 60 * 8, description: 'Key metrics TTM' },
	{ pattern: /^ratios-ttm$/, ttl: 60 * 60 * 8, description: 'Financial ratios TTM' },
	{ pattern: /^financial-scores$/, ttl: 60 * 60 * 8, description: 'Financial scores (Altman, Piotroski)' },
	{ pattern: /^owner-earnings$/, ttl: 60 * 60 * 8, description: 'Owner earnings' },
	{ pattern: /^enterprise-values$/, ttl: 60 * 60 * 8, description: 'Enterprise values' },
	{ pattern: /^analyst-estimates$/, ttl: 60 * 60 * 4, description: 'Analyst estimates' },
	{ pattern: /^ratings-snapshot$/, ttl: 60 * 60 * 4, description: 'Ratings snapshot' },
	{ pattern: /^ratings-historical$/, ttl: 60 * 60 * 6, description: 'Historical ratings' },
	{ pattern: /^price-target-(summary|consensus)$/, ttl: 60 * 60 * 4, description: 'Price target summary/consensus' },
	{ pattern: /^grades$/, ttl: 60 * 60 * 4, description: 'Current stock grades' },
	{ pattern: /^grades-(historical|consensus)$/, ttl: 60 * 60 * 6, description: 'Historical/Consensus stock grades' },
	{ pattern: /^delisted-companies$/, ttl: 60 * 60 * 24, description: 'Delisted companies list' },
	{ pattern: /^(historical-)?employee-count$/, ttl: 60 * 60 * 12, description: 'Employee count' },
	{ pattern: /^historical-market-capitalization$/, ttl: 60 * 60 * 12, description: 'Historical market cap' },
	{ pattern: /^shares-float(-all)?$/, ttl: 60 * 60 * 12, description: 'Shares float' },
	{ pattern: /^key-executives$/, ttl: 60 * 60 * 24, description: 'Company executives' },
	{ pattern: /^governance-executive-compensation$/, ttl: 60 * 60 * 24, description: 'Executive compensation' },
	{ pattern: /^executive-compensation-benchmark$/, ttl: 60 * 60 * 24, description: 'Executive comp benchmark' },
	{ pattern: /^commitment-of-traders-report$/, ttl: 60 * 60 * 24 * 2, description: 'COT reports (weekly update)' }, // 2 days
	{ pattern: /^commitment-of-traders-analysis$/, ttl: 60 * 60 * 24 * 2, description: 'COT analysis' }, // 2 days
	{ pattern: /^(discounted-cash-flow|levered-discounted-cash-flow|custom-discounted-cash-flow|custom-levered-discounted-cash-flow)$/, ttl: 60 * 60 * 12, description: 'DCF valuations' },
	{ pattern: /^treasury-rates$/, ttl: 60 * 60 * 6, description: 'Treasury rates' },
	{ pattern: /^economic-indicators$/, ttl: 60 * 60 * 12, description: 'Economic indicators (historical)' },
	{ pattern: /^market-risk-premium$/, ttl: 60 * 60 * 24 * 7, description: 'Market risk premium (infrequent)' }, // 7 days
	{ pattern: /^esg-(disclosures|ratings|benchmark)$/, ttl: 60 * 60 * 24, description: 'ESG data' },
	{ pattern: /^etf\/(holdings|info|country-weightings|asset-exposure|sector-weightings)$/, ttl: 60 * 60 * 12, description: 'ETF/Fund details' },
	{ pattern: /^funds\/disclosure-holders-latest$/, ttl: 60 * 60 * 12, description: 'Fund disclosure holders latest' },
	{ pattern: /^funds\/disclosure$/, ttl: 60 * 60 * 12, description: 'Mutual fund disclosures (specific period)' },
	{ pattern: /^funds\/disclosure-holders-search$/, ttl: 60 * 60 * 12, description: 'Fund disclosure search by name' },
	{ pattern: /^funds\/disclosure-dates$/, ttl: 60 * 60 * 12, description: 'Fund disclosure dates' },
	{ pattern: /^financial-reports-dates$/, ttl: 60 * 60 * 12, description: 'Financial report dates' },
	{ pattern: /^financial-reports-(json|xlsx)$/, ttl: 60 * 60 * 12, description: 'Full financial reports' },
	{ pattern: /^revenue-(product|geographic)-segmentation$/, ttl: 60 * 60 * 12, description: 'Revenue segmentation' },
	{ pattern: /^(income|balance-sheet|cash-flow)-statement-as-reported$/, ttl: 60 * 60 * 12, description: 'As reported statements (single)' },
	{ pattern: /^financial-statement-full-as-reported$/, ttl: 60 * 60 * 12, description: 'Full as reported statements' },
	{ pattern: /^institutional-ownership\/(extract|dates|extract-analytics\/holder|holder-performance-summary|holder-industry-breakdown|symbol-positions-summary|industry-summary)$/, ttl: 60 * 60 * 24, description: 'Form 13F related data (quarterly)' },
	{ pattern: /^(sp500|nasdaq|dowjones)-constituent$/, ttl: 60 * 60 * 6, description: 'Current Index constituents' },
	{ pattern: /^historical-(sp500|nasdaq|dowjones)-constituent$/, ttl: 60 * 60 * 24 * 7, description: 'Historical Index constituents (static)' }, // 7 days
	{ pattern: /^insider-trading\/(search|reporting-name|statistics)$/, ttl: 60 * 60 * 12, description: 'Insider trading search/stats' },
	{ pattern: /^acquisition-of-beneficial-ownership$/, ttl: 60 * 60 * 12, description: 'SC 13D/G filings' },
	{ pattern: /^historical-(sector|industry)-(performance|pe)$/, ttl: 60 * 60 * 12, description: 'Historical market sector/industry perf/PE' },
	{ pattern: /^earning-call-transcript$/, ttl: 60 * 60 * 24 * 7, description: 'Specific earnings transcript (historical)' }, // 7 days
	{ pattern: /^sec-filings-search\//, ttl: 60 * 15, description: 'SEC filings search (by type, symbol, CIK)' },
	{ pattern: /^sec-filings-company-search\//, ttl: 60 * 60 * 24, description: 'SEC company search' },
	{ pattern: /^sec-profile$/, ttl: 60 * 60 * 24, description: 'SEC company full profile' },
	{ pattern: /^(senate|house)-(trades|trades-by-name)$/, ttl: 60 * 60 * 12, description: 'Congressional trades by symbol/name' },

	// Bulk data (generally less frequently updated than "latest" feeds)
	{ pattern: /^profile-bulk$/, ttl: 60 * 14, description: 'Bulk Company Profile' },
	{ pattern: /^rating-bulk$/, ttl: 60 * 60 * 12, description: 'Bulk Stock Rating' },
	{ pattern: /^dcf-bulk$/, ttl: 60 * 60 * 12, description: 'Bulk DCF Valuations' },
	{ pattern: /^scores-bulk$/, ttl: 60 * 60 * 12, description: 'Bulk Financial Scores' },
	{ pattern: /^price-target-summary-bulk$/, ttl: 60 * 60 * 12, description: 'Bulk Price Target Summary' },
	{ pattern: /^etf-holder-bulk$/, ttl: 60 * 60 * 12, description: 'Bulk ETF Holder' },
	{ pattern: /^upgrades-downgrades-consensus-bulk$/, ttl: 60 * 60 * 12, description: 'Bulk Upgrades/Downgrades Consensus' },
	{ pattern: /^key-metrics-ttm-bulk$/, ttl: 60 * 60 * 12, description: 'Bulk Key Metrics TTM' },
	{ pattern: /^ratios-ttm-bulk$/, ttl: 60 * 60 * 12, description: 'Bulk Ratios TTM' },
	{ pattern: /^peers-bulk$/, ttl: 60 * 60 * 24, description: 'Bulk Stock Peers' },
	{ pattern: /^earnings-surprises-bulk$/, ttl: 60 * 60 * 12, description: 'Bulk Earnings Surprises' },
	{ pattern: /^(income-statement|balance-sheet-statement|cash-flow-statement|income-statement-growth|balance-sheet-statement-growth|cash-flow-statement-growth)-bulk$/, ttl: 60 * 60 * 12, description: 'Bulk Financial Statements/Growth' },

	// --- Relatively Static / Directory-like (12 hours - 48 hours) ---
	{ pattern: /^(stock|financial-statement-symbol|etf|commodities|cryptocurrency|forex|index)-list$/, ttl: 60 * 60 * 24, description: 'Asset/Symbol lists' }, // 24 hours
	{ pattern: /^actively-trading-list$/, ttl: 60 * 60 * 12, description: 'Actively trading list' },
	{ pattern: /^available-(exchanges|sectors|industries|countries)$/, ttl: 60 * 60 * 24 * 7, description: 'Available master data (exchanges, sectors etc.)' }, // 7 days
	{ pattern: /^cik-list$/, ttl: 60 * 60 * 24, description: 'CIK List' },
	{ pattern: /^symbol-change$/, ttl: 60 * 60 * 12, description: 'Symbol changes list' },
	{ pattern: /^commitment-of-traders-list$/, ttl: 60 * 60 * 24, description: 'COT report list' },
	{ pattern: /^insider-trading-transaction-type$/, ttl: 60 * 60 * 24 * 7, description: 'Insider transaction types (very static)' }, // 7 days
	{ pattern: /^(exchange|all-exchange)-market-hours$/, ttl: 60 * 60 * 24 * 7, description: 'Market hours (very static)' }, // 7 days
	{ pattern: /^earning-call-transcript-(dates|list)$/, ttl: 60 * 60 * 12, description: 'Earnings transcript dates/list' },
	{ pattern: /^standard-industrial-classification-list$/, ttl: 60 * 60 * 24 * 7, description: 'SIC list' }, // 7 days
	{ pattern: /^industry-classification-search$/, ttl: 60 * 60 * 24, description: 'Industry classification search' },
	{ pattern: /^all-industry-classification$/, ttl: 60 * 60 * 24, description: 'All industry classifications' },
	{ pattern: /^search-(symbol|name|cik|cusip|isin|exchange-variants)$/, ttl: 60 * 60 * 1, description: 'Search functions' }, // 1 hour, results can change based on new listings/data
]
