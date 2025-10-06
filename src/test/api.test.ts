import type { z } from 'zod'
import type * as FMPTypes from '../types'
import * as fmp from '../api'
import * as validate from './validate'

const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))
const THROTTLE_MS = 10

const API_KEY = process.env.FMP_KEY
const canRunTests = !!API_KEY

// --- Test Variables ---
const testSymbol = 'AAPL'
const testSymbolAlt = 'MSFT'
const testEtf = 'SPY'
const testIndex = '^GSPC'
const testForex = 'EURUSD'
const testCrypto = 'BTCUSD'
const testCommodity = 'GCUSD' // Gold
const testCIK = '0000320193' // Apple's CIK
const testCUSIP = '037833100'
const testISIN = 'US0378331005'
const testName = 'Apple'
const testExchange = 'NASDAQ'
const testDate = '2023-10-27' // A fixed past date for consistency
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

describe('fMP API Wrapper Tests', () => {
	beforeAll(() => {
		if (!canRunTests) {
			console.warn('FMP_KEY not found in environment variables. Skipping API tests.')
		}
	})

	const describeIf = (condition: boolean, title: string, fn: () => void) => {
		condition ? describe(title, fn) : describe.skip(title, fn)
	}

	async function runTest(
		description: string,
		apiCall: () => Promise<any>,
		zodSchema: z.ZodSchema<any>,
		allowEmptyArray = true, // Many FMP endpoints return [] if no data
	) {
		it(description, async () => {
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
					console.error(`Zod validation failed for "${description}":`, JSON.stringify(parseResult.error.issues, null, 2))
					// console.error("Received data:", JSON.stringify(response, null, 2));
				}
				expect(parseResult.success, `Zod validation failed for ${description}`).toBe(true)
			}
			catch (error: any) {
				let errorMessage = `Error during test "${description}": ${error.message}`
				if (error.response && typeof error.response.text === 'function') {
					try {
						const errorBodyText = await error.response.text()
						errorMessage += `\nResponse Body: ${errorBodyText}`
					}
					catch (e) {
						errorMessage += '\nFailed to parse error response body.'
					}
				}
				console.error(errorMessage)
				throw error
			}
		}, 20000) // Increased timeout for API calls
	}

	// --- SEARCH TESTS ---
	describeIf(canRunTests, 'Search Endpoints', () => {
		runTest('searchSymbol', () => fmp.searchSymbol(testName, { limit: testLimit, exchange: testExchange }), validate.SymbolSearchResultArraySchema)
		runTest('searchName', () => fmp.searchName(testName, { limit: testLimit, exchange: testExchange }), validate.NameSearchResultArraySchema)
		runTest('searchCik', () => fmp.searchCik(testCIK, { limit: testLimit }), validate.CikSearchResultArraySchema)
		runTest('searchCusip', () => fmp.searchCusip(testCUSIP), validate.CusipSearchResultArraySchema)
		runTest('searchIsin', () => fmp.searchIsin(testISIN), validate.IsinSearchResultArraySchema)
		runTest('stockScreener', () => fmp.stockScreener({ marketCapMoreThan: 100000000000, sector: testSector, limit: testLimit }), validate.StockScreenerResultArraySchema)
		runTest('searchExchangeVariants', () => fmp.searchExchangeVariants(testSymbol), validate.ExchangeVariantArraySchema)
	})

	// --- DIRECTORY TESTS ---
	describeIf(canRunTests, 'Directory Endpoints', () => {
		runTest('listCompanySymbols', () => fmp.listCompanySymbols(), validate.CompanySymbolArraySchema)
		runTest('listFinancialStatementSymbols', () => fmp.listFinancialStatementSymbols(), validate.FinancialStatementSymbolArraySchema)
		runTest('listCik', () => fmp.listCik({ limit: testLimit }), validate.CikListItemArraySchema)
		runTest('listSymbolChanges', () => fmp.listSymbolChanges({ limit: testLimit }), validate.SymbolChangeArraySchema)
		runTest('listEtfSymbol', () => fmp.listEtfSymbol(), validate.EtfSymbolArraySchema)
		runTest('listActivelyTrading', () => fmp.listActivelyTrading(), validate.ActivelyTradingItemArraySchema)
		runTest('listAvailableExchanges', () => fmp.listAvailableExchanges(), validate.AvailableExchangeArraySchema)
		runTest('listAvailableSectors', () => fmp.listAvailableSectors(), validate.AvailableSectorArraySchema)
		runTest('listAvailableIndustries', () => fmp.listAvailableIndustries(), validate.AvailableIndustryArraySchema)
		runTest('listAvailableCountries', () => fmp.listAvailableCountries(), validate.AvailableCountryArraySchema)
	})

	// --- ANALYST TESTS ---
	describeIf(canRunTests, 'Analyst Endpoints', () => {
		runTest('financialEstimates (annual)', () => fmp.financialEstimates(testSymbol, { period: testPeriodAnnual, limit: testLimit }), validate.FinancialEstimateArraySchema)
		runTest('financialEstimates (quarter)', () => fmp.financialEstimates(testSymbol, { period: testPeriodQuarter, limit: testLimit }), validate.FinancialEstimateArraySchema)
		runTest('ratingsSnapshot', () => fmp.ratingsSnapshot(testSymbol, { limit: 1 }), validate.RatingSnapshotArraySchema)
		runTest('historicalRatings', () => fmp.historicalRatings(testSymbol, { limit: testLimit }), validate.HistoricalRatingArraySchema)
		runTest('priceTargetSummary', () => fmp.priceTargetSummary(testSymbol), validate.PriceTargetSummaryArraySchema)
		runTest('priceTargetConsensus', () => fmp.priceTargetConsensus(testSymbol), validate.PriceTargetConsensusArraySchema)
		runTest('priceTargetNews', () => fmp.priceTargetNews(testSymbol, { limit: testLimit, page: testPage }), validate.PriceTargetNewsItemArraySchema)
		runTest('latestPriceTargetNews', () => fmp.latestPriceTargetNews({ limit: testLimit, page: testPage }), validate.PriceTargetNewsItemArraySchema)
		runTest('stockGrades', () => fmp.stockGrades(testSymbol), validate.StockGradeArraySchema)
		runTest('historicalStockGrades', () => fmp.historicalStockGrades(testSymbol, { limit: testLimit }), validate.HistoricalStockGradeSummaryArraySchema)
		runTest('stockGradeConsensus', () => fmp.stockGradeConsensus(testSymbol), validate.StockGradeConsensusArraySchema)
		runTest('stockGradeNews', () => fmp.stockGradeNews(testSymbol, { limit: testLimit, page: testPage }), validate.StockGradeNewsItemArraySchema)
		runTest('latestStockGradeNews', () => fmp.latestStockGradeNews({ limit: testLimit, page: testPage }), validate.StockGradeNewsItemArraySchema)
	})

	// --- CALENDAR TESTS ---
	describeIf(canRunTests, 'Calendar Endpoints', () => {
		runTest('companyDividends', () => fmp.companyDividends(testSymbol, { limit: testLimit }), validate.CompanyDividendArraySchema)
		runTest('dividendsCalendar', () => fmp.dividendsCalendar({ from: testFromDate, to: testToDate }), validate.CalendarDividendArraySchema)
		runTest('companyEarningsReports', () => fmp.companyEarningsReports(testSymbol, { limit: testLimit }), validate.CompanyEarningsReportArraySchema)
		runTest('earningsCalendar', () => fmp.earningsCalendar({ from: testFromDate, to: testToDate }), validate.CompanyEarningsReportArraySchema)
		runTest('iposCalendar', () => fmp.iposCalendar({ from: testFromDate, to: testToDate }), validate.IpoCalendarItemArraySchema)
		runTest('ipoDisclosures', () => fmp.ipoDisclosures({ from: testFromDate, to: testToDate }), validate.IpoDisclosureArraySchema)
		runTest('ipoProspectus', () => fmp.ipoProspectus({ from: testFromDate, to: testToDate }), validate.IpoProspectusArraySchema)
		runTest('stockSplitDetails', () => fmp.stockSplitDetails(testSymbol, { limit: testLimit }), validate.StockSplitDetailArraySchema)
		runTest('stockSplitsCalendar', () => fmp.stockSplitsCalendar({ from: testFromDate, to: testToDate }), validate.StockSplitDetailArraySchema)
	})

	// --- CHART TESTS ---
	describeIf(canRunTests, 'Chart Endpoints', () => {
		runTest('stockChartLight', () => fmp.stockChartLight(testSymbol, { from: testFromDate, to: testToDate }), validate.StockChartLightItemArraySchema)
		runTest('stockChartFull', () => fmp.stockChartFull(testSymbol, { from: testFromDate, to: testToDate }), validate.StockChartFullItemArraySchema)
		runTest('unadjustedStockChart', () => fmp.unadjustedStockChart(testSymbol, { from: testFromDate, to: testToDate }), validate.UnadjustedStockChartItemArraySchema)
		runTest('dividendAdjustedStockChart', () => fmp.dividendAdjustedStockChart(testSymbol, { from: testFromDate, to: testToDate }), validate.UnadjustedStockChartItemArraySchema)
		runTest('stockChart1Min', () => fmp.stockChart1Min(testSymbol, { from: testFromDate, to: testToDate }), validate.IntradayStockChartItemArraySchema)
		runTest('stockChart5Min', () => fmp.stockChart5Min(testSymbol, { from: testFromDate, to: testToDate }), validate.IntradayStockChartItemArraySchema)
		runTest('stockChart15Min', () => fmp.stockChart15Min(testSymbol, { from: testFromDate, to: testToDate }), validate.IntradayStockChartItemArraySchema)
		runTest('stockChart30Min', () => fmp.stockChart30Min(testSymbol, { from: testFromDate, to: testToDate }), validate.IntradayStockChartItemArraySchema)
		runTest('stockChart1Hour', () => fmp.stockChart1Hour(testSymbol, { from: testFromDate, to: testToDate }), validate.IntradayStockChartItemArraySchema)
		runTest('stockChart4Hour', () => fmp.stockChart4Hour(testSymbol, { from: testFromDate, to: testToDate }), validate.IntradayStockChartItemArraySchema)
	})

	// --- COMPANY TESTS ---
	describeIf(canRunTests, 'Company Endpoints', () => {
		runTest('companyProfile', () => fmp.companyProfile(testSymbol), validate.CompanyProfileArraySchema)
		runTest('companyProfileByCik', () => fmp.companyProfileByCik(testCIK), validate.CompanyProfileArraySchema)
		runTest('companyNotes', () => fmp.companyNotes(testSymbol), validate.CompanyNoteArraySchema)
		runTest('stockPeers', () => fmp.stockPeers(testSymbol), validate.StockPeerArraySchema)
		runTest('delistedCompanies', () => fmp.delistedCompanies({ page: testPage, limit: testLimit }), validate.DelistedCompanyArraySchema)
		runTest('companyEmployeeCount', () => fmp.companyEmployeeCount(testSymbol, { limit: testLimit }), validate.CompanyEmployeeCountArraySchema)
		runTest('historicalCompanyEmployeeCount', () => fmp.historicalCompanyEmployeeCount(testSymbol, { limit: testLimit }), validate.CompanyEmployeeCountArraySchema)
		runTest('companyMarketCap', () => fmp.companyMarketCap(testSymbol), validate.CompanyMarketCapArraySchema)
		runTest('batchMarketCap', () => fmp.batchMarketCap([testSymbol, testSymbolAlt]), validate.CompanyMarketCapArraySchema)
		runTest('historicalMarketCap', () => fmp.historicalMarketCap(testSymbol, { limit: testLimit, from: testFromDate, to: testToDate }), validate.CompanyMarketCapArraySchema)
		runTest('companySharesFloat', () => fmp.companySharesFloat(testSymbol), validate.CompanySharesFloatArraySchema)
		runTest('allSharesFloat', () => fmp.allSharesFloat({ page: testPage, limit: testLimit }), validate.CompanySharesFloatArraySchema)
		runTest('latestMergersAcquisitions', () => fmp.latestMergersAcquisitions({ page: testPage, limit: testLimit }), validate.MergerAcquisitionArraySchema)
		runTest('searchMergersAcquisitions', () => fmp.searchMergersAcquisitions(testName), validate.MergerAcquisitionArraySchema)
		runTest('companyExecutives', () => fmp.companyExecutives(testSymbol, { active: 'true' }), validate.CompanyExecutiveArraySchema)
		runTest('executiveCompensation', () => fmp.executiveCompensation(testSymbol), validate.ExecutiveCompensationArraySchema)
		runTest('executiveCompensationBenchmark', () => fmp.executiveCompensationBenchmark(testYear), validate.ExecutiveCompensationBenchmarkArraySchema)
	})

	// --- COMMITMENT OF TRADERS TESTS ---
	describeIf(canRunTests, 'Commitment Of Traders Endpoints', () => {
		// COT reports can be large, test with specific commodity symbol if possible
		runTest('cotReport', () => fmp.cotReport({ symbol: 'KC', from: testFromDate, to: testToDate }), validate.CotReportArraySchema)
		runTest('cotAnalysis', () => fmp.cotAnalysis({ symbol: 'B6', from: testFromDate, to: testToDate }), validate.CotAnalysisArraySchema)
		runTest('cotReportList', () => fmp.cotReportList(), validate.CotReportListItemArraySchema)
	})

	// --- DISCOUNTED CASH FLOW TESTS ---
	describeIf(canRunTests, 'Discounted Cash Flow Endpoints', () => {
		runTest('dcfValuation', () => fmp.dcfValuation(testSymbol), validate.DcfValuationArraySchema)
		runTest('leveredDcfValuation', () => fmp.leveredDcfValuation(testSymbol), validate.DcfValuationArraySchema) // Uses same response type
		runTest('customDcfAdvanced', () => fmp.dcfAnalysis(testSymbol, { revenueGrowthPct: 0.1, ebitdaPct: 0.3 }), validate.CustomDcfAdvancedResultArraySchema)
		runTest('customDcfLevered', () => fmp.dcfLeveredAnalysis(testSymbol, { revenueGrowthPct: 0.1, operatingCashFlowPct: 0.28 }), validate.CustomDcfLeveredResultArraySchema)
	})

	// --- ECONOMICS TESTS ---
	describeIf(canRunTests, 'Economics Endpoints', () => {
		runTest('treasuryRates', () => fmp.treasuryRates({ from: testFromDate, to: testToDate }), validate.TreasuryRateArraySchema)
		runTest('economicIndicators', () => fmp.economicIndicators(testEconomicIndicatorName, { from: testFromDate, to: testToDate }), validate.EconomicIndicatorArraySchema)
		runTest('economicCalendar', () => fmp.economicCalendar({ from: testFromDate, to: testToDate }), validate.EconomicCalendarReleaseArraySchema)
		runTest('marketRiskPremium', () => fmp.marketRiskPremium(), validate.MarketRiskPremiumInfoArraySchema)
	})

	// --- ESG TESTS ---
	describeIf(canRunTests, 'ESG Endpoints', () => {
		runTest('esgDisclosures', () => fmp.esgDisclosures(testSymbol), validate.EsgDisclosureArraySchema)
		runTest('esgRatings', () => fmp.esgRatings(testSymbol), validate.EsgRatingArraySchema)
		runTest('esgBenchmark', () => fmp.esgBenchmark(testYear), validate.EsgBenchmarkArraySchema)
	})

	// --- ETF AND MUTUAL FUND TESTS ---
	describeIf(canRunTests, 'ETF & Mutual Fund Endpoints', () => {
		runTest('etfFundHoldings', () => fmp.etfFundHoldings(testEtf), validate.EtfFundHoldingArraySchema)
		runTest('etfFundInfo', () => fmp.etfFundInfo(testEtf), validate.EtfFundInfoArraySchema)
		runTest('etfFundCountryAllocation', () => fmp.etfFundCountryAllocation(testEtf), validate.EtfCountryWeightingArraySchema)
		runTest('etfAssetExposure', () => fmp.etfAssetExposure(testSymbol), validate.EtfAssetExposureItemArraySchema)
		runTest('etfSectorWeighting', () => fmp.etfSectorWeighting(testEtf), validate.EtfSectorWeightingArraySchema)
		runTest('mutualFundEtfLatestDisclosures', () => fmp.mutualFundEtfLatestDisclosures(testSymbol), validate.FundDisclosureHolderArraySchema)
		runTest('mutualFundDisclosures', () => fmp.mutualFundDisclosures(testEtf, { year: testYear, quarter: testQuarter }), validate.MutualFundDisclosureItemArraySchema)
		runTest('searchMutualFundEtfDisclosuresByName', () => fmp.searchMutualFundEtfDisclosuresByName('Vanguard'), validate.FundDisclosureNameSearchResultArraySchema)
		runTest('fundEtfDisclosuresByDate', () => fmp.fundEtfDisclosuresByDate(testEtf), validate.FundDisclosureDateArraySchema)
	})

	// --- COMMODITY TESTS ---
	describeIf(canRunTests, 'Commodity Endpoints', () => {
		runTest('commoditiesList', () => fmp.commoditiesList(), validate.CommodityListItemArraySchema)
		runTest('commodityQuote', () => fmp.commodityQuote(testCommodity), validate.CommodityQuoteArraySchema)
		runTest('commodityQuoteShort', () => fmp.commodityQuoteShort(testCommodity), validate.CommodityQuoteShortArraySchema)
		runTest('allCommoditiesQuotes (short)', () => fmp.allCommoditiesQuotes({ short: true }), validate.CommodityQuoteShortArraySchema)
		runTest('allCommoditiesQuotes (full)', () => fmp.allCommoditiesQuotes({ short: false }), validate.CommodityQuoteArraySchema)
		runTest('commodityChartLight', () => fmp.commodityChartLight(testCommodity, { from: testFromDate, to: testToDate }), validate.StockChartLightItemArraySchema)
		runTest('commodityChartFull', () => fmp.commodityChartFull(testCommodity, { from: testFromDate, to: testToDate }), validate.StockChartFullItemArraySchema)
		runTest('commodityChart1Min', () => fmp.commodityChart1Min(testCommodity, { from: testFromDate, to: testToDate }), validate.IntradayStockChartItemArraySchema)
		runTest('commodityChart5Min', () => fmp.commodityChart5Min(testCommodity, { from: testFromDate, to: testToDate }), validate.IntradayStockChartItemArraySchema)
		runTest('commodityChart1Hour', () => fmp.commodityChart1Hour(testCommodity, { from: testFromDate, to: testToDate }), validate.IntradayStockChartItemArraySchema)
	})

	// --- FUNDRAISERS TESTS ---
	describeIf(canRunTests, 'Fundraisers Endpoints', () => {
		runTest('latestCrowdfundingCampaigns', () => fmp.latestCrowdfundingCampaigns({ page: testPage, limit: testLimit }), validate.CrowdfundingCampaignArraySchema)
		runTest('searchCrowdfundingCampaigns', () => fmp.searchCrowdfundingCampaigns('Tech Startup'), validate.CrowdfundingCampaignSearchResultArraySchema) // Use a generic name
		// getCrowdfundingCampaignsByCik requires a known CIK with crowdfunding
		runTest('latestEquityOfferingUpdates', () => fmp.latestEquityOfferingUpdates({ page: testPage, limit: testLimit }), validate.EquityOfferingUpdateArraySchema)
		runTest('searchEquityOfferings', () => fmp.searchEquityOfferings('Energy'), validate.EquityOfferingSearchResultArraySchema) // Use a generic name
		// getEquityOfferingsByCik requires a known CIK with equity offerings
	})

	// --- CRYPTO TESTS ---
	describeIf(canRunTests, 'Crypto Endpoints', () => {
		runTest('cryptocurrencyList', () => fmp.cryptocurrencyList(), validate.CryptocurrencyListItemArraySchema)
		runTest('cryptocurrencyQuote', () => fmp.cryptocurrencyQuote(testCrypto), validate.CryptocurrencyQuoteArraySchema)
		runTest('cryptocurrencyQuoteShort', () => fmp.cryptocurrencyQuoteShort(testCrypto), validate.CryptocurrencyQuoteShortArraySchema)
		runTest('allCryptocurrenciesQuotes (short)', () => fmp.allCryptocurrenciesQuotes({ short: true }), validate.CryptocurrencyQuoteShortArraySchema)
		runTest('allCryptocurrenciesQuotes (full)', () => fmp.allCryptocurrenciesQuotes({ short: false }), validate.CryptocurrencyQuoteArraySchema)
		runTest('cryptocurrencyChartLight', () => fmp.cryptocurrencyChartLight(testCrypto, { from: testFromDate, to: testToDate }), validate.StockChartLightItemArraySchema)
		runTest('cryptocurrencyChartFull', () => fmp.cryptocurrencyChartFull(testCrypto, { from: testFromDate, to: testToDate }), validate.StockChartFullItemArraySchema)
		runTest('cryptocurrencyChart1Min', () => fmp.cryptocurrencyChart1Min(testCrypto, { from: testFromDate, to: testToDate }), validate.IntradayStockChartItemArraySchema)
		runTest('cryptocurrencyChart5Min', () => fmp.cryptocurrencyChart5Min(testCrypto, { from: testFromDate, to: testToDate }), validate.IntradayStockChartItemArraySchema)
		runTest('cryptocurrencyChart1Hour', () => fmp.cryptocurrencyChart1Hour(testCrypto, { from: testFromDate, to: testToDate }), validate.IntradayStockChartItemArraySchema)
	})

	// --- FOREX TESTS ---
	describeIf(canRunTests, 'Forex Endpoints', () => {
		runTest('forexList', () => fmp.forexList(), validate.ForexPairArraySchema)
		runTest('forexQuote', () => fmp.forexQuote(testForex), validate.ForexQuoteArraySchema)
		runTest('forexQuoteShort', () => fmp.forexQuoteShort(testForex), validate.ForexQuoteShortArraySchema)
		runTest('allForexQuotes (short)', () => fmp.allForexQuotes({ short: true }), validate.ForexQuoteShortArraySchema)
		runTest('allForexQuotes (full)', () => fmp.allForexQuotes({ short: false }), validate.ForexQuoteArraySchema)
		runTest('forexChartLight', () => fmp.forexChartLight(testForex, { from: testFromDate, to: testToDate }), validate.StockChartLightItemArraySchema)
		runTest('forexChartFull', () => fmp.forexChartFull(testForex, { from: testFromDate, to: testToDate }), validate.StockChartFullItemArraySchema)
		runTest('forexChart1Min', () => fmp.forexChart1Min(testForex, { from: testFromDate, to: testToDate }), validate.IntradayStockChartItemArraySchema)
		runTest('forexChart5Min', () => fmp.forexChart5Min(testForex, { from: testFromDate, to: testToDate }), validate.IntradayStockChartItemArraySchema)
		runTest('forexChart1Hour', () => fmp.forexChart1Hour(testForex, { from: testFromDate, to: testToDate }), validate.IntradayStockChartItemArraySchema)
	})

	// --- STATEMENTS TESTS ---
	describeIf(canRunTests, 'Statements Endpoints', () => {
		runTest('incomeStatement', () => fmp.incomeStatement(testSymbol, { limit: testLimit, period: testFinancialPeriodFY }), validate.IncomeStatementArraySchema)
		runTest('balanceSheetStatement', () => fmp.balanceSheetStatement(testSymbol, { limit: testLimit, period: testFinancialPeriodFY }), validate.BalanceSheetStatementArraySchema)
		runTest('cashFlowStatement', () => fmp.cashFlowStatement(testSymbol, { limit: testLimit, period: testFinancialPeriodFY }), validate.CashFlowStatementArraySchema)
		runTest('latestFinancialStatements', () => fmp.latestFinancialStatements({ page: testPage, limit: testLimit }), validate.LatestFinancialStatementMetaArraySchema)
		runTest('incomeStatementTtm', () => fmp.incomeStatementTtm(testSymbol, { limit: testLimit }), validate.IncomeStatementArraySchema) // TTM uses IncomeStatement type
		runTest('balanceSheetStatementTtm', () => fmp.balanceSheetStatementTtm(testSymbol, { limit: testLimit }), validate.BalanceSheetStatementArraySchema)
		runTest('cashFlowStatementTtm', () => fmp.cashFlowStatementTtm(testSymbol, { limit: testLimit }), validate.CashFlowStatementArraySchema)
		runTest('keyMetrics', () => fmp.keyMetrics(testSymbol, { limit: testLimit, period: testFinancialPeriodFY }), validate.KeyMetricsArraySchema)
		runTest('financialRatios', () => fmp.financialRatios(testSymbol, { limit: testLimit, period: testFinancialPeriodFY }), validate.FinancialRatiosArraySchema)
		runTest('keyMetricsTtm', () => fmp.keyMetricsTtm(testSymbol), validate.KeyMetricsTTMArraySchema)
		runTest('financialRatiosTtm', () => fmp.financialRatiosTtm(testSymbol), validate.FinancialRatiosTTMArraySchema)
		runTest('financialScores', () => fmp.financialScores(testSymbol), validate.FinancialScoresArraySchema)
		runTest('ownerEarnings', () => fmp.ownerEarnings(testSymbol, { limit: testLimit }), validate.OwnerEarningsArraySchema)
		runTest('enterpriseValues', () => fmp.enterpriseValues(testSymbol, { limit: testLimit, period: testFinancialPeriodFY }), validate.EnterpriseValueArraySchema)
		runTest('incomeStatementGrowth', () => fmp.incomeStatementGrowth(testSymbol, { limit: testLimit, period: testFinancialPeriodFY }), validate.IncomeStatementGrowthArraySchema)
		runTest('balanceSheetStatementGrowth', () => fmp.balanceSheetStatementGrowth(testSymbol, { limit: testLimit, period: testFinancialPeriodFY }), validate.BalanceSheetStatementGrowthArraySchema)
		runTest('cashFlowStatementGrowth', () => fmp.cashFlowStatementGrowth(testSymbol, { limit: testLimit, period: testFinancialPeriodFY }), validate.CashFlowStatementGrowthArraySchema)
		runTest('financialStatementGrowth', () => fmp.financialStatementGrowth(testSymbol, { limit: testLimit, period: testFinancialPeriodFY }), validate.FinancialStatementGrowthArraySchema)
		runTest('financialReportsDates', () => fmp.financialReportsDates(testSymbol), validate.FinancialReportDateLinksArraySchema)
		// runTest('financialReportJson', () => fmp.financialReportJson(testSymbol, { year: Number.parseInt(testYear), period: testFinancialPeriodFY }), validate.FinancialReportFullJsonArraySchema)
		// runTest('financialReportXlsx', () => fmp.financialReportXlsx(testSymbol, { year: Number.parseInt(testYear), period: testFinancialPeriodFY }), validate.FinancialReportFullJsonArraySchema) // Response is plain text
		runTest('revenueProductSegmentation', () => fmp.revenueProductSegmentation(testSymbol, { period: testPeriodAnnual }), validate.RevenueSegmentationArraySchema)
		runTest('revenueGeographicSegmentation', () => fmp.revenueGeographicSegmentation(testSymbol, { period: testPeriodAnnual }), validate.RevenueSegmentationArraySchema)
		runTest('asReportedIncomeStatements', () => fmp.asReportedIncomeStatements(testSymbol, { limit: testLimit, period: testPeriodAnnual }), validate.AsReportedFinancialStatementArraySchema)
		runTest('asReportedBalanceStatements', () => fmp.asReportedBalanceStatements(testSymbol, { limit: testLimit, period: testPeriodAnnual }), validate.AsReportedFinancialStatementArraySchema)
		runTest('asReportedCashFlowStatements', () => fmp.asReportedCashFlowStatements(testSymbol, { limit: testLimit, period: testPeriodAnnual }), validate.AsReportedFinancialStatementArraySchema)
		runTest('fullAsReportedFinancialStatements', () => fmp.fullAsReportedFinancialStatements(testSymbol, { limit: testLimit, period: testPeriodAnnual }), validate.FullAsReportedFinancialStatementArraySchema)
	})

	// --- FORM 13F TESTS ---
	describeIf(canRunTests, 'Form 13F Endpoints', () => {
		runTest('latestInstitutionalOwnershipFilings', () => fmp.latestInstitutionalOwnershipFilings({ page: testPage, limit: testLimit }), validate.InstitutionalOwnershipFilingArraySchema)
		runTest('secFilingsExtract', () => fmp.secFilingsExtract({ cik: testHolderCik, year: testYear, quarter: testQuarter }), validate.SecFilingExtractArraySchema)
		runTest('form13FFilingDates', () => fmp.form13FFilingDates(testHolderCik), validate.Form13FFilingDateArraySchema)
		runTest('filingsExtractAnalyticsByHolder', () => fmp.filingsExtractAnalyticsByHolder({ symbol: testSymbol, year: testYear, quarter: testQuarter, page: testPage, limit: testLimit }), validate.HolderAnalyticsArraySchema)
		runTest('holderPerformanceSummary', () => fmp.holderPerformanceSummary({ cik: testHolderCik, page: testPage }), validate.HolderPerformanceSummaryArraySchema)
		runTest('holdersIndustryBreakdown', () => fmp.holdersIndustryBreakdown({ cik: testHolderCik, year: testYear, quarter: testQuarter }), validate.HolderIndustryBreakdownArraySchema)
		runTest('positionsSummary', () => fmp.positionsSummary({ symbol: testSymbol, year: testYear, quarter: testQuarter }), validate.SymbolPositionSummaryArraySchema)
		runTest('industryPerformanceSummary', () => fmp.industryPerformanceSummary({ year: testYear, quarter: testQuarter }), validate.IndustryPerformanceSummaryArraySchema)
	})

	// --- INDEXES (already covered, but can add specific index constituent tests if needed) ---

	// --- INSIDER TRADES TESTS ---
	describeIf(canRunTests, 'Insider Trades Endpoints', () => {
		runTest('latestInsiderTrades', () => fmp.latestInsiderTrades({ page: testPage, limit: testLimit }), validate.InsiderTradeArraySchema)
		runTest('searchInsiderTrades', () => fmp.searchInsiderTrades({ symbol: testSymbol, limit: testLimit, page: testPage }), validate.InsiderTradeArraySchema)
		runTest('searchInsiderTradesByReportingName', () => fmp.searchInsiderTradesByReportingName('Cook'), validate.InsiderReportingNameArraySchema) // Example name
		runTest('allInsiderTransactionTypes', () => fmp.allInsiderTransactionTypes(), validate.InsiderTransactionTypeArraySchema)
		runTest('insiderTradeStatistics', () => fmp.insiderTradeStatistics(testSymbol), validate.InsiderTradeStatisticsArraySchema)
		runTest('acquisitionOwnership', () => fmp.acquisitionOwnership(testSymbol, { limit: testLimit }), validate.AcquisitionOwnershipArraySchema)
	})

	// --- MARKET PERFORMANCE TESTS ---
	describeIf(canRunTests, 'Market Performance Endpoints', () => {
		runTest('marketSectorPerformanceSnapshot', () => fmp.marketSectorPerformanceSnapshot({ date: testRecentDate, exchange: testExchange }), validate.MarketSectorPerformanceArraySchema)
		runTest('marketIndustryPerformanceSnapshot', () => fmp.marketIndustryPerformanceSnapshot({ date: testRecentDate, exchange: testExchange, industry: testIndustry }), validate.MarketIndustryPerformanceArraySchema)
		runTest('historicalMarketSectorPerformance', () => fmp.historicalMarketSectorPerformance(testSector, { from: testFromDate, to: testToDate, exchange: testExchange }), validate.MarketSectorPerformanceArraySchema)
		runTest('historicalMarketIndustryPerformance', () => fmp.historicalMarketIndustryPerformance(testIndustry, { from: testFromDate, to: testToDate, exchange: testExchange }), validate.MarketIndustryPerformanceArraySchema)
		runTest('marketSectorPESnapshot', () => fmp.marketSectorPESnapshot({ date: testRecentDate, exchange: testExchange }), validate.MarketSectorPEArraySchema)
		runTest('marketIndustryPESnapshot', () => fmp.marketIndustryPESnapshot({ date: testRecentDate, exchange: testExchange, industry: testIndustry }), validate.MarketIndustryPEArraySchema)
		runTest('historicalMarketSectorPE', () => fmp.historicalMarketSectorPE(testSector, { from: testFromDate, to: testToDate, exchange: testExchange }), validate.MarketSectorPEArraySchema)
		runTest('historicalMarketIndustryPE', () => fmp.historicalMarketIndustryPE(testIndustry, { from: testFromDate, to: testToDate, exchange: testExchange }), validate.MarketIndustryPEArraySchema)
		runTest('biggestStockGainers', () => fmp.biggestStockGainers(), validate.MarketMoverArraySchema)
		runTest('biggestStockLosers', () => fmp.biggestStockLosers(), validate.MarketMoverArraySchema)
		runTest('topTradedStocks', () => fmp.topTradedStocks(), validate.MarketMoverArraySchema)
	})

	// --- MARKET HOURS TESTS ---
	describeIf(canRunTests, 'Market Hours Endpoints', () => {
		runTest('exchangeMarketHours', () => fmp.exchangeMarketHours(testExchange), validate.ExchangeMarketHoursArraySchema)
		runTest('allExchangeMarketHours', () => fmp.allExchangeMarketHours(), validate.ExchangeMarketHoursArraySchema)
	})

	// --- NEWS TESTS ---
	describeIf(canRunTests, 'News Endpoints', () => {
		runTest('fmpArticles', () => fmp.fmpArticles({ page: testPage, limit: testLimit }), validate.FmpArticleArraySchema)
		runTest('generalNews', () => fmp.generalNews({ page: testPage, limit: testLimit, from: testFromDate, to: testToDate }), validate.GeneralNewsArticleArraySchema)
		runTest('pressReleases', () => fmp.pressReleases({ page: testPage, limit: testLimit, from: testFromDate, to: testToDate }), validate.GeneralNewsArticleArraySchema)
		runTest('stockNews', () => fmp.stockNews({ page: testPage, limit: testLimit, from: testFromDate, to: testToDate }), validate.GeneralNewsArticleArraySchema)
		runTest('cryptoNews', () => fmp.cryptoNews({ page: testPage, limit: testLimit, from: testFromDate, to: testToDate }), validate.GeneralNewsArticleArraySchema)
		runTest('forexNews', () => fmp.forexNews({ page: testPage, limit: testLimit, from: testFromDate, to: testToDate }), validate.GeneralNewsArticleArraySchema)
		runTest('searchPressReleases', () => fmp.searchPressReleases({ symbols: testSymbol, page: testPage, limit: testLimit, from: testFromDate, to: testToDate }), validate.GeneralNewsArticleArraySchema)
		runTest('searchStockNews', () => fmp.searchStockNews({ symbols: testSymbol, page: testPage, limit: testLimit, from: testFromDate, to: testToDate }), validate.GeneralNewsArticleArraySchema)
		runTest('searchCryptoNews', () => fmp.searchCryptoNews({ symbols: testCrypto, page: testPage, limit: testLimit, from: testFromDate, to: testToDate }), validate.GeneralNewsArticleArraySchema)
		runTest('searchForexNews', () => fmp.searchForexNews({ symbols: testForex, page: testPage, limit: testLimit, from: testFromDate, to: testToDate }), validate.GeneralNewsArticleArraySchema)
	})

	// --- TECHNICAL INDICATORS TESTS ---
	describeIf(canRunTests, 'Technical Indicators Endpoints', () => {
		runTest('simpleMovingAverage', () => fmp.simpleMovingAverage(testSymbol, { periodLength: testIndicatorPeriodLength, timeframe: testIndicatorTimeframe, from: testFromDate, to: testToDate }), validate.SmaPointArraySchema)
		runTest('exponentialMovingAverage', () => fmp.exponentialMovingAverage(testSymbol, { periodLength: testIndicatorPeriodLength, timeframe: testIndicatorTimeframe, from: testFromDate, to: testToDate }), validate.EmaPointArraySchema)
		runTest('weightedMovingAverage', () => fmp.weightedMovingAverage(testSymbol, { periodLength: testIndicatorPeriodLength, timeframe: testIndicatorTimeframe, from: testFromDate, to: testToDate }), validate.WmaPointArraySchema)
		runTest('doubleExponentialMovingAverage', () => fmp.doubleExponentialMovingAverage(testSymbol, { periodLength: testIndicatorPeriodLength, timeframe: testIndicatorTimeframe, from: testFromDate, to: testToDate }), validate.DemaPointArraySchema)
		runTest('tripleExponentialMovingAverage', () => fmp.tripleExponentialMovingAverage(testSymbol, { periodLength: testIndicatorPeriodLength, timeframe: testIndicatorTimeframe, from: testFromDate, to: testToDate }), validate.TemaPointArraySchema)
		runTest('relativeStrengthIndex', () => fmp.relativeStrengthIndex(testSymbol, { periodLength: testIndicatorPeriodLength, timeframe: testIndicatorTimeframe, from: testFromDate, to: testToDate }), validate.RsiPointArraySchema)
		runTest('standardDeviation', () => fmp.standardDeviation(testSymbol, { periodLength: testIndicatorPeriodLength, timeframe: testIndicatorTimeframe, from: testFromDate, to: testToDate }), validate.StandardDeviationPointArraySchema)
		runTest('williamsPercentR', () => fmp.williamsPercentR(testSymbol, { periodLength: testIndicatorPeriodLength, timeframe: testIndicatorTimeframe, from: testFromDate, to: testToDate }), validate.WilliamsPointArraySchema)
		runTest('averageDirectionalIndex', () => fmp.averageDirectionalIndex(testSymbol, { periodLength: testIndicatorPeriodLength, timeframe: testIndicatorTimeframe, from: testFromDate, to: testToDate }), validate.AdxPointArraySchema)
	})

	// --- QUOTE TESTS ---
	describeIf(canRunTests, 'Quote Endpoints', () => {
		runTest('stockQuote', () => fmp.stockQuote(testSymbol), validate.StockQuoteArraySchema)
		runTest('stockQuoteShort', () => fmp.stockQuoteShort(testSymbol), validate.StockQuoteShortArraySchema)
		runTest('aftermarketTrade', () => fmp.aftermarketTrade(testSymbol), validate.AftermarketTradeArraySchema)
		runTest('aftermarketQuote', () => fmp.aftermarketQuote(testSymbol), validate.AftermarketQuoteArraySchema)
		runTest('stockPriceChange', () => fmp.stockPriceChange(testSymbol), validate.StockPriceChangeArraySchema)
		runTest('stockBatchQuote', () => fmp.stockBatchQuote([testSymbol, testSymbolAlt]), validate.StockQuoteArraySchema)
		runTest('stockBatchQuoteShort', () => fmp.stockBatchQuoteShort([testSymbol, testSymbolAlt]), validate.StockQuoteShortArraySchema)
		runTest('batchAftermarketTrade', () => fmp.batchAftermarketTrade([testSymbol, testSymbolAlt]), validate.AftermarketTradeArraySchema)
		runTest('batchAftermarketQuote', () => fmp.batchAftermarketQuote([testSymbol, testSymbolAlt]), validate.AftermarketQuoteArraySchema)
		runTest('exchangeStockQuotes (short)', () => fmp.exchangeStockQuotes(testExchange, { short: true }), validate.StockQuoteShortArraySchema)
		runTest('exchangeStockQuotes (full)', () => fmp.exchangeStockQuotes(testExchange, { short: false }), validate.StockQuoteArraySchema)
		runTest('mutualFundQuotes (short)', () => fmp.mutualFundQuotes({ short: true }), validate.StockQuoteShortArraySchema)
		runTest('mutualFundQuotes (full)', () => fmp.mutualFundQuotes({ short: false }), validate.StockQuoteArraySchema) // Assuming full quote is StockQuote
		runTest('etfQuotes (short)', () => fmp.etfQuotes({ short: true }), validate.StockQuoteShortArraySchema)
		runTest('etfQuotes (full)', () => fmp.etfQuotes({ short: false }), validate.StockQuoteArraySchema) // Assuming full quote is StockQuote
	})

	// --- EARNINGS TRANSCRIPT TESTS ---
	describeIf(canRunTests, 'Earnings Transcript Endpoints', () => {
		runTest('latestEarningTranscripts', () => fmp.latestEarningTranscripts({ page: testPage, limit: testLimit }), validate.LatestEarningsTranscriptMetaArraySchema)
		runTest('earningsTranscript', () => fmp.earningsTranscript(testSymbol, { year: '2020', quarter: '3', limit: 1 }), validate.EarningsTranscriptArraySchema) // Using a known past transcript
		runTest('earningsTranscriptDatesBySymbol', () => fmp.earningsTranscriptDatesBySymbol(testSymbol), validate.EarningsTranscriptDateArraySchema)
		runTest('earningsTranscriptList', () => fmp.earningsTranscriptList(), validate.EarningsTranscriptListItemArraySchema)
	})

	// --- SEC FILINGS TESTS ---
	describeIf(canRunTests, 'SEC Filings Endpoints', () => {
		runTest('latest8kSecFilings', () => fmp.latest8kSecFilings({ from: testFromDate, to: testToDate, page: testPage, limit: testLimit }), validate.SecFilingArraySchema)
		runTest('latestSecFilingsWithFinancials', () => fmp.latestSecFilingsWithFinancials({ from: testFromDate, to: testToDate, page: testPage, limit: testLimit }), validate.SecFilingArraySchema)
		runTest('searchSecFilingsByFormType', () => fmp.searchSecFilingsByFormType({ formType: testFormType, from: testFromDate, to: testToDate, page: testPage, limit: testLimit }), validate.SecFilingArraySchema)
		runTest('searchSecFilingsBySymbol', () => fmp.searchSecFilingsBySymbol({ symbol: testSymbol, from: testFromDate, to: testToDate, page: testPage }), validate.SecFilingArraySchema)
		runTest('searchSecFilingsByCik', () => fmp.searchSecFilingsByCik({ cik: testCIK, from: testFromDate, to: testToDate, page: testPage, limit: testLimit }), validate.SecFilingArraySchema)
		runTest('searchSecFilingsCompanyName', () => fmp.searchSecFilingsCompanyName(testCompanyName), validate.SecCompanySearchResultArraySchema)
		runTest('searchSecFilingsCompanyBySymbol', () => fmp.searchSecFilingsCompanyBySymbol(testSymbol), validate.SecCompanySearchResultArraySchema)
		runTest('searchSecFilingsCompanyByCik', () => fmp.searchSecFilingsCompanyByCik(testCIK), validate.SecCompanySearchResultArraySchema)
		runTest('secCompanyFullProfile (by symbol)', () => fmp.secCompanyFullProfile({ symbol: testSymbol }), validate.SecCompanyFullProfileArraySchema)
		runTest('secCompanyFullProfile (by CIK)', () => fmp.secCompanyFullProfile({ cik: testCIK }), validate.SecCompanyFullProfileArraySchema)
		runTest('industryClassificationList (by title)', () => fmp.industryClassificationList({ industryTitle: 'SERVICES' }), validate.SicListItemArraySchema)
		runTest('industryClassificationList (by SIC)', () => fmp.industryClassificationList({ sicCode: '7371' }), validate.SicListItemArraySchema)
		runTest('searchIndustryClassification (by symbol)', () => fmp.searchIndustryClassification({ symbol: testSymbol }), validate.IndustryClassificationSearchResultArraySchema)
		runTest('allIndustryClassification', () => fmp.allIndustryClassification({ page: testPage, limit: testLimit }), validate.IndustryClassificationSearchResultArraySchema)
	})

	// --- SENATE & HOUSE TRADING TESTS ---
	describeIf(canRunTests, 'Senate & House Trading Endpoints', () => {
		runTest('latestSenateFinancialDisclosures', () => fmp.latestSenateFinancialDisclosures({ page: testPage, limit: testLimit }), validate.CongressionalDisclosureArraySchema)
		runTest('latestHouseFinancialDisclosures', () => fmp.latestHouseFinancialDisclosures({ page: testPage, limit: testLimit }), validate.CongressionalDisclosureArraySchema)
		runTest('senateTradingActivity', () => fmp.senateTradingActivity(testSymbol), validate.CongressionalDisclosureArraySchema)
		runTest('senateTradesByName', () => fmp.senateTradesByName(testSenatorName), validate.CongressionalDisclosureArraySchema)
		runTest('houseTrades', () => fmp.houseTrades(testSymbol), validate.CongressionalDisclosureArraySchema)
		runTest('houseTradesByName', () => fmp.houseTradesByName(testHouseRepName), validate.CongressionalDisclosureArraySchema)
	})

	// --- BULK DATA TESTS ---
	// These can be very large and slow; enable with caution or use specific small parts/dates.
	describeIf(false, 'Bulk Data Endpoints', () => {
		runTest('bulkCompanyProfile', () => fmp.bulkCompanyProfile(testBulkPart), validate.CompanyProfileArraySchema)
		runTest('bulkStockRating', () => fmp.bulkStockRating(), validate.BulkStockRatingArraySchema)
		runTest('bulkDcfValuations', () => fmp.bulkDcfValuations(), validate.BulkDcfValuationArraySchema)
		runTest('bulkFinancialScores', () => fmp.bulkFinancialScores(), validate.FinancialScoresArraySchema)
		runTest('bulkPriceTargetSummary', () => fmp.bulkPriceTargetSummary(), validate.BulkPriceTargetSummaryArraySchema)
		runTest('bulkEtfHolder', () => fmp.bulkEtfHolder('1'), validate.EtfFundHoldingArraySchema) // Part 1 as example
		runTest('bulkUpgradesDowngradesConsensus', () => fmp.bulkUpgradesDowngradesConsensus(), validate.StockGradeConsensusArraySchema)
		runTest('bulkKeyMetricsTtm', () => fmp.bulkKeyMetricsTtm(), validate.KeyMetricsTTMArraySchema)
		runTest('bulkRatiosTtm', () => fmp.bulkRatiosTtm(), validate.FinancialRatiosTTMArraySchema)
		runTest('bulkStockPeers', () => fmp.bulkStockPeers(), validate.BulkStockPeersArraySchema)
		runTest('bulkEarningsSurprises', () => fmp.bulkEarningsSurprises(testYear), validate.BulkEarningsSurpriseArraySchema)
		runTest('bulkIncomeStatement', () => fmp.bulkIncomeStatement({ year: testYear, period: testFinancialPeriodFY }), validate.IncomeStatementArraySchema)
		runTest('bulkIncomeStatementGrowth', () => fmp.bulkIncomeStatementGrowth({ year: testYear, period: testFinancialPeriodFY }), validate.IncomeStatementGrowthArraySchema)
		runTest('bulkBalanceSheetStatement', () => fmp.bulkBalanceSheetStatement({ year: testYear, period: testFinancialPeriodFY }), validate.BalanceSheetStatementArraySchema)
		runTest('bulkBalanceSheetStatementGrowth', () => fmp.bulkBalanceSheetStatementGrowth({ year: testYear, period: testFinancialPeriodFY }), validate.BalanceSheetStatementGrowthArraySchema)
		runTest('bulkCashFlowStatement', () => fmp.bulkCashFlowStatement({ year: testYear, period: testFinancialPeriodFY }), validate.CashFlowStatementArraySchema)
		runTest('bulkCashFlowStatementGrowth', () => fmp.bulkCashFlowStatementGrowth({ year: testYear, period: testFinancialPeriodFY }), validate.CashFlowStatementGrowthArraySchema)
		runTest('bulkEod', () => fmp.bulkEod(testRecentDate), validate.EodBulkItemArraySchema)
	})
})
