import { tool } from 'ai'
import { z } from 'zod'
import * as fmp from 'fmp-sdk'

/**
 * Applies field selection to a data object or array of objects
 *
 * @param data The data to filter fields from
 * @param fieldsToSelect Optional array of field names to select
 * @returns Filtered data containing only the selected fields
 */
export function applyFieldSelection<T extends Record<string, any>>(
	data: T[] | T,
	fieldsToSelect?: readonly (keyof T)[] | null,
): Partial<T>[] | Partial<T> {
	if (!fieldsToSelect || fieldsToSelect.length === 0) {
		return data
	}

	const alwaysIncludeKeys = ['symbol', 'year', 'date'] as const

	const selectFields = (item: T): Partial<T> => {
		const result: Record<string, any> = {}

		for (const requestedKey of fieldsToSelect) {
			if (Object.prototype.hasOwnProperty.call(item, requestedKey)) {
				result[requestedKey as string] = item[requestedKey]
			}
			if ('data' in item && Object.prototype.hasOwnProperty.call(item.data, requestedKey)) {
				result[requestedKey as string] = item[requestedKey]
			}
		}

		for (const mandatoryKey of alwaysIncludeKeys) {
			if (Object.prototype.hasOwnProperty.call(item, mandatoryKey)) {
				result[mandatoryKey] = (item as Record<string, any>)[mandatoryKey]
			}
			if ('data' in item && Object.prototype.hasOwnProperty.call(item.data, mandatoryKey)) {
				result[mandatoryKey] = (item as Record<string, any>)[mandatoryKey]
			}
		}

		return result as Partial<T>
	}

	if (Array.isArray(data)) {
		return data.map(item => selectFields(item))
	}
	if (data && typeof data === 'object') {
		return selectFields(data)
	}

	return data
}

const SEARCH_SYMBOL_RESULT_VALUES = ['symbol', 'name', 'currency', 'exchangeFullName', 'exchange'] as const
export const searchSymbol = tool({
	description: 'Searches for financial instruments by symbol.',
	inputSchema: z.object({
		query: z.string().describe('The search query string (e.g., "AAPL", "MSFT").'),
		options: z.object({
			exchange: z.string().nullable().describe('The stock exchange to limit the search to (e.g., "NASDAQ", "NYSE").'),
			limit: z.number().nullable().describe('The maximum number of results to return. E.g., 50.'),
		}).optional().describe('Optional parameters to refine the search.'),
		values: z.array(z.enum(SEARCH_SYMBOL_RESULT_VALUES)).nullable().optional().describe('Specific fields to return from the results.'),
	}),
	execute: async ({ query, options, values }) => {
		try {
			const results = await fmp.searchSymbol(query, options ?? undefined)
			return applyFieldSelection(results, values)
		}
		catch (error: any) {
			console.error('Error in searchSymbolTool:', error)
			return { result: error.message || 'An unexpected error occurred in searchSymbolTool', isError: true }
		}
	},
})

const SEARCH_NAME_RESULT_VALUES = ['symbol', 'name', 'currency', 'exchangeFullName', 'exchange'] as const
export const searchName = tool({
	description: 'Searches for financial instruments by company name.',
	inputSchema: z.object({
		query: z.string().describe('The search query string (e.g., "Apple", "Microsoft").'),
		options: z.object({
			exchange: z.string().nullable().describe('The stock exchange to limit the search to (e.g., "NASDAQ", "NYSE").'),
			limit: z.number().nullable().describe('The maximum number of results to return. E.g., 50.'),
		}).optional().describe('Optional parameters to refine the search.'),
		values: z.array(z.enum(SEARCH_NAME_RESULT_VALUES)).nullable().optional().describe('Specific fields to return from the results.'),
	}),
	execute: async ({ query, options, values }) => {
		try {
			const results = await fmp.searchName(query, options ?? undefined)
			return applyFieldSelection(results, values)
		}
		catch (error: any) {
			console.error('Error in searchNameTool:', error)
			return { result: error.message || 'An unexpected error occurred in searchNameTool', isError: true }
		}
	},
})

const SEARCH_CIK_RESULT_VALUES = ['symbol', 'companyName', 'cik', 'exchangeFullName', 'exchange', 'currency'] as const
export const searchCik = tool({
	description: 'Searches for companies by CIK (Central Index Key).',
	inputSchema: z.object({
		cik: z.string().describe('The CIK number as a string (e.g., "320193").'),
		options: z.object({
			limit: z.number().nullable().describe('The maximum number of results to return. E.g., 50.'),
		}).optional().describe('Optional parameters to refine the search.'),
		values: z.array(z.enum(SEARCH_CIK_RESULT_VALUES)).nullable().optional().describe('Specific fields to return from the results.'),
	}),
	execute: async ({ cik, options, values }) => {
		try {
			const results = await fmp.searchCik(cik, options ?? undefined)
			return applyFieldSelection(results, values)
		}
		catch (error: any) {
			console.error('Error in searchCikTool:', error)
			return { result: error.message || 'An unexpected error occurred in searchCikTool', isError: true }
		}
	},
})

const SEARCH_CUSIP_RESULT_VALUES = ['symbol', 'companyName', 'cusip', 'marketCap'] as const
export const searchCusip = tool({
	description: 'Searches for financial instruments by CUSIP.',
	inputSchema: z.object({
		cusip: z.string().describe('The CUSIP identifier as a string (e.g., "037833100").'),
		values: z.array(z.enum(SEARCH_CUSIP_RESULT_VALUES)).nullable().optional().describe('Specific fields to return from the results.'),
	}),
	execute: async ({ cusip, values }) => {
		try {
			const results = await fmp.searchCusip(cusip)
			return applyFieldSelection(results, values)
		}
		catch (error: any) {
			console.error('Error in searchCusipTool:', error)
			return { result: error.message || 'An unexpected error occurred in searchCusipTool', isError: true }
		}
	},
})

const SEARCH_ISIN_RESULT_VALUES = ['symbol', 'name', 'isin', 'marketCap'] as const
export const searchIsin = tool({
	description: 'Searches for financial instruments by ISIN.',
	inputSchema: z.object({
		isin: z.string().describe('The ISIN identifier as a string (e.g., "US0378331005").'),
		values: z.array(z.enum(SEARCH_ISIN_RESULT_VALUES)).nullable().optional().describe('Specific fields to return from the results.'),
	}),
	execute: async ({ isin, values }) => {
		try {
			const results = await fmp.searchIsin(isin)
			return applyFieldSelection(results, values)
		}
		catch (error: any) {
			console.error('Error in searchIsinTool:', error)
			return { result: error.message || 'An unexpected error occurred in searchIsinTool', isError: true }
		}
	},
})

const STOCK_SCREENER_RESULT_VALUES = ['symbol', 'companyName', 'marketCap', 'sector', 'industry', 'beta', 'price', 'lastAnnualDividend', 'volume', 'exchange', 'exchangeShortName', 'country', 'isEtf', 'isFund', 'isActivelyTrading'] as const
export const stockScreener = tool({
	description: 'Screens for companies based on a wide range of financial and market criteria.',
	inputSchema: z.object({
		params: z.object({
			marketCapMoreThan: z.number().nullable().describe('Filter by market capitalization greater than this value. E.g., 1000000.'),
			marketCapLowerThan: z.number().nullable().describe('Filter by market capitalization lower than this value. E.g., 1000000000.'),
			priceMoreThan: z.number().nullable().describe('Filter by price greater than this value. E.g., 10.'),
			priceLowerThan: z.number().nullable().describe('Filter by price lower than this value. E.g., 200.'),
			betaMoreThan: z.number().nullable().describe('Filter by beta greater than this value. E.g., 0.5.'),
			betaLowerThan: z.number().nullable().describe('Filter by beta lower than this value. E.g., 1.5.'),
			volumeMoreThan: z.number().nullable().describe('Filter by volume greater than this value. E.g., 1000.'),
			volumeLowerThan: z.number().nullable().describe('Filter by volume lower than this value. E.g., 1000000.'),
			dividendMoreThan: z.number().nullable().describe('Filter by dividend yield greater than this value. E.g., 0.5.'),
			dividendLowerThan: z.number().nullable().describe('Filter by dividend yield lower than this value. E.g., 2.'),
			isEtf: z.boolean().nullable().describe('Filter for ETFs if true. E.g., false.'),
			isFund: z.boolean().nullable().describe('Filter for mutual funds if true. E.g., false.'),
			isActivelyTrading: z.boolean().nullable().describe('Filter for actively trading stocks if true. E.g., true.'),
			sector: z.string().nullable().describe('Filter by sector (e.g., "Technology", "Healthcare").'),
			industry: z.string().nullable().describe('Filter by industry (e.g., "Consumer Electronics", "Software - Application").'),
			country: z.string().nullable().describe('Filter by country (e.g., "US", "CA").'),
			exchange: z.string().nullable().describe('Filter by stock exchange (e.g., "NASDAQ", "NYSE").'),
			limit: z.number().nullable().describe('The maximum number of results to return. E.g., 1000.'),
			includeAllShareClasses: z.boolean().nullable().describe('Include all share classes if true. E.g., false.'),
		}).optional().describe('Parameters for screening stocks.'),
		values: z.array(z.enum(STOCK_SCREENER_RESULT_VALUES)).nullable().optional().describe('Specific fields to return from the results.'),
	}),
	execute: async ({ params, values }) => {
		try {
			const results = await fmp.stockScreener(params ?? undefined)
			return applyFieldSelection(results, values)
		}
		catch (error: any) {
			console.error('Error in stockScreenerTool:', error)
			return { result: error.message || 'An unexpected error occurred in stockScreenerTool', isError: true }
		}
	},
})

const SEARCH_EXCHANGE_VARIANTS_RESULT_VALUES = ['symbol', 'price', 'beta', 'volAvg', 'mktCap', 'lastDiv', 'range', 'changes', 'companyName', 'currency', 'cik', 'isin', 'cusip', 'exchange', 'exchangeShortName', 'industry', 'website', 'description', 'ceo', 'sector', 'country', 'fullTimeEmployees', 'phone', 'address', 'city', 'state', 'zip', 'dcfDiff', 'dcf', 'image', 'ipoDate', 'defaultImage', 'isEtf', 'isActivelyTrading', 'isAdr', 'isFund'] as const
export const searchExchangeVariants = tool({
	description: 'Searches for different exchange listings (variants) of a given stock symbol.',
	inputSchema: z.object({
		symbol: z.string().describe('The stock symbol (e.g., "AAPL").'),
		values: z.array(z.enum(SEARCH_EXCHANGE_VARIANTS_RESULT_VALUES)).nullable().optional().describe('Specific fields to return from the results.'),
	}),
	execute: async ({ symbol, values }) => {
		try {
			const results = await fmp.searchExchangeVariants(symbol)
			return applyFieldSelection(results, values)
		}
		catch (error: any) {
			console.error('Error in searchExchangeVariantsTool:', error)
			return { result: error.message || 'An unexpected error occurred in searchExchangeVariantsTool', isError: true }
		}
	},
})

const LIST_COMPANY_SYMBOLS_RESULT_VALUES = ['symbol', 'companyName'] as const
export const listCompanySymbols = tool({
	description: 'Retrieves a comprehensive list of company symbols.',
	inputSchema: z.object({
		values: z.array(z.enum(LIST_COMPANY_SYMBOLS_RESULT_VALUES)).nullable().optional().describe('Specific fields to return from the results.'),
	}),
	execute: async ({ values }) => {
		try {
			const results = await fmp.listCompanySymbols()
			return applyFieldSelection(results, values)
		}
		catch (error: any) {
			console.error('Error in listCompanySymbolsTool:', error)
			return { result: error.message || 'An unexpected error occurred in listCompanySymbolsTool', isError: true }
		}
	},
})

const LIST_FINANCIAL_STATEMENT_SYMBOLS_RESULT_VALUES = ['symbol', 'companyName', 'tradingCurrency', 'reportingCurrency'] as const
export const listFinancialStatementSymbols = tool({
	description: 'Retrieves a list of symbols for companies that have financial statements available.',
	inputSchema: z.object({
		values: z.array(z.enum(LIST_FINANCIAL_STATEMENT_SYMBOLS_RESULT_VALUES)).nullable().optional().describe('Specific fields to return from the results.'),
	}),
	execute: async ({ values }) => {
		try {
			const results = await fmp.listFinancialStatementSymbols()
			return applyFieldSelection(results, values)
		}
		catch (error: any) {
			console.error('Error in listFinancialStatementSymbolsTool:', error)
			return { result: error.message || 'An unexpected error occurred in listFinancialStatementSymbolsTool', isError: true }
		}
	},
})

const LIST_CIK_RESULT_VALUES = ['cik', 'companyName'] as const
export const listCik = tool({
	description: 'Retrieves a list of CIKs (Central Index Keys).',
	inputSchema: z.object({
		options: z.object({
			limit: z.number().nullable().describe('The maximum number of results to return. E.g., 50.'),
		}).optional().describe('Optional parameters.'),
		values: z.array(z.enum(LIST_CIK_RESULT_VALUES)).nullable().optional().describe('Specific fields to return from the results.'),
	}),
	execute: async ({ options, values }) => {
		try {
			const results = await fmp.listCik(options ?? undefined)
			return applyFieldSelection(results, values)
		}
		catch (error: any) {
			console.error('Error in listCikTool:', error)
			return { result: error.message || 'An unexpected error occurred in listCikTool', isError: true }
		}
	},
})

const LIST_SYMBOL_CHANGES_RESULT_VALUES = ['date', 'companyName', 'oldSymbol', 'newSymbol'] as const
export const listSymbolChanges = tool({
	description: 'Retrieves a list of stock symbol changes.',
	inputSchema: z.object({
		options: z.object({
			invalid: z.union([z.string(), z.boolean()]).nullable().describe('Filter for invalid symbols. E.g., "false".'),
			limit: z.number().nullable().describe('The maximum number of results to return. E.g., 50.'),
		}).optional().describe('Optional parameters.'),
		values: z.array(z.enum(LIST_SYMBOL_CHANGES_RESULT_VALUES)).nullable().optional().describe('Specific fields to return from the results.'),
	}),
	execute: async ({ options, values }) => {
		try {
			const results = await fmp.listSymbolChanges(options ?? undefined)
			return applyFieldSelection(results, values)
		}
		catch (error: any) {
			console.error('Error in listSymbolChangesTool:', error)
			return { result: error.message || 'An unexpected error occurred in listSymbolChangesTool', isError: true }
		}
	},
})

const LIST_ETF_SYMBOL_RESULT_VALUES = ['symbol', 'name'] as const
export const listEtfSymbol = tool({
	description: 'Retrieves a list of ETF symbols.',
	inputSchema: z.object({
		values: z.array(z.enum(LIST_ETF_SYMBOL_RESULT_VALUES)).nullable().optional().describe('Specific fields to return from the results.'),
	}),
	execute: async ({ values }) => {
		try {
			const results = await fmp.listEtfSymbol()
			return applyFieldSelection(results, values)
		}
		catch (error: any) {
			console.error('Error in listEtfSymbolTool:', error)
			return { result: error.message || 'An unexpected error occurred in listEtfSymbolTool', isError: true }
		}
	},
})

const LIST_ACTIVELY_TRADING_RESULT_VALUES = ['symbol', 'name'] as const
export const listActivelyTrading = tool({
	description: 'Retrieves a list of actively trading companies and financial instruments.',
	inputSchema: z.object({
		values: z.array(z.enum(LIST_ACTIVELY_TRADING_RESULT_VALUES)).nullable().optional().describe('Specific fields to return from the results.'),
	}),
	execute: async ({ values }) => {
		try {
			const results = await fmp.listActivelyTrading()
			return applyFieldSelection(results, values)
		}
		catch (error: any) {
			console.error('Error in listActivelyTradingTool:', error)
			return { result: error.message || 'An unexpected error occurred in listActivelyTradingTool', isError: true }
		}
	},
})

const FINANCIAL_ESTIMATES_RESULT_VALUES = ['symbol', 'date', 'revenueLow', 'revenueHigh', 'revenueAvg', 'ebitdaLow', 'ebitdaHigh', 'ebitdaAvg', 'ebitLow', 'ebitHigh', 'ebitAvg', 'netIncomeLow', 'netIncomeHigh', 'netIncomeAvg', 'sgaExpenseLow', 'sgaExpenseHigh', 'sgaExpenseAvg', 'epsAvg', 'epsHigh', 'epsLow', 'numAnalystsRevenue', 'numAnalystsEps'] as const
export const financialEstimates = tool({
	description: 'Retrieves analyst financial estimates for a given stock symbol.',
	inputSchema: z.object({
		symbol: z.string().describe('The stock symbol (e.g., "AAPL").'),
		options: z.object({
			period: z.enum(['quarter', 'annual']).describe('The reporting period, either \'annual\' or \'quarter\'.'),
			page: z.number().nullable().describe('The page number for pagination. E.g., 0.'),
			limit: z.number().nullable().describe('The maximum number of results to return. E.g., 50.'),
		}).describe('Options for period, pagination, and limit.'),
		values: z.array(z.enum(FINANCIAL_ESTIMATES_RESULT_VALUES)).nullable().optional().describe('Specific fields to return from the results.'),
	}),
	execute: async ({ symbol, options, values }) => {
		try {
			const results = await fmp.financialEstimates(symbol, options)
			return applyFieldSelection(results, values)
		}
		catch (error: any) {
			console.error('Error in financialEstimatesTool:', error)
			return { result: error.message || 'An unexpected error occurred in financialEstimatesTool', isError: true }
		}
	},
})

const RATINGS_SNAPSHOT_RESULT_VALUES = ['symbol', 'rating', 'overallScore', 'discountedCashFlowScore', 'returnOnEquityScore', 'returnOnAssetsScore', 'debtToEquityScore', 'priceToEarningsScore', 'priceToBookScore'] as const
export const ratingsSnapshot = tool({
	description: 'Retrieves a snapshot of financial ratings for a given stock symbol.',
	inputSchema: z.object({
		symbol: z.string().describe('The stock symbol (e.g., "AAPL").'),
		options: z.object({
			limit: z.number().nullable().describe('The maximum number of results to return. E.g., 50.'),
		}).optional().describe('Optional parameters.'),
		values: z.array(z.enum(RATINGS_SNAPSHOT_RESULT_VALUES)).nullable().optional().describe('Specific fields to return from the results.'),
	}),
	execute: async ({ symbol, options, values }) => {
		try {
			const results = await fmp.ratingsSnapshot(symbol, options ?? undefined)
			return applyFieldSelection(results, values)
		}
		catch (error: any) {
			console.error('Error in ratingsSnapshotTool:', error)
			return { result: error.message || 'An unexpected error occurred in ratingsSnapshotTool', isError: true }
		}
	},
})

const HISTORICAL_RATINGS_RESULT_VALUES = ['date', 'symbol', 'rating', 'overallScore', 'discountedCashFlowScore', 'returnOnEquityScore', 'returnOnAssetsScore', 'debtToEquityScore', 'priceToEarningsScore', 'priceToBookScore'] as const
export const historicalRatings = tool({
	description: 'Retrieves historical financial ratings for a given stock symbol.',
	inputSchema: z.object({
		symbol: z.string().describe('The stock symbol (e.g., "AAPL").'),
		options: z.object({
			limit: z.number().nullable().describe('The maximum number of results to return. E.g., 50.'),
		}).optional().describe('Optional parameters.'),
		values: z.array(z.enum(HISTORICAL_RATINGS_RESULT_VALUES)).nullable().optional().describe('Specific fields to return from the results.'),
	}),
	execute: async ({ symbol, options, values }) => {
		try {
			const results = await fmp.historicalRatings(symbol, options ?? undefined)
			return applyFieldSelection(results, values)
		}
		catch (error: any) {
			console.error('Error in historicalRatingsTool:', error)
			return { result: error.message || 'An unexpected error occurred in historicalRatingsTool', isError: true }
		}
	},
})

const PRICE_TARGET_SUMMARY_RESULT_VALUES = ['symbol', 'lastMonthCount', 'lastMonthAvgPriceTarget', 'lastQuarterCount', 'lastQuarterAvgPriceTarget', 'lastYearCount', 'lastYearAvgPriceTarget', 'allTimeCount', 'allTimeAvgPriceTarget', 'publishers'] as const
export const priceTargetSummary = tool({
	description: 'Retrieves a summary of analyst price targets for a given stock symbol.',
	inputSchema: z.object({
		symbol: z.string().describe('The stock symbol (e.g., "AAPL").'),
		values: z.array(z.enum(PRICE_TARGET_SUMMARY_RESULT_VALUES)).nullable().optional().describe('Specific fields to return from the results.'),
	}),
	execute: async ({ symbol, values }) => {
		try {
			const results = await fmp.priceTargetSummary(symbol)
			return applyFieldSelection(results, values)
		}
		catch (error: any) {
			console.error('Error in priceTargetSummaryTool:', error)
			return { result: error.message || 'An unexpected error occurred in priceTargetSummaryTool', isError: true }
		}
	},
})

const PRICE_TARGET_CONSENSUS_RESULT_VALUES = ['symbol', 'targetHigh', 'targetLow', 'targetConsensus', 'targetMedian'] as const
export const priceTargetConsensus = tool({
	description: 'Retrieves the consensus price targets (high, low, consensus, median) for a given stock symbol.',
	inputSchema: z.object({
		symbol: z.string().describe('The stock symbol (e.g., "AAPL").'),
		values: z.array(z.enum(PRICE_TARGET_CONSENSUS_RESULT_VALUES)).nullable().optional().describe('Specific fields to return from the results.'),
	}),
	execute: async ({ symbol, values }) => {
		try {
			const results = await fmp.priceTargetConsensus(symbol)
			return applyFieldSelection(results, values)
		}
		catch (error: any) {
			console.error('Error in priceTargetConsensusTool:', error)
			return { result: error.message || 'An unexpected error occurred in priceTargetConsensusTool', isError: true }
		}
	},
})

const PRICE_TARGET_NEWS_RESULT_VALUES = ['symbol', 'publishedDate', 'newsURL', 'newsTitle', 'analystName', 'priceTarget', 'adjPriceTarget', 'priceWhenPosted', 'newsPublisher', 'newsBaseURL', 'analystCompany'] as const
export const priceTargetNews = tool({
	description: 'Retrieves news articles related to analyst price target changes for a given stock symbol.',
	inputSchema: z.object({
		symbol: z.string().describe('The stock symbol (e.g., "AAPL").'),
		options: z.object({
			page: z.number().nullable().describe('The page number for pagination. E.g., 0.'),
			limit: z.number().nullable().describe('The maximum number of results to return. E.g., 50.'),
		}).optional().describe('Optional parameters for pagination.'),
		values: z.array(z.enum(PRICE_TARGET_NEWS_RESULT_VALUES)).nullable().optional().describe('Specific fields to return from the results.'),
	}),
	execute: async ({ symbol, options, values }) => {
		try {
			const results = await fmp.priceTargetNews(symbol, options ?? undefined)
			return applyFieldSelection(results, values)
		}
		catch (error: any) {
			console.error('Error in priceTargetNewsTool:', error)
			return { result: error.message || 'An unexpected error occurred in priceTargetNewsTool', isError: true }
		}
	},
})

const LATEST_PRICE_TARGET_NEWS_RESULT_VALUES = ['symbol', 'publishedDate', 'newsURL', 'newsTitle', 'analystName', 'priceTarget', 'adjPriceTarget', 'priceWhenPosted', 'newsPublisher', 'newsBaseURL', 'analystCompany'] as const
export const latestPriceTargetNews = tool({
	description: 'Retrieves the latest price target news across all stock symbols.',
	inputSchema: z.object({
		options: z.object({
			page: z.number().nullable().describe('The page number for pagination. E.g., 0.'),
			limit: z.number().nullable().describe('The maximum number of results to return. E.g., 50.'),
		}).optional().describe('Optional parameters for pagination.'),
		values: z.array(z.enum(LATEST_PRICE_TARGET_NEWS_RESULT_VALUES)).nullable().optional().describe('Specific fields to return from the results.'),
	}),
	execute: async ({ options, values }) => {
		try {
			const results = await fmp.latestPriceTargetNews(options ?? undefined)
			return applyFieldSelection(results, values)
		}
		catch (error: any) {
			console.error('Error in latestPriceTargetNewsTool:', error)
			return { result: error.message || 'An unexpected error occurred in latestPriceTargetNewsTool', isError: true }
		}
	},
})

const STOCK_GRADES_RESULT_VALUES = ['symbol', 'date', 'gradingCompany', 'previousGrade', 'newGrade', 'action'] as const
export const stockGrades = tool({
	description: 'Retrieves current stock grades (e.g., buy, sell, hold) from analysts for a given stock symbol.',
	inputSchema: z.object({
		symbol: z.string().describe('The stock symbol (e.g., "AAPL").'),
		values: z.array(z.enum(STOCK_GRADES_RESULT_VALUES)).nullable().optional().describe('Specific fields to return from the results.'),
	}),
	execute: async ({ symbol, values }) => {
		try {
			const results = await fmp.stockGrades(symbol)
			return applyFieldSelection(results, values)
		}
		catch (error: any) {
			console.error('Error in stockGradesTool:', error)
			return { result: error.message || 'An unexpected error occurred in stockGradesTool', isError: true }
		}
	},
})

const HISTORICAL_STOCK_GRADES_RESULT_VALUES = ['symbol', 'date', 'analystRatingsBuy', 'analystRatingsHold', 'analystRatingsSell', 'analystRatingsStrongSell'] as const
export const historicalStockGrades = tool({
	description: 'Retrieves historical stock grades for a given stock symbol. This endpoint returns a summary of buy/hold/sell counts per date.',
	inputSchema: z.object({
		symbol: z.string().describe('The stock symbol (e.g., "AAPL").'),
		options: z.object({
			limit: z.number().nullable().describe('The maximum number of results to return. E.g., 50.'),
		}).optional().describe('Optional parameters.'),
		values: z.array(z.enum(HISTORICAL_STOCK_GRADES_RESULT_VALUES)).nullable().optional().describe('Specific fields to return from the results.'),
	}),
	execute: async ({ symbol, options, values }) => {
		try {
			const results = await fmp.historicalStockGrades(symbol, options ?? undefined)
			return applyFieldSelection(results, values)
		}
		catch (error: any) {
			console.error('Error in historicalStockGradesTool:', error)
			return { result: error.message || 'An unexpected error occurred in historicalStockGradesTool', isError: true }
		}
	},
})

const STOCK_GRADE_CONSENSUS_RESULT_VALUES = ['symbol', 'strongBuy', 'buy', 'hold', 'sell', 'strongSell', 'consensus'] as const
export const stockGradeConsensus = tool({
	description: 'Retrieves a summary of analyst stock grade consensus (strong buy, buy, hold, sell, strong sell) for a given stock symbol.',
	inputSchema: z.object({
		symbol: z.string().describe('The stock symbol (e.g., "AAPL").'),
		values: z.array(z.enum(STOCK_GRADE_CONSENSUS_RESULT_VALUES)).nullable().optional().describe('Specific fields to return from the results.'),
	}),
	execute: async ({ symbol, values }) => {
		try {
			const results = await fmp.stockGradeConsensus(symbol)
			return applyFieldSelection(results, values)
		}
		catch (error: any) {
			console.error('Error in stockGradeConsensusTool:', error)
			return { result: error.message || 'An unexpected error occurred in stockGradeConsensusTool', isError: true }
		}
	},
})

const STOCK_GRADE_NEWS_RESULT_VALUES = ['symbol', 'publishedDate', 'newsURL', 'newsTitle', 'newsBaseURL', 'newsPublisher', 'newGrade', 'previousGrade', 'gradingCompany', 'action', 'priceWhenPosted'] as const
export const stockGradeNews = tool({
	description: 'Retrieves news articles related to analyst stock grade changes for a given stock symbol.',
	inputSchema: z.object({
		symbol: z.string().describe('The stock symbol (e.g., "AAPL").'),
		options: z.object({
			page: z.number().nullable().describe('The page number for pagination. E.g., 0.'),
			limit: z.number().nullable().describe('The maximum number of results to return. E.g., 50.'),
		}).optional().describe('Optional parameters for pagination.'),
		values: z.array(z.enum(STOCK_GRADE_NEWS_RESULT_VALUES)).nullable().optional().describe('Specific fields to return from the results.'),
	}),
	execute: async ({ symbol, options, values }) => {
		try {
			const results = await fmp.stockGradeNews(symbol, options ?? undefined)
			return applyFieldSelection(results, values)
		}
		catch (error: any) {
			console.error('Error in stockGradeNewsTool:', error)
			return { result: error.message || 'An unexpected error occurred in stockGradeNewsTool', isError: true }
		}
	},
})

const LATEST_STOCK_GRADE_NEWS_RESULT_VALUES = ['symbol', 'publishedDate', 'newsURL', 'newsTitle', 'newsBaseURL', 'newsPublisher', 'newGrade', 'previousGrade', 'gradingCompany', 'action', 'priceWhenPosted'] as const
export const latestStockGradeNews = tool({
	description: 'Retrieves the latest stock grade news across all stock symbols.',
	inputSchema: z.object({
		options: z.object({
			page: z.number().nullable().describe('The page number for pagination. E.g., 0.'),
			limit: z.number().nullable().describe('The maximum number of results to return. E.g., 50.'),
		}).optional().describe('Optional parameters for pagination.'),
		values: z.array(z.enum(LATEST_STOCK_GRADE_NEWS_RESULT_VALUES)).nullable().optional().describe('Specific fields to return from the results.'),
	}),
	execute: async ({ options, values }) => {
		try {
			const results = await fmp.latestStockGradeNews(options ?? undefined)
			return applyFieldSelection(results, values)
		}
		catch (error: any) {
			console.error('Error in latestStockGradeNewsTool:', error)
			return { result: error.message || 'An unexpected error occurred in latestStockGradeNewsTool', isError: true }
		}
	},
})

const COMPANY_DIVIDENDS_RESULT_VALUES = ['symbol', 'date', 'recordDate', 'paymentDate', 'declarationDate', 'adjDividend', 'dividend', 'yield', 'frequency'] as const
export const companyDividends = tool({
	description: 'Retrieves dividend history for a specific company.',
	inputSchema: z.object({
		symbol: z.string().describe('The stock symbol (e.g., "AAPL").'),
		options: z.object({
			limit: z.number().nullable().describe('The maximum number of results to return. E.g., 50.'),
		}).optional().describe('Optional parameters.'),
		values: z.array(z.enum(COMPANY_DIVIDENDS_RESULT_VALUES)).nullable().optional().describe('Specific fields to return from the results.'),
	}),
	execute: async ({ symbol, options, values }) => {
		try {
			const results = await fmp.companyDividends(symbol, options ?? undefined)
			return applyFieldSelection(results, values)
		}
		catch (error: any) {
			console.error('Error in companyDividendsTool:', error)
			return { result: error.message || 'An unexpected error occurred in companyDividendsTool', isError: true }
		}
	},
})

const DIVIDENDS_CALENDAR_RESULT_VALUES = ['symbol', 'date', 'recordDate', 'paymentDate', 'declarationDate', 'adjDividend', 'dividend', 'yield', 'frequency'] as const
export const dividendsCalendar = tool({
	description: 'Retrieves a calendar of dividend events for all stocks within a date range.',
	inputSchema: z.object({
		options: z.object({
			from: z.string().describe('Start date for the calendar (YYYY-MM-DD). E.g., "2025-01-10".'),
			to: z.string().describe('End date for the calendar (YYYY-MM-DD). E.g., "2025-04-10". Max 90-day range.'),
		}).describe('Options specifying the date range.'),
		values: z.array(z.enum(DIVIDENDS_CALENDAR_RESULT_VALUES)).nullable().optional().describe('Specific fields to return from the results.'),
	}),
	execute: async ({ options, values }) => {
		try {
			const results = await fmp.dividendsCalendar(options)
			return applyFieldSelection(results, values)
		}
		catch (error: any) {
			console.error('Error in dividendsCalendarTool:', error)
			return { result: error.message || 'An unexpected error occurred in dividendsCalendarTool', isError: true }
		}
	},
})

const COMPANY_EARNINGS_REPORTS_RESULT_VALUES = ['symbol', 'date', 'epsActual', 'epsEstimated', 'revenueActual', 'revenueEstimated', 'lastUpdated'] as const
export const companyEarningsReports = tool({
	description: 'Retrieves earnings report history for a specific company.',
	inputSchema: z.object({
		symbol: z.string().describe('The stock symbol (e.g., "AAPL").'),
		options: z.object({
			limit: z.number().nullable().describe('The maximum number of results to return. E.g., 50.'),
		}).optional().describe('Optional parameters.'),
		values: z.array(z.enum(COMPANY_EARNINGS_REPORTS_RESULT_VALUES)).nullable().optional().describe('Specific fields to return from the results.'),
	}),
	execute: async ({ symbol, options, values }) => {
		try {
			const results = await fmp.companyEarningsReports(symbol, options ?? undefined)
			return applyFieldSelection(results, values)
		}
		catch (error: any) {
			console.error('Error in companyEarningsReportsTool:', error)
			return { result: error.message || 'An unexpected error occurred in companyEarningsReportsTool', isError: true }
		}
	},
})

const EARNINGS_CALENDAR_RESULT_VALUES = ['symbol', 'date', 'epsActual', 'epsEstimated', 'revenueActual', 'revenueEstimated', 'lastUpdated'] as const
export const earningsCalendar = tool({
	description: 'Retrieves a calendar of earnings announcements for all stocks within a date range.',
	inputSchema: z.object({
		options: z.object({
			from: z.string().describe('Start date for the calendar (YYYY-MM-DD). E.g., "2025-01-10".'),
			to: z.string().describe('End date for the calendar (YYYY-MM-DD). E.g., "2025-04-10". Max 90-day range.'),
		}).describe('Options specifying the date range.'),
		values: z.array(z.enum(EARNINGS_CALENDAR_RESULT_VALUES)).nullable().optional().describe('Specific fields to return from the results.'),
	}),
	execute: async ({ options, values }) => {
		try {
			const results = await fmp.earningsCalendar(options)
			return applyFieldSelection(results, values)
		}
		catch (error: any) {
			console.error('Error in earningsCalendarTool:', error)
			return { result: error.message || 'An unexpected error occurred in earningsCalendarTool', isError: true }
		}
	},
})

const IPOS_CALENDAR_RESULT_VALUES = ['symbol', 'date', 'daa', 'company', 'exchange', 'actions', 'shares', 'priceRange', 'marketCap'] as const
export const iposCalendar = tool({
	description: 'Retrieves a calendar of upcoming Initial Public Offerings (IPOs).',
	inputSchema: z.object({
		options: z.object({
			from: z.string().describe('Start date for the calendar (YYYY-MM-DD). E.g., "2025-01-10".'),
			to: z.string().describe('End date for the calendar (YYYY-MM-DD). E.g., "2025-04-10". Max 90-day range.'),
		}).describe('Options specifying the date range.'),
		values: z.array(z.enum(IPOS_CALENDAR_RESULT_VALUES)).nullable().optional().describe('Specific fields to return from the results.'),
	}),
	execute: async ({ options, values }) => {
		try {
			const results = await fmp.iposCalendar(options)
			return applyFieldSelection(results, values)
		}
		catch (error: any) {
			console.error('Error in iposCalendarTool:', error)
			return { result: error.message || 'An unexpected error occurred in iposCalendarTool', isError: true }
		}
	},
})

const IPO_DISCLOSURES_RESULT_VALUES = ['symbol', 'filingDate', 'acceptedDate', 'effectivenessDate', 'cik', 'form', 'url'] as const
export const ipoDisclosures = tool({
	description: 'Retrieves a list of disclosure filings for upcoming IPOs.',
	inputSchema: z.object({
		options: z.object({
			from: z.string().describe('Start date for the calendar (YYYY-MM-DD). E.g., "2025-01-10".'),
			to: z.string().describe('End date for the calendar (YYYY-MM-DD). E.g., "2025-04-10". Max 90-day range.'),
		}).describe('Options specifying the date range.'),
		values: z.array(z.enum(IPO_DISCLOSURES_RESULT_VALUES)).nullable().optional().describe('Specific fields to return from the results.'),
	}),
	execute: async ({ options, values }) => {
		try {
			const results = await fmp.ipoDisclosures(options)
			return applyFieldSelection(results, values)
		}
		catch (error: any) {
			console.error('Error in ipoDisclosuresTool:', error)
			return { result: error.message || 'An unexpected error occurred in ipoDisclosuresTool', isError: true }
		}
	},
})

const IPO_PROSPECTUS_RESULT_VALUES = ['symbol', 'acceptedDate', 'filingDate', 'ipoDate', 'cik', 'pricePublicPerShare', 'pricePublicTotal', 'discountsAndCommissionsPerShare', 'discountsAndCommissionsTotal', 'proceedsBeforeExpensesPerShare', 'proceedsBeforeExpensesTotal', 'form', 'url'] as const
export const ipoProspectus = tool({
	description: 'Retrieves information on IPO prospectuses.',
	inputSchema: z.object({
		options: z.object({
			from: z.string().describe('Start date for the calendar (YYYY-MM-DD). E.g., "2025-01-10".'),
			to: z.string().describe('End date for the calendar (YYYY-MM-DD). E.g., "2025-04-10". Max 90-day range.'),
		}).describe('Options specifying the date range.'),
		values: z.array(z.enum(IPO_PROSPECTUS_RESULT_VALUES)).nullable().optional().describe('Specific fields to return from the results.'),
	}),
	execute: async ({ options, values }) => {
		try {
			const results = await fmp.ipoProspectus(options)
			return applyFieldSelection(results, values)
		}
		catch (error: any) {
			console.error('Error in ipoProspectusTool:', error)
			return { result: error.message || 'An unexpected error occurred in ipoProspectusTool', isError: true }
		}
	},
})

const STOCK_SPLIT_DETAILS_RESULT_VALUES = ['symbol', 'date', 'numerator', 'denominator'] as const
export const stockSplitDetails = tool({
	description: 'Retrieves stock split details for a specific company.',
	inputSchema: z.object({
		symbol: z.string().describe('The stock symbol (e.g., "AAPL").'),
		options: z.object({
			limit: z.number().nullable().describe('The maximum number of results to return. E.g., 50.'),
		}).optional().describe('Optional parameters.'),
		values: z.array(z.enum(STOCK_SPLIT_DETAILS_RESULT_VALUES)).nullable().optional().describe('Specific fields to return from the results.'),
	}),
	execute: async ({ symbol, options, values }) => {
		try {
			const results = await fmp.stockSplitDetails(symbol, options ?? undefined)
			return applyFieldSelection(results, values)
		}
		catch (error: any) {
			console.error('Error in stockSplitDetailsTool:', error)
			return { result: error.message || 'An unexpected error occurred in stockSplitDetailsTool', isError: true }
		}
	},
})

const STOCK_SPLITS_CALENDAR_RESULT_VALUES = ['symbol', 'date', 'numerator', 'denominator'] as const
export const stockSplitsCalendar = tool({
	description: 'Retrieves a calendar of upcoming stock splits.',
	inputSchema: z.object({
		options: z.object({
			from: z.string().describe('Start date for the calendar (YYYY-MM-DD). E.g., "2025-01-10".'),
			to: z.string().describe('End date for the calendar (YYYY-MM-DD). E.g., "2025-04-10". Max 90-day range.'),
		}).describe('Options specifying the date range.'),
		values: z.array(z.enum(STOCK_SPLITS_CALENDAR_RESULT_VALUES)).nullable().optional().describe('Specific fields to return from the results.'),
	}),
	execute: async ({ options, values }) => {
		try {
			const results = await fmp.stockSplitsCalendar(options)
			return applyFieldSelection(results, values)
		}
		catch (error: any) {
			console.error('Error in stockSplitsCalendarTool:', error)
			return { result: error.message || 'An unexpected error occurred in stockSplitsCalendarTool', isError: true }
		}
	},
})

const STOCK_CHART_FULL_RESULT_VALUES = ['symbol', 'change', 'changePercent', 'vwap', 'date', 'open', 'high', 'low', 'close', 'volume'] as const
export const stockChartFull = tool({
	description: 'Retrieves full historical end-of-day stock price and volume data.',
	inputSchema: z.object({
		symbol: z.string().describe('The stock symbol (e.g., "AAPL").'),
		options: z.object({
			from: z.string().nullable().describe('Start date for the calendar (YYYY-MM-DD). E.g., "2025-01-10".'),
			to: z.string().nullable().describe('End date for the calendar (YYYY-MM-DD). E.g., "2025-04-10". Max 90-day range.'),
		}).optional().describe('Optional date range.'),
		values: z.array(z.enum(STOCK_CHART_FULL_RESULT_VALUES)).nullable().optional().describe('Specific fields to return from the results.'),
	}),
	execute: async ({ symbol, options, values }) => {
		try {
			const results = await fmp.stockChartFull(symbol, options ?? undefined)
			return applyFieldSelection(results, values)
		}
		catch (error: any) {
			console.error('Error in stockChartFullTool:', error)
			return { result: error.message || 'An unexpected error occurred in stockChartFullTool', isError: true }
		}
	},
})

const UNADJUSTED_STOCK_CHART_RESULT_VALUES = ['symbol', 'date', 'adjOpen', 'adjHigh', 'adjLow', 'adjClose', 'volume'] as const
export const unadjustedStockChart = tool({
	description: 'Retrieves unadjusted historical end-of-day stock price data.',
	inputSchema: z.object({
		symbol: z.string().describe('The stock symbol (e.g., "AAPL").'),
		options: z.object({
			from: z.string().nullable().describe('Start date for the calendar (YYYY-MM-DD). E.g., "2025-01-10".'),
			to: z.string().nullable().describe('End date for the calendar (YYYY-MM-DD). E.g., "2025-04-10". Max 90-day range.'),
		}).optional().describe('Optional date range.'),
		values: z.array(z.enum(UNADJUSTED_STOCK_CHART_RESULT_VALUES)).nullable().optional().describe('Specific fields to return from the results.'),
	}),
	execute: async ({ symbol, options, values }) => {
		try {
			const results = await fmp.unadjustedStockChart(symbol, options ?? undefined)
			return applyFieldSelection(results, values)
		}
		catch (error: any) {
			console.error('Error in unadjustedStockChartTool:', error)
			return { result: error.message || 'An unexpected error occurred in unadjustedStockChartTool', isError: true }
		}
	},
})

const DIVIDEND_ADJUSTED_STOCK_CHART_RESULT_VALUES = ['symbol', 'date', 'adjOpen', 'adjHigh', 'adjLow', 'adjClose', 'volume'] as const
export const dividendAdjustedStockChart = tool({
	description: 'Retrieves dividend-adjusted historical end-of-day stock price data.',
	inputSchema: z.object({
		symbol: z.string().describe('The stock symbol (e.g., "AAPL").'),
		options: z.object({
			from: z.string().nullable().describe('Start date for the calendar (YYYY-MM-DD). E.g., "2025-01-10".'),
			to: z.string().nullable().describe('End date for the calendar (YYYY-MM-DD). E.g., "2025-04-10". Max 90-day range.'),
		}).optional().describe('Optional date range.'),
		values: z.array(z.enum(DIVIDEND_ADJUSTED_STOCK_CHART_RESULT_VALUES)).nullable().optional().describe('Specific fields to return from the results.'),
	}),
	execute: async ({ symbol, options, values }) => {
		try {
			const results = await fmp.dividendAdjustedStockChart(symbol, options ?? undefined)
			return applyFieldSelection(results, values)
		}
		catch (error: any) {
			console.error('Error in dividendAdjustedStockChartTool:', error)
			return { result: error.message || 'An unexpected error occurred in dividendAdjustedStockChartTool', isError: true }
		}
	},
})

const HISTORICAL_INTRADAY_CHART_RESULT_VALUES = ['date', 'open', 'high', 'low', 'close', 'volume'] as const
export const historicalIntradayChart = tool({
	description: 'Retrieves historical intraday stock chart data for a specific timeframe.',
	inputSchema: z.object({
		symbol: z.string().describe('The stock symbol (e.g., "AAPL").'),
		timeframe: z.enum(['1min', '5min', '15min', '30min', '1hour', '4hour']).describe('The intraday timeframe (\'1min\', \'5min\', \'15min\', \'30min\', \'1hour\', \'4hour\').'),
		options: z.object({
			nonadjusted: z.boolean().nullable().describe('Whether to fetch non-adjusted data. Defaults to false.'),
			from: z.string().nullable().describe('Start date for the calendar (YYYY-MM-DD). E.g., "2025-01-10".'),
			to: z.string().nullable().describe('End date for the calendar (YYYY-MM-DD). E.g., "2025-04-10". Max 90-day range.'),
		}).optional().describe('Optional date range and adjustment settings.'),
		values: z.array(z.enum(HISTORICAL_INTRADAY_CHART_RESULT_VALUES)).nullable().optional().describe('Specific fields to return from the results.'),
	}),
	execute: async ({ symbol, timeframe, options, values }) => {
		try {
			const results = await fmp.historicalIntradayChart(symbol, timeframe, options ?? undefined)
			return applyFieldSelection(results, values)
		}
		catch (error: any) {
			console.error('Error in historicalIntradayChartTool:', error)
			return { result: error.message || 'An unexpected error occurred in historicalIntradayChartTool', isError: true }
		}
	},
})

const STOCK_CHART1_MIN_RESULT_VALUES = ['date', 'open', 'high', 'low', 'close', 'volume'] as const
export const stockChart1Min = tool({
	description: 'Retrieves 1-minute interval historical stock chart data.',
	inputSchema: z.object({
		symbol: z.string().describe('The stock symbol (e.g., "AAPL").'),
		options: z.object({
			nonadjusted: z.boolean().nullable().describe('Whether to fetch non-adjusted data. Defaults to false.'),
			from: z.string().nullable().describe('Start date for the calendar (YYYY-MM-DD). E.g., "2025-01-10".'),
			to: z.string().nullable().describe('End date for the calendar (YYYY-MM-DD). E.g., "2025-04-10". Max 90-day range.'),
		}).optional().describe('Optional date range and adjustment settings.'),
		values: z.array(z.enum(STOCK_CHART1_MIN_RESULT_VALUES)).nullable().optional().describe('Specific fields to return from the results.'),
	}),
	execute: async ({ symbol, options, values }) => {
		try {
			const results = await fmp.stockChart1Min(symbol, options ?? undefined)
			return applyFieldSelection(results, values)
		}
		catch (error: any) {
			console.error('Error in stockChart1MinTool:', error)
			return { result: error.message || 'An unexpected error occurred in stockChart1MinTool', isError: true }
		}
	},
})

const STOCK_CHART5_MIN_RESULT_VALUES = ['date', 'open', 'high', 'low', 'close', 'volume'] as const
export const stockChart5Min = tool({
	description: 'Retrieves 5-minute interval historical stock chart data.',
	inputSchema: z.object({
		symbol: z.string().describe('The stock symbol (e.g., "AAPL").'),
		options: z.object({
			nonadjusted: z.boolean().nullable().describe('Whether to fetch non-adjusted data. Defaults to false.'),
			from: z.string().nullable().describe('Start date for the calendar (YYYY-MM-DD). E.g., "2025-01-10".'),
			to: z.string().nullable().describe('End date for the calendar (YYYY-MM-DD). E.g., "2025-04-10". Max 90-day range.'),
		}).optional().describe('Optional date range and adjustment settings.'),
		values: z.array(z.enum(STOCK_CHART5_MIN_RESULT_VALUES)).nullable().optional().describe('Specific fields to return from the results.'),
	}),
	execute: async ({ symbol, options, values }) => {
		try {
			const results = await fmp.stockChart5Min(symbol, options ?? undefined)
			return applyFieldSelection(results, values)
		}
		catch (error: any) {
			console.error('Error in stockChart5MinTool:', error)
			return { result: error.message || 'An unexpected error occurred in stockChart5MinTool', isError: true }
		}
	},
})

const STOCK_CHART15_MIN_RESULT_VALUES = ['date', 'open', 'high', 'low', 'close', 'volume'] as const
export const stockChart15Min = tool({
	description: 'Retrieves 15-minute interval historical stock chart data.',
	inputSchema: z.object({
		symbol: z.string().describe('The stock symbol (e.g., "AAPL").'),
		options: z.object({
			nonadjusted: z.boolean().nullable().describe('Whether to fetch non-adjusted data. Defaults to false.'),
			from: z.string().nullable().describe('Start date for the calendar (YYYY-MM-DD). E.g., "2025-01-10".'),
			to: z.string().nullable().describe('End date for the calendar (YYYY-MM-DD). E.g., "2025-04-10". Max 90-day range.'),
		}).optional().describe('Optional date range and adjustment settings.'),
		values: z.array(z.enum(STOCK_CHART15_MIN_RESULT_VALUES)).nullable().optional().describe('Specific fields to return from the results.'),
	}),
	execute: async ({ symbol, options, values }) => {
		try {
			const results = await fmp.stockChart15Min(symbol, options ?? undefined)
			return applyFieldSelection(results, values)
		}
		catch (error: any) {
			console.error('Error in stockChart15MinTool:', error)
			return { result: error.message || 'An unexpected error occurred in stockChart15MinTool', isError: true }
		}
	},
})

const STOCK_CHART30_MIN_RESULT_VALUES = ['date', 'open', 'high', 'low', 'close', 'volume'] as const
export const stockChart30Min = tool({
	description: 'Retrieves 30-minute interval historical stock chart data.',
	inputSchema: z.object({
		symbol: z.string().describe('The stock symbol (e.g., "AAPL").'),
		options: z.object({
			nonadjusted: z.boolean().nullable().describe('Whether to fetch non-adjusted data. Defaults to false.'),
			from: z.string().nullable().describe('Start date for the calendar (YYYY-MM-DD). E.g., "2025-01-10".'),
			to: z.string().nullable().describe('End date for the calendar (YYYY-MM-DD). E.g., "2025-04-10". Max 90-day range.'),
		}).optional().describe('Optional date range and adjustment settings.'),
		values: z.array(z.enum(STOCK_CHART30_MIN_RESULT_VALUES)).nullable().optional().describe('Specific fields to return from the results.'),
	}),
	execute: async ({ symbol, options, values }) => {
		try {
			const results = await fmp.stockChart30Min(symbol, options ?? undefined)
			return applyFieldSelection(results, values)
		}
		catch (error: any) {
			console.error('Error in stockChart30MinTool:', error)
			return { result: error.message || 'An unexpected error occurred in stockChart30MinTool', isError: true }
		}
	},
})

const STOCK_CHART1_HOUR_RESULT_VALUES = ['date', 'open', 'high', 'low', 'close', 'volume'] as const
export const stockChart1Hour = tool({
	description: 'Retrieves 1-hour interval historical stock chart data.',
	inputSchema: z.object({
		symbol: z.string().describe('The stock symbol (e.g., "AAPL").'),
		options: z.object({
			nonadjusted: z.boolean().nullable().describe('Whether to fetch non-adjusted data. Defaults to false.'),
			from: z.string().nullable().describe('Start date for the calendar (YYYY-MM-DD). E.g., "2025-01-10".'),
			to: z.string().nullable().describe('End date for the calendar (YYYY-MM-DD). E.g., "2025-04-10". Max 90-day range.'),
		}).optional().describe('Optional date range and adjustment settings.'),
		values: z.array(z.enum(STOCK_CHART1_HOUR_RESULT_VALUES)).nullable().optional().describe('Specific fields to return from the results.'),
	}),
	execute: async ({ symbol, options, values }) => {
		try {
			const results = await fmp.stockChart1Hour(symbol, options ?? undefined)
			return applyFieldSelection(results, values)
		}
		catch (error: any) {
			console.error('Error in stockChart1HourTool:', error)
			return { result: error.message || 'An unexpected error occurred in stockChart1HourTool', isError: true }
		}
	},
})

const STOCK_CHART4_HOUR_RESULT_VALUES = ['date', 'open', 'high', 'low', 'close', 'volume'] as const
export const stockChart4Hour = tool({
	description: 'Retrieves 4-hour interval historical stock chart data.',
	inputSchema: z.object({
		symbol: z.string().describe('The stock symbol (e.g., "AAPL").'),
		options: z.object({
			nonadjusted: z.boolean().nullable().describe('Whether to fetch non-adjusted data. Defaults to false.'),
			from: z.string().nullable().describe('Start date for the calendar (YYYY-MM-DD). E.g., "2025-01-10".'),
			to: z.string().nullable().describe('End date for the calendar (YYYY-MM-DD). E.g., "2025-04-10". Max 90-day range.'),
		}).optional().describe('Optional date range and adjustment settings.'),
		values: z.array(z.enum(STOCK_CHART4_HOUR_RESULT_VALUES)).nullable().optional().describe('Specific fields to return from the results.'),
	}),
	execute: async ({ symbol, options, values }) => {
		try {
			const results = await fmp.stockChart4Hour(symbol, options ?? undefined)
			return applyFieldSelection(results, values)
		}
		catch (error: any) {
			console.error('Error in stockChart4HourTool:', error)
			return { result: error.message || 'An unexpected error occurred in stockChart4HourTool', isError: true }
		}
	},
})

const COMPANY_PROFILE_RESULT_VALUES = ['symbol', 'price', 'marketCap', 'beta', 'lastDividend', 'range', 'change', 'changePercentage', 'volume', 'averageVolume', 'companyName', 'currency', 'cik', 'isin', 'cusip', 'exchangeFullName', 'exchange', 'industry', 'website', 'description', 'ceo', 'sector', 'country', 'fullTimeEmployees', 'phone', 'address', 'city', 'state', 'zip', 'image', 'ipoDate', 'defaultImage', 'isEtf', 'isActivelyTrading', 'isAdr', 'isFund'] as const
export const companyProfile = tool({
	description: 'Retrieves detailed company profile data for a given stock symbol.',
	inputSchema: z.object({
		symbol: z.string().describe('The stock symbol (e.g., "AAPL").'),
		values: z.array(z.enum(COMPANY_PROFILE_RESULT_VALUES)).nullable().optional().describe('Specific fields to return from the results.'),
	}),
	execute: async ({ symbol, values }) => {
		try {
			const results = await fmp.companyProfile(symbol)
			return applyFieldSelection(results, values)
		}
		catch (error: any) {
			console.error('Error in companyProfileTool:', error)
			return { result: error.message || 'An unexpected error occurred in companyProfileTool', isError: true }
		}
	},
})

const COMPANY_PROFILE_BY_CIK_RESULT_VALUES = ['symbol', 'price', 'marketCap', 'beta', 'lastDividend', 'range', 'change', 'changePercentage', 'volume', 'averageVolume', 'companyName', 'currency', 'cik', 'isin', 'cusip', 'exchangeFullName', 'exchange', 'industry', 'website', 'description', 'ceo', 'sector', 'country', 'fullTimeEmployees', 'phone', 'address', 'city', 'state', 'zip', 'image', 'ipoDate', 'defaultImage', 'isEtf', 'isActivelyTrading', 'isAdr', 'isFund'] as const
export const companyProfileByCik = tool({
	description: 'Retrieves detailed company profile data by CIK.',
	inputSchema: z.object({
		cik: z.string().describe('The Central Index Key (CIK) of the company (e.g., "320193").'),
		values: z.array(z.enum(COMPANY_PROFILE_BY_CIK_RESULT_VALUES)).nullable().optional().describe('Specific fields to return from the results.'),
	}),
	execute: async ({ cik, values }) => {
		try {
			const results = await fmp.companyProfileByCik(cik)
			return applyFieldSelection(results, values)
		}
		catch (error: any) {
			console.error('Error in companyProfileByCikTool:', error)
			return { result: error.message || 'An unexpected error occurred in companyProfileByCikTool', isError: true }
		}
	},
})

const COMPANY_NOTES_RESULT_VALUES = ['cik', 'symbol', 'title', 'exchange'] as const
export const companyNotes = tool({
	description: 'Retrieves information about company-issued notes for a given stock symbol.',
	inputSchema: z.object({
		symbol: z.string().describe('The stock symbol (e.g., "AAPL").'),
		values: z.array(z.enum(COMPANY_NOTES_RESULT_VALUES)).nullable().optional().describe('Specific fields to return from the results.'),
	}),
	execute: async ({ symbol, values }) => {
		try {
			const results = await fmp.companyNotes(symbol)
			return applyFieldSelection(results, values)
		}
		catch (error: any) {
			console.error('Error in companyNotesTool:', error)
			return { result: error.message || 'An unexpected error occurred in companyNotesTool', isError: true }
		}
	},
})

const STOCK_PEERS_RESULT_VALUES = ['symbol', 'companyName', 'price', 'mktCap'] as const
export const stockPeers = tool({
	description: 'Retrieves a list of peer companies for a given stock symbol.',
	inputSchema: z.object({
		symbol: z.string().describe('The stock symbol (e.g., "AAPL").'),
		values: z.array(z.enum(STOCK_PEERS_RESULT_VALUES)).nullable().optional().describe('Specific fields to return from the results.'),
	}),
	execute: async ({ symbol, values }) => {
		try {
			const results = await fmp.stockPeers(symbol)
			return applyFieldSelection(results, values)
		}
		catch (error: any) {
			console.error('Error in stockPeersTool:', error)
			return { result: error.message || 'An unexpected error occurred in stockPeersTool', isError: true }
		}
	},
})

const DELISTED_COMPANIES_RESULT_VALUES = ['symbol', 'companyName', 'exchange', 'ipoDate', 'delistedDate'] as const
export const delistedCompanies = tool({
	description: 'Retrieves a list of delisted companies.',
	inputSchema: z.object({
		options: z.object({
			page: z.number().nullable().describe('The page number for pagination. E.g., 0.'),
			limit: z.number().nullable().describe('The maximum number of results to return. E.g., 50.'),
		}).optional().describe('Optional parameters for pagination.'),
		values: z.array(z.enum(DELISTED_COMPANIES_RESULT_VALUES)).nullable().optional().describe('Specific fields to return from the results.'),
	}),
	execute: async ({ options, values }) => {
		try {
			const results = await fmp.delistedCompanies(options ?? undefined)
			return applyFieldSelection(results, values)
		}
		catch (error: any) {
			console.error('Error in delistedCompaniesTool:', error)
			return { result: error.message || 'An unexpected error occurred in delistedCompaniesTool', isError: true }
		}
	},
})

const COMPANY_EMPLOYEE_COUNT_RESULT_VALUES = ['symbol', 'cik', 'acceptanceTime', 'periodOfReport', 'companyName', 'formType', 'filingDate', 'employeeCount', 'source'] as const
export const companyEmployeeCount = tool({
	description: 'Retrieves employee count information for a given company.',
	inputSchema: z.object({
		symbol: z.string().describe('The stock symbol (e.g., "AAPL").'),
		options: z.object({
			limit: z.number().nullable().describe('The maximum number of results to return. E.g., 50.'),
		}).optional().describe('Optional parameters.'),
		values: z.array(z.enum(COMPANY_EMPLOYEE_COUNT_RESULT_VALUES)).nullable().optional().describe('Specific fields to return from the results.'),
	}),
	execute: async ({ symbol, options, values }) => {
		try {
			const results = await fmp.companyEmployeeCount(symbol, options ?? undefined)
			return applyFieldSelection(results, values)
		}
		catch (error: any) {
			console.error('Error in companyEmployeeCountTool:', error)
			return { result: error.message || 'An unexpected error occurred in companyEmployeeCountTool', isError: true }
		}
	},
})

const HISTORICAL_COMPANY_EMPLOYEE_COUNT_RESULT_VALUES = ['symbol', 'cik', 'acceptanceTime', 'periodOfReport', 'companyName', 'formType', 'filingDate', 'employeeCount', 'source'] as const
export const historicalCompanyEmployeeCount = tool({
	description: 'Retrieves historical employee count data for a given company.',
	inputSchema: z.object({
		symbol: z.string().describe('The stock symbol (e.g., "AAPL").'),
		options: z.object({
			limit: z.number().nullable().describe('The maximum number of results to return. E.g., 50.'),
		}).optional().describe('Optional parameters (same as CompanyEmployeeCountOptions).'),
		values: z.array(z.enum(HISTORICAL_COMPANY_EMPLOYEE_COUNT_RESULT_VALUES)).nullable().optional().describe('Specific fields to return from the results.'),
	}),
	execute: async ({ symbol, options, values }) => {
		try {
			const results = await fmp.historicalCompanyEmployeeCount(symbol, options ?? undefined)
			return applyFieldSelection(results, values)
		}
		catch (error: any) {
			console.error('Error in historicalCompanyEmployeeCountTool:', error)
			return { result: error.message || 'An unexpected error occurred in historicalCompanyEmployeeCountTool', isError: true }
		}
	},
})

const COMPANY_MARKET_CAP_RESULT_VALUES = ['symbol', 'date', 'marketCap'] as const
export const companyMarketCap = tool({
	description: 'Retrieves the market capitalization for a specific company on the current date.',
	inputSchema: z.object({
		symbol: z.string().describe('The stock symbol (e.g., "AAPL").'),
		values: z.array(z.enum(COMPANY_MARKET_CAP_RESULT_VALUES)).nullable().optional().describe('Specific fields to return from the results.'),
	}),
	execute: async ({ symbol, values }) => {
		try {
			const results = await fmp.companyMarketCap(symbol)
			return applyFieldSelection(results, values)
		}
		catch (error: any) {
			console.error('Error in companyMarketCapTool:', error)
			return { result: error.message || 'An unexpected error occurred in companyMarketCapTool', isError: true }
		}
	},
})

const BATCH_MARKET_CAP_RESULT_VALUES = ['symbol', 'date', 'marketCap'] as const
export const batchMarketCap = tool({
	description: 'Retrieves market capitalization data for multiple companies in a single request.',
	inputSchema: z.object({
		symbols: z.array(z.string()).describe('An array of stock symbols (e.g., ["AAPL", "MSFT", "GOOG"]).'),
		values: z.array(z.enum(BATCH_MARKET_CAP_RESULT_VALUES)).nullable().optional().describe('Specific fields to return from the results.'),
	}),
	execute: async ({ symbols, values }) => {
		try {
			const results = await fmp.batchMarketCap(symbols)
			return applyFieldSelection(results, values)
		}
		catch (error: any) {
			console.error('Error in batchMarketCapTool:', error)
			return { result: error.message || 'An unexpected error occurred in batchMarketCapTool', isError: true }
		}
	},
})

const HISTORICAL_MARKET_CAP_RESULT_VALUES = ['symbol', 'date', 'marketCap'] as const
export const historicalMarketCap = tool({
	description: 'Retrieves historical market capitalization data for a company.',
	inputSchema: z.object({
		symbol: z.string().describe('The stock symbol (e.g., "AAPL").'),
		options: z.object({
			limit: z.number().nullable().describe('The maximum number of results to return. E.g., 50.'),
			from: z.string().nullable().describe('Start date for the calendar (YYYY-MM-DD). E.g., "2025-01-10".'),
			to: z.string().nullable().describe('End date for the calendar (YYYY-MM-DD). E.g., "2025-04-10". Max 90-day range.'),
		}).optional().describe('Optional parameters for limit and date range.'),
		values: z.array(z.enum(HISTORICAL_MARKET_CAP_RESULT_VALUES)).nullable().optional().describe('Specific fields to return from the results.'),
	}),
	execute: async ({ symbol, options, values }) => {
		try {
			const results = await fmp.historicalMarketCap(symbol, options ?? undefined)
			return applyFieldSelection(results, values)
		}
		catch (error: any) {
			console.error('Error in historicalMarketCapTool:', error)
			return { result: error.message || 'An unexpected error occurred in historicalMarketCapTool', isError: true }
		}
	},
})

const COMPANY_SHARES_FLOAT_RESULT_VALUES = ['symbol', 'date', 'freeFloat', 'floatShares', 'outstandingShares'] as const
export const companySharesFloat = tool({
	description: 'Retrieves share float and liquidity data for a company.',
	inputSchema: z.object({
		symbol: z.string().describe('The stock symbol (e.g., "AAPL").'),
		values: z.array(z.enum(COMPANY_SHARES_FLOAT_RESULT_VALUES)).nullable().optional().describe('Specific fields to return from the results.'),
	}),
	execute: async ({ symbol, values }) => {
		try {
			const results = await fmp.companySharesFloat(symbol)
			return applyFieldSelection(results, values)
		}
		catch (error: any) {
			console.error('Error in companySharesFloatTool:', error)
			return { result: error.message || 'An unexpected error occurred in companySharesFloatTool', isError: true }
		}
	},
})

const ALL_SHARES_FLOAT_RESULT_VALUES = ['symbol', 'date', 'freeFloat', 'floatShares', 'outstandingShares'] as const
export const allSharesFloat = tool({
	description: 'Retrieves shares float data for all available companies.',
	inputSchema: z.object({
		options: z.object({
			page: z.number().nullable().describe('The page number for pagination. E.g., 0.'),
			limit: z.number().nullable().describe('The maximum number of results to return. E.g., 50.'),
		}).optional().describe('Optional parameters for pagination.'),
		values: z.array(z.enum(ALL_SHARES_FLOAT_RESULT_VALUES)).nullable().optional().describe('Specific fields to return from the results.'),
	}),
	execute: async ({ options, values }) => {
		try {
			const results = await fmp.allSharesFloat(options ?? undefined)
			return applyFieldSelection(results, values)
		}
		catch (error: any) {
			console.error('Error in allSharesFloatTool:', error)
			return { result: error.message || 'An unexpected error occurred in allSharesFloatTool', isError: true }
		}
	},
})

const LATEST_MERGERS_ACQUISITIONS_RESULT_VALUES = ['symbol', 'companyName', 'cik', 'targetedCompanyName', 'targetedCik', 'targetedSymbol', 'transactionDate', 'acceptedDate', 'link'] as const
export const latestMergersAcquisitions = tool({
	description: 'Retrieves the latest mergers and acquisitions data.',
	inputSchema: z.object({
		options: z.object({
			page: z.number().nullable().describe('The page number for pagination. E.g., 0.'),
			limit: z.number().nullable().describe('The maximum number of results to return. E.g., 50.'),
		}).optional().describe('Optional parameters for pagination.'),
		values: z.array(z.enum(LATEST_MERGERS_ACQUISITIONS_RESULT_VALUES)).nullable().optional().describe('Specific fields to return from the results.'),
	}),
	execute: async ({ options, values }) => {
		try {
			const results = await fmp.latestMergersAcquisitions(options ?? undefined)
			return applyFieldSelection(results, values)
		}
		catch (error: any) {
			console.error('Error in latestMergersAcquisitionsTool:', error)
			return { result: error.message || 'An unexpected error occurred in latestMergersAcquisitionsTool', isError: true }
		}
	},
})

const SEARCH_MERGERS_ACQUISITIONS_RESULT_VALUES = ['symbol', 'companyName', 'cik', 'targetedCompanyName', 'targetedCik', 'targetedSymbol', 'transactionDate', 'acceptedDate', 'link'] as const
export const searchMergersAcquisitions = tool({
	description: 'Searches for mergers and acquisitions data by name.',
	inputSchema: z.object({
		name: z.string().describe('The name to search for (e.g., "Apple").'),
		values: z.array(z.enum(SEARCH_MERGERS_ACQUISITIONS_RESULT_VALUES)).nullable().optional().describe('Specific fields to return from the results.'),
	}),
	execute: async ({ name, values }) => {
		try {
			const results = await fmp.searchMergersAcquisitions(name)
			return applyFieldSelection(results, values)
		}
		catch (error: any) {
			console.error('Error in searchMergersAcquisitionsTool:', error)
			return { result: error.message || 'An unexpected error occurred in searchMergersAcquisitionsTool', isError: true }
		}
	},
})

const COMPANY_EXECUTIVES_RESULT_VALUES = ['title', 'name', 'pay', 'currencyPay', 'gender', 'yearBorn', 'active'] as const
export const companyExecutives = tool({
	description: 'Retrieves information on company executives for a given stock symbol.',
	inputSchema: z.object({
		symbol: z.string().describe('The stock symbol (e.g., "AAPL").'),
		options: z.object({
			active: z.union([z.string(), z.boolean()]).nullable().describe('Filter for active executives if "true". E.g., "true".'),
		}).optional().describe('Optional parameters.'),
		values: z.array(z.enum(COMPANY_EXECUTIVES_RESULT_VALUES)).nullable().optional().describe('Specific fields to return from the results.'),
	}),
	execute: async ({ symbol, options, values }) => {
		try {
			const results = await fmp.companyExecutives(symbol, options ?? undefined)
			return applyFieldSelection(results, values)
		}
		catch (error: any) {
			console.error('Error in companyExecutivesTool:', error)
			return { result: error.message || 'An unexpected error occurred in companyExecutivesTool', isError: true }
		}
	},
})

const EXECUTIVE_COMPENSATION_RESULT_VALUES = ['cik', 'symbol', 'companyName', 'filingDate', 'acceptedDate', 'nameAndPosition', 'year', 'salary', 'bonus', 'stockAward', 'optionAward', 'incentivePlanCompensation', 'allOtherCompensation', 'total', 'link'] as const
export const executiveCompensation = tool({
	description: 'Retrieves executive compensation data for a given stock symbol.',
	inputSchema: z.object({
		symbol: z.string().describe('The stock symbol (e.g., "AAPL").'),
		values: z.array(z.enum(EXECUTIVE_COMPENSATION_RESULT_VALUES)).nullable().optional().describe('Specific fields to return from the results.'),
	}),
	execute: async ({ symbol, values }) => {
		try {
			const results = await fmp.executiveCompensation(symbol)
			return applyFieldSelection(results, values)
		}
		catch (error: any) {
			console.error('Error in executiveCompensationTool:', error)
			return { result: error.message || 'An unexpected error occurred in executiveCompensationTool', isError: true }
		}
	},
})

const EXECUTIVE_COMPENSATION_BENCHMARK_RESULT_VALUES = ['industryTitle', 'year', 'averageCompensation'] as const
export const executiveCompensationBenchmark = tool({
	description: 'Retrieves average executive compensation data across various industries for a specific year.',
	inputSchema: z.object({
		year: z.union([z.string(), z.number()]).describe('The year to retrieve benchmark data for (e.g., "2024").'),
		values: z.array(z.enum(EXECUTIVE_COMPENSATION_BENCHMARK_RESULT_VALUES)).nullable().optional().describe('Specific fields to return from the results.'),
	}),
	execute: async ({ year, values }) => {
		try {
			const results = await fmp.executiveCompensationBenchmark(year)
			return applyFieldSelection(results, values)
		}
		catch (error: any) {
			console.error('Error in executiveCompensationBenchmarkTool:', error)
			return { result: error.message || 'An unexpected error occurred in executiveCompensationBenchmarkTool', isError: true }
		}
	},
})

const COT_REPORT_RESULT_VALUES = ['symbol', 'date', 'name', 'sector', 'marketAndExchangeNames', 'cftcContractMarketCode', 'cftcMarketCode', 'cftcRegionCode', 'cftcCommodityCode', 'openInterestAll', 'noncommPositionsLongAll', 'noncommPositionsShortAll', 'noncommPositionsSpreadAll', 'commPositionsLongAll', 'commPositionsShortAll', 'totReptPositionsLongAll', 'totReptPositionsShortAll', 'nonreptPositionsLongAll', 'nonreptPositionsShortAll', 'openInterestOld', 'noncommPositionsLongOld', 'noncommPositionsShortOld', 'noncommPositionsSpreadOld', 'commPositionsLongOld', 'commPositionsShortOld', 'totReptPositionsLongOld', 'totReptPositionsShortOld', 'nonreptPositionsLongOld', 'nonreptPositionsShortOld', 'openInterestOther', 'noncommPositionsLongOther', 'noncommPositionsShortOther', 'noncommPositionsSpreadOther', 'commPositionsLongOther', 'commPositionsShortOther', 'totReptPositionsLongOther', 'totReptPositionsShortOther', 'nonreptPositionsLongOther', 'nonreptPositionsShortOther', 'changeInOpenInterestAll', 'changeInNoncommLongAll', 'changeInNoncommShortAll', 'changeInNoncommSpeadAll', 'changeInCommLongAll', 'changeInCommShortAll', 'changeInTotReptLongAll', 'changeInTotReptShortAll', 'changeInNonreptLongAll', 'changeInNonreptShortAll', 'pctOfOpenInterestAll', 'pctOfOiNoncommLongAll', 'pctOfOiNoncommShortAll', 'pctOfOiNoncommSpreadAll', 'pctOfOiCommLongAll', 'pctOfOiCommShortAll', 'pctOfOiTotReptLongAll', 'pctOfOiTotReptShortAll', 'pctOfOiNonreptLongAll', 'pctOfOiNonreptShortAll', 'pctOfOpenInterestOl', 'pctOfOiNoncommLongOl', 'pctOfOiNoncommShortOl', 'pctOfOiNoncommSpreadOl', 'pctOfOiCommLongOl', 'pctOfOiCommShortOl', 'pctOfOiTotReptLongOl', 'pctOfOiTotReptShortOl', 'pctOfOiNonreptLongOl', 'pctOfOiNonreptShortOl', 'pctOfOpenInterestOther', 'pctOfOiNoncommLongOther', 'pctOfOiNoncommShortOther', 'pctOfOiNoncommSpreadOther', 'pctOfOiCommLongOther', 'pctOfOiCommShortOther', 'pctOfOiTotReptLongOther', 'pctOfOiTotReptShortOther', 'pctOfOiNonreptLongOther', 'pctOfOiNonreptShortOther', 'tradersTotAll', 'tradersNoncommLongAll', 'tradersNoncommShortAll', 'tradersNoncommSpreadAll', 'tradersCommLongAll', 'tradersCommShortAll', 'tradersTotReptLongAll', 'tradersTotReptShortAll', 'tradersTotOl', 'tradersNoncommLongOl', 'tradersNoncommShortOl', 'tradersNoncommSpeadOl', 'tradersCommLongOl', 'tradersCommShortOl', 'tradersTotReptLongOl', 'tradersTotReptShortOl', 'tradersTotOther', 'tradersNoncommLongOther', 'tradersNoncommShortOther', 'tradersNoncommSpreadOther', 'tradersCommLongOther', 'tradersCommShortOther', 'tradersTotReptLongOther', 'tradersTotReptShortOther', 'concGrossLe4TdrLongAll', 'concGrossLe4TdrShortAll', 'concGrossLe8TdrLongAll', 'concGrossLe8TdrShortAll', 'concNetLe4TdrLongAll', 'concNetLe4TdrShortAll', 'concNetLe8TdrLongAll', 'concNetLe8TdrShortAll', 'concGrossLe4TdrLongOl', 'concGrossLe4TdrShortOl', 'concGrossLe8TdrLongOl', 'concGrossLe8TdrShortOl', 'concNetLe4TdrLongOl', 'concNetLe4TdrShortOl', 'concNetLe8TdrLongOl', 'concNetLe8TdrShortOl', 'concGrossLe4TdrLongOther', 'concGrossLe4TdrShortOther', 'concGrossLe8TdrLongOther', 'concGrossLe8TdrShortOther', 'concNetLe4TdrLongOther', 'concNetLe4TdrShortOther', 'concNetLe8TdrLongOther', 'concNetLe8TdrShortOther', 'contractUnits'] as const
export const cotReport = tool({
	description: 'Retrieves Commitment of Traders (COT) reports.',
	inputSchema: z.object({
		options: z.object({
			symbol: z.string().nullable().describe('The symbol for the report (e.g., "AAPL", "KC").'),
			from: z.string().nullable().describe('Start date for the calendar (YYYY-MM-DD). E.g., "2025-01-10".'),
			to: z.string().nullable().describe('End date for the calendar (YYYY-MM-DD). E.g., "2025-04-10". Max 90-day range.'),
		}).optional().describe('Optional parameters to filter reports by symbol and date range.'),
		values: z.array(z.enum(COT_REPORT_RESULT_VALUES)).nullable().optional().describe('Specific fields to return from the results.'),
	}),
	execute: async ({ options, values }) => {
		try {
			const results = await fmp.cotReport(options ?? undefined)
			return applyFieldSelection(results, values)
		}
		catch (error: any) {
			console.error('Error in cotReportTool:', error)
			return { result: error.message || 'An unexpected error occurred in cotReportTool', isError: true }
		}
	},
})

const COT_ANALYSIS_RESULT_VALUES = ['symbol', 'date', 'name', 'sector', 'exchange', 'currentLongMarketSituation', 'currentShortMarketSituation', 'marketSituation', 'previousLongMarketSituation', 'previousShortMarketSituation', 'previousMarketSituation', 'netPosition', 'previousNetPosition', 'changeInNetPosition', 'marketSentiment', 'reversalTrend'] as const
export const cotAnalysis = tool({
	description: 'Retrieves analysis of Commitment of Traders (COT) reports for a specific date range.',
	inputSchema: z.object({
		options: z.object({
			symbol: z.string().nullable().describe('The symbol for the analysis (e.g., "AAPL", "B6").'),
			from: z.string().nullable().describe('Start date for the calendar (YYYY-MM-DD). E.g., "2025-01-10".'),
			to: z.string().nullable().describe('End date for the calendar (YYYY-MM-DD). E.g., "2025-04-10". Max 90-day range.'),
		}).optional().describe('Optional parameters to filter analysis by symbol and date range.'),
		values: z.array(z.enum(COT_ANALYSIS_RESULT_VALUES)).nullable().optional().describe('Specific fields to return from the results.'),
	}),
	execute: async ({ options, values }) => {
		try {
			const results = await fmp.cotAnalysis(options ?? undefined)
			return applyFieldSelection(results, values)
		}
		catch (error: any) {
			console.error('Error in cotAnalysisTool:', error)
			return { result: error.message || 'An unexpected error occurred in cotAnalysisTool', isError: true }
		}
	},
})

const COT_REPORT_LIST_RESULT_VALUES = ['symbol', 'name'] as const
export const cotReportList = tool({
	description: 'Retrieves a list of available Commitment of Traders (COT) report symbols.',
	inputSchema: z.object({
		values: z.array(z.enum(COT_REPORT_LIST_RESULT_VALUES)).nullable().optional().describe('Specific fields to return from the results.'),
	}),
	execute: async ({ values }) => {
		try {
			const results = await fmp.cotReportList()
			return applyFieldSelection(results, values)
		}
		catch (error: any) {
			console.error('Error in cotReportListTool:', error)
			return { result: error.message || 'An unexpected error occurred in cotReportListTool', isError: true }
		}
	},
})

const DCF_VALUATION_RESULT_VALUES = ['symbol', 'date', 'dcf', 'Stock Price'] as const
export const dcfValuation = tool({
	description: 'Retrieves a Discounted Cash Flow (DCF) valuation for a company.',
	inputSchema: z.object({
		symbol: z.string().describe('The stock symbol (e.g., "AAPL").'),
		values: z.array(z.enum(DCF_VALUATION_RESULT_VALUES)).nullable().optional().describe('Specific fields to return from the results.'),
	}),
	execute: async ({ symbol, values }) => {
		try {
			const results = await fmp.dcfValuation(symbol)
			return applyFieldSelection(results, values)
		}
		catch (error: any) {
			console.error('Error in dcfValuationTool:', error)
			return { result: error.message || 'An unexpected error occurred in dcfValuationTool', isError: true }
		}
	},
})

const LEVERED_DCF_VALUATION_RESULT_VALUES = ['symbol', 'date', 'dcf', 'Stock Price'] as const
export const leveredDcfValuation = tool({
	description: 'Retrieves a Levered Discounted Cash Flow (DCF) valuation for a company.',
	inputSchema: z.object({
		symbol: z.string().describe('The stock symbol (e.g., "AAPL").'),
		values: z.array(z.enum(LEVERED_DCF_VALUATION_RESULT_VALUES)).nullable().optional().describe('Specific fields to return from the results.'),
	}),
	execute: async ({ symbol, values }) => {
		try {
			const results = await fmp.leveredDcfValuation(symbol)
			return applyFieldSelection(results, values)
		}
		catch (error: any) {
			console.error('Error in leveredDcfValuationTool:', error)
			return { result: error.message || 'An unexpected error occurred in leveredDcfValuationTool', isError: true }
		}
	},
})

const DCF_ANALYSIS_RESULT_VALUES = ['year', 'symbol', 'revenue', 'revenuePercentage', 'ebitda', 'ebitdaPercentage', 'ebit', 'ebitPercentage', 'depreciation', 'depreciationPercentage', 'totalCash', 'totalCashPercentage', 'receivables', 'receivablesPercentage', 'inventories', 'inventoriesPercentage', 'payable', 'payablePercentage', 'capitalExpenditure', 'capitalExpenditurePercentage', 'price', 'beta', 'dilutedSharesOutstanding', 'costofDebt', 'taxRate', 'afterTaxCostOfDebt', 'riskFreeRate', 'marketRiskPremium', 'costOfEquity', 'totalDebt', 'totalEquity', 'totalCapital', 'debtWeighting', 'equityWeighting', 'wacc', 'taxRateCash', 'ebiat', 'ufcf', 'sumPvUfcf', 'longTermGrowthRate', 'terminalValue', 'presentTerminalValue', 'enterpriseValue', 'netDebt', 'equityValue', 'equityValuePerShare', 'freeCashFlowT1'] as const
export const dcfAnalysis = tool({
	description: 'Runs a custom (unlevered) Discounted Cash Flow (DCF) analysis.',
	inputSchema: z.object({
		symbol: z.string().describe('The stock symbol (e.g., "AAPL").'),
		params: z.object({
			revenueGrowthPct: z.number().nullable().describe('Expected revenue growth percentage. E.g., 0.1094.'),
			ebitdaPct: z.number().nullable().describe('Expected EBITDA as a percentage of revenue. E.g., 0.3127.'),
			depreciationAndAmortizationPct: z.number().nullable().describe('Expected Depreciation & Amortization as a percentage of revenue. E.g., 0.0345.'),
			cashAndShortTermInvestmentsPct: z.number().nullable().describe('Expected Cash & Short Term Investments as a percentage of revenue. E.g., 0.2344.'),
			receivablesPct: z.number().nullable().describe('Expected Receivables as a percentage of revenue. E.g., 0.1533.'),
			inventoriesPct: z.number().nullable().describe('Expected Inventories as a percentage of revenue. E.g., 0.0155.'),
			payablePct: z.number().nullable().describe('Expected Payables as a percentage of revenue. E.g., 0.1614.'),
			ebitPct: z.number().nullable().describe('Expected EBIT as a percentage of revenue. E.g., 0.2781.'),
			capitalExpenditurePct: z.number().nullable().describe('Expected Capital Expenditure as a percentage of revenue. E.g., 0.0306.'),
			operatingCashFlowPct: z.number().nullable().describe('Expected Operating Cash Flow as a percentage of revenue. E.g., 0.2886.'),
			sellingGeneralAndAdministrativeExpensesPct: z.number().nullable().describe('Expected Selling, General & Administrative Expenses as a percentage of revenue. E.g., 0.0662.'),
			taxRate: z.number().nullable().describe('Effective tax rate. E.g., 0.1491.'),
			longTermGrowthRate: z.number().nullable().describe('Long-term growth rate for terminal value calculation. E.g., 4 (for 4%).'),
			costOfDebt: z.number().nullable().describe('Cost of debt. E.g., 3.64 (for 3.64%).'),
			costOfEquity: z.number().nullable().describe('Cost of equity. E.g., 9.51168 (for 9.51%).'),
			marketRiskPremium: z.number().nullable().describe('Market risk premium. E.g., 4.72 (for 4.72%).'),
			beta: z.number().nullable().describe('Beta of the stock. E.g., 1.244.'),
			riskFreeRate: z.number().nullable().describe('Risk-free rate. E.g., 3.64 (for 3.64%).'),
		}).optional().describe('Custom parameters for the DCF calculation.'),
		values: z.array(z.enum(DCF_ANALYSIS_RESULT_VALUES)).nullable().optional().describe('Specific fields to return from the results.'),
	}),
	execute: async ({ symbol, params, values }) => {
		try {
			const results = await fmp.dcfAnalysis(symbol, params ?? undefined)
			return applyFieldSelection(results, values)
		}
		catch (error: any) {
			console.error('Error in dcfAnalysisTool:', error)
			return { result: error.message || 'An unexpected error occurred in dcfAnalysisTool', isError: true }
		}
	},
})

const DCF_LEVERED_ANALYSIS_RESULT_VALUES = ['year', 'symbol', 'revenue', 'revenuePercentage', 'capitalExpenditure', 'capitalExpenditurePercentage', 'price', 'beta', 'dilutedSharesOutstanding', 'costofDebt', 'taxRate', 'afterTaxCostOfDebt', 'riskFreeRate', 'marketRiskPremium', 'costOfEquity', 'totalDebt', 'totalEquity', 'totalCapital', 'debtWeighting', 'equityWeighting', 'wacc', 'operatingCashFlow', 'operatingCashFlowPercentage', 'pvLfcf', 'sumPvLfcf', 'longTermGrowthRate', 'freeCashFlow', 'terminalValue', 'presentTerminalValue', 'enterpriseValue', 'netDebt', 'equityValue', 'equityValuePerShare', 'freeCashFlowT1'] as const
export const dcfLeveredAnalysis = tool({
	description: 'Runs a custom Levered Discounted Cash Flow (DCF) analysis.',
	inputSchema: z.object({
		symbol: z.string().describe('The stock symbol (e.g., "AAPL").'),
		params: z.object({
			revenueGrowthPct: z.number().nullable().describe('Expected revenue growth percentage. E.g., 0.1094.'),
			ebitdaPct: z.number().nullable().describe('Expected EBITDA as a percentage of revenue. E.g., 0.3127.'),
			depreciationAndAmortizationPct: z.number().nullable().describe('Expected Depreciation & Amortization as a percentage of revenue. E.g., 0.0345.'),
			cashAndShortTermInvestmentsPct: z.number().nullable().describe('Expected Cash & Short Term Investments as a percentage of revenue. E.g., 0.2344.'),
			receivablesPct: z.number().nullable().describe('Expected Receivables as a percentage of revenue. E.g., 0.1533.'),
			inventoriesPct: z.number().nullable().describe('Expected Inventories as a percentage of revenue. E.g., 0.0155.'),
			payablePct: z.number().nullable().describe('Expected Payables as a percentage of revenue. E.g., 0.1614.'),
			ebitPct: z.number().nullable().describe('Expected EBIT as a percentage of revenue. E.g., 0.2781.'),
			capitalExpenditurePct: z.number().nullable().describe('Expected Capital Expenditure as a percentage of revenue. E.g., 0.0306.'),
			operatingCashFlowPct: z.number().nullable().describe('Expected Operating Cash Flow as a percentage of revenue. E.g., 0.2886.'),
			sellingGeneralAndAdministrativeExpensesPct: z.number().nullable().describe('Expected Selling, General & Administrative Expenses as a percentage of revenue. E.g., 0.0662.'),
			taxRate: z.number().nullable().describe('Effective tax rate. E.g., 0.1491.'),
			longTermGrowthRate: z.number().nullable().describe('Long-term growth rate for terminal value calculation. E.g., 4 (for 4%).'),
			costOfDebt: z.number().nullable().describe('Cost of debt. E.g., 3.64 (for 3.64%).'),
			costOfEquity: z.number().nullable().describe('Cost of equity. E.g., 9.51168 (for 9.51%).'),
			marketRiskPremium: z.number().nullable().describe('Market risk premium. E.g., 4.72 (for 4.72%).'),
			beta: z.number().nullable().describe('Beta of the stock. E.g., 1.244.'),
			riskFreeRate: z.number().nullable().describe('Risk-free rate. E.g., 3.64 (for 3.64%).'),
		}).optional().describe('Custom parameters for the DCF calculation (same as CustomDcfParams).'),
		values: z.array(z.enum(DCF_LEVERED_ANALYSIS_RESULT_VALUES)).nullable().optional().describe('Specific fields to return from the results.'),
	}),
	execute: async ({ symbol, params, values }) => {
		try {
			const results = await fmp.dcfLeveredAnalysis(symbol, params ?? undefined)
			return applyFieldSelection(results, values)
		}
		catch (error: any) {
			console.error('Error in dcfLeveredAnalysisTool:', error)
			return { result: error.message || 'An unexpected error occurred in dcfLeveredAnalysisTool', isError: true }
		}
	},
})

const TREASURY_RATES_RESULT_VALUES = ['date', 'month1', 'month2', 'month3', 'month6', 'year1', 'year2', 'year3', 'year5', 'year7', 'year10', 'year20', 'year30'] as const
export const treasuryRates = tool({
	description: 'Retrieves Treasury rates for various maturities within a date range.',
	inputSchema: z.object({
		options: z.object({
			from: z.string().describe('Start date for the calendar (YYYY-MM-DD). E.g., "2025-01-10".'),
			to: z.string().describe('End date for the calendar (YYYY-MM-DD). E.g., "2025-04-10". Max 90-day range.'),
		}).describe('Options specifying the date range.'),
		values: z.array(z.enum(TREASURY_RATES_RESULT_VALUES)).nullable().optional().describe('Specific fields to return from the results.'),
	}),
	execute: async ({ options, values }) => {
		try {
			const results = await fmp.treasuryRates(options)
			return applyFieldSelection(results, values)
		}
		catch (error: any) {
			console.error('Error in treasuryRatesTool:', error)
			return { result: error.message || 'An unexpected error occurred in treasuryRatesTool', isError: true }
		}
	},
})

const ECONOMIC_INDICATORS_RESULT_VALUES = ['name', 'date', 'value'] as const
export const economicIndicators = tool({
	description: 'Retrieves data for a specific economic indicator.',
	inputSchema: z.object({
		name: z.enum(['GDP', 'realGDP', 'nominalPotentialGDP', 'realGDPPerCapita', 'federalFunds', 'CPI', 'inflationRate', 'inflation', 'retailSales', 'consumerSentiment', 'durableGoods', 'unemploymentRate', 'totalNonfarmPayroll', 'initialClaims', 'industrialProductionTotalIndex', 'newPrivatelyOwnedHousingUnitsStartedTotalUnits', 'totalVehicleSales', 'retailMoneyFunds', 'smoothedUSRecessionProbabilities', '3MonthOr90DayRatesAndYieldsCertificatesOfDeposit', 'commercialBankInterestRateOnCreditCardPlansAllAccounts', '30YearFixedRateMortgageAverage', '15YearFixedRateMortgageAverage']).describe('The name of the economic indicator (e.g., "GDP", "CPI").'),
		options: z.object({
			from: z.string().nullable().describe('Start date for the calendar (YYYY-MM-DD). E.g., "2025-01-10".'),
			to: z.string().nullable().describe('End date for the calendar (YYYY-MM-DD). E.g., "2025-04-10". Max 90-day range.'),
		}).optional().describe('Optional date range.'),
		values: z.array(z.enum(ECONOMIC_INDICATORS_RESULT_VALUES)).nullable().optional().describe('Specific fields to return from the results.'),
	}),
	execute: async ({ name, options, values }) => {
		try {
			const results = await fmp.economicIndicators(name, options ?? undefined)
			return applyFieldSelection(results, values)
		}
		catch (error: any) {
			console.error('Error in economicIndicatorsTool:', error)
			return { result: error.message || 'An unexpected error occurred in economicIndicatorsTool', isError: true }
		}
	},
})

const ECONOMIC_CALENDAR_RESULT_VALUES = ['date', 'country', 'event', 'currency', 'previous', 'estimate', 'actual', 'change', 'impact', 'changePercentage'] as const
export const economicCalendar = tool({
	description: 'Retrieves a calendar of upcoming economic data releases.',
	inputSchema: z.object({
		options: z.object({
			from: z.string().describe('Start date for the calendar (YYYY-MM-DD). E.g., "2025-01-10".'),
			to: z.string().describe('End date for the calendar (YYYY-MM-DD). E.g., "2025-04-10". Max 90-day range.'),
		}).describe('Options specifying the date range.'),
		values: z.array(z.enum(ECONOMIC_CALENDAR_RESULT_VALUES)).nullable().optional().describe('Specific fields to return from the results.'),
	}),
	execute: async ({ options, values }) => {
		try {
			const results = await fmp.economicCalendar(options)
			return applyFieldSelection(results, values)
		}
		catch (error: any) {
			console.error('Error in economicCalendarTool:', error)
			return { result: error.message || 'An unexpected error occurred in economicCalendarTool', isError: true }
		}
	},
})

const MARKET_RISK_PREMIUM_RESULT_VALUES = ['country', 'continent', 'countryRiskPremium', 'totalEquityRiskPremium'] as const
export const marketRiskPremium = tool({
	description: 'Retrieves market risk premium data.',
	inputSchema: z.object({
		values: z.array(z.enum(MARKET_RISK_PREMIUM_RESULT_VALUES)).nullable().optional().describe('Specific fields to return from the results.'),
	}),
	execute: async ({ values }) => {
		try {
			const results = await fmp.marketRiskPremium()
			return applyFieldSelection(results, values)
		}
		catch (error: any) {
			console.error('Error in marketRiskPremiumTool:', error)
			return { result: error.message || 'An unexpected error occurred in marketRiskPremiumTool', isError: true }
		}
	},
})

const ESG_DISCLOSURES_RESULT_VALUES = ['date', 'acceptedDate', 'symbol', 'cik', 'companyName', 'formType', 'environmentalScore', 'socialScore', 'governanceScore', 'ESGScore', 'url'] as const
export const esgDisclosures = tool({
	description: 'Retrieves ESG (Environmental, Social, Governance) disclosure data for a company.',
	inputSchema: z.object({
		symbol: z.string().describe('The stock symbol (e.g., "AAPL").'),
		values: z.array(z.enum(ESG_DISCLOSURES_RESULT_VALUES)).nullable().optional().describe('Specific fields to return from the results.'),
	}),
	execute: async ({ symbol, values }) => {
		try {
			const results = await fmp.esgDisclosures(symbol)
			return applyFieldSelection(results, values)
		}
		catch (error: any) {
			console.error('Error in esgDisclosuresTool:', error)
			return { result: error.message || 'An unexpected error occurred in esgDisclosuresTool', isError: true }
		}
	},
})

const ESG_RATINGS_RESULT_VALUES = ['symbol', 'cik', 'companyName', 'industry', 'fiscalYear', 'ESGRiskRating', 'industryRank'] as const
export const esgRatings = tool({
	description: 'Retrieves ESG ratings for a company.',
	inputSchema: z.object({
		symbol: z.string().describe('The stock symbol (e.g., "AAPL").'),
		values: z.array(z.enum(ESG_RATINGS_RESULT_VALUES)).nullable().optional().describe('Specific fields to return from the results.'),
	}),
	execute: async ({ symbol, values }) => {
		try {
			const results = await fmp.esgRatings(symbol)
			return applyFieldSelection(results, values)
		}
		catch (error: any) {
			console.error('Error in esgRatingsTool:', error)
			return { result: error.message || 'An unexpected error occurred in esgRatingsTool', isError: true }
		}
	},
})

const ESG_BENCHMARK_RESULT_VALUES = ['fiscalYear', 'sector', 'environmentalScore', 'socialScore', 'governanceScore', 'ESGScore'] as const
export const esgBenchmark = tool({
	description: 'Retrieves ESG benchmark comparison data for a specific year.',
	inputSchema: z.object({
		year: z.union([z.string(), z.number()]).describe('The year for the benchmark data (e.g., "2023").'),
		values: z.array(z.enum(ESG_BENCHMARK_RESULT_VALUES)).nullable().optional().describe('Specific fields to return from the results.'),
	}),
	execute: async ({ year, values }) => {
		try {
			const results = await fmp.esgBenchmark(year)
			return applyFieldSelection(results, values)
		}
		catch (error: any) {
			console.error('Error in esgBenchmarkTool:', error)
			return { result: error.message || 'An unexpected error occurred in esgBenchmarkTool', isError: true }
		}
	},
})

const ETF_FUND_HOLDINGS_RESULT_VALUES = ['symbol', 'asset', 'name', 'isin', 'securityCusip', 'sharesNumber', 'weightPercentage', 'marketValue', 'updatedAt', 'updated'] as const
export const etfFundHoldings = tool({
	description: 'Retrieves the holdings of an ETF or mutual fund.',
	inputSchema: z.object({
		symbol: z.string().describe('The symbol of the ETF or fund (e.g., "SPY").'),
		values: z.array(z.enum(ETF_FUND_HOLDINGS_RESULT_VALUES)).nullable().optional().describe('Specific fields to return from the results.'),
	}),
	execute: async ({ symbol, values }) => {
		try {
			const results = await fmp.etfFundHoldings(symbol)
			return applyFieldSelection(results, values)
		}
		catch (error: any) {
			console.error('Error in etfFundHoldingsTool:', error)
			return { result: error.message || 'An unexpected error occurred in etfFundHoldingsTool', isError: true }
		}
	},
})

const ETF_FUND_INFO_RESULT_VALUES = ['symbol', 'name', 'description', 'isin', 'assetClass', 'securityCusip', 'domicile', 'website', 'etfCompany', 'expenseRatio', 'assetsUnderManagement', 'avgVolume', 'inceptionDate', 'nav', 'navCurrency', 'holdingsCount', 'updatedAt', 'sectorsList'] as const
export const etfFundInfo = tool({
	description: 'Retrieves information about an ETF or mutual fund.',
	inputSchema: z.object({
		symbol: z.string().describe('The symbol of the ETF or fund (e.g., "SPY").'),
		values: z.array(z.enum(ETF_FUND_INFO_RESULT_VALUES)).nullable().optional().describe('Specific fields to return from the results.'),
	}),
	execute: async ({ symbol, values }) => {
		try {
			const results = await fmp.etfFundInfo(symbol)
			return applyFieldSelection(results, values)
		}
		catch (error: any) {
			console.error('Error in etfFundInfoTool:', error)
			return { result: error.message || 'An unexpected error occurred in etfFundInfoTool', isError: true }
		}
	},
})

const ETF_FUND_COUNTRY_ALLOCATION_RESULT_VALUES = ['country', 'weightPercentage'] as const
export const etfFundCountryAllocation = tool({
	description: 'Retrieves the country allocation/weightings for an ETF or mutual fund.',
	inputSchema: z.object({
		symbol: z.string().describe('The symbol of the ETF or fund (e.g., "SPY").'),
		values: z.array(z.enum(ETF_FUND_COUNTRY_ALLOCATION_RESULT_VALUES)).nullable().optional().describe('Specific fields to return from the results.'),
	}),
	execute: async ({ symbol, values }) => {
		try {
			const results = await fmp.etfFundCountryAllocation(symbol)
			return applyFieldSelection(results, values)
		}
		catch (error: any) {
			console.error('Error in etfFundCountryAllocationTool:', error)
			return { result: error.message || 'An unexpected error occurred in etfFundCountryAllocationTool', isError: true }
		}
	},
})

const ETF_ASSET_EXPOSURE_RESULT_VALUES = ['symbol', 'asset', 'sharesNumber', 'weightPercentage', 'marketValue'] as const
export const etfAssetExposure = tool({
	description: 'Retrieves which ETFs hold a specific stock asset.',
	inputSchema: z.object({
		symbol: z.string().describe('The stock symbol of the asset (e.g., "AAPL").'),
		values: z.array(z.enum(ETF_ASSET_EXPOSURE_RESULT_VALUES)).nullable().optional().describe('Specific fields to return from the results.'),
	}),
	execute: async ({ symbol, values }) => {
		try {
			const results = await fmp.etfAssetExposure(symbol)
			return applyFieldSelection(results, values)
		}
		catch (error: any) {
			console.error('Error in etfAssetExposureTool:', error)
			return { result: error.message || 'An unexpected error occurred in etfAssetExposureTool', isError: true }
		}
	},
})

const ETF_SECTOR_WEIGHTING_RESULT_VALUES = ['symbol', 'sector', 'weightPercentage'] as const
export const etfSectorWeighting = tool({
	description: 'Retrieves the sector weightings for an ETF.',
	inputSchema: z.object({
		symbol: z.string().describe('The symbol of the ETF (e.g., "SPY").'),
		values: z.array(z.enum(ETF_SECTOR_WEIGHTING_RESULT_VALUES)).nullable().optional().describe('Specific fields to return from the results.'),
	}),
	execute: async ({ symbol, values }) => {
		try {
			const results = await fmp.etfSectorWeighting(symbol)
			return applyFieldSelection(results, values)
		}
		catch (error: any) {
			console.error('Error in etfSectorWeightingTool:', error)
			return { result: error.message || 'An unexpected error occurred in etfSectorWeightingTool', isError: true }
		}
	},
})

const MUTUAL_FUND_ETF_LATEST_DISCLOSURES_RESULT_VALUES = ['cik', 'holder', 'shares', 'dateReported', 'change', 'weightPercent'] as const
export const mutualFundEtfLatestDisclosures = tool({
	description: 'Retrieves the latest disclosures from mutual funds and ETFs for a specific holding.',
	inputSchema: z.object({
		symbol: z.string().describe('The stock symbol of the holding (e.g., "AAPL").'),
		values: z.array(z.enum(MUTUAL_FUND_ETF_LATEST_DISCLOSURES_RESULT_VALUES)).nullable().optional().describe('Specific fields to return from the results.'),
	}),
	execute: async ({ symbol, values }) => {
		try {
			const results = await fmp.mutualFundEtfLatestDisclosures(symbol)
			return applyFieldSelection(results, values)
		}
		catch (error: any) {
			console.error('Error in mutualFundEtfLatestDisclosuresTool:', error)
			return { result: error.message || 'An unexpected error occurred in mutualFundEtfLatestDisclosuresTool', isError: true }
		}
	},
})

const MUTUAL_FUND_DISCLOSURES_RESULT_VALUES = ['cik', 'date', 'acceptedDate', 'symbol', 'name', 'lei', 'title', 'cusip', 'isin', 'balance', 'units', 'cur_cd', 'valUsd', 'pctVal', 'payoffProfile', 'assetCat', 'issuerCat', 'invCountry', 'isRestrictedSec', 'fairValLevel', 'isCashCollateral', 'isNonCashCollateral', 'isLoanByFund'] as const
export const mutualFundDisclosures = tool({
	description: 'Retrieves comprehensive disclosure data for a mutual fund.',
	inputSchema: z.object({
		symbol: z.string().describe('The symbol of the mutual fund (e.g., "VWO").'),
		options: z.object({
			year: z.union([z.string(), z.number()]).describe('The year of the disclosure. E.g., "2023".'),
			quarter: z.union([z.string(), z.number()]).describe('The quarter of the disclosure. E.g., "4".'),
			cik: z.string().nullable().describe('The CIK of the fund. E.g., "0000857489".'),
		}).describe('Options specifying year, quarter, and optionally CIK.'),
		values: z.array(z.enum(MUTUAL_FUND_DISCLOSURES_RESULT_VALUES)).nullable().optional().describe('Specific fields to return from the results.'),
	}),
	execute: async ({ symbol, options, values }) => {
		try {
			const results = await fmp.mutualFundDisclosures(symbol, options)
			return applyFieldSelection(results, values)
		}
		catch (error: any) {
			console.error('Error in mutualFundDisclosuresTool:', error)
			return { result: error.message || 'An unexpected error occurred in mutualFundDisclosuresTool', isError: true }
		}
	},
})

const SEARCH_MUTUAL_FUND_ETF_DISCLOSURES_BY_NAME_RESULT_VALUES = ['symbol', 'cik', 'classId', 'seriesId', 'entityName', 'entityOrgType', 'seriesName', 'className', 'reportingFileNumber', 'address', 'city', 'zipCode', 'state'] as const
export const searchMutualFundEtfDisclosuresByName = tool({
	description: 'Searches for mutual fund and ETF disclosures by name.',
	inputSchema: z.object({
		name: z.string().describe('The name of the fund or ETF. E.g., "Federated Hermes Government Income Securities, Inc.".'),
		values: z.array(z.enum(SEARCH_MUTUAL_FUND_ETF_DISCLOSURES_BY_NAME_RESULT_VALUES)).nullable().optional().describe('Specific fields to return from the results.'),
	}),
	execute: async ({ name, values }) => {
		try {
			const results = await fmp.searchMutualFundEtfDisclosuresByName(name)
			return applyFieldSelection(results, values)
		}
		catch (error: any) {
			console.error('Error in searchMutualFundEtfDisclosuresByNameTool:', error)
			return { result: error.message || 'An unexpected error occurred in searchMutualFundEtfDisclosuresByNameTool', isError: true }
		}
	},
})

const FUND_ETF_DISCLOSURES_BY_DATE_RESULT_VALUES = ['date', 'year', 'quarter'] as const
export const fundEtfDisclosuresByDate = tool({
	description: 'Retrieves disclosure dates for mutual funds and ETFs.',
	inputSchema: z.object({
		symbol: z.string().describe('The symbol of the fund or ETF (e.g., "VWO").'),
		options: z.object({
			cik: z.string().nullable().describe('The CIK of the fund or ETF. E.g., "0000036405".'),
		}).optional().describe('Optional CIK.'),
		values: z.array(z.enum(FUND_ETF_DISCLOSURES_BY_DATE_RESULT_VALUES)).nullable().optional().describe('Specific fields to return from the results.'),
	}),
	execute: async ({ symbol, options, values }) => {
		try {
			const results = await fmp.fundEtfDisclosuresByDate(symbol, options ?? undefined)
			return applyFieldSelection(results, values)
		}
		catch (error: any) {
			console.error('Error in fundEtfDisclosuresByDateTool:', error)
			return { result: error.message || 'An unexpected error occurred in fundEtfDisclosuresByDateTool', isError: true }
		}
	},
})

const COMMODITIES_LIST_RESULT_VALUES = ['symbol', 'name', 'exchange', 'tradeMonth', 'currency'] as const
export const commoditiesList = tool({
	description: 'Retrieves a list of tracked commodities.',
	inputSchema: z.object({
		values: z.array(z.enum(COMMODITIES_LIST_RESULT_VALUES)).nullable().optional().describe('Specific fields to return from the results.'),
	}),
	execute: async ({ values }) => {
		try {
			const results = await fmp.commoditiesList()
			return applyFieldSelection(results, values)
		}
		catch (error: any) {
			console.error('Error in commoditiesListTool:', error)
			return { result: error.message || 'An unexpected error occurred in commoditiesListTool', isError: true }
		}
	},
})

const COMMODITY_QUOTE_RESULT_VALUES = ['symbol', 'name', 'price', 'changesPercentage', 'change', 'dayLow', 'dayHigh', 'yearHigh', 'yearLow', 'marketCap', 'priceAvg50', 'priceAvg200', 'exchange', 'volume', 'avgVolume', 'open', 'previousClose', 'eps', 'pe', 'earningsAnnouncement', 'sharesOutstanding', 'timestamp'] as const
export const commodityQuote = tool({
	description: 'Retrieves a real-time price quote for a commodity.',
	inputSchema: z.object({
		symbol: z.string().describe('The commodity symbol (e.g., "GCUSD").'),
		values: z.array(z.enum(COMMODITY_QUOTE_RESULT_VALUES)).nullable().optional().describe('Specific fields to return from the results.'),
	}),
	execute: async ({ symbol, values }) => {
		try {
			const results = await fmp.commodityQuote(symbol)
			return applyFieldSelection(results, values)
		}
		catch (error: any) {
			console.error('Error in commodityQuoteTool:', error)
			return { result: error.message || 'An unexpected error occurred in commodityQuoteTool', isError: true }
		}
	},
})

const COMMODITY_CHART_FULL_RESULT_VALUES = ['symbol', 'change', 'changePercent', 'vwap', 'date', 'open', 'high', 'low', 'close', 'volume'] as const
export const commodityChartFull = tool({
	description: 'Retrieves full historical end-of-day price data for a commodity.',
	inputSchema: z.object({
		symbol: z.string().describe('The commodity symbol (e.g., "GCUSD").'),
		options: z.object({
			from: z.string().nullable().describe('Start date for the calendar (YYYY-MM-DD). E.g., "2025-01-10".'),
			to: z.string().nullable().describe('End date for the calendar (YYYY-MM-DD). E.g., "2025-04-10". Max 90-day range.'),
		}).optional().describe('Optional date range.'),
		values: z.array(z.enum(COMMODITY_CHART_FULL_RESULT_VALUES)).nullable().optional().describe('Specific fields to return from the results.'),
	}),
	execute: async ({ symbol, options, values }) => {
		try {
			const results = await fmp.commodityChartFull(symbol, options ?? undefined)
			return applyFieldSelection(results, values)
		}
		catch (error: any) {
			console.error('Error in commodityChartFullTool:', error)
			return { result: error.message || 'An unexpected error occurred in commodityChartFullTool', isError: true }
		}
	},
})

const COMMODITY_CHART1_MIN_RESULT_VALUES = ['date', 'open', 'high', 'low', 'close', 'volume'] as const
export const commodityChart1Min = tool({
	description: 'Retrieves 1-minute interval historical commodity chart data.',
	inputSchema: z.object({
		symbol: z.string().describe('The commodity symbol (e.g., "GCUSD").'),
		options: z.object({
			nonadjusted: z.boolean().nullable().describe('Whether to fetch non-adjusted data. Defaults to false.'),
			from: z.string().nullable().describe('Start date for the calendar (YYYY-MM-DD). E.g., "2025-01-10".'),
			to: z.string().nullable().describe('End date for the calendar (YYYY-MM-DD). E.g., "2025-04-10". Max 90-day range.'),
		}).optional().describe('Optional date range.'),
		values: z.array(z.enum(COMMODITY_CHART1_MIN_RESULT_VALUES)).nullable().optional().describe('Specific fields to return from the results.'),
	}),
	execute: async ({ symbol, options, values }) => {
		try {
			const results = await fmp.commodityChart1Min(symbol, options ?? undefined)
			return applyFieldSelection(results, values)
		}
		catch (error: any) {
			console.error('Error in commodityChart1MinTool:', error)
			return { result: error.message || 'An unexpected error occurred in commodityChart1MinTool', isError: true }
		}
	},
})

const COMMODITY_CHART5_MIN_RESULT_VALUES = ['date', 'open', 'high', 'low', 'close', 'volume'] as const
export const commodityChart5Min = tool({
	description: 'Retrieves 5-minute interval historical commodity chart data.',
	inputSchema: z.object({
		symbol: z.string().describe('The commodity symbol (e.g., "GCUSD").'),
		options: z.object({
			nonadjusted: z.boolean().nullable().describe('Whether to fetch non-adjusted data. Defaults to false.'),
			from: z.string().nullable().describe('Start date for the calendar (YYYY-MM-DD). E.g., "2025-01-10".'),
			to: z.string().nullable().describe('End date for the calendar (YYYY-MM-DD). E.g., "2025-04-10". Max 90-day range.'),
		}).optional().describe('Optional date range.'),
		values: z.array(z.enum(COMMODITY_CHART5_MIN_RESULT_VALUES)).nullable().optional().describe('Specific fields to return from the results.'),
	}),
	execute: async ({ symbol, options, values }) => {
		try {
			const results = await fmp.commodityChart5Min(symbol, options ?? undefined)
			return applyFieldSelection(results, values)
		}
		catch (error: any) {
			console.error('Error in commodityChart5MinTool:', error)
			return { result: error.message || 'An unexpected error occurred in commodityChart5MinTool', isError: true }
		}
	},
})

const COMMODITY_CHART1_HOUR_RESULT_VALUES = ['date', 'open', 'high', 'low', 'close', 'volume'] as const
export const commodityChart1Hour = tool({
	description: 'Retrieves 1-hour interval historical commodity chart data.',
	inputSchema: z.object({
		symbol: z.string().describe('The commodity symbol (e.g., "GCUSD").'),
		options: z.object({
			nonadjusted: z.boolean().nullable().describe('Whether to fetch non-adjusted data. Defaults to false.'),
			from: z.string().nullable().describe('Start date for the calendar (YYYY-MM-DD). E.g., "2025-01-10".'),
			to: z.string().nullable().describe('End date for the calendar (YYYY-MM-DD). E.g., "2025-04-10". Max 90-day range.'),
		}).optional().describe('Optional date range.'),
		values: z.array(z.enum(COMMODITY_CHART1_HOUR_RESULT_VALUES)).nullable().optional().describe('Specific fields to return from the results.'),
	}),
	execute: async ({ symbol, options, values }) => {
		try {
			const results = await fmp.commodityChart1Hour(symbol, options ?? undefined)
			return applyFieldSelection(results, values)
		}
		catch (error: any) {
			console.error('Error in commodityChart1HourTool:', error)
			return { result: error.message || 'An unexpected error occurred in commodityChart1HourTool', isError: true }
		}
	},
})

const LATEST_CROWDFUNDING_CAMPAIGNS_RESULT_VALUES = ['cik', 'companyName', 'date', 'filingDate', 'acceptedDate', 'formType', 'formSignification', 'nameOfIssuer', 'legalStatusForm', 'jurisdictionOrganization', 'issuerStreet', 'issuerCity', 'issuerStateOrCountry', 'issuerZipCode', 'issuerWebsite', 'intermediaryCompanyName', 'intermediaryCommissionCik', 'intermediaryCommissionFileNumber', 'compensationAmount', 'financialInterest', 'securityOfferedType', 'securityOfferedOtherDescription', 'numberOfSecurityOffered', 'offeringPrice', 'offeringAmount', 'overSubscriptionAccepted', 'overSubscriptionAllocationType', 'maximumOfferingAmount', 'offeringDeadlineDate', 'currentNumberOfEmployees', 'totalAssetMostRecentFiscalYear', 'totalAssetPriorFiscalYear', 'cashAndCashEquiValentMostRecentFiscalYear', 'cashAndCashEquiValentPriorFiscalYear', 'accountsReceivableMostRecentFiscalYear', 'accountsReceivablePriorFiscalYear', 'shortTermDebtMostRecentFiscalYear', 'shortTermDebtPriorFiscalYear', 'longTermDebtMostRecentFiscalYear', 'longTermDebtPriorFiscalYear', 'revenueMostRecentFiscalYear', 'revenuePriorFiscalYear', 'costGoodsSoldMostRecentFiscalYear', 'costGoodsSoldPriorFiscalYear', 'taxesPaidMostRecentFiscalYear', 'taxesPaidPriorFiscalYear', 'netIncomeMostRecentFiscalYear', 'netIncomePriorFiscalYear'] as const
export const latestCrowdfundingCampaigns = tool({
	description: 'Retrieves the latest crowdfunding campaigns.',
	inputSchema: z.object({
		options: z.object({
			page: z.number().nullable().describe('The page number for pagination. E.g., 0.'),
			limit: z.number().nullable().describe('The maximum number of results to return. E.g., 50.'),
		}).optional().describe('Optional parameters for pagination.'),
		values: z.array(z.enum(LATEST_CROWDFUNDING_CAMPAIGNS_RESULT_VALUES)).nullable().optional().describe('Specific fields to return from the results.'),
	}),
	execute: async ({ options, values }) => {
		try {
			const results = await fmp.latestCrowdfundingCampaigns(options ?? undefined)
			return applyFieldSelection(results, values)
		}
		catch (error: any) {
			console.error('Error in latestCrowdfundingCampaignsTool:', error)
			return { result: error.message || 'An unexpected error occurred in latestCrowdfundingCampaignsTool', isError: true }
		}
	},
})

const SEARCH_CROWDFUNDING_CAMPAIGNS_RESULT_VALUES = ['cik', 'name', 'date'] as const
export const searchCrowdfundingCampaigns = tool({
	description: 'Searches for crowdfunding campaigns by name.',
	inputSchema: z.object({
		name: z.string().describe('The name to search for (e.g., "enotap").'),
		values: z.array(z.enum(SEARCH_CROWDFUNDING_CAMPAIGNS_RESULT_VALUES)).nullable().optional().describe('Specific fields to return from the results.'),
	}),
	execute: async ({ name, values }) => {
		try {
			const results = await fmp.searchCrowdfundingCampaigns(name)
			return applyFieldSelection(results, values)
		}
		catch (error: any) {
			console.error('Error in searchCrowdfundingCampaignsTool:', error)
			return { result: error.message || 'An unexpected error occurred in searchCrowdfundingCampaignsTool', isError: true }
		}
	},
})

const CROWDFUNDING_CAMPAIGNS_BY_CIK_RESULT_VALUES = ['cik', 'companyName', 'date', 'filingDate', 'acceptedDate', 'formType', 'formSignification', 'nameOfIssuer', 'legalStatusForm', 'jurisdictionOrganization', 'issuerStreet', 'issuerCity', 'issuerStateOrCountry', 'issuerZipCode', 'issuerWebsite', 'intermediaryCompanyName', 'intermediaryCommissionCik', 'intermediaryCommissionFileNumber', 'compensationAmount', 'financialInterest', 'securityOfferedType', 'securityOfferedOtherDescription', 'numberOfSecurityOffered', 'offeringPrice', 'offeringAmount', 'overSubscriptionAccepted', 'overSubscriptionAllocationType', 'maximumOfferingAmount', 'offeringDeadlineDate', 'currentNumberOfEmployees', 'totalAssetMostRecentFiscalYear', 'totalAssetPriorFiscalYear', 'cashAndCashEquiValentMostRecentFiscalYear', 'cashAndCashEquiValentPriorFiscalYear', 'accountsReceivableMostRecentFiscalYear', 'accountsReceivablePriorFiscalYear', 'shortTermDebtMostRecentFiscalYear', 'shortTermDebtPriorFiscalYear', 'longTermDebtMostRecentFiscalYear', 'longTermDebtPriorFiscalYear', 'revenueMostRecentFiscalYear', 'revenuePriorFiscalYear', 'costGoodsSoldMostRecentFiscalYear', 'costGoodsSoldPriorFiscalYear', 'taxesPaidMostRecentFiscalYear', 'taxesPaidPriorFiscalYear', 'netIncomeMostRecentFiscalYear', 'netIncomePriorFiscalYear'] as const
export const crowdfundingCampaignsByCik = tool({
	description: 'Retrieves crowdfunding campaigns by CIK.',
	inputSchema: z.object({
		cik: z.string().describe('The CIK of the issuer (e.g., "0001916078").'),
		values: z.array(z.enum(CROWDFUNDING_CAMPAIGNS_BY_CIK_RESULT_VALUES)).nullable().optional().describe('Specific fields to return from the results.'),
	}),
	execute: async ({ cik, values }) => {
		try {
			const results = await fmp.crowdfundingCampaignsByCik(cik)
			return applyFieldSelection(results, values)
		}
		catch (error: any) {
			console.error('Error in crowdfundingCampaignsByCikTool:', error)
			return { result: error.message || 'An unexpected error occurred in crowdfundingCampaignsByCikTool', isError: true }
		}
	},
})

const LATEST_EQUITY_OFFERING_UPDATES_RESULT_VALUES = ['cik', 'companyName', 'date', 'filingDate', 'acceptedDate', 'formType', 'formSignification', 'entityName', 'issuerStreet', 'issuerCity', 'issuerStateOrCountry', 'issuerStateOrCountryDescription', 'issuerZipCode', 'issuerPhoneNumber', 'jurisdictionOfIncorporation', 'entityType', 'incorporatedWithinFiveYears', 'yearOfIncorporation', 'relatedPersonFirstName', 'relatedPersonLastName', 'relatedPersonStreet', 'relatedPersonCity', 'relatedPersonStateOrCountry', 'relatedPersonStateOrCountryDescription', 'relatedPersonZipCode', 'relatedPersonRelationship', 'industryGroupType', 'revenueRange', 'federalExemptionsExclusions', 'isAmendment', 'dateOfFirstSale', 'durationOfOfferingIsMoreThanYear', 'securitiesOfferedAreOfEquityType', 'isBusinessCombinationTransaction', 'minimumInvestmentAccepted', 'totalOfferingAmount', 'totalAmountSold', 'totalAmountRemaining', 'hasNonAccreditedInvestors', 'totalNumberAlreadyInvested', 'salesCommissions', 'findersFees', 'grossProceedsUsed'] as const
export const latestEquityOfferingUpdates = tool({
	description: 'Retrieves the latest equity offering updates.',
	inputSchema: z.object({
		options: z.object({
			cik: z.string().nullable().describe('Filter by CIK. E.g., "0002013736".'),
			page: z.number().nullable().describe('The page number for pagination. E.g., 0.'),
			limit: z.number().nullable().describe('The maximum number of results to return. E.g., 50.'),
		}).optional().describe('Optional parameters for pagination and CIK filter.'),
		values: z.array(z.enum(LATEST_EQUITY_OFFERING_UPDATES_RESULT_VALUES)).nullable().optional().describe('Specific fields to return from the results.'),
	}),
	execute: async ({ options, values }) => {
		try {
			const results = await fmp.latestEquityOfferingUpdates(options ?? undefined)
			return applyFieldSelection(results, values)
		}
		catch (error: any) {
			console.error('Error in latestEquityOfferingUpdatesTool:', error)
			return { result: error.message || 'An unexpected error occurred in latestEquityOfferingUpdatesTool', isError: true }
		}
	},
})

const SEARCH_EQUITY_OFFERINGS_RESULT_VALUES = ['cik', 'name', 'date'] as const
export const searchEquityOfferings = tool({
	description: 'Searches for equity offerings by name.',
	inputSchema: z.object({
		name: z.string().describe('The name to search for (e.g., "NJOY").'),
		values: z.array(z.enum(SEARCH_EQUITY_OFFERINGS_RESULT_VALUES)).nullable().optional().describe('Specific fields to return from the results.'),
	}),
	execute: async ({ name, values }) => {
		try {
			const results = await fmp.searchEquityOfferings(name)
			return applyFieldSelection(results, values)
		}
		catch (error: any) {
			console.error('Error in searchEquityOfferingsTool:', error)
			return { result: error.message || 'An unexpected error occurred in searchEquityOfferingsTool', isError: true }
		}
	},
})

const EQUITY_OFFERINGS_BY_CIK_RESULT_VALUES = ['cik', 'companyName', 'date', 'filingDate', 'acceptedDate', 'formType', 'formSignification', 'entityName', 'issuerStreet', 'issuerCity', 'issuerStateOrCountry', 'issuerStateOrCountryDescription', 'issuerZipCode', 'issuerPhoneNumber', 'jurisdictionOfIncorporation', 'entityType', 'incorporatedWithinFiveYears', 'yearOfIncorporation', 'relatedPersonFirstName', 'relatedPersonLastName', 'relatedPersonStreet', 'relatedPersonCity', 'relatedPersonStateOrCountry', 'relatedPersonStateOrCountryDescription', 'relatedPersonZipCode', 'relatedPersonRelationship', 'industryGroupType', 'revenueRange', 'federalExemptionsExclusions', 'isAmendment', 'dateOfFirstSale', 'durationOfOfferingIsMoreThanYear', 'securitiesOfferedAreOfEquityType', 'isBusinessCombinationTransaction', 'minimumInvestmentAccepted', 'totalOfferingAmount', 'totalAmountSold', 'totalAmountRemaining', 'hasNonAccreditedInvestors', 'totalNumberAlreadyInvested', 'salesCommissions', 'findersFees', 'grossProceedsUsed'] as const
export const equityOfferingsByCik = tool({
	description: 'Retrieves equity offerings by CIK.',
	inputSchema: z.object({
		cik: z.string().describe('The CIK of the issuer (e.g., "0001547416").'),
		values: z.array(z.enum(EQUITY_OFFERINGS_BY_CIK_RESULT_VALUES)).nullable().optional().describe('Specific fields to return from the results.'),
	}),
	execute: async ({ cik, values }) => {
		try {
			const results = await fmp.equityOfferingsByCik(cik)
			return applyFieldSelection(results, values)
		}
		catch (error: any) {
			console.error('Error in equityOfferingsByCikTool:', error)
			return { result: error.message || 'An unexpected error occurred in equityOfferingsByCikTool', isError: true }
		}
	},
})

const CRYPTOCURRENCY_LIST_RESULT_VALUES = ['symbol', 'name', 'exchange', 'icoDate', 'circulatingSupply', 'totalSupply'] as const
export const cryptocurrencyList = tool({
	description: 'Retrieves a list of all cryptocurrencies.',
	inputSchema: z.object({
		values: z.array(z.enum(CRYPTOCURRENCY_LIST_RESULT_VALUES)).nullable().optional().describe('Specific fields to return from the results.'),
	}),
	execute: async ({ values }) => {
		try {
			const results = await fmp.cryptocurrencyList()
			return applyFieldSelection(results, values)
		}
		catch (error: any) {
			console.error('Error in cryptocurrencyListTool:', error)
			return { result: error.message || 'An unexpected error occurred in cryptocurrencyListTool', isError: true }
		}
	},
})

const CRYPTOCURRENCY_QUOTE_RESULT_VALUES = ['symbol', 'name', 'price', 'changesPercentage', 'change', 'dayLow', 'dayHigh', 'yearHigh', 'yearLow', 'marketCap', 'priceAvg50', 'priceAvg200', 'exchange', 'volume', 'avgVolume', 'open', 'previousClose', 'eps', 'pe', 'earningsAnnouncement', 'sharesOutstanding', 'timestamp'] as const
export const cryptocurrencyQuote = tool({
	description: 'Retrieves a full real-time quote for a cryptocurrency.',
	inputSchema: z.object({
		symbol: z.string().describe('The cryptocurrency symbol (e.g., "BTCUSD").'),
		values: z.array(z.enum(CRYPTOCURRENCY_QUOTE_RESULT_VALUES)).nullable().optional().describe('Specific fields to return from the results.'),
	}),
	execute: async ({ symbol, values }) => {
		try {
			const results = await fmp.cryptocurrencyQuote(symbol)
			return applyFieldSelection(results, values)
		}
		catch (error: any) {
			console.error('Error in cryptocurrencyQuoteTool:', error)
			return { result: error.message || 'An unexpected error occurred in cryptocurrencyQuoteTool', isError: true }
		}
	},
})

export const allCryptocurrenciesQuotes = tool({
	description: 'Retrieves real-time quotes for multiple cryptocurrencies.',
	inputSchema: z.object({
		options: z.object({
			short: z.boolean().nullable().describe('If true, returns short quotes. E.g., true.'),
		}).optional().describe('Optional parameters.'),
	}),
	execute: async ({ options }) => {
		return fmp.allCryptocurrenciesQuotes(options ?? undefined)
	},
})

const CRYPTOCURRENCY_CHART_FULL_RESULT_VALUES = ['symbol', 'change', 'changePercent', 'vwap', 'date', 'open', 'high', 'low', 'close', 'volume'] as const
export const cryptocurrencyChartFull = tool({
	description: 'Retrieves full historical end-of-day price data for a cryptocurrency.',
	inputSchema: z.object({
		symbol: z.string().describe('The cryptocurrency symbol (e.g., "BTCUSD").'),
		options: z.object({
			from: z.string().nullable().describe('Start date for the calendar (YYYY-MM-DD). E.g., "2025-01-10".'),
			to: z.string().nullable().describe('End date for the calendar (YYYY-MM-DD). E.g., "2025-04-10". Max 90-day range.'),
		}).optional().describe('Optional date range.'),
		values: z.array(z.enum(CRYPTOCURRENCY_CHART_FULL_RESULT_VALUES)).nullable().optional().describe('Specific fields to return from the results.'),
	}),
	execute: async ({ symbol, options, values }) => {
		try {
			const results = await fmp.cryptocurrencyChartFull(symbol, options ?? undefined)
			return applyFieldSelection(results, values)
		}
		catch (error: any) {
			console.error('Error in cryptocurrencyChartFullTool:', error)
			return { result: error.message || 'An unexpected error occurred in cryptocurrencyChartFullTool', isError: true }
		}
	},
})

const CRYPTOCURRENCY_CHART1_MIN_RESULT_VALUES = ['date', 'open', 'high', 'low', 'close', 'volume'] as const
export const cryptocurrencyChart1Min = tool({
	description: 'Retrieves 1-minute interval historical cryptocurrency chart data.',
	inputSchema: z.object({
		symbol: z.string().describe('The cryptocurrency symbol (e.g., "BTCUSD").'),
		options: z.object({
			from: z.string().nullable().describe('Start date for the calendar (YYYY-MM-DD). E.g., "2025-01-10".'),
			to: z.string().nullable().describe('End date for the calendar (YYYY-MM-DD). E.g., "2025-04-10". Max 90-day range.'),
		}).optional().describe('Optional date range. Note: `nonadjusted` is not in crypto chart docs.'),
		values: z.array(z.enum(CRYPTOCURRENCY_CHART1_MIN_RESULT_VALUES)).nullable().optional().describe('Specific fields to return from the results.'),
	}),
	execute: async ({ symbol, options, values }) => {
		try {
			const results = await fmp.cryptocurrencyChart1Min(symbol, options ?? undefined)
			return applyFieldSelection(results, values)
		}
		catch (error: any) {
			console.error('Error in cryptocurrencyChart1MinTool:', error)
			return { result: error.message || 'An unexpected error occurred in cryptocurrencyChart1MinTool', isError: true }
		}
	},
})

const CRYPTOCURRENCY_CHART5_MIN_RESULT_VALUES = ['date', 'open', 'high', 'low', 'close', 'volume'] as const
export const cryptocurrencyChart5Min = tool({
	description: 'Retrieves 5-minute interval historical cryptocurrency chart data.',
	inputSchema: z.object({
		symbol: z.string().describe('The cryptocurrency symbol (e.g., "BTCUSD").'),
		options: z.object({
			from: z.string().nullable().describe('Start date for the calendar (YYYY-MM-DD). E.g., "2025-01-10".'),
			to: z.string().nullable().describe('End date for the calendar (YYYY-MM-DD). E.g., "2025-04-10". Max 90-day range.'),
		}).optional().describe('Optional date range. Note: `nonadjusted` is not in crypto chart docs.'),
		values: z.array(z.enum(CRYPTOCURRENCY_CHART5_MIN_RESULT_VALUES)).nullable().optional().describe('Specific fields to return from the results.'),
	}),
	execute: async ({ symbol, options, values }) => {
		try {
			const results = await fmp.cryptocurrencyChart5Min(symbol, options ?? undefined)
			return applyFieldSelection(results, values)
		}
		catch (error: any) {
			console.error('Error in cryptocurrencyChart5MinTool:', error)
			return { result: error.message || 'An unexpected error occurred in cryptocurrencyChart5MinTool', isError: true }
		}
	},
})

const CRYPTOCURRENCY_CHART1_HOUR_RESULT_VALUES = ['date', 'open', 'high', 'low', 'close', 'volume'] as const
export const cryptocurrencyChart1Hour = tool({
	description: 'Retrieves 1-hour interval historical cryptocurrency chart data.',
	inputSchema: z.object({
		symbol: z.string().describe('The cryptocurrency symbol (e.g., "BTCUSD").'),
		options: z.object({
			from: z.string().nullable().describe('Start date for the calendar (YYYY-MM-DD). E.g., "2025-01-10".'),
			to: z.string().nullable().describe('End date for the calendar (YYYY-MM-DD). E.g., "2025-04-10". Max 90-day range.'),
		}).optional().describe('Optional date range. Note: `nonadjusted` is not in crypto chart docs.'),
		values: z.array(z.enum(CRYPTOCURRENCY_CHART1_HOUR_RESULT_VALUES)).nullable().optional().describe('Specific fields to return from the results.'),
	}),
	execute: async ({ symbol, options, values }) => {
		try {
			const results = await fmp.cryptocurrencyChart1Hour(symbol, options ?? undefined)
			return applyFieldSelection(results, values)
		}
		catch (error: any) {
			console.error('Error in cryptocurrencyChart1HourTool:', error)
			return { result: error.message || 'An unexpected error occurred in cryptocurrencyChart1HourTool', isError: true }
		}
	},
})

const FOREX_LIST_RESULT_VALUES = ['symbol', 'fromCurrency', 'toCurrency', 'fromName', 'toName'] as const
export const forexList = tool({
	description: 'Retrieves a list of all Forex currency pairs.',
	inputSchema: z.object({
		values: z.array(z.enum(FOREX_LIST_RESULT_VALUES)).nullable().optional().describe('Specific fields to return from the results.'),
	}),
	execute: async ({ values }) => {
		try {
			const results = await fmp.forexList()
			return applyFieldSelection(results, values)
		}
		catch (error: any) {
			console.error('Error in forexListTool:', error)
			return { result: error.message || 'An unexpected error occurred in forexListTool', isError: true }
		}
	},
})

const FOREX_QUOTE_RESULT_VALUES = ['symbol', 'name', 'price', 'changesPercentage', 'change', 'dayLow', 'dayHigh', 'yearHigh', 'yearLow', 'marketCap', 'priceAvg50', 'priceAvg200', 'exchange', 'volume', 'avgVolume', 'open', 'previousClose', 'eps', 'pe', 'earningsAnnouncement', 'sharesOutstanding', 'timestamp'] as const
export const forexQuote = tool({
	description: 'Retrieves a real-time quote for a Forex currency pair.',
	inputSchema: z.object({
		symbol: z.string().describe('The Forex pair symbol (e.g., "EURUSD").'),
		values: z.array(z.enum(FOREX_QUOTE_RESULT_VALUES)).nullable().optional().describe('Specific fields to return from the results.'),
	}),
	execute: async ({ symbol, values }) => {
		try {
			const results = await fmp.forexQuote(symbol)
			return applyFieldSelection(results, values)
		}
		catch (error: any) {
			console.error('Error in forexQuoteTool:', error)
			return { result: error.message || 'An unexpected error occurred in forexQuoteTool', isError: true }
		}
	},
})

export const allForexQuotes = tool({
	description: 'Retrieves real-time quotes for multiple Forex pairs.',
	inputSchema: z.object({
		options: z.object({
			short: z.boolean().nullable().describe('If true, returns short quotes. E.g., true.'),
		}).optional().describe('Optional parameters.'),
	}),
	execute: async ({ options }) => {
		return fmp.allForexQuotes(options ?? undefined)
	},
})

const FOREX_CHART_FULL_RESULT_VALUES = ['symbol', 'change', 'changePercent', 'vwap', 'date', 'open', 'high', 'low', 'close', 'volume'] as const
export const forexChartFull = tool({
	description: 'Retrieves full historical end-of-day price data for a Forex pair.',
	inputSchema: z.object({
		symbol: z.string().describe('The Forex pair symbol (e.g., "EURUSD").'),
		options: z.object({
			from: z.string().nullable().describe('Start date for the calendar (YYYY-MM-DD). E.g., "2025-01-10".'),
			to: z.string().nullable().describe('End date for the calendar (YYYY-MM-DD). E.g., "2025-04-10". Max 90-day range.'),
		}).optional().describe('Optional date range.'),
		values: z.array(z.enum(FOREX_CHART_FULL_RESULT_VALUES)).nullable().optional().describe('Specific fields to return from the results.'),
	}),
	execute: async ({ symbol, options, values }) => {
		try {
			const results = await fmp.forexChartFull(symbol, options ?? undefined)
			return applyFieldSelection(results, values)
		}
		catch (error: any) {
			console.error('Error in forexChartFullTool:', error)
			return { result: error.message || 'An unexpected error occurred in forexChartFullTool', isError: true }
		}
	},
})

const FOREX_CHART1_MIN_RESULT_VALUES = ['date', 'open', 'high', 'low', 'close', 'volume'] as const
export const forexChart1Min = tool({
	description: 'Retrieves 1-minute interval historical Forex chart data.',
	inputSchema: z.object({
		symbol: z.string().describe('The Forex pair symbol (e.g., "EURUSD").'),
		options: z.object({
			from: z.string().nullable().describe('Start date for the calendar (YYYY-MM-DD). E.g., "2025-01-10".'),
			to: z.string().nullable().describe('End date for the calendar (YYYY-MM-DD). E.g., "2025-04-10". Max 90-day range.'),
		}).optional().describe('Optional date range. Note: `nonadjusted` is not in Forex chart docs.'),
		values: z.array(z.enum(FOREX_CHART1_MIN_RESULT_VALUES)).nullable().optional().describe('Specific fields to return from the results.'),
	}),
	execute: async ({ symbol, options, values }) => {
		try {
			const results = await fmp.forexChart1Min(symbol, options ?? undefined)
			return applyFieldSelection(results, values)
		}
		catch (error: any) {
			console.error('Error in forexChart1MinTool:', error)
			return { result: error.message || 'An unexpected error occurred in forexChart1MinTool', isError: true }
		}
	},
})

const FOREX_CHART5_MIN_RESULT_VALUES = ['date', 'open', 'high', 'low', 'close', 'volume'] as const
export const forexChart5Min = tool({
	description: 'Retrieves 5-minute interval historical Forex chart data.',
	inputSchema: z.object({
		symbol: z.string().describe('The Forex pair symbol (e.g., "EURUSD").'),
		options: z.object({
			from: z.string().nullable().describe('Start date for the calendar (YYYY-MM-DD). E.g., "2025-01-10".'),
			to: z.string().nullable().describe('End date for the calendar (YYYY-MM-DD). E.g., "2025-04-10". Max 90-day range.'),
		}).optional().describe('Optional date range. Note: `nonadjusted` is not in Forex chart docs.'),
		values: z.array(z.enum(FOREX_CHART5_MIN_RESULT_VALUES)).nullable().optional().describe('Specific fields to return from the results.'),
	}),
	execute: async ({ symbol, options, values }) => {
		try {
			const results = await fmp.forexChart5Min(symbol, options ?? undefined)
			return applyFieldSelection(results, values)
		}
		catch (error: any) {
			console.error('Error in forexChart5MinTool:', error)
			return { result: error.message || 'An unexpected error occurred in forexChart5MinTool', isError: true }
		}
	},
})

const FOREX_CHART1_HOUR_RESULT_VALUES = ['date', 'open', 'high', 'low', 'close', 'volume'] as const
export const forexChart1Hour = tool({
	description: 'Retrieves 1-hour interval historical Forex chart data.',
	inputSchema: z.object({
		symbol: z.string().describe('The Forex pair symbol (e.g., "EURUSD").'),
		options: z.object({
			from: z.string().nullable().describe('Start date for the calendar (YYYY-MM-DD). E.g., "2025-01-10".'),
			to: z.string().nullable().describe('End date for the calendar (YYYY-MM-DD). E.g., "2025-04-10". Max 90-day range.'),
		}).optional().describe('Optional date range. Note: `nonadjusted` is not in Forex chart docs.'),
		values: z.array(z.enum(FOREX_CHART1_HOUR_RESULT_VALUES)).nullable().optional().describe('Specific fields to return from the results.'),
	}),
	execute: async ({ symbol, options, values }) => {
		try {
			const results = await fmp.forexChart1Hour(symbol, options ?? undefined)
			return applyFieldSelection(results, values)
		}
		catch (error: any) {
			console.error('Error in forexChart1HourTool:', error)
			return { result: error.message || 'An unexpected error occurred in forexChart1HourTool', isError: true }
		}
	},
})

const INCOME_STATEMENT_RESULT_VALUES = ['date', 'symbol', 'reportedCurrency', 'cik', 'filingDate', 'acceptedDate', 'fiscalYear', 'period', 'revenue', 'costOfRevenue', 'grossProfit', 'researchAndDevelopmentExpenses', 'generalAndAdministrativeExpenses', 'sellingAndMarketingExpenses', 'sellingGeneralAndAdministrativeExpenses', 'otherExpenses', 'operatingExpenses', 'costAndExpenses', 'netInterestIncome', 'interestIncome', 'interestExpense', 'depreciationAndAmortization', 'ebitda', 'ebit', 'nonOperatingIncomeExcludingInterest', 'operatingIncome', 'totalOtherIncomeExpensesNet', 'incomeBeforeTax', 'incomeTaxExpense', 'netIncomeFromContinuingOperations', 'netIncomeFromDiscontinuedOperations', 'otherAdjustmentsToNetIncome', 'netIncome', 'netIncomeDeductions', 'bottomLineNetIncome', 'eps', 'epsDiluted', 'weightedAverageShsOut', 'weightedAverageShsOutDil'] as const
export const incomeStatement = tool({
	description: 'Retrieves income statements for a company.',
	inputSchema: z.object({
		symbol: z.string().describe('The stock symbol (e.g., "AAPL").'),
		options: z.object({
			period: z.enum(['quarter', 'annual', 'Q1', 'Q2', 'Q3', 'Q4', 'FY']).nullable().describe('The financial period (\'quarter\', \'annual\', \'Q1\', \'Q2\', \'Q3\', \'Q4\', \'FY\').'),
			limit: z.number().nullable().describe('The maximum number of results to return. E.g., 50.'),
		}).optional().describe('Optional parameters for limit and period.'),
		values: z.array(z.enum(INCOME_STATEMENT_RESULT_VALUES)).nullable().optional().describe('Specific fields to return from the results.'),
	}),
	execute: async ({ symbol, options, values }) => {
		try {
			const results = await fmp.incomeStatement(symbol, options ?? undefined)
			return applyFieldSelection(results, values)
		}
		catch (error: any) {
			console.error('Error in incomeStatementTool:', error)
			return { result: error.message || 'An unexpected error occurred in incomeStatementTool', isError: true }
		}
	},
})

const BALANCE_SHEET_STATEMENT_RESULT_VALUES = ['date', 'symbol', 'reportedCurrency', 'cik', 'filingDate', 'acceptedDate', 'fiscalYear', 'period', 'cashAndCashEquivalents', 'shortTermInvestments', 'cashAndShortTermInvestments', 'netReceivables', 'accountsReceivables', 'otherReceivables', 'inventory', 'prepaids', 'otherCurrentAssets', 'totalCurrentAssets', 'propertyPlantEquipmentNet', 'goodwill', 'intangibleAssets', 'goodwillAndIntangibleAssets', 'longTermInvestments', 'taxAssets', 'otherNonCurrentAssets', 'totalNonCurrentAssets', 'otherAssets', 'totalAssets', 'totalPayables', 'accountPayables', 'otherPayables', 'accruedExpenses', 'shortTermDebt', 'capitalLeaseObligationsCurrent', 'taxPayables', 'deferredRevenue', 'otherCurrentLiabilities', 'totalCurrentLiabilities', 'longTermDebt', 'deferredRevenueNonCurrent', 'deferredTaxLiabilitiesNonCurrent', 'otherNonCurrentLiabilities', 'totalNonCurrentLiabilities', 'otherLiabilities', 'capitalLeaseObligations', 'totalLiabilities', 'treasuryStock', 'preferredStock', 'commonStock', 'retainedEarnings', 'additionalPaidInCapital', 'accumulatedOtherComprehensiveIncomeLoss', 'otherTotalStockholdersEquity', 'totalStockholdersEquity', 'totalEquity', 'minorityInterest', 'totalLiabilitiesAndTotalEquity', 'totalInvestments', 'totalDebt', 'netDebt'] as const
export const balanceSheetStatement = tool({
	description: 'Retrieves balance sheet statements for a company.',
	inputSchema: z.object({
		symbol: z.string().describe('The stock symbol (e.g., "AAPL").'),
		options: z.object({
			period: z.enum(['quarter', 'annual', 'Q1', 'Q2', 'Q3', 'Q4', 'FY']).nullable().describe('The financial period (\'quarter\', \'annual\', \'Q1\', \'Q2\', \'Q3\', \'Q4\', \'FY\').'),
			limit: z.number().nullable().describe('The maximum number of results to return. E.g., 50.'),
		}).optional().describe('Optional parameters for limit and period.'),
		values: z.array(z.enum(BALANCE_SHEET_STATEMENT_RESULT_VALUES)).nullable().optional().describe('Specific fields to return from the results.'),
	}),
	execute: async ({ symbol, options, values }) => {
		try {
			const results = await fmp.balanceSheetStatement(symbol, options ?? undefined)
			return applyFieldSelection(results, values)
		}
		catch (error: any) {
			console.error('Error in balanceSheetStatementTool:', error)
			return { result: error.message || 'An unexpected error occurred in balanceSheetStatementTool', isError: true }
		}
	},
})

const CASH_FLOW_STATEMENT_RESULT_VALUES = ['date', 'symbol', 'reportedCurrency', 'cik', 'filingDate', 'acceptedDate', 'fiscalYear', 'period', 'netIncome', 'depreciationAndAmortization', 'deferredIncomeTax', 'stockBasedCompensation', 'changeInWorkingCapital', 'accountsReceivables', 'inventory', 'accountsPayables', 'otherWorkingCapital', 'otherNonCashItems', 'netCashProvidedByOperatingActivities', 'investmentsInPropertyPlantAndEquipment', 'acquisitionsNet', 'purchasesOfInvestments', 'salesMaturitiesOfInvestments', 'otherInvestingActivities', 'netCashProvidedByInvestingActivities', 'netDebtIssuance', 'longTermNetDebtIssuance', 'shortTermNetDebtIssuance', 'netStockIssuance', 'netCommonStockIssuance', 'commonStockIssuance', 'commonStockRepurchased', 'netPreferredStockIssuance', 'netDividendsPaid', 'commonDividendsPaid', 'preferredDividendsPaid', 'otherFinancingActivities', 'netCashProvidedByFinancingActivities', 'effectOfForexChangesOnCash', 'netChangeInCash', 'cashAtEndOfPeriod', 'cashAtBeginningOfPeriod', 'operatingCashFlow', 'capitalExpenditure', 'freeCashFlow', 'incomeTaxesPaid', 'interestPaid'] as const
export const cashFlowStatement = tool({
	description: 'Retrieves cash flow statements for a company.',
	inputSchema: z.object({
		symbol: z.string().describe('The stock symbol (e.g., "AAPL").'),
		options: z.object({
			period: z.enum(['quarter', 'annual', 'Q1', 'Q2', 'Q3', 'Q4', 'FY']).nullable().describe('The financial period (\'quarter\', \'annual\', \'Q1\', \'Q2\', \'Q3\', \'Q4\', \'FY\').'),
			limit: z.number().nullable().describe('The maximum number of results to return. E.g., 50.'),
		}).optional().describe('Optional parameters for limit and period.'),
		values: z.array(z.enum(CASH_FLOW_STATEMENT_RESULT_VALUES)).nullable().optional().describe('Specific fields to return from the results.'),
	}),
	execute: async ({ symbol, options, values }) => {
		try {
			const results = await fmp.cashFlowStatement(symbol, options ?? undefined)
			return applyFieldSelection(results, values)
		}
		catch (error: any) {
			console.error('Error in cashFlowStatementTool:', error)
			return { result: error.message || 'An unexpected error occurred in cashFlowStatementTool', isError: true }
		}
	},
})

const LATEST_FINANCIAL_STATEMENTS_RESULT_VALUES = ['symbol', 'calendarYear', 'period', 'date', 'dateAdded'] as const
export const latestFinancialStatements = tool({
	description: 'Retrieves metadata for the latest available financial statements.',
	inputSchema: z.object({
		options: z.object({
			page: z.number().nullable().describe('The page number for pagination. E.g., 0.'),
			limit: z.number().nullable().describe('The maximum number of results to return. E.g., 50.'),
		}).optional().describe('Optional parameters for pagination.'),
		values: z.array(z.enum(LATEST_FINANCIAL_STATEMENTS_RESULT_VALUES)).nullable().optional().describe('Specific fields to return from the results.'),
	}),
	execute: async ({ options, values }) => {
		try {
			const results = await fmp.latestFinancialStatements(options ?? undefined)
			return applyFieldSelection(results, values)
		}
		catch (error: any) {
			console.error('Error in latestFinancialStatementsTool:', error)
			return { result: error.message || 'An unexpected error occurred in latestFinancialStatementsTool', isError: true }
		}
	},
})

const INCOME_STATEMENT_TTM_RESULT_VALUES = ['date', 'symbol', 'reportedCurrency', 'cik', 'filingDate', 'acceptedDate', 'fiscalYear', 'period', 'revenue', 'costOfRevenue', 'grossProfit', 'researchAndDevelopmentExpenses', 'generalAndAdministrativeExpenses', 'sellingAndMarketingExpenses', 'sellingGeneralAndAdministrativeExpenses', 'otherExpenses', 'operatingExpenses', 'costAndExpenses', 'netInterestIncome', 'interestIncome', 'interestExpense', 'depreciationAndAmortization', 'ebitda', 'ebit', 'nonOperatingIncomeExcludingInterest', 'operatingIncome', 'totalOtherIncomeExpensesNet', 'incomeBeforeTax', 'incomeTaxExpense', 'netIncomeFromContinuingOperations', 'netIncomeFromDiscontinuedOperations', 'otherAdjustmentsToNetIncome', 'netIncome', 'netIncomeDeductions', 'bottomLineNetIncome', 'eps', 'epsDiluted', 'weightedAverageShsOut', 'weightedAverageShsOutDil'] as const
export const incomeStatementTtm = tool({
	description: 'Retrieves Trailing Twelve Months (TTM) income statements for a company.',
	inputSchema: z.object({
		symbol: z.string().describe('The stock symbol (e.g., "AAPL").'),
		options: z.object({
			limit: z.number().nullable().describe('The maximum number of results to return. E.g., 50.'),
		}).optional().describe('Optional parameters for limit.'),
		values: z.array(z.enum(INCOME_STATEMENT_TTM_RESULT_VALUES)).nullable().optional().describe('Specific fields to return from the results.'),
	}),
	execute: async ({ symbol, options, values }) => {
		try {
			const results = await fmp.incomeStatementTtm(symbol, options ?? undefined)
			return applyFieldSelection(results, values)
		}
		catch (error: any) {
			console.error('Error in incomeStatementTtmTool:', error)
			return { result: error.message || 'An unexpected error occurred in incomeStatementTtmTool', isError: true }
		}
	},
})

const BALANCE_SHEET_STATEMENT_TTM_RESULT_VALUES = ['date', 'symbol', 'reportedCurrency', 'cik', 'filingDate', 'acceptedDate', 'fiscalYear', 'period', 'cashAndCashEquivalents', 'shortTermInvestments', 'cashAndShortTermInvestments', 'netReceivables', 'accountsReceivables', 'otherReceivables', 'inventory', 'prepaids', 'otherCurrentAssets', 'totalCurrentAssets', 'propertyPlantEquipmentNet', 'goodwill', 'intangibleAssets', 'goodwillAndIntangibleAssets', 'longTermInvestments', 'taxAssets', 'otherNonCurrentAssets', 'totalNonCurrentAssets', 'otherAssets', 'totalAssets', 'totalPayables', 'accountPayables', 'otherPayables', 'accruedExpenses', 'shortTermDebt', 'capitalLeaseObligationsCurrent', 'taxPayables', 'deferredRevenue', 'otherCurrentLiabilities', 'totalCurrentLiabilities', 'longTermDebt', 'deferredRevenueNonCurrent', 'deferredTaxLiabilitiesNonCurrent', 'otherNonCurrentLiabilities', 'totalNonCurrentLiabilities', 'otherLiabilities', 'capitalLeaseObligations', 'totalLiabilities', 'treasuryStock', 'preferredStock', 'commonStock', 'retainedEarnings', 'additionalPaidInCapital', 'accumulatedOtherComprehensiveIncomeLoss', 'otherTotalStockholdersEquity', 'totalStockholdersEquity', 'totalEquity', 'minorityInterest', 'totalLiabilitiesAndTotalEquity', 'totalInvestments', 'totalDebt', 'netDebt'] as const
export const balanceSheetStatementTtm = tool({
	description: 'Retrieves Trailing Twelve Months (TTM) balance sheet statements for a company.',
	inputSchema: z.object({
		symbol: z.string().describe('The stock symbol (e.g., "AAPL").'),
		options: z.object({
			limit: z.number().nullable().describe('The maximum number of results to return. E.g., 50.'),
		}).optional().describe('Optional parameters for limit.'),
		values: z.array(z.enum(BALANCE_SHEET_STATEMENT_TTM_RESULT_VALUES)).nullable().optional().describe('Specific fields to return from the results.'),
	}),
	execute: async ({ symbol, options, values }) => {
		try {
			const results = await fmp.balanceSheetStatementTtm(symbol, options ?? undefined)
			return applyFieldSelection(results, values)
		}
		catch (error: any) {
			console.error('Error in balanceSheetStatementTtmTool:', error)
			return { result: error.message || 'An unexpected error occurred in balanceSheetStatementTtmTool', isError: true }
		}
	},
})

const CASH_FLOW_STATEMENT_TTM_RESULT_VALUES = ['date', 'symbol', 'reportedCurrency', 'cik', 'filingDate', 'acceptedDate', 'fiscalYear', 'period', 'netIncome', 'depreciationAndAmortization', 'deferredIncomeTax', 'stockBasedCompensation', 'changeInWorkingCapital', 'accountsReceivables', 'inventory', 'accountsPayables', 'otherWorkingCapital', 'otherNonCashItems', 'netCashProvidedByOperatingActivities', 'investmentsInPropertyPlantAndEquipment', 'acquisitionsNet', 'purchasesOfInvestments', 'salesMaturitiesOfInvestments', 'otherInvestingActivities', 'netCashProvidedByInvestingActivities', 'netDebtIssuance', 'longTermNetDebtIssuance', 'shortTermNetDebtIssuance', 'netStockIssuance', 'netCommonStockIssuance', 'commonStockIssuance', 'commonStockRepurchased', 'netPreferredStockIssuance', 'netDividendsPaid', 'commonDividendsPaid', 'preferredDividendsPaid', 'otherFinancingActivities', 'netCashProvidedByFinancingActivities', 'effectOfForexChangesOnCash', 'netChangeInCash', 'cashAtEndOfPeriod', 'cashAtBeginningOfPeriod', 'operatingCashFlow', 'capitalExpenditure', 'freeCashFlow', 'incomeTaxesPaid', 'interestPaid'] as const
export const cashFlowStatementTtm = tool({
	description: 'Retrieves Trailing Twelve Months (TTM) cash flow statements for a company.',
	inputSchema: z.object({
		symbol: z.string().describe('The stock symbol (e.g., "AAPL").'),
		options: z.object({
			limit: z.number().nullable().describe('The maximum number of results to return. E.g., 50.'),
		}).optional().describe('Optional parameters for limit.'),
		values: z.array(z.enum(CASH_FLOW_STATEMENT_TTM_RESULT_VALUES)).nullable().optional().describe('Specific fields to return from the results.'),
	}),
	execute: async ({ symbol, options, values }) => {
		try {
			const results = await fmp.cashFlowStatementTtm(symbol, options ?? undefined)
			return applyFieldSelection(results, values)
		}
		catch (error: any) {
			console.error('Error in cashFlowStatementTtmTool:', error)
			return { result: error.message || 'An unexpected error occurred in cashFlowStatementTtmTool', isError: true }
		}
	},
})

const KEY_METRICS_RESULT_VALUES = ['symbol', 'date', 'fiscalYear', 'period', 'reportedCurrency', 'marketCap', 'enterpriseValue', 'evToSales', 'evToOperatingCashFlow', 'evToFreeCashFlow', 'evToEBITDA', 'netDebtToEBITDA', 'currentRatio', 'incomeQuality', 'grahamNumber', 'grahamNetNet', 'taxBurden', 'interestBurden', 'workingCapital', 'investedCapital', 'returnOnAssets', 'operatingReturnOnAssets', 'returnOnTangibleAssets', 'returnOnEquity', 'returnOnInvestedCapital', 'returnOnCapitalEmployed', 'earningsYield', 'freeCashFlowYield', 'capexToOperatingCashFlow', 'capexToDepreciation', 'capexToRevenue', 'salesGeneralAndAdministrativeToRevenue', 'researchAndDevelopementToRevenue', 'stockBasedCompensationToRevenue', 'intangiblesToTotalAssets', 'averageReceivables', 'averagePayables', 'averageInventory', 'daysOfSalesOutstanding', 'daysOfPayablesOutstanding', 'daysOfInventoryOutstanding', 'operatingCycle', 'cashConversionCycle', 'freeCashFlowToEquity', 'freeCashFlowToFirm', 'tangibleAssetValue', 'netCurrentAssetValue'] as const
export const keyMetrics = tool({
	description: 'Retrieves key financial metrics for a company.',
	inputSchema: z.object({
		symbol: z.string().describe('The stock symbol (e.g., "AAPL").'),
		options: z.object({
			period: z.enum(['quarter', 'annual', 'Q1', 'Q2', 'Q3', 'Q4', 'FY']).nullable().describe('The financial period (\'quarter\', \'annual\', \'Q1\', \'Q2\', \'Q3\', \'Q4\', \'FY\').'),
			limit: z.number().nullable().describe('The maximum number of results to return. E.g., 50.'),
		}).optional().describe('Optional parameters for limit and period (same as FinancialStatementOptions).'),
		values: z.array(z.enum(KEY_METRICS_RESULT_VALUES)).nullable().optional().describe('Specific fields to return from the results.'),
	}),
	execute: async ({ symbol, options, values }) => {
		try {
			const results = await fmp.keyMetrics(symbol, options ?? undefined)
			return applyFieldSelection(results, values)
		}
		catch (error: any) {
			console.error('Error in keyMetricsTool:', error)
			return { result: error.message || 'An unexpected error occurred in keyMetricsTool', isError: true }
		}
	},
})

const FINANCIAL_RATIOS_RESULT_VALUES = ['symbol', 'date', 'fiscalYear', 'period', 'reportedCurrency', 'grossProfitMargin', 'ebitMargin', 'ebitdaMargin', 'operatingProfitMargin', 'pretaxProfitMargin', 'continuousOperationsProfitMargin', 'netProfitMargin', 'bottomLineProfitMargin', 'receivablesTurnover', 'payablesTurnover', 'inventoryTurnover', 'fixedAssetTurnover', 'assetTurnover', 'currentRatio', 'quickRatio', 'solvencyRatio', 'cashRatio', 'priceToEarningsRatio', 'priceToEarningsGrowthRatio', 'forwardPriceToEarningsGrowthRatio', 'priceToBookRatio', 'priceToSalesRatio', 'priceToFreeCashFlowRatio', 'priceToOperatingCashFlowRatio', 'debtToAssetsRatio', 'debtToEquityRatio', 'debtToCapitalRatio', 'longTermDebtToCapitalRatio', 'financialLeverageRatio', 'workingCapitalTurnoverRatio', 'operatingCashFlowRatio', 'operatingCashFlowSalesRatio', 'freeCashFlowOperatingCashFlowRatio', 'debtServiceCoverageRatio', 'interestCoverageRatio', 'shortTermOperatingCashFlowCoverageRatio', 'operatingCashFlowCoverageRatio', 'capitalExpenditureCoverageRatio', 'dividendPaidAndCapexCoverageRatio', 'dividendPayoutRatio', 'dividendYield', 'dividendYieldPercentage', 'revenuePerShare', 'netIncomePerShare', 'interestDebtPerShare', 'cashPerShare', 'bookValuePerShare', 'tangibleBookValuePerShare', 'shareholdersEquityPerShare', 'operatingCashFlowPerShare', 'capexPerShare', 'freeCashFlowPerShare', 'netIncomePerEBT', 'ebtPerEbit', 'priceToFairValue', 'debtToMarketCap', 'effectiveTaxRate', 'enterpriseValueMultiple'] as const
export const financialRatios = tool({
	description: 'Retrieves financial ratios for a company.',
	inputSchema: z.object({
		symbol: z.string().describe('The stock symbol (e.g., "AAPL").'),
		options: z.object({
			period: z.enum(['quarter', 'annual', 'Q1', 'Q2', 'Q3', 'Q4', 'FY']).nullable().describe('The financial period (\'quarter\', \'annual\', \'Q1\', \'Q2\', \'Q3\', \'Q4\', \'FY\').'),
			limit: z.number().nullable().describe('The maximum number of results to return. E.g., 50.'),
		}).optional().describe('Optional parameters for limit and period (same as FinancialStatementOptions).'),
		values: z.array(z.enum(FINANCIAL_RATIOS_RESULT_VALUES)).nullable().optional().describe('Specific fields to return from the results.'),
	}),
	execute: async ({ symbol, options, values }) => {
		try {
			const results = await fmp.financialRatios(symbol, options ?? undefined)
			return applyFieldSelection(results, values)
		}
		catch (error: any) {
			console.error('Error in financialRatiosTool:', error)
			return { result: error.message || 'An unexpected error occurred in financialRatiosTool', isError: true }
		}
	},
})

const KEY_METRICS_TTM_RESULT_VALUES = ['symbol', 'marketCap', 'marketCapTTM', 'enterpriseValueTTM', 'evToSalesTTM', 'evToOperatingCashFlowTTM', 'evToFreeCashFlowTTM', 'evToEBITDATTM', 'netDebtToEBITDATTM', 'currentRatioTTM', 'incomeQualityTTM', 'grahamNumberTTM', 'grahamNetNetTTM', 'taxBurdenTTM', 'interestBurdenTTM', 'workingCapitalTTM', 'investedCapitalTTM', 'returnOnAssetsTTM', 'operatingReturnOnAssetsTTM', 'returnOnTangibleAssetsTTM', 'returnOnEquityTTM', 'returnOnInvestedCapitalTTM', 'returnOnCapitalEmployedTTM', 'earningsYieldTTM', 'freeCashFlowYieldTTM', 'capexToOperatingCashFlowTTM', 'capexToDepreciationTTM', 'capexToRevenueTTM', 'salesGeneralAndAdministrativeToRevenueTTM', 'researchAndDevelopementToRevenueTTM', 'stockBasedCompensationToRevenueTTM', 'intangiblesToTotalAssetsTTM', 'averageReceivablesTTM', 'averagePayablesTTM', 'averageInventoryTTM', 'daysOfSalesOutstandingTTM', 'daysOfPayablesOutstandingTTM', 'daysOfInventoryOutstandingTTM', 'operatingCycleTTM', 'cashConversionCycleTTM', 'freeCashFlowToEquityTTM', 'freeCashFlowToFirmTTM', 'tangibleAssetValueTTM', 'netCurrentAssetValueTTM'] as const
export const keyMetricsTtm = tool({
	description: 'Retrieves Trailing Twelve Months (TTM) key financial metrics for a company.',
	inputSchema: z.object({
		symbol: z.string().describe('The stock symbol (e.g., "AAPL").'),
		values: z.array(z.enum(KEY_METRICS_TTM_RESULT_VALUES)).nullable().optional().describe('Specific fields to return from the results.'),
	}),
	execute: async ({ symbol, values }) => {
		try {
			const results = await fmp.keyMetricsTtm(symbol)
			return applyFieldSelection(results, values)
		}
		catch (error: any) {
			console.error('Error in keyMetricsTtmTool:', error)
			return { result: error.message || 'An unexpected error occurred in keyMetricsTtmTool', isError: true }
		}
	},
})

const FINANCIAL_RATIOS_TTM_RESULT_VALUES = ['symbol', 'grossProfitMarginTTM', 'ebitMarginTTM', 'ebitdaMarginTTM', 'operatingProfitMarginTTM', 'pretaxProfitMarginTTM', 'continuousOperationsProfitMarginTTM', 'netProfitMarginTTM', 'bottomLineProfitMarginTTM', 'receivablesTurnoverTTM', 'payablesTurnoverTTM', 'inventoryTurnoverTTM', 'fixedAssetTurnoverTTM', 'assetTurnoverTTM', 'currentRatioTTM', 'quickRatioTTM', 'solvencyRatioTTM', 'cashRatioTTM', 'priceToEarningsRatioTTM', 'priceToEarningsGrowthRatioTTM', 'forwardPriceToEarningsGrowthRatioTTM', 'priceToBookRatioTTM', 'priceToSalesRatioTTM', 'priceToFreeCashFlowRatioTTM', 'priceToOperatingCashFlowRatioTTM', 'debtToAssetsRatioTTM', 'debtToEquityRatioTTM', 'debtToCapitalRatioTTM', 'longTermDebtToCapitalRatioTTM', 'financialLeverageRatioTTM', 'workingCapitalTurnoverRatioTTM', 'operatingCashFlowRatioTTM', 'operatingCashFlowSalesRatioTTM', 'freeCashFlowOperatingCashFlowRatioTTM', 'debtServiceCoverageRatioTTM', 'interestCoverageRatioTTM', 'shortTermOperatingCashFlowCoverageRatioTTM', 'operatingCashFlowCoverageRatioTTM', 'capitalExpenditureCoverageRatioTTM', 'dividendPaidAndCapexCoverageRatioTTM', 'dividendPayoutRatioTTM', 'dividendYieldTTM', 'dividendYieldPercentageTTM', 'enterpriseValueTTM', 'revenuePerShareTTM', 'netIncomePerShareTTM', 'interestDebtPerShareTTM', 'cashPerShareTTM', 'bookValuePerShareTTM', 'tangibleBookValuePerShareTTM', 'shareholdersEquityPerShareTTM', 'operatingCashFlowPerShareTTM', 'capexPerShareTTM', 'freeCashFlowPerShareTTM', 'netIncomePerEBTTTM', 'ebtPerEbitTTM', 'priceToFairValueTTM', 'debtToMarketCapTTM', 'effectiveTaxRateTTM', 'enterpriseValueMultipleTTM'] as const
export const financialRatiosTtm = tool({
	description: 'Retrieves Trailing Twelve Months (TTM) financial ratios for a company.',
	inputSchema: z.object({
		symbol: z.string().describe('The stock symbol (e.g., "AAPL").'),
		values: z.array(z.enum(FINANCIAL_RATIOS_TTM_RESULT_VALUES)).nullable().optional().describe('Specific fields to return from the results.'),
	}),
	execute: async ({ symbol, values }) => {
		try {
			const results = await fmp.financialRatiosTtm(symbol)
			return applyFieldSelection(results, values)
		}
		catch (error: any) {
			console.error('Error in financialRatiosTtmTool:', error)
			return { result: error.message || 'An unexpected error occurred in financialRatiosTtmTool', isError: true }
		}
	},
})

const FINANCIAL_SCORES_RESULT_VALUES = ['symbol', 'reportedCurrency', 'altmanZScore', 'piotroskiScore', 'workingCapital', 'totalAssets', 'retainedEarnings', 'ebit', 'marketCap', 'totalLiabilities', 'revenue'] as const
export const financialScores = tool({
	description: 'Retrieves financial health scores (Altman Z-Score, Piotroski Score) for a company.',
	inputSchema: z.object({
		symbol: z.string().describe('The stock symbol (e.g., "AAPL").'),
		values: z.array(z.enum(FINANCIAL_SCORES_RESULT_VALUES)).nullable().optional().describe('Specific fields to return from the results.'),
	}),
	execute: async ({ symbol, values }) => {
		try {
			const results = await fmp.financialScores(symbol)
			return applyFieldSelection(results, values)
		}
		catch (error: any) {
			console.error('Error in financialScoresTool:', error)
			return { result: error.message || 'An unexpected error occurred in financialScoresTool', isError: true }
		}
	},
})

const OWNER_EARNINGS_RESULT_VALUES = ['symbol', 'reportedCurrency', 'fiscalYear', 'period', 'date', 'averagePPE', 'maintenanceCapex', 'ownersEarnings', 'growthCapex', 'ownersEarningsPerShare'] as const
export const ownerEarnings = tool({
	description: 'Retrieves owner earnings for a company.',
	inputSchema: z.object({
		symbol: z.string().describe('The stock symbol (e.g., "AAPL").'),
		options: z.object({
			limit: z.number().nullable().describe('The maximum number of results to return. E.g., 50.'),
		}).optional().describe('Optional parameters for limit.'),
		values: z.array(z.enum(OWNER_EARNINGS_RESULT_VALUES)).nullable().optional().describe('Specific fields to return from the results.'),
	}),
	execute: async ({ symbol, options, values }) => {
		try {
			const results = await fmp.ownerEarnings(symbol, options ?? undefined)
			return applyFieldSelection(results, values)
		}
		catch (error: any) {
			console.error('Error in ownerEarningsTool:', error)
			return { result: error.message || 'An unexpected error occurred in ownerEarningsTool', isError: true }
		}
	},
})

const ENTERPRISE_VALUES_RESULT_VALUES = ['symbol', 'date', 'stockPrice', 'numberOfShares', 'marketCapitalization', 'minusCashAndCashEquivalents', 'addTotalDebt', 'enterpriseValue'] as const
export const enterpriseValues = tool({
	description: 'Retrieves enterprise values for a company.',
	inputSchema: z.object({
		symbol: z.string().describe('The stock symbol (e.g., "AAPL").'),
		options: z.object({
			period: z.enum(['quarter', 'annual', 'Q1', 'Q2', 'Q3', 'Q4', 'FY']).nullable().describe('The financial period (\'quarter\', \'annual\', \'Q1\', \'Q2\', \'Q3\', \'Q4\', \'FY\').'),
			limit: z.number().nullable().describe('The maximum number of results to return. E.g., 50.'),
		}).optional().describe('Optional parameters for limit and period (same as FinancialStatementOptions).'),
		values: z.array(z.enum(ENTERPRISE_VALUES_RESULT_VALUES)).nullable().optional().describe('Specific fields to return from the results.'),
	}),
	execute: async ({ symbol, options, values }) => {
		try {
			const results = await fmp.enterpriseValues(symbol, options ?? undefined)
			return applyFieldSelection(results, values)
		}
		catch (error: any) {
			console.error('Error in enterpriseValuesTool:', error)
			return { result: error.message || 'An unexpected error occurred in enterpriseValuesTool', isError: true }
		}
	},
})

const INCOME_STATEMENT_GROWTH_RESULT_VALUES = ['symbol', 'date', 'fiscalYear', 'period', 'reportedCurrency', 'growthRevenue', 'growthCostOfRevenue', 'growthGrossProfit', 'growthGrossProfitRatio', 'growthResearchAndDevelopmentExpenses', 'growthGeneralAndAdministrativeExpenses', 'growthSellingAndMarketingExpenses', 'growthOtherExpenses', 'growthOperatingExpenses', 'growthCostAndExpenses', 'growthInterestIncome', 'growthInterestExpense', 'growthDepreciationAndAmortization', 'growthEBITDA', 'growthOperatingIncome', 'growthIncomeBeforeTax', 'growthIncomeTaxExpense', 'growthNetIncome', 'growthEPS', 'growthEPSDiluted', 'growthWeightedAverageShsOut', 'growthWeightedAverageShsOutDil', 'growthEBIT', 'growthNonOperatingIncomeExcludingInterest', 'growthNetInterestIncome', 'growthTotalOtherIncomeExpensesNet', 'growthNetIncomeFromContinuingOperations', 'growthOtherAdjustmentsToNetIncome', 'growthNetIncomeDeductions'] as const
export const incomeStatementGrowth = tool({
	description: 'Retrieves income statement growth metrics for a company.',
	inputSchema: z.object({
		symbol: z.string().describe('The stock symbol (e.g., "AAPL").'),
		options: z.object({
			period: z.enum(['quarter', 'annual', 'Q1', 'Q2', 'Q3', 'Q4', 'FY']).nullable().describe('The financial period (\'quarter\', \'annual\', \'Q1\', \'Q2\', \'Q3\', \'Q4\', \'FY\').'),
			limit: z.number().nullable().describe('The maximum number of results to return. E.g., 50.'),
		}).optional().describe('Optional parameters for limit and period (same as FinancialStatementOptions).'),
		values: z.array(z.enum(INCOME_STATEMENT_GROWTH_RESULT_VALUES)).nullable().optional().describe('Specific fields to return from the results.'),
	}),
	execute: async ({ symbol, options, values }) => {
		try {
			const results = await fmp.incomeStatementGrowth(symbol, options ?? undefined)
			return applyFieldSelection(results, values)
		}
		catch (error: any) {
			console.error('Error in incomeStatementGrowthTool:', error)
			return { result: error.message || 'An unexpected error occurred in incomeStatementGrowthTool', isError: true }
		}
	},
})

const BALANCE_SHEET_STATEMENT_GROWTH_RESULT_VALUES = ['symbol', 'date', 'fiscalYear', 'period', 'reportedCurrency', 'growthCashAndCashEquivalents', 'growthShortTermInvestments', 'growthCashAndShortTermInvestments', 'growthNetReceivables', 'growthInventory', 'growthOtherCurrentAssets', 'growthTotalCurrentAssets', 'growthPropertyPlantEquipmentNet', 'growthGoodwill', 'growthIntangibleAssets', 'growthGoodwillAndIntangibleAssets', 'growthLongTermInvestments', 'growthTaxAssets', 'growthOtherNonCurrentAssets', 'growthTotalNonCurrentAssets', 'growthOtherAssets', 'growthTotalAssets', 'growthAccountPayables', 'growthShortTermDebt', 'growthTaxPayables', 'growthDeferredRevenue', 'growthOtherCurrentLiabilities', 'growthTotalCurrentLiabilities', 'growthLongTermDebt', 'growthDeferredRevenueNonCurrent', 'growthDeferredTaxLiabilitiesNonCurrent', 'growthOtherNonCurrentLiabilities', 'growthTotalNonCurrentLiabilities', 'growthOtherLiabilities', 'growthTotalLiabilities', 'growthPreferredStock', 'growthCommonStock', 'growthRetainedEarnings', 'growthAccumulatedOtherComprehensiveIncomeLoss', 'growthOthertotalStockholdersEquity', 'growthTotalStockholdersEquity', 'growthMinorityInterest', 'growthTotalEquity', 'growthTotalLiabilitiesAndStockholdersEquity', 'growthTotalInvestments', 'growthTotalDebt', 'growthNetDebt', 'growthAccountsReceivables', 'growthOtherReceivables', 'growthPrepaids', 'growthTotalPayables', 'growthOtherPayables', 'growthAccruedExpenses', 'growthCapitalLeaseObligationsCurrent', 'growthAdditionalPaidInCapital', 'growthTreasuryStock'] as const
export const balanceSheetStatementGrowth = tool({
	description: 'Retrieves balance sheet statement growth metrics for a company.',
	inputSchema: z.object({
		symbol: z.string().describe('The stock symbol (e.g., "AAPL").'),
		options: z.object({
			period: z.enum(['quarter', 'annual', 'Q1', 'Q2', 'Q3', 'Q4', 'FY']).nullable().describe('The financial period (\'quarter\', \'annual\', \'Q1\', \'Q2\', \'Q3\', \'Q4\', \'FY\').'),
			limit: z.number().nullable().describe('The maximum number of results to return. E.g., 50.'),
		}).optional().describe('Optional parameters for limit and period (same as FinancialStatementOptions).'),
		values: z.array(z.enum(BALANCE_SHEET_STATEMENT_GROWTH_RESULT_VALUES)).nullable().optional().describe('Specific fields to return from the results.'),
	}),
	execute: async ({ symbol, options, values }) => {
		try {
			const results = await fmp.balanceSheetStatementGrowth(symbol, options ?? undefined)
			return applyFieldSelection(results, values)
		}
		catch (error: any) {
			console.error('Error in balanceSheetStatementGrowthTool:', error)
			return { result: error.message || 'An unexpected error occurred in balanceSheetStatementGrowthTool', isError: true }
		}
	},
})

const CASH_FLOW_STATEMENT_GROWTH_RESULT_VALUES = ['symbol', 'date', 'fiscalYear', 'period', 'reportedCurrency', 'growthNetIncome', 'growthDepreciationAndAmortization', 'growthDeferredIncomeTax', 'growthStockBasedCompensation', 'growthChangeInWorkingCapital', 'growthAccountsReceivables', 'growthInventory', 'growthAccountsPayables', 'growthOtherWorkingCapital', 'growthOtherNonCashItems', 'growthNetCashProvidedByOperatingActivites', 'growthInvestmentsInPropertyPlantAndEquipment', 'growthAcquisitionsNet', 'growthPurchasesOfInvestments', 'growthSalesMaturitiesOfInvestments', 'growthOtherInvestingActivites', 'growthNetCashUsedForInvestingActivites', 'growthDebtRepayment', 'growthCommonStockIssued', 'growthCommonStockRepurchased', 'growthDividendsPaid', 'growthOtherFinancingActivites', 'growthNetCashUsedProvidedByFinancingActivities', 'growthEffectOfForexChangesOnCash', 'growthNetChangeInCash', 'growthCashAtEndOfPeriod', 'growthCashAtBeginningOfPeriod', 'growthOperatingCashFlow', 'growthCapitalExpenditure', 'growthFreeCashFlow', 'growthNetDebtIssuance', 'growthLongTermNetDebtIssuance', 'growthShortTermNetDebtIssuance', 'growthNetStockIssuance', 'growthPreferredDividendsPaid', 'growthIncomeTaxesPaid', 'growthInterestPaid'] as const
export const cashFlowStatementGrowth = tool({
	description: 'Retrieves cash flow statement growth metrics for a company.',
	inputSchema: z.object({
		symbol: z.string().describe('The stock symbol (e.g., "AAPL").'),
		options: z.object({
			period: z.enum(['quarter', 'annual', 'Q1', 'Q2', 'Q3', 'Q4', 'FY']).nullable().describe('The financial period (\'quarter\', \'annual\', \'Q1\', \'Q2\', \'Q3\', \'Q4\', \'FY\').'),
			limit: z.number().nullable().describe('The maximum number of results to return. E.g., 50.'),
		}).optional().describe('Optional parameters for limit and period (same as FinancialStatementOptions).'),
		values: z.array(z.enum(CASH_FLOW_STATEMENT_GROWTH_RESULT_VALUES)).nullable().optional().describe('Specific fields to return from the results.'),
	}),
	execute: async ({ symbol, options, values }) => {
		try {
			const results = await fmp.cashFlowStatementGrowth(symbol, options ?? undefined)
			return applyFieldSelection(results, values)
		}
		catch (error: any) {
			console.error('Error in cashFlowStatementGrowthTool:', error)
			return { result: error.message || 'An unexpected error occurred in cashFlowStatementGrowthTool', isError: true }
		}
	},
})

const FINANCIAL_STATEMENT_GROWTH_RESULT_VALUES = ['symbol', 'date', 'fiscalYear', 'period', 'reportedCurrency', 'revenueGrowth', 'grossProfitGrowth', 'ebitgrowth', 'operatingIncomeGrowth', 'netIncomeGrowth', 'epsgrowth', 'epsdilutedGrowth', 'weightedAverageSharesGrowth', 'weightedAverageSharesDilutedGrowth', 'dividendsPerShareGrowth', 'operatingCashFlowGrowth', 'receivablesGrowth', 'inventoryGrowth', 'assetGrowth', 'bookValueperShareGrowth', 'debtGrowth', 'rdexpenseGrowth', 'sgaexpensesGrowth', 'freeCashFlowGrowth', 'tenYRevenueGrowthPerShare', 'fiveYRevenueGrowthPerShare', 'threeYRevenueGrowthPerShare', 'tenYOperatingCFGrowthPerShare', 'fiveYOperatingCFGrowthPerShare', 'threeYOperatingCFGrowthPerShare', 'tenYNetIncomeGrowthPerShare', 'fiveYNetIncomeGrowthPerShare', 'threeYNetIncomeGrowthPerShare', 'tenYShareholdersEquityGrowthPerShare', 'fiveYShareholdersEquityGrowthPerShare', 'threeYShareholdersEquityGrowthPerShare', 'tenYDividendperShareGrowthPerShare', 'fiveYDividendperShareGrowthPerShare', 'threeYDividendperShareGrowthPerShare', 'ebitdaGrowth', 'growthCapitalExpenditure', 'tenYBottomLineNetIncomeGrowthPerShare', 'fiveYBottomLineNetIncomeGrowthPerShare', 'threeYBottomLineNetIncomeGrowthPerShare'] as const
export const financialStatementGrowth = tool({
	description: 'Retrieves overall financial statement growth metrics for a company.',
	inputSchema: z.object({
		symbol: z.string().describe('The stock symbol (e.g., "AAPL").'),
		options: z.object({
			period: z.enum(['quarter', 'annual', 'Q1', 'Q2', 'Q3', 'Q4', 'FY']).nullable().describe('The financial period (\'quarter\', \'annual\', \'Q1\', \'Q2\', \'Q3\', \'Q4\', \'FY\').'),
			limit: z.number().nullable().describe('The maximum number of results to return. E.g., 50.'),
		}).optional().describe('Optional parameters for limit and period (same as FinancialStatementOptions).'),
		values: z.array(z.enum(FINANCIAL_STATEMENT_GROWTH_RESULT_VALUES)).nullable().optional().describe('Specific fields to return from the results.'),
	}),
	execute: async ({ symbol, options, values }) => {
		try {
			const results = await fmp.financialStatementGrowth(symbol, options ?? undefined)
			return applyFieldSelection(results, values)
		}
		catch (error: any) {
			console.error('Error in financialStatementGrowthTool:', error)
			return { result: error.message || 'An unexpected error occurred in financialStatementGrowthTool', isError: true }
		}
	},
})

const FINANCIAL_REPORT_JSON_RESULT_VALUES = ['symbol', 'period', 'year', 'data'] as const
export const financialReportJson = tool({
	description: 'Retrieves a company\'s annual (10-K) or quarterly (10-Q) report in JSON format.',
	inputSchema: z.object({
		symbol: z.string().describe('The stock symbol (e.g., "AAPL").'),
		options: z.object({
			year: z.number().describe('The year of the report. E.g., 2022.'),
			period: z.enum(['Q1', 'Q2', 'Q3', 'Q4', 'FY']).describe('The financial period (\'Q1\', \'Q2\', \'Q3\', \'Q4\', \'FY\').'),
		}).describe('Options specifying the year and period.'),
		values: z.array(z.enum(FINANCIAL_REPORT_JSON_RESULT_VALUES)).nullable().optional().describe('Specific fields to return from the results.'),
	}),
	execute: async ({ symbol, options, values }) => {
		try {
			const results = await fmp.financialReportJson(symbol, options)
			return applyFieldSelection(results, values)
		}
		catch (error: any) {
			console.error('Error in financialReportJsonTool:', error)
			return { result: error.message || 'An unexpected error occurred in financialReportJsonTool', isError: true }
		}
	},
})

const REVENUE_PRODUCT_SEGMENTATION_RESULT_VALUES = ['symbol', 'fiscalYear', 'period', 'reportedCurrency', 'date', 'data'] as const
export const revenueProductSegmentation = tool({
	description: 'Retrieves revenue breakdown by product line for a company.',
	inputSchema: z.object({
		symbol: z.string().describe('The stock symbol (e.g., "AAPL").'),
		options: z.object({
			period: z.enum(['quarter', 'annual']).nullable().describe('The reporting period, \'annual\' or \'quarter\'.'),
			structure: z.string().nullable().describe('The structure of the response, e.g., \'flat\'.'),
		}).optional().describe('Optional parameters for period and structure.'),
		values: z.array(z.enum(REVENUE_PRODUCT_SEGMENTATION_RESULT_VALUES)).nullable().optional().describe('Specific fields to return from the results.'),
	}),
	execute: async ({ symbol, options, values }) => {
		try {
			const results = await fmp.revenueProductSegmentation(symbol, options ?? undefined)
			return applyFieldSelection(results, values)
		}
		catch (error: any) {
			console.error('Error in revenueProductSegmentationTool:', error)
			return { result: error.message || 'An unexpected error occurred in revenueProductSegmentationTool', isError: true }
		}
	},
})

const REVENUE_GEOGRAPHIC_SEGMENTATION_RESULT_VALUES = ['symbol', 'fiscalYear', 'period', 'reportedCurrency', 'date', 'data'] as const
export const revenueGeographicSegmentation = tool({
	description: 'Retrieves revenue breakdown by geographic region for a company.',
	inputSchema: z.object({
		symbol: z.string().describe('The stock symbol (e.g., "AAPL").'),
		options: z.object({
			period: z.enum(['quarter', 'annual']).nullable().describe('The reporting period, \'annual\' or \'quarter\'.'),
			structure: z.string().nullable().describe('The structure of the response, e.g., \'flat\'.'),
		}).optional().describe('Optional parameters for period and structure (same as RevenueSegmentationOptions).'),
		values: z.array(z.enum(REVENUE_GEOGRAPHIC_SEGMENTATION_RESULT_VALUES)).nullable().optional().describe('Specific fields to return from the results.'),
	}),
	execute: async ({ symbol, options, values }) => {
		try {
			const results = await fmp.revenueGeographicSegmentation(symbol, options ?? undefined)
			return applyFieldSelection(results, values)
		}
		catch (error: any) {
			console.error('Error in revenueGeographicSegmentationTool:', error)
			return { result: error.message || 'An unexpected error occurred in revenueGeographicSegmentationTool', isError: true }
		}
	},
})

const LATEST_INSTITUTIONAL_OWNERSHIP_FILINGS_RESULT_VALUES = ['cik', 'name', 'date', 'filingDate', 'acceptedDate', 'formType', 'link'] as const
export const latestInstitutionalOwnershipFilings = tool({
	description: 'Retrieves the latest institutional ownership (Form 13F) filings.',
	inputSchema: z.object({
		options: z.object({
			page: z.number().nullable().describe('The page number for pagination. E.g., 0.'),
			limit: z.number().nullable().describe('The maximum number of results to return. E.g., 50.'),
		}).optional().describe('Optional parameters for pagination.'),
		values: z.array(z.enum(LATEST_INSTITUTIONAL_OWNERSHIP_FILINGS_RESULT_VALUES)).nullable().optional().describe('Specific fields to return from the results.'),
	}),
	execute: async ({ options, values }) => {
		try {
			const results = await fmp.latestInstitutionalOwnershipFilings(options ?? undefined)
			return applyFieldSelection(results, values)
		}
		catch (error: any) {
			console.error('Error in latestInstitutionalOwnershipFilingsTool:', error)
			return { result: error.message || 'An unexpected error occurred in latestInstitutionalOwnershipFilingsTool', isError: true }
		}
	},
})

const SEC_FILINGS_EXTRACT_RESULT_VALUES = ['date', 'filingDate', 'acceptedDate', 'cik', 'securityCusip', 'symbol', 'nameOfIssuer', 'shares', 'titleOfClass', 'sharesType', 'putCallShare', 'value', 'link'] as const
export const secFilingsExtract = tool({
	description: 'Extracts detailed data from SEC Form 13F filings.',
	inputSchema: z.object({
		options: z.object({
			cik: z.string().describe('The CIK of the institutional investor. E.g., "0001388838".'),
			year: z.union([z.string(), z.number()]).describe('The year of the filing. E.g., "2023".'),
			quarter: z.union([z.string(), z.number()]).describe('The quarter of the filing. E.g., "3".'),
		}).describe('Options specifying CIK, year, and quarter.'),
		values: z.array(z.enum(SEC_FILINGS_EXTRACT_RESULT_VALUES)).nullable().optional().describe('Specific fields to return from the results.'),
	}),
	execute: async ({ options, values }) => {
		try {
			const results = await fmp.secFilingsExtract(options)
			return applyFieldSelection(results, values)
		}
		catch (error: any) {
			console.error('Error in secFilingsExtractTool:', error)
			return { result: error.message || 'An unexpected error occurred in secFilingsExtractTool', isError: true }
		}
	},
})

const FORM13_F_FILING_DATES_RESULT_VALUES = ['date', 'year', 'quarter'] as const
export const form13FFilingDates = tool({
	description: 'Retrieves dates associated with Form 13F filings by an institutional investor.',
	inputSchema: z.object({
		cik: z.string().describe('The CIK of the institutional investor (e.g., "0001067983").'),
		values: z.array(z.enum(FORM13_F_FILING_DATES_RESULT_VALUES)).nullable().optional().describe('Specific fields to return from the results.'),
	}),
	execute: async ({ cik, values }) => {
		try {
			const results = await fmp.form13FFilingDates(cik)
			return applyFieldSelection(results, values)
		}
		catch (error: any) {
			console.error('Error in form13FFilingDatesTool:', error)
			return { result: error.message || 'An unexpected error occurred in form13FFilingDatesTool', isError: true }
		}
	},
})

const FILINGS_EXTRACT_ANALYTICS_BY_HOLDER_RESULT_VALUES = ['date', 'cik', 'filingDate', 'investorName', 'symbol', 'securityName', 'typeOfSecurity', 'securityCusip', 'sharesType', 'putCallShare', 'investmentDiscretion', 'industryTitle', 'weight', 'lastWeight', 'changeInWeight', 'changeInWeightPercentage', 'marketValue', 'lastMarketValue', 'changeInMarketValue', 'changeInMarketValuePercentage', 'sharesNumber', 'lastSharesNumber', 'changeInSharesNumber', 'changeInSharesNumberPercentage', 'quarterEndPrice', 'avgPricePaid', 'isNew', 'isSoldOut', 'ownership', 'lastOwnership', 'changeInOwnership', 'changeInOwnershipPercentage', 'holdingPeriod', 'firstAdded', 'performance', 'performancePercentage', 'lastPerformance', 'changeInPerformance', 'isCountedForPerformance'] as const
export const filingsExtractAnalyticsByHolder = tool({
	description: 'Retrieves an analytical breakdown of institutional filings by holder for a specific stock.',
	inputSchema: z.object({
		options: z.object({
			symbol: z.string().describe('The stock symbol of the holding. E.g., "AAPL".'),
			year: z.union([z.string(), z.number()]).describe('The year of the filing. E.g., "2023".'),
			quarter: z.union([z.string(), z.number()]).describe('The quarter of the filing. E.g., "3".'),
			page: z.number().nullable().describe('The page number for pagination. E.g., 0.'),
			limit: z.number().nullable().describe('The maximum number of results to return. E.g., 50.'),
		}).describe('Options specifying symbol, year, quarter, and pagination.'),
		values: z.array(z.enum(FILINGS_EXTRACT_ANALYTICS_BY_HOLDER_RESULT_VALUES)).nullable().optional().describe('Specific fields to return from the results.'),
	}),
	execute: async ({ options, values }) => {
		try {
			const results = await fmp.filingsExtractAnalyticsByHolder(options)
			return applyFieldSelection(results, values)
		}
		catch (error: any) {
			console.error('Error in filingsExtractAnalyticsByHolderTool:', error)
			return { result: error.message || 'An unexpected error occurred in filingsExtractAnalyticsByHolderTool', isError: true }
		}
	},
})

const HOLDER_PERFORMANCE_SUMMARY_RESULT_VALUES = ['date', 'cik', 'investorName', 'portfolioSize', 'securitiesAdded', 'securitiesRemoved', 'marketValue', 'previousMarketValue', 'changeInMarketValue', 'changeInMarketValuePercentage', 'averageHoldingPeriod', 'averageHoldingPeriodTop10', 'averageHoldingPeriodTop20', 'turnover', 'turnoverAlternateSell', 'turnoverAlternateBuy', 'performance', 'performancePercentage', 'lastPerformance', 'changeInPerformance', 'performance1year', 'performancePercentage1year', 'performance3year', 'performancePercentage3year', 'performance5year', 'performancePercentage5year', 'performanceSinceInception', 'performanceSinceInceptionPercentage', 'performanceRelativeToSP500Percentage', 'performance1yearRelativeToSP500Percentage', 'performance3yearRelativeToSP500Percentage', 'performance5yearRelativeToSP500Percentage', 'performanceSinceInceptionRelativeToSP500Percentage'] as const
export const holderPerformanceSummary = tool({
	description: 'Retrieves a performance summary for an institutional investor.',
	inputSchema: z.object({
		options: z.object({
			cik: z.string().describe('The CIK of the institutional investor. E.g., "0001067983".'),
			page: z.number().nullable().describe('The page number for pagination. E.g., 0.'),
		}).describe('Options specifying CIK and pagination.'),
		values: z.array(z.enum(HOLDER_PERFORMANCE_SUMMARY_RESULT_VALUES)).nullable().optional().describe('Specific fields to return from the results.'),
	}),
	execute: async ({ options, values }) => {
		try {
			const results = await fmp.holderPerformanceSummary(options)
			return applyFieldSelection(results, values)
		}
		catch (error: any) {
			console.error('Error in holderPerformanceSummaryTool:', error)
			return { result: error.message || 'An unexpected error occurred in holderPerformanceSummaryTool', isError: true }
		}
	},
})

const HOLDERS_INDUSTRY_BREAKDOWN_RESULT_VALUES = ['date', 'cik', 'investorName', 'industryTitle', 'weight', 'lastWeight', 'changeInWeight', 'changeInWeightPercentage', 'performance', 'performancePercentage', 'lastPerformance', 'changeInPerformance'] as const
export const holdersIndustryBreakdown = tool({
	description: 'Retrieves the industry breakdown of an institutional investor\'s holdings.',
	inputSchema: z.object({
		options: z.object({
			cik: z.string().describe('The CIK of the institutional investor. E.g., "0001067983".'),
			year: z.union([z.string(), z.number()]).describe('The year of the filing. E.g., "2023".'),
			quarter: z.union([z.string(), z.number()]).describe('The quarter of the filing. E.g., "3".'),
		}).describe('Options specifying CIK, year, and quarter.'),
		values: z.array(z.enum(HOLDERS_INDUSTRY_BREAKDOWN_RESULT_VALUES)).nullable().optional().describe('Specific fields to return from the results.'),
	}),
	execute: async ({ options, values }) => {
		try {
			const results = await fmp.holdersIndustryBreakdown(options)
			return applyFieldSelection(results, values)
		}
		catch (error: any) {
			console.error('Error in holdersIndustryBreakdownTool:', error)
			return { result: error.message || 'An unexpected error occurred in holdersIndustryBreakdownTool', isError: true }
		}
	},
})

const POSITIONS_SUMMARY_RESULT_VALUES = ['symbol', 'cik', 'date', 'investorsHolding', 'lastInvestorsHolding', 'investorsHoldingChange', 'numberOf13Fshares', 'lastNumberOf13Fshares', 'numberOf13FsharesChange', 'totalInvested', 'lastTotalInvested', 'totalInvestedChange', 'ownershipPercent', 'lastOwnershipPercent', 'ownershipPercentChange', 'newPositions', 'lastNewPositions', 'newPositionsChange', 'increasedPositions', 'lastIncreasedPositions', 'increasedPositionsChange', 'closedPositions', 'lastClosedPositions', 'closedPositionsChange', 'reducedPositions', 'lastReducedPositions', 'reducedPositionsChange', 'totalCalls', 'lastTotalCalls', 'totalCallsChange', 'totalPuts', 'lastTotalPuts', 'totalPutsChange', 'putCallRatio', 'lastPutCallRatio', 'putCallRatioChange'] as const
export const positionsSummary = tool({
	description: 'Retrieves a summary of institutional holdings for a specific stock symbol.',
	inputSchema: z.object({
		options: z.object({
			symbol: z.string().describe('The stock symbol. E.g., "AAPL".'),
			year: z.union([z.string(), z.number()]).describe('The year of the filing. E.g., "2023".'),
			quarter: z.union([z.string(), z.number()]).describe('The quarter of the filing. E.g., "3".'),
		}).describe('Options specifying symbol, year, and quarter.'),
		values: z.array(z.enum(POSITIONS_SUMMARY_RESULT_VALUES)).nullable().optional().describe('Specific fields to return from the results.'),
	}),
	execute: async ({ options, values }) => {
		try {
			const results = await fmp.positionsSummary(options)
			return applyFieldSelection(results, values)
		}
		catch (error: any) {
			console.error('Error in positionsSummaryTool:', error)
			return { result: error.message || 'An unexpected error occurred in positionsSummaryTool', isError: true }
		}
	},
})

const INDUSTRY_PERFORMANCE_SUMMARY_RESULT_VALUES = ['industryTitle', 'industryValue', 'date'] as const
export const industryPerformanceSummary = tool({
	description: 'Retrieves a summary of financial performance by industry.',
	inputSchema: z.object({
		options: z.object({
			year: z.union([z.string(), z.number()]).describe('The year of the summary. E.g., "2023".'),
			quarter: z.union([z.string(), z.number()]).describe('The quarter of the summary. E.g., "3".'),
		}).describe('Options specifying year and quarter.'),
		values: z.array(z.enum(INDUSTRY_PERFORMANCE_SUMMARY_RESULT_VALUES)).nullable().optional().describe('Specific fields to return from the results.'),
	}),
	execute: async ({ options, values }) => {
		try {
			const results = await fmp.industryPerformanceSummary(options)
			return applyFieldSelection(results, values)
		}
		catch (error: any) {
			console.error('Error in industryPerformanceSummaryTool:', error)
			return { result: error.message || 'An unexpected error occurred in industryPerformanceSummaryTool', isError: true }
		}
	},
})

const INDEXES_LIST_RESULT_VALUES = ['symbol', 'name', 'exchange', 'currency'] as const
export const indexesList = tool({
	description: 'Retrieves a list of stock market indexes.',
	inputSchema: z.object({
		values: z.array(z.enum(INDEXES_LIST_RESULT_VALUES)).nullable().optional().describe('Specific fields to return from the results.'),
	}),
	execute: async ({ values }) => {
		try {
			const results = await fmp.indexesList()
			return applyFieldSelection(results, values)
		}
		catch (error: any) {
			console.error('Error in indexesListTool:', error)
			return { result: error.message || 'An unexpected error occurred in indexesListTool', isError: true }
		}
	},
})

const INDEX_QUOTE_RESULT_VALUES = ['symbol', 'name', 'price', 'changesPercentage', 'change', 'dayLow', 'dayHigh', 'yearHigh', 'yearLow', 'marketCap', 'priceAvg50', 'priceAvg200', 'exchange', 'volume', 'avgVolume', 'open', 'previousClose', 'eps', 'pe', 'earningsAnnouncement', 'sharesOutstanding', 'timestamp'] as const
export const indexQuote = tool({
	description: 'Retrieves a real-time quote for a stock market index.',
	inputSchema: z.object({
		symbol: z.string().describe('The index symbol (e.g., "^GSPC").'),
		values: z.array(z.enum(INDEX_QUOTE_RESULT_VALUES)).nullable().optional().describe('Specific fields to return from the results.'),
	}),
	execute: async ({ symbol, values }) => {
		try {
			const results = await fmp.indexQuote(symbol)
			return applyFieldSelection(results, values)
		}
		catch (error: any) {
			console.error('Error in indexQuoteTool:', error)
			return { result: error.message || 'An unexpected error occurred in indexQuoteTool', isError: true }
		}
	},
})

export const allIndexQuotes = tool({
	description: 'Retrieves real-time quotes for multiple stock market indexes.',
	inputSchema: z.object({
		options: z.object({
			short: z.boolean().nullable().describe('If true, returns short quotes. E.g., true.'),
		}).optional().describe('Optional parameters.'),
	}),
	execute: async ({ options }) => {
		return fmp.allIndexQuotes(options ?? undefined)
	},
})

const INDEX_CHART_FULL_RESULT_VALUES = ['symbol', 'change', 'changePercent', 'vwap', 'date', 'open', 'high', 'low', 'close', 'volume'] as const
export const indexChartFull = tool({
	description: 'Retrieves full historical end-of-day price data for an index.',
	inputSchema: z.object({
		symbol: z.string().describe('The index symbol (e.g., "^GSPC").'),
		options: z.object({
			from: z.string().nullable().describe('Start date for the calendar (YYYY-MM-DD). E.g., "2025-01-10".'),
			to: z.string().nullable().describe('End date for the calendar (YYYY-MM-DD). E.g., "2025-04-10". Max 90-day range.'),
		}).optional().describe('Optional date range.'),
		values: z.array(z.enum(INDEX_CHART_FULL_RESULT_VALUES)).nullable().optional().describe('Specific fields to return from the results.'),
	}),
	execute: async ({ symbol, options, values }) => {
		try {
			const results = await fmp.indexChartFull(symbol, options ?? undefined)
			return applyFieldSelection(results, values)
		}
		catch (error: any) {
			console.error('Error in indexChartFullTool:', error)
			return { result: error.message || 'An unexpected error occurred in indexChartFullTool', isError: true }
		}
	},
})

const INDEX_CHART1_MIN_RESULT_VALUES = ['date', 'open', 'high', 'low', 'close', 'volume'] as const
export const indexChart1Min = tool({
	description: 'Retrieves 1-minute interval historical index chart data.',
	inputSchema: z.object({
		symbol: z.string().describe('The index symbol (e.g., "^GSPC").'),
		options: z.object({
			from: z.string().nullable().describe('Start date for the calendar (YYYY-MM-DD). E.g., "2025-01-10".'),
			to: z.string().nullable().describe('End date for the calendar (YYYY-MM-DD). E.g., "2025-04-10". Max 90-day range.'),
		}).optional().describe('Optional date range. Note: `nonadjusted` is not in index chart docs.'),
		values: z.array(z.enum(INDEX_CHART1_MIN_RESULT_VALUES)).nullable().optional().describe('Specific fields to return from the results.'),
	}),
	execute: async ({ symbol, options, values }) => {
		try {
			const results = await fmp.indexChart1Min(symbol, options ?? undefined)
			return applyFieldSelection(results, values)
		}
		catch (error: any) {
			console.error('Error in indexChart1MinTool:', error)
			return { result: error.message || 'An unexpected error occurred in indexChart1MinTool', isError: true }
		}
	},
})

const INDEX_CHART5_MIN_RESULT_VALUES = ['date', 'open', 'high', 'low', 'close', 'volume'] as const
export const indexChart5Min = tool({
	description: 'Retrieves 5-minute interval historical index chart data.',
	inputSchema: z.object({
		symbol: z.string().describe('The index symbol (e.g., "^GSPC").'),
		options: z.object({
			from: z.string().nullable().describe('Start date for the calendar (YYYY-MM-DD). E.g., "2025-01-10".'),
			to: z.string().nullable().describe('End date for the calendar (YYYY-MM-DD). E.g., "2025-04-10". Max 90-day range.'),
		}).optional().describe('Optional date range. Note: `nonadjusted` is not in index chart docs.'),
		values: z.array(z.enum(INDEX_CHART5_MIN_RESULT_VALUES)).nullable().optional().describe('Specific fields to return from the results.'),
	}),
	execute: async ({ symbol, options, values }) => {
		try {
			const results = await fmp.indexChart5Min(symbol, options ?? undefined)
			return applyFieldSelection(results, values)
		}
		catch (error: any) {
			console.error('Error in indexChart5MinTool:', error)
			return { result: error.message || 'An unexpected error occurred in indexChart5MinTool', isError: true }
		}
	},
})

const INDEX_CHART1_HOUR_RESULT_VALUES = ['date', 'open', 'high', 'low', 'close', 'volume'] as const
export const indexChart1Hour = tool({
	description: 'Retrieves 1-hour interval historical index chart data.',
	inputSchema: z.object({
		symbol: z.string().describe('The index symbol (e.g., "^GSPC").'),
		options: z.object({
			from: z.string().nullable().describe('Start date for the calendar (YYYY-MM-DD). E.g., "2025-01-10".'),
			to: z.string().nullable().describe('End date for the calendar (YYYY-MM-DD). E.g., "2025-04-10". Max 90-day range.'),
		}).optional().describe('Optional date range. Note: `nonadjusted` is not in index chart docs.'),
		values: z.array(z.enum(INDEX_CHART1_HOUR_RESULT_VALUES)).nullable().optional().describe('Specific fields to return from the results.'),
	}),
	execute: async ({ symbol, options, values }) => {
		try {
			const results = await fmp.indexChart1Hour(symbol, options ?? undefined)
			return applyFieldSelection(results, values)
		}
		catch (error: any) {
			console.error('Error in indexChart1HourTool:', error)
			return { result: error.message || 'An unexpected error occurred in indexChart1HourTool', isError: true }
		}
	},
})

const SP500_CONSTITUENTS_RESULT_VALUES = ['symbol', 'name', 'sector', 'subSector', 'headQuarter', 'dateFirstAdded', 'cik', 'founded'] as const
export const sp500Constituents = tool({
	description: 'Retrieves the current constituents of the S&P 500 index.',
	inputSchema: z.object({
		values: z.array(z.enum(SP500_CONSTITUENTS_RESULT_VALUES)).nullable().optional().describe('Specific fields to return from the results.'),
	}),
	execute: async ({ values }) => {
		try {
			const results = await fmp.sp500Constituents()
			return applyFieldSelection(results, values)
		}
		catch (error: any) {
			console.error('Error in sp500ConstituentsTool:', error)
			return { result: error.message || 'An unexpected error occurred in sp500ConstituentsTool', isError: true }
		}
	},
})

const NASDAQ_CONSTITUENTS_RESULT_VALUES = ['symbol', 'name', 'sector', 'subSector', 'headQuarter', 'dateFirstAdded', 'cik', 'founded'] as const
export const nasdaqConstituents = tool({
	description: 'Retrieves the current constituents of the Nasdaq index.',
	inputSchema: z.object({
		values: z.array(z.enum(NASDAQ_CONSTITUENTS_RESULT_VALUES)).nullable().optional().describe('Specific fields to return from the results.'),
	}),
	execute: async ({ values }) => {
		try {
			const results = await fmp.nasdaqConstituents()
			return applyFieldSelection(results, values)
		}
		catch (error: any) {
			console.error('Error in nasdaqConstituentsTool:', error)
			return { result: error.message || 'An unexpected error occurred in nasdaqConstituentsTool', isError: true }
		}
	},
})

const DOW_JONES_CONSTITUENTS_RESULT_VALUES = ['symbol', 'name', 'sector', 'subSector', 'headQuarter', 'dateFirstAdded', 'cik', 'founded'] as const
export const dowJonesConstituents = tool({
	description: 'Retrieves the current constituents of the Dow Jones Industrial Average.',
	inputSchema: z.object({
		values: z.array(z.enum(DOW_JONES_CONSTITUENTS_RESULT_VALUES)).nullable().optional().describe('Specific fields to return from the results.'),
	}),
	execute: async ({ values }) => {
		try {
			const results = await fmp.dowJonesConstituents()
			return applyFieldSelection(results, values)
		}
		catch (error: any) {
			console.error('Error in dowJonesConstituentsTool:', error)
			return { result: error.message || 'An unexpected error occurred in dowJonesConstituentsTool', isError: true }
		}
	},
})

const HISTORICAL_SP500_CONSTITUENTS_RESULT_VALUES = ['dateAdded', 'addedSecurity', 'removedTicker', 'removedSecurity', 'date', 'symbol', 'reason'] as const
export const historicalSp500Constituents = tool({
	description: 'Retrieves historical changes to the S&P 500 index constituents.',
	inputSchema: z.object({
		values: z.array(z.enum(HISTORICAL_SP500_CONSTITUENTS_RESULT_VALUES)).nullable().optional().describe('Specific fields to return from the results.'),
	}),
	execute: async ({ values }) => {
		try {
			const results = await fmp.historicalSp500Constituents()
			return applyFieldSelection(results, values)
		}
		catch (error: any) {
			console.error('Error in historicalSp500ConstituentsTool:', error)
			return { result: error.message || 'An unexpected error occurred in historicalSp500ConstituentsTool', isError: true }
		}
	},
})

const HISTORICAL_NASDAQ_CONSTITUENTS_RESULT_VALUES = ['dateAdded', 'addedSecurity', 'removedTicker', 'removedSecurity', 'date', 'symbol', 'reason'] as const
export const historicalNasdaqConstituents = tool({
	description: 'Retrieves historical changes to the Nasdaq index constituents.',
	inputSchema: z.object({
		values: z.array(z.enum(HISTORICAL_NASDAQ_CONSTITUENTS_RESULT_VALUES)).nullable().optional().describe('Specific fields to return from the results.'),
	}),
	execute: async ({ values }) => {
		try {
			const results = await fmp.historicalNasdaqConstituents()
			return applyFieldSelection(results, values)
		}
		catch (error: any) {
			console.error('Error in historicalNasdaqConstituentsTool:', error)
			return { result: error.message || 'An unexpected error occurred in historicalNasdaqConstituentsTool', isError: true }
		}
	},
})

const HISTORICAL_DOW_JONES_CONSTITUENTS_RESULT_VALUES = ['dateAdded', 'addedSecurity', 'removedTicker', 'removedSecurity', 'date', 'symbol', 'reason'] as const
export const historicalDowJonesConstituents = tool({
	description: 'Retrieves historical changes to the Dow Jones Industrial Average constituents.',
	inputSchema: z.object({
		values: z.array(z.enum(HISTORICAL_DOW_JONES_CONSTITUENTS_RESULT_VALUES)).nullable().optional().describe('Specific fields to return from the results.'),
	}),
	execute: async ({ values }) => {
		try {
			const results = await fmp.historicalDowJonesConstituents()
			return applyFieldSelection(results, values)
		}
		catch (error: any) {
			console.error('Error in historicalDowJonesConstituentsTool:', error)
			return { result: error.message || 'An unexpected error occurred in historicalDowJonesConstituentsTool', isError: true }
		}
	},
})

const LATEST_INSIDER_TRADES_RESULT_VALUES = ['symbol', 'filingDate', 'transactionDate', 'reportingCik', 'companyCik', 'transactionType', 'securitiesOwned', 'reportingName', 'typeOfOwner', 'acquisitionOrDisposition', 'directOrIndirect', 'formType', 'securitiesTransacted', 'price', 'securityName', 'url'] as const
export const latestInsiderTrades = tool({
	description: 'Retrieves the latest insider trading activity.',
	inputSchema: z.object({
		options: z.object({
			date: z.string().nullable().describe('Filter by specific date (YYYY-MM-DD). E.g., "2025-01-10".'),
			page: z.number().nullable().describe('The page number for pagination. E.g., 0.'),
			limit: z.number().nullable().describe('The maximum number of results to return. E.g., 50.'),
		}).optional().describe('Optional parameters for date filter and pagination.'),
		values: z.array(z.enum(LATEST_INSIDER_TRADES_RESULT_VALUES)).nullable().optional().describe('Specific fields to return from the results.'),
	}),
	execute: async ({ options, values }) => {
		try {
			const results = await fmp.latestInsiderTrades(options ?? undefined)
			return applyFieldSelection(results, values)
		}
		catch (error: any) {
			console.error('Error in latestInsiderTradesTool:', error)
			return { result: error.message || 'An unexpected error occurred in latestInsiderTradesTool', isError: true }
		}
	},
})

const SEARCH_INSIDER_TRADES_RESULT_VALUES = ['symbol', 'filingDate', 'transactionDate', 'reportingCik', 'companyCik', 'transactionType', 'securitiesOwned', 'reportingName', 'typeOfOwner', 'acquisitionOrDisposition', 'directOrIndirect', 'formType', 'securitiesTransacted', 'price', 'securityName', 'url'] as const
export const searchInsiderTrades = tool({
	description: 'Searches insider trading activity with various filters.',
	inputSchema: z.object({
		options: z.object({
			symbol: z.string().nullable().describe('Filter by stock symbol. E.g., "AAPL".'),
			reportingCik: z.string().nullable().describe('Filter by reporting CIK. E.g., "0001496686".'),
			companyCik: z.string().nullable().describe('Filter by company CIK. E.g., "0000320193".'),
			transactionType: z.string().nullable().describe('Filter by transaction type (e.g., "S-Sale", "P-Purchase", "A-Award").'),
			page: z.number().nullable().describe('The page number for pagination. E.g., 0.'),
			limit: z.number().nullable().describe('The maximum number of results to return. E.g., 50.'),
		}).optional().describe('Optional parameters for filtering and pagination.'),
		values: z.array(z.enum(SEARCH_INSIDER_TRADES_RESULT_VALUES)).nullable().optional().describe('Specific fields to return from the results.'),
	}),
	execute: async ({ options, values }) => {
		try {
			const results = await fmp.searchInsiderTrades(options ?? undefined)
			return applyFieldSelection(results, values)
		}
		catch (error: any) {
			console.error('Error in searchInsiderTradesTool:', error)
			return { result: error.message || 'An unexpected error occurred in searchInsiderTradesTool', isError: true }
		}
	},
})

const SEARCH_INSIDER_TRADES_BY_REPORTING_NAME_RESULT_VALUES = ['reportingCik', 'reportingName'] as const
export const searchInsiderTradesByReportingName = tool({
	description: 'Searches for insider trading activity by reporting name.',
	inputSchema: z.object({
		name: z.string().describe('The name of the reporting person/entity (e.g., "Zuckerberg").'),
		values: z.array(z.enum(SEARCH_INSIDER_TRADES_BY_REPORTING_NAME_RESULT_VALUES)).nullable().optional().describe('Specific fields to return from the results.'),
	}),
	execute: async ({ name, values }) => {
		try {
			const results = await fmp.searchInsiderTradesByReportingName(name)
			return applyFieldSelection(results, values)
		}
		catch (error: any) {
			console.error('Error in searchInsiderTradesByReportingNameTool:', error)
			return { result: error.message || 'An unexpected error occurred in searchInsiderTradesByReportingNameTool', isError: true }
		}
	},
})

const ALL_INSIDER_TRANSACTION_TYPES_RESULT_VALUES = ['transactionType'] as const
export const allInsiderTransactionTypes = tool({
	description: 'Retrieves a list of all insider transaction types.',
	inputSchema: z.object({
		values: z.array(z.enum(ALL_INSIDER_TRANSACTION_TYPES_RESULT_VALUES)).nullable().optional().describe('Specific fields to return from the results.'),
	}),
	execute: async ({ values }) => {
		try {
			const results = await fmp.allInsiderTransactionTypes()
			return applyFieldSelection(results, values)
		}
		catch (error: any) {
			console.error('Error in allInsiderTransactionTypesTool:', error)
			return { result: error.message || 'An unexpected error occurred in allInsiderTransactionTypesTool', isError: true }
		}
	},
})

const INSIDER_TRADE_STATISTICS_RESULT_VALUES = ['symbol', 'cik', 'year', 'quarter', 'acquiredTransactions', 'disposedTransactions', 'acquiredDisposedRatio', 'totalAcquired', 'totalDisposed', 'averageAcquired', 'averageDisposed', 'totalPurchases', 'totalSales'] as const
export const insiderTradeStatistics = tool({
	description: 'Retrieves statistics on insider trading activity for a specific company.',
	inputSchema: z.object({
		symbol: z.string().describe('The stock symbol (e.g., "AAPL").'),
		values: z.array(z.enum(INSIDER_TRADE_STATISTICS_RESULT_VALUES)).nullable().optional().describe('Specific fields to return from the results.'),
	}),
	execute: async ({ symbol, values }) => {
		try {
			const results = await fmp.insiderTradeStatistics(symbol)
			return applyFieldSelection(results, values)
		}
		catch (error: any) {
			console.error('Error in insiderTradeStatisticsTool:', error)
			return { result: error.message || 'An unexpected error occurred in insiderTradeStatisticsTool', isError: true }
		}
	},
})

const ACQUISITION_OWNERSHIP_RESULT_VALUES = ['cik', 'symbol', 'filingDate', 'acceptedDate', 'cusip', 'nameOfReportingPerson', 'citizenshipOrPlaceOfOrganization', 'soleVotingPower', 'sharedVotingPower', 'soleDispositivePower', 'sharedDispositivePower', 'amountBeneficiallyOwned', 'percentOfClass', 'typeOfReportingPerson', 'url'] as const
export const acquisitionOwnership = tool({
	description: 'Tracks changes in stock ownership during acquisitions (SC 13D/G filings).',
	inputSchema: z.object({
		symbol: z.string().describe('The stock symbol (e.g., "AAPL").'),
		options: z.object({
			limit: z.number().nullable().describe('The maximum number of results to return. E.g., 50.'),
		}).optional().describe('Optional parameters.'),
		values: z.array(z.enum(ACQUISITION_OWNERSHIP_RESULT_VALUES)).nullable().optional().describe('Specific fields to return from the results.'),
	}),
	execute: async ({ symbol, options, values }) => {
		try {
			const results = await fmp.acquisitionOwnership(symbol, options ?? undefined)
			return applyFieldSelection(results, values)
		}
		catch (error: any) {
			console.error('Error in acquisitionOwnershipTool:', error)
			return { result: error.message || 'An unexpected error occurred in acquisitionOwnershipTool', isError: true }
		}
	},
})

const MARKET_SECTOR_PERFORMANCE_SNAPSHOT_RESULT_VALUES = ['date', 'sector', 'exchange', 'averageChange'] as const
export const marketSectorPerformanceSnapshot = tool({
	description: 'Retrieves a snapshot of market sector performance for a specific date.',
	inputSchema: z.object({
		options: z.object({
			date: z.string().describe('The date for the snapshot (YYYY-MM-DD). E.g., "2024-02-01".'),
			exchange: z.string().nullable().describe('Filter by exchange. E.g., "NASDAQ".'),
			sector: z.string().nullable().describe('Filter by sector (for sector performance). E.g., "Energy".'),
			industry: z.string().nullable().describe('Filter by industry (for industry performance). E.g., "Biotechnology".'),
		}).describe('Options specifying date, and optionally exchange and sector.'),
		values: z.array(z.enum(MARKET_SECTOR_PERFORMANCE_SNAPSHOT_RESULT_VALUES)).nullable().optional().describe('Specific fields to return from the results.'),
	}),
	execute: async ({ options, values }) => {
		try {
			const results = await fmp.marketSectorPerformanceSnapshot(options)
			return applyFieldSelection(results, values)
		}
		catch (error: any) {
			console.error('Error in marketSectorPerformanceSnapshotTool:', error)
			return { result: error.message || 'An unexpected error occurred in marketSectorPerformanceSnapshotTool', isError: true }
		}
	},
})

const MARKET_INDUSTRY_PERFORMANCE_SNAPSHOT_RESULT_VALUES = ['date', 'industry', 'exchange', 'averageChange'] as const
export const marketIndustryPerformanceSnapshot = tool({
	description: 'Retrieves a snapshot of market industry performance for a specific date.',
	inputSchema: z.object({
		options: z.object({
			date: z.string().describe('The date for the snapshot (YYYY-MM-DD). E.g., "2024-02-01".'),
			exchange: z.string().nullable().describe('Filter by exchange. E.g., "NASDAQ".'),
			sector: z.string().nullable().describe('Filter by sector (for sector performance). E.g., "Energy".'),
			industry: z.string().nullable().describe('Filter by industry (for industry performance). E.g., "Biotechnology".'),
		}).describe('Options specifying date, and optionally exchange and industry.'),
		values: z.array(z.enum(MARKET_INDUSTRY_PERFORMANCE_SNAPSHOT_RESULT_VALUES)).nullable().optional().describe('Specific fields to return from the results.'),
	}),
	execute: async ({ options, values }) => {
		try {
			const results = await fmp.marketIndustryPerformanceSnapshot(options)
			return applyFieldSelection(results, values)
		}
		catch (error: any) {
			console.error('Error in marketIndustryPerformanceSnapshotTool:', error)
			return { result: error.message || 'An unexpected error occurred in marketIndustryPerformanceSnapshotTool', isError: true }
		}
	},
})

const HISTORICAL_MARKET_SECTOR_PERFORMANCE_RESULT_VALUES = ['date', 'sector', 'exchange', 'averageChange'] as const
export const historicalMarketSectorPerformance = tool({
	description: 'Retrieves historical market sector performance data.',
	inputSchema: z.object({
		sector: z.string().describe('The sector to retrieve data for (e.g., "Energy").'),
		options: z.object({
			exchange: z.string().nullable().describe('Filter by exchange. E.g., "NASDAQ".'),
			from: z.string().nullable().describe('Start date for the calendar (YYYY-MM-DD). E.g., "2025-01-10".'),
			to: z.string().nullable().describe('End date for the calendar (YYYY-MM-DD). E.g., "2025-04-10". Max 90-day range.'),
		}).optional().describe('Optional parameters for date range and exchange.'),
		values: z.array(z.enum(HISTORICAL_MARKET_SECTOR_PERFORMANCE_RESULT_VALUES)).nullable().optional().describe('Specific fields to return from the results.'),
	}),
	execute: async ({ sector, options, values }) => {
		try {
			const results = await fmp.historicalMarketSectorPerformance(sector, options ?? undefined)
			return applyFieldSelection(results, values)
		}
		catch (error: any) {
			console.error('Error in historicalMarketSectorPerformanceTool:', error)
			return { result: error.message || 'An unexpected error occurred in historicalMarketSectorPerformanceTool', isError: true }
		}
	},
})

const HISTORICAL_MARKET_INDUSTRY_PERFORMANCE_RESULT_VALUES = ['date', 'industry', 'exchange', 'averageChange'] as const
export const historicalMarketIndustryPerformance = tool({
	description: 'Retrieves historical market industry performance data.',
	inputSchema: z.object({
		industry: z.string().describe('The industry to retrieve data for (e.g., "Biotechnology").'),
		options: z.object({
			exchange: z.string().nullable().describe('Filter by exchange. E.g., "NASDAQ".'),
			from: z.string().nullable().describe('Start date for the calendar (YYYY-MM-DD). E.g., "2025-01-10".'),
			to: z.string().nullable().describe('End date for the calendar (YYYY-MM-DD). E.g., "2025-04-10". Max 90-day range.'),
		}).optional().describe('Optional parameters for date range and exchange.'),
		values: z.array(z.enum(HISTORICAL_MARKET_INDUSTRY_PERFORMANCE_RESULT_VALUES)).nullable().optional().describe('Specific fields to return from the results.'),
	}),
	execute: async ({ industry, options, values }) => {
		try {
			const results = await fmp.historicalMarketIndustryPerformance(industry, options ?? undefined)
			return applyFieldSelection(results, values)
		}
		catch (error: any) {
			console.error('Error in historicalMarketIndustryPerformanceTool:', error)
			return { result: error.message || 'An unexpected error occurred in historicalMarketIndustryPerformanceTool', isError: true }
		}
	},
})

const MARKET_SECTOR_P_E_SNAPSHOT_RESULT_VALUES = ['date', 'sector', 'exchange', 'pe'] as const
export const marketSectorPESnapshot = tool({
	description: 'Retrieves a snapshot of Price-to-Earnings (P/E) ratios for market sectors.',
	inputSchema: z.object({
		options: z.object({
			date: z.string().describe('The date for the snapshot (YYYY-MM-DD). E.g., "2024-02-01".'),
			exchange: z.string().nullable().describe('Filter by exchange. E.g., "NASDAQ".'),
			sector: z.string().nullable().describe('Filter by sector (for sector P/E). E.g., "Energy".'),
			industry: z.string().nullable().describe('Filter by industry (for industry P/E). E.g., "Biotechnology".'),
		}).describe('Options specifying date, and optionally exchange and sector.'),
		values: z.array(z.enum(MARKET_SECTOR_P_E_SNAPSHOT_RESULT_VALUES)).nullable().optional().describe('Specific fields to return from the results.'),
	}),
	execute: async ({ options, values }) => {
		try {
			const results = await fmp.marketSectorPESnapshot(options)
			return applyFieldSelection(results, values)
		}
		catch (error: any) {
			console.error('Error in marketSectorPESnapshotTool:', error)
			return { result: error.message || 'An unexpected error occurred in marketSectorPESnapshotTool', isError: true }
		}
	},
})

const MARKET_INDUSTRY_P_E_SNAPSHOT_RESULT_VALUES = ['date', 'industry', 'exchange', 'pe'] as const
export const marketIndustryPESnapshot = tool({
	description: 'Retrieves a snapshot of Price-to-Earnings (P/E) ratios for market industries.',
	inputSchema: z.object({
		options: z.object({
			date: z.string().describe('The date for the snapshot (YYYY-MM-DD). E.g., "2024-02-01".'),
			exchange: z.string().nullable().describe('Filter by exchange. E.g., "NASDAQ".'),
			sector: z.string().nullable().describe('Filter by sector (for sector P/E). E.g., "Energy".'),
			industry: z.string().nullable().describe('Filter by industry (for industry P/E). E.g., "Biotechnology".'),
		}).describe('Options specifying date, and optionally exchange and industry.'),
		values: z.array(z.enum(MARKET_INDUSTRY_P_E_SNAPSHOT_RESULT_VALUES)).nullable().optional().describe('Specific fields to return from the results.'),
	}),
	execute: async ({ options, values }) => {
		try {
			const results = await fmp.marketIndustryPESnapshot(options)
			return applyFieldSelection(results, values)
		}
		catch (error: any) {
			console.error('Error in marketIndustryPESnapshotTool:', error)
			return { result: error.message || 'An unexpected error occurred in marketIndustryPESnapshotTool', isError: true }
		}
	},
})

const HISTORICAL_MARKET_SECTOR_P_E_RESULT_VALUES = ['date', 'sector', 'exchange', 'pe'] as const
export const historicalMarketSectorPE = tool({
	description: 'Retrieves historical Price-to-Earnings (P/E) ratios for market sectors.',
	inputSchema: z.object({
		sector: z.string().describe('The sector to retrieve data for (e.g., "Energy").'),
		options: z.object({
			exchange: z.string().nullable().describe('Filter by exchange. E.g., "NASDAQ".'),
			from: z.string().nullable().describe('Start date for the calendar (YYYY-MM-DD). E.g., "2025-01-10".'),
			to: z.string().nullable().describe('End date for the calendar (YYYY-MM-DD). E.g., "2025-04-10". Max 90-day range.'),
		}).optional().describe('Optional parameters for date range and exchange.'),
		values: z.array(z.enum(HISTORICAL_MARKET_SECTOR_P_E_RESULT_VALUES)).nullable().optional().describe('Specific fields to return from the results.'),
	}),
	execute: async ({ sector, options, values }) => {
		try {
			const results = await fmp.historicalMarketSectorPE(sector, options ?? undefined)
			return applyFieldSelection(results, values)
		}
		catch (error: any) {
			console.error('Error in historicalMarketSectorPETool:', error)
			return { result: error.message || 'An unexpected error occurred in historicalMarketSectorPETool', isError: true }
		}
	},
})

const HISTORICAL_MARKET_INDUSTRY_P_E_RESULT_VALUES = ['date', 'industry', 'exchange', 'pe'] as const
export const historicalMarketIndustryPE = tool({
	description: 'Retrieves historical Price-to-Earnings (P/E) ratios for market industries.',
	inputSchema: z.object({
		industry: z.string().describe('The industry to retrieve data for (e.g., "Biotechnology").'),
		options: z.object({
			exchange: z.string().nullable().describe('Filter by exchange. E.g., "NASDAQ".'),
			from: z.string().nullable().describe('Start date for the calendar (YYYY-MM-DD). E.g., "2025-01-10".'),
			to: z.string().nullable().describe('End date for the calendar (YYYY-MM-DD). E.g., "2025-04-10". Max 90-day range.'),
		}).optional().describe('Optional parameters for date range and exchange.'),
		values: z.array(z.enum(HISTORICAL_MARKET_INDUSTRY_P_E_RESULT_VALUES)).nullable().optional().describe('Specific fields to return from the results.'),
	}),
	execute: async ({ industry, options, values }) => {
		try {
			const results = await fmp.historicalMarketIndustryPE(industry, options ?? undefined)
			return applyFieldSelection(results, values)
		}
		catch (error: any) {
			console.error('Error in historicalMarketIndustryPETool:', error)
			return { result: error.message || 'An unexpected error occurred in historicalMarketIndustryPETool', isError: true }
		}
	},
})

const BIGGEST_STOCK_GAINERS_RESULT_VALUES = ['symbol', 'price', 'name', 'change', 'changesPercentage', 'exchange'] as const
export const biggestStockGainers = tool({
	description: 'Retrieves a list of the biggest stock gainers for the current trading day.',
	inputSchema: z.object({
		values: z.array(z.enum(BIGGEST_STOCK_GAINERS_RESULT_VALUES)).nullable().optional().describe('Specific fields to return from the results.'),
	}),
	execute: async ({ values }) => {
		try {
			const results = await fmp.biggestStockGainers()
			return applyFieldSelection(results, values)
		}
		catch (error: any) {
			console.error('Error in biggestStockGainersTool:', error)
			return { result: error.message || 'An unexpected error occurred in biggestStockGainersTool', isError: true }
		}
	},
})

const BIGGEST_STOCK_LOSERS_RESULT_VALUES = ['symbol', 'price', 'name', 'change', 'changesPercentage', 'exchange'] as const
export const biggestStockLosers = tool({
	description: 'Retrieves a list of the biggest stock losers for the current trading day.',
	inputSchema: z.object({
		values: z.array(z.enum(BIGGEST_STOCK_LOSERS_RESULT_VALUES)).nullable().optional().describe('Specific fields to return from the results.'),
	}),
	execute: async ({ values }) => {
		try {
			const results = await fmp.biggestStockLosers()
			return applyFieldSelection(results, values)
		}
		catch (error: any) {
			console.error('Error in biggestStockLosersTool:', error)
			return { result: error.message || 'An unexpected error occurred in biggestStockLosersTool', isError: true }
		}
	},
})

const TOP_TRADED_STOCKS_RESULT_VALUES = ['symbol', 'price', 'name', 'change', 'changesPercentage', 'exchange'] as const
export const topTradedStocks = tool({
	description: 'Retrieves a list of the most actively traded stocks for the current trading day.',
	inputSchema: z.object({
		values: z.array(z.enum(TOP_TRADED_STOCKS_RESULT_VALUES)).nullable().optional().describe('Specific fields to return from the results.'),
	}),
	execute: async ({ values }) => {
		try {
			const results = await fmp.topTradedStocks()
			return applyFieldSelection(results, values)
		}
		catch (error: any) {
			console.error('Error in topTradedStocksTool:', error)
			return { result: error.message || 'An unexpected error occurred in topTradedStocksTool', isError: true }
		}
	},
})

const EXCHANGE_MARKET_HOURS_RESULT_VALUES = ['exchange', 'name', 'openingHour', 'closingHour', 'timezone', 'isMarketOpen'] as const
export const exchangeMarketHours = tool({
	description: 'Retrieves trading hours for a specific stock exchange.',
	inputSchema: z.object({
		exchange: z.string().describe('The stock exchange symbol (e.g., "NASDAQ").'),
		values: z.array(z.enum(EXCHANGE_MARKET_HOURS_RESULT_VALUES)).nullable().optional().describe('Specific fields to return from the results.'),
	}),
	execute: async ({ exchange, values }) => {
		try {
			const results = await fmp.exchangeMarketHours(exchange)
			return applyFieldSelection(results, values)
		}
		catch (error: any) {
			console.error('Error in exchangeMarketHoursTool:', error)
			return { result: error.message || 'An unexpected error occurred in exchangeMarketHoursTool', isError: true }
		}
	},
})

const ALL_EXCHANGE_MARKET_HOURS_RESULT_VALUES = ['exchange', 'name', 'openingHour', 'closingHour', 'timezone', 'isMarketOpen'] as const
export const allExchangeMarketHours = tool({
	description: 'Retrieves trading hours for all supported stock exchanges.',
	inputSchema: z.object({
		values: z.array(z.enum(ALL_EXCHANGE_MARKET_HOURS_RESULT_VALUES)).nullable().optional().describe('Specific fields to return from the results.'),
	}),
	execute: async ({ values }) => {
		try {
			const results = await fmp.allExchangeMarketHours()
			return applyFieldSelection(results, values)
		}
		catch (error: any) {
			console.error('Error in allExchangeMarketHoursTool:', error)
			return { result: error.message || 'An unexpected error occurred in allExchangeMarketHoursTool', isError: true }
		}
	},
})

const FMP_ARTICLES_RESULT_VALUES = ['title', 'date', 'content', 'tickers', 'image', 'link', 'author', 'site'] as const
export const fmpArticles = tool({
	description: 'Retrieves the latest articles from Financial Modeling Prep.',
	inputSchema: z.object({
		options: z.object({
			page: z.number().nullable().describe('The page number for pagination. E.g., 0.'),
			limit: z.number().nullable().describe('The maximum number of results to return. E.g., 50.'),
		}).optional().describe('Optional parameters for pagination.'),
		values: z.array(z.enum(FMP_ARTICLES_RESULT_VALUES)).nullable().optional().describe('Specific fields to return from the results.'),
	}),
	execute: async ({ options, values }) => {
		try {
			const results = await fmp.fmpArticles(options ?? undefined)
			return applyFieldSelection(results, values)
		}
		catch (error: any) {
			console.error('Error in fmpArticlesTool:', error)
			return { result: error.message || 'An unexpected error occurred in fmpArticlesTool', isError: true }
		}
	},
})

const GENERAL_NEWS_RESULT_VALUES = ['symbol', 'publishedDate', 'publisher', 'title', 'image', 'site', 'text', 'url'] as const
export const generalNews = tool({
	description: 'Retrieves the latest general news articles.',
	inputSchema: z.object({
		options: z.object({
			from: z.string().nullable().describe('Start date for the calendar (YYYY-MM-DD). E.g., "2025-01-10".'),
			to: z.string().nullable().describe('End date for the calendar (YYYY-MM-DD). E.g., "2025-04-10". Max 90-day range.'),
			page: z.number().nullable().describe('The page number for pagination. E.g., 0.'),
			limit: z.number().nullable().describe('The maximum number of results to return. E.g., 50.'),
		}).optional().describe('Optional parameters for date range and pagination.'),
		values: z.array(z.enum(GENERAL_NEWS_RESULT_VALUES)).nullable().optional().describe('Specific fields to return from the results.'),
	}),
	execute: async ({ options, values }) => {
		try {
			const results = await fmp.generalNews(options ?? undefined)
			return applyFieldSelection(results, values)
		}
		catch (error: any) {
			console.error('Error in generalNewsTool:', error)
			return { result: error.message || 'An unexpected error occurred in generalNewsTool', isError: true }
		}
	},
})

const PRESS_RELEASES_RESULT_VALUES = ['symbol', 'publishedDate', 'publisher', 'title', 'image', 'site', 'text', 'url'] as const
export const pressReleases = tool({
	description: 'Retrieves the latest press releases from companies.',
	inputSchema: z.object({
		options: z.object({
			from: z.string().nullable().describe('Start date for the calendar (YYYY-MM-DD). E.g., "2025-01-10".'),
			to: z.string().nullable().describe('End date for the calendar (YYYY-MM-DD). E.g., "2025-04-10". Max 90-day range.'),
			page: z.number().nullable().describe('The page number for pagination. E.g., 0.'),
			limit: z.number().nullable().describe('The maximum number of results to return. E.g., 50.'),
		}).optional().describe('Optional parameters for date range and pagination.'),
		values: z.array(z.enum(PRESS_RELEASES_RESULT_VALUES)).nullable().optional().describe('Specific fields to return from the results.'),
	}),
	execute: async ({ options, values }) => {
		try {
			const results = await fmp.pressReleases(options ?? undefined)
			return applyFieldSelection(results, values)
		}
		catch (error: any) {
			console.error('Error in pressReleasesTool:', error)
			return { result: error.message || 'An unexpected error occurred in pressReleasesTool', isError: true }
		}
	},
})

const STOCK_NEWS_RESULT_VALUES = ['symbol', 'publishedDate', 'publisher', 'title', 'image', 'site', 'text', 'url'] as const
export const stockNews = tool({
	description: 'Retrieves the latest stock market news.',
	inputSchema: z.object({
		options: z.object({
			from: z.string().nullable().describe('Start date for the calendar (YYYY-MM-DD). E.g., "2025-01-10".'),
			to: z.string().nullable().describe('End date for the calendar (YYYY-MM-DD). E.g., "2025-04-10". Max 90-day range.'),
			page: z.number().nullable().describe('The page number for pagination. E.g., 0.'),
			limit: z.number().nullable().describe('The maximum number of results to return. E.g., 50.'),
		}).optional().describe('Optional parameters for date range and pagination.'),
		values: z.array(z.enum(STOCK_NEWS_RESULT_VALUES)).nullable().optional().describe('Specific fields to return from the results.'),
	}),
	execute: async ({ options, values }) => {
		try {
			const results = await fmp.stockNews(options ?? undefined)
			return applyFieldSelection(results, values)
		}
		catch (error: any) {
			console.error('Error in stockNewsTool:', error)
			return { result: error.message || 'An unexpected error occurred in stockNewsTool', isError: true }
		}
	},
})

const CRYPTO_NEWS_RESULT_VALUES = ['symbol', 'publishedDate', 'publisher', 'title', 'image', 'site', 'text', 'url'] as const
export const cryptoNews = tool({
	description: 'Retrieves the latest cryptocurrency news.',
	inputSchema: z.object({
		options: z.object({
			from: z.string().nullable().describe('Start date for the calendar (YYYY-MM-DD). E.g., "2025-01-10".'),
			to: z.string().nullable().describe('End date for the calendar (YYYY-MM-DD). E.g., "2025-04-10". Max 90-day range.'),
			page: z.number().nullable().describe('The page number for pagination. E.g., 0.'),
			limit: z.number().nullable().describe('The maximum number of results to return. E.g., 50.'),
		}).optional().describe('Optional parameters for date range and pagination.'),
		values: z.array(z.enum(CRYPTO_NEWS_RESULT_VALUES)).nullable().optional().describe('Specific fields to return from the results.'),
	}),
	execute: async ({ options, values }) => {
		try {
			const results = await fmp.cryptoNews(options ?? undefined)
			return applyFieldSelection(results, values)
		}
		catch (error: any) {
			console.error('Error in cryptoNewsTool:', error)
			return { result: error.message || 'An unexpected error occurred in cryptoNewsTool', isError: true }
		}
	},
})

const FOREX_NEWS_RESULT_VALUES = ['symbol', 'publishedDate', 'publisher', 'title', 'image', 'site', 'text', 'url'] as const
export const forexNews = tool({
	description: 'Retrieves the latest Forex news.',
	inputSchema: z.object({
		options: z.object({
			from: z.string().nullable().describe('Start date for the calendar (YYYY-MM-DD). E.g., "2025-01-10".'),
			to: z.string().nullable().describe('End date for the calendar (YYYY-MM-DD). E.g., "2025-04-10". Max 90-day range.'),
			page: z.number().nullable().describe('The page number for pagination. E.g., 0.'),
			limit: z.number().nullable().describe('The maximum number of results to return. E.g., 50.'),
		}).optional().describe('Optional parameters for date range and pagination.'),
		values: z.array(z.enum(FOREX_NEWS_RESULT_VALUES)).nullable().optional().describe('Specific fields to return from the results.'),
	}),
	execute: async ({ options, values }) => {
		try {
			const results = await fmp.forexNews(options ?? undefined)
			return applyFieldSelection(results, values)
		}
		catch (error: any) {
			console.error('Error in forexNewsTool:', error)
			return { result: error.message || 'An unexpected error occurred in forexNewsTool', isError: true }
		}
	},
})

const SEARCH_PRESS_RELEASES_RESULT_VALUES = ['symbol', 'publishedDate', 'publisher', 'title', 'image', 'site', 'text', 'url'] as const
export const searchPressReleases = tool({
	description: 'Searches for press releases related to specific stock symbols.',
	inputSchema: z.object({
		options: z.object({
			symbols: z.union([z.string(), z.array(z.string())]).describe('Comma-separated list or array of stock/crypto/forex symbols. E.g., ["AAPL", "MSFT"] or "EURUSD,GBPUSD".'),
			from: z.string().nullable().describe('Start date for the calendar (YYYY-MM-DD). E.g., "2025-01-10".'),
			to: z.string().nullable().describe('End date for the calendar (YYYY-MM-DD). E.g., "2025-04-10". Max 90-day range.'),
			page: z.number().nullable().describe('The page number for pagination. E.g., 0.'),
			limit: z.number().nullable().describe('The maximum number of results to return. E.g., 50.'),
		}).describe('Options specifying symbols, and optionally date range and pagination.'),
		values: z.array(z.enum(SEARCH_PRESS_RELEASES_RESULT_VALUES)).nullable().optional().describe('Specific fields to return from the results.'),
	}),
	execute: async ({ options, values }) => {
		try {
			const results = await fmp.searchPressReleases(options)
			return applyFieldSelection(results, values)
		}
		catch (error: any) {
			console.error('Error in searchPressReleasesTool:', error)
			return { result: error.message || 'An unexpected error occurred in searchPressReleasesTool', isError: true }
		}
	},
})

const SEARCH_STOCK_NEWS_RESULT_VALUES = ['symbol', 'publishedDate', 'publisher', 'title', 'image', 'site', 'text', 'url'] as const
export const searchStockNews = tool({
	description: 'Searches for stock news related to specific stock symbols.',
	inputSchema: z.object({
		options: z.object({
			symbols: z.union([z.string(), z.array(z.string())]).describe('Comma-separated list or array of stock/crypto/forex symbols. E.g., ["AAPL", "MSFT"] or "EURUSD,GBPUSD".'),
			from: z.string().nullable().describe('Start date for the calendar (YYYY-MM-DD). E.g., "2025-01-10".'),
			to: z.string().nullable().describe('End date for the calendar (YYYY-MM-DD). E.g., "2025-04-10". Max 90-day range.'),
			page: z.number().nullable().describe('The page number for pagination. E.g., 0.'),
			limit: z.number().nullable().describe('The maximum number of results to return. E.g., 50.'),
		}).describe('Options specifying symbols, and optionally date range and pagination.'),
		values: z.array(z.enum(SEARCH_STOCK_NEWS_RESULT_VALUES)).nullable().optional().describe('Specific fields to return from the results.'),
	}),
	execute: async ({ options, values }) => {
		try {
			const results = await fmp.searchStockNews(options)
			return applyFieldSelection(results, values)
		}
		catch (error: any) {
			console.error('Error in searchStockNewsTool:', error)
			return { result: error.message || 'An unexpected error occurred in searchStockNewsTool', isError: true }
		}
	},
})

const SEARCH_CRYPTO_NEWS_RESULT_VALUES = ['symbol', 'publishedDate', 'publisher', 'title', 'image', 'site', 'text', 'url'] as const
export const searchCryptoNews = tool({
	description: 'Searches for cryptocurrency news related to specific crypto symbols.',
	inputSchema: z.object({
		options: z.object({
			symbols: z.union([z.string(), z.array(z.string())]).describe('Comma-separated list or array of stock/crypto/forex symbols. E.g., ["AAPL", "MSFT"] or "EURUSD,GBPUSD".'),
			from: z.string().nullable().describe('Start date for the calendar (YYYY-MM-DD). E.g., "2025-01-10".'),
			to: z.string().nullable().describe('End date for the calendar (YYYY-MM-DD). E.g., "2025-04-10". Max 90-day range.'),
			page: z.number().nullable().describe('The page number for pagination. E.g., 0.'),
			limit: z.number().nullable().describe('The maximum number of results to return. E.g., 50.'),
		}).describe('Options specifying symbols, and optionally date range and pagination.'),
		values: z.array(z.enum(SEARCH_CRYPTO_NEWS_RESULT_VALUES)).nullable().optional().describe('Specific fields to return from the results.'),
	}),
	execute: async ({ options, values }) => {
		try {
			const results = await fmp.searchCryptoNews(options)
			return applyFieldSelection(results, values)
		}
		catch (error: any) {
			console.error('Error in searchCryptoNewsTool:', error)
			return { result: error.message || 'An unexpected error occurred in searchCryptoNewsTool', isError: true }
		}
	},
})

const SEARCH_FOREX_NEWS_RESULT_VALUES = ['symbol', 'publishedDate', 'publisher', 'title', 'image', 'site', 'text', 'url'] as const
export const searchForexNews = tool({
	description: 'Searches for Forex news related to specific currency pairs.',
	inputSchema: z.object({
		options: z.object({
			symbols: z.union([z.string(), z.array(z.string())]).describe('Comma-separated list or array of stock/crypto/forex symbols. E.g., ["AAPL", "MSFT"] or "EURUSD,GBPUSD".'),
			from: z.string().nullable().describe('Start date for the calendar (YYYY-MM-DD). E.g., "2025-01-10".'),
			to: z.string().nullable().describe('End date for the calendar (YYYY-MM-DD). E.g., "2025-04-10". Max 90-day range.'),
			page: z.number().nullable().describe('The page number for pagination. E.g., 0.'),
			limit: z.number().nullable().describe('The maximum number of results to return. E.g., 50.'),
		}).describe('Options specifying symbols, and optionally date range and pagination.'),
		values: z.array(z.enum(SEARCH_FOREX_NEWS_RESULT_VALUES)).nullable().optional().describe('Specific fields to return from the results.'),
	}),
	execute: async ({ options, values }) => {
		try {
			const results = await fmp.searchForexNews(options)
			return applyFieldSelection(results, values)
		}
		catch (error: any) {
			console.error('Error in searchForexNewsTool:', error)
			return { result: error.message || 'An unexpected error occurred in searchForexNewsTool', isError: true }
		}
	},
})

const SIMPLE_MOVING_AVERAGE_RESULT_VALUES = ['sma', 'date', 'open', 'high', 'low', 'close', 'volume'] as const
export const simpleMovingAverage = tool({
	description: 'Retrieves Simple Moving Average (SMA) data for a symbol.',
	inputSchema: z.object({
		symbol: z.string().describe('The stock/crypto/forex symbol (e.g., "AAPL").'),
		options: z.object({
			periodLength: z.number().describe('The length of the period for the indicator calculation. E.g., 10.'),
			timeframe: z.enum(['1min', '5min', '15min', '30min', '1hour', '4hour', '1day']).describe('The timeframe for the data (\'1min\', \'5min\', \'15min\', \'30min\', \'1hour\', \'4hour\', \'1day\').'),
			from: z.string().nullable().describe('Start date for the calendar (YYYY-MM-DD). E.g., "2025-01-10".'),
			to: z.string().nullable().describe('End date for the calendar (YYYY-MM-DD). E.g., "2025-04-10". Max 90-day range.'),
		}).describe('Options specifying period length, timeframe, and optionally date range.'),
		values: z.array(z.enum(SIMPLE_MOVING_AVERAGE_RESULT_VALUES)).nullable().optional().describe('Specific fields to return from the results.'),
	}),
	execute: async ({ symbol, options, values }) => {
		try {
			const results = await fmp.simpleMovingAverage(symbol, options)
			return applyFieldSelection(results, values)
		}
		catch (error: any) {
			console.error('Error in simpleMovingAverageTool:', error)
			return { result: error.message || 'An unexpected error occurred in simpleMovingAverageTool', isError: true }
		}
	},
})

const EXPONENTIAL_MOVING_AVERAGE_RESULT_VALUES = ['ema', 'date', 'open', 'high', 'low', 'close', 'volume'] as const
export const exponentialMovingAverage = tool({
	description: 'Retrieves Exponential Moving Average (EMA) data for a symbol.',
	inputSchema: z.object({
		symbol: z.string().describe('The stock/crypto/forex symbol (e.g., "AAPL").'),
		options: z.object({
			periodLength: z.number().describe('The length of the period for the indicator calculation. E.g., 10.'),
			timeframe: z.enum(['1min', '5min', '15min', '30min', '1hour', '4hour', '1day']).describe('The timeframe for the data (\'1min\', \'5min\', \'15min\', \'30min\', \'1hour\', \'4hour\', \'1day\').'),
			from: z.string().nullable().describe('Start date for the calendar (YYYY-MM-DD). E.g., "2025-01-10".'),
			to: z.string().nullable().describe('End date for the calendar (YYYY-MM-DD). E.g., "2025-04-10". Max 90-day range.'),
		}).describe('Options specifying period length, timeframe, and optionally date range.'),
		values: z.array(z.enum(EXPONENTIAL_MOVING_AVERAGE_RESULT_VALUES)).nullable().optional().describe('Specific fields to return from the results.'),
	}),
	execute: async ({ symbol, options, values }) => {
		try {
			const results = await fmp.exponentialMovingAverage(symbol, options)
			return applyFieldSelection(results, values)
		}
		catch (error: any) {
			console.error('Error in exponentialMovingAverageTool:', error)
			return { result: error.message || 'An unexpected error occurred in exponentialMovingAverageTool', isError: true }
		}
	},
})

const WEIGHTED_MOVING_AVERAGE_RESULT_VALUES = ['wma', 'date', 'open', 'high', 'low', 'close', 'volume'] as const
export const weightedMovingAverage = tool({
	description: 'Retrieves Weighted Moving Average (WMA) data for a symbol.',
	inputSchema: z.object({
		symbol: z.string().describe('The stock/crypto/forex symbol (e.g., "AAPL").'),
		options: z.object({
			periodLength: z.number().describe('The length of the period for the indicator calculation. E.g., 10.'),
			timeframe: z.enum(['1min', '5min', '15min', '30min', '1hour', '4hour', '1day']).describe('The timeframe for the data (\'1min\', \'5min\', \'15min\', \'30min\', \'1hour\', \'4hour\', \'1day\').'),
			from: z.string().nullable().describe('Start date for the calendar (YYYY-MM-DD). E.g., "2025-01-10".'),
			to: z.string().nullable().describe('End date for the calendar (YYYY-MM-DD). E.g., "2025-04-10". Max 90-day range.'),
		}).describe('Options specifying period length, timeframe, and optionally date range.'),
		values: z.array(z.enum(WEIGHTED_MOVING_AVERAGE_RESULT_VALUES)).nullable().optional().describe('Specific fields to return from the results.'),
	}),
	execute: async ({ symbol, options, values }) => {
		try {
			const results = await fmp.weightedMovingAverage(symbol, options)
			return applyFieldSelection(results, values)
		}
		catch (error: any) {
			console.error('Error in weightedMovingAverageTool:', error)
			return { result: error.message || 'An unexpected error occurred in weightedMovingAverageTool', isError: true }
		}
	},
})

const DOUBLE_EXPONENTIAL_MOVING_AVERAGE_RESULT_VALUES = ['dema', 'date', 'open', 'high', 'low', 'close', 'volume'] as const
export const doubleExponentialMovingAverage = tool({
	description: 'Retrieves Double Exponential Moving Average (DEMA) data for a symbol.',
	inputSchema: z.object({
		symbol: z.string().describe('The stock/crypto/forex symbol (e.g., "AAPL").'),
		options: z.object({
			periodLength: z.number().describe('The length of the period for the indicator calculation. E.g., 10.'),
			timeframe: z.enum(['1min', '5min', '15min', '30min', '1hour', '4hour', '1day']).describe('The timeframe for the data (\'1min\', \'5min\', \'15min\', \'30min\', \'1hour\', \'4hour\', \'1day\').'),
			from: z.string().nullable().describe('Start date for the calendar (YYYY-MM-DD). E.g., "2025-01-10".'),
			to: z.string().nullable().describe('End date for the calendar (YYYY-MM-DD). E.g., "2025-04-10". Max 90-day range.'),
		}).describe('Options specifying period length, timeframe, and optionally date range.'),
		values: z.array(z.enum(DOUBLE_EXPONENTIAL_MOVING_AVERAGE_RESULT_VALUES)).nullable().optional().describe('Specific fields to return from the results.'),
	}),
	execute: async ({ symbol, options, values }) => {
		try {
			const results = await fmp.doubleExponentialMovingAverage(symbol, options)
			return applyFieldSelection(results, values)
		}
		catch (error: any) {
			console.error('Error in doubleExponentialMovingAverageTool:', error)
			return { result: error.message || 'An unexpected error occurred in doubleExponentialMovingAverageTool', isError: true }
		}
	},
})

const TRIPLE_EXPONENTIAL_MOVING_AVERAGE_RESULT_VALUES = ['tema', 'date', 'open', 'high', 'low', 'close', 'volume'] as const
export const tripleExponentialMovingAverage = tool({
	description: 'Retrieves Triple Exponential Moving Average (TEMA) data for a symbol.',
	inputSchema: z.object({
		symbol: z.string().describe('The stock/crypto/forex symbol (e.g., "AAPL").'),
		options: z.object({
			periodLength: z.number().describe('The length of the period for the indicator calculation. E.g., 10.'),
			timeframe: z.enum(['1min', '5min', '15min', '30min', '1hour', '4hour', '1day']).describe('The timeframe for the data (\'1min\', \'5min\', \'15min\', \'30min\', \'1hour\', \'4hour\', \'1day\').'),
			from: z.string().nullable().describe('Start date for the calendar (YYYY-MM-DD). E.g., "2025-01-10".'),
			to: z.string().nullable().describe('End date for the calendar (YYYY-MM-DD). E.g., "2025-04-10". Max 90-day range.'),
		}).describe('Options specifying period length, timeframe, and optionally date range.'),
		values: z.array(z.enum(TRIPLE_EXPONENTIAL_MOVING_AVERAGE_RESULT_VALUES)).nullable().optional().describe('Specific fields to return from the results.'),
	}),
	execute: async ({ symbol, options, values }) => {
		try {
			const results = await fmp.tripleExponentialMovingAverage(symbol, options)
			return applyFieldSelection(results, values)
		}
		catch (error: any) {
			console.error('Error in tripleExponentialMovingAverageTool:', error)
			return { result: error.message || 'An unexpected error occurred in tripleExponentialMovingAverageTool', isError: true }
		}
	},
})

const RELATIVE_STRENGTH_INDEX_RESULT_VALUES = ['rsi', 'date', 'open', 'high', 'low', 'close', 'volume'] as const
export const relativeStrengthIndex = tool({
	description: 'Retrieves Relative Strength Index (RSI) data for a symbol.',
	inputSchema: z.object({
		symbol: z.string().describe('The stock/crypto/forex symbol (e.g., "AAPL").'),
		options: z.object({
			periodLength: z.number().describe('The length of the period for the indicator calculation. E.g., 10.'),
			timeframe: z.enum(['1min', '5min', '15min', '30min', '1hour', '4hour', '1day']).describe('The timeframe for the data (\'1min\', \'5min\', \'15min\', \'30min\', \'1hour\', \'4hour\', \'1day\').'),
			from: z.string().nullable().describe('Start date for the calendar (YYYY-MM-DD). E.g., "2025-01-10".'),
			to: z.string().nullable().describe('End date for the calendar (YYYY-MM-DD). E.g., "2025-04-10". Max 90-day range.'),
		}).describe('Options specifying period length, timeframe, and optionally date range.'),
		values: z.array(z.enum(RELATIVE_STRENGTH_INDEX_RESULT_VALUES)).nullable().optional().describe('Specific fields to return from the results.'),
	}),
	execute: async ({ symbol, options, values }) => {
		try {
			const results = await fmp.relativeStrengthIndex(symbol, options)
			return applyFieldSelection(results, values)
		}
		catch (error: any) {
			console.error('Error in relativeStrengthIndexTool:', error)
			return { result: error.message || 'An unexpected error occurred in relativeStrengthIndexTool', isError: true }
		}
	},
})

const STANDARD_DEVIATION_RESULT_VALUES = ['standardDeviation', 'date', 'open', 'high', 'low', 'close', 'volume'] as const
export const standardDeviation = tool({
	description: 'Retrieves Standard Deviation data for a symbol.',
	inputSchema: z.object({
		symbol: z.string().describe('The stock/crypto/forex symbol (e.g., "AAPL").'),
		options: z.object({
			periodLength: z.number().describe('The length of the period for the indicator calculation. E.g., 10.'),
			timeframe: z.enum(['1min', '5min', '15min', '30min', '1hour', '4hour', '1day']).describe('The timeframe for the data (\'1min\', \'5min\', \'15min\', \'30min\', \'1hour\', \'4hour\', \'1day\').'),
			from: z.string().nullable().describe('Start date for the calendar (YYYY-MM-DD). E.g., "2025-01-10".'),
			to: z.string().nullable().describe('End date for the calendar (YYYY-MM-DD). E.g., "2025-04-10". Max 90-day range.'),
		}).describe('Options specifying period length, timeframe, and optionally date range.'),
		values: z.array(z.enum(STANDARD_DEVIATION_RESULT_VALUES)).nullable().optional().describe('Specific fields to return from the results.'),
	}),
	execute: async ({ symbol, options, values }) => {
		try {
			const results = await fmp.standardDeviation(symbol, options)
			return applyFieldSelection(results, values)
		}
		catch (error: any) {
			console.error('Error in standardDeviationTool:', error)
			return { result: error.message || 'An unexpected error occurred in standardDeviationTool', isError: true }
		}
	},
})

const WILLIAMS_PERCENT_R_RESULT_VALUES = ['williams', 'date', 'open', 'high', 'low', 'close', 'volume'] as const
export const williamsPercentR = tool({
	description: 'Retrieves Williams %R data for a symbol.',
	inputSchema: z.object({
		symbol: z.string().describe('The stock/crypto/forex symbol (e.g., "AAPL").'),
		options: z.object({
			periodLength: z.number().describe('The length of the period for the indicator calculation. E.g., 10.'),
			timeframe: z.enum(['1min', '5min', '15min', '30min', '1hour', '4hour', '1day']).describe('The timeframe for the data (\'1min\', \'5min\', \'15min\', \'30min\', \'1hour\', \'4hour\', \'1day\').'),
			from: z.string().nullable().describe('Start date for the calendar (YYYY-MM-DD). E.g., "2025-01-10".'),
			to: z.string().nullable().describe('End date for the calendar (YYYY-MM-DD). E.g., "2025-04-10". Max 90-day range.'),
		}).describe('Options specifying period length, timeframe, and optionally date range.'),
		values: z.array(z.enum(WILLIAMS_PERCENT_R_RESULT_VALUES)).nullable().optional().describe('Specific fields to return from the results.'),
	}),
	execute: async ({ symbol, options, values }) => {
		try {
			const results = await fmp.williamsPercentR(symbol, options)
			return applyFieldSelection(results, values)
		}
		catch (error: any) {
			console.error('Error in williamsPercentRTool:', error)
			return { result: error.message || 'An unexpected error occurred in williamsPercentRTool', isError: true }
		}
	},
})

const AVERAGE_DIRECTIONAL_INDEX_RESULT_VALUES = ['adx', 'date', 'open', 'high', 'low', 'close', 'volume'] as const
export const averageDirectionalIndex = tool({
	description: 'Retrieves Average Directional Index (ADX) data for a symbol.',
	inputSchema: z.object({
		symbol: z.string().describe('The stock/crypto/forex symbol (e.g., "AAPL").'),
		options: z.object({
			periodLength: z.number().describe('The length of the period for the indicator calculation. E.g., 10.'),
			timeframe: z.enum(['1min', '5min', '15min', '30min', '1hour', '4hour', '1day']).describe('The timeframe for the data (\'1min\', \'5min\', \'15min\', \'30min\', \'1hour\', \'4hour\', \'1day\').'),
			from: z.string().nullable().describe('Start date for the calendar (YYYY-MM-DD). E.g., "2025-01-10".'),
			to: z.string().nullable().describe('End date for the calendar (YYYY-MM-DD). E.g., "2025-04-10". Max 90-day range.'),
		}).describe('Options specifying period length, timeframe, and optionally date range.'),
		values: z.array(z.enum(AVERAGE_DIRECTIONAL_INDEX_RESULT_VALUES)).nullable().optional().describe('Specific fields to return from the results.'),
	}),
	execute: async ({ symbol, options, values }) => {
		try {
			const results = await fmp.averageDirectionalIndex(symbol, options)
			return applyFieldSelection(results, values)
		}
		catch (error: any) {
			console.error('Error in averageDirectionalIndexTool:', error)
			return { result: error.message || 'An unexpected error occurred in averageDirectionalIndexTool', isError: true }
		}
	},
})

const STOCK_QUOTE_RESULT_VALUES = ['symbol', 'name', 'price', 'changesPercentage', 'change', 'dayLow', 'dayHigh', 'yearHigh', 'yearLow', 'marketCap', 'priceAvg50', 'priceAvg200', 'exchange', 'volume', 'avgVolume', 'open', 'previousClose', 'eps', 'pe', 'earningsAnnouncement', 'sharesOutstanding', 'timestamp'] as const
export const stockQuote = tool({
	description: 'Retrieves a real-time stock quote.',
	inputSchema: z.object({
		symbol: z.string().describe('The stock symbol (e.g., "AAPL").'),
		values: z.array(z.enum(STOCK_QUOTE_RESULT_VALUES)).nullable().optional().describe('Specific fields to return from the results.'),
	}),
	execute: async ({ symbol, values }) => {
		try {
			const results = await fmp.stockQuote(symbol)
			return applyFieldSelection(results, values)
		}
		catch (error: any) {
			console.error('Error in stockQuoteTool:', error)
			return { result: error.message || 'An unexpected error occurred in stockQuoteTool', isError: true }
		}
	},
})

const AFTERMARKET_TRADE_RESULT_VALUES = ['symbol', 'price', 'tradeSize', 'timestamp'] as const
export const aftermarketTrade = tool({
	description: 'Retrieves real-time aftermarket trade data for a stock.',
	inputSchema: z.object({
		symbol: z.string().describe('The stock symbol (e.g., "AAPL").'),
		values: z.array(z.enum(AFTERMARKET_TRADE_RESULT_VALUES)).nullable().optional().describe('Specific fields to return from the results.'),
	}),
	execute: async ({ symbol, values }) => {
		try {
			const results = await fmp.aftermarketTrade(symbol)
			return applyFieldSelection(results, values)
		}
		catch (error: any) {
			console.error('Error in aftermarketTradeTool:', error)
			return { result: error.message || 'An unexpected error occurred in aftermarketTradeTool', isError: true }
		}
	},
})

const AFTERMARKET_QUOTE_RESULT_VALUES = ['symbol', 'bidSize', 'bidPrice', 'askSize', 'askPrice', 'volume', 'timestamp'] as const
export const aftermarketQuote = tool({
	description: 'Retrieves real-time aftermarket quote data for a stock.',
	inputSchema: z.object({
		symbol: z.string().describe('The stock symbol (e.g., "AAPL").'),
		values: z.array(z.enum(AFTERMARKET_QUOTE_RESULT_VALUES)).nullable().optional().describe('Specific fields to return from the results.'),
	}),
	execute: async ({ symbol, values }) => {
		try {
			const results = await fmp.aftermarketQuote(symbol)
			return applyFieldSelection(results, values)
		}
		catch (error: any) {
			console.error('Error in aftermarketQuoteTool:', error)
			return { result: error.message || 'An unexpected error occurred in aftermarketQuoteTool', isError: true }
		}
	},
})

const STOCK_PRICE_CHANGE_RESULT_VALUES = ['symbol', '1D', '5D', '1M', '3M', '6M', 'ytd', '1Y', '3Y', '5Y', '10Y', 'max'] as const
export const stockPriceChange = tool({
	description: 'Retrieves stock price change percentages over various time periods.',
	inputSchema: z.object({
		symbol: z.string().describe('The stock symbol (e.g., "AAPL").'),
		values: z.array(z.enum(STOCK_PRICE_CHANGE_RESULT_VALUES)).nullable().optional().describe('Specific fields to return from the results.'),
	}),
	execute: async ({ symbol, values }) => {
		try {
			const results = await fmp.stockPriceChange(symbol)
			return applyFieldSelection(results, values)
		}
		catch (error: any) {
			console.error('Error in stockPriceChangeTool:', error)
			return { result: error.message || 'An unexpected error occurred in stockPriceChangeTool', isError: true }
		}
	},
})

const STOCK_BATCH_QUOTE_RESULT_VALUES = ['symbol', 'name', 'price', 'changesPercentage', 'change', 'dayLow', 'dayHigh', 'yearHigh', 'yearLow', 'marketCap', 'priceAvg50', 'priceAvg200', 'exchange', 'volume', 'avgVolume', 'open', 'previousClose', 'eps', 'pe', 'earningsAnnouncement', 'sharesOutstanding', 'timestamp'] as const
export const stockBatchQuote = tool({
	description: 'Retrieves real-time stock quotes for multiple symbols.',
	inputSchema: z.object({
		symbols: z.array(z.string()).describe('An array of stock symbols (e.g., ["AAPL", "MSFT"]).'),
		values: z.array(z.enum(STOCK_BATCH_QUOTE_RESULT_VALUES)).nullable().optional().describe('Specific fields to return from the results.'),
	}),
	execute: async ({ symbols, values }) => {
		try {
			const results = await fmp.stockBatchQuote(symbols)
			return applyFieldSelection(results, values)
		}
		catch (error: any) {
			console.error('Error in stockBatchQuoteTool:', error)
			return { result: error.message || 'An unexpected error occurred in stockBatchQuoteTool', isError: true }
		}
	},
})

const BATCH_AFTERMARKET_TRADE_RESULT_VALUES = ['symbol', 'price', 'tradeSize', 'timestamp'] as const
export const batchAftermarketTrade = tool({
	description: 'Retrieves real-time aftermarket trade data for multiple stocks.',
	inputSchema: z.object({
		symbols: z.array(z.string()).describe('An array of stock symbols (e.g., ["AAPL", "MSFT"]).'),
		values: z.array(z.enum(BATCH_AFTERMARKET_TRADE_RESULT_VALUES)).nullable().optional().describe('Specific fields to return from the results.'),
	}),
	execute: async ({ symbols, values }) => {
		try {
			const results = await fmp.batchAftermarketTrade(symbols)
			return applyFieldSelection(results, values)
		}
		catch (error: any) {
			console.error('Error in batchAftermarketTradeTool:', error)
			return { result: error.message || 'An unexpected error occurred in batchAftermarketTradeTool', isError: true }
		}
	},
})

const BATCH_AFTERMARKET_QUOTE_RESULT_VALUES = ['symbol', 'bidSize', 'bidPrice', 'askSize', 'askPrice', 'volume', 'timestamp'] as const
export const batchAftermarketQuote = tool({
	description: 'Retrieves real-time aftermarket quote data for multiple stocks.',
	inputSchema: z.object({
		symbols: z.array(z.string()).describe('An array of stock symbols (e.g., ["AAPL", "MSFT"]).'),
		values: z.array(z.enum(BATCH_AFTERMARKET_QUOTE_RESULT_VALUES)).nullable().optional().describe('Specific fields to return from the results.'),
	}),
	execute: async ({ symbols, values }) => {
		try {
			const results = await fmp.batchAftermarketQuote(symbols)
			return applyFieldSelection(results, values)
		}
		catch (error: any) {
			console.error('Error in batchAftermarketQuoteTool:', error)
			return { result: error.message || 'An unexpected error occurred in batchAftermarketQuoteTool', isError: true }
		}
	},
})

export const exchangeStockQuotes = tool({
	description: 'Retrieves real-time stock quotes for all stocks on a specific exchange.',
	inputSchema: z.object({
		exchange: z.string().describe('The stock exchange symbol (e.g., "NASDAQ").'),
		options: z.object({
			short: z.boolean().nullable().describe('If true, returns short quotes. E.g., true.'),
		}).optional().describe('Optional parameters.'),
	}),
	execute: async ({ exchange, options }) => {
		return fmp.exchangeStockQuotes(exchange, options ?? undefined)
	},
})

export const mutualFundQuotes = tool({
	description: 'Retrieves real-time quotes for all mutual funds.',
	inputSchema: z.object({
		options: z.object({
			short: z.boolean().nullable().describe('If true, returns short quotes. E.g., true.'),
		}).optional().describe('Optional parameters.'),
	}),
	execute: async ({ options }) => {
		return fmp.mutualFundQuotes(options ?? undefined)
	},
})

export const etfQuotes = tool({
	description: 'Retrieves real-time quotes for all ETFs.',
	inputSchema: z.object({
		options: z.object({
			short: z.boolean().nullable().describe('If true, returns short quotes. E.g., true.'),
		}).optional().describe('Optional parameters.'),
	}),
	execute: async ({ options }) => {
		return fmp.etfQuotes(options ?? undefined)
	},
})

const LATEST_EARNING_TRANSCRIPTS_RESULT_VALUES = ['symbol', 'period', 'fiscalYear', 'date'] as const
export const latestEarningTranscripts = tool({
	description: 'Retrieves metadata for the latest available earnings transcripts.',
	inputSchema: z.object({
		options: z.object({
			page: z.number().nullable().describe('The page number for pagination. E.g., 0.'),
			limit: z.number().nullable().describe('The maximum number of results to return. E.g., 50.'),
		}).optional().describe('Optional parameters for pagination.'),
		values: z.array(z.enum(LATEST_EARNING_TRANSCRIPTS_RESULT_VALUES)).nullable().optional().describe('Specific fields to return from the results.'),
	}),
	execute: async ({ options, values }) => {
		try {
			const results = await fmp.latestEarningTranscripts(options ?? undefined)
			return applyFieldSelection(results, values)
		}
		catch (error: any) {
			console.error('Error in latestEarningTranscriptsTool:', error)
			return { result: error.message || 'An unexpected error occurred in latestEarningTranscriptsTool', isError: true }
		}
	},
})

const EARNINGS_TRANSCRIPT_RESULT_VALUES = ['symbol', 'period', 'year', 'date', 'content'] as const
export const earningsTranscript = tool({
	description: 'Retrieves the full transcript of a company\'s earnings call.',
	inputSchema: z.object({
		symbol: z.string().describe('The stock symbol (e.g., "AAPL").'),
		options: z.object({
			year: z.union([z.string(), z.number()]).describe('The year of the earnings call. E.g., "2020".'),
			quarter: z.union([z.string(), z.number()]).describe('The quarter of the earnings call (1, 2, 3, or 4). E.g., "3".'),
			limit: z.number().nullable().describe('The maximum number of results to return. E.g., 50.'),
		}).describe('Options specifying year, quarter, and optionally limit.'),
		values: z.array(z.enum(EARNINGS_TRANSCRIPT_RESULT_VALUES)).nullable().optional().describe('Specific fields to return from the results.'),
	}),
	execute: async ({ symbol, options, values }) => {
		try {
			const results = await fmp.earningsTranscript(symbol, options)
			return applyFieldSelection(results, values)
		}
		catch (error: any) {
			console.error('Error in earningsTranscriptTool:', error)
			return { result: error.message || 'An unexpected error occurred in earningsTranscriptTool', isError: true }
		}
	},
})

const EARNINGS_TRANSCRIPT_DATES_BY_SYMBOL_RESULT_VALUES = ['quarter', 'fiscalYear', 'date'] as const
export const earningsTranscriptDatesBySymbol = tool({
	description: 'Retrieves available earnings call transcript dates for a specific company.',
	inputSchema: z.object({
		symbol: z.string().describe('The stock symbol (e.g., "AAPL").'),
		values: z.array(z.enum(EARNINGS_TRANSCRIPT_DATES_BY_SYMBOL_RESULT_VALUES)).nullable().optional().describe('Specific fields to return from the results.'),
	}),
	execute: async ({ symbol, values }) => {
		try {
			const results = await fmp.earningsTranscriptDatesBySymbol(symbol)
			return applyFieldSelection(results, values)
		}
		catch (error: any) {
			console.error('Error in earningsTranscriptDatesBySymbolTool:', error)
			return { result: error.message || 'An unexpected error occurred in earningsTranscriptDatesBySymbolTool', isError: true }
		}
	},
})

const EARNINGS_TRANSCRIPT_LIST_RESULT_VALUES = ['symbol', 'companyName', 'noOfTranscripts'] as const
export const earningsTranscriptList = tool({
	description: 'Retrieves a list of companies with available earnings transcripts.',
	inputSchema: z.object({
		values: z.array(z.enum(EARNINGS_TRANSCRIPT_LIST_RESULT_VALUES)).nullable().optional().describe('Specific fields to return from the results.'),
	}),
	execute: async ({ values }) => {
		try {
			const results = await fmp.earningsTranscriptList()
			return applyFieldSelection(results, values)
		}
		catch (error: any) {
			console.error('Error in earningsTranscriptListTool:', error)
			return { result: error.message || 'An unexpected error occurred in earningsTranscriptListTool', isError: true }
		}
	},
})

const LATEST8K_SEC_FILINGS_RESULT_VALUES = ['symbol', 'cik', 'filingDate', 'acceptedDate', 'formType', 'hasFinancials', 'link'] as const
export const latest8kSecFilings = tool({
	description: 'Retrieves the latest 8-K SEC filings within a date range.',
	inputSchema: z.object({
		options: z.object({
			from: z.string().describe('Start date for the calendar (YYYY-MM-DD). E.g., "2025-01-10".'),
			to: z.string().describe('End date for the calendar (YYYY-MM-DD). E.g., "2025-04-10". Max 90-day range.'),
			page: z.number().nullable().describe('The page number for pagination. E.g., 0.'),
			limit: z.number().nullable().describe('The maximum number of results to return. E.g., 50.'),
		}).describe('Options specifying date range and pagination.'),
		values: z.array(z.enum(LATEST8K_SEC_FILINGS_RESULT_VALUES)).nullable().optional().describe('Specific fields to return from the results.'),
	}),
	execute: async ({ options, values }) => {
		try {
			const results = await fmp.latest8kSecFilings(options)
			return applyFieldSelection(results, values)
		}
		catch (error: any) {
			console.error('Error in latest8kSecFilingsTool:', error)
			return { result: error.message || 'An unexpected error occurred in latest8kSecFilingsTool', isError: true }
		}
	},
})

const LATEST_SEC_FILINGS_WITH_FINANCIALS_RESULT_VALUES = ['symbol', 'cik', 'filingDate', 'acceptedDate', 'formType', 'hasFinancials', 'link'] as const
export const latestSecFilingsWithFinancials = tool({
	description: 'Retrieves the latest SEC filings with financials (e.g., 10-K, 10-Q) within a date range.',
	inputSchema: z.object({
		options: z.object({
			from: z.string().describe('Start date for the calendar (YYYY-MM-DD). E.g., "2025-01-10".'),
			to: z.string().describe('End date for the calendar (YYYY-MM-DD). E.g., "2025-04-10". Max 90-day range.'),
			page: z.number().nullable().describe('The page number for pagination. E.g., 0.'),
			limit: z.number().nullable().describe('The maximum number of results to return. E.g., 50.'),
		}).describe('Options specifying date range and pagination.'),
		values: z.array(z.enum(LATEST_SEC_FILINGS_WITH_FINANCIALS_RESULT_VALUES)).nullable().optional().describe('Specific fields to return from the results.'),
	}),
	execute: async ({ options, values }) => {
		try {
			const results = await fmp.latestSecFilingsWithFinancials(options)
			return applyFieldSelection(results, values)
		}
		catch (error: any) {
			console.error('Error in latestSecFilingsWithFinancialsTool:', error)
			return { result: error.message || 'An unexpected error occurred in latestSecFilingsWithFinancialsTool', isError: true }
		}
	},
})

const SEARCH_SEC_FILINGS_BY_FORM_TYPE_RESULT_VALUES = ['symbol', 'cik', 'filingDate', 'acceptedDate', 'formType', 'hasFinancials', 'link'] as const
export const searchSecFilingsByFormType = tool({
	description: 'Searches SEC filings by form type within a date range.',
	inputSchema: z.object({
		options: z.object({
			formType: z.string().describe('The form type to search for (e.g., "8-K", "10-K").'),
			from: z.string().describe('Start date for the calendar (YYYY-MM-DD). E.g., "2025-01-10".'),
			to: z.string().describe('End date for the calendar (YYYY-MM-DD). E.g., "2025-04-10". Max 90-day range.'),
			page: z.number().nullable().describe('The page number for pagination. E.g., 0.'),
			limit: z.number().nullable().describe('The maximum number of results to return. E.g., 50.'),
		}).describe('Options specifying form type, date range, and pagination.'),
		values: z.array(z.enum(SEARCH_SEC_FILINGS_BY_FORM_TYPE_RESULT_VALUES)).nullable().optional().describe('Specific fields to return from the results.'),
	}),
	execute: async ({ options, values }) => {
		try {
			const results = await fmp.searchSecFilingsByFormType(options)
			return applyFieldSelection(results, values)
		}
		catch (error: any) {
			console.error('Error in searchSecFilingsByFormTypeTool:', error)
			return { result: error.message || 'An unexpected error occurred in searchSecFilingsByFormTypeTool', isError: true }
		}
	},
})

const SEARCH_SEC_FILINGS_BY_SYMBOL_RESULT_VALUES = ['symbol', 'cik', 'filingDate', 'acceptedDate', 'formType', 'hasFinancials', 'link'] as const
export const searchSecFilingsBySymbol = tool({
	description: 'Searches SEC filings by company symbol within a date range.',
	inputSchema: z.object({
		options: z.object({
			symbol: z.string().describe('The stock symbol. E.g., "AAPL".'),
			formType: z.string().nullable().describe('The form type to search for (e.g., "8-K", "10-K").'),
			from: z.string().describe('Start date for the calendar (YYYY-MM-DD). E.g., "2025-01-10".'),
			to: z.string().describe('End date for the calendar (YYYY-MM-DD). E.g., "2025-04-10". Max 90-day range.'),
			page: z.number().nullable().describe('The page number for pagination. E.g., 0.'),
		}).describe('Options specifying symbol, date range, and pagination.'),
		values: z.array(z.enum(SEARCH_SEC_FILINGS_BY_SYMBOL_RESULT_VALUES)).nullable().optional().describe('Specific fields to return from the results.'),
	}),
	execute: async ({ options, values }) => {
		try {
			const results = await fmp.searchSecFilingsBySymbol(options)
			return applyFieldSelection(results, values)
		}
		catch (error: any) {
			console.error('Error in searchSecFilingsBySymbolTool:', error)
			return { result: error.message || 'An unexpected error occurred in searchSecFilingsBySymbolTool', isError: true }
		}
	},
})

const SEARCH_SEC_FILINGS_BY_CIK_RESULT_VALUES = ['symbol', 'cik', 'filingDate', 'acceptedDate', 'formType', 'hasFinancials', 'link'] as const
export const searchSecFilingsByCik = tool({
	description: 'Searches SEC filings by CIK within a date range.',
	inputSchema: z.object({
		options: z.object({
			cik: z.string().describe('The Central Index Key (CIK). E.g., "0000320193".'),
			from: z.string().describe('Start date for the calendar (YYYY-MM-DD). E.g., "2025-01-10".'),
			to: z.string().describe('End date for the calendar (YYYY-MM-DD). E.g., "2025-04-10". Max 90-day range.'),
			page: z.number().nullable().describe('The page number for pagination. E.g., 0.'),
			limit: z.number().nullable().describe('The maximum number of results to return. E.g., 50.'),
		}).describe('Options specifying CIK, date range, and pagination.'),
		values: z.array(z.enum(SEARCH_SEC_FILINGS_BY_CIK_RESULT_VALUES)).nullable().optional().describe('Specific fields to return from the results.'),
	}),
	execute: async ({ options, values }) => {
		try {
			const results = await fmp.searchSecFilingsByCik(options)
			return applyFieldSelection(results, values)
		}
		catch (error: any) {
			console.error('Error in searchSecFilingsByCikTool:', error)
			return { result: error.message || 'An unexpected error occurred in searchSecFilingsByCikTool', isError: true }
		}
	},
})

const SEARCH_SEC_FILINGS_COMPANY_NAME_RESULT_VALUES = ['symbol', 'name', 'cik', 'sicCode', 'industryTitle', 'businessAddress', 'phoneNumber'] as const
export const searchSecFilingsCompanyName = tool({
	description: 'Searches for SEC filing company information by company name.',
	inputSchema: z.object({
		company: z.string().describe('The company name (e.g., "Berkshire").'),
		values: z.array(z.enum(SEARCH_SEC_FILINGS_COMPANY_NAME_RESULT_VALUES)).nullable().optional().describe('Specific fields to return from the results.'),
	}),
	execute: async ({ company, values }) => {
		try {
			const results = await fmp.searchSecFilingsCompanyName(company)
			return applyFieldSelection(results, values)
		}
		catch (error: any) {
			console.error('Error in searchSecFilingsCompanyNameTool:', error)
			return { result: error.message || 'An unexpected error occurred in searchSecFilingsCompanyNameTool', isError: true }
		}
	},
})

const SEARCH_SEC_FILINGS_COMPANY_BY_SYMBOL_RESULT_VALUES = ['symbol', 'name', 'cik', 'sicCode', 'industryTitle', 'businessAddress', 'phoneNumber'] as const
export const searchSecFilingsCompanyBySymbol = tool({
	description: 'Searches for SEC filing company information by stock symbol.',
	inputSchema: z.object({
		symbol: z.string().describe('The stock symbol (e.g., "AAPL").'),
		values: z.array(z.enum(SEARCH_SEC_FILINGS_COMPANY_BY_SYMBOL_RESULT_VALUES)).nullable().optional().describe('Specific fields to return from the results.'),
	}),
	execute: async ({ symbol, values }) => {
		try {
			const results = await fmp.searchSecFilingsCompanyBySymbol(symbol)
			return applyFieldSelection(results, values)
		}
		catch (error: any) {
			console.error('Error in searchSecFilingsCompanyBySymbolTool:', error)
			return { result: error.message || 'An unexpected error occurred in searchSecFilingsCompanyBySymbolTool', isError: true }
		}
	},
})

const SEARCH_SEC_FILINGS_COMPANY_BY_CIK_RESULT_VALUES = ['symbol', 'name', 'cik', 'sicCode', 'industryTitle', 'businessAddress', 'phoneNumber'] as const
export const searchSecFilingsCompanyByCik = tool({
	description: 'Searches for SEC filing company information by CIK.',
	inputSchema: z.object({
		cik: z.string().describe('The Central Index Key (CIK) (e.g., "0000320193").'),
		values: z.array(z.enum(SEARCH_SEC_FILINGS_COMPANY_BY_CIK_RESULT_VALUES)).nullable().optional().describe('Specific fields to return from the results.'),
	}),
	execute: async ({ cik, values }) => {
		try {
			const results = await fmp.searchSecFilingsCompanyByCik(cik)
			return applyFieldSelection(results, values)
		}
		catch (error: any) {
			console.error('Error in searchSecFilingsCompanyByCikTool:', error)
			return { result: error.message || 'An unexpected error occurred in searchSecFilingsCompanyByCikTool', isError: true }
		}
	},
})

const SEC_COMPANY_FULL_PROFILE_RESULT_VALUES = ['symbol', 'cik', 'registrantName', 'sicCode', 'sicDescription', 'sicGroup', 'isin', 'businessAddress', 'mailingAddress', 'phoneNumber', 'postalCode', 'city', 'state', 'country', 'description', 'ceo', 'website', 'exchange', 'stateLocation', 'stateOfIncorporation', 'fiscalYearEnd', 'ipoDate', 'employees', 'secFilingsUrl', 'taxIdentificationNumber', 'fiftyTwoWeekRange', 'isActive', 'assetType', 'openFigiComposite', 'priceCurrency', 'marketSector', 'securityType', 'isEtf', 'isAdr', 'isFund'] as const
export const secCompanyFullProfile = tool({
	description: 'Retrieves a full SEC company profile.',
	inputSchema: z.object({
		options: z.object({
			symbol: z.string().nullable().describe('The stock symbol. E.g., "AAPL".'),
			cik: z.string().nullable().describe('The Central Index Key (CIK). E.g., "320193".'),
		}).describe('Options specifying either symbol or CIK.'),
		values: z.array(z.enum(SEC_COMPANY_FULL_PROFILE_RESULT_VALUES)).nullable().optional().describe('Specific fields to return from the results.'),
	}),
	execute: async ({ options, values }) => {
		try {
			const results = await fmp.secCompanyFullProfile(options)
			return applyFieldSelection(results, values)
		}
		catch (error: any) {
			console.error('Error in secCompanyFullProfileTool:', error)
			return { result: error.message || 'An unexpected error occurred in secCompanyFullProfileTool', isError: true }
		}
	},
})

const INDUSTRY_CLASSIFICATION_LIST_RESULT_VALUES = ['office', 'sicCode', 'industryTitle'] as const
export const industryClassificationList = tool({
	description: 'Retrieves a list of industry classifications (SIC codes and titles).',
	inputSchema: z.object({
		options: z.object({
			industryTitle: z.string().nullable().describe('Filter by industry title. E.g., "SERVICES".'),
			sicCode: z.string().nullable().describe('Filter by SIC code. E.g., "7371".'),
		}).describe('Options specifying either industryTitle or sicCode to filter.'),
		values: z.array(z.enum(INDUSTRY_CLASSIFICATION_LIST_RESULT_VALUES)).nullable().optional().describe('Specific fields to return from the results.'),
	}),
	execute: async ({ options, values }) => {
		try {
			const results = await fmp.industryClassificationList(options)
			return applyFieldSelection(results, values)
		}
		catch (error: any) {
			console.error('Error in industryClassificationListTool:', error)
			return { result: error.message || 'An unexpected error occurred in industryClassificationListTool', isError: true }
		}
	},
})

const SEARCH_INDUSTRY_CLASSIFICATION_RESULT_VALUES = ['symbol', 'name', 'cik', 'sicCode', 'industryTitle', 'businessAddress', 'phoneNumber'] as const
export const searchIndustryClassification = tool({
	description: 'Searches for industry classification details for companies.',
	inputSchema: z.object({
		options: z.object({
			symbol: z.string().nullable().describe('Filter by stock symbol. E.g., "AAPL".'),
			cik: z.string().nullable().describe('Filter by CIK. E.g., "320193".'),
			sicCode: z.string().nullable().describe('Filter by SIC code. E.g., "7371".'),
		}).describe('Options specifying symbol, CIK, or SIC code to filter.'),
		values: z.array(z.enum(SEARCH_INDUSTRY_CLASSIFICATION_RESULT_VALUES)).nullable().optional().describe('Specific fields to return from the results.'),
	}),
	execute: async ({ options, values }) => {
		try {
			const results = await fmp.searchIndustryClassification(options)
			return applyFieldSelection(results, values)
		}
		catch (error: any) {
			console.error('Error in searchIndustryClassificationTool:', error)
			return { result: error.message || 'An unexpected error occurred in searchIndustryClassificationTool', isError: true }
		}
	},
})

const ALL_INDUSTRY_CLASSIFICATION_RESULT_VALUES = ['symbol', 'name', 'cik', 'sicCode', 'industryTitle', 'businessAddress', 'phoneNumber'] as const
export const allIndustryClassification = tool({
	description: 'Retrieves all industry classification data for companies.',
	inputSchema: z.object({
		options: z.object({
			page: z.number().nullable().describe('The page number for pagination. E.g., 0.'),
			limit: z.number().nullable().describe('The maximum number of results to return. E.g., 50.'),
		}).optional().describe('Optional parameters for pagination.'),
		values: z.array(z.enum(ALL_INDUSTRY_CLASSIFICATION_RESULT_VALUES)).nullable().optional().describe('Specific fields to return from the results.'),
	}),
	execute: async ({ options, values }) => {
		try {
			const results = await fmp.allIndustryClassification(options ?? undefined)
			return applyFieldSelection(results, values)
		}
		catch (error: any) {
			console.error('Error in allIndustryClassificationTool:', error)
			return { result: error.message || 'An unexpected error occurred in allIndustryClassificationTool', isError: true }
		}
	},
})

export const getSecFiling = tool({
	description: 'Fetches the raw HTML/text content of an SEC filing from the SEC\'s EDGAR system directly — useful when you need the full filing text, unlike the structured metadata from the FMP API.',
	inputSchema: z.object({
		url: z.string().describe('The full URL to the SEC filing (e.g., "https://www.sec.gov/Archives/edgar/data/320193/000032019323000106/aapl-20230930.htm").'),
	}),
	execute: async ({ url }) => {
		return fmp.getSecFiling(url)
	},
})

const LATEST_SENATE_FINANCIAL_DISCLOSURES_RESULT_VALUES = ['symbol', 'disclosureDate', 'transactionDate', 'firstName', 'lastName', 'office', 'district', 'owner', 'assetDescription', 'assetType', 'type', 'amount', 'comment', 'link', 'capitalGainsOver200USD'] as const
export const latestSenateFinancialDisclosures = tool({
	description: 'Retrieves the latest financial disclosures from U.S. Senate members.',
	inputSchema: z.object({
		options: z.object({
			page: z.number().nullable().describe('The page number for pagination. E.g., 0.'),
			limit: z.number().nullable().describe('The maximum number of results to return. E.g., 50.'),
		}).optional().describe('Optional parameters for pagination.'),
		values: z.array(z.enum(LATEST_SENATE_FINANCIAL_DISCLOSURES_RESULT_VALUES)).nullable().optional().describe('Specific fields to return from the results.'),
	}),
	execute: async ({ options, values }) => {
		try {
			const results = await fmp.latestSenateFinancialDisclosures(options ?? undefined)
			return applyFieldSelection(results, values)
		}
		catch (error: any) {
			console.error('Error in latestSenateFinancialDisclosuresTool:', error)
			return { result: error.message || 'An unexpected error occurred in latestSenateFinancialDisclosuresTool', isError: true }
		}
	},
})

const LATEST_HOUSE_FINANCIAL_DISCLOSURES_RESULT_VALUES = ['symbol', 'disclosureDate', 'transactionDate', 'firstName', 'lastName', 'office', 'district', 'owner', 'assetDescription', 'assetType', 'type', 'amount', 'comment', 'link', 'capitalGainsOver200USD'] as const
export const latestHouseFinancialDisclosures = tool({
	description: 'Retrieves the latest financial disclosures from U.S. House members.',
	inputSchema: z.object({
		options: z.object({
			page: z.number().nullable().describe('The page number for pagination. E.g., 0.'),
			limit: z.number().nullable().describe('The maximum number of results to return. E.g., 50.'),
		}).optional().describe('Optional parameters for pagination.'),
		values: z.array(z.enum(LATEST_HOUSE_FINANCIAL_DISCLOSURES_RESULT_VALUES)).nullable().optional().describe('Specific fields to return from the results.'),
	}),
	execute: async ({ options, values }) => {
		try {
			const results = await fmp.latestHouseFinancialDisclosures(options ?? undefined)
			return applyFieldSelection(results, values)
		}
		catch (error: any) {
			console.error('Error in latestHouseFinancialDisclosuresTool:', error)
			return { result: error.message || 'An unexpected error occurred in latestHouseFinancialDisclosuresTool', isError: true }
		}
	},
})

const SENATE_TRADING_ACTIVITY_RESULT_VALUES = ['symbol', 'disclosureDate', 'transactionDate', 'firstName', 'lastName', 'office', 'district', 'owner', 'assetDescription', 'assetType', 'type', 'amount', 'comment', 'link', 'capitalGainsOver200USD'] as const
export const senateTradingActivity = tool({
	description: 'Retrieves trading activity by U.S. Senators for a specific stock symbol.',
	inputSchema: z.object({
		symbol: z.string().describe('The stock symbol (e.g., "AAPL").'),
		values: z.array(z.enum(SENATE_TRADING_ACTIVITY_RESULT_VALUES)).nullable().optional().describe('Specific fields to return from the results.'),
	}),
	execute: async ({ symbol, values }) => {
		try {
			const results = await fmp.senateTradingActivity(symbol)
			return applyFieldSelection(results, values)
		}
		catch (error: any) {
			console.error('Error in senateTradingActivityTool:', error)
			return { result: error.message || 'An unexpected error occurred in senateTradingActivityTool', isError: true }
		}
	},
})

const SENATE_TRADES_BY_NAME_RESULT_VALUES = ['symbol', 'disclosureDate', 'transactionDate', 'firstName', 'lastName', 'office', 'district', 'owner', 'assetDescription', 'assetType', 'type', 'amount', 'comment', 'link', 'capitalGainsOver200USD'] as const
export const senateTradesByName = tool({
	description: 'Retrieves trading activity by U.S. Senators filtered by Senator\'s name.',
	inputSchema: z.object({
		name: z.string().describe('The name of the Senator (e.g., "Jerry").'),
		values: z.array(z.enum(SENATE_TRADES_BY_NAME_RESULT_VALUES)).nullable().optional().describe('Specific fields to return from the results.'),
	}),
	execute: async ({ name, values }) => {
		try {
			const results = await fmp.senateTradesByName(name)
			return applyFieldSelection(results, values)
		}
		catch (error: any) {
			console.error('Error in senateTradesByNameTool:', error)
			return { result: error.message || 'An unexpected error occurred in senateTradesByNameTool', isError: true }
		}
	},
})

const HOUSE_TRADES_RESULT_VALUES = ['symbol', 'disclosureDate', 'transactionDate', 'firstName', 'lastName', 'office', 'district', 'owner', 'assetDescription', 'assetType', 'type', 'amount', 'comment', 'link', 'capitalGainsOver200USD'] as const
export const houseTrades = tool({
	description: 'Retrieves trading activity by U.S. House members for a specific stock symbol.',
	inputSchema: z.object({
		symbol: z.string().describe('The stock symbol (e.g., "AAPL").'),
		values: z.array(z.enum(HOUSE_TRADES_RESULT_VALUES)).nullable().optional().describe('Specific fields to return from the results.'),
	}),
	execute: async ({ symbol, values }) => {
		try {
			const results = await fmp.houseTrades(symbol)
			return applyFieldSelection(results, values)
		}
		catch (error: any) {
			console.error('Error in houseTradesTool:', error)
			return { result: error.message || 'An unexpected error occurred in houseTradesTool', isError: true }
		}
	},
})

const HOUSE_TRADES_BY_NAME_RESULT_VALUES = ['symbol', 'disclosureDate', 'transactionDate', 'firstName', 'lastName', 'office', 'district', 'owner', 'assetDescription', 'assetType', 'type', 'amount', 'comment', 'link', 'capitalGainsOver200USD'] as const
export const houseTradesByName = tool({
	description: 'Retrieves trading activity by U.S. House members filtered by member\'s name.',
	inputSchema: z.object({
		name: z.string().describe('The name of the House member (e.g., "James").'),
		values: z.array(z.enum(HOUSE_TRADES_BY_NAME_RESULT_VALUES)).nullable().optional().describe('Specific fields to return from the results.'),
	}),
	execute: async ({ name, values }) => {
		try {
			const results = await fmp.houseTradesByName(name)
			return applyFieldSelection(results, values)
		}
		catch (error: any) {
			console.error('Error in houseTradesByNameTool:', error)
			return { result: error.message || 'An unexpected error occurred in houseTradesByNameTool', isError: true }
		}
	},
})

const BULK_COMPANY_PROFILE_RESULT_VALUES = ['symbol', 'price', 'marketCap', 'beta', 'lastDividend', 'range', 'change', 'changePercentage', 'volume', 'averageVolume', 'companyName', 'currency', 'cik', 'isin', 'cusip', 'exchangeFullName', 'exchange', 'industry', 'website', 'description', 'ceo', 'sector', 'country', 'fullTimeEmployees', 'phone', 'address', 'city', 'state', 'zip', 'image', 'ipoDate', 'defaultImage', 'isEtf', 'isActivelyTrading', 'isAdr', 'isFund'] as const
export const bulkCompanyProfile = tool({
	description: 'Retrieves company profile data in bulk.',
	inputSchema: z.object({
		part: z.union([z.string(), z.number()]).describe('The part number for bulk data (0-3).'),
		values: z.array(z.enum(BULK_COMPANY_PROFILE_RESULT_VALUES)).nullable().optional().describe('Specific fields to return from the results.'),
	}),
	execute: async ({ part, values }) => {
		try {
			const results = await fmp.bulkCompanyProfile(part)
			return applyFieldSelection(results, values)
		}
		catch (error: any) {
			console.error('Error in bulkCompanyProfileTool:', error)
			return { result: error.message || 'An unexpected error occurred in bulkCompanyProfileTool', isError: true }
		}
	},
})

const BULK_STOCK_RATING_RESULT_VALUES = ['symbol', 'date', 'rating', 'ratingRecommendation', 'ratingDetailsDCFRecommendation', 'ratingDetailsROERecommendation', 'ratingDetailsROARecommendation', 'ratingDetailsDERecommendation', 'ratingDetailsPERecommendation', 'ratingDetailsPBRecommendation'] as const
export const bulkStockRating = tool({
	description: 'Retrieves stock rating data in bulk.',
	inputSchema: z.object({
		values: z.array(z.enum(BULK_STOCK_RATING_RESULT_VALUES)).nullable().optional().describe('Specific fields to return from the results.'),
	}),
	execute: async ({ values }) => {
		try {
			const results = await fmp.bulkStockRating()
			return applyFieldSelection(results, values)
		}
		catch (error: any) {
			console.error('Error in bulkStockRatingTool:', error)
			return { result: error.message || 'An unexpected error occurred in bulkStockRatingTool', isError: true }
		}
	},
})

const BULK_DCF_VALUATIONS_RESULT_VALUES = ['symbol', 'date', 'discountedCashFlow', 'dcfPercentDiff'] as const
export const bulkDcfValuations = tool({
	description: 'Retrieves DCF valuations in bulk.',
	inputSchema: z.object({
		values: z.array(z.enum(BULK_DCF_VALUATIONS_RESULT_VALUES)).nullable().optional().describe('Specific fields to return from the results.'),
	}),
	execute: async ({ values }) => {
		try {
			const results = await fmp.bulkDcfValuations()
			return applyFieldSelection(results, values)
		}
		catch (error: any) {
			console.error('Error in bulkDcfValuationsTool:', error)
			return { result: error.message || 'An unexpected error occurred in bulkDcfValuationsTool', isError: true }
		}
	},
})

const BULK_FINANCIAL_SCORES_RESULT_VALUES = ['symbol', 'reportedCurrency', 'altmanZScore', 'piotroskiScore', 'workingCapital', 'totalAssets', 'retainedEarnings', 'ebit', 'marketCap', 'totalLiabilities', 'revenue'] as const
export const bulkFinancialScores = tool({
	description: 'Retrieves financial scores in bulk.',
	inputSchema: z.object({
		values: z.array(z.enum(BULK_FINANCIAL_SCORES_RESULT_VALUES)).nullable().optional().describe('Specific fields to return from the results.'),
	}),
	execute: async ({ values }) => {
		try {
			const results = await fmp.bulkFinancialScores()
			return applyFieldSelection(results, values)
		}
		catch (error: any) {
			console.error('Error in bulkFinancialScoresTool:', error)
			return { result: error.message || 'An unexpected error occurred in bulkFinancialScoresTool', isError: true }
		}
	},
})

const BULK_PRICE_TARGET_SUMMARY_RESULT_VALUES = ['symbol', 'lastMonth', 'lastMonthAvgPT', 'lastMonthAvgPTPercentDif', 'lastQuarter', 'lastQuarterAvgPT', 'lastQuarterAvgPTPercentDif', 'lastYear', 'lastYearAvgPT', 'lastYearAvgPTPercentDif', 'allTime', 'allTimeAvgPT', 'allTimeAvgPTPercentDif', 'publishers'] as const
export const bulkPriceTargetSummary = tool({
	description: 'Retrieves price target summaries in bulk.',
	inputSchema: z.object({
		values: z.array(z.enum(BULK_PRICE_TARGET_SUMMARY_RESULT_VALUES)).nullable().optional().describe('Specific fields to return from the results.'),
	}),
	execute: async ({ values }) => {
		try {
			const results = await fmp.bulkPriceTargetSummary()
			return applyFieldSelection(results, values)
		}
		catch (error: any) {
			console.error('Error in bulkPriceTargetSummaryTool:', error)
			return { result: error.message || 'An unexpected error occurred in bulkPriceTargetSummaryTool', isError: true }
		}
	},
})

const BULK_ETF_HOLDER_RESULT_VALUES = ['symbol', 'asset', 'name', 'isin', 'securityCusip', 'sharesNumber', 'weightPercentage', 'marketValue', 'updatedAt', 'updated'] as const
export const bulkEtfHolder = tool({
	description: 'Retrieves ETF holder data in bulk.',
	inputSchema: z.object({
		part: z.union([z.string(), z.number()]).describe('The part number for bulk data (0-3).'),
		values: z.array(z.enum(BULK_ETF_HOLDER_RESULT_VALUES)).nullable().optional().describe('Specific fields to return from the results.'),
	}),
	execute: async ({ part, values }) => {
		try {
			const results = await fmp.bulkEtfHolder(part)
			return applyFieldSelection(results, values)
		}
		catch (error: any) {
			console.error('Error in bulkEtfHolderTool:', error)
			return { result: error.message || 'An unexpected error occurred in bulkEtfHolderTool', isError: true }
		}
	},
})

const BULK_UPGRADES_DOWNGRADES_CONSENSUS_RESULT_VALUES = ['symbol', 'strongBuy', 'buy', 'hold', 'sell', 'strongSell', 'consensus'] as const
export const bulkUpgradesDowngradesConsensus = tool({
	description: 'Retrieves upgrades/downgrades consensus data in bulk.',
	inputSchema: z.object({
		values: z.array(z.enum(BULK_UPGRADES_DOWNGRADES_CONSENSUS_RESULT_VALUES)).nullable().optional().describe('Specific fields to return from the results.'),
	}),
	execute: async ({ values }) => {
		try {
			const results = await fmp.bulkUpgradesDowngradesConsensus()
			return applyFieldSelection(results, values)
		}
		catch (error: any) {
			console.error('Error in bulkUpgradesDowngradesConsensusTool:', error)
			return { result: error.message || 'An unexpected error occurred in bulkUpgradesDowngradesConsensusTool', isError: true }
		}
	},
})

const BULK_KEY_METRICS_TTM_RESULT_VALUES = ['symbol', 'marketCap', 'marketCapTTM', 'enterpriseValueTTM', 'evToSalesTTM', 'evToOperatingCashFlowTTM', 'evToFreeCashFlowTTM', 'evToEBITDATTM', 'netDebtToEBITDATTM', 'currentRatioTTM', 'incomeQualityTTM', 'grahamNumberTTM', 'grahamNetNetTTM', 'taxBurdenTTM', 'interestBurdenTTM', 'workingCapitalTTM', 'investedCapitalTTM', 'returnOnAssetsTTM', 'operatingReturnOnAssetsTTM', 'returnOnTangibleAssetsTTM', 'returnOnEquityTTM', 'returnOnInvestedCapitalTTM', 'returnOnCapitalEmployedTTM', 'earningsYieldTTM', 'freeCashFlowYieldTTM', 'capexToOperatingCashFlowTTM', 'capexToDepreciationTTM', 'capexToRevenueTTM', 'salesGeneralAndAdministrativeToRevenueTTM', 'researchAndDevelopementToRevenueTTM', 'stockBasedCompensationToRevenueTTM', 'intangiblesToTotalAssetsTTM', 'averageReceivablesTTM', 'averagePayablesTTM', 'averageInventoryTTM', 'daysOfSalesOutstandingTTM', 'daysOfPayablesOutstandingTTM', 'daysOfInventoryOutstandingTTM', 'operatingCycleTTM', 'cashConversionCycleTTM', 'freeCashFlowToEquityTTM', 'freeCashFlowToFirmTTM', 'tangibleAssetValueTTM', 'netCurrentAssetValueTTM'] as const
export const bulkKeyMetricsTtm = tool({
	description: 'Retrieves Key Metrics TTM data in bulk.',
	inputSchema: z.object({
		values: z.array(z.enum(BULK_KEY_METRICS_TTM_RESULT_VALUES)).nullable().optional().describe('Specific fields to return from the results.'),
	}),
	execute: async ({ values }) => {
		try {
			const results = await fmp.bulkKeyMetricsTtm()
			return applyFieldSelection(results, values)
		}
		catch (error: any) {
			console.error('Error in bulkKeyMetricsTtmTool:', error)
			return { result: error.message || 'An unexpected error occurred in bulkKeyMetricsTtmTool', isError: true }
		}
	},
})

const BULK_RATIOS_TTM_RESULT_VALUES = ['symbol', 'grossProfitMarginTTM', 'ebitMarginTTM', 'ebitdaMarginTTM', 'operatingProfitMarginTTM', 'pretaxProfitMarginTTM', 'continuousOperationsProfitMarginTTM', 'netProfitMarginTTM', 'bottomLineProfitMarginTTM', 'receivablesTurnoverTTM', 'payablesTurnoverTTM', 'inventoryTurnoverTTM', 'fixedAssetTurnoverTTM', 'assetTurnoverTTM', 'currentRatioTTM', 'quickRatioTTM', 'solvencyRatioTTM', 'cashRatioTTM', 'priceToEarningsRatioTTM', 'priceToEarningsGrowthRatioTTM', 'forwardPriceToEarningsGrowthRatioTTM', 'priceToBookRatioTTM', 'priceToSalesRatioTTM', 'priceToFreeCashFlowRatioTTM', 'priceToOperatingCashFlowRatioTTM', 'debtToAssetsRatioTTM', 'debtToEquityRatioTTM', 'debtToCapitalRatioTTM', 'longTermDebtToCapitalRatioTTM', 'financialLeverageRatioTTM', 'workingCapitalTurnoverRatioTTM', 'operatingCashFlowRatioTTM', 'operatingCashFlowSalesRatioTTM', 'freeCashFlowOperatingCashFlowRatioTTM', 'debtServiceCoverageRatioTTM', 'interestCoverageRatioTTM', 'shortTermOperatingCashFlowCoverageRatioTTM', 'operatingCashFlowCoverageRatioTTM', 'capitalExpenditureCoverageRatioTTM', 'dividendPaidAndCapexCoverageRatioTTM', 'dividendPayoutRatioTTM', 'dividendYieldTTM', 'dividendYieldPercentageTTM', 'enterpriseValueTTM', 'revenuePerShareTTM', 'netIncomePerShareTTM', 'interestDebtPerShareTTM', 'cashPerShareTTM', 'bookValuePerShareTTM', 'tangibleBookValuePerShareTTM', 'shareholdersEquityPerShareTTM', 'operatingCashFlowPerShareTTM', 'capexPerShareTTM', 'freeCashFlowPerShareTTM', 'netIncomePerEBTTTM', 'ebtPerEbitTTM', 'priceToFairValueTTM', 'debtToMarketCapTTM', 'effectiveTaxRateTTM', 'enterpriseValueMultipleTTM'] as const
export const bulkRatiosTtm = tool({
	description: 'Retrieves Ratios TTM data in bulk.',
	inputSchema: z.object({
		values: z.array(z.enum(BULK_RATIOS_TTM_RESULT_VALUES)).nullable().optional().describe('Specific fields to return from the results.'),
	}),
	execute: async ({ values }) => {
		try {
			const results = await fmp.bulkRatiosTtm()
			return applyFieldSelection(results, values)
		}
		catch (error: any) {
			console.error('Error in bulkRatiosTtmTool:', error)
			return { result: error.message || 'An unexpected error occurred in bulkRatiosTtmTool', isError: true }
		}
	},
})

const BULK_STOCK_PEERS_RESULT_VALUES = ['symbol', 'peers'] as const
export const bulkStockPeers = tool({
	description: 'Retrieves stock peers data in bulk.',
	inputSchema: z.object({
		values: z.array(z.enum(BULK_STOCK_PEERS_RESULT_VALUES)).nullable().optional().describe('Specific fields to return from the results.'),
	}),
	execute: async ({ values }) => {
		try {
			const results = await fmp.bulkStockPeers()
			return applyFieldSelection(results, values)
		}
		catch (error: any) {
			console.error('Error in bulkStockPeersTool:', error)
			return { result: error.message || 'An unexpected error occurred in bulkStockPeersTool', isError: true }
		}
	},
})

const BULK_EARNINGS_SURPRISES_RESULT_VALUES = ['symbol', 'date', 'epsActual', 'epsEstimated', 'lastUpdated'] as const
export const bulkEarningsSurprises = tool({
	description: 'Retrieves earnings surprises data in bulk for a specific year.',
	inputSchema: z.object({
		year: z.union([z.string(), z.number()]).describe('The year for which to retrieve earnings surprises (e.g., "YEAR" as per doc, likely YYYY format like "2023").'),
		values: z.array(z.enum(BULK_EARNINGS_SURPRISES_RESULT_VALUES)).nullable().optional().describe('Specific fields to return from the results.'),
	}),
	execute: async ({ year, values }) => {
		try {
			const results = await fmp.bulkEarningsSurprises(year)
			return applyFieldSelection(results, values)
		}
		catch (error: any) {
			console.error('Error in bulkEarningsSurprisesTool:', error)
			return { result: error.message || 'An unexpected error occurred in bulkEarningsSurprisesTool', isError: true }
		}
	},
})

const BULK_INCOME_STATEMENT_RESULT_VALUES = ['date', 'symbol', 'reportedCurrency', 'cik', 'filingDate', 'acceptedDate', 'fiscalYear', 'period', 'revenue', 'costOfRevenue', 'grossProfit', 'researchAndDevelopmentExpenses', 'generalAndAdministrativeExpenses', 'sellingAndMarketingExpenses', 'sellingGeneralAndAdministrativeExpenses', 'otherExpenses', 'operatingExpenses', 'costAndExpenses', 'netInterestIncome', 'interestIncome', 'interestExpense', 'depreciationAndAmortization', 'ebitda', 'ebit', 'nonOperatingIncomeExcludingInterest', 'operatingIncome', 'totalOtherIncomeExpensesNet', 'incomeBeforeTax', 'incomeTaxExpense', 'netIncomeFromContinuingOperations', 'netIncomeFromDiscontinuedOperations', 'otherAdjustmentsToNetIncome', 'netIncome', 'netIncomeDeductions', 'bottomLineNetIncome', 'eps', 'epsDiluted', 'weightedAverageShsOut', 'weightedAverageShsOutDil'] as const
export const bulkIncomeStatement = tool({
	description: 'Retrieves income statements in bulk for a specific year and period.',
	inputSchema: z.object({
		options: z.object({
			year: z.union([z.string(), z.number()]).describe('The year of the statements. E.g., "2023".'),
			period: z.enum(['Q1', 'Q2', 'Q3', 'Q4', 'FY']).describe('The financial period (\'Q1\', \'Q2\', \'Q3\', \'Q4\', \'FY\').'),
		}).describe('Options specifying year and period.'),
		values: z.array(z.enum(BULK_INCOME_STATEMENT_RESULT_VALUES)).nullable().optional().describe('Specific fields to return from the results.'),
	}),
	execute: async ({ options, values }) => {
		try {
			const results = await fmp.bulkIncomeStatement(options)
			return applyFieldSelection(results, values)
		}
		catch (error: any) {
			console.error('Error in bulkIncomeStatementTool:', error)
			return { result: error.message || 'An unexpected error occurred in bulkIncomeStatementTool', isError: true }
		}
	},
})

const BULK_INCOME_STATEMENT_GROWTH_RESULT_VALUES = ['symbol', 'date', 'fiscalYear', 'period', 'reportedCurrency', 'growthRevenue', 'growthCostOfRevenue', 'growthGrossProfit', 'growthGrossProfitRatio', 'growthResearchAndDevelopmentExpenses', 'growthGeneralAndAdministrativeExpenses', 'growthSellingAndMarketingExpenses', 'growthOtherExpenses', 'growthOperatingExpenses', 'growthCostAndExpenses', 'growthInterestIncome', 'growthInterestExpense', 'growthDepreciationAndAmortization', 'growthEBITDA', 'growthOperatingIncome', 'growthIncomeBeforeTax', 'growthIncomeTaxExpense', 'growthNetIncome', 'growthEPS', 'growthEPSDiluted', 'growthWeightedAverageShsOut', 'growthWeightedAverageShsOutDil', 'growthEBIT', 'growthNonOperatingIncomeExcludingInterest', 'growthNetInterestIncome', 'growthTotalOtherIncomeExpensesNet', 'growthNetIncomeFromContinuingOperations', 'growthOtherAdjustmentsToNetIncome', 'growthNetIncomeDeductions'] as const
export const bulkIncomeStatementGrowth = tool({
	description: 'Retrieves income statement growth data in bulk for a specific year and period.',
	inputSchema: z.object({
		options: z.object({
			year: z.union([z.string(), z.number()]).describe('The year of the statements. E.g., "2023".'),
			period: z.enum(['Q1', 'Q2', 'Q3', 'Q4', 'FY']).describe('The financial period (\'Q1\', \'Q2\', \'Q3\', \'Q4\', \'FY\').'),
		}).describe('Options specifying year and period.'),
		values: z.array(z.enum(BULK_INCOME_STATEMENT_GROWTH_RESULT_VALUES)).nullable().optional().describe('Specific fields to return from the results.'),
	}),
	execute: async ({ options, values }) => {
		try {
			const results = await fmp.bulkIncomeStatementGrowth(options)
			return applyFieldSelection(results, values)
		}
		catch (error: any) {
			console.error('Error in bulkIncomeStatementGrowthTool:', error)
			return { result: error.message || 'An unexpected error occurred in bulkIncomeStatementGrowthTool', isError: true }
		}
	},
})

const BULK_BALANCE_SHEET_STATEMENT_RESULT_VALUES = ['date', 'symbol', 'reportedCurrency', 'cik', 'filingDate', 'acceptedDate', 'fiscalYear', 'period', 'cashAndCashEquivalents', 'shortTermInvestments', 'cashAndShortTermInvestments', 'netReceivables', 'accountsReceivables', 'otherReceivables', 'inventory', 'prepaids', 'otherCurrentAssets', 'totalCurrentAssets', 'propertyPlantEquipmentNet', 'goodwill', 'intangibleAssets', 'goodwillAndIntangibleAssets', 'longTermInvestments', 'taxAssets', 'otherNonCurrentAssets', 'totalNonCurrentAssets', 'otherAssets', 'totalAssets', 'totalPayables', 'accountPayables', 'otherPayables', 'accruedExpenses', 'shortTermDebt', 'capitalLeaseObligationsCurrent', 'taxPayables', 'deferredRevenue', 'otherCurrentLiabilities', 'totalCurrentLiabilities', 'longTermDebt', 'deferredRevenueNonCurrent', 'deferredTaxLiabilitiesNonCurrent', 'otherNonCurrentLiabilities', 'totalNonCurrentLiabilities', 'otherLiabilities', 'capitalLeaseObligations', 'totalLiabilities', 'treasuryStock', 'preferredStock', 'commonStock', 'retainedEarnings', 'additionalPaidInCapital', 'accumulatedOtherComprehensiveIncomeLoss', 'otherTotalStockholdersEquity', 'totalStockholdersEquity', 'totalEquity', 'minorityInterest', 'totalLiabilitiesAndTotalEquity', 'totalInvestments', 'totalDebt', 'netDebt'] as const
export const bulkBalanceSheetStatement = tool({
	description: 'Retrieves balance sheet statements in bulk for a specific year and period.',
	inputSchema: z.object({
		options: z.object({
			year: z.union([z.string(), z.number()]).describe('The year of the statements. E.g., "2023".'),
			period: z.enum(['Q1', 'Q2', 'Q3', 'Q4', 'FY']).describe('The financial period (\'Q1\', \'Q2\', \'Q3\', \'Q4\', \'FY\').'),
		}).describe('Options specifying year and period.'),
		values: z.array(z.enum(BULK_BALANCE_SHEET_STATEMENT_RESULT_VALUES)).nullable().optional().describe('Specific fields to return from the results.'),
	}),
	execute: async ({ options, values }) => {
		try {
			const results = await fmp.bulkBalanceSheetStatement(options)
			return applyFieldSelection(results, values)
		}
		catch (error: any) {
			console.error('Error in bulkBalanceSheetStatementTool:', error)
			return { result: error.message || 'An unexpected error occurred in bulkBalanceSheetStatementTool', isError: true }
		}
	},
})

const BULK_BALANCE_SHEET_STATEMENT_GROWTH_RESULT_VALUES = ['symbol', 'date', 'fiscalYear', 'period', 'reportedCurrency', 'growthCashAndCashEquivalents', 'growthShortTermInvestments', 'growthCashAndShortTermInvestments', 'growthNetReceivables', 'growthInventory', 'growthOtherCurrentAssets', 'growthTotalCurrentAssets', 'growthPropertyPlantEquipmentNet', 'growthGoodwill', 'growthIntangibleAssets', 'growthGoodwillAndIntangibleAssets', 'growthLongTermInvestments', 'growthTaxAssets', 'growthOtherNonCurrentAssets', 'growthTotalNonCurrentAssets', 'growthOtherAssets', 'growthTotalAssets', 'growthAccountPayables', 'growthShortTermDebt', 'growthTaxPayables', 'growthDeferredRevenue', 'growthOtherCurrentLiabilities', 'growthTotalCurrentLiabilities', 'growthLongTermDebt', 'growthDeferredRevenueNonCurrent', 'growthDeferredTaxLiabilitiesNonCurrent', 'growthOtherNonCurrentLiabilities', 'growthTotalNonCurrentLiabilities', 'growthOtherLiabilities', 'growthTotalLiabilities', 'growthPreferredStock', 'growthCommonStock', 'growthRetainedEarnings', 'growthAccumulatedOtherComprehensiveIncomeLoss', 'growthOthertotalStockholdersEquity', 'growthTotalStockholdersEquity', 'growthMinorityInterest', 'growthTotalEquity', 'growthTotalLiabilitiesAndStockholdersEquity', 'growthTotalInvestments', 'growthTotalDebt', 'growthNetDebt', 'growthAccountsReceivables', 'growthOtherReceivables', 'growthPrepaids', 'growthTotalPayables', 'growthOtherPayables', 'growthAccruedExpenses', 'growthCapitalLeaseObligationsCurrent', 'growthAdditionalPaidInCapital', 'growthTreasuryStock'] as const
export const bulkBalanceSheetStatementGrowth = tool({
	description: 'Retrieves balance sheet statement growth data in bulk for a specific year and period.',
	inputSchema: z.object({
		options: z.object({
			year: z.union([z.string(), z.number()]).describe('The year of the statements. E.g., "2023".'),
			period: z.enum(['Q1', 'Q2', 'Q3', 'Q4', 'FY']).describe('The financial period (\'Q1\', \'Q2\', \'Q3\', \'Q4\', \'FY\').'),
		}).describe('Options specifying year and period.'),
		values: z.array(z.enum(BULK_BALANCE_SHEET_STATEMENT_GROWTH_RESULT_VALUES)).nullable().optional().describe('Specific fields to return from the results.'),
	}),
	execute: async ({ options, values }) => {
		try {
			const results = await fmp.bulkBalanceSheetStatementGrowth(options)
			return applyFieldSelection(results, values)
		}
		catch (error: any) {
			console.error('Error in bulkBalanceSheetStatementGrowthTool:', error)
			return { result: error.message || 'An unexpected error occurred in bulkBalanceSheetStatementGrowthTool', isError: true }
		}
	},
})

const BULK_CASH_FLOW_STATEMENT_RESULT_VALUES = ['date', 'symbol', 'reportedCurrency', 'cik', 'filingDate', 'acceptedDate', 'fiscalYear', 'period', 'netIncome', 'depreciationAndAmortization', 'deferredIncomeTax', 'stockBasedCompensation', 'changeInWorkingCapital', 'accountsReceivables', 'inventory', 'accountsPayables', 'otherWorkingCapital', 'otherNonCashItems', 'netCashProvidedByOperatingActivities', 'investmentsInPropertyPlantAndEquipment', 'acquisitionsNet', 'purchasesOfInvestments', 'salesMaturitiesOfInvestments', 'otherInvestingActivities', 'netCashProvidedByInvestingActivities', 'netDebtIssuance', 'longTermNetDebtIssuance', 'shortTermNetDebtIssuance', 'netStockIssuance', 'netCommonStockIssuance', 'commonStockIssuance', 'commonStockRepurchased', 'netPreferredStockIssuance', 'netDividendsPaid', 'commonDividendsPaid', 'preferredDividendsPaid', 'otherFinancingActivities', 'netCashProvidedByFinancingActivities', 'effectOfForexChangesOnCash', 'netChangeInCash', 'cashAtEndOfPeriod', 'cashAtBeginningOfPeriod', 'operatingCashFlow', 'capitalExpenditure', 'freeCashFlow', 'incomeTaxesPaid', 'interestPaid'] as const
export const bulkCashFlowStatement = tool({
	description: 'Retrieves cash flow statements in bulk for a specific year and period.',
	inputSchema: z.object({
		options: z.object({
			year: z.union([z.string(), z.number()]).describe('The year of the statements. E.g., "2023".'),
			period: z.enum(['Q1', 'Q2', 'Q3', 'Q4', 'FY']).describe('The financial period (\'Q1\', \'Q2\', \'Q3\', \'Q4\', \'FY\').'),
		}).describe('Options specifying year and period.'),
		values: z.array(z.enum(BULK_CASH_FLOW_STATEMENT_RESULT_VALUES)).nullable().optional().describe('Specific fields to return from the results.'),
	}),
	execute: async ({ options, values }) => {
		try {
			const results = await fmp.bulkCashFlowStatement(options)
			return applyFieldSelection(results, values)
		}
		catch (error: any) {
			console.error('Error in bulkCashFlowStatementTool:', error)
			return { result: error.message || 'An unexpected error occurred in bulkCashFlowStatementTool', isError: true }
		}
	},
})

const BULK_CASH_FLOW_STATEMENT_GROWTH_RESULT_VALUES = ['symbol', 'date', 'fiscalYear', 'period', 'reportedCurrency', 'growthNetIncome', 'growthDepreciationAndAmortization', 'growthDeferredIncomeTax', 'growthStockBasedCompensation', 'growthChangeInWorkingCapital', 'growthAccountsReceivables', 'growthInventory', 'growthAccountsPayables', 'growthOtherWorkingCapital', 'growthOtherNonCashItems', 'growthNetCashProvidedByOperatingActivites', 'growthInvestmentsInPropertyPlantAndEquipment', 'growthAcquisitionsNet', 'growthPurchasesOfInvestments', 'growthSalesMaturitiesOfInvestments', 'growthOtherInvestingActivites', 'growthNetCashUsedForInvestingActivites', 'growthDebtRepayment', 'growthCommonStockIssued', 'growthCommonStockRepurchased', 'growthDividendsPaid', 'growthOtherFinancingActivites', 'growthNetCashUsedProvidedByFinancingActivities', 'growthEffectOfForexChangesOnCash', 'growthNetChangeInCash', 'growthCashAtEndOfPeriod', 'growthCashAtBeginningOfPeriod', 'growthOperatingCashFlow', 'growthCapitalExpenditure', 'growthFreeCashFlow', 'growthNetDebtIssuance', 'growthLongTermNetDebtIssuance', 'growthShortTermNetDebtIssuance', 'growthNetStockIssuance', 'growthPreferredDividendsPaid', 'growthIncomeTaxesPaid', 'growthInterestPaid'] as const
export const bulkCashFlowStatementGrowth = tool({
	description: 'Retrieves cash flow statement growth data in bulk for a specific year and period.',
	inputSchema: z.object({
		options: z.object({
			year: z.union([z.string(), z.number()]).describe('The year of the statements. E.g., "2023".'),
			period: z.enum(['Q1', 'Q2', 'Q3', 'Q4', 'FY']).describe('The financial period (\'Q1\', \'Q2\', \'Q3\', \'Q4\', \'FY\').'),
		}).describe('Options specifying year and period.'),
		values: z.array(z.enum(BULK_CASH_FLOW_STATEMENT_GROWTH_RESULT_VALUES)).nullable().optional().describe('Specific fields to return from the results.'),
	}),
	execute: async ({ options, values }) => {
		try {
			const results = await fmp.bulkCashFlowStatementGrowth(options)
			return applyFieldSelection(results, values)
		}
		catch (error: any) {
			console.error('Error in bulkCashFlowStatementGrowthTool:', error)
			return { result: error.message || 'An unexpected error occurred in bulkCashFlowStatementGrowthTool', isError: true }
		}
	},
})

const BULK_EOD_RESULT_VALUES = ['symbol', 'date', 'open', 'low', 'high', 'close', 'adjClose', 'volume'] as const
export const bulkEod = tool({
	description: 'Retrieves end-of-day (EOD) stock price data in bulk for a specific date.',
	inputSchema: z.object({
		date: z.string().describe('The date for the EOD data (YYYY-MM-DD). E.g., "2024-10-22".'),
		values: z.array(z.enum(BULK_EOD_RESULT_VALUES)).nullable().optional().describe('Specific fields to return from the results.'),
	}),
	execute: async ({ date, values }) => {
		try {
			const results = await fmp.bulkEod(date)
			return applyFieldSelection(results, values)
		}
		catch (error: any) {
			console.error('Error in bulkEodTool:', error)
			return { result: error.message || 'An unexpected error occurred in bulkEodTool', isError: true }
		}
	},
})

export const tools = {
	searchSymbol,
	searchName,
	searchCik,
	searchCusip,
	searchIsin,
	stockScreener,
	searchExchangeVariants,
	listCompanySymbols,
	listFinancialStatementSymbols,
	listCik,
	listSymbolChanges,
	listEtfSymbol,
	listActivelyTrading,
	financialEstimates,
	ratingsSnapshot,
	historicalRatings,
	priceTargetSummary,
	priceTargetConsensus,
	priceTargetNews,
	latestPriceTargetNews,
	stockGrades,
	historicalStockGrades,
	stockGradeConsensus,
	stockGradeNews,
	latestStockGradeNews,
	companyDividends,
	dividendsCalendar,
	companyEarningsReports,
	earningsCalendar,
	iposCalendar,
	ipoDisclosures,
	ipoProspectus,
	stockSplitDetails,
	stockSplitsCalendar,
	stockChartFull,
	unadjustedStockChart,
	dividendAdjustedStockChart,
	historicalIntradayChart,
	stockChart1Min,
	stockChart5Min,
	stockChart15Min,
	stockChart30Min,
	stockChart1Hour,
	stockChart4Hour,
	companyProfile,
	companyProfileByCik,
	companyNotes,
	stockPeers,
	delistedCompanies,
	companyEmployeeCount,
	historicalCompanyEmployeeCount,
	companyMarketCap,
	batchMarketCap,
	historicalMarketCap,
	companySharesFloat,
	allSharesFloat,
	latestMergersAcquisitions,
	searchMergersAcquisitions,
	companyExecutives,
	executiveCompensation,
	executiveCompensationBenchmark,
	cotReport,
	cotAnalysis,
	cotReportList,
	dcfValuation,
	leveredDcfValuation,
	dcfAnalysis,
	dcfLeveredAnalysis,
	treasuryRates,
	economicIndicators,
	economicCalendar,
	marketRiskPremium,
	esgDisclosures,
	esgRatings,
	esgBenchmark,
	etfFundHoldings,
	etfFundInfo,
	etfFundCountryAllocation,
	etfAssetExposure,
	etfSectorWeighting,
	mutualFundEtfLatestDisclosures,
	mutualFundDisclosures,
	searchMutualFundEtfDisclosuresByName,
	fundEtfDisclosuresByDate,
	commoditiesList,
	commodityQuote,
	commodityChartFull,
	commodityChart1Min,
	commodityChart5Min,
	commodityChart1Hour,
	latestCrowdfundingCampaigns,
	searchCrowdfundingCampaigns,
	crowdfundingCampaignsByCik,
	latestEquityOfferingUpdates,
	searchEquityOfferings,
	equityOfferingsByCik,
	cryptocurrencyList,
	cryptocurrencyQuote,
	allCryptocurrenciesQuotes,
	cryptocurrencyChartFull,
	cryptocurrencyChart1Min,
	cryptocurrencyChart5Min,
	cryptocurrencyChart1Hour,
	forexList,
	forexQuote,
	allForexQuotes,
	forexChartFull,
	forexChart1Min,
	forexChart5Min,
	forexChart1Hour,
	incomeStatement,
	balanceSheetStatement,
	cashFlowStatement,
	latestFinancialStatements,
	incomeStatementTtm,
	balanceSheetStatementTtm,
	cashFlowStatementTtm,
	keyMetrics,
	financialRatios,
	keyMetricsTtm,
	financialRatiosTtm,
	financialScores,
	ownerEarnings,
	enterpriseValues,
	incomeStatementGrowth,
	balanceSheetStatementGrowth,
	cashFlowStatementGrowth,
	financialStatementGrowth,
	financialReportJson,
	revenueProductSegmentation,
	revenueGeographicSegmentation,
	latestInstitutionalOwnershipFilings,
	secFilingsExtract,
	form13FFilingDates,
	filingsExtractAnalyticsByHolder,
	holderPerformanceSummary,
	holdersIndustryBreakdown,
	positionsSummary,
	industryPerformanceSummary,
	indexesList,
	indexQuote,
	allIndexQuotes,
	indexChartFull,
	indexChart1Min,
	indexChart5Min,
	indexChart1Hour,
	sp500Constituents,
	nasdaqConstituents,
	dowJonesConstituents,
	historicalSp500Constituents,
	historicalNasdaqConstituents,
	historicalDowJonesConstituents,
	latestInsiderTrades,
	searchInsiderTrades,
	searchInsiderTradesByReportingName,
	allInsiderTransactionTypes,
	insiderTradeStatistics,
	acquisitionOwnership,
	marketSectorPerformanceSnapshot,
	marketIndustryPerformanceSnapshot,
	historicalMarketSectorPerformance,
	historicalMarketIndustryPerformance,
	marketSectorPESnapshot,
	marketIndustryPESnapshot,
	historicalMarketSectorPE,
	historicalMarketIndustryPE,
	biggestStockGainers,
	biggestStockLosers,
	topTradedStocks,
	exchangeMarketHours,
	allExchangeMarketHours,
	fmpArticles,
	generalNews,
	pressReleases,
	stockNews,
	cryptoNews,
	forexNews,
	searchPressReleases,
	searchStockNews,
	searchCryptoNews,
	searchForexNews,
	simpleMovingAverage,
	exponentialMovingAverage,
	weightedMovingAverage,
	doubleExponentialMovingAverage,
	tripleExponentialMovingAverage,
	relativeStrengthIndex,
	standardDeviation,
	williamsPercentR,
	averageDirectionalIndex,
	stockQuote,
	aftermarketTrade,
	aftermarketQuote,
	stockPriceChange,
	stockBatchQuote,
	batchAftermarketTrade,
	batchAftermarketQuote,
	exchangeStockQuotes,
	mutualFundQuotes,
	etfQuotes,
	latestEarningTranscripts,
	earningsTranscript,
	earningsTranscriptDatesBySymbol,
	earningsTranscriptList,
	latest8kSecFilings,
	latestSecFilingsWithFinancials,
	searchSecFilingsByFormType,
	searchSecFilingsBySymbol,
	searchSecFilingsByCik,
	searchSecFilingsCompanyName,
	searchSecFilingsCompanyBySymbol,
	searchSecFilingsCompanyByCik,
	secCompanyFullProfile,
	industryClassificationList,
	searchIndustryClassification,
	allIndustryClassification,
	getSecFiling,
	latestSenateFinancialDisclosures,
	latestHouseFinancialDisclosures,
	senateTradingActivity,
	senateTradesByName,
	houseTrades,
	houseTradesByName,
	bulkCompanyProfile,
	bulkStockRating,
	bulkDcfValuations,
	bulkFinancialScores,
	bulkPriceTargetSummary,
	bulkEtfHolder,
	bulkUpgradesDowngradesConsensus,
	bulkKeyMetricsTtm,
	bulkRatiosTtm,
	bulkStockPeers,
	bulkEarningsSurprises,
	bulkIncomeStatement,
	bulkIncomeStatementGrowth,
	bulkBalanceSheetStatement,
	bulkBalanceSheetStatementGrowth,
	bulkCashFlowStatement,
	bulkCashFlowStatementGrowth,
	bulkEod,
}

export default tools
