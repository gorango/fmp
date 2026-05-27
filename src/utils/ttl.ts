interface CacheTTLRule {
	pattern: RegExp
	ttl: number
	description?: string
}

// Order matters: more specific patterns should come before general ones.
export const TTL_CONFIG: CacheTTLRule[] = [
	// --- Real-time/Very High Volatility (15-60 seconds) ---
	{ pattern: /^quote$/, ttl: 15, description: 'Single full quote (all asset types)' }, // oxfmt-ignore
	{ pattern: /^quote-short$/, ttl: 15, description: 'Single short quote (all asset types)' }, // oxfmt-ignore
	{ pattern: /^batch-quote$/, ttl: 15, description: 'Batch full stock quotes' }, // oxfmt-ignore
	{ pattern: /^batch-quote-short$/, ttl: 15, description: 'Batch short stock quotes' }, // oxfmt-ignore
	{ pattern: /^batch-commodity-quotes$/, ttl: 15, description: 'Batch commodity quotes' }, // oxfmt-ignore
	{ pattern: /^batch-crypto-quotes$/, ttl: 15, description: 'Batch crypto quotes' }, // oxfmt-ignore
	{ pattern: /^batch-forex-quotes$/, ttl: 15, description: 'Batch forex quotes' }, // oxfmt-ignore
	{ pattern: /^batch-index-quotes$/, ttl: 15, description: 'Batch index quotes' }, // oxfmt-ignore
	{ pattern: /^batch-mutualfund-quotes$/, ttl: 15, description: 'Batch mutual fund quotes' }, // oxfmt-ignore
	{ pattern: /^batch-etf-quotes$/, ttl: 15, description: 'Batch ETF quotes' }, // oxfmt-ignore
	{ pattern: /^batch-exchange-quote$/, ttl: 15, description: 'Batch exchange quotes' }, // oxfmt-ignore
	{ pattern: /^aftermarket-trade$/, ttl: 30, description: 'Single aftermarket trade' }, // oxfmt-ignore
	{ pattern: /^aftermarket-quote$/, ttl: 30, description: 'Single aftermarket quote' }, // oxfmt-ignore
	{ pattern: /^batch-aftermarket-trade$/, ttl: 30, description: 'Batch aftermarket trades' }, // oxfmt-ignore
	{ pattern: /^batch-aftermarket-quote$/, ttl: 30, description: 'Batch aftermarket quotes' }, // oxfmt-ignore
	{ pattern: /^historical-chart\/(1min|5min|15min|30min|1hour|4hour)/, ttl: 60, description: 'Intraday charts (all asset types)' }, // oxfmt-ignore
	{ pattern: /^biggest-(gainers|losers)$/, ttl: 60 * 5, description: 'Biggest gainers/losers' }, // oxfmt-ignore
	{ pattern: /^most-actives$/, ttl: 60 * 5, description: 'Most active stocks' }, // oxfmt-ignore
	{ pattern: /^market-capitalization$/, ttl: 60 * 5, description: 'Current market cap (single)' }, // oxfmt-ignore
	{ pattern: /^market-capitalization-batch$/, ttl: 60 * 5, description: 'Batch current market cap' }, // oxfmt-ignore

	// --- Frequently Updated (5 min - 1 hour) ---
	{ pattern: /^technical-indicators\//, ttl: 60 * 10, description: 'Technical indicators' }, // oxfmt-ignore
	{ pattern: /^news\/(general-latest|press-releases-latest|stock-latest|crypto-latest|forex-latest)$/, ttl: 60 * 10, description: 'Latest news feeds' }, // oxfmt-ignore
	{ pattern: /^news\/(press-releases|stock|crypto|forex)$/, ttl: 60 * 10, description: 'News search by symbols (if recent range)' }, // oxfmt-ignore
	{ pattern: /^fmp-articles$/, ttl: 60 * 30, description: 'FMP Articles list' }, // oxfmt-ignore
	{ pattern: /^price-target-(latest-news|news)$/, ttl: 60 * 15, description: 'Price target news' }, // oxfmt-ignore
	{ pattern: /^grades-(latest-news|news)$/, ttl: 60 * 15, description: 'Stock grade news' }, // oxfmt-ignore
	{ pattern: /^earning-call-transcript-latest$/, ttl: 60 * 30, description: 'Latest earning transcripts meta' }, // oxfmt-ignore
	{ pattern: /^sec-filings-(8k|financials)$/, ttl: 60 * 15, description: 'Latest SEC filings by date range' }, // oxfmt-ignore
	{ pattern: /^insider-trading\/latest$/, ttl: 60 * 15, description: 'Latest insider trades' }, // oxfmt-ignore
	{ pattern: /^mergers-acquisitions-latest$/, ttl: 60 * 30, description: 'Latest M&A' }, // oxfmt-ignore
	{ pattern: /^crowdfunding-offerings-latest$/, ttl: 60 * 30, description: 'Latest crowdfunding' }, // oxfmt-ignore
	{ pattern: /^fundraising-latest$/, ttl: 60 * 30, description: 'Latest equity offerings' }, // oxfmt-ignore
	{ pattern: /^(senate|house)-latest$/, ttl: 60 * 30, description: 'Latest congressional disclosures' }, // oxfmt-ignore
	{ pattern: /^latest-financial-statements$/, ttl: 60 * 60, description: 'Latest financial statements meta' }, // oxfmt-ignore
	{ pattern: /^institutional-ownership\/latest$/, ttl: 60 * 60, description: 'Latest institutional ownership filings' }, // oxfmt-ignore

	// --- Daily Updates (1 hour - 6 hours) ---
	{ pattern: /^historical-price-eod\//, ttl: 60 * 60 * 4, description: 'EOD charts (all types, all assets)' }, // oxfmt-ignore
	{ pattern: /^stock-price-change$/, ttl: 60 * 60 * 1, description: 'Stock price change percentages' }, // oxfmt-ignore
	{ pattern: /^(sector|industry)-performance-snapshot$/, ttl: 60 * 60 * 4, description: 'Market sector/industry performance snapshot' }, // oxfmt-ignore
	{ pattern: /^(sector|industry)-pe-snapshot$/, ttl: 60 * 60 * 4, description: 'Market sector/industry P/E snapshot' }, // oxfmt-ignore
	{ pattern: /^(dividends|earnings|ipos|splits)-calendar$/, ttl: 60 * 60 * 2, description: 'Event calendars' }, // oxfmt-ignore
	{ pattern: /^economic-calendar$/, ttl: 60 * 60 * 2, description: 'Economic calendar' }, // oxfmt-ignore
	{ pattern: /^company-screener$/, ttl: 60 * 60 * 1, description: 'Stock screener' }, // oxfmt-ignore
	{ pattern: /^eod-bulk$/, ttl: 60 * 14, description: 'EOD Bulk Data' }, // oxfmt-ignore

	// --- Periodically Updated / Less Volatile (6 hours - 24 hours) ---
	{ pattern: /^profile$/, ttl: 60 * 30, description: 'Company profile by symbol' }, // oxfmt-ignore
	{ pattern: /^profile-cik$/, ttl: 60 * 30, description: 'Company profile by CIK' }, // oxfmt-ignore
	{ pattern: /^company-notes$/, ttl: 60 * 60 * 12, description: 'Company notes' }, // oxfmt-ignore
	{ pattern: /^stock-peers$/, ttl: 60 * 60 * 12, description: 'Stock peers' }, // oxfmt-ignore
	{ pattern: /^(income-statement|balance-sheet-statement|cash-flow-statement)$/, ttl: 60 * 60 * 8, description: 'Financial statements (periodic)' }, // oxfmt-ignore
	{ pattern: /^(income-statement-ttm|balance-sheet-statement-ttm|cash-flow-statement-ttm)$/, ttl: 60 * 60 * 8, description: 'TTM Financial statements' }, // oxfmt-ignore
	{ pattern: /^(income-statement-growth|balance-sheet-statement-growth|cash-flow-statement-growth|financial-growth)$/, ttl: 60 * 60 * 8, description: 'Financial statement growth' }, // oxfmt-ignore
	{ pattern: /^key-metrics$/, ttl: 60 * 60 * 8, description: 'Key metrics (periodic)' }, // oxfmt-ignore
	{ pattern: /^ratios$/, ttl: 60 * 60 * 8, description: 'Financial ratios (periodic)' }, // oxfmt-ignore
	{ pattern: /^key-metrics-ttm$/, ttl: 60 * 60 * 8, description: 'Key metrics TTM' }, // oxfmt-ignore
	{ pattern: /^ratios-ttm$/, ttl: 60 * 60 * 8, description: 'Financial ratios TTM' }, // oxfmt-ignore
	{ pattern: /^financial-scores$/, ttl: 60 * 60 * 8, description: 'Financial scores (Altman, Piotroski)' }, // oxfmt-ignore
	{ pattern: /^owner-earnings$/, ttl: 60 * 60 * 8, description: 'Owner earnings' }, // oxfmt-ignore
	{ pattern: /^enterprise-values$/, ttl: 60 * 60 * 8, description: 'Enterprise values' }, // oxfmt-ignore
	{ pattern: /^analyst-estimates$/, ttl: 60 * 60 * 4, description: 'Analyst estimates' }, // oxfmt-ignore
	{ pattern: /^ratings-snapshot$/, ttl: 60 * 60 * 4, description: 'Ratings snapshot' }, // oxfmt-ignore
	{ pattern: /^ratings-historical$/, ttl: 60 * 60 * 6, description: 'Historical ratings' }, // oxfmt-ignore
	{ pattern: /^price-target-(summary|consensus)$/, ttl: 60 * 60 * 4, description: 'Price target summary/consensus' }, // oxfmt-ignore
	{ pattern: /^grades$/, ttl: 60 * 60 * 4, description: 'Current stock grades' }, // oxfmt-ignore
	{ pattern: /^grades-(historical|consensus)$/, ttl: 60 * 60 * 6, description: 'Historical/Consensus stock grades' }, // oxfmt-ignore
	{ pattern: /^delisted-companies$/, ttl: 60 * 60 * 24, description: 'Delisted companies list' }, // oxfmt-ignore
	{ pattern: /^(historical-)?employee-count$/, ttl: 60 * 60 * 12, description: 'Employee count' }, // oxfmt-ignore
	{ pattern: /^historical-market-capitalization$/, ttl: 60 * 60 * 12, description: 'Historical market cap' }, // oxfmt-ignore
	{ pattern: /^shares-float(-all)?$/, ttl: 60 * 60 * 12, description: 'Shares float' }, // oxfmt-ignore
	{ pattern: /^key-executives$/, ttl: 60 * 60 * 24, description: 'Company executives' }, // oxfmt-ignore
	{ pattern: /^governance-executive-compensation$/, ttl: 60 * 60 * 24, description: 'Executive compensation' }, // oxfmt-ignore
	{ pattern: /^executive-compensation-benchmark$/, ttl: 60 * 60 * 24, description: 'Executive comp benchmark' }, // oxfmt-ignore
	{ pattern: /^commitment-of-traders-report$/, ttl: 60 * 60 * 24 * 2, description: 'COT reports (weekly update)' }, // oxfmt-ignore
	{ pattern: /^commitment-of-traders-analysis$/, ttl: 60 * 60 * 24 * 2, description: 'COT analysis' }, // oxfmt-ignore
	{ pattern: /^(discounted-cash-flow|levered-discounted-cash-flow|custom-discounted-cash-flow|custom-levered-discounted-cash-flow)$/, ttl: 60 * 60 * 12, description: 'DCF valuations' }, // oxfmt-ignore
	{ pattern: /^treasury-rates$/, ttl: 60 * 60 * 6, description: 'Treasury rates' }, // oxfmt-ignore
	{ pattern: /^economic-indicators$/, ttl: 60 * 60 * 12, description: 'Economic indicators (historical)' }, // oxfmt-ignore
	{ pattern: /^market-risk-premium$/, ttl: 60 * 60 * 24 * 7, description: 'Market risk premium (infrequent)' }, // oxfmt-ignore
	{ pattern: /^esg-(disclosures|ratings|benchmark)$/, ttl: 60 * 60 * 24, description: 'ESG data' }, // oxfmt-ignore
	{ pattern: /^etf\/(holdings|info|country-weightings|asset-exposure|sector-weightings)$/, ttl: 60 * 60 * 12, description: 'ETF/Fund details' }, // oxfmt-ignore
	{ pattern: /^funds\/disclosure-holders-latest$/, ttl: 60 * 60 * 12, description: 'Fund disclosure holders latest' }, // oxfmt-ignore
	{ pattern: /^funds\/disclosure$/, ttl: 60 * 60 * 12, description: 'Mutual fund disclosures (specific period)' }, // oxfmt-ignore
	{ pattern: /^funds\/disclosure-holders-search$/, ttl: 60 * 60 * 12, description: 'Fund disclosure search by name' }, // oxfmt-ignore
	{ pattern: /^funds\/disclosure-dates$/, ttl: 60 * 60 * 12, description: 'Fund disclosure dates' }, // oxfmt-ignore
	{ pattern: /^financial-reports-dates$/, ttl: 60 * 60 * 12, description: 'Financial report dates' }, // oxfmt-ignore
	{ pattern: /^financial-reports-(json|xlsx)$/, ttl: 60 * 60 * 12, description: 'Full financial reports' }, // oxfmt-ignore
	{ pattern: /^revenue-(product|geographic)-segmentation$/, ttl: 60 * 60 * 12, description: 'Revenue segmentation' }, // oxfmt-ignore
	{ pattern: /^(income|balance-sheet|cash-flow)-statement-as-reported$/, ttl: 60 * 60 * 12, description: 'As reported statements (single)' }, // oxfmt-ignore
	{ pattern: /^financial-statement-full-as-reported$/, ttl: 60 * 60 * 12, description: 'Full as reported statements' }, // oxfmt-ignore
	{ pattern: /^institutional-ownership\/(extract|dates|extract-analytics\/holder|holder-performance-summary|holder-industry-breakdown|symbol-positions-summary|industry-summary)$/, ttl: 60 * 60 * 24, description: 'Form 13F related data (quarterly)' }, // oxfmt-ignore
	{ pattern: /^(sp500|nasdaq|dowjones)-constituent$/, ttl: 60 * 60 * 6, description: 'Current Index constituents' }, // oxfmt-ignore
	{ pattern: /^historical-(sp500|nasdaq|dowjones)-constituent$/, ttl: 60 * 60 * 24 * 7, description: 'Historical Index constituents (static)' }, // oxfmt-ignore
	{ pattern: /^insider-trading\/(search|reporting-name|statistics)$/, ttl: 60 * 60 * 12, description: 'Insider trading search/stats' }, // oxfmt-ignore
	{ pattern: /^acquisition-of-beneficial-ownership$/, ttl: 60 * 60 * 12, description: 'SC 13D/G filings' }, // oxfmt-ignore
	{ pattern: /^historical-(sector|industry)-(performance|pe)$/, ttl: 60 * 60 * 12, description: 'Historical market sector/industry perf/PE' }, // oxfmt-ignore
	{ pattern: /^earning-call-transcript$/, ttl: 60 * 60 * 24 * 7, description: 'Specific earnings transcript (historical)' }, // oxfmt-ignore
	{ pattern: /^sec-filings-search\//, ttl: 60 * 15, description: 'SEC filings search (by type, symbol, CIK)' }, // oxfmt-ignore
	{ pattern: /^sec-filings-company-search\//, ttl: 60 * 60 * 24, description: 'SEC company search' }, // oxfmt-ignore
	{ pattern: /^sec-profile$/, ttl: 60 * 60 * 24, description: 'SEC company full profile' }, // oxfmt-ignore
	{ pattern: /^(senate|house)-(trades|trades-by-name)$/, ttl: 60 * 60 * 12, description: 'Congressional trades by symbol/name' }, // oxfmt-ignore

	// Bulk data (generally less frequently updated than "latest" feeds)
	{ pattern: /^profile-bulk$/, ttl: 60 * 14, description: 'Bulk Company Profile' }, // oxfmt-ignore
	{ pattern: /^rating-bulk$/, ttl: 60 * 60 * 12, description: 'Bulk Stock Rating' }, // oxfmt-ignore
	{ pattern: /^dcf-bulk$/, ttl: 60 * 60 * 12, description: 'Bulk DCF Valuations' }, // oxfmt-ignore
	{ pattern: /^scores-bulk$/, ttl: 60 * 60 * 12, description: 'Bulk Financial Scores' }, // oxfmt-ignore
	{ pattern: /^price-target-summary-bulk$/, ttl: 60 * 60 * 12, description: 'Bulk Price Target Summary' }, // oxfmt-ignore
	{ pattern: /^etf-holder-bulk$/, ttl: 60 * 60 * 12, description: 'Bulk ETF Holder' }, // oxfmt-ignore
	{ pattern: /^upgrades-downgrades-consensus-bulk$/, ttl: 60 * 60 * 12, description: 'Bulk Upgrades/Downgrades Consensus' }, // oxfmt-ignore
	{ pattern: /^key-metrics-ttm-bulk$/, ttl: 60 * 60 * 12, description: 'Bulk Key Metrics TTM' }, // oxfmt-ignore
	{ pattern: /^ratios-ttm-bulk$/, ttl: 60 * 60 * 12, description: 'Bulk Ratios TTM' }, // oxfmt-ignore
	{ pattern: /^peers-bulk$/, ttl: 60 * 60 * 24, description: 'Bulk Stock Peers' }, // oxfmt-ignore
	{ pattern: /^earnings-surprises-bulk$/, ttl: 60 * 60 * 12, description: 'Bulk Earnings Surprises' }, // oxfmt-ignore
	{ pattern: /^(income-statement|balance-sheet-statement|cash-flow-statement|income-statement-growth|balance-sheet-statement-growth|cash-flow-statement-growth)-bulk$/, ttl: 60 * 60 * 12, description: 'Bulk Financial Statements/Growth' }, // oxfmt-ignore

	// --- Relatively Static / Directory-like (12 hours - 48 hours) ---
	{ pattern: /^(stock|financial-statement-symbol|etf|commodities|cryptocurrency|forex|index)-list$/, ttl: 60 * 60 * 24, description: 'Asset/Symbol lists' }, // oxfmt-ignore
	{ pattern: /^actively-trading-list$/, ttl: 60 * 60 * 12, description: 'Actively trading list' }, // oxfmt-ignore
	{ pattern: /^available-(exchanges|sectors|industries|countries)$/, ttl: 60 * 60 * 24 * 7, description: 'Available master data (exchanges, sectors etc.)' }, // oxfmt-ignore
	{ pattern: /^cik-list$/, ttl: 60 * 60 * 24, description: 'CIK List' }, // oxfmt-ignore
	{ pattern: /^symbol-change$/, ttl: 60 * 60 * 12, description: 'Symbol changes list' }, // oxfmt-ignore
	{ pattern: /^commitment-of-traders-list$/, ttl: 60 * 60 * 24, description: 'COT report list' }, // oxfmt-ignore
	{ pattern: /^insider-trading-transaction-type$/, ttl: 60 * 60 * 24 * 7, description: 'Insider transaction types (very static)' }, // oxfmt-ignore
	{ pattern: /^(exchange|all-exchange)-market-hours$/, ttl: 60 * 60 * 24 * 7, description: 'Market hours (very static)' }, // oxfmt-ignore
	{ pattern: /^earning-call-transcript-(dates|list)$/, ttl: 60 * 60 * 12, description: 'Earnings transcript dates/list' }, // oxfmt-ignore
	{ pattern: /^standard-industrial-classification-list$/, ttl: 60 * 60 * 24 * 7, description: 'SIC list' }, // oxfmt-ignore
	{ pattern: /^industry-classification-search$/, ttl: 60 * 60 * 24, description: 'Industry classification search' }, // oxfmt-ignore
	{ pattern: /^all-industry-classification$/, ttl: 60 * 60 * 24, description: 'All industry classifications' }, // oxfmt-ignore
	{ pattern: /^search-(symbol|name|cik|cusip|isin|exchange-variants)$/, ttl: 60 * 60 * 1, description: 'Search functions' }, // oxfmt-ignore
]
