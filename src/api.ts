/* eslint-disable style/max-statements-per-line */
import type * as FMPTypes from './types.js'
import { Readable } from 'node:stream'
import { cleanQuery, csvStreamToJson, csvToJson, fmpApi, fmpApiStream } from './utils/index.js'
import { getSecFiling as getSecFilingFromEdgar } from './sec/filings.js'

interface OptionalLimitOption {
	/** The maximum number of results to return. E.g., 50. */
	limit?: number | null
}

interface OptionalPaginationOptions extends OptionalLimitOption {
	/** The page number for pagination. E.g., 0. */
	page?: number | null
}

interface OptionalRangeOptions {
	/** Start date for the calendar (YYYY-MM-DD). E.g., "2025-01-10". */
	from?: string | null
	/** End date for the calendar (YYYY-MM-DD). E.g., "2025-04-10". Max 90-day range. */
	to?: string | null
}

interface RequiredRangeOptions {
	/** Start date for the calendar (YYYY-MM-DD). E.g., "2025-01-10". */
	from: string
	/** End date for the calendar (YYYY-MM-DD). E.g., "2025-04-10". Max 90-day range. */
	to: string
}

/**
 * ========================================================================
 *           SEARCH
 * ========================================================================
 */

/**
 * Options for symbol and name search operations.
 */
export interface SearchSymbolNameOptions extends OptionalLimitOption {
	/** The stock exchange to limit the search to (e.g., "NASDAQ", "NYSE"). */
	exchange?: string | null
}

/**
 * Searches for financial instruments by symbol.
 * @param query The search query string (e.g., "AAPL", "MSFT").
 * @param [options] Optional parameters to refine the search.
 * @returns A promise that resolves to an array of symbol search results.
 * @throws {Error} If the query parameter is not provided.
 */
export async function searchSymbol(
	query: string,
	options: SearchSymbolNameOptions = {},
): Promise<FMPTypes.SymbolSearchResult[]> {
	if (!query) {
		throw new Error('Query parameter is required for searchSymbol')
	}
	const searchParams = cleanQuery({ query, ...options })
	return fmpApi.get('search-symbol', { searchParams }).json<FMPTypes.SymbolSearchResult[]>()
}

/**
 * Searches for financial instruments by company name.
 * @param query The search query string (e.g., "Apple", "Microsoft").
 * @param [options] Optional parameters to refine the search.
 * @returns A promise that resolves to an array of name search results.
 * @throws {Error} If the query parameter is not provided.
 */
export async function searchName(
	query: string,
	options: SearchSymbolNameOptions = {},
): Promise<FMPTypes.NameSearchResult[]> {
	if (!query) {
		throw new Error('Query parameter is required for searchName')
	}
	const searchParams = cleanQuery({ query, ...options })
	return fmpApi.get('search-name', { searchParams }).json<FMPTypes.NameSearchResult[]>()
}

/**
 * Options for CIK search operations.
 */
export interface SearchCikOptions extends OptionalLimitOption {}

/**
 * Searches for companies by CIK (Central Index Key).
 * @param cik The CIK number as a string (e.g., "320193").
 * @param [options] Optional parameters to refine the search.
 * @returns A promise that resolves to an array of CIK search results.
 * @throws {Error} If the CIK parameter is not provided.
 */
export async function searchCik(
	cik: string,
	options: SearchCikOptions = {},
): Promise<FMPTypes.CikSearchResult[]> {
	if (!cik) {
		throw new Error('CIK parameter is required for searchCik')
	}
	const searchParams = cleanQuery({ cik, ...options })
	return fmpApi.get('search-cik', { searchParams }).json<FMPTypes.CikSearchResult[]>()
}

/**
 * Searches for financial instruments by CUSIP.
 * @param cusip The CUSIP identifier as a string (e.g., "037833100").
 * @returns A promise that resolves to an array of CUSIP search results.
 * @throws {Error} If the CUSIP parameter is not provided.
 */
export async function searchCusip(cusip: string): Promise<FMPTypes.CusipSearchResult[]> {
	if (!cusip) {
		throw new Error('CUSIP parameter is required for searchCusip')
	}
	const searchParams = { cusip }
	return fmpApi.get('search-cusip', { searchParams }).json<FMPTypes.CusipSearchResult[]>()
}

/**
 * Searches for financial instruments by ISIN.
 * @param isin The ISIN identifier as a string (e.g., "US0378331005").
 * @returns A promise that resolves to an array of ISIN search results.
 * @throws {Error} If the ISIN parameter is not provided.
 */
export async function searchIsin(isin: string): Promise<FMPTypes.IsinSearchResult[]> {
	if (!isin) {
		throw new Error('ISIN parameter is required for searchIsin')
	}
	const searchParams = { isin }
	return fmpApi.get('search-isin', { searchParams }).json<FMPTypes.IsinSearchResult[]>()
}

/**
 * Parameters for screening stocks based on various financial and market criteria.
 */
export interface StockScreenerParams {
	/** Filter by market capitalization greater than this value. E.g., 1000000. */
	marketCapMoreThan?: number | null
	/** Filter by market capitalization lower than this value. E.g., 1000000000. */
	marketCapLowerThan?: number | null
	/** Filter by price greater than this value. E.g., 10. */
	priceMoreThan?: number | null
	/** Filter by price lower than this value. E.g., 200. */
	priceLowerThan?: number | null
	/** Filter by beta greater than this value. E.g., 0.5. */
	betaMoreThan?: number | null
	/** Filter by beta lower than this value. E.g., 1.5. */
	betaLowerThan?: number | null
	/** Filter by volume greater than this value. E.g., 1000. */
	volumeMoreThan?: number | null
	/** Filter by volume lower than this value. E.g., 1000000. */
	volumeLowerThan?: number | null
	/** Filter by dividend yield greater than this value. E.g., 0.5. */
	dividendMoreThan?: number | null
	/** Filter by dividend yield lower than this value. E.g., 2. */
	dividendLowerThan?: number | null
	/** Filter for ETFs if true. E.g., false. */
	isEtf?: boolean | null
	/** Filter for mutual funds if true. E.g., false. */
	isFund?: boolean | null
	/** Filter for actively trading stocks if true. E.g., true. */
	isActivelyTrading?: boolean | null
	/** Filter by sector (e.g., "Technology", "Healthcare"). */
	sector?: string | null
	/** Filter by industry (e.g., "Consumer Electronics", "Software - Application"). */
	industry?: string | null
	/** Filter by country (e.g., "US", "CA"). */
	country?: string | null
	/** Filter by stock exchange (e.g., "NASDAQ", "NYSE"). */
	exchange?: string | null
	/** The maximum number of results to return. E.g., 1000. */
	limit?: number | null
	/** Include all share classes if true. E.g., false. */
	includeAllShareClasses?: boolean | null
	// The 'page' parameter is not listed in the docs for this endpoint.
}

/**
 * Screens for companies based on a wide range of financial and market criteria.
 * @param [params] Parameters for screening stocks.
 * @returns A promise that resolves to an array of companies matching the screening criteria.
 */
export async function stockScreener(
	params: StockScreenerParams = {},
): Promise<FMPTypes.StockScreenerResult[]> {
	const searchParams = cleanQuery(params)
	return fmpApi.get('company-screener', { searchParams }).json<FMPTypes.StockScreenerResult[]>()
}

/**
 * Searches for different exchange listings (variants) of a given stock symbol.
 * @param symbol The stock symbol (e.g., "AAPL").
 * @returns A promise that resolves to an array of exchange variants for the symbol.
 * @throws {Error} If the symbol parameter is not provided.
 */
export async function searchExchangeVariants(symbol: string): Promise<FMPTypes.ExchangeVariant[]> {
	if (!symbol) {
		throw new Error('Symbol parameter is required for searchExchangeVariants')
	}
	const searchParams = { symbol }
	return fmpApi.get('search-exchange-variants', { searchParams }).json<FMPTypes.ExchangeVariant[]>()
}

/**
 * ========================================================================
 *           DIRECTORY
 * ========================================================================
 */

/**
 * Retrieves a comprehensive list of company symbols.
 * @returns A promise that resolves to an array of company symbols.
 */
export async function listCompanySymbols(): Promise<FMPTypes.CompanySymbol[]> {
	return fmpApi.get('stock-list').json<FMPTypes.CompanySymbol[]>()
}

/**
 * Retrieves a list of symbols for companies that have financial statements available.
 * @returns A promise that resolves to an array of financial statement symbols.
 */
export async function listFinancialStatementSymbols(): Promise<
	FMPTypes.FinancialStatementSymbol[]
> {
	return fmpApi.get('financial-statement-symbol-list').json<FMPTypes.FinancialStatementSymbol[]>()
}

/**
 * Options for CIK list.
 */
export interface CikListOptions extends OptionalLimitOption {}
/**
 * Retrieves a list of CIKs (Central Index Keys).
 * @param [options] Optional parameters.
 * @returns A promise that resolves to an array of CIK list items.
 */
export async function listCik(options: CikListOptions = {}): Promise<FMPTypes.CikListItem[]> {
	const searchParams = cleanQuery(options)
	return fmpApi.get('cik-list', { searchParams }).json<FMPTypes.CikListItem[]>()
}

/**
 * Options for symbol changes list.
 */
export interface SymbolChangesListOptions extends OptionalLimitOption {
	/** Filter for invalid symbols. E.g., "false". */
	invalid?: string | boolean | null
	// Docs say string, example "false"
}
/**
 * Retrieves a list of stock symbol changes.
 * @param [options] Optional parameters.
 * @returns A promise that resolves to an array of symbol changes.
 */
export async function listSymbolChanges(
	options: SymbolChangesListOptions = {},
): Promise<FMPTypes.SymbolChange[]> {
	const searchParams = cleanQuery(options)
	return fmpApi.get('symbol-change', { searchParams }).json<FMPTypes.SymbolChange[]>()
}

/**
 * Retrieves a list of ETF symbols.
 * @returns A promise that resolves to an array of ETF symbols.
 */
export async function listEtfSymbol(): Promise<FMPTypes.EtfSymbol[]> {
	return fmpApi.get('etf-list').json<FMPTypes.EtfSymbol[]>()
}

/**
 * Retrieves a list of actively trading companies and financial instruments.
 * @returns A promise that resolves to an array of actively trading items.
 */
export async function listActivelyTrading(): Promise<FMPTypes.ActivelyTradingItem[]> {
	return fmpApi.get('actively-trading-list').json<FMPTypes.ActivelyTradingItem[]>()
}

/**
 * Retrieves a list of available stock exchanges.
 * @returns A promise that resolves to an array of available exchanges.
 */
export async function listAvailableExchanges(): Promise<FMPTypes.AvailableExchange[]> {
	return fmpApi.get('available-exchanges').json<FMPTypes.AvailableExchange[]>()
}

/**
 * Retrieves a list of available industry sectors.
 * @returns A promise that resolves to an array of available sectors.
 */
export async function listAvailableSectors(): Promise<FMPTypes.AvailableSector[]> {
	return fmpApi.get('available-sectors').json<FMPTypes.AvailableSector[]>()
}

/**
 * Retrieves a list of available industries.
 * @returns A promise that resolves to an array of available industries.
 */
export async function listAvailableIndustries(): Promise<FMPTypes.AvailableIndustry[]> {
	return fmpApi.get('available-industries').json<FMPTypes.AvailableIndustry[]>()
}

/**
 * Retrieves a list of available countries where stock symbols are available.
 * @returns A promise that resolves to an array of available countries.
 */
export async function listAvailableCountries(): Promise<FMPTypes.AvailableCountry[]> {
	return fmpApi.get('available-countries').json<FMPTypes.AvailableCountry[]>()
}

/**
 * ========================================================================
 *           ANALYST
 * ========================================================================
 */

/**
 * Options for retrieving financial estimates.
 */
export interface FinancialEstimatesOptions extends OptionalPaginationOptions {
	/** The reporting period, either 'annual' or 'quarter'. */
	period: FMPTypes.StatementPeriodOption
}

/**
 * Retrieves analyst financial estimates for a given stock symbol.
 * @param symbol The stock symbol (e.g., "AAPL").
 * @param options Options for period, pagination, and limit.
 * @returns A promise that resolves to an array of financial estimates.
 * @throws {Error} If symbol or period is not provided.
 */
export async function financialEstimates(
	symbol: string,
	options: FinancialEstimatesOptions,
): Promise<FMPTypes.FinancialEstimate[]> {
	if (!symbol) {
		throw new Error('Symbol parameter is required for getFinancialEstimates')
	}
	if (!options.period) {
		throw new Error('Period option is required for getFinancialEstimates')
	}
	const searchParams = cleanQuery({ symbol, ...options })
	return fmpApi.get('analyst-estimates', { searchParams }).json<FMPTypes.FinancialEstimate[]>()
}

/**
 * Options for retrieving ratings snapshot.
 */
export interface RatingsSnapshotOptions extends OptionalLimitOption {}

/**
 * Retrieves a snapshot of financial ratings for a given stock symbol.
 * @param symbol The stock symbol (e.g., "AAPL").
 * @param [options] Optional parameters.
 * @returns A promise that resolves to an array containing the ratings snapshot.
 * @throws {Error} If symbol is not provided.
 */
export async function ratingsSnapshot(
	symbol: string,
	options: RatingsSnapshotOptions = {},
): Promise<FMPTypes.RatingSnapshot[]> {
	if (!symbol) {
		throw new Error('Symbol parameter is required for getRatingsSnapshot')
	}
	const searchParams = cleanQuery({ symbol, ...options })
	return fmpApi.get('ratings-snapshot', { searchParams }).json<FMPTypes.RatingSnapshot[]>()
}

/**
 * Options for retrieving historical ratings.
 */
export interface HistoricalRatingsOptions extends OptionalLimitOption {}
/**
 * Retrieves historical financial ratings for a given stock symbol.
 * @param symbol The stock symbol (e.g., "AAPL").
 * @param [options] Optional parameters.
 * @returns A promise that resolves to an array of historical ratings.
 * @throws {Error} If symbol is not provided.
 */
export async function historicalRatings(
	symbol: string,
	options: HistoricalRatingsOptions = {},
): Promise<FMPTypes.HistoricalRating[]> {
	if (!symbol) {
		throw new Error('Symbol parameter is required for getHistoricalRatings')
	}
	const searchParams = cleanQuery({ symbol, ...options })
	return fmpApi.get('ratings-historical', { searchParams }).json<FMPTypes.HistoricalRating[]>()
}

/**
 * Retrieves a summary of analyst price targets for a given stock symbol.
 * @param symbol The stock symbol (e.g., "AAPL").
 * @returns A promise that resolves to an array containing the price target summary.
 * @throws {Error} If symbol is not provided.
 */
export async function priceTargetSummary(symbol: string): Promise<FMPTypes.PriceTargetSummary[]> {
	if (!symbol) {
		throw new Error('Symbol parameter is required for getPriceTargetSummary')
	}
	const searchParams = { symbol }
	return fmpApi.get('price-target-summary', { searchParams }).json<FMPTypes.PriceTargetSummary[]>()
}

/**
 * Retrieves the consensus price targets (high, low, consensus, median) for a given stock symbol.
 * @param symbol The stock symbol (e.g., "AAPL").
 * @returns A promise that resolves to an array containing the price target consensus.
 * @throws {Error} If symbol is not provided.
 */
export async function priceTargetConsensus(
	symbol: string,
): Promise<FMPTypes.PriceTargetConsensus[]> {
	if (!symbol) {
		throw new Error('Symbol parameter is required for getPriceTargetConsensus')
	}
	const searchParams = { symbol }
	return fmpApi
		.get('price-target-consensus', { searchParams })
		.json<FMPTypes.PriceTargetConsensus[]>()
}

/**
 * Options for retrieving price target news.
 */
export interface PriceTargetNewsOptions extends OptionalPaginationOptions {}

/**
 * Retrieves news articles related to analyst price target changes for a given stock symbol.
 * @param symbol The stock symbol (e.g., "AAPL").
 * @param [options] Optional parameters for pagination.
 * @returns A promise that resolves to an array of price target news items.
 * @throws {Error} If symbol is not provided.
 */
export async function priceTargetNews(
	symbol: string,
	options: PriceTargetNewsOptions = {},
): Promise<FMPTypes.PriceTargetNewsItem[]> {
	if (!symbol) {
		throw new Error('Symbol parameter is required for getPriceTargetNews')
	}
	const searchParams = cleanQuery({ symbol, ...options })
	return fmpApi.get('price-target-news', { searchParams }).json<FMPTypes.PriceTargetNewsItem[]>()
}

/**
 * Options for retrieving latest price target news.
 */
export interface LatestPriceTargetNewsOptions extends OptionalPaginationOptions {}
/**
 * Retrieves the latest price target news across all stock symbols.
 * @param [options] Optional parameters for pagination.
 * @returns A promise that resolves to an array of price target news items.
 */
export async function latestPriceTargetNews(
	options: LatestPriceTargetNewsOptions = {},
): Promise<FMPTypes.PriceTargetNewsItem[]> {
	const searchParams = cleanQuery(options)
	return fmpApi
		.get('price-target-latest-news', { searchParams })
		.json<FMPTypes.PriceTargetNewsItem[]>()
}

/**
 * Retrieves current stock grades (e.g., buy, sell, hold) from analysts for a given stock symbol.
 * @param symbol The stock symbol (e.g., "AAPL").
 * @returns A promise that resolves to an array of stock grades.
 * @throws {Error} If symbol is not provided.
 */
export async function stockGrades(symbol: string): Promise<FMPTypes.StockGrade[]> {
	if (!symbol) {
		throw new Error('Symbol parameter is required for getStockGrades')
	}
	const searchParams = { symbol }
	return fmpApi.get('grades', { searchParams }).json<FMPTypes.StockGrade[]>()
}

/**
 * Options for retrieving historical stock grades.
 */
export interface HistoricalStockGradesOptions extends OptionalLimitOption {}
/**
 * Retrieves historical stock grades for a given stock symbol. This endpoint returns a summary of buy/hold/sell counts per date.
 * @param symbol The stock symbol (e.g., "AAPL").
 * @param [options] Optional parameters.
 * @returns A promise that resolves to an array of historical stock grade summaries.
 * @throws {Error} If symbol is not provided.
 */
export async function historicalStockGrades(
	symbol: string,
	options: HistoricalStockGradesOptions = {},
): Promise<FMPTypes.HistoricalStockGradeSummary[]> {
	if (!symbol) {
		throw new Error('Symbol parameter is required for getHistoricalStockGrades')
	}
	const searchParams = cleanQuery({ symbol, ...options })
	return fmpApi
		.get('grades-historical', { searchParams })
		.json<FMPTypes.HistoricalStockGradeSummary[]>()
}

/**
 * Retrieves a summary of analyst stock grade consensus (strong buy, buy, hold, sell, strong sell) for a given stock symbol.
 * @param symbol The stock symbol (e.g., "AAPL").
 * @returns A promise that resolves to an array containing the stock grade consensus.
 * @throws {Error} If symbol is not provided.
 */
export async function stockGradeConsensus(symbol: string): Promise<FMPTypes.StockGradeConsensus[]> {
	if (!symbol) {
		throw new Error('Symbol parameter is required for getStockGradeConsensus')
	}
	const searchParams = { symbol }
	return fmpApi.get('grades-consensus', { searchParams }).json<FMPTypes.StockGradeConsensus[]>()
}

/**
 * Options for retrieving stock grade news.
 */
export interface StockGradeNewsOptions extends OptionalPaginationOptions {}
/**
 * Retrieves news articles related to analyst stock grade changes for a given stock symbol.
 * @param symbol The stock symbol (e.g., "AAPL").
 * @param [options] Optional parameters for pagination.
 * @returns A promise that resolves to an array of stock grade news items.
 * @throws {Error} If symbol is not provided.
 */
export async function stockGradeNews(
	symbol: string,
	options: StockGradeNewsOptions = {},
): Promise<FMPTypes.StockGradeNewsItem[]> {
	if (!symbol) {
		throw new Error('Symbol parameter is required for getStockGradeNews')
	}
	const searchParams = cleanQuery({ symbol, ...options })
	return fmpApi.get('grades-news', { searchParams }).json<FMPTypes.StockGradeNewsItem[]>()
}

/**
 * Options for retrieving latest stock grade news.
 */
export interface LatestStockGradeNewsOptions extends OptionalPaginationOptions {}
/**
 * Retrieves the latest stock grade news across all stock symbols.
 * @param [options] Optional parameters for pagination.
 * @returns A promise that resolves to an array of stock grade news items.
 */
export async function latestStockGradeNews(
	options: LatestStockGradeNewsOptions = {},
): Promise<FMPTypes.StockGradeNewsItem[]> {
	const searchParams = cleanQuery(options)
	return fmpApi.get('grades-latest-news', { searchParams }).json<FMPTypes.StockGradeNewsItem[]>()
}

/**
 * ========================================================================
 *           CALENDAR
 * ========================================================================
 */

/**
 * Options for retrieving company dividend history.
 */
export interface CompanyDividendsOptions extends OptionalLimitOption {}
/**
 * Retrieves dividend history for a specific company.
 * @param symbol The stock symbol (e.g., "AAPL").
 * @param [options] Optional parameters.
 * @returns A promise that resolves to an array of company dividend records.
 * @throws {Error} If symbol is not provided.
 */
export async function companyDividends(
	symbol: string,
	options: CompanyDividendsOptions = {},
): Promise<FMPTypes.CompanyDividend[]> {
	if (!symbol) {
		throw new Error('Symbol parameter is required for getCompanyDividends')
	}
	const searchParams = cleanQuery({ symbol, ...options })
	return fmpApi.get('dividends', { searchParams }).json<FMPTypes.CompanyDividend[]>()
}

/**
 * Options for retrieving the dividends calendar.
 */
export interface DividendsCalendarOptions extends RequiredRangeOptions {}
/**
 * Retrieves a calendar of dividend events for all stocks within a date range.
 * @param options Options specifying the date range.
 * @returns A promise that resolves to an array of calendar dividend records.
 * @throws {Error} If 'from' or 'to' date is not provided.
 */
export async function dividendsCalendar(
	options: DividendsCalendarOptions,
): Promise<FMPTypes.CalendarDividend[]> {
	if (!options.from) {
		throw new Error('From date option is required for getDividendsCalendar')
	}
	if (!options.to) {
		throw new Error('To date option is required for getDividendsCalendar')
	}
	const searchParams = cleanQuery(options)
	return fmpApi.get('dividends-calendar', { searchParams }).json<FMPTypes.CalendarDividend[]>()
}

/**
 * Options for retrieving company earnings reports.
 */
export interface CompanyEarningsReportsOptions extends OptionalLimitOption {}
/**
 * Retrieves earnings report history for a specific company.
 * @param symbol The stock symbol (e.g., "AAPL").
 * @param [options] Optional parameters.
 * @returns A promise that resolves to an array of company earnings reports.
 * @throws {Error} If symbol is not provided.
 */
export async function companyEarningsReports(
	symbol: string,
	options: CompanyEarningsReportsOptions = {},
): Promise<FMPTypes.CompanyEarningsReport[]> {
	if (!symbol) {
		throw new Error('Symbol parameter is required for getCompanyEarningsReports')
	}
	const searchParams = cleanQuery({ symbol, ...options })
	return fmpApi.get('earnings', { searchParams }).json<FMPTypes.CompanyEarningsReport[]>()
}

/**
 * Options for retrieving the earnings calendar.
 */
export interface EarningsCalendarOptions extends RequiredRangeOptions {}
/**
 * Retrieves a calendar of earnings announcements for all stocks within a date range.
 * @param options Options specifying the date range.
 * @returns A promise that resolves to an array of company earnings reports.
 * @throws {Error} If 'from' or 'to' date is not provided.
 */
export async function earningsCalendar(
	options: EarningsCalendarOptions,
): Promise<FMPTypes.CompanyEarningsReport[]> {
	if (!options.from) {
		throw new Error('From date option is required for getEarningsCalendar')
	}
	if (!options.to) {
		throw new Error('To date option is required for getEarningsCalendar')
	}
	const searchParams = cleanQuery(options)
	return fmpApi.get('earnings-calendar', { searchParams }).json<FMPTypes.CompanyEarningsReport[]>()
}

/**
 * Options for retrieving the IPOs calendar.
 */
export interface IposCalendarOptions extends RequiredRangeOptions {}
/**
 * Retrieves a calendar of upcoming Initial Public Offerings (IPOs).
 * @param options Options specifying the date range.
 * @returns A promise that resolves to an array of IPO calendar items.
 * @throws {Error} If 'from' or 'to' date is not provided.
 */
export async function iposCalendar(
	options: IposCalendarOptions,
): Promise<FMPTypes.IpoCalendarItem[]> {
	if (!options.from) {
		throw new Error('From date option is required for getIposCalendar')
	}
	if (!options.to) {
		throw new Error('To date option is required for getIposCalendar')
	}
	const searchParams = cleanQuery(options)
	return fmpApi.get('ipos-calendar', { searchParams }).json<FMPTypes.IpoCalendarItem[]>()
}

/**
 * Options for retrieving IPO disclosures.
 */
export interface IpoDisclosuresOptions extends RequiredRangeOptions {}
/**
 * Retrieves a list of disclosure filings for upcoming IPOs.
 * @param options Options specifying the date range.
 * @returns A promise that resolves to an array of IPO disclosures.
 * @throws {Error} If 'from' or 'to' date is not provided.
 */
export async function ipoDisclosures(
	options: IpoDisclosuresOptions,
): Promise<FMPTypes.IpoDisclosure[]> {
	if (!options.from) {
		throw new Error('From date option is required for getIpoDisclosures')
	}
	if (!options.to) {
		throw new Error('To date option is required for getIpoDisclosures')
	}
	const searchParams = cleanQuery(options)
	return fmpApi.get('ipos-disclosure', { searchParams }).json<FMPTypes.IpoDisclosure[]>()
}

/**
 * Options for retrieving IPO prospectuses.
 */
export interface IpoProspectusOptions extends RequiredRangeOptions {}
/**
 * Retrieves information on IPO prospectuses.
 * @param options Options specifying the date range.
 * @returns A promise that resolves to an array of IPO prospectus details.
 * @throws {Error} If 'from' or 'to' date is not provided.
 */
export async function ipoProspectus(
	options: IpoProspectusOptions,
): Promise<FMPTypes.IpoProspectus[]> {
	if (!options.from) {
		throw new Error('From date option is required for getIpoProspectus')
	}
	if (!options.to) {
		throw new Error('To date option is required for getIpoProspectus')
	}
	const searchParams = cleanQuery(options)
	return fmpApi.get('ipos-prospectus', { searchParams }).json<FMPTypes.IpoProspectus[]>()
}

/**
 * Options for retrieving stock split details for a company.
 */
export interface StockSplitDetailsOptions extends OptionalLimitOption {}
/**
 * Retrieves stock split details for a specific company.
 * @param symbol The stock symbol (e.g., "AAPL").
 * @param [options] Optional parameters.
 * @returns A promise that resolves to an array of stock split details.
 * @throws {Error} If symbol is not provided.
 */
export async function stockSplitDetails(
	symbol: string,
	options: StockSplitDetailsOptions = {},
): Promise<FMPTypes.StockSplitDetail[]> {
	if (!symbol) {
		throw new Error('Symbol parameter is required for getStockSplitDetails')
	}
	const searchParams = cleanQuery({ symbol, ...options })
	return fmpApi.get('splits', { searchParams }).json<FMPTypes.StockSplitDetail[]>()
}

/**
 * Options for retrieving the stock splits calendar.
 */
export interface StockSplitsCalendarOptions extends RequiredRangeOptions {}
/**
 * Retrieves a calendar of upcoming stock splits.
 * @param options Options specifying the date range.
 * @returns A promise that resolves to an array of stock split details.
 * @throws {Error} If 'from' or 'to' date is not provided.
 */
export async function stockSplitsCalendar(
	options: StockSplitsCalendarOptions,
): Promise<FMPTypes.StockSplitDetail[]> {
	if (!options.from) {
		throw new Error('From date option is required for getStockSplitsCalendar')
	}
	if (!options.to) {
		throw new Error('To date option is required for getStockSplitsCalendar')
	}
	const searchParams = cleanQuery(options)
	return fmpApi.get('splits-calendar', { searchParams }).json<FMPTypes.StockSplitDetail[]>()
}

/**
 * ========================================================================
 *           CHART
 * ========================================================================
 */

/**
 * Options for historical EOD (End of Day) chart data.
 */
export interface HistoricalEodChartOptions extends OptionalRangeOptions {}

/**
 * Retrieves simplified historical end-of-day stock chart data (date, price, volume).
 * @param symbol The stock symbol (e.g., "AAPL").
 * @param [options] Optional date range.
 * @returns A promise that resolves to an array of light stock chart items.
 * @throws {Error} If symbol is not provided.
 */
export async function stockChartLight(
	symbol: string,
	options: HistoricalEodChartOptions = {},
): Promise<FMPTypes.StockChartLightItem[]> {
	if (!symbol) {
		throw new Error('Symbol parameter is required for getStockChartLight')
	}
	const searchParams = cleanQuery({ symbol, ...options })
	return fmpApi
		.get('historical-price-eod/light', { searchParams })
		.json<FMPTypes.StockChartLightItem[]>()
}

/**
 * Retrieves full historical end-of-day stock price and volume data.
 * @param symbol The stock symbol (e.g., "AAPL").
 * @param [options] Optional date range.
 * @returns A promise that resolves to an array of full stock chart items.
 * @throws {Error} If symbol is not provided.
 */
export async function stockChartFull(
	symbol: string,
	options: HistoricalEodChartOptions = {},
): Promise<FMPTypes.StockChartFullItem[]> {
	if (!symbol) {
		throw new Error('Symbol parameter is required for getStockChartFull')
	}
	const searchParams = cleanQuery({ symbol, ...options })
	return fmpApi
		.get('historical-price-eod/full', { searchParams })
		.json<FMPTypes.StockChartFullItem[]>()
}

/**
 * Retrieves unadjusted historical end-of-day stock price data.
 * @param symbol The stock symbol (e.g., "AAPL").
 * @param [options] Optional date range.
 * @returns A promise that resolves to an array of unadjusted stock chart items.
 * @throws {Error} If symbol is not provided.
 */
export async function unadjustedStockChart(
	symbol: string,
	options: HistoricalEodChartOptions = {},
): Promise<FMPTypes.UnadjustedStockChartItem[]> {
	if (!symbol) {
		throw new Error('Symbol parameter is required for getUnadjustedStockChart')
	}
	const searchParams = cleanQuery({ symbol, ...options })
	return fmpApi
		.get('historical-price-eod/non-split-adjusted', { searchParams })
		.json<FMPTypes.UnadjustedStockChartItem[]>()
}

/**
 * Retrieves dividend-adjusted historical end-of-day stock price data.
 * @param symbol The stock symbol (e.g., "AAPL").
 * @param [options] Optional date range.
 * @returns A promise that resolves to an array of dividend-adjusted stock chart items (structure matches UnadjustedStockChartItem).
 * @throws {Error} If symbol is not provided.
 */
export async function dividendAdjustedStockChart(
	symbol: string,
	options: HistoricalEodChartOptions = {},
): Promise<FMPTypes.UnadjustedStockChartItem[]> {
	if (!symbol) {
		throw new Error('Symbol parameter is required for getDividendAdjustedStockChart')
	}
	const searchParams = cleanQuery({ symbol, ...options })
	return fmpApi
		.get('historical-price-eod/dividend-adjusted', { searchParams })
		.json<FMPTypes.UnadjustedStockChartItem[]>()
}

/**
 * Options for intraday historical chart data.
 */
export interface HistoricalIntradayChartOptions extends OptionalRangeOptions {
	/** Whether to fetch non-adjusted data. Defaults to false. */
	nonadjusted?: boolean | null
}

/**
 * Retrieves historical intraday stock chart data for a specific timeframe.
 * @param symbol The stock symbol (e.g., "AAPL").
 * @param timeframe The intraday timeframe ('1min', '5min', '15min', '30min', '1hour', '4hour').
 * @param [options] Optional date range and adjustment settings.
 * @returns A promise that resolves to an array of base chart items.
 * @throws {Error} If symbol or timeframe is not provided.
 */
export async function historicalIntradayChart(
	symbol: string,
	timeframe: FMPTypes.IntradayTimeframe,
	options: HistoricalIntradayChartOptions = {},
): Promise<FMPTypes.BaseChartItem[]> {
	if (!symbol) {
		throw new Error('Symbol parameter is required for historicalIntradayChart')
	}
	if (!timeframe) {
		throw new Error('Timeframe parameter is required for historicalIntradayChart')
	}
	const searchParams = cleanQuery({ symbol, ...options })
	return fmpApi
		.get(`historical-chart/${timeframe}`, { searchParams })
		.json<FMPTypes.BaseChartItem[]>()
}

/**
 * Retrieves 1-minute interval historical stock chart data.
 * @param symbol The stock symbol (e.g., "AAPL").
 * @param [options] Optional date range and adjustment settings.
 * @returns A promise that resolves to an array of 1-minute chart items.
 */
export async function stockChart1Min(
	symbol: string,
	options: HistoricalIntradayChartOptions = {},
): Promise<FMPTypes.BaseChartItem[]> {
	return historicalIntradayChart(symbol, '1min', options)
}

/**
 * Retrieves 5-minute interval historical stock chart data.
 * @param symbol The stock symbol (e.g., "AAPL").
 * @param [options] Optional date range and adjustment settings.
 * @returns A promise that resolves to an array of 5-minute chart items.
 */
export async function stockChart5Min(
	symbol: string,
	options: HistoricalIntradayChartOptions = {},
): Promise<FMPTypes.BaseChartItem[]> {
	return historicalIntradayChart(symbol, '5min', options)
}

/**
 * Retrieves 15-minute interval historical stock chart data.
 * @param symbol The stock symbol (e.g., "AAPL").
 * @param [options] Optional date range and adjustment settings.
 * @returns A promise that resolves to an array of 15-minute chart items.
 */
export async function stockChart15Min(
	symbol: string,
	options: HistoricalIntradayChartOptions = {},
): Promise<FMPTypes.BaseChartItem[]> {
	return historicalIntradayChart(symbol, '15min', options)
}

/**
 * Retrieves 30-minute interval historical stock chart data.
 * @param symbol The stock symbol (e.g., "AAPL").
 * @param [options] Optional date range and adjustment settings.
 * @returns A promise that resolves to an array of 30-minute chart items.
 */
export async function stockChart30Min(
	symbol: string,
	options: HistoricalIntradayChartOptions = {},
): Promise<FMPTypes.BaseChartItem[]> {
	return historicalIntradayChart(symbol, '30min', options)
}

/**
 * Retrieves 1-hour interval historical stock chart data.
 * @param symbol The stock symbol (e.g., "AAPL").
 * @param [options] Optional date range and adjustment settings.
 * @returns A promise that resolves to an array of 1-hour chart items.
 */
export async function stockChart1Hour(
	symbol: string,
	options: HistoricalIntradayChartOptions = {},
): Promise<FMPTypes.BaseChartItem[]> {
	return historicalIntradayChart(symbol, '1hour', options)
}

/**
 * Retrieves 4-hour interval historical stock chart data.
 * @param symbol The stock symbol (e.g., "AAPL").
 * @param [options] Optional date range and adjustment settings.
 * @returns A promise that resolves to an array of 4-hour chart items.
 */
export async function stockChart4Hour(
	symbol: string,
	options: HistoricalIntradayChartOptions = {},
): Promise<FMPTypes.BaseChartItem[]> {
	return historicalIntradayChart(symbol, '4hour', options)
}

/**
 * ========================================================================
 *           COMPANY
 * ========================================================================
 */

/**
 * Retrieves detailed company profile data for a given stock symbol.
 * @param symbol The stock symbol (e.g., "AAPL").
 * @returns A promise that resolves to an array containing the company profile.
 * @throws {Error} If symbol is not provided.
 */
export async function companyProfile(symbol: string): Promise<FMPTypes.CompanyProfile[]> {
	if (!symbol) {
		throw new Error('Symbol parameter is required for getCompanyProfile')
	}
	const searchParams = { symbol }
	return fmpApi.get('profile', { searchParams }).json<FMPTypes.CompanyProfile[]>()
}

/**
 * Retrieves detailed company profile data by CIK.
 * @param cik The Central Index Key (CIK) of the company (e.g., "320193").
 * @returns A promise that resolves to an array containing the company profile.
 * @throws {Error} If CIK is not provided.
 */
export async function companyProfileByCik(cik: string): Promise<FMPTypes.CompanyProfile[]> {
	if (!cik) {
		throw new Error('CIK parameter is required for getCompanyProfileByCik')
	}
	const searchParams = { cik }
	return fmpApi.get('profile-cik', { searchParams }).json<FMPTypes.CompanyProfile[]>()
}

/**
 * Retrieves information about company-issued notes for a given stock symbol.
 * @param symbol The stock symbol (e.g., "AAPL").
 * @returns A promise that resolves to an array of company notes.
 * @throws {Error} If symbol is not provided.
 */
export async function companyNotes(symbol: string): Promise<FMPTypes.CompanyNote[]> {
	if (!symbol) {
		throw new Error('Symbol parameter is required for getCompanyNotes')
	}
	const searchParams = { symbol }
	return fmpApi.get('company-notes', { searchParams }).json<FMPTypes.CompanyNote[]>()
}

/**
 * Retrieves a list of peer companies for a given stock symbol.
 * @param symbol The stock symbol (e.g., "AAPL").
 * @returns A promise that resolves to an array of stock peers.
 * @throws {Error} If symbol is not provided.
 */
export async function stockPeers(symbol: string): Promise<FMPTypes.StockPeer[]> {
	if (!symbol) {
		throw new Error('Symbol parameter is required for getStockPeers')
	}
	const searchParams = { symbol }
	return fmpApi.get('stock-peers', { searchParams }).json<FMPTypes.StockPeer[]>()
}

/**
 * Options for retrieving delisted companies.
 */
export interface DelistedCompaniesOptions extends OptionalPaginationOptions {}
/**
 * Retrieves a list of delisted companies.
 * @param [options] Optional parameters for pagination.
 * @returns A promise that resolves to an array of delisted companies.
 */
export async function delistedCompanies(
	options: DelistedCompaniesOptions = {},
): Promise<FMPTypes.DelistedCompany[]> {
	const searchParams = cleanQuery(options)
	return fmpApi.get('delisted-companies', { searchParams }).json<FMPTypes.DelistedCompany[]>()
}

/**
 * Options for retrieving company employee count.
 */
export interface CompanyEmployeeCountOptions extends OptionalLimitOption {}
/**
 * Retrieves employee count information for a given company.
 * @param symbol The stock symbol (e.g., "AAPL").
 * @param [options] Optional parameters.
 * @returns A promise that resolves to an array of company employee count records.
 * @throws {Error} If symbol is not provided.
 */
export async function companyEmployeeCount(
	symbol: string,
	options: CompanyEmployeeCountOptions = {},
): Promise<FMPTypes.CompanyEmployeeCount[]> {
	if (!symbol) {
		throw new Error('Symbol parameter is required for getCompanyEmployeeCount')
	}
	const searchParams = cleanQuery({ symbol, ...options })
	return fmpApi.get('employee-count', { searchParams }).json<FMPTypes.CompanyEmployeeCount[]>()
}

/**
 * Retrieves historical employee count data for a given company.
 * @param symbol The stock symbol (e.g., "AAPL").
 * @param [options] Optional parameters (same as CompanyEmployeeCountOptions).
 * @returns A promise that resolves to an array of historical company employee count records.
 * @throws {Error} If symbol is not provided.
 */
export async function historicalCompanyEmployeeCount(
	symbol: string,
	options: CompanyEmployeeCountOptions = {},
): Promise<FMPTypes.CompanyEmployeeCount[]> {
	if (!symbol) {
		throw new Error('Symbol parameter is required for getHistoricalCompanyEmployeeCount')
	}
	const searchParams = cleanQuery({ symbol, ...options })
	return fmpApi
		.get('historical-employee-count', { searchParams })
		.json<FMPTypes.CompanyEmployeeCount[]>()
}

/**
 * Retrieves the market capitalization for a specific company on the current date.
 * @param symbol The stock symbol (e.g., "AAPL").
 * @returns A promise that resolves to an array containing the company's market capitalization.
 * @throws {Error} If symbol is not provided.
 */
export async function companyMarketCap(symbol: string): Promise<FMPTypes.CompanyMarketCap[]> {
	if (!symbol) {
		throw new Error('Symbol parameter is required for getCompanyMarketCap')
	}
	const searchParams = { symbol }
	return fmpApi.get('market-capitalization', { searchParams }).json<FMPTypes.CompanyMarketCap[]>()
}

/**
 * Retrieves market capitalization data for multiple companies in a single request.
 * @param symbols An array of stock symbols (e.g., ["AAPL", "MSFT", "GOOG"]).
 * @returns A promise that resolves to an array of company market capitalizations.
 * @throws {Error} If symbols array is not provided or is empty.
 */
export async function batchMarketCap(symbols: string[]): Promise<FMPTypes.CompanyMarketCap[]> {
	if (!symbols || symbols.length === 0) {
		throw new Error('Symbols array is required for getBatchMarketCap')
	}
	const searchParams = cleanQuery({ symbols }) // cleanQuery handles array to comma-separated string
	return fmpApi
		.get('market-capitalization-batch', { searchParams })
		.json<FMPTypes.CompanyMarketCap[]>()
}

/**
 * Options for retrieving historical market capitalization.
 */
export interface HistoricalMarketCapOptions extends OptionalLimitOption, OptionalRangeOptions {}
/**
 * Retrieves historical market capitalization data for a company.
 * @param symbol The stock symbol (e.g., "AAPL").
 * @param [options] Optional parameters for limit and date range.
 * @returns A promise that resolves to an array of historical market capitalizations.
 * @throws {Error} If symbol is not provided.
 */
export async function historicalMarketCap(
	symbol: string,
	options: HistoricalMarketCapOptions = {},
): Promise<FMPTypes.CompanyMarketCap[]> {
	if (!symbol) {
		throw new Error('Symbol parameter is required for getHistoricalMarketCap')
	}
	const searchParams = cleanQuery({ symbol, ...options })
	return fmpApi
		.get('historical-market-capitalization', { searchParams })
		.json<FMPTypes.CompanyMarketCap[]>()
}

/**
 * Retrieves share float and liquidity data for a company.
 * @param symbol The stock symbol (e.g., "AAPL").
 * @returns A promise that resolves to an array containing the company's shares float data.
 * @throws {Error} If symbol is not provided.
 */
export async function companySharesFloat(symbol: string): Promise<FMPTypes.CompanySharesFloat[]> {
	if (!symbol) {
		throw new Error('Symbol parameter is required for getCompanySharesFloat')
	}
	const searchParams = { symbol }
	return fmpApi.get('shares-float', { searchParams }).json<FMPTypes.CompanySharesFloat[]>()
}

/**
 * Options for retrieving all shares float data.
 */
export interface AllSharesFloatOptions extends OptionalPaginationOptions {}
/**
 * Retrieves shares float data for all available companies.
 * @param [options] Optional parameters for pagination.
 * @returns A promise that resolves to an array of company shares float data.
 */
export async function allSharesFloat(
	options: AllSharesFloatOptions = {},
): Promise<FMPTypes.CompanySharesFloat[]> {
	const searchParams = cleanQuery(options)
	return fmpApi.get('shares-float-all', { searchParams }).json<FMPTypes.CompanySharesFloat[]>()
}

/**
 * Options for retrieving latest mergers and acquisitions.
 */
export interface LatestMergersAcquisitionsOptions extends OptionalPaginationOptions {}
/**
 * Retrieves the latest mergers and acquisitions data.
 * @param [options] Optional parameters for pagination.
 * @returns A promise that resolves to an array of merger and acquisition records.
 */
export async function latestMergersAcquisitions(
	options: LatestMergersAcquisitionsOptions = {},
): Promise<FMPTypes.MergerAcquisition[]> {
	const searchParams = cleanQuery(options)
	return fmpApi
		.get('mergers-acquisitions-latest', { searchParams })
		.json<FMPTypes.MergerAcquisition[]>()
}

/**
 * Searches for mergers and acquisitions data by name.
 * @param name The name to search for (e.g., "Apple").
 * @returns A promise that resolves to an array of merger and acquisition records.
 * @throws {Error} If name is not provided.
 */
export async function searchMergersAcquisitions(
	name: string,
): Promise<FMPTypes.MergerAcquisition[]> {
	if (!name) {
		throw new Error('Name parameter is required for searchMergersAcquisitions')
	}
	const searchParams = { name }
	return fmpApi
		.get('mergers-acquisitions-search', { searchParams })
		.json<FMPTypes.MergerAcquisition[]>()
}

/**
 * Options for retrieving company executives.
 */
export interface CompanyExecutivesOptions {
	/** Filter for active executives if "true". E.g., "true". */
	active?: string | boolean | null
}
/**
 * Retrieves information on company executives for a given stock symbol.
 * @param symbol The stock symbol (e.g., "AAPL").
 * @param [options] Optional parameters.
 * @returns A promise that resolves to an array of company executives.
 * @throws {Error} If symbol is not provided.
 */
export async function companyExecutives(
	symbol: string,
	options: CompanyExecutivesOptions = {},
): Promise<FMPTypes.CompanyExecutive[]> {
	if (!symbol) {
		throw new Error('Symbol parameter is required for getCompanyExecutives')
	}
	const searchParams = cleanQuery({ symbol, ...options })
	return fmpApi.get('key-executives', { searchParams }).json<FMPTypes.CompanyExecutive[]>()
}

/**
 * Retrieves executive compensation data for a given stock symbol.
 * @param symbol The stock symbol (e.g., "AAPL").
 * @returns A promise that resolves to an array of executive compensation records.
 * @throws {Error} If symbol is not provided.
 */
export async function executiveCompensation(
	symbol: string,
): Promise<FMPTypes.ExecutiveCompensation[]> {
	if (!symbol) {
		throw new Error('Symbol parameter is required for getExecutiveCompensation')
	}
	const searchParams = { symbol }
	return fmpApi
		.get('governance-executive-compensation', { searchParams })
		.json<FMPTypes.ExecutiveCompensation[]>()
}

/**
 * Retrieves average executive compensation data across various industries for a specific year.
 * @param year The year to retrieve benchmark data for (e.g., "2024").
 * @returns A promise that resolves to an array of executive compensation benchmarks.
 * @throws {Error} If year is not provided.
 */
export async function executiveCompensationBenchmark(
	year: string | number,
): Promise<FMPTypes.ExecutiveCompensationBenchmark[]> {
	if (!year) {
		throw new Error('Year parameter is required for getExecutiveCompensationBenchmark')
	}
	const searchParams = { year }
	return fmpApi
		.get('executive-compensation-benchmark', { searchParams })
		.json<FMPTypes.ExecutiveCompensationBenchmark[]>()
}

/**
 * ========================================================================
 *           COMMITMENT OF TRADERS
 * ========================================================================
 */

/**
 * Options for retrieving Commitment of Traders (COT) reports.
 */
export interface CotReportOptions extends OptionalRangeOptions {
	/** The symbol for the report (e.g., "AAPL", "KC"). */
	symbol?: string | null
	// Docs say AAPL example, but KC in response. Likely commodity/future symbol.
}
/**
 * Retrieves Commitment of Traders (COT) reports.
 * @param [options] Optional parameters to filter reports by symbol and date range.
 * @returns A promise that resolves to an array of COT reports.
 */
export async function cotReport(options: CotReportOptions = {}): Promise<FMPTypes.CotReport[]> {
	const searchParams = cleanQuery(options)
	return fmpApi.get('commitment-of-traders-report', { searchParams }).json<FMPTypes.CotReport[]>()
}

/**
 * Options for retrieving Commitment of Traders (COT) analysis.
 */
export interface CotAnalysisOptions extends OptionalRangeOptions {
	/** The symbol for the analysis (e.g., "AAPL", "B6"). */
	symbol?: string | null
}
/**
 * Retrieves analysis of Commitment of Traders (COT) reports for a specific date range.
 * @param [options] Optional parameters to filter analysis by symbol and date range.
 * @returns A promise that resolves to an array of COT analysis records.
 */
export async function cotAnalysis(
	options: CotAnalysisOptions = {},
): Promise<FMPTypes.CotAnalysis[]> {
	const searchParams = cleanQuery(options)
	return fmpApi
		.get('commitment-of-traders-analysis', { searchParams })
		.json<FMPTypes.CotAnalysis[]>()
}

/**
 * Retrieves a list of available Commitment of Traders (COT) report symbols.
 * @returns A promise that resolves to an array of COT report list items.
 */
export async function cotReportList(): Promise<FMPTypes.CotReportListItem[]> {
	return fmpApi.get('commitment-of-traders-list').json<FMPTypes.CotReportListItem[]>()
}

/**
 * ========================================================================
 *           DISCOUNTED CASH FLOW
 * ========================================================================
 */

/**
 * Retrieves a Discounted Cash Flow (DCF) valuation for a company.
 * @param symbol The stock symbol (e.g., "AAPL").
 * @returns A promise that resolves to an array containing the DCF valuation.
 * @throws {Error} If symbol is not provided.
 */
export async function dcfValuation(symbol: string): Promise<FMPTypes.DcfValuation[]> {
	if (!symbol) {
		throw new Error('Symbol parameter is required for getDcfValuation')
	}
	const searchParams = { symbol }
	return fmpApi.get('discounted-cash-flow', { searchParams }).json<FMPTypes.DcfValuation[]>()
}

/**
 * Retrieves a Levered Discounted Cash Flow (DCF) valuation for a company.
 * @param symbol The stock symbol (e.g., "AAPL").
 * @returns A promise that resolves to an array containing the Levered DCF valuation.
 * @throws {Error} If symbol is not provided.
 */
export async function leveredDcfValuation(symbol: string): Promise<FMPTypes.DcfValuation[]> {
	if (!symbol) {
		throw new Error('Symbol parameter is required for getLeveredDcfValuation')
	}
	const searchParams = { symbol }
	return fmpApi
		.get('levered-discounted-cash-flow', { searchParams })
		.json<FMPTypes.DcfValuation[]>()
}

/**
 * Parameters for Custom DCF Advanced and Levered API.
 * These are percentages (e.g., 0.10 for 10%) or rates.
 */
export interface CustomDcfParams {
	/** Expected revenue growth percentage. E.g., 0.1094. */
	revenueGrowthPct?: number | null
	/** Expected EBITDA as a percentage of revenue. E.g., 0.3127. */
	ebitdaPct?: number | null
	/** Expected Depreciation & Amortization as a percentage of revenue. E.g., 0.0345. */
	depreciationAndAmortizationPct?: number | null
	/** Expected Cash & Short Term Investments as a percentage of revenue. E.g., 0.2344. */
	cashAndShortTermInvestmentsPct?: number | null
	/** Expected Receivables as a percentage of revenue. E.g., 0.1533. */
	receivablesPct?: number | null
	/** Expected Inventories as a percentage of revenue. E.g., 0.0155. */
	inventoriesPct?: number | null
	/** Expected Payables as a percentage of revenue. E.g., 0.1614. */
	payablePct?: number | null
	/** Expected EBIT as a percentage of revenue. E.g., 0.2781. */
	ebitPct?: number | null
	/** Expected Capital Expenditure as a percentage of revenue. E.g., 0.0306. */
	capitalExpenditurePct?: number | null
	/** Expected Operating Cash Flow as a percentage of revenue. E.g., 0.2886. */
	operatingCashFlowPct?: number | null
	/** Expected Selling, General & Administrative Expenses as a percentage of revenue. E.g., 0.0662. */
	sellingGeneralAndAdministrativeExpensesPct?: number | null
	/** Effective tax rate. E.g., 0.1491. */
	taxRate?: number | null
	/** Long-term growth rate for terminal value calculation. E.g., 4 (for 4%). */
	longTermGrowthRate?: number | null
	/** Cost of debt. E.g., 3.64 (for 3.64%). */
	costOfDebt?: number | null
	/** Cost of equity. E.g., 9.51168 (for 9.51%). */
	costOfEquity?: number | null
	/** Market risk premium. E.g., 4.72 (for 4.72%). */
	marketRiskPremium?: number | null
	/** Beta of the stock. E.g., 1.244. */
	beta?: number | null
	/** Risk-free rate. E.g., 3.64 (for 3.64%). */
	riskFreeRate?: number | null
}

/**
 * Runs a custom (unlevered) Discounted Cash Flow (DCF) analysis.
 * @param symbol The stock symbol (e.g., "AAPL").
 * @param [params] Custom parameters for the DCF calculation.
 * @returns A promise that resolves to an array containing the custom DCF result.
 * @throws {Error} If symbol is not provided.
 */
export async function dcfAnalysis(
	symbol: string,
	params: CustomDcfParams = {},
): Promise<FMPTypes.CustomDcfAdvancedResult[]> {
	if (!symbol) {
		throw new Error('Symbol parameter is required for getCustomDcfAdvanced')
	}
	const searchParams = cleanQuery({ symbol, ...params })
	return fmpApi
		.get('custom-discounted-cash-flow', { searchParams })
		.json<FMPTypes.CustomDcfAdvancedResult[]>()
}

/**
 * Runs a custom Levered Discounted Cash Flow (DCF) analysis.
 * @param symbol The stock symbol (e.g., "AAPL").
 * @param [params] Custom parameters for the DCF calculation (same as CustomDcfParams).
 * @returns A promise that resolves to an array containing the custom levered DCF result.
 * @throws {Error} If symbol is not provided.
 */
export async function dcfLeveredAnalysis(
	symbol: string,
	params: CustomDcfParams = {},
): Promise<FMPTypes.CustomDcfLeveredResult[]> {
	if (!symbol) {
		throw new Error('Symbol parameter is required for getCustomDcfLevered')
	}
	const searchParams = cleanQuery({ symbol, ...params })
	return fmpApi
		.get('custom-levered-discounted-cash-flow', { searchParams })
		.json<FMPTypes.CustomDcfLeveredResult[]>()
}

/**
 * ========================================================================
 *           ECONOMICS
 * ========================================================================
 */

/**
 * Options for retrieving Treasury rates.
 */
export interface TreasuryRatesOptions extends RequiredRangeOptions {}
/**
 * Retrieves Treasury rates for various maturities within a date range.
 * @param options Options specifying the date range.
 * @returns A promise that resolves to an array of Treasury rates.
 * @throws {Error} If 'from' or 'to' date is not provided.
 */
export async function treasuryRates(
	options: TreasuryRatesOptions,
): Promise<FMPTypes.TreasuryRate[]> {
	if (!options.from) {
		throw new Error('From date option is required for getTreasuryRates')
	}
	if (!options.to) {
		throw new Error('To date option is required for getTreasuryRates')
	}
	const searchParams = cleanQuery(options)
	return fmpApi.get('treasury-rates', { searchParams }).json<FMPTypes.TreasuryRate[]>()
}

/**
 * Options for retrieving economic indicators.
 */
export interface EconomicIndicatorsOptions extends OptionalRangeOptions {}
/**
 * Retrieves data for a specific economic indicator.
 * @param name The name of the economic indicator (e.g., "GDP", "CPI").
 * @param [options] Optional date range.
 * @returns A promise that resolves to an array of economic indicator data points.
 * @throws {Error} If name is not provided.
 */
export async function economicIndicators(
	name: FMPTypes.EconomicIndicatorName,
	options: EconomicIndicatorsOptions = {},
): Promise<FMPTypes.EconomicIndicator[]> {
	if (!name) {
		throw new Error('Name parameter is required for getEconomicIndicators')
	}
	const searchParams = cleanQuery({ name, ...options })
	return fmpApi.get('economic-indicators', { searchParams }).json<FMPTypes.EconomicIndicator[]>()
}

/**
 * Options for retrieving the economic data releases calendar.
 */
export interface EconomicCalendarOptions extends RequiredRangeOptions {}
/**
 * Retrieves a calendar of upcoming economic data releases.
 * @param options Options specifying the date range.
 * @returns A promise that resolves to an array of economic calendar releases.
 * @throws {Error} If 'from' or 'to' date is not provided.
 */
export async function economicCalendar(
	options: EconomicCalendarOptions,
): Promise<FMPTypes.EconomicCalendarRelease[]> {
	if (!options.from) {
		throw new Error('From date option is required for getEconomicCalendar')
	}
	if (!options.to) {
		throw new Error('To date option is required for getEconomicCalendar')
	}
	const searchParams = cleanQuery(options)
	return fmpApi
		.get('economic-calendar', { searchParams })
		.json<FMPTypes.EconomicCalendarRelease[]>()
}

/**
 * Retrieves market risk premium data.
 * @returns A promise that resolves to an array of market risk premium information by country.
 */
export async function marketRiskPremium(): Promise<FMPTypes.MarketRiskPremiumInfo[]> {
	return fmpApi.get('market-risk-premium').json<FMPTypes.MarketRiskPremiumInfo[]>()
}

/**
 * ========================================================================
 *           ESG
 * ========================================================================
 */

/**
 * Retrieves ESG (Environmental, Social, Governance) disclosure data for a company.
 * @param symbol The stock symbol (e.g., "AAPL").
 * @returns A promise that resolves to an array of ESG disclosures.
 * @throws {Error} If symbol is not provided.
 */
export async function esgDisclosures(symbol: string): Promise<FMPTypes.EsgDisclosure[]> {
	if (!symbol) {
		throw new Error('Symbol parameter is required for getEsgDisclosures')
	}
	const searchParams = { symbol }
	return fmpApi.get('esg-disclosures', { searchParams }).json<FMPTypes.EsgDisclosure[]>()
}

/**
 * Retrieves ESG ratings for a company.
 * @param symbol The stock symbol (e.g., "AAPL").
 * @returns A promise that resolves to an array of ESG ratings.
 * @throws {Error} If symbol is not provided.
 */
export async function esgRatings(symbol: string): Promise<FMPTypes.EsgRating[]> {
	if (!symbol) {
		throw new Error('Symbol parameter is required for getEsgRatings')
	}
	const searchParams = { symbol }
	return fmpApi.get('esg-ratings', { searchParams }).json<FMPTypes.EsgRating[]>()
}

/**
 * Retrieves ESG benchmark comparison data for a specific year.
 * @param year The year for the benchmark data (e.g., "2023").
 * @returns A promise that resolves to an array of ESG benchmarks by sector.
 * @throws {Error} If year is not provided.
 */
export async function esgBenchmark(year: string | number): Promise<FMPTypes.EsgBenchmark[]> {
	if (!year) {
		throw new Error('Year parameter is required for getEsgBenchmark')
	}
	const searchParams = { year }
	return fmpApi.get('esg-benchmark', { searchParams }).json<FMPTypes.EsgBenchmark[]>()
}

/**
 * ========================================================================
 *           ETF AND MUTUAL FUNDS
 * ========================================================================
 */

/**
 * Retrieves the holdings of an ETF or mutual fund.
 * @param symbol The symbol of the ETF or fund (e.g., "SPY").
 * @returns A promise that resolves to an array of ETF/fund holdings.
 * @throws {Error} If symbol is not provided.
 */
export async function etfFundHoldings(symbol: string): Promise<FMPTypes.EtfFundHolding[]> {
	if (!symbol) {
		throw new Error('Symbol parameter is required for getEtfFundHoldings')
	}
	const searchParams = { symbol }
	return fmpApi.get('etf/holdings', { searchParams }).json<FMPTypes.EtfFundHolding[]>()
}

/**
 * Retrieves information about an ETF or mutual fund.
 * @param symbol The symbol of the ETF or fund (e.g., "SPY").
 * @returns A promise that resolves to an array containing the ETF/fund information.
 * @throws {Error} If symbol is not provided.
 */
export async function etfFundInfo(symbol: string): Promise<FMPTypes.EtfFundInfo[]> {
	if (!symbol) {
		throw new Error('Symbol parameter is required for getEtfFundInfo')
	}
	const searchParams = { symbol }
	return fmpApi.get('etf/info', { searchParams }).json<FMPTypes.EtfFundInfo[]>()
}

/**
 * Retrieves the country allocation/weightings for an ETF or mutual fund.
 * @param symbol The symbol of the ETF or fund (e.g., "SPY").
 * @returns A promise that resolves to an array of country weightings.
 * @throws {Error} If symbol is not provided.
 */
export async function etfFundCountryAllocation(
	symbol: string,
): Promise<FMPTypes.EtfCountryWeighting[]> {
	if (!symbol) {
		throw new Error('Symbol parameter is required for getEtfFundCountryAllocation')
	}
	const searchParams = { symbol }
	return fmpApi
		.get('etf/country-weightings', { searchParams })
		.json<FMPTypes.EtfCountryWeighting[]>()
}

/**
 * Retrieves which ETFs hold a specific stock asset.
 * @param symbol The stock symbol of the asset (e.g., "AAPL").
 * @returns A promise that resolves to an array of ETFs holding the asset.
 * @throws {Error} If symbol is not provided.
 */
export async function etfAssetExposure(symbol: string): Promise<FMPTypes.EtfAssetExposureItem[]> {
	if (!symbol) {
		throw new Error('Symbol parameter is required for getEtfAssetExposure')
	}
	const searchParams = { symbol }
	return fmpApi.get('etf/asset-exposure', { searchParams }).json<FMPTypes.EtfAssetExposureItem[]>()
}

/**
 * Retrieves the sector weightings for an ETF.
 * @param symbol The symbol of the ETF (e.g., "SPY").
 * @returns A promise that resolves to an array of sector weightings.
 * @throws {Error} If symbol is not provided.
 */
export async function etfSectorWeighting(symbol: string): Promise<FMPTypes.EtfSectorWeighting[]> {
	if (!symbol) {
		throw new Error('Symbol parameter is required for getEtfSectorWeighting')
	}
	const searchParams = { symbol }
	return fmpApi.get('etf/sector-weightings', { searchParams }).json<FMPTypes.EtfSectorWeighting[]>()
}

/**
 * Retrieves the latest disclosures from mutual funds and ETFs for a specific holding.
 * @param symbol The stock symbol of the holding (e.g., "AAPL").
 * @returns A promise that resolves to an array of fund disclosure holders.
 * @throws {Error} If symbol is not provided.
 */
export async function mutualFundEtfLatestDisclosures(
	symbol: string,
): Promise<FMPTypes.FundDisclosureHolder[]> {
	if (!symbol) {
		throw new Error('Symbol parameter is required for getMutualFundEtfLatestDisclosures')
	}
	const searchParams = { symbol }
	return fmpApi
		.get('funds/disclosure-holders-latest', { searchParams })
		.json<FMPTypes.FundDisclosureHolder[]>()
}

/**
 * Options for retrieving mutual fund disclosures.
 */
export interface MutualFundDisclosuresOptions {
	/** The year of the disclosure. E.g., "2023". */
	year: string | number
	/** The quarter of the disclosure. E.g., "4". */
	quarter: string | number
	/** The CIK of the fund. E.g., "0000857489". */
	cik?: string | null
}
/**
 * Retrieves comprehensive disclosure data for a mutual fund.
 * @param symbol The symbol of the mutual fund (e.g., "VWO").
 * @param options Options specifying year, quarter, and optionally CIK.
 * @returns A promise that resolves to an array of mutual fund disclosure items.
 * @throws {Error} If symbol, year, or quarter is not provided.
 */
export async function mutualFundDisclosures(
	symbol: string,
	options: MutualFundDisclosuresOptions,
): Promise<FMPTypes.MutualFundDisclosureItem[]> {
	if (!symbol) {
		throw new Error('Symbol parameter is required for getMutualFundDisclosures')
	}
	if (!options.year) {
		throw new Error('Year option is required for getMutualFundDisclosures')
	}
	if (!options.quarter) {
		throw new Error('Quarter option is required for getMutualFundDisclosures')
	}
	const searchParams = cleanQuery({ symbol, ...options })
	return fmpApi
		.get('funds/disclosure', { searchParams })
		.json<FMPTypes.MutualFundDisclosureItem[]>()
}

/**
 * Searches for mutual fund and ETF disclosures by name.
 * @param name The name of the fund or ETF. E.g., "Federated Hermes Government Income Securities, Inc.".
 * @returns A promise that resolves to an array of fund disclosure name search results.
 * @throws {Error} If name is not provided.
 */
export async function searchMutualFundEtfDisclosuresByName(
	name: string,
): Promise<FMPTypes.FundDisclosureNameSearchResult[]> {
	if (!name) {
		throw new Error('Name parameter is required for searchMutualFundEtfDisclosuresByName')
	}
	const searchParams = { name }
	return fmpApi
		.get('funds/disclosure-holders-search', { searchParams })
		.json<FMPTypes.FundDisclosureNameSearchResult[]>()
}

/**
 * Options for retrieving fund and ETF disclosures by date.
 */
export interface FundEtfDisclosuresByDateOptions {
	/** The CIK of the fund or ETF. E.g., "0000036405". */
	cik?: string | null
}
/**
 * Retrieves disclosure dates for mutual funds and ETFs.
 * @param symbol The symbol of the fund or ETF (e.g., "VWO").
 * @param [options] Optional CIK.
 * @returns A promise that resolves to an array of fund disclosure dates.
 * @throws {Error} If symbol is not provided.
 */
export async function fundEtfDisclosuresByDate(
	symbol: string,
	options: FundEtfDisclosuresByDateOptions = {},
): Promise<FMPTypes.FundDisclosureDate[]> {
	if (!symbol) {
		throw new Error('Symbol parameter is required for getFundEtfDisclosuresByDate')
	}
	const searchParams = cleanQuery({ symbol, ...options })
	return fmpApi
		.get('funds/disclosure-dates', { searchParams })
		.json<FMPTypes.FundDisclosureDate[]>()
}

/**
 * ========================================================================
 *           COMMODITY
 * ========================================================================
 */

/**
 * Retrieves a list of tracked commodities.
 * @returns A promise that resolves to an array of commodity list items.
 */
export async function commoditiesList(): Promise<FMPTypes.CommodityListItem[]> {
	return fmpApi.get('commodities-list').json<FMPTypes.CommodityListItem[]>()
}

/**
 * Retrieves a real-time price quote for a commodity.
 * @param symbol The commodity symbol (e.g., "GCUSD").
 * @returns A promise that resolves to an array containing the commodity quote.
 * @throws {Error} If symbol is not provided.
 */
export async function commodityQuote(symbol: string): Promise<FMPTypes.CommodityQuote[]> {
	if (!symbol) {
		throw new Error('Symbol parameter is required for getCommodityQuote')
	}
	const searchParams = { symbol } // The endpoint is /quote, same as stock quote
	return fmpApi.get('quote', { searchParams }).json<FMPTypes.CommodityQuote[]>()
}

/**
 * Retrieves a short real-time price quote for a commodity.
 * @param symbol The commodity symbol (e.g., "GCUSD").
 * @returns A promise that resolves to an array containing the short commodity quote.
 * @throws {Error} If symbol is not provided.
 */
export async function commodityQuoteShort(symbol: string): Promise<FMPTypes.CommodityQuoteShort[]> {
	if (!symbol) {
		throw new Error('Symbol parameter is required for getCommodityQuoteShort')
	}
	const searchParams = { symbol } // The endpoint is /quote-short, same as stock quote short
	return fmpApi.get('quote-short', { searchParams }).json<FMPTypes.CommodityQuoteShort[]>()
}

/**
 * Options for retrieving all commodities quotes.
 */
export interface AllCommoditiesQuotesOptions {
	/** If true, returns short quotes. E.g., true. */
	short?: boolean | null
}
/**
 * Retrieves real-time quotes for multiple commodities.
 * @param [options] Optional parameters.
 * @returns A promise that resolves to an array of commodity quotes (short or full based on options).
 */
export async function allCommoditiesQuotes(
	options: AllCommoditiesQuotesOptions = {},
): Promise<(FMPTypes.CommodityQuoteShort | FMPTypes.CommodityQuote)[]> {
	const searchParams = cleanQuery(options)
	if (options.short) {
		return fmpApi
			.get('batch-commodity-quotes', { searchParams })
			.json<FMPTypes.CommodityQuoteShort[]>()
	}
	return fmpApi.get('batch-commodity-quotes', { searchParams }).json<FMPTypes.CommodityQuote[]>()
}

/**
 * Retrieves light historical end-of-day price data for a commodity.
 * @param symbol The commodity symbol (e.g., "GCUSD").
 * @param [options] Optional date range.
 * @returns A promise that resolves to an array of light commodity chart items.
 * @throws {Error} If symbol is not provided.
 */
export async function commodityChartLight(
	symbol: string,
	options: HistoricalEodChartOptions = {},
): Promise<FMPTypes.StockChartLightItem[]> {
	if (!symbol) {
		throw new Error('Symbol parameter is required for getCommodityChartLight')
	}
	const searchParams = cleanQuery({ symbol, ...options })
	return fmpApi
		.get('historical-price-eod/light', { searchParams })
		.json<FMPTypes.StockChartLightItem[]>()
}

/**
 * Retrieves full historical end-of-day price data for a commodity.
 * @param symbol The commodity symbol (e.g., "GCUSD").
 * @param [options] Optional date range.
 * @returns A promise that resolves to an array of full commodity chart items.
 * @throws {Error} If symbol is not provided.
 */
export async function commodityChartFull(
	symbol: string,
	options: HistoricalEodChartOptions = {},
): Promise<FMPTypes.StockChartFullItem[]> {
	if (!symbol) {
		throw new Error('Symbol parameter is required for getCommodityChartFull')
	}
	const searchParams = cleanQuery({ symbol, ...options })
	return fmpApi
		.get('historical-price-eod/full', { searchParams })
		.json<FMPTypes.StockChartFullItem[]>()
}

/**
 * Retrieves 1-minute interval historical commodity chart data.
 * @param symbol The commodity symbol (e.g., "GCUSD").
 * @param [options] Optional date range.
 * @returns A promise that resolves to an array of 1-minute commodity chart items.
 */
export async function commodityChart1Min(
	symbol: string,
	options: HistoricalIntradayChartOptions = {},
): Promise<FMPTypes.BaseChartItem[]> {
	if (!symbol) {
		throw new Error('Symbol parameter is required for getCommodityChart1Min')
	}
	const searchParams = cleanQuery({ symbol, ...options })
	return fmpApi.get(`historical-chart/1min`, { searchParams }).json<FMPTypes.BaseChartItem[]>()
}

/**
 * Retrieves 5-minute interval historical commodity chart data.
 * @param symbol The commodity symbol (e.g., "GCUSD").
 * @param [options] Optional date range.
 * @returns A promise that resolves to an array of 5-minute commodity chart items.
 */
export async function commodityChart5Min(
	symbol: string,
	options: HistoricalIntradayChartOptions = {},
): Promise<FMPTypes.BaseChartItem[]> {
	if (!symbol) {
		throw new Error('Symbol parameter is required for getCommodityChart5Min')
	}
	const searchParams = cleanQuery({ symbol, ...options })
	return fmpApi.get(`historical-chart/5min`, { searchParams }).json<FMPTypes.BaseChartItem[]>()
}

/**
 * Retrieves 1-hour interval historical commodity chart data.
 * @param symbol The commodity symbol (e.g., "GCUSD").
 * @param [options] Optional date range.
 * @returns A promise that resolves to an array of 1-hour commodity chart items.
 */
export async function commodityChart1Hour(
	symbol: string,
	options: HistoricalIntradayChartOptions = {},
): Promise<FMPTypes.BaseChartItem[]> {
	if (!symbol) {
		throw new Error('Symbol parameter is required for getCommodityChart1Hour')
	}
	const searchParams = cleanQuery({ symbol, ...options })
	return fmpApi.get(`historical-chart/1hour`, { searchParams }).json<FMPTypes.BaseChartItem[]>()
}

/**
 * ========================================================================
 *           FUNDRAISERS
 * ========================================================================
 */

/**
 * Options for retrieving latest crowdfunding campaigns.
 */
export interface LatestCrowdfundingCampaignsOptions extends OptionalPaginationOptions {}
/**
 * Retrieves the latest crowdfunding campaigns.
 * @param [options] Optional parameters for pagination.
 * @returns A promise that resolves to an array of crowdfunding campaigns.
 */
export async function latestCrowdfundingCampaigns(
	options: LatestCrowdfundingCampaignsOptions = {},
): Promise<FMPTypes.CrowdfundingCampaign[]> {
	const searchParams = cleanQuery(options)
	return fmpApi
		.get('crowdfunding-offerings-latest', { searchParams })
		.json<FMPTypes.CrowdfundingCampaign[]>()
}

/**
 * Searches for crowdfunding campaigns by name.
 * @param name The name to search for (e.g., "enotap").
 * @returns A promise that resolves to an array of crowdfunding campaign search results.
 * @throws {Error} If name is not provided.
 */
export async function searchCrowdfundingCampaigns(
	name: string,
): Promise<FMPTypes.CrowdfundingCampaignSearchResult[]> {
	if (!name) {
		throw new Error('Name parameter is required for searchCrowdfundingCampaigns')
	}
	const searchParams = { name }
	return fmpApi
		.get('crowdfunding-offerings-search', { searchParams })
		.json<FMPTypes.CrowdfundingCampaignSearchResult[]>()
}

/**
 * Retrieves crowdfunding campaigns by CIK.
 * @param cik The CIK of the issuer (e.g., "0001916078").
 * @returns A promise that resolves to an array of crowdfunding campaigns.
 * @throws {Error} If CIK is not provided.
 */
export async function crowdfundingCampaignsByCik(
	cik: string,
): Promise<FMPTypes.CrowdfundingCampaign[]> {
	if (!cik) {
		throw new Error('CIK parameter is required for getCrowdfundingCampaignsByCik')
	}
	const searchParams = { cik }
	return fmpApi
		.get('crowdfunding-offerings', { searchParams })
		.json<FMPTypes.CrowdfundingCampaign[]>()
}

/**
 * Options for retrieving latest equity offering updates.
 */
export interface LatestEquityOfferingUpdatesOptions extends OptionalPaginationOptions {
	/** Filter by CIK. E.g., "0002013736". */
	cik?: string | null
}
/**
 * Retrieves the latest equity offering updates.
 * @param [options] Optional parameters for pagination and CIK filter.
 * @returns A promise that resolves to an array of equity offering updates.
 */
export async function latestEquityOfferingUpdates(
	options: LatestEquityOfferingUpdatesOptions = {},
): Promise<FMPTypes.EquityOfferingUpdate[]> {
	const searchParams = cleanQuery(options)
	return fmpApi.get('fundraising-latest', { searchParams }).json<FMPTypes.EquityOfferingUpdate[]>()
}

/**
 * Searches for equity offerings by name.
 * @param name The name to search for (e.g., "NJOY").
 * @returns A promise that resolves to an array of equity offering search results.
 * @throws {Error} If name is not provided.
 */
export async function searchEquityOfferings(
	name: string,
): Promise<FMPTypes.EquityOfferingSearchResult[]> {
	if (!name) {
		throw new Error('Name parameter is required for searchEquityOfferings')
	}
	const searchParams = { name }
	return fmpApi
		.get('fundraising-search', { searchParams })
		.json<FMPTypes.EquityOfferingSearchResult[]>()
}

/**
 * Retrieves equity offerings by CIK.
 * @param cik The CIK of the issuer (e.g., "0001547416").
 * @returns A promise that resolves to an array of equity offering updates.
 * @throws {Error} If CIK is not provided.
 */
export async function equityOfferingsByCik(cik: string): Promise<FMPTypes.EquityOfferingUpdate[]> {
	if (!cik) {
		throw new Error('CIK parameter is required for getEquityOfferingsByCik')
	}
	const searchParams = { cik }
	return fmpApi.get('fundraising', { searchParams }).json<FMPTypes.EquityOfferingUpdate[]>()
}

/**
 * ========================================================================
 *           CRYPTO
 * ========================================================================
 */

/**
 * Retrieves a list of all cryptocurrencies.
 * @returns A promise that resolves to an array of cryptocurrency list items.
 */
export async function cryptocurrencyList(): Promise<FMPTypes.CryptocurrencyListItem[]> {
	return fmpApi.get('cryptocurrency-list').json<FMPTypes.CryptocurrencyListItem[]>()
}

/**
 * Retrieves a full real-time quote for a cryptocurrency.
 * @param symbol The cryptocurrency symbol (e.g., "BTCUSD").
 * @returns A promise that resolves to an array containing the cryptocurrency quote.
 * @throws {Error} If symbol is not provided.
 */
export async function cryptocurrencyQuote(symbol: string): Promise<FMPTypes.CryptocurrencyQuote[]> {
	if (!symbol) {
		throw new Error('Symbol parameter is required for getCryptocurrencyQuote')
	}
	const searchParams = { symbol } // Endpoint is /quote
	return fmpApi.get('quote', { searchParams }).json<FMPTypes.CryptocurrencyQuote[]>()
}

/**
 * Retrieves a short real-time quote for a cryptocurrency.
 * @param symbol The cryptocurrency symbol (e.g., "BTCUSD").
 * @returns A promise that resolves to an array containing the short cryptocurrency quote.
 * @throws {Error} If symbol is not provided.
 */
export async function cryptocurrencyQuoteShort(
	symbol: string,
): Promise<FMPTypes.CryptocurrencyQuoteShort[]> {
	if (!symbol) {
		throw new Error('Symbol parameter is required for getCryptocurrencyQuoteShort')
	}
	const searchParams = { symbol } // Endpoint is /quote-short
	return fmpApi.get('quote-short', { searchParams }).json<FMPTypes.CryptocurrencyQuoteShort[]>()
}

/**
 * Options for retrieving all cryptocurrency quotes.
 */
export interface AllCryptocurrenciesQuotesOptions {
	/** If true, returns short quotes. E.g., true. */
	short?: boolean | null
}
/**
 * Retrieves real-time quotes for multiple cryptocurrencies.
 * @param [options] Optional parameters.
 * @returns A promise that resolves to an array of cryptocurrency quotes (short or full based on options).
 */
export async function allCryptocurrenciesQuotes(
	options: AllCryptocurrenciesQuotesOptions = {},
): Promise<(FMPTypes.CryptocurrencyQuoteShort | FMPTypes.CryptocurrencyQuote)[]> {
	const searchParams = cleanQuery(options)
	if (options.short) {
		return fmpApi
			.get('batch-crypto-quotes', { searchParams })
			.json<FMPTypes.CryptocurrencyQuoteShort[]>()
	}
	return fmpApi.get('batch-crypto-quotes', { searchParams }).json<FMPTypes.CryptocurrencyQuote[]>()
}

/**
 * Retrieves light historical end-of-day price data for a cryptocurrency.
 * @param symbol The cryptocurrency symbol (e.g., "BTCUSD").
 * @param [options] Optional date range.
 * @returns A promise that resolves to an array of light crypto chart items.
 * @throws {Error} If symbol is not provided.
 */
export async function cryptocurrencyChartLight(
	symbol: string,
	options: HistoricalEodChartOptions = {},
): Promise<FMPTypes.StockChartLightItem[]> {
	if (!symbol) {
		throw new Error('Symbol parameter is required for getCryptocurrencyChartLight')
	}
	const searchParams = cleanQuery({ symbol, ...options })
	return fmpApi
		.get('historical-price-eod/light', { searchParams })
		.json<FMPTypes.StockChartLightItem[]>()
}

/**
 * Retrieves full historical end-of-day price data for a cryptocurrency.
 * @param symbol The cryptocurrency symbol (e.g., "BTCUSD").
 * @param [options] Optional date range.
 * @returns A promise that resolves to an array of full crypto chart items.
 * @throws {Error} If symbol is not provided.
 */
export async function cryptocurrencyChartFull(
	symbol: string,
	options: HistoricalEodChartOptions = {},
): Promise<FMPTypes.StockChartFullItem[]> {
	if (!symbol) {
		throw new Error('Symbol parameter is required for getCryptocurrencyChartFull')
	}
	const searchParams = cleanQuery({ symbol, ...options })
	return fmpApi
		.get('historical-price-eod/full', { searchParams })
		.json<FMPTypes.StockChartFullItem[]>()
}

/**
 * Retrieves 1-minute interval historical cryptocurrency chart data.
 * @param symbol The cryptocurrency symbol (e.g., "BTCUSD").
 * @param [options] Optional date range. Note: `nonadjusted` is not in crypto chart docs.
 * @returns A promise that resolves to an array of 1-minute crypto chart items.
 */
export async function cryptocurrencyChart1Min(
	symbol: string,
	options: Omit<HistoricalIntradayChartOptions, 'nonadjusted'> = {},
): Promise<FMPTypes.BaseChartItem[]> {
	if (!symbol) {
		throw new Error('Symbol parameter is required for getCryptocurrencyChart1Min')
	}
	const searchParams = cleanQuery({ symbol, ...options })
	return fmpApi.get(`historical-chart/1min`, { searchParams }).json<FMPTypes.BaseChartItem[]>()
}

/**
 * Retrieves 5-minute interval historical cryptocurrency chart data.
 * @param symbol The cryptocurrency symbol (e.g., "BTCUSD").
 * @param [options] Optional date range. Note: `nonadjusted` is not in crypto chart docs.
 * @returns A promise that resolves to an array of 5-minute crypto chart items.
 */
export async function cryptocurrencyChart5Min(
	symbol: string,
	options: Omit<HistoricalIntradayChartOptions, 'nonadjusted'> = {},
): Promise<FMPTypes.BaseChartItem[]> {
	if (!symbol) {
		throw new Error('Symbol parameter is required for getCryptocurrencyChart5Min')
	}
	const searchParams = cleanQuery({ symbol, ...options })
	return fmpApi.get(`historical-chart/5min`, { searchParams }).json<FMPTypes.BaseChartItem[]>()
}

/**
 * Retrieves 1-hour interval historical cryptocurrency chart data.
 * @param symbol The cryptocurrency symbol (e.g., "BTCUSD").
 * @param [options] Optional date range. Note: `nonadjusted` is not in crypto chart docs.
 * @returns A promise that resolves to an array of 1-hour crypto chart items.
 */
export async function cryptocurrencyChart1Hour(
	symbol: string,
	options: Omit<HistoricalIntradayChartOptions, 'nonadjusted'> = {},
): Promise<FMPTypes.BaseChartItem[]> {
	if (!symbol) {
		throw new Error('Symbol parameter is required for getCryptocurrencyChart1Hour')
	}
	const searchParams = cleanQuery({ symbol, ...options })
	return fmpApi.get(`historical-chart/1hour`, { searchParams }).json<FMPTypes.BaseChartItem[]>()
}

/**
 * ========================================================================
 *           FOREX
 * ========================================================================
 */

/**
 * Retrieves a list of all Forex currency pairs.
 * @returns A promise that resolves to an array of Forex pairs.
 */
export async function forexList(): Promise<FMPTypes.ForexPair[]> {
	return fmpApi.get('forex-list').json<FMPTypes.ForexPair[]>()
}

/**
 * Retrieves a real-time quote for a Forex currency pair.
 * @param symbol The Forex pair symbol (e.g., "EURUSD").
 * @returns A promise that resolves to an array containing the Forex quote.
 * @throws {Error} If symbol is not provided.
 */
export async function forexQuote(symbol: string): Promise<FMPTypes.ForexQuote[]> {
	if (!symbol) {
		throw new Error('Symbol parameter is required for getForexQuote')
	}
	const searchParams = { symbol } // Endpoint is /quote
	return fmpApi.get('quote', { searchParams }).json<FMPTypes.ForexQuote[]>()
}

/**
 * Retrieves a short real-time quote for a Forex currency pair.
 * @param symbol The Forex pair symbol (e.g., "EURUSD").
 * @returns A promise that resolves to an array containing the short Forex quote.
 * @throws {Error} If symbol is not provided.
 */
export async function forexQuoteShort(symbol: string): Promise<FMPTypes.ForexQuoteShort[]> {
	if (!symbol) {
		throw new Error('Symbol parameter is required for getForexQuoteShort')
	}
	const searchParams = { symbol } // Endpoint is /quote-short
	return fmpApi.get('quote-short', { searchParams }).json<FMPTypes.ForexQuoteShort[]>()
}

/**
 * Options for retrieving all Forex quotes.
 */
export interface AllForexQuotesOptions {
	/** If true, returns short quotes. E.g., true. */
	short?: boolean | null
}
/**
 * Retrieves real-time quotes for multiple Forex pairs.
 * @param [options] Optional parameters.
 * @returns A promise that resolves to an array of Forex quotes (short or full based on options).
 */
export async function allForexQuotes(
	options: AllForexQuotesOptions = {},
): Promise<(FMPTypes.ForexQuoteShort | FMPTypes.ForexQuote)[]> {
	const searchParams = cleanQuery(options)
	if (options.short) {
		return fmpApi.get('batch-forex-quotes', { searchParams }).json<FMPTypes.ForexQuoteShort[]>()
	}
	return fmpApi.get('batch-forex-quotes', { searchParams }).json<FMPTypes.ForexQuote[]>()
}

/**
 * Retrieves light historical end-of-day price data for a Forex pair.
 * @param symbol The Forex pair symbol (e.g., "EURUSD").
 * @param [options] Optional date range.
 * @returns A promise that resolves to an array of light Forex chart items.
 * @throws {Error} If symbol is not provided.
 */
export async function forexChartLight(
	symbol: string,
	options: HistoricalEodChartOptions = {},
): Promise<FMPTypes.StockChartLightItem[]> {
	if (!symbol) {
		throw new Error('Symbol parameter is required for getForexChartLight')
	}
	const searchParams = cleanQuery({ symbol, ...options })
	return fmpApi
		.get('historical-price-eod/light', { searchParams })
		.json<FMPTypes.StockChartLightItem[]>()
}

/**
 * Retrieves full historical end-of-day price data for a Forex pair.
 * @param symbol The Forex pair symbol (e.g., "EURUSD").
 * @param [options] Optional date range.
 * @returns A promise that resolves to an array of full Forex chart items.
 * @throws {Error} If symbol is not provided.
 */
export async function forexChartFull(
	symbol: string,
	options: HistoricalEodChartOptions = {},
): Promise<FMPTypes.StockChartFullItem[]> {
	if (!symbol) {
		throw new Error('Symbol parameter is required for getForexChartFull')
	}
	const searchParams = cleanQuery({ symbol, ...options })
	return fmpApi
		.get('historical-price-eod/full', { searchParams })
		.json<FMPTypes.StockChartFullItem[]>()
}

/**
 * Retrieves 1-minute interval historical Forex chart data.
 * @param symbol The Forex pair symbol (e.g., "EURUSD").
 * @param [options] Optional date range. Note: `nonadjusted` is not in Forex chart docs.
 * @returns A promise that resolves to an array of 1-minute Forex chart items.
 */
export async function forexChart1Min(
	symbol: string,
	options: Omit<HistoricalIntradayChartOptions, 'nonadjusted'> = {},
): Promise<FMPTypes.BaseChartItem[]> {
	if (!symbol) {
		throw new Error('Symbol parameter is required for getForexChart1Min')
	}
	const searchParams = cleanQuery({ symbol, ...options })
	return fmpApi.get(`historical-chart/1min`, { searchParams }).json<FMPTypes.BaseChartItem[]>()
}

/**
 * Retrieves 5-minute interval historical Forex chart data.
 * @param symbol The Forex pair symbol (e.g., "EURUSD").
 * @param [options] Optional date range. Note: `nonadjusted` is not in Forex chart docs.
 * @returns A promise that resolves to an array of 5-minute Forex chart items.
 */
export async function forexChart5Min(
	symbol: string,
	options: Omit<HistoricalIntradayChartOptions, 'nonadjusted'> = {},
): Promise<FMPTypes.BaseChartItem[]> {
	if (!symbol) {
		throw new Error('Symbol parameter is required for getForexChart5Min')
	}
	const searchParams = cleanQuery({ symbol, ...options })
	return fmpApi.get(`historical-chart/5min`, { searchParams }).json<FMPTypes.BaseChartItem[]>()
}

/**
 * Retrieves 1-hour interval historical Forex chart data.
 * @param symbol The Forex pair symbol (e.g., "EURUSD").
 * @param [options] Optional date range. Note: `nonadjusted` is not in Forex chart docs.
 * @returns A promise that resolves to an array of 1-hour Forex chart items.
 */
export async function forexChart1Hour(
	symbol: string,
	options: Omit<HistoricalIntradayChartOptions, 'nonadjusted'> = {},
): Promise<FMPTypes.BaseChartItem[]> {
	if (!symbol) {
		throw new Error('Symbol parameter is required for getForexChart1Hour')
	}
	const searchParams = cleanQuery({ symbol, ...options })
	return fmpApi.get(`historical-chart/1hour`, { searchParams }).json<FMPTypes.BaseChartItem[]>()
}

/**
 * ========================================================================
 *           STATEMENTS
 * ========================================================================
 */

/**
 * Options for retrieving financial statements.
 */
export interface FinancialStatementOptions extends OptionalLimitOption {
	/** The financial period ('quarter', 'annual', 'Q1', 'Q2', 'Q3', 'Q4', 'FY'). */
	period?: FMPTypes.FinancialPeriod | FMPTypes.StatementPeriodOption | null
}

/**
 * A generic helper to fetch financial statement data. It handles the logic for
 * 'annual' and 'quarter' period options, making multiple requests if needed.
 * @param endpoint The API endpoint path (e.g., 'income-statement').
 * @param symbol The stock symbol.
 * @param options The financial statement options.
 * @returns A promise that resolves to an array of the requested statement type.
 * @private
 */
async function getFinancialStatement<T extends { date: string }>(
	endpoint: string,
	symbol: string,
	options: FinancialStatementOptions = {},
): Promise<T[]> {
	if (!symbol) {
		throw new Error(`Symbol parameter is required for the API call to ${endpoint}`)
	}
	const { period, limit, ...restOptions } = options
	if (period === 'quarter') {
		const quarters: FMPTypes.FinancialPeriod[] = ['Q1', 'Q2', 'Q3', 'Q4']
		const promises = quarters.map((q) => {
			const searchParams = cleanQuery({ symbol, ...restOptions, period: q })
			return fmpApi.get(endpoint, { searchParams }).json<T[]>()
		})
		const quarterlyResults = await Promise.all(promises)
		const allResults = quarterlyResults.flat()
		allResults.sort((a, b) => b.date.localeCompare(a.date))
		return limit ? allResults.slice(0, limit) : allResults
	}
	if (period === 'annual') {
		const searchParams = cleanQuery({ symbol, ...restOptions, limit, period: 'FY' })
		return fmpApi.get(endpoint, { searchParams }).json<T[]>()
	}
	const searchParams = cleanQuery({ symbol, ...options })
	return fmpApi.get(endpoint, { searchParams }).json<T[]>()
}

/**
 * Retrieves income statements for a company.
 * @param symbol The stock symbol (e.g., "AAPL").
 * @param [options] Optional parameters for limit and period.
 * @returns A promise that resolves to an array of income statements.
 * @throws {Error} If symbol is not provided.
 */
export async function incomeStatement(
	symbol: string,
	options: FinancialStatementOptions = {},
): Promise<FMPTypes.IncomeStatement[]> {
	return getFinancialStatement<FMPTypes.IncomeStatement>('income-statement', symbol, options)
}

/**
 * Retrieves balance sheet statements for a company.
 * @param symbol The stock symbol (e.g., "AAPL").
 * @param [options] Optional parameters for limit and period.
 * @returns A promise that resolves to an array of balance sheet statements.
 * @throws {Error} If symbol is not provided.
 */
export async function balanceSheetStatement(
	symbol: string,
	options: FinancialStatementOptions = {},
): Promise<FMPTypes.BalanceSheetStatement[]> {
	return getFinancialStatement<FMPTypes.BalanceSheetStatement>(
		'balance-sheet-statement',
		symbol,
		options,
	)
}

/**
 * Retrieves cash flow statements for a company.
 * @param symbol The stock symbol (e.g., "AAPL").
 * @param [options] Optional parameters for limit and period.
 * @returns A promise that resolves to an array of cash flow statements.
 * @throws {Error} If symbol is not provided.
 */
export async function cashFlowStatement(
	symbol: string,
	options: FinancialStatementOptions = {},
): Promise<FMPTypes.CashFlowStatement[]> {
	return getFinancialStatement<FMPTypes.CashFlowStatement>('cash-flow-statement', symbol, options)
}

/**
 * Options for retrieving latest financial statements metadata.
 */
export interface LatestFinancialStatementsOptions extends OptionalPaginationOptions {}
/**
 * Retrieves metadata for the latest available financial statements.
 * @param [options] Optional parameters for pagination.
 * @returns A promise that resolves to an array of latest financial statement metadata.
 */
export async function latestFinancialStatements(
	options: LatestFinancialStatementsOptions = {},
): Promise<FMPTypes.LatestFinancialStatementMeta[]> {
	const searchParams = cleanQuery(options)
	return fmpApi
		.get('latest-financial-statements', { searchParams })
		.json<FMPTypes.LatestFinancialStatementMeta[]>()
}

/**
 * Options for retrieving TTM financial statements.
 */
export interface TtmFinancialStatementOptions extends OptionalLimitOption {}
/**
 * Retrieves Trailing Twelve Months (TTM) income statements for a company.
 * @param symbol The stock symbol (e.g., "AAPL").
 * @param [options] Optional parameters for limit.
 * @returns A promise that resolves to an array of TTM income statements.
 * @throws {Error} If symbol is not provided.
 */
export async function incomeStatementTtm(
	symbol: string,
	options: TtmFinancialStatementOptions = {},
): Promise<FMPTypes.IncomeStatement[]> {
	if (!symbol) {
		throw new Error('Symbol parameter is required for getIncomeStatementTtm')
	}
	const searchParams = cleanQuery({ symbol, ...options })
	return fmpApi.get('income-statement-ttm', { searchParams }).json<FMPTypes.IncomeStatement[]>()
}

/**
 * Retrieves Trailing Twelve Months (TTM) balance sheet statements for a company.
 * @param symbol The stock symbol (e.g., "AAPL").
 * @param [options] Optional parameters for limit.
 * @returns A promise that resolves to an array of TTM balance sheet statements.
 * @throws {Error} If symbol is not provided.
 */
export async function balanceSheetStatementTtm(
	symbol: string,
	options: TtmFinancialStatementOptions = {},
): Promise<FMPTypes.BalanceSheetStatement[]> {
	if (!symbol) {
		throw new Error('Symbol parameter is required for getBalanceSheetStatementTtm')
	}
	const searchParams = cleanQuery({ symbol, ...options })
	return fmpApi
		.get('balance-sheet-statement-ttm', { searchParams })
		.json<FMPTypes.BalanceSheetStatement[]>()
}

/**
 * Retrieves Trailing Twelve Months (TTM) cash flow statements for a company.
 * @param symbol The stock symbol (e.g., "AAPL").
 * @param [options] Optional parameters for limit.
 * @returns A promise that resolves to an array of TTM cash flow statements.
 * @throws {Error} If symbol is not provided.
 */
export async function cashFlowStatementTtm(
	symbol: string,
	options: TtmFinancialStatementOptions = {},
): Promise<FMPTypes.CashFlowStatement[]> {
	if (!symbol) {
		throw new Error('Symbol parameter is required for getCashFlowStatementTtm')
	}
	const searchParams = cleanQuery({ symbol, ...options })
	return fmpApi
		.get('cash-flow-statement-ttm', { searchParams })
		.json<FMPTypes.CashFlowStatement[]>()
}

/**
 * Retrieves key financial metrics for a company.
 * @param symbol The stock symbol (e.g., "AAPL").
 * @param [options] Optional parameters for limit and period (same as FinancialStatementOptions).
 * @returns A promise that resolves to an array of key metrics.
 * @throws {Error} If symbol is not provided.
 */
export async function keyMetrics(
	symbol: string,
	options: FinancialStatementOptions = {},
): Promise<FMPTypes.KeyMetrics[]> {
	return getFinancialStatement<FMPTypes.KeyMetrics>('key-metrics', symbol, options)
}

/**
 * Retrieves financial ratios for a company.
 * @param symbol The stock symbol (e.g., "AAPL").
 * @param [options] Optional parameters for limit and period (same as FinancialStatementOptions).
 * @returns A promise that resolves to an array of financial ratios.
 * @throws {Error} If symbol is not provided.
 */
export async function financialRatios(
	symbol: string,
	options: FinancialStatementOptions = {},
): Promise<FMPTypes.FinancialRatios[]> {
	return getFinancialStatement<FMPTypes.FinancialRatios>('ratios', symbol, options)
}

/**
 * Retrieves Trailing Twelve Months (TTM) key financial metrics for a company.
 * @param symbol The stock symbol (e.g., "AAPL").
 * @returns A promise that resolves to an array of TTM key metrics.
 * @throws {Error} If symbol is not provided.
 */
export async function keyMetricsTtm(symbol: string): Promise<FMPTypes.KeyMetricsTTM[]> {
	if (!symbol) {
		throw new Error('Symbol parameter is required for getKeyMetricsTtm')
	}
	const searchParams = { symbol }
	return fmpApi.get('key-metrics-ttm', { searchParams }).json<FMPTypes.KeyMetricsTTM[]>()
}

/**
 * Retrieves Trailing Twelve Months (TTM) financial ratios for a company.
 * @param symbol The stock symbol (e.g., "AAPL").
 * @returns A promise that resolves to an array of TTM financial ratios.
 * @throws {Error} If symbol is not provided.
 */
export async function financialRatiosTtm(symbol: string): Promise<FMPTypes.FinancialRatiosTTM[]> {
	if (!symbol) {
		throw new Error('Symbol parameter is required for getFinancialRatiosTtm')
	}
	const searchParams = { symbol }
	return fmpApi.get('ratios-ttm', { searchParams }).json<FMPTypes.FinancialRatiosTTM[]>()
}

/**
 * Retrieves financial health scores (Altman Z-Score, Piotroski Score) for a company.
 * @param symbol The stock symbol (e.g., "AAPL").
 * @returns A promise that resolves to an array of financial scores.
 * @throws {Error} If symbol is not provided.
 */
export async function financialScores(symbol: string): Promise<FMPTypes.FinancialScores[]> {
	if (!symbol) {
		throw new Error('Symbol parameter is required for getFinancialScores')
	}
	const searchParams = { symbol }
	return fmpApi.get('financial-scores', { searchParams }).json<FMPTypes.FinancialScores[]>()
}

/**
 * Options for retrieving owner earnings.
 */
export interface OwnerEarningsOptions extends OptionalLimitOption {}
/**
 * Retrieves owner earnings for a company.
 * @param symbol The stock symbol (e.g., "AAPL").
 * @param [options] Optional parameters for limit.
 * @returns A promise that resolves to an array of owner earnings records.
 * @throws {Error} If symbol is not provided.
 */
export async function ownerEarnings(
	symbol: string,
	options: OwnerEarningsOptions = {},
): Promise<FMPTypes.OwnerEarnings[]> {
	if (!symbol) {
		throw new Error('Symbol parameter is required for getOwnerEarnings')
	}
	const searchParams = cleanQuery({ symbol, ...options })
	return fmpApi.get('owner-earnings', { searchParams }).json<FMPTypes.OwnerEarnings[]>()
}

/**
 * Retrieves enterprise values for a company.
 * @param symbol The stock symbol (e.g., "AAPL").
 * @param [options] Optional parameters for limit and period (same as FinancialStatementOptions).
 * @returns A promise that resolves to an array of enterprise values.
 * @throws {Error} If symbol is not provided.
 */
export async function enterpriseValues(
	symbol: string,
	options: FinancialStatementOptions = {},
): Promise<FMPTypes.EnterpriseValue[]> {
	return getFinancialStatement<FMPTypes.EnterpriseValue>('enterprise-values', symbol, options)
}

/**
 * Retrieves income statement growth metrics for a company.
 * @param symbol The stock symbol (e.g., "AAPL").
 * @param [options] Optional parameters for limit and period (same as FinancialStatementOptions).
 * @returns A promise that resolves to an array of income statement growth metrics.
 * @throws {Error} If symbol is not provided.
 */
export async function incomeStatementGrowth(
	symbol: string,
	options: FinancialStatementOptions = {},
): Promise<FMPTypes.IncomeStatementGrowth[]> {
	return getFinancialStatement<FMPTypes.IncomeStatementGrowth>(
		'income-statement-growth',
		symbol,
		options,
	)
}

/**
 * Retrieves balance sheet statement growth metrics for a company.
 * @param symbol The stock symbol (e.g., "AAPL").
 * @param [options] Optional parameters for limit and period (same as FinancialStatementOptions).
 * @returns A promise that resolves to an array of balance sheet statement growth metrics.
 * @throws {Error} If symbol is not provided.
 */
export async function balanceSheetStatementGrowth(
	symbol: string,
	options: FinancialStatementOptions = {},
): Promise<FMPTypes.BalanceSheetStatementGrowth[]> {
	return getFinancialStatement<FMPTypes.BalanceSheetStatementGrowth>(
		'balance-sheet-statement-growth',
		symbol,
		options,
	)
}

/**
 * Retrieves cash flow statement growth metrics for a company.
 * @param symbol The stock symbol (e.g., "AAPL").
 * @param [options] Optional parameters for limit and period (same as FinancialStatementOptions).
 * @returns A promise that resolves to an array of cash flow statement growth metrics.
 * @throws {Error} If symbol is not provided.
 */
export async function cashFlowStatementGrowth(
	symbol: string,
	options: FinancialStatementOptions = {},
): Promise<FMPTypes.CashFlowStatementGrowth[]> {
	return getFinancialStatement<FMPTypes.CashFlowStatementGrowth>(
		'cash-flow-statement-growth',
		symbol,
		options,
	)
}

/**
 * Retrieves overall financial statement growth metrics for a company.
 * @param symbol The stock symbol (e.g., "AAPL").
 * @param [options] Optional parameters for limit and period (same as FinancialStatementOptions).
 * @returns A promise that resolves to an array of financial statement growth metrics.
 * @throws {Error} If symbol is not provided.
 */
export async function financialStatementGrowth(
	symbol: string,
	options: FinancialStatementOptions = {},
): Promise<FMPTypes.FinancialStatementGrowth[]> {
	return getFinancialStatement<FMPTypes.FinancialStatementGrowth>(
		'financial-growth',
		symbol,
		options,
	)
}

/**
 * Retrieves dates and links for available financial reports for a company.
 * @param symbol The stock symbol (e.g., "AAPL").
 * @returns A promise that resolves to an array of financial report date links.
 * @throws {Error} If symbol is not provided.
 */
export async function financialReportsDates(
	symbol: string,
): Promise<FMPTypes.FinancialReportDateLinks[]> {
	if (!symbol) {
		throw new Error('Symbol parameter is required for getFinancialReportsDates')
	}
	const searchParams = { symbol }
	return fmpApi
		.get('financial-reports-dates', { searchParams })
		.json<FMPTypes.FinancialReportDateLinks[]>()
}

/**
 * Options for retrieving financial reports (10-K/10-Q).
 */
export interface FinancialReportOptions {
	/** The year of the report. E.g., 2022. */
	year: number
	/** The financial period ('Q1', 'Q2', 'Q3', 'Q4', 'FY'). */
	period: FMPTypes.FinancialPeriod
}
/**
 * Retrieves a company's annual (10-K) or quarterly (10-Q) report in JSON format.
 * @param symbol The stock symbol (e.g., "AAPL").
 * @param options Options specifying the year and period.
 * @returns A promise that resolves to an array containing the full financial report JSON.
 * @throws {Error} If symbol, year, or period is not provided.
 */
export async function financialReportJson(
	symbol: string,
	options: FinancialReportOptions,
): Promise<FMPTypes.FinancialReportFullJson[]> {
	if (!symbol) {
		throw new Error('Symbol parameter is required for getFinancialReportJson')
	}
	if (!options.year) {
		throw new Error('Year option is required for getFinancialReportJson')
	}
	if (!options.period) {
		throw new Error('Period option is required for getFinancialReportJson')
	}
	const searchParams = cleanQuery({ symbol, ...options })
	return fmpApi
		.get('financial-reports-json', { searchParams })
		.json<FMPTypes.FinancialReportFullJson[]>()
}

/**
 * Retrieves a company's annual (10-K) or quarterly (10-Q) report in XLSX format (returns metadata with link).
 * @param symbol The stock symbol (e.g., "AAPL").
 * @param options Options specifying the year and period.
 * @returns A promise that resolves to an array containing metadata for the XLSX financial report.
 * @throws {Error} If symbol, year, or period is not provided.
 */
export async function financialReportXlsx(
	symbol: string,
	options: FinancialReportOptions,
): Promise<FMPTypes.FinancialReportFullJson[]> {
	if (!symbol) {
		throw new Error('Symbol parameter is required for getFinancialReportXlsx')
	}
	if (!options.year) {
		throw new Error('Year option is required for getFinancialReportXlsx')
	}
	if (!options.period) {
		throw new Error('Period option is required for getFinancialReportXlsx')
	}
	const searchParams = cleanQuery({ symbol, ...options })
	// The example response is JSON, not an XLSX file directly.
	return fmpApi
		.get('financial-reports-xlsx', { searchParams })
		.json<FMPTypes.FinancialReportFullJson[]>()
}

/**
 * Options for retrieving revenue segmentation.
 */
export interface RevenueSegmentationOptions {
	/** The reporting period, 'annual' or 'quarter'. */
	period?: FMPTypes.StatementPeriodOption | null
	/** The structure of the response, e.g., 'flat'. */
	structure?: string | null
}
/**
 * Retrieves revenue breakdown by product line for a company.
 * @param symbol The stock symbol (e.g., "AAPL").
 * @param [options] Optional parameters for period and structure.
 * @returns A promise that resolves to an array of revenue product segmentations.
 * @throws {Error} If symbol is not provided.
 */
export async function revenueProductSegmentation(
	symbol: string,
	options: RevenueSegmentationOptions = {},
): Promise<FMPTypes.RevenueSegmentation[]> {
	if (!symbol) {
		throw new Error('Symbol parameter is required for getRevenueProductSegmentation')
	}
	const searchParams = cleanQuery({ symbol, ...options })
	return fmpApi
		.get('revenue-product-segmentation', { searchParams })
		.json<FMPTypes.RevenueSegmentation[]>()
}

/**
 * Retrieves revenue breakdown by geographic region for a company.
 * @param symbol The stock symbol (e.g., "AAPL").
 * @param [options] Optional parameters for period and structure (same as RevenueSegmentationOptions).
 * @returns A promise that resolves to an array of revenue geographic segmentations.
 * @throws {Error} If symbol is not provided.
 */
export async function revenueGeographicSegmentation(
	symbol: string,
	options: RevenueSegmentationOptions = {},
): Promise<FMPTypes.RevenueSegmentation[]> {
	if (!symbol) {
		throw new Error('Symbol parameter is required for getRevenueGeographicSegmentation')
	}
	const searchParams = cleanQuery({ symbol, ...options })
	return fmpApi
		.get('revenue-geographic-segmentation', { searchParams })
		.json<FMPTypes.RevenueSegmentation[]>()
}

/**
 * Options for retrieving "as reported" financial statements.
 */
export interface AsReportedStatementOptions extends OptionalLimitOption {
	/** The reporting period, 'annual' or 'quarter'. */
	period?: FMPTypes.StatementPeriodOption | null
}
/**
 * Retrieves income statements as reported by the company.
 * @param symbol The stock symbol (e.g., "AAPL").
 * @param [options] Optional parameters for limit and period.
 * @returns A promise that resolves to an array of "as reported" income statements.
 * @throws {Error} If symbol is not provided.
 */
export async function asReportedIncomeStatements(
	symbol: string,
	options: AsReportedStatementOptions = {},
): Promise<FMPTypes.AsReportedFinancialStatement[]> {
	if (!symbol) {
		throw new Error('Symbol parameter is required for getAsReportedIncomeStatements')
	}
	const searchParams = cleanQuery({ symbol, ...options })
	return fmpApi
		.get('income-statement-as-reported', { searchParams })
		.json<FMPTypes.AsReportedFinancialStatement[]>()
}

/**
 * Retrieves balance sheet statements as reported by the company.
 * @param symbol The stock symbol (e.g., "AAPL").
 * @param [options] Optional parameters for limit and period.
 * @returns A promise that resolves to an array of "as reported" balance sheet statements.
 * @throws {Error} If symbol is not provided.
 */
export async function asReportedBalanceStatements(
	symbol: string,
	options: AsReportedStatementOptions = {},
): Promise<FMPTypes.AsReportedFinancialStatement[]> {
	if (!symbol) {
		throw new Error('Symbol parameter is required for getAsReportedBalanceStatements')
	}
	const searchParams = cleanQuery({ symbol, ...options })
	return fmpApi
		.get('balance-sheet-statement-as-reported', { searchParams })
		.json<FMPTypes.AsReportedFinancialStatement[]>()
}

/**
 * Retrieves cash flow statements as reported by the company.
 * @param symbol The stock symbol (e.g., "AAPL").
 * @param [options] Optional parameters for limit and period.
 * @returns A promise that resolves to an array of "as reported" cash flow statements.
 * @throws {Error} If symbol is not provided.
 */
export async function asReportedCashFlowStatements(
	symbol: string,
	options: AsReportedStatementOptions = {},
): Promise<FMPTypes.AsReportedFinancialStatement[]> {
	if (!symbol) {
		throw new Error('Symbol parameter is required for getAsReportedCashFlowStatements')
	}
	const searchParams = cleanQuery({ symbol, ...options })
	return fmpApi
		.get('cash-flow-statement-as-reported', { searchParams })
		.json<FMPTypes.AsReportedFinancialStatement[]>()
}

/**
 * Retrieves full financial statements (income, balance sheet, cash flow) as reported by the company.
 * @param symbol The stock symbol (e.g., "AAPL").
 * @param [options] Optional parameters for limit and period.
 * @returns A promise that resolves to an array of full "as reported" financial statements.
 * @throws {Error} If symbol is not provided.
 */
export async function fullAsReportedFinancialStatements(
	symbol: string,
	options: AsReportedStatementOptions = {},
): Promise<FMPTypes.FullAsReportedFinancialStatement[]> {
	if (!symbol) {
		throw new Error('Symbol parameter is required for getFullAsReportedFinancialStatements')
	}
	const searchParams = cleanQuery({ symbol, ...options })
	return fmpApi
		.get('financial-statement-full-as-reported', { searchParams })
		.json<FMPTypes.FullAsReportedFinancialStatement[]>()
}

/**
 * ========================================================================
 *           FORM 13F
 * ========================================================================
 */

/**
 * Options for retrieving latest institutional ownership filings.
 */
export interface LatestInstitutionalFilingsOptions extends OptionalPaginationOptions {}
/**
 * Retrieves the latest institutional ownership (Form 13F) filings.
 * @param [options] Optional parameters for pagination.
 * @returns A promise that resolves to an array of institutional ownership filings.
 */
export async function latestInstitutionalOwnershipFilings(
	options: LatestInstitutionalFilingsOptions = {},
): Promise<FMPTypes.InstitutionalOwnershipFiling[]> {
	const searchParams = cleanQuery(options)
	return fmpApi
		.get('institutional-ownership/latest', { searchParams })
		.json<FMPTypes.InstitutionalOwnershipFiling[]>()
}

/**
 * Options for extracting SEC filings data.
 */
export interface SecFilingsExtractOptions {
	/** The CIK of the institutional investor. E.g., "0001388838". */
	cik: string
	/** The year of the filing. E.g., "2023". */
	year: string | number
	/** The quarter of the filing. E.g., "3". */
	quarter: string | number
}
/**
 * Extracts detailed data from SEC Form 13F filings.
 * @param options Options specifying CIK, year, and quarter.
 * @returns A promise that resolves to an array of SEC filing extracts.
 * @throws {Error} If CIK, year, or quarter is not provided.
 */
export async function secFilingsExtract(
	options: SecFilingsExtractOptions,
): Promise<FMPTypes.SecFilingExtract[]> {
	if (!options.cik) {
		throw new Error('CIK option is required for getSecFilingsExtract')
	}
	if (!options.year) {
		throw new Error('Year option is required for getSecFilingsExtract')
	}
	if (!options.quarter) {
		throw new Error('Quarter option is required for getSecFilingsExtract')
	}
	const searchParams = cleanQuery(options)
	return fmpApi
		.get('institutional-ownership/extract', { searchParams })
		.json<FMPTypes.SecFilingExtract[]>()
}

/**
 * Retrieves dates associated with Form 13F filings by an institutional investor.
 * @param cik The CIK of the institutional investor (e.g., "0001067983").
 * @returns A promise that resolves to an array of Form 13F filing dates.
 * @throws {Error} If CIK is not provided.
 */
export async function form13FFilingDates(cik: string): Promise<FMPTypes.Form13FFilingDate[]> {
	if (!cik) {
		throw new Error('CIK parameter is required for getForm13FFilingDates')
	}
	const searchParams = { cik }
	return fmpApi
		.get('institutional-ownership/dates', { searchParams })
		.json<FMPTypes.Form13FFilingDate[]>()
}

/**
 * Options for retrieving filings extract with analytics by holder.
 */
export interface FilingsExtractAnalyticsHolderOptions extends OptionalPaginationOptions {
	/** The stock symbol of the holding. E.g., "AAPL". */
	symbol: string
	/** The year of the filing. E.g., "2023". */
	year: string | number
	/** The quarter of the filing. E.g., "3". */
	quarter: string | number
}
/**
 * Retrieves an analytical breakdown of institutional filings by holder for a specific stock.
 * @param options Options specifying symbol, year, quarter, and pagination.
 * @returns A promise that resolves to an array of holder analytics.
 * @throws {Error} If symbol, year, or quarter is not provided.
 */
export async function filingsExtractAnalyticsByHolder(
	options: FilingsExtractAnalyticsHolderOptions,
): Promise<FMPTypes.HolderAnalytics[]> {
	if (!options.symbol) {
		throw new Error('Symbol option is required for getFilingsExtractAnalyticsByHolder')
	}
	if (!options.year) {
		throw new Error('Year option is required for getFilingsExtractAnalyticsByHolder')
	}
	if (!options.quarter) {
		throw new Error('Quarter option is required for getFilingsExtractAnalyticsByHolder')
	}
	const searchParams = cleanQuery(options)
	return fmpApi
		.get('institutional-ownership/extract-analytics/holder', { searchParams })
		.json<FMPTypes.HolderAnalytics[]>()
}

/**
 * Options for retrieving holder performance summary.
 */
export interface HolderPerformanceSummaryOptions {
	/** The CIK of the institutional investor. E.g., "0001067983". */
	cik: string
	/** The page number for pagination. E.g., 0. */
	page?: number | null
}
/**
 * Retrieves a performance summary for an institutional investor.
 * @param options Options specifying CIK and pagination.
 * @returns A promise that resolves to an array of holder performance summaries.
 * @throws {Error} If CIK is not provided.
 */
export async function holderPerformanceSummary(
	options: HolderPerformanceSummaryOptions,
): Promise<FMPTypes.HolderPerformanceSummary[]> {
	if (!options.cik) {
		throw new Error('CIK option is required for getHolderPerformanceSummary')
	}
	const searchParams = cleanQuery(options)
	return fmpApi
		.get('institutional-ownership/holder-performance-summary', { searchParams })
		.json<FMPTypes.HolderPerformanceSummary[]>()
}

/**
 * Options for retrieving holders industry breakdown.
 */
export interface HoldersIndustryBreakdownOptions {
	/** The CIK of the institutional investor. E.g., "0001067983". */
	cik: string
	/** The year of the filing. E.g., "2023". */
	year: string | number
	/** The quarter of the filing. E.g., "3". */
	quarter: string | number
}
/**
 * Retrieves the industry breakdown of an institutional investor's holdings.
 * @param options Options specifying CIK, year, and quarter.
 * @returns A promise that resolves to an array of holder industry breakdowns.
 * @throws {Error} If CIK, year, or quarter is not provided.
 */
export async function holdersIndustryBreakdown(
	options: HoldersIndustryBreakdownOptions,
): Promise<FMPTypes.HolderIndustryBreakdown[]> {
	if (!options.cik) {
		throw new Error('CIK option is required for getHoldersIndustryBreakdown')
	}
	if (!options.year) {
		throw new Error('Year option is required for getHoldersIndustryBreakdown')
	}
	if (!options.quarter) {
		throw new Error('Quarter option is required for getHoldersIndustryBreakdown')
	}
	const searchParams = cleanQuery(options)
	return fmpApi
		.get('institutional-ownership/holder-industry-breakdown', { searchParams })
		.json<FMPTypes.HolderIndustryBreakdown[]>()
}

/**
 * Options for retrieving positions summary for a symbol.
 */
export interface PositionsSummaryOptions {
	/** The stock symbol. E.g., "AAPL". */
	symbol: string
	/** The year of the filing. E.g., "2023". */
	year: string | number
	/** The quarter of the filing. E.g., "3". */
	quarter: string | number
}
/**
 * Retrieves a summary of institutional holdings for a specific stock symbol.
 * @param options Options specifying symbol, year, and quarter.
 * @returns A promise that resolves to an array containing the positions summary.
 * @throws {Error} If symbol, year, or quarter is not provided.
 */
export async function positionsSummary(
	options: PositionsSummaryOptions,
): Promise<FMPTypes.SymbolPositionSummary[]> {
	if (!options.symbol) {
		throw new Error('Symbol option is required for getPositionsSummary')
	}
	if (!options.year) {
		throw new Error('Year option is required for getPositionsSummary')
	}
	if (!options.quarter) {
		throw new Error('Quarter option is required for getPositionsSummary')
	}
	const searchParams = cleanQuery(options)
	return fmpApi
		.get('institutional-ownership/symbol-positions-summary', { searchParams })
		.json<FMPTypes.SymbolPositionSummary[]>()
}

/**
 * Options for retrieving industry performance summary.
 */
export interface IndustryPerformanceSummaryOptions {
	/** The year of the summary. E.g., "2023". */
	year: string | number
	/** The quarter of the summary. E.g., "3". */
	quarter: string | number
}
/**
 * Retrieves a summary of financial performance by industry.
 * @param options Options specifying year and quarter.
 * @returns A promise that resolves to an array of industry performance summaries.
 * @throws {Error} If year or quarter is not provided.
 */
export async function industryPerformanceSummary(
	options: IndustryPerformanceSummaryOptions,
): Promise<FMPTypes.IndustryPerformanceSummary[]> {
	if (!options.year) {
		throw new Error('Year option is required for getIndustryPerformanceSummary')
	}
	if (!options.quarter) {
		throw new Error('Quarter option is required for getIndustryPerformanceSummary')
	}
	const searchParams = cleanQuery(options)
	return fmpApi
		.get('institutional-ownership/industry-summary', { searchParams })
		.json<FMPTypes.IndustryPerformanceSummary[]>()
}

/**
 * ========================================================================
 *           INDEXES
 * ========================================================================
 */

/**
 * Retrieves a list of stock market indexes.
 * @returns A promise that resolves to an array of index list items.
 */
export async function indexesList(): Promise<FMPTypes.IndexListItem[]> {
	return fmpApi.get('index-list').json<FMPTypes.IndexListItem[]>()
}

/**
 * Retrieves a real-time quote for a stock market index.
 * @param symbol The index symbol (e.g., "^GSPC").
 * @returns A promise that resolves to an array containing the index quote.
 * @throws {Error} If symbol is not provided.
 */
export async function indexQuote(symbol: string): Promise<FMPTypes.IndexQuote[]> {
	if (!symbol) {
		throw new Error('Symbol parameter is required for getIndexQuote')
	}
	const searchParams = { symbol } // Endpoint is /quote
	return fmpApi.get('quote', { searchParams }).json<FMPTypes.IndexQuote[]>()
}

/**
 * Retrieves a short real-time quote for a stock market index.
 * @param symbol The index symbol (e.g., "^GSPC").
 * @returns A promise that resolves to an array containing the short index quote.
 * @throws {Error} If symbol is not provided.
 */
export async function indexQuoteShort(symbol: string): Promise<FMPTypes.IndexQuoteShort[]> {
	if (!symbol) {
		throw new Error('Symbol parameter is required for getIndexQuoteShort')
	}
	const searchParams = { symbol } // Endpoint is /quote-short
	return fmpApi.get('quote-short', { searchParams }).json<FMPTypes.IndexQuoteShort[]>()
}

/**
 * Options for retrieving all index quotes.
 */
export interface AllIndexQuotesOptions {
	/** If true, returns short quotes. E.g., true. */
	short?: boolean | null
}
/**
 * Retrieves real-time quotes for multiple stock market indexes.
 * @param [options] Optional parameters.
 * @returns A promise that resolves to an array of index quotes (short or full based on options).
 */
export async function allIndexQuotes(
	options: AllIndexQuotesOptions = {},
): Promise<(FMPTypes.IndexQuoteShort | FMPTypes.IndexQuote)[]> {
	const searchParams = cleanQuery(options)
	if (options.short) {
		return fmpApi.get('batch-index-quotes', { searchParams }).json<FMPTypes.IndexQuoteShort[]>()
	}
	return fmpApi.get('batch-index-quotes', { searchParams }).json<FMPTypes.IndexQuote[]>()
}

/**
 * Retrieves light historical end-of-day price data for an index.
 * @param symbol The index symbol (e.g., "^GSPC").
 * @param [options] Optional date range.
 * @returns A promise that resolves to an array of light index chart items.
 * @throws {Error} If symbol is not provided.
 */
export async function indexChartLight(
	symbol: string,
	options: HistoricalEodChartOptions = {},
): Promise<FMPTypes.StockChartLightItem[]> {
	if (!symbol) {
		throw new Error('Symbol parameter is required for getIndexChartLight')
	}
	const searchParams = cleanQuery({ symbol, ...options })
	return fmpApi
		.get('historical-price-eod/light', { searchParams })
		.json<FMPTypes.StockChartLightItem[]>()
}

/**
 * Retrieves full historical end-of-day price data for an index.
 * @param symbol The index symbol (e.g., "^GSPC").
 * @param [options] Optional date range.
 * @returns A promise that resolves to an array of full index chart items.
 * @throws {Error} If symbol is not provided.
 */
export async function indexChartFull(
	symbol: string,
	options: HistoricalEodChartOptions = {},
): Promise<FMPTypes.StockChartFullItem[]> {
	if (!symbol) {
		throw new Error('Symbol parameter is required for getIndexChartFull')
	}
	const searchParams = cleanQuery({ symbol, ...options })
	return fmpApi
		.get('historical-price-eod/full', { searchParams })
		.json<FMPTypes.StockChartFullItem[]>()
}

/**
 * Retrieves 1-minute interval historical index chart data.
 * @param symbol The index symbol (e.g., "^GSPC").
 * @param [options] Optional date range. Note: `nonadjusted` is not in index chart docs.
 * @returns A promise that resolves to an array of 1-minute index chart items.
 */
export async function indexChart1Min(
	symbol: string,
	options: Omit<HistoricalIntradayChartOptions, 'nonadjusted'> = {},
): Promise<FMPTypes.BaseChartItem[]> {
	if (!symbol) {
		throw new Error('Symbol parameter is required for getIndexChart1Min')
	}
	const searchParams = cleanQuery({ symbol, ...options })
	return fmpApi.get(`historical-chart/1min`, { searchParams }).json<FMPTypes.BaseChartItem[]>()
}

/**
 * Retrieves 5-minute interval historical index chart data.
 * @param symbol The index symbol (e.g., "^GSPC").
 * @param [options] Optional date range. Note: `nonadjusted` is not in index chart docs.
 * @returns A promise that resolves to an array of 5-minute index chart items.
 */
export async function indexChart5Min(
	symbol: string,
	options: Omit<HistoricalIntradayChartOptions, 'nonadjusted'> = {},
): Promise<FMPTypes.BaseChartItem[]> {
	if (!symbol) {
		throw new Error('Symbol parameter is required for getIndexChart5Min')
	}
	const searchParams = cleanQuery({ symbol, ...options })
	return fmpApi.get(`historical-chart/5min`, { searchParams }).json<FMPTypes.BaseChartItem[]>()
}

/**
 * Retrieves 1-hour interval historical index chart data.
 * @param symbol The index symbol (e.g., "^GSPC").
 * @param [options] Optional date range. Note: `nonadjusted` is not in index chart docs.
 * @returns A promise that resolves to an array of 1-hour index chart items.
 */
export async function indexChart1Hour(
	symbol: string,
	options: Omit<HistoricalIntradayChartOptions, 'nonadjusted'> = {},
): Promise<FMPTypes.BaseChartItem[]> {
	if (!symbol) {
		throw new Error('Symbol parameter is required for getIndexChart1Hour')
	}
	const searchParams = cleanQuery({ symbol, ...options })
	return fmpApi.get(`historical-chart/1hour`, { searchParams }).json<FMPTypes.BaseChartItem[]>()
}

/**
 * Retrieves the current constituents of the S&P 500 index.
 * @returns A promise that resolves to an array of S&P 500 constituents.
 */
export async function sp500Constituents(): Promise<FMPTypes.IndexConstituent[]> {
	return fmpApi.get('sp500-constituent').json<FMPTypes.IndexConstituent[]>()
}

/**
 * Retrieves the current constituents of the Nasdaq index.
 * @returns A promise that resolves to an array of Nasdaq constituents.
 */
export async function nasdaqConstituents(): Promise<FMPTypes.IndexConstituent[]> {
	return fmpApi.get('nasdaq-constituent').json<FMPTypes.IndexConstituent[]>()
}

/**
 * Retrieves the current constituents of the Dow Jones Industrial Average.
 * @returns A promise that resolves to an array of Dow Jones constituents.
 */
export async function dowJonesConstituents(): Promise<FMPTypes.IndexConstituent[]> {
	return fmpApi.get('dowjones-constituent').json<FMPTypes.IndexConstituent[]>()
}

/**
 * Retrieves historical changes to the S&P 500 index constituents.
 * @returns A promise that resolves to an array of historical S&P 500 constituent changes.
 */
export async function historicalSp500Constituents(): Promise<
	FMPTypes.HistoricalIndexConstituentChange[]
> {
	return fmpApi
		.get('historical-sp500-constituent')
		.json<FMPTypes.HistoricalIndexConstituentChange[]>()
}

/**
 * Retrieves historical changes to the Nasdaq index constituents.
 * @returns A promise that resolves to an array of historical Nasdaq constituent changes.
 */
export async function historicalNasdaqConstituents(): Promise<
	FMPTypes.HistoricalIndexConstituentChange[]
> {
	return fmpApi
		.get('historical-nasdaq-constituent')
		.json<FMPTypes.HistoricalIndexConstituentChange[]>()
}

/**
 * Retrieves historical changes to the Dow Jones Industrial Average constituents.
 * @returns A promise that resolves to an array of historical Dow Jones constituent changes.
 */
export async function historicalDowJonesConstituents(): Promise<
	FMPTypes.HistoricalIndexConstituentChange[]
> {
	return fmpApi
		.get('historical-dowjones-constituent')
		.json<FMPTypes.HistoricalIndexConstituentChange[]>()
}

/**
 * ========================================================================
 *           INSIDER TRADES
 * ========================================================================
 */

/**
 * Options for retrieving latest insider trading activity.
 */
export interface LatestInsiderTradesOptions extends OptionalPaginationOptions {
	/** Filter by specific date (YYYY-MM-DD). E.g., "2025-01-10". */
	date?: string | null
}
/**
 * Retrieves the latest insider trading activity.
 * @param [options] Optional parameters for date filter and pagination.
 * @returns A promise that resolves to an array of insider trades.
 */
export async function latestInsiderTrades(
	options: LatestInsiderTradesOptions = {},
): Promise<FMPTypes.InsiderTrade[]> {
	const searchParams = cleanQuery(options)
	return fmpApi.get('insider-trading/latest', { searchParams }).json<FMPTypes.InsiderTrade[]>()
}

/**
 * Options for searching insider trades.
 */
export interface SearchInsiderTradesOptions extends OptionalPaginationOptions {
	/** Filter by stock symbol. E.g., "AAPL". */
	symbol?: string | null
	/** Filter by reporting CIK. E.g., "0001496686". */
	reportingCik?: string | null
	/** Filter by company CIK. E.g., "0000320193". */
	companyCik?: string | null
	/** Filter by transaction type (e.g., "S-Sale", "P-Purchase", "A-Award"). */
	transactionType?: string | null
}
/**
 * Searches insider trading activity with various filters.
 * @param [options] Optional parameters for filtering and pagination.
 * @returns A promise that resolves to an array of insider trades.
 */
export async function searchInsiderTrades(
	options: SearchInsiderTradesOptions = {},
): Promise<FMPTypes.InsiderTrade[]> {
	const searchParams = cleanQuery(options)
	return fmpApi.get('insider-trading/search', { searchParams }).json<FMPTypes.InsiderTrade[]>()
}

/**
 * Searches for insider trading activity by reporting name.
 * @param name The name of the reporting person/entity (e.g., "Zuckerberg").
 * @returns A promise that resolves to an array of insider reporting names and CIKs.
 * @throws {Error} If name is not provided.
 */
export async function searchInsiderTradesByReportingName(
	name: string,
): Promise<FMPTypes.InsiderReportingName[]> {
	if (!name) {
		throw new Error('Name parameter is required for searchInsiderTradesByReportingName')
	}
	const searchParams = { name }
	return fmpApi
		.get('insider-trading/reporting-name', { searchParams })
		.json<FMPTypes.InsiderReportingName[]>()
}

/**
 * Retrieves a list of all insider transaction types.
 * @returns A promise that resolves to an array of insider transaction types.
 */
export async function allInsiderTransactionTypes(): Promise<FMPTypes.InsiderTransactionType[]> {
	return fmpApi.get('insider-trading-transaction-type').json<FMPTypes.InsiderTransactionType[]>()
}

/**
 * Retrieves statistics on insider trading activity for a specific company.
 * @param symbol The stock symbol (e.g., "AAPL").
 * @returns A promise that resolves to an array of insider trade statistics.
 * @throws {Error} If symbol is not provided.
 */
export async function insiderTradeStatistics(
	symbol: string,
): Promise<FMPTypes.InsiderTradeStatistics[]> {
	if (!symbol) {
		throw new Error('Symbol parameter is required for getInsiderTradeStatistics')
	}
	const searchParams = { symbol }
	return fmpApi
		.get('insider-trading/statistics', { searchParams })
		.json<FMPTypes.InsiderTradeStatistics[]>()
}

/**
 * Options for retrieving acquisition of beneficial ownership filings (SC 13D/G).
 */
export interface AcquisitionOwnershipOptions extends OptionalLimitOption {}
/**
 * Tracks changes in stock ownership during acquisitions (SC 13D/G filings).
 * @param symbol The stock symbol (e.g., "AAPL").
 * @param [options] Optional parameters.
 * @returns A promise that resolves to an array of acquisition ownership records.
 * @throws {Error} If symbol is not provided.
 */
export async function acquisitionOwnership(
	symbol: string,
	options: AcquisitionOwnershipOptions = {},
): Promise<FMPTypes.AcquisitionOwnership[]> {
	if (!symbol) {
		throw new Error('Symbol parameter is required for getAcquisitionOwnership')
	}
	const searchParams = cleanQuery({ symbol, ...options })
	return fmpApi
		.get('acquisition-of-beneficial-ownership', { searchParams })
		.json<FMPTypes.AcquisitionOwnership[]>()
}

/**
 * ========================================================================
 *           MARKET PERFORMANCE
 * ========================================================================
 */

/**
 * Options for market sector/industry performance snapshot.
 */
export interface MarketPerformanceSnapshotOptions {
	/** The date for the snapshot (YYYY-MM-DD). E.g., "2024-02-01". */
	date: string
	/** Filter by exchange. E.g., "NASDAQ". */
	exchange?: string | null
	/** Filter by sector (for sector performance). E.g., "Energy". */
	sector?: string | null
	/** Filter by industry (for industry performance). E.g., "Biotechnology". */
	industry?: string | null
}
/**
 * Retrieves a snapshot of market sector performance for a specific date.
 * @param options Options specifying date, and optionally exchange and sector.
 * @returns A promise that resolves to an array of market sector performance data.
 * @throws {Error} If date is not provided.
 */
export async function marketSectorPerformanceSnapshot(
	options: MarketPerformanceSnapshotOptions,
): Promise<FMPTypes.MarketSectorPerformance[]> {
	if (!options.date) {
		throw new Error('Date option is required for getMarketSectorPerformanceSnapshot')
	}
	const searchParams = cleanQuery(options)
	return fmpApi
		.get('sector-performance-snapshot', { searchParams })
		.json<FMPTypes.MarketSectorPerformance[]>()
}

/**
 * Retrieves a snapshot of market industry performance for a specific date.
 * @param options Options specifying date, and optionally exchange and industry.
 * @returns A promise that resolves to an array of market industry performance data.
 * @throws {Error} If date is not provided.
 */
export async function marketIndustryPerformanceSnapshot(
	options: MarketPerformanceSnapshotOptions,
): Promise<FMPTypes.MarketIndustryPerformance[]> {
	if (!options.date) {
		throw new Error('Date option is required for getMarketIndustryPerformanceSnapshot')
	}
	const searchParams = cleanQuery(options)
	return fmpApi
		.get('industry-performance-snapshot', { searchParams })
		.json<FMPTypes.MarketIndustryPerformance[]>()
}

/**
 * Options for historical market sector/industry performance.
 */
export interface HistoricalMarketPerformanceOptions extends OptionalRangeOptions {
	/** Filter by exchange. E.g., "NASDAQ". */
	exchange?: string | null
}
/**
 * Retrieves historical market sector performance data.
 * @param sector The sector to retrieve data for (e.g., "Energy").
 * @param [options] Optional parameters for date range and exchange.
 * @returns A promise that resolves to an array of historical market sector performance data.
 * @throws {Error} If sector is not provided.
 */
export async function historicalMarketSectorPerformance(
	sector: string,
	options: HistoricalMarketPerformanceOptions = {},
): Promise<FMPTypes.MarketSectorPerformance[]> {
	if (!sector) {
		throw new Error('Sector parameter is required for getHistoricalMarketSectorPerformance')
	}
	const searchParams = cleanQuery({ sector, ...options })
	return fmpApi
		.get('historical-sector-performance', { searchParams })
		.json<FMPTypes.MarketSectorPerformance[]>()
}

/**
 * Retrieves historical market industry performance data.
 * @param industry The industry to retrieve data for (e.g., "Biotechnology").
 * @param [options] Optional parameters for date range and exchange.
 * @returns A promise that resolves to an array of historical market industry performance data.
 * @throws {Error} If industry is not provided.
 */
export async function historicalMarketIndustryPerformance(
	industry: string,
	options: HistoricalMarketPerformanceOptions = {},
): Promise<FMPTypes.MarketIndustryPerformance[]> {
	if (!industry) {
		throw new Error('Industry parameter is required for getHistoricalMarketIndustryPerformance')
	}
	const searchParams = cleanQuery({ industry, ...options })
	return fmpApi
		.get('historical-industry-performance', { searchParams })
		.json<FMPTypes.MarketIndustryPerformance[]>()
}

/**
 * Options for market sector/industry P/E snapshot.
 */
export interface MarketPESnapshotOptions {
	/** The date for the snapshot (YYYY-MM-DD). E.g., "2024-02-01". */
	date: string
	/** Filter by exchange. E.g., "NASDAQ". */
	exchange?: string | null
	/** Filter by sector (for sector P/E). E.g., "Energy". */
	sector?: string | null
	/** Filter by industry (for industry P/E). E.g., "Biotechnology". */
	industry?: string | null
}
/**
 * Retrieves a snapshot of Price-to-Earnings (P/E) ratios for market sectors.
 * @param options Options specifying date, and optionally exchange and sector.
 * @returns A promise that resolves to an array of market sector P/E data.
 * @throws {Error} If date is not provided.
 */
export async function marketSectorPESnapshot(
	options: MarketPESnapshotOptions,
): Promise<FMPTypes.MarketSectorPE[]> {
	if (!options.date) {
		throw new Error('Date option is required for getMarketSectorPESnapshot')
	}
	const searchParams = cleanQuery(options)
	return fmpApi.get('sector-pe-snapshot', { searchParams }).json<FMPTypes.MarketSectorPE[]>()
}

/**
 * Retrieves a snapshot of Price-to-Earnings (P/E) ratios for market industries.
 * @param options Options specifying date, and optionally exchange and industry.
 * @returns A promise that resolves to an array of market industry P/E data.
 * @throws {Error} If date is not provided.
 */
export async function marketIndustryPESnapshot(
	options: MarketPESnapshotOptions,
): Promise<FMPTypes.MarketIndustryPE[]> {
	if (!options.date) {
		throw new Error('Date option is required for getMarketIndustryPESnapshot')
	}
	const searchParams = cleanQuery(options)
	return fmpApi.get('industry-pe-snapshot', { searchParams }).json<FMPTypes.MarketIndustryPE[]>()
}

/**
 * Options for historical market sector/industry P/E.
 */
export interface HistoricalMarketPEOptions extends OptionalRangeOptions {
	/** Filter by exchange. E.g., "NASDAQ". */
	exchange?: string | null
}
/**
 * Retrieves historical Price-to-Earnings (P/E) ratios for market sectors.
 * @param sector The sector to retrieve data for (e.g., "Energy").
 * @param [options] Optional parameters for date range and exchange.
 * @returns A promise that resolves to an array of historical market sector P/E data.
 * @throws {Error} If sector is not provided.
 */
export async function historicalMarketSectorPE(
	sector: string,
	options: HistoricalMarketPEOptions = {},
): Promise<FMPTypes.MarketSectorPE[]> {
	if (!sector) {
		throw new Error('Sector parameter is required for getHistoricalMarketSectorPE')
	}
	const searchParams = cleanQuery({ sector, ...options })
	return fmpApi.get('historical-sector-pe', { searchParams }).json<FMPTypes.MarketSectorPE[]>()
}

/**
 * Retrieves historical Price-to-Earnings (P/E) ratios for market industries.
 * @param industry The industry to retrieve data for (e.g., "Biotechnology").
 * @param [options] Optional parameters for date range and exchange.
 * @returns A promise that resolves to an array of historical market industry P/E data.
 * @throws {Error} If industry is not provided.
 */
export async function historicalMarketIndustryPE(
	industry: string,
	options: HistoricalMarketPEOptions = {},
): Promise<FMPTypes.MarketIndustryPE[]> {
	if (!industry) {
		throw new Error('Industry parameter is required for getHistoricalMarketIndustryPE')
	}
	const searchParams = cleanQuery({ industry, ...options })
	return fmpApi.get('historical-industry-pe', { searchParams }).json<FMPTypes.MarketIndustryPE[]>()
}

/**
 * Retrieves a list of the biggest stock gainers for the current trading day.
 * @returns A promise that resolves to an array of market movers (gainers).
 */
export async function biggestStockGainers(): Promise<FMPTypes.MarketMover[]> {
	return fmpApi.get('biggest-gainers').json<FMPTypes.MarketMover[]>()
}

/**
 * Retrieves a list of the biggest stock losers for the current trading day.
 * @returns A promise that resolves to an array of market movers (losers).
 */
export async function biggestStockLosers(): Promise<FMPTypes.MarketMover[]> {
	return fmpApi.get('biggest-losers').json<FMPTypes.MarketMover[]>()
}

/**
 * Retrieves a list of the most actively traded stocks for the current trading day.
 * @returns A promise that resolves to an array of market movers (most active).
 */
export async function topTradedStocks(): Promise<FMPTypes.MarketMover[]> {
	return fmpApi.get('most-actives').json<FMPTypes.MarketMover[]>()
}

/**
 * ========================================================================
 *           MARKET HOURS
 * ========================================================================
 */

/**
 * Retrieves trading hours for a specific stock exchange.
 * @param exchange The stock exchange symbol (e.g., "NASDAQ").
 * @returns A promise that resolves to an array containing the exchange market hours.
 * @throws {Error} If exchange is not provided.
 */
export async function exchangeMarketHours(
	exchange: string,
): Promise<FMPTypes.ExchangeMarketHours[]> {
	if (!exchange) {
		throw new Error('Exchange parameter is required for getExchangeMarketHours')
	}
	const searchParams = { exchange }
	return fmpApi
		.get('exchange-market-hours', { searchParams })
		.json<FMPTypes.ExchangeMarketHours[]>()
}

/**
 * Retrieves trading hours for all supported stock exchanges.
 * @returns A promise that resolves to an array of exchange market hours.
 */
export async function allExchangeMarketHours(): Promise<FMPTypes.ExchangeMarketHours[]> {
	return fmpApi.get('all-exchange-market-hours').json<FMPTypes.ExchangeMarketHours[]>()
}

/**
 * ========================================================================
 *           NEWS
 * ========================================================================
 */

/**
 * Options for retrieving FMP articles.
 */
export interface FmpArticlesOptions extends OptionalPaginationOptions {}
/**
 * Retrieves the latest articles from Financial Modeling Prep.
 * @param [options] Optional parameters for pagination.
 * @returns A promise that resolves to an array of FMP articles.
 */
export async function fmpArticles(
	options: FmpArticlesOptions = {},
): Promise<FMPTypes.FmpArticle[]> {
	const searchParams = cleanQuery(options)
	return fmpApi.get('fmp-articles', { searchParams }).json<FMPTypes.FmpArticle[]>()
}

/**
 * Options for retrieving general, press releases, stock, crypto, or forex news.
 */
export interface GeneralNewsOptions extends OptionalRangeOptions, OptionalPaginationOptions {}
/**
 * Retrieves the latest general news articles.
 * @param [options] Optional parameters for date range and pagination.
 * @returns A promise that resolves to an array of general news articles.
 */
export async function generalNews(
	options: GeneralNewsOptions = {},
): Promise<FMPTypes.GeneralNewsArticle[]> {
	const searchParams = cleanQuery(options)
	return fmpApi.get('news/general-latest', { searchParams }).json<FMPTypes.GeneralNewsArticle[]>()
}

/**
 * Retrieves the latest press releases from companies.
 * @param [options] Optional parameters for date range and pagination.
 * @returns A promise that resolves to an array of press release articles.
 */
export async function pressReleases(
	options: GeneralNewsOptions = {},
): Promise<FMPTypes.GeneralNewsArticle[]> {
	const searchParams = cleanQuery(options)
	return fmpApi
		.get('news/press-releases-latest', { searchParams })
		.json<FMPTypes.GeneralNewsArticle[]>()
}

/**
 * Retrieves the latest stock market news.
 * @param [options] Optional parameters for date range and pagination.
 * @returns A promise that resolves to an array of stock news articles.
 */
export async function stockNews(
	options: GeneralNewsOptions = {},
): Promise<FMPTypes.GeneralNewsArticle[]> {
	const searchParams = cleanQuery(options)
	return fmpApi.get('news/stock-latest', { searchParams }).json<FMPTypes.GeneralNewsArticle[]>()
}

/**
 * Retrieves the latest cryptocurrency news.
 * @param [options] Optional parameters for date range and pagination.
 * @returns A promise that resolves to an array of crypto news articles.
 */
export async function cryptoNews(
	options: GeneralNewsOptions = {},
): Promise<FMPTypes.GeneralNewsArticle[]> {
	const searchParams = cleanQuery(options)
	return fmpApi.get('news/crypto-latest', { searchParams }).json<FMPTypes.GeneralNewsArticle[]>()
}

/**
 * Retrieves the latest Forex news.
 * @param [options] Optional parameters for date range and pagination.
 * @returns A promise that resolves to an array of Forex news articles.
 */
export async function forexNews(
	options: GeneralNewsOptions = {},
): Promise<FMPTypes.GeneralNewsArticle[]> {
	const searchParams = cleanQuery(options)
	return fmpApi.get('news/forex-latest', { searchParams }).json<FMPTypes.GeneralNewsArticle[]>()
}

/**
 * Options for searching news by symbols.
 */
export interface SearchNewsBySymbolsOptions extends GeneralNewsOptions {
	/** Comma-separated list or array of stock/crypto/forex symbols. E.g., ["AAPL", "MSFT"] or "EURUSD,GBPUSD". */
	symbols: string | string[]
}
/**
 * Searches for press releases related to specific stock symbols.
 * @param options Options specifying symbols, and optionally date range and pagination.
 * @returns A promise that resolves to an array of press release articles.
 * @throws {Error} If symbols are not provided.
 */
export async function searchPressReleases(
	options: SearchNewsBySymbolsOptions,
): Promise<FMPTypes.GeneralNewsArticle[]> {
	if (!options.symbols) {
		throw new Error('Symbols option is required for searchPressReleases')
	}
	const searchParams = cleanQuery(options)
	return fmpApi.get('news/press-releases', { searchParams }).json<FMPTypes.GeneralNewsArticle[]>()
}

/**
 * Searches for stock news related to specific stock symbols.
 * @param options Options specifying symbols, and optionally date range and pagination.
 * @returns A promise that resolves to an array of stock news articles.
 * @throws {Error} If symbols are not provided.
 */
export async function searchStockNews(
	options: SearchNewsBySymbolsOptions,
): Promise<FMPTypes.GeneralNewsArticle[]> {
	if (!options.symbols) {
		throw new Error('Symbols option is required for searchStockNews')
	}
	const searchParams = cleanQuery(options)
	return fmpApi.get('news/stock', { searchParams }).json<FMPTypes.GeneralNewsArticle[]>()
}

/**
 * Searches for cryptocurrency news related to specific crypto symbols.
 * @param options Options specifying symbols, and optionally date range and pagination.
 * @returns A promise that resolves to an array of crypto news articles.
 * @throws {Error} If symbols are not provided.
 */
export async function searchCryptoNews(
	options: SearchNewsBySymbolsOptions,
): Promise<FMPTypes.GeneralNewsArticle[]> {
	if (!options.symbols) {
		throw new Error('Symbols option is required for searchCryptoNews')
	}
	const searchParams = cleanQuery(options)
	return fmpApi.get('news/crypto', { searchParams }).json<FMPTypes.GeneralNewsArticle[]>()
}

/**
 * Searches for Forex news related to specific currency pairs.
 * @param options Options specifying symbols, and optionally date range and pagination.
 * @returns A promise that resolves to an array of Forex news articles.
 * @throws {Error} If symbols are not provided.
 */
export async function searchForexNews(
	options: SearchNewsBySymbolsOptions,
): Promise<FMPTypes.GeneralNewsArticle[]> {
	if (!options.symbols) {
		throw new Error('Symbols option is required for searchForexNews')
	}
	const searchParams = cleanQuery(options)
	return fmpApi.get('news/forex', { searchParams }).json<FMPTypes.GeneralNewsArticle[]>()
}

/**
 * ========================================================================
 *           TECHNICAL INDICATORS
 * ========================================================================
 */

/**
 * Options for retrieving technical indicator data.
 */
export interface TechnicalIndicatorOptions extends OptionalRangeOptions {
	/** The length of the period for the indicator calculation. E.g., 10. */
	periodLength: number
	/** The timeframe for the data ('1min', '5min', '15min', '30min', '1hour', '4hour', '1day'). */
	timeframe: FMPTypes.IndicatorTimeframe
}

/**
 * Retrieves Simple Moving Average (SMA) data for a symbol.
 * @param symbol The stock/crypto/forex symbol (e.g., "AAPL").
 * @param options Options specifying period length, timeframe, and optionally date range.
 * @returns A promise that resolves to an array of SMA data points.
 * @throws {Error} If symbol, periodLength, or timeframe is not provided.
 */
export async function simpleMovingAverage(
	symbol: string,
	options: TechnicalIndicatorOptions,
): Promise<FMPTypes.SmaPoint[]> {
	if (!symbol) {
		throw new Error('Symbol parameter is required for getSimpleMovingAverage')
	}
	if (!options.periodLength) {
		throw new Error('PeriodLength option is required for getSimpleMovingAverage')
	}
	if (!options.timeframe) {
		throw new Error('Timeframe option is required for getSimpleMovingAverage')
	}
	const searchParams = cleanQuery({ symbol, ...options })
	return fmpApi.get('technical-indicators/sma', { searchParams }).json<FMPTypes.SmaPoint[]>()
}

/**
 * Retrieves Exponential Moving Average (EMA) data for a symbol.
 * @param symbol The stock/crypto/forex symbol (e.g., "AAPL").
 * @param options Options specifying period length, timeframe, and optionally date range.
 * @returns A promise that resolves to an array of EMA data points.
 * @throws {Error} If symbol, periodLength, or timeframe is not provided.
 */
export async function exponentialMovingAverage(
	symbol: string,
	options: TechnicalIndicatorOptions,
): Promise<FMPTypes.EmaPoint[]> {
	if (!symbol) {
		throw new Error('Symbol parameter is required for getExponentialMovingAverage')
	}
	if (!options.periodLength) {
		throw new Error('PeriodLength option is required for getExponentialMovingAverage')
	}
	if (!options.timeframe) {
		throw new Error('Timeframe option is required for getExponentialMovingAverage')
	}
	const searchParams = cleanQuery({ symbol, ...options })
	return fmpApi.get('technical-indicators/ema', { searchParams }).json<FMPTypes.EmaPoint[]>()
}

/**
 * Retrieves Weighted Moving Average (WMA) data for a symbol.
 * @param symbol The stock/crypto/forex symbol (e.g., "AAPL").
 * @param options Options specifying period length, timeframe, and optionally date range.
 * @returns A promise that resolves to an array of WMA data points.
 * @throws {Error} If symbol, periodLength, or timeframe is not provided.
 */
export async function weightedMovingAverage(
	symbol: string,
	options: TechnicalIndicatorOptions,
): Promise<FMPTypes.WmaPoint[]> {
	if (!symbol) {
		throw new Error('Symbol parameter is required for getWeightedMovingAverage')
	}
	if (!options.periodLength) {
		throw new Error('PeriodLength option is required for getWeightedMovingAverage')
	}
	if (!options.timeframe) {
		throw new Error('Timeframe option is required for getWeightedMovingAverage')
	}
	const searchParams = cleanQuery({ symbol, ...options })
	return fmpApi.get('technical-indicators/wma', { searchParams }).json<FMPTypes.WmaPoint[]>()
}

/**
 * Retrieves Double Exponential Moving Average (DEMA) data for a symbol.
 * @param symbol The stock/crypto/forex symbol (e.g., "AAPL").
 * @param options Options specifying period length, timeframe, and optionally date range.
 * @returns A promise that resolves to an array of DEMA data points.
 * @throws {Error} If symbol, periodLength, or timeframe is not provided.
 */
export async function doubleExponentialMovingAverage(
	symbol: string,
	options: TechnicalIndicatorOptions,
): Promise<FMPTypes.DemaPoint[]> {
	if (!symbol) {
		throw new Error('Symbol parameter is required for getDoubleExponentialMovingAverage')
	}
	if (!options.periodLength) {
		throw new Error('PeriodLength option is required for getDoubleExponentialMovingAverage')
	}
	if (!options.timeframe) {
		throw new Error('Timeframe option is required for getDoubleExponentialMovingAverage')
	}
	const searchParams = cleanQuery({ symbol, ...options })
	return fmpApi.get('technical-indicators/dema', { searchParams }).json<FMPTypes.DemaPoint[]>()
}

/**
 * Retrieves Triple Exponential Moving Average (TEMA) data for a symbol.
 * @param symbol The stock/crypto/forex symbol (e.g., "AAPL").
 * @param options Options specifying period length, timeframe, and optionally date range.
 * @returns A promise that resolves to an array of TEMA data points.
 * @throws {Error} If symbol, periodLength, or timeframe is not provided.
 */
export async function tripleExponentialMovingAverage(
	symbol: string,
	options: TechnicalIndicatorOptions,
): Promise<FMPTypes.TemaPoint[]> {
	if (!symbol) {
		throw new Error('Symbol parameter is required for getTripleExponentialMovingAverage')
	}
	if (!options.periodLength) {
		throw new Error('PeriodLength option is required for getTripleExponentialMovingAverage')
	}
	if (!options.timeframe) {
		throw new Error('Timeframe option is required for getTripleExponentialMovingAverage')
	}
	const searchParams = cleanQuery({ symbol, ...options })
	return fmpApi.get('technical-indicators/tema', { searchParams }).json<FMPTypes.TemaPoint[]>()
}

/**
 * Retrieves Relative Strength Index (RSI) data for a symbol.
 * @param symbol The stock/crypto/forex symbol (e.g., "AAPL").
 * @param options Options specifying period length, timeframe, and optionally date range.
 * @returns A promise that resolves to an array of RSI data points.
 * @throws {Error} If symbol, periodLength, or timeframe is not provided.
 */
export async function relativeStrengthIndex(
	symbol: string,
	options: TechnicalIndicatorOptions,
): Promise<FMPTypes.RsiPoint[]> {
	if (!symbol) {
		throw new Error('Symbol parameter is required for getRelativeStrengthIndex')
	}
	if (!options.periodLength) {
		throw new Error('PeriodLength option is required for getRelativeStrengthIndex')
	}
	if (!options.timeframe) {
		throw new Error('Timeframe option is required for getRelativeStrengthIndex')
	}
	const searchParams = cleanQuery({ symbol, ...options })
	return fmpApi.get('technical-indicators/rsi', { searchParams }).json<FMPTypes.RsiPoint[]>()
}

/**
 * Retrieves Standard Deviation data for a symbol.
 * @param symbol The stock/crypto/forex symbol (e.g., "AAPL").
 * @param options Options specifying period length, timeframe, and optionally date range.
 * @returns A promise that resolves to an array of Standard Deviation data points.
 * @throws {Error} If symbol, periodLength, or timeframe is not provided.
 */
export async function standardDeviation(
	symbol: string,
	options: TechnicalIndicatorOptions,
): Promise<FMPTypes.StandardDeviationPoint[]> {
	if (!symbol) {
		throw new Error('Symbol parameter is required for getStandardDeviation')
	}
	if (!options.periodLength) {
		throw new Error('PeriodLength option is required for getStandardDeviation')
	}
	if (!options.timeframe) {
		throw new Error('Timeframe option is required for getStandardDeviation')
	}
	const searchParams = cleanQuery({ symbol, ...options })
	return fmpApi
		.get('technical-indicators/standarddeviation', { searchParams })
		.json<FMPTypes.StandardDeviationPoint[]>()
}

/**
 * Retrieves Williams %R data for a symbol.
 * @param symbol The stock/crypto/forex symbol (e.g., "AAPL").
 * @param options Options specifying period length, timeframe, and optionally date range.
 * @returns A promise that resolves to an array of Williams %R data points.
 * @throws {Error} If symbol, periodLength, or timeframe is not provided.
 */
export async function williamsPercentR(
	symbol: string,
	options: TechnicalIndicatorOptions,
): Promise<FMPTypes.WilliamsPoint[]> {
	if (!symbol) {
		throw new Error('Symbol parameter is required for getWilliamsPercentR')
	}
	if (!options.periodLength) {
		throw new Error('PeriodLength option is required for getWilliamsPercentR')
	}
	if (!options.timeframe) {
		throw new Error('Timeframe option is required for getWilliamsPercentR')
	}
	const searchParams = cleanQuery({ symbol, ...options })
	return fmpApi
		.get('technical-indicators/williams', { searchParams })
		.json<FMPTypes.WilliamsPoint[]>()
}

/**
 * Retrieves Average Directional Index (ADX) data for a symbol.
 * @param symbol The stock/crypto/forex symbol (e.g., "AAPL").
 * @param options Options specifying period length, timeframe, and optionally date range.
 * @returns A promise that resolves to an array of ADX data points.
 * @throws {Error} If symbol, periodLength, or timeframe is not provided.
 */
export async function averageDirectionalIndex(
	symbol: string,
	options: TechnicalIndicatorOptions,
): Promise<FMPTypes.AdxPoint[]> {
	if (!symbol) {
		throw new Error('Symbol parameter is required for getAverageDirectionalIndex')
	}
	if (!options.periodLength) {
		throw new Error('PeriodLength option is required for getAverageDirectionalIndex')
	}
	if (!options.timeframe) {
		throw new Error('Timeframe option is required for getAverageDirectionalIndex')
	}
	const searchParams = cleanQuery({ symbol, ...options })
	return fmpApi.get('technical-indicators/adx', { searchParams }).json<FMPTypes.AdxPoint[]>()
}

/**
 * ========================================================================
 *           QUOTE
 * ========================================================================
 */

/**
 * Retrieves a real-time stock quote.
 * @param symbol The stock symbol (e.g., "AAPL").
 * @returns A promise that resolves to an array containing the stock quote.
 * @throws {Error} If symbol is not provided.
 */
export async function stockQuote(symbol: string): Promise<FMPTypes.StockQuote[]> {
	if (!symbol) {
		throw new Error('Symbol parameter is required for getStockQuote')
	}
	const searchParams = { symbol }
	return fmpApi.get('quote', { searchParams }).json<FMPTypes.StockQuote[]>()
}

/**
 * Retrieves a short real-time stock quote.
 * @param symbol The stock symbol (e.g., "AAPL").
 * @returns A promise that resolves to an array containing the short stock quote.
 * @throws {Error} If symbol is not provided.
 */
export async function stockQuoteShort(symbol: string): Promise<FMPTypes.StockQuoteShort[]> {
	if (!symbol) {
		throw new Error('Symbol parameter is required for getStockQuoteShort')
	}
	const searchParams = { symbol }
	return fmpApi.get('quote-short', { searchParams }).json<FMPTypes.StockQuoteShort[]>()
}

/**
 * Retrieves real-time aftermarket trade data for a stock.
 * @param symbol The stock symbol (e.g., "AAPL").
 * @returns A promise that resolves to an array of aftermarket trades.
 * @throws {Error} If symbol is not provided.
 */
export async function aftermarketTrade(symbol: string): Promise<FMPTypes.AftermarketTrade[]> {
	if (!symbol) {
		throw new Error('Symbol parameter is required for getAftermarketTrade')
	}
	const searchParams = { symbol }
	return fmpApi.get('aftermarket-trade', { searchParams }).json<FMPTypes.AftermarketTrade[]>()
}

/**
 * Retrieves real-time aftermarket quote data for a stock.
 * @param symbol The stock symbol (e.g., "AAPL").
 * @returns A promise that resolves to an array of aftermarket quotes.
 * @throws {Error} If symbol is not provided.
 */
export async function aftermarketQuote(symbol: string): Promise<FMPTypes.AftermarketQuote[]> {
	if (!symbol) {
		throw new Error('Symbol parameter is required for getAftermarketQuote')
	}
	const searchParams = { symbol }
	return fmpApi.get('aftermarket-quote', { searchParams }).json<FMPTypes.AftermarketQuote[]>()
}

/**
 * Retrieves stock price change percentages over various time periods.
 * @param symbol The stock symbol (e.g., "AAPL").
 * @returns A promise that resolves to an array containing the stock price changes.
 * @throws {Error} If symbol is not provided.
 */
export async function stockPriceChange(symbol: string): Promise<FMPTypes.StockPriceChange[]> {
	if (!symbol) {
		throw new Error('Symbol parameter is required for getStockPriceChange')
	}
	const searchParams = { symbol }
	return fmpApi.get('stock-price-change', { searchParams }).json<FMPTypes.StockPriceChange[]>()
}

/**
 * Retrieves real-time stock quotes for multiple symbols.
 * @param symbols An array of stock symbols (e.g., ["AAPL", "MSFT"]).
 * @returns A promise that resolves to an array of stock quotes.
 * @throws {Error} If symbols array is not provided or is empty.
 */
export async function stockBatchQuote(symbols: string[]): Promise<FMPTypes.StockQuote[]> {
	if (!symbols || symbols.length === 0) {
		throw new Error('Symbols array is required for getStockBatchQuote')
	}
	const searchParams = cleanQuery({ symbols })
	return fmpApi.get('batch-quote', { searchParams }).json<FMPTypes.StockQuote[]>()
}

/**
 * Retrieves short real-time stock quotes for multiple symbols.
 * @param symbols An array of stock symbols (e.g., ["AAPL", "MSFT"]).
 * @returns A promise that resolves to an array of short stock quotes.
 * @throws {Error} If symbols array is not provided or is empty.
 */
export async function stockBatchQuoteShort(symbols: string[]): Promise<FMPTypes.StockQuoteShort[]> {
	if (!symbols || symbols.length === 0) {
		throw new Error('Symbols array is required for getStockBatchQuoteShort')
	}
	const searchParams = cleanQuery({ symbols })
	return fmpApi.get('batch-quote-short', { searchParams }).json<FMPTypes.StockQuoteShort[]>()
}

/**
 * Retrieves real-time aftermarket trade data for multiple stocks.
 * @param symbols An array of stock symbols (e.g., ["AAPL", "MSFT"]).
 * @returns A promise that resolves to an array of aftermarket trades.
 * @throws {Error} If symbols array is not provided or is empty.
 */
export async function batchAftermarketTrade(
	symbols: string[],
): Promise<FMPTypes.AftermarketTrade[]> {
	if (!symbols || symbols.length === 0) {
		throw new Error('Symbols array is required for getBatchAftermarketTrade')
	}
	const searchParams = cleanQuery({ symbols })
	return fmpApi.get('batch-aftermarket-trade', { searchParams }).json<FMPTypes.AftermarketTrade[]>()
}

/**
 * Retrieves real-time aftermarket quote data for multiple stocks.
 * @param symbols An array of stock symbols (e.g., ["AAPL", "MSFT"]).
 * @returns A promise that resolves to an array of aftermarket quotes.
 * @throws {Error} If symbols array is not provided or is empty.
 */
export async function batchAftermarketQuote(
	symbols: string[],
): Promise<FMPTypes.AftermarketQuote[]> {
	if (!symbols || symbols.length === 0) {
		throw new Error('Symbols array is required for getBatchAftermarketQuote')
	}
	const searchParams = cleanQuery({ symbols })
	return fmpApi.get('batch-aftermarket-quote', { searchParams }).json<FMPTypes.AftermarketQuote[]>()
}

/**
 * Options for retrieving exchange stock quotes.
 */
export interface ExchangeStockQuotesOptions {
	/** If true, returns short quotes. E.g., true. */
	short?: boolean | null
}
/**
 * Retrieves real-time stock quotes for all stocks on a specific exchange.
 * @param exchange The stock exchange symbol (e.g., "NASDAQ").
 * @param [options] Optional parameters.
 * @returns A promise that resolves to an array of stock quotes (short or full based on options).
 * @throws {Error} If exchange is not provided.
 */
export async function exchangeStockQuotes(
	exchange: string,
	options: ExchangeStockQuotesOptions = {},
): Promise<(FMPTypes.StockQuoteShort | FMPTypes.StockQuote)[]> {
	if (!exchange) {
		throw new Error('Exchange parameter is required for getExchangeStockQuotes')
	}
	const searchParams = cleanQuery({ exchange, ...options })
	if (options.short) {
		return fmpApi.get('batch-exchange-quote', { searchParams }).json<FMPTypes.StockQuoteShort[]>()
	}
	// Assuming full quote if not short, though docs only show short example
	return fmpApi.get('batch-exchange-quote', { searchParams }).json<FMPTypes.StockQuote[]>()
}

/**
 * Options for retrieving batch quotes for various asset types.
 */
export interface BatchAssetQuotesOptions {
	/** If true, returns short quotes. E.g., true. */
	short?: boolean | null
}
/**
 * Retrieves real-time quotes for all mutual funds.
 * @param [options] Optional parameters.
 * @returns A promise that resolves to an array of mutual fund quotes (short or full based on options).
 */
export async function mutualFundQuotes(
	options: BatchAssetQuotesOptions = {},
): Promise<(FMPTypes.StockQuoteShort | FMPTypes.StockQuote)[]> {
	const searchParams = cleanQuery(options)
	if (options.short) {
		return fmpApi
			.get('batch-mutualfund-quotes', { searchParams })
			.json<FMPTypes.StockQuoteShort[]>()
	}
	return fmpApi.get('batch-mutualfund-quotes', { searchParams }).json<FMPTypes.StockQuote[]>()
}

/**
 * Retrieves real-time quotes for all ETFs.
 * @param [options] Optional parameters.
 * @returns A promise that resolves to an array of ETF quotes (short or full based on options).
 */
export async function etfQuotes(
	options: BatchAssetQuotesOptions = {},
): Promise<(FMPTypes.StockQuoteShort | FMPTypes.StockQuote)[]> {
	const searchParams = cleanQuery(options)
	if (options.short) {
		return fmpApi.get('batch-etf-quotes', { searchParams }).json<FMPTypes.StockQuoteShort[]>()
	}
	return fmpApi.get('batch-etf-quotes', { searchParams }).json<FMPTypes.StockQuote[]>()
}

// Note: Full Commodities, Crypto, Forex, Index quotes are covered by getAllCommoditiesQuotes, getAllCryptocurrenciesQuotes, getAllForexQuotes, getAllIndexQuotes respectively.
// The markdown lists them under "Quote" section again, but they point to the same batch endpoints.

/**
 * ========================================================================
 *           EARNINGS TRANSCRIPT
 * ========================================================================
 */

/**
 * Options for retrieving latest earning transcripts metadata.
 */
export interface LatestEarningTranscriptsOptions extends OptionalPaginationOptions {}
/**
 * Retrieves metadata for the latest available earnings transcripts.
 * @param [options] Optional parameters for pagination.
 * @returns A promise that resolves to an array of latest earnings transcript metadata.
 */
export async function latestEarningTranscripts(
	options: LatestEarningTranscriptsOptions = {},
): Promise<FMPTypes.LatestEarningsTranscriptMeta[]> {
	const searchParams = cleanQuery(options)
	return fmpApi
		.get('earning-call-transcript-latest', { searchParams })
		.json<FMPTypes.LatestEarningsTranscriptMeta[]>()
}

/**
 * Options for retrieving a specific earnings transcript.
 */
export interface EarningsTranscriptOptions extends OptionalLimitOption {
	/** The year of the earnings call. E.g., "2020". */
	year: string | number
	/** The quarter of the earnings call (1, 2, 3, or 4). E.g., "3". */
	quarter: string | number
}
/**
 * Retrieves the full transcript of a company's earnings call.
 * @param symbol The stock symbol (e.g., "AAPL").
 * @param options Options specifying year, quarter, and optionally limit.
 * @returns A promise that resolves to an array containing the earnings transcript.
 * @throws {Error} If symbol, year, or quarter is not provided.
 */
export async function earningsTranscript(
	symbol: string,
	options: EarningsTranscriptOptions,
): Promise<FMPTypes.EarningsTranscript[]> {
	if (!symbol) {
		throw new Error('Symbol parameter is required for getEarningsTranscript')
	}
	if (!options.year) {
		throw new Error('Year option is required for getEarningsTranscript')
	}
	if (!options.quarter) {
		throw new Error('Quarter option is required for getEarningsTranscript')
	}
	const searchParams = cleanQuery({ symbol, ...options })
	return fmpApi
		.get('earning-call-transcript', { searchParams })
		.json<FMPTypes.EarningsTranscript[]>()
}

/**
 * Retrieves available earnings call transcript dates for a specific company.
 * @param symbol The stock symbol (e.g., "AAPL").
 * @returns A promise that resolves to an array of earnings transcript dates.
 * @throws {Error} If symbol is not provided.
 */
export async function earningsTranscriptDatesBySymbol(
	symbol: string,
): Promise<FMPTypes.EarningsTranscriptDate[]> {
	if (!symbol) {
		throw new Error('Symbol parameter is required for getEarningsTranscriptDatesBySymbol')
	}
	const searchParams = { symbol }
	return fmpApi
		.get('earning-call-transcript-dates', { searchParams })
		.json<FMPTypes.EarningsTranscriptDate[]>()
}

/**
 * Retrieves a list of companies with available earnings transcripts.
 * @returns A promise that resolves to an array of earnings transcript list items.
 */
export async function earningsTranscriptList(): Promise<FMPTypes.EarningsTranscriptListItem[]> {
	return fmpApi.get('earnings-transcript-list').json<FMPTypes.EarningsTranscriptListItem[]>()
}

/**
 * ========================================================================
 *           SEC FILINGS
 * ========================================================================
 */

/**
 * Options for retrieving SEC filings by date range and pagination.
 */
export interface SecFilingsDateRangeOptions
	extends RequiredRangeOptions, OptionalPaginationOptions {}
/**
 * Retrieves the latest 8-K SEC filings within a date range.
 * @param options Options specifying date range and pagination.
 * @returns A promise that resolves to an array of SEC filings.
 * @throws {Error} If 'from' or 'to' date is not provided.
 */
export async function latest8kSecFilings(
	options: SecFilingsDateRangeOptions,
): Promise<FMPTypes.SecFiling[]> {
	if (!options.from) {
		throw new Error('From date option is required for getLatest8kSecFilings')
	}
	if (!options.to) {
		throw new Error('To date option is required for getLatest8kSecFilings')
	}
	const searchParams = cleanQuery(options)
	return fmpApi.get('sec-filings-8k', { searchParams }).json<FMPTypes.SecFiling[]>()
}

/**
 * Retrieves the latest SEC filings with financials (e.g., 10-K, 10-Q) within a date range.
 * @param options Options specifying date range and pagination.
 * @returns A promise that resolves to an array of SEC filings.
 * @throws {Error} If 'from' or 'to' date is not provided.
 */
export async function latestSecFilingsWithFinancials(
	options: SecFilingsDateRangeOptions,
): Promise<FMPTypes.SecFiling[]> {
	if (!options.from) {
		throw new Error('From date option is required for getLatestSecFilingsWithFinancials')
	}
	if (!options.to) {
		throw new Error('To date option is required for getLatestSecFilingsWithFinancials')
	}
	const searchParams = cleanQuery(options)
	return fmpApi.get('sec-filings-financials', { searchParams }).json<FMPTypes.SecFiling[]>()
}

/**
 * Options for searching SEC filings by form type.
 */
export interface SecFilingsByFormTypeOptions extends SecFilingsDateRangeOptions {
	/** The form type to search for (e.g., "8-K", "10-K"). */
	formType: string
}
/**
 * Searches SEC filings by form type within a date range.
 * @param options Options specifying form type, date range, and pagination.
 * @returns A promise that resolves to an array of SEC filings.
 * @throws {Error} If formType, 'from', or 'to' date is not provided.
 */
export async function searchSecFilingsByFormType(
	options: SecFilingsByFormTypeOptions,
): Promise<FMPTypes.SecFiling[]> {
	if (!options.formType) {
		throw new Error('FormType option is required for searchSecFilingsByFormType')
	}
	if (!options.from) {
		throw new Error('From date option is required for searchSecFilingsByFormType')
	}
	if (!options.to) {
		throw new Error('To date option is required for searchSecFilingsByFormType')
	}
	const searchParams = cleanQuery(options)
	return fmpApi.get('sec-filings-search/form-type', { searchParams }).json<FMPTypes.SecFiling[]>()
}

/**
 * Options for searching SEC filings by symbol.
 */
export interface SecFilingsBySymbolOptions extends Omit<SecFilingsDateRangeOptions, 'limit'> {
	/** The stock symbol. E.g., "AAPL". */
	symbol: string
	/** The form type to search for (e.g., "8-K", "10-K"). */
	formType?: string | null
}
/**
 * Searches SEC filings by company symbol within a date range.
 * @param options Options specifying symbol, date range, and pagination.
 * @returns A promise that resolves to an array of SEC filings.
 * @throws {Error} If symbol, 'from', or 'to' date is not provided.
 */
export async function searchSecFilingsBySymbol(
	options: SecFilingsBySymbolOptions,
): Promise<FMPTypes.SecFiling[]> {
	if (!options.symbol) {
		throw new Error('Symbol option is required for searchSecFilingsBySymbol')
	}
	if (!options.from) {
		throw new Error('From date option is required for searchSecFilingsBySymbol')
	}
	if (!options.to) {
		throw new Error('To date option is required for searchSecFilingsBySymbol')
	}
	const searchParams = cleanQuery(options)
	const result = await fmpApi
		.get('sec-filings-search/symbol', { searchParams })
		.json<FMPTypes.SecFiling[]>()
	if (!options.formType) {
		return result
	}
	return result.filter((filing) => filing.formType === options.formType)
}

/**
 * Options for searching SEC filings by CIK.
 */
export interface SecFilingsByCikOptions extends SecFilingsDateRangeOptions {
	/** The Central Index Key (CIK). E.g., "0000320193". */
	cik: string
}
/**
 * Searches SEC filings by CIK within a date range.
 * @param options Options specifying CIK, date range, and pagination.
 * @returns A promise that resolves to an array of SEC filings.
 * @throws {Error} If CIK, 'from', or 'to' date is not provided.
 */
export async function searchSecFilingsByCik(
	options: SecFilingsByCikOptions,
): Promise<FMPTypes.SecFiling[]> {
	if (!options.cik) {
		throw new Error('CIK option is required for searchSecFilingsByCik')
	}
	if (!options.from) {
		throw new Error('From date option is required for searchSecFilingsByCik')
	}
	if (!options.to) {
		throw new Error('To date option is required for searchSecFilingsByCik')
	}
	const searchParams = cleanQuery(options)
	return fmpApi.get('sec-filings-search/cik', { searchParams }).json<FMPTypes.SecFiling[]>()
}

/**
 * Searches for SEC filing company information by company name.
 * @param company The company name (e.g., "Berkshire").
 * @returns A promise that resolves to an array of SEC company search results.
 * @throws {Error} If company name is not provided.
 */
export async function searchSecFilingsCompanyName(
	company: string,
): Promise<FMPTypes.SecCompanySearchResult[]> {
	if (!company) {
		throw new Error('Company name parameter is required for searchSecFilingsCompanyName')
	}
	const searchParams = { company }
	return fmpApi
		.get('sec-filings-company-search/name', { searchParams })
		.json<FMPTypes.SecCompanySearchResult[]>()
}

/**
 * Searches for SEC filing company information by stock symbol.
 * @param symbol The stock symbol (e.g., "AAPL").
 * @returns A promise that resolves to an array of SEC company search results.
 * @throws {Error} If symbol is not provided.
 */
export async function searchSecFilingsCompanyBySymbol(
	symbol: string,
): Promise<FMPTypes.SecCompanySearchResult[]> {
	if (!symbol) {
		throw new Error('Symbol parameter is required for searchSecFilingsCompanyBySymbol')
	}
	const searchParams = { symbol }
	return fmpApi
		.get('sec-filings-company-search/symbol', { searchParams })
		.json<FMPTypes.SecCompanySearchResult[]>()
}

/**
 * Searches for SEC filing company information by CIK.
 * @param cik The Central Index Key (CIK) (e.g., "0000320193").
 * @returns A promise that resolves to an array of SEC company search results.
 * @throws {Error} If CIK is not provided.
 */
export async function searchSecFilingsCompanyByCik(
	cik: string,
): Promise<FMPTypes.SecCompanySearchResult[]> {
	if (!cik) {
		throw new Error('CIK parameter is required for searchSecFilingsCompanyByCik')
	}
	const searchParams = { cik }
	return fmpApi
		.get('sec-filings-company-search/cik', { searchParams })
		.json<FMPTypes.SecCompanySearchResult[]>()
}

/**
 * Options for retrieving SEC company full profile.
 * One of symbol or cik is required.
 */
export interface SecCompanyFullProfileOptions {
	/** The stock symbol. E.g., "AAPL". */
	symbol?: string | null
	/** The Central Index Key (CIK). E.g., "320193". */
	cik?: string | null
}
/**
 * Retrieves a full SEC company profile.
 * @param options Options specifying either symbol or CIK.
 * @returns A promise that resolves to an array containing the SEC company full profile.
 * @throws {Error} If neither symbol nor CIK is provided.
 */
export async function secCompanyFullProfile(
	options: SecCompanyFullProfileOptions,
): Promise<FMPTypes.SecCompanyFullProfile[]> {
	if (!options.symbol && !options.cik) {
		throw new Error('Either symbol or CIK parameter is required for getSecCompanyFullProfile')
	}
	const searchParams = cleanQuery(options)
	return fmpApi.get('sec-profile', { searchParams }).json<FMPTypes.SecCompanyFullProfile[]>()
}

/**
 * Options for retrieving the industry classification list.
 * One of industryTitle or sicCode is required.
 */
export interface IndustryClassificationListOptions {
	/** Filter by industry title. E.g., "SERVICES". */
	industryTitle?: string | null
	/** Filter by SIC code. E.g., "7371". */
	sicCode?: string | null
}
/**
 * Retrieves a list of industry classifications (SIC codes and titles).
 * @param options Options specifying either industryTitle or sicCode to filter.
 * @returns A promise that resolves to an array of SIC list items.
 * @throws {Error} If neither industryTitle nor sicCode is provided.
 */
export async function industryClassificationList(
	options: IndustryClassificationListOptions,
): Promise<FMPTypes.SicListItem[]> {
	if (!options.industryTitle && !options.sicCode) {
		throw new Error(
			'Either industryTitle or sicCode parameter is required for getIndustryClassificationList',
		)
	}
	const searchParams = cleanQuery(options)
	return fmpApi
		.get('standard-industrial-classification-list', { searchParams })
		.json<FMPTypes.SicListItem[]>()
}

/**
 * Options for searching industry classifications.
 * One of symbol, cik, or sicCode is required.
 */
export interface IndustryClassificationSearchOptions {
	/** Filter by stock symbol. E.g., "AAPL". */
	symbol?: string | null
	/** Filter by CIK. E.g., "320193". */
	cik?: string | null
	/** Filter by SIC code. E.g., "7371". */
	sicCode?: string | null
}
/**
 * Searches for industry classification details for companies.
 * @param options Options specifying symbol, CIK, or SIC code to filter.
 * @returns A promise that resolves to an array of industry classification search results.
 * @throws {Error} If none of symbol, CIK, or sicCode is provided.
 */
export async function searchIndustryClassification(
	options: IndustryClassificationSearchOptions,
): Promise<FMPTypes.IndustryClassificationSearchResult[]> {
	if (!options.symbol && !options.cik && !options.sicCode) {
		throw new Error(
			'One of symbol, CIK, or sicCode parameter is required for searchIndustryClassification',
		)
	}
	const searchParams = cleanQuery(options)
	return fmpApi
		.get('industry-classification-search', { searchParams })
		.json<FMPTypes.IndustryClassificationSearchResult[]>()
}

/**
 * Options for retrieving all industry classifications.
 */
export interface AllIndustryClassificationOptions extends OptionalPaginationOptions {}
/**
 * Retrieves all industry classification data for companies.
 * @param [options] Optional parameters for pagination.
 * @returns A promise that resolves to an array of industry classification search results.
 */
export async function allIndustryClassification(
	options: AllIndustryClassificationOptions = {},
): Promise<FMPTypes.IndustryClassificationSearchResult[]> {
	const searchParams = cleanQuery(options)
	return fmpApi
		.get('all-industry-classification', { searchParams })
		.json<FMPTypes.IndustryClassificationSearchResult[]>()
}

/**
 * Fetches the raw HTML/text content of an SEC filing from the SEC's EDGAR system directly — useful when you need the full filing text, unlike the structured metadata from the FMP API.
 * @param url The full URL to the SEC filing (e.g., "https://www.sec.gov/Archives/edgar/data/320193/000032019323000106/aapl-20230930.htm").
 * @returns A promise that resolves to the raw text content of the filing.
 */
export async function getSecFiling(url: string): Promise<string> {
	return getSecFilingFromEdgar(url)
}

/**
 * ========================================================================
 *           SENATE & HOUSE TRADING
 * ========================================================================
 */

/**
 * Options for retrieving latest congressional financial disclosures.
 */
export interface LatestCongressionalDisclosuresOptions extends OptionalPaginationOptions {}
/**
 * Retrieves the latest financial disclosures from U.S. Senate members.
 * @param [options] Optional parameters for pagination.
 * @returns A promise that resolves to an array of Senate financial disclosures.
 */
export async function latestSenateFinancialDisclosures(
	options: LatestCongressionalDisclosuresOptions = {},
): Promise<FMPTypes.CongressionalDisclosure[]> {
	const searchParams = cleanQuery(options)
	return fmpApi.get('senate-latest', { searchParams }).json<FMPTypes.CongressionalDisclosure[]>()
}

/**
 * Retrieves the latest financial disclosures from U.S. House members.
 * @param [options] Optional parameters for pagination.
 * @returns A promise that resolves to an array of House financial disclosures.
 */
export async function latestHouseFinancialDisclosures(
	options: LatestCongressionalDisclosuresOptions = {},
): Promise<FMPTypes.CongressionalDisclosure[]> {
	const searchParams = cleanQuery(options)
	return fmpApi.get('house-latest', { searchParams }).json<FMPTypes.CongressionalDisclosure[]>()
}

/**
 * Retrieves trading activity by U.S. Senators for a specific stock symbol.
 * @param symbol The stock symbol (e.g., "AAPL").
 * @returns A promise that resolves to an array of Senate trading activities.
 * @throws {Error} If symbol is not provided.
 */
export async function senateTradingActivity(
	symbol: string,
): Promise<FMPTypes.CongressionalDisclosure[]> {
	if (!symbol) {
		throw new Error('Symbol parameter is required for getSenateTradingActivity')
	}
	const searchParams = { symbol }
	return fmpApi.get('senate-trades', { searchParams }).json<FMPTypes.CongressionalDisclosure[]>()
}

/**
 * Retrieves trading activity by U.S. Senators filtered by Senator's name.
 * @param name The name of the Senator (e.g., "Jerry").
 * @returns A promise that resolves to an array of Senate trading activities.
 * @throws {Error} If name is not provided.
 */
export async function senateTradesByName(
	name: string,
): Promise<FMPTypes.CongressionalDisclosure[]> {
	if (!name) {
		throw new Error('Name parameter is required for getSenateTradesByName')
	}
	const searchParams = { name }
	return fmpApi
		.get('senate-trades-by-name', { searchParams })
		.json<FMPTypes.CongressionalDisclosure[]>()
}

/**
 * Retrieves trading activity by U.S. House members for a specific stock symbol.
 * @param symbol The stock symbol (e.g., "AAPL").
 * @returns A promise that resolves to an array of House trading activities.
 * @throws {Error} If symbol is not provided.
 */
export async function houseTrades(symbol: string): Promise<FMPTypes.CongressionalDisclosure[]> {
	if (!symbol) {
		throw new Error('Symbol parameter is required for getHouseTrades')
	}
	const searchParams = { symbol }
	return fmpApi.get('house-trades', { searchParams }).json<FMPTypes.CongressionalDisclosure[]>()
}

/**
 * Retrieves trading activity by U.S. House members filtered by member's name.
 * @param name The name of the House member (e.g., "James").
 * @returns A promise that resolves to an array of House trading activities.
 * @throws {Error} If name is not provided.
 */
export async function houseTradesByName(name: string): Promise<FMPTypes.CongressionalDisclosure[]> {
	if (!name) {
		throw new Error('Name parameter is required for getHouseTradesByName')
	}
	const searchParams = { name }
	return fmpApi
		.get('house-trades-by-name', { searchParams })
		.json<FMPTypes.CongressionalDisclosure[]>()
}

/**
 * ========================================================================
 *           BULK
 * ========================================================================
 */

/**
 * Retrieves company profile data in bulk.
 * @param part The part number for bulk data (0-3).
 * @returns A promise that resolves to an array of company profiles.
 * @throws {Error} If part is not provided.
 */
export async function bulkCompanyProfile(
	part: string | number,
): Promise<FMPTypes.CompanyProfile[]> {
	if (part === undefined || part === null) {
		throw new Error('Part parameter is required for getCompanyProfileBulk')
	}
	const searchParams = { part }
	const csvText = await fmpApi.get('profile-bulk', { searchParams }).text()
	const jsonData = csvToJson<FMPTypes.CompanyProfile>(csvText)
	return jsonData
}

/**
 * Retrieves company profile data in bulk as a stream.
 * @param part The part number for bulk data (0-3).
 * @returns A promise that resolves to an async iterable of company profiles.
 */
export async function bulkCompanyProfileStream(
	part: string | number,
): Promise<AsyncIterable<FMPTypes.CompanyProfile>> {
	if (part === undefined || part === null) {
		throw new Error('Part parameter is required for getCompanyProfileBulk')
	}
	const searchParams = { part }
	const response = await fmpApiStream.get('profile-bulk', { searchParams })

	if (!response.body) {
		throw new Error('Response body is null')
	}

	// ky in uses a web stream, we need to convert it to a Node stream for Papaparse
	const nodeStream = Readable.fromWeb(response.body as any)
	return csvStreamToJson<FMPTypes.CompanyProfile>(nodeStream)
}

/**
 * Retrieves stock rating data in bulk.
 * @returns A promise that resolves to an array of bulk stock ratings.
 */
export async function bulkStockRating(): Promise<FMPTypes.BulkStockRating[]> {
	const csvText = await fmpApi.get('rating-bulk').text()
	const jsonData = csvToJson<FMPTypes.BulkStockRating>(csvText)
	return jsonData
}

/**
 * Retrieves DCF valuations in bulk.
 * @returns A promise that resolves to an array of bulk DCF valuations.
 */
export async function bulkDcfValuations(): Promise<FMPTypes.BulkDcfValuation[]> {
	const csvText = await fmpApi.get('dcf-bulk').text()
	const jsonData = csvToJson<FMPTypes.BulkDcfValuation>(csvText)
	return jsonData
}

/**
 * Retrieves financial scores in bulk.
 * @returns A promise that resolves to an array of bulk financial scores.
 */
export async function bulkFinancialScores(): Promise<FMPTypes.FinancialScores[]> {
	const csvText = await fmpApi.get('scores-bulk').text()
	const jsonData = csvToJson<FMPTypes.FinancialScores>(csvText)
	return jsonData
}

/**
 * Retrieves price target summaries in bulk.
 * @returns A promise that resolves to an array of bulk price target summaries.
 */
export async function bulkPriceTargetSummary(): Promise<FMPTypes.BulkPriceTargetSummary[]> {
	const csvText = await fmpApi.get('price-target-summary-bulk').text()
	const jsonData = csvToJson<FMPTypes.BulkPriceTargetSummary>(csvText)
	return jsonData
}

/**
 * Retrieves ETF holder data in bulk.
 * @param part The part number for bulk data (0-3).
 * @returns A promise that resolves to an array of ETF fund holdings.
 * @throws {Error} If part is not provided.
 */
export async function bulkEtfHolder(part: string | number): Promise<FMPTypes.EtfFundHolding[]> {
	if (part === undefined || part === null) {
		throw new Error('Part parameter is required for getEtfHolderBulk')
	}
	const searchParams = { part }
	const csvText = await fmpApi.get('etf-holder-bulk', { searchParams }).text()
	const jsonData = csvToJson<FMPTypes.EtfFundHolding>(csvText)
	return jsonData
}

/**
 * Retrieves upgrades/downgrades consensus data in bulk.
 * @returns A promise that resolves to an array of stock grade consensus data.
 */
export async function bulkUpgradesDowngradesConsensus(): Promise<FMPTypes.StockGradeConsensus[]> {
	const csvText = await fmpApi.get('upgrades-downgrades-consensus-bulk').text()
	const jsonData = csvToJson<FMPTypes.StockGradeConsensus>(csvText)
	return jsonData
}

/**
 * Retrieves Key Metrics TTM data in bulk.
 * @returns A promise that resolves to an array of TTM key metrics.
 */
export async function bulkKeyMetricsTtm(): Promise<FMPTypes.KeyMetricsTTM[]> {
	const csvText = await fmpApi.get('key-metrics-ttm-bulk').text()
	const jsonData = csvToJson<FMPTypes.KeyMetricsTTM>(csvText)
	return jsonData
}

/**
 * Retrieves Ratios TTM data in bulk.
 * @returns A promise that resolves to an array of TTM financial ratios.
 */
export async function bulkRatiosTtm(): Promise<FMPTypes.FinancialRatiosTTM[]> {
	const csvText = await fmpApi.get('ratios-ttm-bulk').text()
	const jsonData = csvToJson<FMPTypes.FinancialRatiosTTM>(csvText)
	return jsonData
}

/**
 * Retrieves stock peers data in bulk.
 * @returns A promise that resolves to an array of bulk stock peers.
 */
export async function bulkStockPeers(): Promise<FMPTypes.BulkStockPeers[]> {
	const csvText = await fmpApi.get('peers-bulk').text()
	const jsonData = csvToJson<FMPTypes.BulkStockPeers>(csvText)
	return jsonData
}

/**
 * Retrieves earnings surprises data in bulk for a specific year.
 * @param year The year for which to retrieve earnings surprises (e.g., "YEAR" as per doc, likely YYYY format like "2023").
 * @returns A promise that resolves to an array of bulk earnings surprises.
 * @throws {Error} If year is not provided.
 */
export async function bulkEarningsSurprises(
	year: string | number,
): Promise<FMPTypes.BulkEarningsSurprise[]> {
	if (!year) {
		throw new Error('Year parameter is required for getEarningsSurprisesBulk')
	}
	const searchParams = { year }
	const csvText = await fmpApi.get('earnings-surprises-bulk', { searchParams }).text()
	const jsonData = csvToJson<FMPTypes.BulkEarningsSurprise>(csvText)
	return jsonData
}

/**
 * Options for retrieving bulk financial statements.
 */
export interface BulkFinancialStatementOptions {
	/** The year of the statements. E.g., "2023". */
	year: string | number
	/** The financial period ('Q1', 'Q2', 'Q3', 'Q4', 'FY'). */
	period: FMPTypes.FinancialPeriod
}
/**
 * Retrieves income statements in bulk for a specific year and period.
 * @param options Options specifying year and period.
 * @returns A promise that resolves to an array of income statements.
 * @throws {Error} If year or period is not provided.
 */
export async function bulkIncomeStatement(
	options: BulkFinancialStatementOptions,
): Promise<FMPTypes.IncomeStatement[]> {
	if (!options.year) {
		throw new Error('Year option is required for getIncomeStatementBulk')
	}
	if (!options.period) {
		throw new Error('Period option is required for getIncomeStatementBulk')
	}
	const searchParams = cleanQuery(options)
	const csvText = await fmpApi.get('income-statement-bulk', { searchParams }).text()
	const jsonData = csvToJson<FMPTypes.IncomeStatement>(csvText)
	return jsonData
}

/**
 * Retrieves income statement growth data in bulk for a specific year and period.
 * @param options Options specifying year and period.
 * @returns A promise that resolves to an array of income statement growth data.
 * @throws {Error} If year or period is not provided.
 */
export async function bulkIncomeStatementGrowth(
	options: BulkFinancialStatementOptions,
): Promise<FMPTypes.IncomeStatementGrowth[]> {
	if (!options.year) {
		throw new Error('Year option is required for getIncomeStatementGrowthBulk')
	}
	if (!options.period) {
		throw new Error('Period option is required for getIncomeStatementGrowthBulk')
	}
	const searchParams = cleanQuery(options)
	const csvText = await fmpApi.get('income-statement-growth-bulk', { searchParams }).text()
	const jsonData = csvToJson<FMPTypes.IncomeStatementGrowth>(csvText)
	return jsonData
}

/**
 * Retrieves balance sheet statements in bulk for a specific year and period.
 * @param options Options specifying year and period.
 * @returns A promise that resolves to an array of balance sheet statements.
 * @throws {Error} If year or period is not provided.
 */
export async function bulkBalanceSheetStatement(
	options: BulkFinancialStatementOptions,
): Promise<FMPTypes.BalanceSheetStatement[]> {
	if (!options.year) {
		throw new Error('Year option is required for getBalanceSheetStatementBulk')
	}
	if (!options.period) {
		throw new Error('Period option is required for getBalanceSheetStatementBulk')
	}
	const searchParams = cleanQuery(options)
	const csvText = await fmpApi.get('balance-sheet-statement-bulk', { searchParams }).text()
	const jsonData = csvToJson<FMPTypes.BalanceSheetStatement>(csvText)
	return jsonData
}

/**
 * Retrieves balance sheet statement growth data in bulk for a specific year and period.
 * @param options Options specifying year and period.
 * @returns A promise that resolves to an array of balance sheet statement growth data.
 * @throws {Error} If year or period is not provided.
 */
export async function bulkBalanceSheetStatementGrowth(
	options: BulkFinancialStatementOptions,
): Promise<FMPTypes.BalanceSheetStatementGrowth[]> {
	if (!options.year) {
		throw new Error('Year option is required for getBalanceSheetStatementGrowthBulk')
	}
	if (!options.period) {
		throw new Error('Period option is required for getBalanceSheetStatementGrowthBulk')
	}
	const searchParams = cleanQuery(options)
	const csvText = await fmpApi.get('balance-sheet-statement-growth-bulk', { searchParams }).text()
	const jsonData = csvToJson<FMPTypes.BalanceSheetStatementGrowth>(csvText)
	return jsonData
}

/**
 * Retrieves cash flow statements in bulk for a specific year and period.
 * @param options Options specifying year and period.
 * @returns A promise that resolves to an array of cash flow statements.
 * @throws {Error} If year or period is not provided.
 */
export async function bulkCashFlowStatement(
	options: BulkFinancialStatementOptions,
): Promise<FMPTypes.CashFlowStatement[]> {
	if (!options.year) {
		throw new Error('Year option is required for getCashFlowStatementBulk')
	}
	if (!options.period) {
		throw new Error('Period option is required for getCashFlowStatementBulk')
	}
	const searchParams = cleanQuery(options)
	const csvText = await fmpApi.get('cash-flow-statement-bulk', { searchParams }).text()
	const jsonData = csvToJson<FMPTypes.CashFlowStatement>(csvText)
	return jsonData
}

/**
 * Retrieves cash flow statement growth data in bulk for a specific year and period.
 * @param options Options specifying year and period.
 * @returns A promise that resolves to an array of cash flow statement growth data.
 * @throws {Error} If year or period is not provided.
 */
export async function bulkCashFlowStatementGrowth(
	options: BulkFinancialStatementOptions,
): Promise<FMPTypes.CashFlowStatementGrowth[]> {
	if (!options.year) {
		throw new Error('Year option is required for getCashFlowStatementGrowthBulk')
	}
	if (!options.period) {
		throw new Error('Period option is required for getCashFlowStatementGrowthBulk')
	}
	const searchParams = cleanQuery(options)
	const csvText = await fmpApi.get('cash-flow-statement-growth-bulk', { searchParams }).text()
	const jsonData = csvToJson<FMPTypes.CashFlowStatementGrowth>(csvText)
	return jsonData
}

/**
 * Retrieves end-of-day (EOD) stock price data in bulk for a specific date.
 * @param date The date for the EOD data (YYYY-MM-DD). E.g., "2024-10-22".
 * @returns A promise that resolves to an array of EOD bulk items.
 * @throws {Error} If date is not provided.
 */
export async function bulkEod(date: string): Promise<FMPTypes.EodBulkItem[]> {
	if (!date) {
		throw new Error('Date parameter is required for getEodBulk')
	}
	const searchParams = { date }
	const csvText = await fmpApi.get('eod-bulk', { searchParams }).text()
	const jsonData = csvToJson<FMPTypes.EodBulkItem>(csvText)
	return jsonData
}

/**
 * Retrieves end-of-day (EOD) stock price data in bulk as a stream for a specific date.
 * @param date The date for the EOD data (YYYY-MM-DD).
 * @returns A promise that resolves to an async iterable of EOD bulk items.
 */
export async function bulkEodStream(date: string): Promise<AsyncIterable<FMPTypes.EodBulkItem>> {
	if (!date) {
		throw new Error('Date parameter is required for getEodBulk')
	}
	const searchParams = { date }
	const response = await fmpApiStream.get('eod-bulk', { searchParams })

	if (!response.body) {
		throw new Error('Response body is null')
	}

	const nodeStream = Readable.fromWeb(response.body as any)
	return csvStreamToJson<FMPTypes.EodBulkItem>(nodeStream)
}
