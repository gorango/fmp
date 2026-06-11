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
		}).describe('Optional parameters to refine the search.'),
		values: z.array(z.enum(SEARCH_SYMBOL_RESULT_VALUES)).nullable().describe('Specific fields to return from the results.'),
	}),
	execute: async ({ query, options, values }) => {
		try {
			const results = await fmp.searchSymbol(query, options)
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
		}).describe('Optional parameters to refine the search.'),
		values: z.array(z.enum(SEARCH_NAME_RESULT_VALUES)).nullable().describe('Specific fields to return from the results.'),
	}),
	execute: async ({ query, options, values }) => {
		try {
			const results = await fmp.searchName(query, options)
			return applyFieldSelection(results, values)
		}
		catch (error: any) {
			console.error('Error in searchNameTool:', error)
			return { result: error.message || 'An unexpected error occurred in searchNameTool', isError: true }
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
		values: z.array(z.enum(FINANCIAL_ESTIMATES_RESULT_VALUES)).nullable().describe('Specific fields to return from the results.'),
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

const PRICE_TARGET_SUMMARY_RESULT_VALUES = ['symbol', 'lastMonthCount', 'lastMonthAvgPriceTarget', 'lastQuarterCount', 'lastQuarterAvgPriceTarget', 'lastYearCount', 'lastYearAvgPriceTarget', 'allTimeCount', 'allTimeAvgPriceTarget', 'publishers'] as const
export const priceTargetSummary = tool({
	description: 'Retrieves a summary of analyst price targets for a given stock symbol.',
	inputSchema: z.object({
		symbol: z.string().describe('The stock symbol (e.g., "AAPL").'),
		values: z.array(z.enum(PRICE_TARGET_SUMMARY_RESULT_VALUES)).nullable().describe('Specific fields to return from the results.'),
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
		values: z.array(z.enum(PRICE_TARGET_CONSENSUS_RESULT_VALUES)).nullable().describe('Specific fields to return from the results.'),
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
		}).describe('Optional parameters for pagination.'),
		values: z.array(z.enum(PRICE_TARGET_NEWS_RESULT_VALUES)).nullable().describe('Specific fields to return from the results.'),
	}),
	execute: async ({ symbol, options, values }) => {
		try {
			const results = await fmp.priceTargetNews(symbol, options)
			return applyFieldSelection(results, values)
		}
		catch (error: any) {
			console.error('Error in priceTargetNewsTool:', error)
			return { result: error.message || 'An unexpected error occurred in priceTargetNewsTool', isError: true }
		}
	},
})

const STOCK_GRADES_RESULT_VALUES = ['symbol', 'date', 'gradingCompany', 'previousGrade', 'newGrade', 'action'] as const
export const stockGrades = tool({
	description: 'Retrieves current stock grades (e.g., buy, sell, hold) from analysts for a given stock symbol.',
	inputSchema: z.object({
		symbol: z.string().describe('The stock symbol (e.g., "AAPL").'),
		values: z.array(z.enum(STOCK_GRADES_RESULT_VALUES)).nullable().describe('Specific fields to return from the results.'),
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

const STOCK_GRADE_CONSENSUS_RESULT_VALUES = ['symbol', 'strongBuy', 'buy', 'hold', 'sell', 'strongSell', 'consensus'] as const
export const stockGradeConsensus = tool({
	description: 'Retrieves a summary of analyst stock grade consensus (strong buy, buy, hold, sell, strong sell) for a given stock symbol.',
	inputSchema: z.object({
		symbol: z.string().describe('The stock symbol (e.g., "AAPL").'),
		values: z.array(z.enum(STOCK_GRADE_CONSENSUS_RESULT_VALUES)).nullable().describe('Specific fields to return from the results.'),
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
		}).describe('Optional parameters for pagination.'),
		values: z.array(z.enum(STOCK_GRADE_NEWS_RESULT_VALUES)).nullable().describe('Specific fields to return from the results.'),
	}),
	execute: async ({ symbol, options, values }) => {
		try {
			const results = await fmp.stockGradeNews(symbol, options)
			return applyFieldSelection(results, values)
		}
		catch (error: any) {
			console.error('Error in stockGradeNewsTool:', error)
			return { result: error.message || 'An unexpected error occurred in stockGradeNewsTool', isError: true }
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
		}).describe('Optional parameters.'),
		values: z.array(z.enum(COMPANY_DIVIDENDS_RESULT_VALUES)).nullable().describe('Specific fields to return from the results.'),
	}),
	execute: async ({ symbol, options, values }) => {
		try {
			const results = await fmp.companyDividends(symbol, options)
			return applyFieldSelection(results, values)
		}
		catch (error: any) {
			console.error('Error in companyDividendsTool:', error)
			return { result: error.message || 'An unexpected error occurred in companyDividendsTool', isError: true }
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
		}).describe('Optional parameters.'),
		values: z.array(z.enum(COMPANY_EARNINGS_REPORTS_RESULT_VALUES)).nullable().describe('Specific fields to return from the results.'),
	}),
	execute: async ({ symbol, options, values }) => {
		try {
			const results = await fmp.companyEarningsReports(symbol, options)
			return applyFieldSelection(results, values)
		}
		catch (error: any) {
			console.error('Error in companyEarningsReportsTool:', error)
			return { result: error.message || 'An unexpected error occurred in companyEarningsReportsTool', isError: true }
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
		}).describe('Optional date range.'),
		values: z.array(z.enum(STOCK_CHART_FULL_RESULT_VALUES)).nullable().describe('Specific fields to return from the results.'),
	}),
	execute: async ({ symbol, options, values }) => {
		try {
			const results = await fmp.stockChartFull(symbol, options)
			return applyFieldSelection(results, values)
		}
		catch (error: any) {
			console.error('Error in stockChartFullTool:', error)
			return { result: error.message || 'An unexpected error occurred in stockChartFullTool', isError: true }
		}
	},
})

const COMPANY_PROFILE_RESULT_VALUES = ['symbol', 'price', 'marketCap', 'beta', 'lastDividend', 'range', 'change', 'changePercentage', 'volume', 'averageVolume', 'companyName', 'currency', 'cik', 'isin', 'cusip', 'exchangeFullName', 'exchange', 'industry', 'website', 'description', 'ceo', 'sector', 'country', 'fullTimeEmployees', 'phone', 'address', 'city', 'state', 'zip', 'image', 'ipoDate', 'defaultImage', 'isEtf', 'isActivelyTrading', 'isAdr', 'isFund'] as const
export const companyProfile = tool({
	description: 'Retrieves detailed company profile data for a given stock symbol.',
	inputSchema: z.object({
		symbol: z.string().describe('The stock symbol (e.g., "AAPL").'),
		values: z.array(z.enum(COMPANY_PROFILE_RESULT_VALUES)).nullable().describe('Specific fields to return from the results.'),
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

const STOCK_PEERS_RESULT_VALUES = ['symbol', 'companyName', 'price', 'mktCap'] as const
export const stockPeers = tool({
	description: 'Retrieves a list of peer companies for a given stock symbol.',
	inputSchema: z.object({
		symbol: z.string().describe('The stock symbol (e.g., "AAPL").'),
		values: z.array(z.enum(STOCK_PEERS_RESULT_VALUES)).nullable().describe('Specific fields to return from the results.'),
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

const COMPANY_EMPLOYEE_COUNT_RESULT_VALUES = ['symbol', 'cik', 'acceptanceTime', 'periodOfReport', 'companyName', 'formType', 'filingDate', 'employeeCount', 'source'] as const
export const companyEmployeeCount = tool({
	description: 'Retrieves employee count information for a given company.',
	inputSchema: z.object({
		symbol: z.string().describe('The stock symbol (e.g., "AAPL").'),
		options: z.object({
			limit: z.number().nullable().describe('The maximum number of results to return. E.g., 50.'),
		}).describe('Optional parameters.'),
		values: z.array(z.enum(COMPANY_EMPLOYEE_COUNT_RESULT_VALUES)).nullable().describe('Specific fields to return from the results.'),
	}),
	execute: async ({ symbol, options, values }) => {
		try {
			const results = await fmp.companyEmployeeCount(symbol, options)
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
		}).describe('Optional parameters (same as CompanyEmployeeCountOptions).'),
		values: z.array(z.enum(HISTORICAL_COMPANY_EMPLOYEE_COUNT_RESULT_VALUES)).nullable().describe('Specific fields to return from the results.'),
	}),
	execute: async ({ symbol, options, values }) => {
		try {
			const results = await fmp.historicalCompanyEmployeeCount(symbol, options)
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
		values: z.array(z.enum(COMPANY_MARKET_CAP_RESULT_VALUES)).nullable().describe('Specific fields to return from the results.'),
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

const HISTORICAL_MARKET_CAP_RESULT_VALUES = ['symbol', 'date', 'marketCap'] as const
export const historicalMarketCap = tool({
	description: 'Retrieves historical market capitalization data for a company.',
	inputSchema: z.object({
		symbol: z.string().describe('The stock symbol (e.g., "AAPL").'),
		options: z.object({
			limit: z.number().nullable().describe('The maximum number of results to return. E.g., 50.'),
			from: z.string().nullable().describe('Start date for the calendar (YYYY-MM-DD). E.g., "2025-01-10".'),
			to: z.string().nullable().describe('End date for the calendar (YYYY-MM-DD). E.g., "2025-04-10". Max 90-day range.'),
		}).describe('Optional parameters for limit and date range.'),
		values: z.array(z.enum(HISTORICAL_MARKET_CAP_RESULT_VALUES)).nullable().describe('Specific fields to return from the results.'),
	}),
	execute: async ({ symbol, options, values }) => {
		try {
			const results = await fmp.historicalMarketCap(symbol, options)
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
		values: z.array(z.enum(COMPANY_SHARES_FLOAT_RESULT_VALUES)).nullable().describe('Specific fields to return from the results.'),
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

const SEARCH_MERGERS_ACQUISITIONS_RESULT_VALUES = ['symbol', 'companyName', 'cik', 'targetedCompanyName', 'targetedCik', 'targetedSymbol', 'transactionDate', 'acceptedDate', 'link'] as const
export const searchMergersAcquisitions = tool({
	description: 'Searches for mergers and acquisitions data by name.',
	inputSchema: z.object({
		name: z.string().describe('The name to search for (e.g., "Apple").'),
		values: z.array(z.enum(SEARCH_MERGERS_ACQUISITIONS_RESULT_VALUES)).nullable().describe('Specific fields to return from the results.'),
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
		}).describe('Optional parameters.'),
		values: z.array(z.enum(COMPANY_EXECUTIVES_RESULT_VALUES)).nullable().describe('Specific fields to return from the results.'),
	}),
	execute: async ({ symbol, options, values }) => {
		try {
			const results = await fmp.companyExecutives(symbol, options)
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
		values: z.array(z.enum(EXECUTIVE_COMPENSATION_RESULT_VALUES)).nullable().describe('Specific fields to return from the results.'),
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
		values: z.array(z.enum(EXECUTIVE_COMPENSATION_BENCHMARK_RESULT_VALUES)).nullable().describe('Specific fields to return from the results.'),
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
		}).describe('Optional parameters to filter reports by symbol and date range.'),
		values: z.array(z.enum(COT_REPORT_RESULT_VALUES)).nullable().describe('Specific fields to return from the results.'),
	}),
	execute: async ({ options, values }) => {
		try {
			const results = await fmp.cotReport(options)
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
		}).describe('Optional parameters to filter analysis by symbol and date range.'),
		values: z.array(z.enum(COT_ANALYSIS_RESULT_VALUES)).nullable().describe('Specific fields to return from the results.'),
	}),
	execute: async ({ options, values }) => {
		try {
			const results = await fmp.cotAnalysis(options)
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
		values: z.array(z.enum(COT_REPORT_LIST_RESULT_VALUES)).nullable().describe('Specific fields to return from the results.'),
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
		values: z.array(z.enum(DCF_VALUATION_RESULT_VALUES)).nullable().describe('Specific fields to return from the results.'),
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
		values: z.array(z.enum(LEVERED_DCF_VALUATION_RESULT_VALUES)).nullable().describe('Specific fields to return from the results.'),
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
		}).describe('Custom parameters for the DCF calculation.'),
		values: z.array(z.enum(DCF_ANALYSIS_RESULT_VALUES)).nullable().describe('Specific fields to return from the results.'),
	}),
	execute: async ({ symbol, params, values }) => {
		try {
			const results = await fmp.dcfAnalysis(symbol, params)
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
		}).describe('Custom parameters for the DCF calculation (same as CustomDcfParams).'),
		values: z.array(z.enum(DCF_LEVERED_ANALYSIS_RESULT_VALUES)).nullable().describe('Specific fields to return from the results.'),
	}),
	execute: async ({ symbol, params, values }) => {
		try {
			const results = await fmp.dcfLeveredAnalysis(symbol, params)
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
		values: z.array(z.enum(TREASURY_RATES_RESULT_VALUES)).nullable().describe('Specific fields to return from the results.'),
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
		}).describe('Optional date range.'),
		values: z.array(z.enum(ECONOMIC_INDICATORS_RESULT_VALUES)).nullable().describe('Specific fields to return from the results.'),
	}),
	execute: async ({ name, options, values }) => {
		try {
			const results = await fmp.economicIndicators(name, options)
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
		values: z.array(z.enum(ECONOMIC_CALENDAR_RESULT_VALUES)).nullable().describe('Specific fields to return from the results.'),
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

const ETF_FUND_HOLDINGS_RESULT_VALUES = ['symbol', 'asset', 'name', 'isin', 'securityCusip', 'sharesNumber', 'weightPercentage', 'marketValue', 'updatedAt', 'updated'] as const
export const etfFundHoldings = tool({
	description: 'Retrieves the holdings of an ETF or mutual fund.',
	inputSchema: z.object({
		symbol: z.string().describe('The symbol of the ETF or fund (e.g., "SPY").'),
		values: z.array(z.enum(ETF_FUND_HOLDINGS_RESULT_VALUES)).nullable().describe('Specific fields to return from the results.'),
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
		values: z.array(z.enum(ETF_FUND_INFO_RESULT_VALUES)).nullable().describe('Specific fields to return from the results.'),
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
		values: z.array(z.enum(ETF_FUND_COUNTRY_ALLOCATION_RESULT_VALUES)).nullable().describe('Specific fields to return from the results.'),
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

const MUTUAL_FUND_ETF_LATEST_DISCLOSURES_RESULT_VALUES = ['cik', 'holder', 'shares', 'dateReported', 'change', 'weightPercent'] as const
export const mutualFundEtfLatestDisclosures = tool({
	description: 'Retrieves the latest disclosures from mutual funds and ETFs for a specific holding.',
	inputSchema: z.object({
		symbol: z.string().describe('The stock symbol of the holding (e.g., "AAPL").'),
		values: z.array(z.enum(MUTUAL_FUND_ETF_LATEST_DISCLOSURES_RESULT_VALUES)).nullable().describe('Specific fields to return from the results.'),
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
		values: z.array(z.enum(MUTUAL_FUND_DISCLOSURES_RESULT_VALUES)).nullable().describe('Specific fields to return from the results.'),
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
		values: z.array(z.enum(SEARCH_MUTUAL_FUND_ETF_DISCLOSURES_BY_NAME_RESULT_VALUES)).nullable().describe('Specific fields to return from the results.'),
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
		}).describe('Optional CIK.'),
		values: z.array(z.enum(FUND_ETF_DISCLOSURES_BY_DATE_RESULT_VALUES)).nullable().describe('Specific fields to return from the results.'),
	}),
	execute: async ({ symbol, options, values }) => {
		try {
			const results = await fmp.fundEtfDisclosuresByDate(symbol, options)
			return applyFieldSelection(results, values)
		}
		catch (error: any) {
			console.error('Error in fundEtfDisclosuresByDateTool:', error)
			return { result: error.message || 'An unexpected error occurred in fundEtfDisclosuresByDateTool', isError: true }
		}
	},
})

const COMMODITY_QUOTE_RESULT_VALUES = ['symbol', 'name', 'price', 'changesPercentage', 'change', 'dayLow', 'dayHigh', 'yearHigh', 'yearLow', 'marketCap', 'priceAvg50', 'priceAvg200', 'exchange', 'volume', 'avgVolume', 'open', 'previousClose', 'eps', 'pe', 'earningsAnnouncement', 'sharesOutstanding', 'timestamp'] as const
export const commodityQuote = tool({
	description: 'Retrieves a real-time price quote for a commodity.',
	inputSchema: z.object({
		symbol: z.string().describe('The commodity symbol (e.g., "GCUSD").'),
		values: z.array(z.enum(COMMODITY_QUOTE_RESULT_VALUES)).nullable().describe('Specific fields to return from the results.'),
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
		}).describe('Optional date range.'),
		values: z.array(z.enum(COMMODITY_CHART_FULL_RESULT_VALUES)).nullable().describe('Specific fields to return from the results.'),
	}),
	execute: async ({ symbol, options, values }) => {
		try {
			const results = await fmp.commodityChartFull(symbol, options)
			return applyFieldSelection(results, values)
		}
		catch (error: any) {
			console.error('Error in commodityChartFullTool:', error)
			return { result: error.message || 'An unexpected error occurred in commodityChartFullTool', isError: true }
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
		}).describe('Optional parameters for limit and period.'),
		values: z.array(z.enum(INCOME_STATEMENT_RESULT_VALUES)).nullable().describe('Specific fields to return from the results.'),
	}),
	execute: async ({ symbol, options, values }) => {
		try {
			const results = await fmp.incomeStatement(symbol, options)
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
		}).describe('Optional parameters for limit and period.'),
		values: z.array(z.enum(BALANCE_SHEET_STATEMENT_RESULT_VALUES)).nullable().describe('Specific fields to return from the results.'),
	}),
	execute: async ({ symbol, options, values }) => {
		try {
			const results = await fmp.balanceSheetStatement(symbol, options)
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
		}).describe('Optional parameters for limit and period.'),
		values: z.array(z.enum(CASH_FLOW_STATEMENT_RESULT_VALUES)).nullable().describe('Specific fields to return from the results.'),
	}),
	execute: async ({ symbol, options, values }) => {
		try {
			const results = await fmp.cashFlowStatement(symbol, options)
			return applyFieldSelection(results, values)
		}
		catch (error: any) {
			console.error('Error in cashFlowStatementTool:', error)
			return { result: error.message || 'An unexpected error occurred in cashFlowStatementTool', isError: true }
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
		}).describe('Optional parameters for limit.'),
		values: z.array(z.enum(INCOME_STATEMENT_TTM_RESULT_VALUES)).nullable().describe('Specific fields to return from the results.'),
	}),
	execute: async ({ symbol, options, values }) => {
		try {
			const results = await fmp.incomeStatementTtm(symbol, options)
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
		}).describe('Optional parameters for limit.'),
		values: z.array(z.enum(BALANCE_SHEET_STATEMENT_TTM_RESULT_VALUES)).nullable().describe('Specific fields to return from the results.'),
	}),
	execute: async ({ symbol, options, values }) => {
		try {
			const results = await fmp.balanceSheetStatementTtm(symbol, options)
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
		}).describe('Optional parameters for limit.'),
		values: z.array(z.enum(CASH_FLOW_STATEMENT_TTM_RESULT_VALUES)).nullable().describe('Specific fields to return from the results.'),
	}),
	execute: async ({ symbol, options, values }) => {
		try {
			const results = await fmp.cashFlowStatementTtm(symbol, options)
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
		}).describe('Optional parameters for limit and period (same as FinancialStatementOptions).'),
		values: z.array(z.enum(KEY_METRICS_RESULT_VALUES)).nullable().describe('Specific fields to return from the results.'),
	}),
	execute: async ({ symbol, options, values }) => {
		try {
			const results = await fmp.keyMetrics(symbol, options)
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
		}).describe('Optional parameters for limit and period (same as FinancialStatementOptions).'),
		values: z.array(z.enum(FINANCIAL_RATIOS_RESULT_VALUES)).nullable().describe('Specific fields to return from the results.'),
	}),
	execute: async ({ symbol, options, values }) => {
		try {
			const results = await fmp.financialRatios(symbol, options)
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
		values: z.array(z.enum(KEY_METRICS_TTM_RESULT_VALUES)).nullable().describe('Specific fields to return from the results.'),
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
		values: z.array(z.enum(FINANCIAL_RATIOS_TTM_RESULT_VALUES)).nullable().describe('Specific fields to return from the results.'),
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
		values: z.array(z.enum(FINANCIAL_SCORES_RESULT_VALUES)).nullable().describe('Specific fields to return from the results.'),
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
		}).describe('Optional parameters for limit.'),
		values: z.array(z.enum(OWNER_EARNINGS_RESULT_VALUES)).nullable().describe('Specific fields to return from the results.'),
	}),
	execute: async ({ symbol, options, values }) => {
		try {
			const results = await fmp.ownerEarnings(symbol, options)
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
		}).describe('Optional parameters for limit and period (same as FinancialStatementOptions).'),
		values: z.array(z.enum(ENTERPRISE_VALUES_RESULT_VALUES)).nullable().describe('Specific fields to return from the results.'),
	}),
	execute: async ({ symbol, options, values }) => {
		try {
			const results = await fmp.enterpriseValues(symbol, options)
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
		}).describe('Optional parameters for limit and period (same as FinancialStatementOptions).'),
		values: z.array(z.enum(INCOME_STATEMENT_GROWTH_RESULT_VALUES)).nullable().describe('Specific fields to return from the results.'),
	}),
	execute: async ({ symbol, options, values }) => {
		try {
			const results = await fmp.incomeStatementGrowth(symbol, options)
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
		}).describe('Optional parameters for limit and period (same as FinancialStatementOptions).'),
		values: z.array(z.enum(BALANCE_SHEET_STATEMENT_GROWTH_RESULT_VALUES)).nullable().describe('Specific fields to return from the results.'),
	}),
	execute: async ({ symbol, options, values }) => {
		try {
			const results = await fmp.balanceSheetStatementGrowth(symbol, options)
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
		}).describe('Optional parameters for limit and period (same as FinancialStatementOptions).'),
		values: z.array(z.enum(CASH_FLOW_STATEMENT_GROWTH_RESULT_VALUES)).nullable().describe('Specific fields to return from the results.'),
	}),
	execute: async ({ symbol, options, values }) => {
		try {
			const results = await fmp.cashFlowStatementGrowth(symbol, options)
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
		}).describe('Optional parameters for limit and period (same as FinancialStatementOptions).'),
		values: z.array(z.enum(FINANCIAL_STATEMENT_GROWTH_RESULT_VALUES)).nullable().describe('Specific fields to return from the results.'),
	}),
	execute: async ({ symbol, options, values }) => {
		try {
			const results = await fmp.financialStatementGrowth(symbol, options)
			return applyFieldSelection(results, values)
		}
		catch (error: any) {
			console.error('Error in financialStatementGrowthTool:', error)
			return { result: error.message || 'An unexpected error occurred in financialStatementGrowthTool', isError: true }
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
		}).describe('Optional parameters for period and structure.'),
		values: z.array(z.enum(REVENUE_PRODUCT_SEGMENTATION_RESULT_VALUES)).nullable().describe('Specific fields to return from the results.'),
	}),
	execute: async ({ symbol, options, values }) => {
		try {
			const results = await fmp.revenueProductSegmentation(symbol, options)
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
		}).describe('Optional parameters for period and structure (same as RevenueSegmentationOptions).'),
		values: z.array(z.enum(REVENUE_GEOGRAPHIC_SEGMENTATION_RESULT_VALUES)).nullable().describe('Specific fields to return from the results.'),
	}),
	execute: async ({ symbol, options, values }) => {
		try {
			const results = await fmp.revenueGeographicSegmentation(symbol, options)
			return applyFieldSelection(results, values)
		}
		catch (error: any) {
			console.error('Error in revenueGeographicSegmentationTool:', error)
			return { result: error.message || 'An unexpected error occurred in revenueGeographicSegmentationTool', isError: true }
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
		values: z.array(z.enum(FILINGS_EXTRACT_ANALYTICS_BY_HOLDER_RESULT_VALUES)).nullable().describe('Specific fields to return from the results.'),
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
		values: z.array(z.enum(HOLDER_PERFORMANCE_SUMMARY_RESULT_VALUES)).nullable().describe('Specific fields to return from the results.'),
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
		values: z.array(z.enum(HOLDERS_INDUSTRY_BREAKDOWN_RESULT_VALUES)).nullable().describe('Specific fields to return from the results.'),
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
		values: z.array(z.enum(POSITIONS_SUMMARY_RESULT_VALUES)).nullable().describe('Specific fields to return from the results.'),
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
		values: z.array(z.enum(INDUSTRY_PERFORMANCE_SUMMARY_RESULT_VALUES)).nullable().describe('Specific fields to return from the results.'),
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

const INDEX_QUOTE_RESULT_VALUES = ['symbol', 'name', 'price', 'changesPercentage', 'change', 'dayLow', 'dayHigh', 'yearHigh', 'yearLow', 'marketCap', 'priceAvg50', 'priceAvg200', 'exchange', 'volume', 'avgVolume', 'open', 'previousClose', 'eps', 'pe', 'earningsAnnouncement', 'sharesOutstanding', 'timestamp'] as const
export const indexQuote = tool({
	description: 'Retrieves a real-time quote for a stock market index.',
	inputSchema: z.object({
		symbol: z.string().describe('The index symbol (e.g., "^GSPC").'),
		values: z.array(z.enum(INDEX_QUOTE_RESULT_VALUES)).nullable().describe('Specific fields to return from the results.'),
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

const INDEX_CHART_FULL_RESULT_VALUES = ['symbol', 'change', 'changePercent', 'vwap', 'date', 'open', 'high', 'low', 'close', 'volume'] as const
export const indexChartFull = tool({
	description: 'Retrieves full historical end-of-day price data for an index.',
	inputSchema: z.object({
		symbol: z.string().describe('The index symbol (e.g., "^GSPC").'),
		options: z.object({
			from: z.string().nullable().describe('Start date for the calendar (YYYY-MM-DD). E.g., "2025-01-10".'),
			to: z.string().nullable().describe('End date for the calendar (YYYY-MM-DD). E.g., "2025-04-10". Max 90-day range.'),
		}).describe('Optional date range.'),
		values: z.array(z.enum(INDEX_CHART_FULL_RESULT_VALUES)).nullable().describe('Specific fields to return from the results.'),
	}),
	execute: async ({ symbol, options, values }) => {
		try {
			const results = await fmp.indexChartFull(symbol, options)
			return applyFieldSelection(results, values)
		}
		catch (error: any) {
			console.error('Error in indexChartFullTool:', error)
			return { result: error.message || 'An unexpected error occurred in indexChartFullTool', isError: true }
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
		}).describe('Optional parameters for date filter and pagination.'),
		values: z.array(z.enum(LATEST_INSIDER_TRADES_RESULT_VALUES)).nullable().describe('Specific fields to return from the results.'),
	}),
	execute: async ({ options, values }) => {
		try {
			const results = await fmp.latestInsiderTrades(options)
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
		}).describe('Optional parameters for filtering and pagination.'),
		values: z.array(z.enum(SEARCH_INSIDER_TRADES_RESULT_VALUES)).nullable().describe('Specific fields to return from the results.'),
	}),
	execute: async ({ options, values }) => {
		try {
			const results = await fmp.searchInsiderTrades(options)
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
		values: z.array(z.enum(SEARCH_INSIDER_TRADES_BY_REPORTING_NAME_RESULT_VALUES)).nullable().describe('Specific fields to return from the results.'),
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
		values: z.array(z.enum(ALL_INSIDER_TRANSACTION_TYPES_RESULT_VALUES)).nullable().describe('Specific fields to return from the results.'),
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
		values: z.array(z.enum(INSIDER_TRADE_STATISTICS_RESULT_VALUES)).nullable().describe('Specific fields to return from the results.'),
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
		}).describe('Optional parameters.'),
		values: z.array(z.enum(ACQUISITION_OWNERSHIP_RESULT_VALUES)).nullable().describe('Specific fields to return from the results.'),
	}),
	execute: async ({ symbol, options, values }) => {
		try {
			const results = await fmp.acquisitionOwnership(symbol, options)
			return applyFieldSelection(results, values)
		}
		catch (error: any) {
			console.error('Error in acquisitionOwnershipTool:', error)
			return { result: error.message || 'An unexpected error occurred in acquisitionOwnershipTool', isError: true }
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
		values: z.array(z.enum(SIMPLE_MOVING_AVERAGE_RESULT_VALUES)).nullable().describe('Specific fields to return from the results.'),
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
		values: z.array(z.enum(EXPONENTIAL_MOVING_AVERAGE_RESULT_VALUES)).nullable().describe('Specific fields to return from the results.'),
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
		values: z.array(z.enum(WEIGHTED_MOVING_AVERAGE_RESULT_VALUES)).nullable().describe('Specific fields to return from the results.'),
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
		values: z.array(z.enum(DOUBLE_EXPONENTIAL_MOVING_AVERAGE_RESULT_VALUES)).nullable().describe('Specific fields to return from the results.'),
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
		values: z.array(z.enum(TRIPLE_EXPONENTIAL_MOVING_AVERAGE_RESULT_VALUES)).nullable().describe('Specific fields to return from the results.'),
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
		values: z.array(z.enum(RELATIVE_STRENGTH_INDEX_RESULT_VALUES)).nullable().describe('Specific fields to return from the results.'),
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
		values: z.array(z.enum(STANDARD_DEVIATION_RESULT_VALUES)).nullable().describe('Specific fields to return from the results.'),
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
		values: z.array(z.enum(WILLIAMS_PERCENT_R_RESULT_VALUES)).nullable().describe('Specific fields to return from the results.'),
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
		values: z.array(z.enum(AVERAGE_DIRECTIONAL_INDEX_RESULT_VALUES)).nullable().describe('Specific fields to return from the results.'),
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
		values: z.array(z.enum(STOCK_QUOTE_RESULT_VALUES)).nullable().describe('Specific fields to return from the results.'),
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

const STOCK_QUOTE_SHORT_RESULT_VALUES = ['symbol', 'price', 'change', 'volume'] as const
export const stockQuoteShort = tool({
	description: 'Retrieves a short real-time stock quote.',
	inputSchema: z.object({
		symbol: z.string().describe('The stock symbol (e.g., "AAPL").'),
		values: z.array(z.enum(STOCK_QUOTE_SHORT_RESULT_VALUES)).nullable().describe('Specific fields to return from the results.'),
	}),
	execute: async ({ symbol, values }) => {
		try {
			const results = await fmp.stockQuoteShort(symbol)
			return applyFieldSelection(results, values)
		}
		catch (error: any) {
			console.error('Error in stockQuoteShortTool:', error)
			return { result: error.message || 'An unexpected error occurred in stockQuoteShortTool', isError: true }
		}
	},
})

const AFTERMARKET_TRADE_RESULT_VALUES = ['symbol', 'price', 'tradeSize', 'timestamp'] as const
export const aftermarketTrade = tool({
	description: 'Retrieves real-time aftermarket trade data for a stock.',
	inputSchema: z.object({
		symbol: z.string().describe('The stock symbol (e.g., "AAPL").'),
		values: z.array(z.enum(AFTERMARKET_TRADE_RESULT_VALUES)).nullable().describe('Specific fields to return from the results.'),
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
		values: z.array(z.enum(AFTERMARKET_QUOTE_RESULT_VALUES)).nullable().describe('Specific fields to return from the results.'),
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
		values: z.array(z.enum(STOCK_PRICE_CHANGE_RESULT_VALUES)).nullable().describe('Specific fields to return from the results.'),
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

export const exchangeStockQuotes = tool({
	description: 'Retrieves real-time stock quotes for all stocks on a specific exchange.',
	inputSchema: z.object({
		exchange: z.string().describe('The stock exchange symbol (e.g., "NASDAQ").'),
		options: z.object({
			short: z.boolean().nullable().describe('If true, returns short quotes. E.g., true.'),
		}).describe('Optional parameters.'),
	}),
	execute: async ({ exchange, options }) => {
		return fmp.exchangeStockQuotes(exchange, options)
	},
})

export const mutualFundQuotes = tool({
	description: 'Retrieves real-time quotes for all mutual funds.',
	inputSchema: z.object({
		options: z.object({
			short: z.boolean().nullable().describe('If true, returns short quotes. E.g., true.'),
		}).describe('Optional parameters.'),
	}),
	execute: async ({ options }) => {
		return fmp.mutualFundQuotes(options)
	},
})

export const etfQuotes = tool({
	description: 'Retrieves real-time quotes for all ETFs.',
	inputSchema: z.object({
		options: z.object({
			short: z.boolean().nullable().describe('If true, returns short quotes. E.g., true.'),
		}).describe('Optional parameters.'),
	}),
	execute: async ({ options }) => {
		return fmp.etfQuotes(options)
	},
})

const EARNINGS_TRANSCRIPT_DATES_BY_SYMBOL_RESULT_VALUES = ['quarter', 'fiscalYear', 'date'] as const
export const earningsTranscriptDatesBySymbol = tool({
	description: 'Retrieves available earnings call transcript dates for a specific company.',
	inputSchema: z.object({
		symbol: z.string().describe('The stock symbol (e.g., "AAPL").'),
		values: z.array(z.enum(EARNINGS_TRANSCRIPT_DATES_BY_SYMBOL_RESULT_VALUES)).nullable().describe('Specific fields to return from the results.'),
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
		}).describe('Optional parameters for pagination.'),
		values: z.array(z.enum(LATEST_SENATE_FINANCIAL_DISCLOSURES_RESULT_VALUES)).nullable().describe('Specific fields to return from the results.'),
	}),
	execute: async ({ options, values }) => {
		try {
			const results = await fmp.latestSenateFinancialDisclosures(options)
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
		}).describe('Optional parameters for pagination.'),
		values: z.array(z.enum(LATEST_HOUSE_FINANCIAL_DISCLOSURES_RESULT_VALUES)).nullable().describe('Specific fields to return from the results.'),
	}),
	execute: async ({ options, values }) => {
		try {
			const results = await fmp.latestHouseFinancialDisclosures(options)
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
		values: z.array(z.enum(SENATE_TRADING_ACTIVITY_RESULT_VALUES)).nullable().describe('Specific fields to return from the results.'),
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
		values: z.array(z.enum(SENATE_TRADES_BY_NAME_RESULT_VALUES)).nullable().describe('Specific fields to return from the results.'),
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
		values: z.array(z.enum(HOUSE_TRADES_RESULT_VALUES)).nullable().describe('Specific fields to return from the results.'),
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
		values: z.array(z.enum(HOUSE_TRADES_BY_NAME_RESULT_VALUES)).nullable().describe('Specific fields to return from the results.'),
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

export const tools = {
	searchSymbol,
	searchName,
	financialEstimates,
	priceTargetSummary,
	priceTargetConsensus,
	priceTargetNews,
	stockGrades,
	stockGradeConsensus,
	stockGradeNews,
	companyDividends,
	companyEarningsReports,
	stockChartFull,
	companyProfile,
	stockPeers,
	companyEmployeeCount,
	historicalCompanyEmployeeCount,
	companyMarketCap,
	historicalMarketCap,
	companySharesFloat,
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
	etfFundHoldings,
	etfFundInfo,
	etfFundCountryAllocation,
	mutualFundEtfLatestDisclosures,
	mutualFundDisclosures,
	searchMutualFundEtfDisclosuresByName,
	fundEtfDisclosuresByDate,
	commodityQuote,
	commodityChartFull,
	incomeStatement,
	balanceSheetStatement,
	cashFlowStatement,
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
	revenueProductSegmentation,
	revenueGeographicSegmentation,
	filingsExtractAnalyticsByHolder,
	holderPerformanceSummary,
	holdersIndustryBreakdown,
	positionsSummary,
	industryPerformanceSummary,
	indexQuote,
	indexChartFull,
	latestInsiderTrades,
	searchInsiderTrades,
	searchInsiderTradesByReportingName,
	allInsiderTransactionTypes,
	insiderTradeStatistics,
	acquisitionOwnership,
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
	stockQuoteShort,
	aftermarketTrade,
	aftermarketQuote,
	stockPriceChange,
	exchangeStockQuotes,
	mutualFundQuotes,
	etfQuotes,
	earningsTranscriptDatesBySymbol,
	getSecFiling,
	latestSenateFinancialDisclosures,
	latestHouseFinancialDisclosures,
	senateTradingActivity,
	senateTradesByName,
	houseTrades,
	houseTradesByName,
}

export default tools
