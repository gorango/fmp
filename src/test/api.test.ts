import type { z } from 'zod'
import type * as FMPTypes from '../types'
import * as fmp from '../api'
import * as validate from './validate'

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))
const THROTTLE_MS = 10

const API_KEY = process.env.FMP_KEY
const canRunTests = !!API_KEY

// --- Test Variables ---
const testSymbol = 'AAPL'
const testSymbolAlt = 'MSFT'
const testEtf = 'SPY'
// const testIndex = '^GSPC'
const testForex = 'EURUSD'
const testCrypto = 'BTCUSD'
const testCommodity = 'GCUSD' // Gold
const testCIK = '0000320193' // Apple's CIK
const testCUSIP = '037833100'
const testISIN = 'US0378331005'
const testName = 'Apple'
const testExchange = 'NASDAQ'
// const testDate = '2023-10-27' // A fixed past date for consistency
const testRecentDate = new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString().split('T')[0] // 5 days ago
const testFromDate = '2023-01-01'
const testToDate = '2023-01-15' // Shorter range for faster tests
const testYear = '2023'
const testQuarter = '3' as FMPTypes.FinancialPeriod // Q1, Q2, Q3, Q4
const testPeriodAnnual = 'annual' as FMPTypes.StatementPeriodOption
const testPeriodQuarter = 'quarter' as FMPTypes.StatementPeriodOption
const testFinancialPeriodFY = 'FY' as FMPTypes.FinancialPeriod
const testIndustry = 'Consumer Electronics'
const testSector = 'Technology'
const testLimit = 2 // Reduced limit for faster tests
const testPage = 0
const testEconomicIndicatorName = 'GDP' as FMPTypes.EconomicIndicator['name']
const testIndicatorTimeframe = '1day' as FMPTypes.IndicatorTimeframe
const testIndicatorPeriodLength = 10
const testHolderCik = '0001067983' // Berkshire Hathaway
const testSenatorName = 'Markwayne' // From Senate example
const testHouseRepName = 'Michael' // From House example
const testBulkPart = '0' // For bulk endpoints that take 'part'
const testFormType = '8-K'
const testCompanyName = 'Apple Inc.' // For SEC company name search

const describeIf = (condition: boolean, title: string, fn: () => void) => {
	if (condition) {
		describe(title, fn)
	} else {
		describe.skip(title, fn)
	}
}

describe('fMP API Wrapper Tests', () => {
	beforeAll(() => {
		if (!canRunTests) {
			console.warn('FMP_KEY not found in environment variables. Skipping API tests.')
		}
	})

	async function runTest(
		description: string,
		apiCall: () => Promise<any>,
		zodSchema: z.ZodSchema<any>,
		allowEmptyArray = true, // Many FMP endpoints return [] if no data
	) {
		it(
			description,
			async () => {
				await sleep(THROTTLE_MS)
				try {
					const response = await apiCall()
					expect(response).toBeDefined()

					if (allowEmptyArray && Array.isArray(response) && response.length === 0) {
						// console.warn(`Test '${description}' received an empty array. This is considered valid for this test.`);
						expect(response).toEqual([])
						return
					}

					const parseResult = zodSchema.safeParse(response.slice(0, 10))
					if (!parseResult.success) {
						console.error(
							`Zod validation failed for "${description}":`,
							JSON.stringify(parseResult.error.issues, null, 2),
						)
						// console.error("Received data:", JSON.stringify(response, null, 2));
					}
					expect(parseResult.success, `Zod validation failed for ${description}`).toBe(true)
				} catch (error: any) {
					let errorMessage = `Error during test "${description}": ${error.message}`
					if (error.response && typeof error.response.text === 'function') {
						try {
							const errorBodyText = await error.response.text()
							errorMessage += `\nResponse Body: ${errorBodyText}`
						} catch {
							errorMessage += '\nFailed to parse error response body.'
						}
					}
					console.error(errorMessage)
					throw error
				}
			},
			20000,
		) // Increased timeout for API calls
	}

	// --- SEARCH TESTS ---
	describeIf(canRunTests, 'Search Endpoints', () => {
		runTest('searchSymbol', () => fmp.searchSymbol(testName, { limit: testLimit, exchange: testExchange }), validate.SymbolSearchResultArraySchema) // oxfmt-ignore
		runTest('searchName', () => fmp.searchName(testName, { limit: testLimit, exchange: testExchange }), validate.NameSearchResultArraySchema) // oxfmt-ignore
		runTest('searchCik', () => fmp.searchCik(testCIK, { limit: testLimit }), validate.CikSearchResultArraySchema) // oxfmt-ignore
		runTest('searchCusip', () => fmp.searchCusip(testCUSIP), validate.CusipSearchResultArraySchema) // oxfmt-ignore
		runTest('searchIsin', () => fmp.searchIsin(testISIN), validate.IsinSearchResultArraySchema) // oxfmt-ignore
		runTest('stockScreener', () => fmp.stockScreener({ marketCapMoreThan: 100000000000, sector: testSector, limit: testLimit }), validate.StockScreenerResultArraySchema) // oxfmt-ignore
		runTest('searchExchangeVariants', () => fmp.searchExchangeVariants(testSymbol), validate.ExchangeVariantArraySchema) // oxfmt-ignore
	})

	// --- DIRECTORY TESTS ---
	describeIf(canRunTests, 'Directory Endpoints', () => {
		runTest('listCompanySymbols', () => fmp.listCompanySymbols(), validate.CompanySymbolArraySchema) // oxfmt-ignore
		runTest('listFinancialStatementSymbols', () => fmp.listFinancialStatementSymbols(), validate.FinancialStatementSymbolArraySchema) // oxfmt-ignore
		runTest('listCik', () => fmp.listCik({ limit: testLimit }), validate.CikListItemArraySchema) // oxfmt-ignore
		runTest('listSymbolChanges', () => fmp.listSymbolChanges({ limit: testLimit }), validate.SymbolChangeArraySchema) // oxfmt-ignore
		runTest('listEtfSymbol', () => fmp.listEtfSymbol(), validate.EtfSymbolArraySchema) // oxfmt-ignore
		runTest('listActivelyTrading', () => fmp.listActivelyTrading(), validate.ActivelyTradingItemArraySchema) // oxfmt-ignore
		runTest('listAvailableExchanges', () => fmp.listAvailableExchanges(), validate.AvailableExchangeArraySchema) // oxfmt-ignore
		runTest('listAvailableSectors', () => fmp.listAvailableSectors(), validate.AvailableSectorArraySchema) // oxfmt-ignore
		runTest('listAvailableIndustries', () => fmp.listAvailableIndustries(), validate.AvailableIndustryArraySchema) // oxfmt-ignore
		runTest('listAvailableCountries', () => fmp.listAvailableCountries(), validate.AvailableCountryArraySchema) // oxfmt-ignore
	})

	// --- ANALYST TESTS ---
	describeIf(canRunTests, 'Analyst Endpoints', () => {
		runTest('financialEstimates (annual)', () => fmp.financialEstimates(testSymbol, { period: testPeriodAnnual, limit: testLimit }), validate.FinancialEstimateArraySchema) // oxfmt-ignore
		runTest('financialEstimates (quarter)', () => fmp.financialEstimates(testSymbol, { period: testPeriodQuarter, limit: testLimit }), validate.FinancialEstimateArraySchema) // oxfmt-ignore
		runTest('ratingsSnapshot', () => fmp.ratingsSnapshot(testSymbol, { limit: 1 }), validate.RatingSnapshotArraySchema) // oxfmt-ignore
		runTest('historicalRatings', () => fmp.historicalRatings(testSymbol, { limit: testLimit }), validate.HistoricalRatingArraySchema) // oxfmt-ignore
		runTest('priceTargetSummary', () => fmp.priceTargetSummary(testSymbol), validate.PriceTargetSummaryArraySchema) // oxfmt-ignore
		runTest('priceTargetConsensus', () => fmp.priceTargetConsensus(testSymbol), validate.PriceTargetConsensusArraySchema) // oxfmt-ignore
		runTest('priceTargetNews', () => fmp.priceTargetNews(testSymbol, { limit: testLimit, page: testPage }), validate.PriceTargetNewsItemArraySchema) // oxfmt-ignore
		runTest('latestPriceTargetNews', () => fmp.latestPriceTargetNews({ limit: testLimit, page: testPage }), validate.PriceTargetNewsItemArraySchema) // oxfmt-ignore
		runTest('stockGrades', () => fmp.stockGrades(testSymbol), validate.StockGradeArraySchema) // oxfmt-ignore
		runTest('historicalStockGrades', () => fmp.historicalStockGrades(testSymbol, { limit: testLimit }), validate.HistoricalStockGradeSummaryArraySchema) // oxfmt-ignore
		runTest('stockGradeConsensus', () => fmp.stockGradeConsensus(testSymbol), validate.StockGradeConsensusArraySchema) // oxfmt-ignore
		runTest('stockGradeNews', () => fmp.stockGradeNews(testSymbol, { limit: testLimit, page: testPage }), validate.StockGradeNewsItemArraySchema) // oxfmt-ignore
		runTest('latestStockGradeNews', () => fmp.latestStockGradeNews({ limit: testLimit, page: testPage }), validate.StockGradeNewsItemArraySchema) // oxfmt-ignore
	})

	// --- CALENDAR TESTS ---
	describeIf(canRunTests, 'Calendar Endpoints', () => {
		runTest('companyDividends', () => fmp.companyDividends(testSymbol, { limit: testLimit }), validate.CompanyDividendArraySchema) // oxfmt-ignore
		runTest('dividendsCalendar', () => fmp.dividendsCalendar({ from: testFromDate, to: testToDate }), validate.CalendarDividendArraySchema) // oxfmt-ignore
		runTest('companyEarningsReports', () => fmp.companyEarningsReports(testSymbol, { limit: testLimit }), validate.CompanyEarningsReportArraySchema) // oxfmt-ignore
		runTest('earningsCalendar', () => fmp.earningsCalendar({ from: testFromDate, to: testToDate }), validate.CompanyEarningsReportArraySchema) // oxfmt-ignore
		runTest('iposCalendar', () => fmp.iposCalendar({ from: testFromDate, to: testToDate }), validate.IpoCalendarItemArraySchema) // oxfmt-ignore
		runTest('ipoDisclosures', () => fmp.ipoDisclosures({ from: testFromDate, to: testToDate }), validate.IpoDisclosureArraySchema) // oxfmt-ignore
		runTest('ipoProspectus', () => fmp.ipoProspectus({ from: testFromDate, to: testToDate }), validate.IpoProspectusArraySchema) // oxfmt-ignore
		runTest('stockSplitDetails', () => fmp.stockSplitDetails(testSymbol, { limit: testLimit }), validate.StockSplitDetailArraySchema) // oxfmt-ignore
		runTest('stockSplitsCalendar', () => fmp.stockSplitsCalendar({ from: testFromDate, to: testToDate }), validate.StockSplitDetailArraySchema) // oxfmt-ignore
	})

	// --- CHART TESTS ---
	describeIf(canRunTests, 'Chart Endpoints', () => {
		runTest('stockChartLight', () => fmp.stockChartLight(testSymbol, { from: testFromDate, to: testToDate }), validate.StockChartLightItemArraySchema) // oxfmt-ignore
		runTest('stockChartFull', () => fmp.stockChartFull(testSymbol, { from: testFromDate, to: testToDate }), validate.StockChartFullItemArraySchema) // oxfmt-ignore
		runTest('unadjustedStockChart', () => fmp.unadjustedStockChart(testSymbol, { from: testFromDate, to: testToDate }), validate.UnadjustedStockChartItemArraySchema) // oxfmt-ignore
		runTest('dividendAdjustedStockChart', () => fmp.dividendAdjustedStockChart(testSymbol, { from: testFromDate, to: testToDate }), validate.UnadjustedStockChartItemArraySchema) // oxfmt-ignore
		runTest('stockChart1Min', () => fmp.stockChart1Min(testSymbol, { from: testFromDate, to: testToDate }), validate.IntradayStockChartItemArraySchema) // oxfmt-ignore
		runTest('stockChart5Min', () => fmp.stockChart5Min(testSymbol, { from: testFromDate, to: testToDate }), validate.IntradayStockChartItemArraySchema) // oxfmt-ignore
		runTest('stockChart15Min', () => fmp.stockChart15Min(testSymbol, { from: testFromDate, to: testToDate }), validate.IntradayStockChartItemArraySchema) // oxfmt-ignore
		runTest('stockChart30Min', () => fmp.stockChart30Min(testSymbol, { from: testFromDate, to: testToDate }), validate.IntradayStockChartItemArraySchema) // oxfmt-ignore
		runTest('stockChart1Hour', () => fmp.stockChart1Hour(testSymbol, { from: testFromDate, to: testToDate }), validate.IntradayStockChartItemArraySchema) // oxfmt-ignore
		runTest('stockChart4Hour', () => fmp.stockChart4Hour(testSymbol, { from: testFromDate, to: testToDate }), validate.IntradayStockChartItemArraySchema) // oxfmt-ignore
	})

	// --- COMPANY TESTS ---
	describeIf(canRunTests, 'Company Endpoints', () => {
		runTest('companyProfile', () => fmp.companyProfile(testSymbol), validate.CompanyProfileArraySchema) // oxfmt-ignore
		runTest('companyProfileByCik', () => fmp.companyProfileByCik(testCIK), validate.CompanyProfileArraySchema) // oxfmt-ignore
		runTest('companyNotes', () => fmp.companyNotes(testSymbol), validate.CompanyNoteArraySchema) // oxfmt-ignore
		runTest('stockPeers', () => fmp.stockPeers(testSymbol), validate.StockPeerArraySchema) // oxfmt-ignore
		runTest('delistedCompanies', () => fmp.delistedCompanies({ page: testPage, limit: testLimit }), validate.DelistedCompanyArraySchema) // oxfmt-ignore
		runTest('companyEmployeeCount', () => fmp.companyEmployeeCount(testSymbol, { limit: testLimit }), validate.CompanyEmployeeCountArraySchema) // oxfmt-ignore
		runTest('historicalCompanyEmployeeCount', () => fmp.historicalCompanyEmployeeCount(testSymbol, { limit: testLimit }), validate.CompanyEmployeeCountArraySchema) // oxfmt-ignore
		runTest('companyMarketCap', () => fmp.companyMarketCap(testSymbol), validate.CompanyMarketCapArraySchema) // oxfmt-ignore
		runTest('batchMarketCap', () => fmp.batchMarketCap([testSymbol, testSymbolAlt]), validate.CompanyMarketCapArraySchema) // oxfmt-ignore
		runTest('historicalMarketCap', () => fmp.historicalMarketCap(testSymbol, { limit: testLimit, from: testFromDate, to: testToDate }), validate.CompanyMarketCapArraySchema) // oxfmt-ignore
		runTest('companySharesFloat', () => fmp.companySharesFloat(testSymbol), validate.CompanySharesFloatArraySchema) // oxfmt-ignore
		runTest('allSharesFloat', () => fmp.allSharesFloat({ page: testPage, limit: testLimit }), validate.CompanySharesFloatArraySchema) // oxfmt-ignore
		runTest('latestMergersAcquisitions', () => fmp.latestMergersAcquisitions({ page: testPage, limit: testLimit }), validate.MergerAcquisitionArraySchema) // oxfmt-ignore
		runTest('searchMergersAcquisitions', () => fmp.searchMergersAcquisitions(testName), validate.MergerAcquisitionArraySchema) // oxfmt-ignore
		runTest('companyExecutives', () => fmp.companyExecutives(testSymbol, { active: 'true' }), validate.CompanyExecutiveArraySchema) // oxfmt-ignore
		runTest('executiveCompensation', () => fmp.executiveCompensation(testSymbol), validate.ExecutiveCompensationArraySchema) // oxfmt-ignore
		runTest('executiveCompensationBenchmark', () => fmp.executiveCompensationBenchmark(testYear), validate.ExecutiveCompensationBenchmarkArraySchema) // oxfmt-ignore
	})

	// --- COMMITMENT OF TRADERS TESTS ---
	describeIf(canRunTests, 'Commitment Of Traders Endpoints', () => {
		// COT reports can be large, test with specific commodity symbol if possible
		runTest('cotReport', () => fmp.cotReport({ symbol: 'KC', from: testFromDate, to: testToDate }), validate.CotReportArraySchema) // oxfmt-ignore
		runTest('cotAnalysis', () => fmp.cotAnalysis({ symbol: 'B6', from: testFromDate, to: testToDate }), validate.CotAnalysisArraySchema) // oxfmt-ignore
		runTest('cotReportList', () => fmp.cotReportList(), validate.CotReportListItemArraySchema) // oxfmt-ignore
	})

	// --- DISCOUNTED CASH FLOW TESTS ---
	describeIf(canRunTests, 'Discounted Cash Flow Endpoints', () => {
		runTest('dcfValuation', () => fmp.dcfValuation(testSymbol), validate.DcfValuationArraySchema) // oxfmt-ignore
		runTest('leveredDcfValuation', () => fmp.leveredDcfValuation(testSymbol), validate.DcfValuationArraySchema) // oxfmt-ignore
		runTest('customDcfAdvanced', () => fmp.dcfAnalysis(testSymbol, { revenueGrowthPct: 0.1, ebitdaPct: 0.3 }), validate.CustomDcfAdvancedResultArraySchema) // oxfmt-ignore
		runTest('customDcfLevered', () => fmp.dcfLeveredAnalysis(testSymbol, { revenueGrowthPct: 0.1, operatingCashFlowPct: 0.28 }), validate.CustomDcfLeveredResultArraySchema) // oxfmt-ignore
	})

	// --- ECONOMICS TESTS ---
	describeIf(canRunTests, 'Economics Endpoints', () => {
		runTest('treasuryRates', () => fmp.treasuryRates({ from: testFromDate, to: testToDate }), validate.TreasuryRateArraySchema) // oxfmt-ignore
		runTest('economicIndicators', () => fmp.economicIndicators(testEconomicIndicatorName, { from: testFromDate, to: testToDate }), validate.EconomicIndicatorArraySchema) // oxfmt-ignore
		runTest('economicCalendar', () => fmp.economicCalendar({ from: testFromDate, to: testToDate }), validate.EconomicCalendarReleaseArraySchema) // oxfmt-ignore
		runTest('marketRiskPremium', () => fmp.marketRiskPremium(), validate.MarketRiskPremiumInfoArraySchema) // oxfmt-ignore
	})

	// --- ESG TESTS ---
	describeIf(canRunTests, 'ESG Endpoints', () => {
		runTest('esgDisclosures', () => fmp.esgDisclosures(testSymbol), validate.EsgDisclosureArraySchema) // oxfmt-ignore
		runTest('esgRatings', () => fmp.esgRatings(testSymbol), validate.EsgRatingArraySchema) // oxfmt-ignore
		runTest('esgBenchmark', () => fmp.esgBenchmark(testYear), validate.EsgBenchmarkArraySchema) // oxfmt-ignore
	})

	// --- ETF AND MUTUAL FUND TESTS ---
	describeIf(canRunTests, 'ETF & Mutual Fund Endpoints', () => {
		runTest('etfFundHoldings', () => fmp.etfFundHoldings(testEtf), validate.EtfFundHoldingArraySchema) // oxfmt-ignore
		runTest('etfFundInfo', () => fmp.etfFundInfo(testEtf), validate.EtfFundInfoArraySchema) // oxfmt-ignore
		runTest('etfFundCountryAllocation', () => fmp.etfFundCountryAllocation(testEtf), validate.EtfCountryWeightingArraySchema) // oxfmt-ignore
		runTest('etfAssetExposure', () => fmp.etfAssetExposure(testSymbol), validate.EtfAssetExposureItemArraySchema) // oxfmt-ignore
		runTest('etfSectorWeighting', () => fmp.etfSectorWeighting(testEtf), validate.EtfSectorWeightingArraySchema) // oxfmt-ignore
		runTest('mutualFundEtfLatestDisclosures', () => fmp.mutualFundEtfLatestDisclosures(testSymbol), validate.FundDisclosureHolderArraySchema) // oxfmt-ignore
		runTest('mutualFundDisclosures', () => fmp.mutualFundDisclosures(testEtf, { year: testYear, quarter: testQuarter }), validate.MutualFundDisclosureItemArraySchema) // oxfmt-ignore
		runTest('searchMutualFundEtfDisclosuresByName', () => fmp.searchMutualFundEtfDisclosuresByName('Vanguard'), validate.FundDisclosureNameSearchResultArraySchema) // oxfmt-ignore
		runTest('fundEtfDisclosuresByDate', () => fmp.fundEtfDisclosuresByDate(testEtf), validate.FundDisclosureDateArraySchema) // oxfmt-ignore
	})

	// --- COMMODITY TESTS ---
	describeIf(canRunTests, 'Commodity Endpoints', () => {
		runTest('commoditiesList', () => fmp.commoditiesList(), validate.CommodityListItemArraySchema) // oxfmt-ignore
		runTest('commodityQuote', () => fmp.commodityQuote(testCommodity), validate.CommodityQuoteArraySchema) // oxfmt-ignore
		runTest('commodityQuoteShort', () => fmp.commodityQuoteShort(testCommodity), validate.CommodityQuoteShortArraySchema) // oxfmt-ignore
		runTest('allCommoditiesQuotes (short)', () => fmp.allCommoditiesQuotes({ short: true }), validate.CommodityQuoteShortArraySchema) // oxfmt-ignore
		runTest('allCommoditiesQuotes (full)', () => fmp.allCommoditiesQuotes({ short: false }), validate.CommodityQuoteArraySchema) // oxfmt-ignore
		runTest('commodityChartLight', () => fmp.commodityChartLight(testCommodity, { from: testFromDate, to: testToDate }), validate.StockChartLightItemArraySchema) // oxfmt-ignore
		runTest('commodityChartFull', () => fmp.commodityChartFull(testCommodity, { from: testFromDate, to: testToDate }), validate.StockChartFullItemArraySchema) // oxfmt-ignore
		runTest('commodityChart1Min', () => fmp.commodityChart1Min(testCommodity, { from: testFromDate, to: testToDate }), validate.IntradayStockChartItemArraySchema) // oxfmt-ignore
		runTest('commodityChart5Min', () => fmp.commodityChart5Min(testCommodity, { from: testFromDate, to: testToDate }), validate.IntradayStockChartItemArraySchema) // oxfmt-ignore
		runTest('commodityChart1Hour', () => fmp.commodityChart1Hour(testCommodity, { from: testFromDate, to: testToDate }), validate.IntradayStockChartItemArraySchema) // oxfmt-ignore
	})

	// --- FUNDRAISERS TESTS ---
	describeIf(canRunTests, 'Fundraisers Endpoints', () => {
		runTest('latestCrowdfundingCampaigns', () => fmp.latestCrowdfundingCampaigns({ page: testPage, limit: testLimit }), validate.CrowdfundingCampaignArraySchema) // oxfmt-ignore
		runTest('searchCrowdfundingCampaigns', () => fmp.searchCrowdfundingCampaigns('Tech Startup'), validate.CrowdfundingCampaignSearchResultArraySchema) // oxfmt-ignore
		// getCrowdfundingCampaignsByCik requires a known CIK with crowdfunding
		runTest('latestEquityOfferingUpdates', () => fmp.latestEquityOfferingUpdates({ page: testPage, limit: testLimit }), validate.EquityOfferingUpdateArraySchema) // oxfmt-ignore
		runTest('searchEquityOfferings', () => fmp.searchEquityOfferings('Energy'), validate.EquityOfferingSearchResultArraySchema) // oxfmt-ignore
		// getEquityOfferingsByCik requires a known CIK with equity offerings
	})

	// --- CRYPTO TESTS ---
	describeIf(canRunTests, 'Crypto Endpoints', () => {
		runTest('cryptocurrencyList', () => fmp.cryptocurrencyList(), validate.CryptocurrencyListItemArraySchema) // oxfmt-ignore
		runTest('cryptocurrencyQuote', () => fmp.cryptocurrencyQuote(testCrypto), validate.CryptocurrencyQuoteArraySchema) // oxfmt-ignore
		runTest('cryptocurrencyQuoteShort', () => fmp.cryptocurrencyQuoteShort(testCrypto), validate.CryptocurrencyQuoteShortArraySchema) // oxfmt-ignore
		runTest('allCryptocurrenciesQuotes (short)', () => fmp.allCryptocurrenciesQuotes({ short: true }), validate.CryptocurrencyQuoteShortArraySchema) // oxfmt-ignore
		runTest('allCryptocurrenciesQuotes (full)', () => fmp.allCryptocurrenciesQuotes({ short: false }), validate.CryptocurrencyQuoteArraySchema) // oxfmt-ignore
		runTest('cryptocurrencyChartLight', () => fmp.cryptocurrencyChartLight(testCrypto, { from: testFromDate, to: testToDate }), validate.StockChartLightItemArraySchema) // oxfmt-ignore
		runTest('cryptocurrencyChartFull', () => fmp.cryptocurrencyChartFull(testCrypto, { from: testFromDate, to: testToDate }), validate.StockChartFullItemArraySchema) // oxfmt-ignore
		runTest('cryptocurrencyChart1Min', () => fmp.cryptocurrencyChart1Min(testCrypto, { from: testFromDate, to: testToDate }), validate.IntradayStockChartItemArraySchema) // oxfmt-ignore
		runTest('cryptocurrencyChart5Min', () => fmp.cryptocurrencyChart5Min(testCrypto, { from: testFromDate, to: testToDate }), validate.IntradayStockChartItemArraySchema) // oxfmt-ignore
		runTest('cryptocurrencyChart1Hour', () => fmp.cryptocurrencyChart1Hour(testCrypto, { from: testFromDate, to: testToDate }), validate.IntradayStockChartItemArraySchema) // oxfmt-ignore
	})

	// --- FOREX TESTS ---
	describeIf(canRunTests, 'Forex Endpoints', () => {
		runTest('forexList', () => fmp.forexList(), validate.ForexPairArraySchema) // oxfmt-ignore
		runTest('forexQuote', () => fmp.forexQuote(testForex), validate.ForexQuoteArraySchema) // oxfmt-ignore
		runTest('forexQuoteShort', () => fmp.forexQuoteShort(testForex), validate.ForexQuoteShortArraySchema) // oxfmt-ignore
		runTest('allForexQuotes (short)', () => fmp.allForexQuotes({ short: true }), validate.ForexQuoteShortArraySchema) // oxfmt-ignore
		runTest('allForexQuotes (full)', () => fmp.allForexQuotes({ short: false }), validate.ForexQuoteArraySchema) // oxfmt-ignore
		runTest('forexChartLight', () => fmp.forexChartLight(testForex, { from: testFromDate, to: testToDate }), validate.StockChartLightItemArraySchema) // oxfmt-ignore
		runTest('forexChartFull', () => fmp.forexChartFull(testForex, { from: testFromDate, to: testToDate }), validate.StockChartFullItemArraySchema) // oxfmt-ignore
		runTest('forexChart1Min', () => fmp.forexChart1Min(testForex, { from: testFromDate, to: testToDate }), validate.IntradayStockChartItemArraySchema) // oxfmt-ignore
		runTest('forexChart5Min', () => fmp.forexChart5Min(testForex, { from: testFromDate, to: testToDate }), validate.IntradayStockChartItemArraySchema) // oxfmt-ignore
		runTest('forexChart1Hour', () => fmp.forexChart1Hour(testForex, { from: testFromDate, to: testToDate }), validate.IntradayStockChartItemArraySchema) // oxfmt-ignore
	})

	// --- STATEMENTS TESTS ---
	describeIf(canRunTests, 'Statements Endpoints', () => {
		runTest('incomeStatement', () => fmp.incomeStatement(testSymbol, { limit: testLimit, period: testFinancialPeriodFY }), validate.IncomeStatementArraySchema) // oxfmt-ignore
		runTest('balanceSheetStatement', () => fmp.balanceSheetStatement(testSymbol, { limit: testLimit, period: testFinancialPeriodFY }), validate.BalanceSheetStatementArraySchema) // oxfmt-ignore
		runTest('cashFlowStatement', () => fmp.cashFlowStatement(testSymbol, { limit: testLimit, period: testFinancialPeriodFY }), validate.CashFlowStatementArraySchema) // oxfmt-ignore
		runTest('latestFinancialStatements', () => fmp.latestFinancialStatements({ page: testPage, limit: testLimit }), validate.LatestFinancialStatementMetaArraySchema) // oxfmt-ignore
		runTest('incomeStatementTtm', () => fmp.incomeStatementTtm(testSymbol, { limit: testLimit }), validate.IncomeStatementArraySchema) // oxfmt-ignore
		runTest('balanceSheetStatementTtm', () => fmp.balanceSheetStatementTtm(testSymbol, { limit: testLimit }), validate.BalanceSheetStatementArraySchema) // oxfmt-ignore
		runTest('cashFlowStatementTtm', () => fmp.cashFlowStatementTtm(testSymbol, { limit: testLimit }), validate.CashFlowStatementArraySchema) // oxfmt-ignore
		runTest('keyMetrics', () => fmp.keyMetrics(testSymbol, { limit: testLimit, period: testFinancialPeriodFY }), validate.KeyMetricsArraySchema) // oxfmt-ignore
		runTest('financialRatios', () => fmp.financialRatios(testSymbol, { limit: testLimit, period: testFinancialPeriodFY }), validate.FinancialRatiosArraySchema) // oxfmt-ignore
		runTest('keyMetricsTtm', () => fmp.keyMetricsTtm(testSymbol), validate.KeyMetricsTTMArraySchema) // oxfmt-ignore
		runTest('financialRatiosTtm', () => fmp.financialRatiosTtm(testSymbol), validate.FinancialRatiosTTMArraySchema) // oxfmt-ignore
		runTest('financialScores', () => fmp.financialScores(testSymbol), validate.FinancialScoresArraySchema) // oxfmt-ignore
		runTest('ownerEarnings', () => fmp.ownerEarnings(testSymbol, { limit: testLimit }), validate.OwnerEarningsArraySchema) // oxfmt-ignore
		runTest('enterpriseValues', () => fmp.enterpriseValues(testSymbol, { limit: testLimit, period: testFinancialPeriodFY }), validate.EnterpriseValueArraySchema) // oxfmt-ignore
		runTest('incomeStatementGrowth', () => fmp.incomeStatementGrowth(testSymbol, { limit: testLimit, period: testFinancialPeriodFY }), validate.IncomeStatementGrowthArraySchema) // oxfmt-ignore
		runTest('balanceSheetStatementGrowth', () => fmp.balanceSheetStatementGrowth(testSymbol, { limit: testLimit, period: testFinancialPeriodFY }), validate.BalanceSheetStatementGrowthArraySchema) // oxfmt-ignore
		runTest('cashFlowStatementGrowth', () => fmp.cashFlowStatementGrowth(testSymbol, { limit: testLimit, period: testFinancialPeriodFY }), validate.CashFlowStatementGrowthArraySchema) // oxfmt-ignore
		runTest('financialStatementGrowth', () => fmp.financialStatementGrowth(testSymbol, { limit: testLimit, period: testFinancialPeriodFY }), validate.FinancialStatementGrowthArraySchema) // oxfmt-ignore
		runTest('financialReportsDates', () => fmp.financialReportsDates(testSymbol), validate.FinancialReportDateLinksArraySchema) // oxfmt-ignore
		// runTest('financialReportJson', () => fmp.financialReportJson(testSymbol, { year: Number.parseInt(testYear), period: testFinancialPeriodFY }), validate.FinancialReportFullJsonArraySchema)
		// runTest('financialReportXlsx', () => fmp.financialReportXlsx(testSymbol, { year: Number.parseInt(testYear), period: testFinancialPeriodFY }), validate.FinancialReportFullJsonArraySchema) // Response is plain text
		runTest('revenueProductSegmentation', () => fmp.revenueProductSegmentation(testSymbol, { period: testPeriodAnnual }), validate.RevenueSegmentationArraySchema) // oxfmt-ignore
		runTest('revenueGeographicSegmentation', () => fmp.revenueGeographicSegmentation(testSymbol, { period: testPeriodAnnual }), validate.RevenueSegmentationArraySchema) // oxfmt-ignore
		runTest('asReportedIncomeStatements', () => fmp.asReportedIncomeStatements(testSymbol, { limit: testLimit, period: testPeriodAnnual }), validate.AsReportedFinancialStatementArraySchema) // oxfmt-ignore
		runTest('asReportedBalanceStatements', () => fmp.asReportedBalanceStatements(testSymbol, { limit: testLimit, period: testPeriodAnnual }), validate.AsReportedFinancialStatementArraySchema) // oxfmt-ignore
		runTest('asReportedCashFlowStatements', () => fmp.asReportedCashFlowStatements(testSymbol, { limit: testLimit, period: testPeriodAnnual }), validate.AsReportedFinancialStatementArraySchema) // oxfmt-ignore
		runTest('fullAsReportedFinancialStatements', () => fmp.fullAsReportedFinancialStatements(testSymbol, { limit: testLimit, period: testPeriodAnnual }), validate.FullAsReportedFinancialStatementArraySchema) // oxfmt-ignore
	})

	// --- FORM 13F TESTS ---
	describeIf(canRunTests, 'Form 13F Endpoints', () => {
		runTest('latestInstitutionalOwnershipFilings', () => fmp.latestInstitutionalOwnershipFilings({ page: testPage, limit: testLimit }), validate.InstitutionalOwnershipFilingArraySchema) // oxfmt-ignore
		runTest('secFilingsExtract', () => fmp.secFilingsExtract({ cik: testHolderCik, year: testYear, quarter: testQuarter }), validate.SecFilingExtractArraySchema) // oxfmt-ignore
		runTest('form13FFilingDates', () => fmp.form13FFilingDates(testHolderCik), validate.Form13FFilingDateArraySchema) // oxfmt-ignore
		runTest('filingsExtractAnalyticsByHolder', () => fmp.filingsExtractAnalyticsByHolder({ symbol: testSymbol, year: testYear, quarter: testQuarter, page: testPage, limit: testLimit }), validate.HolderAnalyticsArraySchema) // oxfmt-ignore
		runTest('holderPerformanceSummary', () => fmp.holderPerformanceSummary({ cik: testHolderCik, page: testPage }), validate.HolderPerformanceSummaryArraySchema) // oxfmt-ignore
		runTest('holdersIndustryBreakdown', () => fmp.holdersIndustryBreakdown({ cik: testHolderCik, year: testYear, quarter: testQuarter }), validate.HolderIndustryBreakdownArraySchema) // oxfmt-ignore
		runTest('positionsSummary', () => fmp.positionsSummary({ symbol: testSymbol, year: testYear, quarter: testQuarter }), validate.SymbolPositionSummaryArraySchema) // oxfmt-ignore
		runTest('industryPerformanceSummary', () => fmp.industryPerformanceSummary({ year: testYear, quarter: testQuarter }), validate.IndustryPerformanceSummaryArraySchema) // oxfmt-ignore
	})

	// --- INDEXES (already covered, but can add specific index constituent tests if needed) ---

	// --- INSIDER TRADES TESTS ---
	describeIf(canRunTests, 'Insider Trades Endpoints', () => {
		runTest('latestInsiderTrades', () => fmp.latestInsiderTrades({ page: testPage, limit: testLimit }), validate.InsiderTradeArraySchema) // oxfmt-ignore
		runTest('searchInsiderTrades', () => fmp.searchInsiderTrades({ symbol: testSymbol, limit: testLimit, page: testPage }), validate.InsiderTradeArraySchema) // oxfmt-ignore
		runTest('searchInsiderTradesByReportingName', () => fmp.searchInsiderTradesByReportingName('Cook'), validate.InsiderReportingNameArraySchema) // oxfmt-ignore
		runTest('allInsiderTransactionTypes', () => fmp.allInsiderTransactionTypes(), validate.InsiderTransactionTypeArraySchema) // oxfmt-ignore
		runTest('insiderTradeStatistics', () => fmp.insiderTradeStatistics(testSymbol), validate.InsiderTradeStatisticsArraySchema) // oxfmt-ignore
		runTest('acquisitionOwnership', () => fmp.acquisitionOwnership(testSymbol, { limit: testLimit }), validate.AcquisitionOwnershipArraySchema) // oxfmt-ignore
	})

	// --- MARKET PERFORMANCE TESTS ---
	describeIf(canRunTests, 'Market Performance Endpoints', () => {
		runTest('marketSectorPerformanceSnapshot', () => fmp.marketSectorPerformanceSnapshot({ date: testRecentDate, exchange: testExchange }), validate.MarketSectorPerformanceArraySchema) // oxfmt-ignore
		runTest('marketIndustryPerformanceSnapshot', () => fmp.marketIndustryPerformanceSnapshot({ date: testRecentDate, exchange: testExchange, industry: testIndustry }), validate.MarketIndustryPerformanceArraySchema) // oxfmt-ignore
		runTest('historicalMarketSectorPerformance', () => fmp.historicalMarketSectorPerformance(testSector, { from: testFromDate, to: testToDate, exchange: testExchange }), validate.MarketSectorPerformanceArraySchema) // oxfmt-ignore
		runTest('historicalMarketIndustryPerformance', () => fmp.historicalMarketIndustryPerformance(testIndustry, { from: testFromDate, to: testToDate, exchange: testExchange }), validate.MarketIndustryPerformanceArraySchema) // oxfmt-ignore
		runTest('marketSectorPESnapshot', () => fmp.marketSectorPESnapshot({ date: testRecentDate, exchange: testExchange }), validate.MarketSectorPEArraySchema) // oxfmt-ignore
		runTest('marketIndustryPESnapshot', () => fmp.marketIndustryPESnapshot({ date: testRecentDate, exchange: testExchange, industry: testIndustry }), validate.MarketIndustryPEArraySchema) // oxfmt-ignore
		runTest('historicalMarketSectorPE', () => fmp.historicalMarketSectorPE(testSector, { from: testFromDate, to: testToDate, exchange: testExchange }), validate.MarketSectorPEArraySchema) // oxfmt-ignore
		runTest('historicalMarketIndustryPE', () => fmp.historicalMarketIndustryPE(testIndustry, { from: testFromDate, to: testToDate, exchange: testExchange }), validate.MarketIndustryPEArraySchema) // oxfmt-ignore
		runTest('biggestStockGainers', () => fmp.biggestStockGainers(), validate.MarketMoverArraySchema) // oxfmt-ignore
		runTest('biggestStockLosers', () => fmp.biggestStockLosers(), validate.MarketMoverArraySchema) // oxfmt-ignore
		runTest('topTradedStocks', () => fmp.topTradedStocks(), validate.MarketMoverArraySchema) // oxfmt-ignore
	})

	// --- MARKET HOURS TESTS ---
	describeIf(canRunTests, 'Market Hours Endpoints', () => {
		runTest('exchangeMarketHours', () => fmp.exchangeMarketHours(testExchange), validate.ExchangeMarketHoursArraySchema) // oxfmt-ignore
		runTest('allExchangeMarketHours', () => fmp.allExchangeMarketHours(), validate.ExchangeMarketHoursArraySchema) // oxfmt-ignore
	})

	// --- NEWS TESTS ---
	describeIf(canRunTests, 'News Endpoints', () => {
		runTest('fmpArticles', () => fmp.fmpArticles({ page: testPage, limit: testLimit }), validate.FmpArticleArraySchema) // oxfmt-ignore
		runTest('generalNews', () => fmp.generalNews({ page: testPage, limit: testLimit, from: testFromDate, to: testToDate }), validate.GeneralNewsArticleArraySchema) // oxfmt-ignore
		runTest('pressReleases', () => fmp.pressReleases({ page: testPage, limit: testLimit, from: testFromDate, to: testToDate }), validate.GeneralNewsArticleArraySchema) // oxfmt-ignore
		runTest('stockNews', () => fmp.stockNews({ page: testPage, limit: testLimit, from: testFromDate, to: testToDate }), validate.GeneralNewsArticleArraySchema) // oxfmt-ignore
		runTest('cryptoNews', () => fmp.cryptoNews({ page: testPage, limit: testLimit, from: testFromDate, to: testToDate }), validate.GeneralNewsArticleArraySchema) // oxfmt-ignore
		runTest('forexNews', () => fmp.forexNews({ page: testPage, limit: testLimit, from: testFromDate, to: testToDate }), validate.GeneralNewsArticleArraySchema) // oxfmt-ignore
		runTest('searchPressReleases', () => fmp.searchPressReleases({ symbols: testSymbol, page: testPage, limit: testLimit, from: testFromDate, to: testToDate }), validate.GeneralNewsArticleArraySchema) // oxfmt-ignore
		runTest('searchStockNews', () => fmp.searchStockNews({ symbols: testSymbol, page: testPage, limit: testLimit, from: testFromDate, to: testToDate }), validate.GeneralNewsArticleArraySchema) // oxfmt-ignore
		runTest('searchCryptoNews', () => fmp.searchCryptoNews({ symbols: testCrypto, page: testPage, limit: testLimit, from: testFromDate, to: testToDate }), validate.GeneralNewsArticleArraySchema) // oxfmt-ignore
		runTest('searchForexNews', () => fmp.searchForexNews({ symbols: testForex, page: testPage, limit: testLimit, from: testFromDate, to: testToDate }), validate.GeneralNewsArticleArraySchema) // oxfmt-ignore
	})

	// --- TECHNICAL INDICATORS TESTS ---
	describeIf(canRunTests, 'Technical Indicators Endpoints', () => {
		runTest('simpleMovingAverage', () => fmp.simpleMovingAverage(testSymbol, { periodLength: testIndicatorPeriodLength, timeframe: testIndicatorTimeframe, from: testFromDate, to: testToDate }), validate.SmaPointArraySchema) // oxfmt-ignore
		runTest('exponentialMovingAverage', () => fmp.exponentialMovingAverage(testSymbol, { periodLength: testIndicatorPeriodLength, timeframe: testIndicatorTimeframe, from: testFromDate, to: testToDate }), validate.EmaPointArraySchema) // oxfmt-ignore
		runTest('weightedMovingAverage', () => fmp.weightedMovingAverage(testSymbol, { periodLength: testIndicatorPeriodLength, timeframe: testIndicatorTimeframe, from: testFromDate, to: testToDate }), validate.WmaPointArraySchema) // oxfmt-ignore
		runTest('doubleExponentialMovingAverage', () => fmp.doubleExponentialMovingAverage(testSymbol, { periodLength: testIndicatorPeriodLength, timeframe: testIndicatorTimeframe, from: testFromDate, to: testToDate }), validate.DemaPointArraySchema) // oxfmt-ignore
		runTest('tripleExponentialMovingAverage', () => fmp.tripleExponentialMovingAverage(testSymbol, { periodLength: testIndicatorPeriodLength, timeframe: testIndicatorTimeframe, from: testFromDate, to: testToDate }), validate.TemaPointArraySchema) // oxfmt-ignore
		runTest('relativeStrengthIndex', () => fmp.relativeStrengthIndex(testSymbol, { periodLength: testIndicatorPeriodLength, timeframe: testIndicatorTimeframe, from: testFromDate, to: testToDate }), validate.RsiPointArraySchema) // oxfmt-ignore
		runTest('standardDeviation', () => fmp.standardDeviation(testSymbol, { periodLength: testIndicatorPeriodLength, timeframe: testIndicatorTimeframe, from: testFromDate, to: testToDate }), validate.StandardDeviationPointArraySchema) // oxfmt-ignore
		runTest('williamsPercentR', () => fmp.williamsPercentR(testSymbol, { periodLength: testIndicatorPeriodLength, timeframe: testIndicatorTimeframe, from: testFromDate, to: testToDate }), validate.WilliamsPointArraySchema) // oxfmt-ignore
		runTest('averageDirectionalIndex', () => fmp.averageDirectionalIndex(testSymbol, { periodLength: testIndicatorPeriodLength, timeframe: testIndicatorTimeframe, from: testFromDate, to: testToDate }), validate.AdxPointArraySchema) // oxfmt-ignore
	})

	// --- QUOTE TESTS ---
	describeIf(canRunTests, 'Quote Endpoints', () => {
		runTest('stockQuote', () => fmp.stockQuote(testSymbol), validate.StockQuoteArraySchema) // oxfmt-ignore
		runTest('stockQuoteShort', () => fmp.stockQuoteShort(testSymbol), validate.StockQuoteShortArraySchema) // oxfmt-ignore
		runTest('aftermarketTrade', () => fmp.aftermarketTrade(testSymbol), validate.AftermarketTradeArraySchema) // oxfmt-ignore
		runTest('aftermarketQuote', () => fmp.aftermarketQuote(testSymbol), validate.AftermarketQuoteArraySchema) // oxfmt-ignore
		runTest('stockPriceChange', () => fmp.stockPriceChange(testSymbol), validate.StockPriceChangeArraySchema) // oxfmt-ignore
		runTest('stockBatchQuote', () => fmp.stockBatchQuote([testSymbol, testSymbolAlt]), validate.StockQuoteArraySchema) // oxfmt-ignore
		runTest('stockBatchQuoteShort', () => fmp.stockBatchQuoteShort([testSymbol, testSymbolAlt]), validate.StockQuoteShortArraySchema) // oxfmt-ignore
		runTest('batchAftermarketTrade', () => fmp.batchAftermarketTrade([testSymbol, testSymbolAlt]), validate.AftermarketTradeArraySchema) // oxfmt-ignore
		runTest('batchAftermarketQuote', () => fmp.batchAftermarketQuote([testSymbol, testSymbolAlt]), validate.AftermarketQuoteArraySchema) // oxfmt-ignore
		runTest('exchangeStockQuotes (short)', () => fmp.exchangeStockQuotes(testExchange, { short: true }), validate.StockQuoteShortArraySchema) // oxfmt-ignore
		runTest('exchangeStockQuotes (full)', () => fmp.exchangeStockQuotes(testExchange, { short: false }), validate.StockQuoteArraySchema) // oxfmt-ignore
		runTest('mutualFundQuotes (short)', () => fmp.mutualFundQuotes({ short: true }), validate.StockQuoteShortArraySchema) // oxfmt-ignore
		runTest('mutualFundQuotes (full)', () => fmp.mutualFundQuotes({ short: false }), validate.StockQuoteArraySchema) // oxfmt-ignore
		runTest('etfQuotes (short)', () => fmp.etfQuotes({ short: true }), validate.StockQuoteShortArraySchema) // oxfmt-ignore
		runTest('etfQuotes (full)', () => fmp.etfQuotes({ short: false }), validate.StockQuoteArraySchema) // oxfmt-ignore
	})

	// --- EARNINGS TRANSCRIPT TESTS ---
	describeIf(canRunTests, 'Earnings Transcript Endpoints', () => {
		runTest('latestEarningTranscripts', () => fmp.latestEarningTranscripts({ page: testPage, limit: testLimit }), validate.LatestEarningsTranscriptMetaArraySchema) // oxfmt-ignore
		runTest('earningsTranscript', () => fmp.earningsTranscript(testSymbol, { year: '2020', quarter: '3', limit: 1 }), validate.EarningsTranscriptArraySchema) // oxfmt-ignore
		runTest('earningsTranscriptDatesBySymbol', () => fmp.earningsTranscriptDatesBySymbol(testSymbol), validate.EarningsTranscriptDateArraySchema) // oxfmt-ignore
		runTest('earningsTranscriptList', () => fmp.earningsTranscriptList(), validate.EarningsTranscriptListItemArraySchema) // oxfmt-ignore
	})

	// --- SEC FILINGS TESTS ---
	describeIf(canRunTests, 'SEC Filings Endpoints', () => {
		runTest('latest8kSecFilings', () => fmp.latest8kSecFilings({ from: testFromDate, to: testToDate, page: testPage, limit: testLimit }), validate.SecFilingArraySchema) // oxfmt-ignore
		runTest('latestSecFilingsWithFinancials', () => fmp.latestSecFilingsWithFinancials({ from: testFromDate, to: testToDate, page: testPage, limit: testLimit }), validate.SecFilingArraySchema) // oxfmt-ignore
		runTest('searchSecFilingsByFormType', () => fmp.searchSecFilingsByFormType({ formType: testFormType, from: testFromDate, to: testToDate, page: testPage, limit: testLimit }), validate.SecFilingArraySchema) // oxfmt-ignore
		runTest('searchSecFilingsBySymbol', () => fmp.searchSecFilingsBySymbol({ symbol: testSymbol, from: testFromDate, to: testToDate, page: testPage }), validate.SecFilingArraySchema) // oxfmt-ignore
		runTest('searchSecFilingsByCik', () => fmp.searchSecFilingsByCik({ cik: testCIK, from: testFromDate, to: testToDate, page: testPage, limit: testLimit }), validate.SecFilingArraySchema) // oxfmt-ignore
		runTest('searchSecFilingsCompanyName', () => fmp.searchSecFilingsCompanyName(testCompanyName), validate.SecCompanySearchResultArraySchema) // oxfmt-ignore
		runTest('searchSecFilingsCompanyBySymbol', () => fmp.searchSecFilingsCompanyBySymbol(testSymbol), validate.SecCompanySearchResultArraySchema) // oxfmt-ignore
		runTest('searchSecFilingsCompanyByCik', () => fmp.searchSecFilingsCompanyByCik(testCIK), validate.SecCompanySearchResultArraySchema) // oxfmt-ignore
		runTest('secCompanyFullProfile (by symbol)', () => fmp.secCompanyFullProfile({ symbol: testSymbol }), validate.SecCompanyFullProfileArraySchema) // oxfmt-ignore
		runTest('secCompanyFullProfile (by CIK)', () => fmp.secCompanyFullProfile({ cik: testCIK }), validate.SecCompanyFullProfileArraySchema) // oxfmt-ignore
		runTest('industryClassificationList (by title)', () => fmp.industryClassificationList({ industryTitle: 'SERVICES' }), validate.SicListItemArraySchema) // oxfmt-ignore
		runTest('industryClassificationList (by SIC)', () => fmp.industryClassificationList({ sicCode: '7371' }), validate.SicListItemArraySchema) // oxfmt-ignore
		runTest('searchIndustryClassification (by symbol)', () => fmp.searchIndustryClassification({ symbol: testSymbol }), validate.IndustryClassificationSearchResultArraySchema) // oxfmt-ignore
		runTest('allIndustryClassification', () => fmp.allIndustryClassification({ page: testPage, limit: testLimit }), validate.IndustryClassificationSearchResultArraySchema) // oxfmt-ignore
	})

	// --- SENATE & HOUSE TRADING TESTS ---
	describeIf(canRunTests, 'Senate & House Trading Endpoints', () => {
		runTest('latestSenateFinancialDisclosures', () => fmp.latestSenateFinancialDisclosures({ page: testPage, limit: testLimit }), validate.CongressionalDisclosureArraySchema) // oxfmt-ignore
		runTest('latestHouseFinancialDisclosures', () => fmp.latestHouseFinancialDisclosures({ page: testPage, limit: testLimit }), validate.CongressionalDisclosureArraySchema) // oxfmt-ignore
		runTest('senateTradingActivity', () => fmp.senateTradingActivity(testSymbol), validate.CongressionalDisclosureArraySchema) // oxfmt-ignore
		runTest('senateTradesByName', () => fmp.senateTradesByName(testSenatorName), validate.CongressionalDisclosureArraySchema) // oxfmt-ignore
		runTest('houseTrades', () => fmp.houseTrades(testSymbol), validate.CongressionalDisclosureArraySchema) // oxfmt-ignore
		runTest('houseTradesByName', () => fmp.houseTradesByName(testHouseRepName), validate.CongressionalDisclosureArraySchema) // oxfmt-ignore
	})

	// --- BULK DATA TESTS ---
	// These can be very large and slow; enable with caution or use specific small parts/dates.
	describeIf(false, 'Bulk Data Endpoints', () => {
		runTest('bulkCompanyProfile', () => fmp.bulkCompanyProfile(testBulkPart), validate.CompanyProfileArraySchema) // oxfmt-ignore
		runTest('bulkStockRating', () => fmp.bulkStockRating(), validate.BulkStockRatingArraySchema) // oxfmt-ignore
		runTest('bulkDcfValuations', () => fmp.bulkDcfValuations(), validate.BulkDcfValuationArraySchema) // oxfmt-ignore
		runTest('bulkFinancialScores', () => fmp.bulkFinancialScores(), validate.FinancialScoresArraySchema) // oxfmt-ignore
		runTest('bulkPriceTargetSummary', () => fmp.bulkPriceTargetSummary(), validate.BulkPriceTargetSummaryArraySchema) // oxfmt-ignore
		runTest('bulkEtfHolder', () => fmp.bulkEtfHolder('1'), validate.EtfFundHoldingArraySchema) // Part 1 as example // oxfmt-ignore
		runTest('bulkUpgradesDowngradesConsensus', () => fmp.bulkUpgradesDowngradesConsensus(), validate.StockGradeConsensusArraySchema) // oxfmt-ignore
		runTest('bulkKeyMetricsTtm', () => fmp.bulkKeyMetricsTtm(), validate.KeyMetricsTTMArraySchema) // oxfmt-ignore
		runTest('bulkRatiosTtm', () => fmp.bulkRatiosTtm(), validate.FinancialRatiosTTMArraySchema) // oxfmt-ignore
		runTest('bulkStockPeers', () => fmp.bulkStockPeers(), validate.BulkStockPeersArraySchema) // oxfmt-ignore
		runTest('bulkEarningsSurprises', () => fmp.bulkEarningsSurprises(testYear), validate.BulkEarningsSurpriseArraySchema) // oxfmt-ignore
		runTest('bulkIncomeStatement', () => fmp.bulkIncomeStatement({ year: testYear, period: testFinancialPeriodFY }), validate.IncomeStatementArraySchema) // oxfmt-ignore
		runTest('bulkIncomeStatementGrowth', () => fmp.bulkIncomeStatementGrowth({ year: testYear, period: testFinancialPeriodFY }), validate.IncomeStatementGrowthArraySchema) // oxfmt-ignore
		runTest('bulkBalanceSheetStatement', () => fmp.bulkBalanceSheetStatement({ year: testYear, period: testFinancialPeriodFY }), validate.BalanceSheetStatementArraySchema) // oxfmt-ignore
		runTest('bulkBalanceSheetStatementGrowth', () => fmp.bulkBalanceSheetStatementGrowth({ year: testYear, period: testFinancialPeriodFY }), validate.BalanceSheetStatementGrowthArraySchema) // oxfmt-ignore
		runTest('bulkCashFlowStatement', () => fmp.bulkCashFlowStatement({ year: testYear, period: testFinancialPeriodFY }), validate.CashFlowStatementArraySchema) // oxfmt-ignore
		runTest('bulkCashFlowStatementGrowth', () => fmp.bulkCashFlowStatementGrowth({ year: testYear, period: testFinancialPeriodFY }), validate.CashFlowStatementGrowthArraySchema) // oxfmt-ignore
		runTest('bulkEod', () => fmp.bulkEod(testRecentDate), validate.EodBulkItemArraySchema) // oxfmt-ignore
	})
})
