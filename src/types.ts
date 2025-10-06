/**
 * ========================================================================
 *           COMMON / SHARED TYPES
 * ========================================================================
 */

/** Represents financial periods for reporting (e.g., Q1, FY). */
export type FinancialPeriod = 'Q1' | 'Q2' | 'Q3' | 'Q4' | 'FY'

/** Options for specifying the period of financial statements in query parameters. */
export type StatementPeriodOption = 'quarter' | 'annual'

/** Timeframes for intraday historical data. */
export type IntradayTimeframe = '1min' | '5min' | '15min' | '30min' | '1hour' | '4hour'

/** Extended timeframes for historical data, including daily, weekly, and monthly. */
export type ExtendedTimeframe = '1day' | '1week' | '1month'

/** Combined timeframes for technical indicators. */
export type IndicatorTimeframe = IntradayTimeframe | '1day' // As per docs for indicators

/** Price sources for technical indicator calculations. */
export type IndicatorPriceSource = 'close' | 'open' | 'high' | 'low'

/** Common analyst recommendation ratings. */
export type Recommendation = 'Strong Sell'
	| 'Sell'
	| 'Hold'
	| 'Underweight'
	| 'Underperform'
	| 'Neutral'
	| 'Perform'
	| 'Market Perform'
	| 'Outperform'
	| 'Overweight'
	| 'Buy'
	| 'Strong Buy'

/** Base interface for quote responses, can be extended for specific asset types. */
export interface BaseQuote {
	symbol: string
	name?: string
	price?: number
	changesPercentage?: number
	change?: number
	dayLow?: number
	dayHigh?: number
	yearHigh?: number
	yearLow?: number
	marketCap?: number | null
	priceAvg50?: number
	priceAvg200?: number
	exchange?: string
	volume?: number
	avgVolume?: number
	open?: number
	previousClose?: number
	eps?: number | null
	pe?: number | null
	earningsAnnouncement?: string | null
	sharesOutstanding?: number | null
	timestamp?: number
}

export interface BaseQuoteShort {
	symbol: string
	price: number
	change: number | null
	volume: number | null
}

/** Base interface for historical chart data items. */
export interface BaseChartItem {
	date: string // Can be YYYY-MM-DD HH:MM:SS or YYYY-MM-DD
	open: number
	high: number
	low: number
	close: number
	volume: number
}

/**
 * ========================================================================
 *           SEARCH TYPES
 * ========================================================================
 */

export interface SymbolSearchResult {
	symbol: string
	name: string
	currency: string
	exchangeFullName: string
	exchange: string
}

export interface NameSearchResult {
	symbol: string
	name: string
	currency: string
	exchangeFullName: string
	exchange: string
}

export interface CikSearchResult {
	symbol: string
	companyName: string
	cik: string
	exchangeFullName: string
	exchange: string
	currency: string
}

export interface CusipSearchResult {
	symbol: string
	companyName: string
	cusip: string
	marketCap: number | null
}

export interface IsinSearchResult {
	symbol: string
	name: string
	isin: string
	marketCap: number | null
}

export interface StockScreenerResult {
	symbol: string
	companyName: string
	marketCap: number | null
	sector: string | null
	industry: string | null
	beta: number | null
	price: number | null
	lastAnnualDividend: number | null
	volume: number | null
	exchange: string | null
	exchangeShortName: string | null
	country: string | null
	isEtf: boolean | null
	isFund: boolean | null
	isActivelyTrading: boolean | null
}

export interface ExchangeVariant {
	symbol: string
	price: number | null
	beta: number | null
	volAvg: number | null
	mktCap: number | null
	lastDiv: number | null
	range: string | null
	changes: number | null
	companyName: string
	currency: string | null
	cik: string | null
	isin: string | null
	cusip: string | null
	exchange: string
	exchangeShortName: string | null
	industry: string | null
	website: string | null
	description: string | null
	ceo: string | null
	sector: string | null
	country: string | null
	fullTimeEmployees: string | null
	phone: string | null
	address: string | null
	city: string | null
	state: string | null
	zip: string | null
	dcfDiff: number | null
	dcf: number | null
	image: string | null
	ipoDate: string | null
	defaultImage: boolean | null
	isEtf: boolean | null
	isActivelyTrading: boolean | null
	isAdr: boolean | null
	isFund: boolean | null
}

/**
 * ========================================================================
 *           DIRECTORY TYPES
 * ========================================================================
 */

export interface CompanySymbol {
	symbol: string
	companyName: string
}

export interface FinancialStatementSymbol {
	symbol: string
	companyName: string
	tradingCurrency: string | null
	reportingCurrency: string | null
}

export interface CikListItem {
	cik: string
	companyName: string
}

export interface SymbolChange {
	date: string
	companyName: string
	oldSymbol: string
	newSymbol: string
}

export interface EtfSymbol {
	symbol: string
	name: string
}

export interface ActivelyTradingItem {
	symbol: string
	name: string
}

export interface EarningsTranscriptListItem {
	symbol: string
	companyName: string
	noOfTranscripts: string | null
}

export interface AvailableExchange {
	exchange: string
}

export interface AvailableSector {
	sector: string
}

export interface AvailableIndustry {
	industry: string
}

export interface AvailableCountry {
	country: string
}

/**
 * ========================================================================
 *           ANALYST TYPES
 * ========================================================================
 */

export interface FinancialEstimate {
	symbol: string
	date: string
	revenueLow: number | null
	revenueHigh: number | null
	revenueAvg: number | null
	ebitdaLow: number | null
	ebitdaHigh: number | null
	ebitdaAvg: number | null
	ebitLow: number | null
	ebitHigh: number | null
	ebitAvg: number | null
	netIncomeLow: number | null
	netIncomeHigh: number | null
	netIncomeAvg: number | null
	sgaExpenseLow: number | null
	sgaExpenseHigh: number | null
	sgaExpenseAvg: number | null
	epsAvg: number | null
	epsHigh: number | null
	epsLow: number | null
	numAnalystsRevenue: number | null
	numAnalystsEps: number | null
}

export interface RatingSnapshot {
	symbol: string
	rating: string | null
	overallScore: number | null
	discountedCashFlowScore: number | null
	returnOnEquityScore: number | null
	returnOnAssetsScore: number | null
	debtToEquityScore: number | null
	priceToEarningsScore: number | null
	priceToBookScore: number | null
}

export interface HistoricalRating extends RatingSnapshot {
	date: string
}

export interface PriceTargetSummary {
	symbol: string
	lastMonthCount: number | null
	lastMonthAvgPriceTarget: number | null
	lastQuarterCount: number | null
	lastQuarterAvgPriceTarget: number | null
	lastYearCount: number | null
	lastYearAvgPriceTarget: number | null
	allTimeCount: number | null
	allTimeAvgPriceTarget: number | null
	publishers: string // JSON string representation of string[]
}

export interface PriceTargetConsensus {
	symbol: string
	targetHigh: number | null
	targetLow: number | null
	targetConsensus: number | null
	targetMedian: number | null
}

export interface PriceTargetNewsItem {
	symbol: string
	publishedDate: string
	newsURL: string | null
	newsTitle: string | null
	analystName: string | null
	priceTarget: number | null
	adjPriceTarget: number | null
	priceWhenPosted: number | null
	newsPublisher: string | null
	newsBaseURL: string | null
	analystCompany: string | null
}

export interface StockGrade {
	symbol: string
	date: string
	gradingCompany: string | null
	previousGrade: string | null
	newGrade: string | null
	action: string | null
}

export interface HistoricalStockGradeSummary {
	symbol: string
	date: string
	analystRatingsBuy: number | null
	analystRatingsHold: number | null
	analystRatingsSell: number | null
	analystRatingsStrongSell: number | null
}

export interface StockGradeConsensus {
	symbol: string
	strongBuy: string | number | null
	buy: string | number | null
	hold: string | number | null
	sell: string | number | null
	strongSell: string | number | null
	consensus: string | null
}

export interface StockGradeNewsItem {
	symbol: string
	publishedDate: string
	newsURL: string | null
	newsTitle: string | null
	newsBaseURL: string | null
	newsPublisher: string | null
	newGrade: string | null
	previousGrade: string | null
	gradingCompany: string | null
	action: string | null
	priceWhenPosted: number | null
}

/**
 * ========================================================================
 *           CALENDAR TYPES
 * ========================================================================
 */

export interface CompanyDividend {
	symbol: string
	date: string
	recordDate: string | null
	paymentDate: string | null
	declarationDate: string | null
	adjDividend: number | null
	dividend: number | null
	yield: number | null
	frequency: string | null
}

export interface CalendarDividend extends CompanyDividend { }

export interface CompanyEarningsReport {
	symbol: string
	date: string
	epsActual: number | null
	epsEstimated: number | null
	revenueActual: number | null
	revenueEstimated: number | null
	lastUpdated: string
}

export interface IpoCalendarItem {
	symbol: string | null
	date: string
	daa: string | null
	company: string
	exchange: string | null
	actions: string | null
	shares: number | null
	priceRange: string | null
	marketCap: number | null
}

export interface IpoDisclosure {
	symbol: string | null
	filingDate: string
	acceptedDate: string
	effectivenessDate: string | null
	cik: string | null
	form: string | null
	url: string | null
}

export interface IpoProspectus {
	symbol: string | null
	acceptedDate: string
	filingDate: string
	ipoDate: string | null
	cik: string | null
	pricePublicPerShare: number | null
	pricePublicTotal: number | null
	discountsAndCommissionsPerShare: number | null
	discountsAndCommissionsTotal: number | null
	proceedsBeforeExpensesPerShare: number | null
	proceedsBeforeExpensesTotal: number | null
	form: string | null
	url: string | null
}

export interface StockSplitDetail {
	symbol: string
	date: string
	numerator: number
	denominator: number
}

/**
 * ========================================================================
 *           CHART TYPES
 * ========================================================================
 */

export interface StockChartLightItem {
	symbol: string
	date: string
	price: number
	volume: number
}

export interface StockChartFullItem extends BaseChartItem {
	symbol: string
	change: number | null
	changePercent: number | null
	vwap: number | null
}

export interface UnadjustedStockChartItem {
	symbol: string
	date: string
	adjOpen: number
	adjHigh: number
	adjLow: number
	adjClose: number
	volume: number
}

/**
 * ========================================================================
 *           COMPANY TYPES
 * ========================================================================
 */

export interface CompanyProfile {
	symbol: string
	price: number | null
	marketCap: number | null
	beta: number | null
	lastDividend: number | null
	range: string | null
	change: number | null
	changePercentage: number | null
	volume: number | null
	averageVolume: number | null
	companyName: string
	currency: string | null
	cik: string | null
	isin: string | null
	cusip: string | null
	exchangeFullName: string | null
	exchange: string | null
	industry: string | null
	website: string | null
	description: string | null
	ceo: string | null
	sector: string | null
	country: string | null
	fullTimeEmployees: string | null
	phone: string | null
	address: string | null
	city: string | null
	state: string | null
	zip: string | null
	image: string | null
	ipoDate: string | null
	defaultImage: boolean | null
	isEtf: boolean | null
	isActivelyTrading: boolean | null
	isAdr: boolean | null
	isFund: boolean | null
}

export interface CompanyNote {
	cik: string | null
	symbol: string
	title: string | null
	exchange: string | null
}

export interface StockPeer {
	symbol: string
	companyName: string
	price: number | null
	mktCap: number | null
}

export interface DelistedCompany {
	symbol: string
	companyName: string
	exchange: string | null
	ipoDate: string | null
	delistedDate: string | null
}

export interface CompanyEmployeeCount {
	symbol: string
	cik: string | null
	acceptanceTime: string
	periodOfReport: string
	companyName: string
	formType: string | null
	filingDate: string
	employeeCount: number | null
	source: string | null
}

export interface CompanyMarketCap {
	symbol: string
	date: string
	marketCap: number
}

export interface CompanySharesFloat {
	symbol: string
	date: string
	freeFloat: number | null
	floatShares: number | null
	outstandingShares: number | null
}

export interface MergerAcquisition {
	symbol: string | null
	companyName: string | null
	cik: string | null
	targetedCompanyName: string | null
	targetedCik: string | null
	targetedSymbol: string | null
	transactionDate: string
	acceptedDate: string
	link: string | null
}

export interface CompanyExecutive {
	title: string | null
	name: string
	pay: number | null
	currencyPay: string | null
	gender: string | null
	yearBorn: number | null
	active: boolean | null
}

export interface ExecutiveCompensation {
	cik: string | null
	symbol: string
	companyName: string
	filingDate: string
	acceptedDate: string
	nameAndPosition: string
	year: number
	salary: number | null
	bonus: number | null
	stockAward: number | null
	optionAward: number | null
	incentivePlanCompensation: number | null
	allOtherCompensation: number | null
	total: number | null
	link: string | null
}

export interface ExecutiveCompensationBenchmark {
	industryTitle: string
	year: number
	averageCompensation: number
}

/**
 * ========================================================================
 *           COMMITMENT OF TRADERS (COT) TYPES
 * ========================================================================
 */

export interface CotReport {
	symbol: string
	date: string
	name: string
	sector: string
	marketAndExchangeNames: string
	cftcContractMarketCode: string
	cftcMarketCode: string
	cftcRegionCode: string
	cftcCommodityCode: string
	openInterestAll: number
	noncommPositionsLongAll: number
	noncommPositionsShortAll: number
	noncommPositionsSpreadAll: number
	commPositionsLongAll: number
	commPositionsShortAll: number
	totReptPositionsLongAll: number
	totReptPositionsShortAll: number
	nonreptPositionsLongAll: number
	nonreptPositionsShortAll: number
	openInterestOld: number
	noncommPositionsLongOld: number
	noncommPositionsShortOld: number
	noncommPositionsSpreadOld: number
	commPositionsLongOld: number
	commPositionsShortOld: number
	totReptPositionsLongOld: number
	totReptPositionsShortOld: number
	nonreptPositionsLongOld: number
	nonreptPositionsShortOld: number
	openInterestOther: number
	noncommPositionsLongOther: number
	noncommPositionsShortOther: number
	noncommPositionsSpreadOther: number
	commPositionsLongOther: number
	commPositionsShortOther: number
	totReptPositionsLongOther: number
	totReptPositionsShortOther: number
	nonreptPositionsLongOther: number
	nonreptPositionsShortOther: number
	changeInOpenInterestAll: number
	changeInNoncommLongAll: number
	changeInNoncommShortAll: number
	changeInNoncommSpeadAll: number
	changeInCommLongAll: number
	changeInCommShortAll: number
	changeInTotReptLongAll: number
	changeInTotReptShortAll: number
	changeInNonreptLongAll: number
	changeInNonreptShortAll: number
	pctOfOpenInterestAll: number
	pctOfOiNoncommLongAll: number
	pctOfOiNoncommShortAll: number
	pctOfOiNoncommSpreadAll: number
	pctOfOiCommLongAll: number
	pctOfOiCommShortAll: number
	pctOfOiTotReptLongAll: number
	pctOfOiTotReptShortAll: number
	pctOfOiNonreptLongAll: number
	pctOfOiNonreptShortAll: number
	pctOfOpenInterestOl: number
	pctOfOiNoncommLongOl: number
	pctOfOiNoncommShortOl: number
	pctOfOiNoncommSpreadOl: number
	pctOfOiCommLongOl: number
	pctOfOiCommShortOl: number
	pctOfOiTotReptLongOl: number
	pctOfOiTotReptShortOl: number
	pctOfOiNonreptLongOl: number
	pctOfOiNonreptShortOl: number
	pctOfOpenInterestOther: number
	pctOfOiNoncommLongOther: number
	pctOfOiNoncommShortOther: number
	pctOfOiNoncommSpreadOther: number
	pctOfOiCommLongOther: number
	pctOfOiCommShortOther: number
	pctOfOiTotReptLongOther: number
	pctOfOiTotReptShortOther: number
	pctOfOiNonreptLongOther: number
	pctOfOiNonreptShortOther: number
	tradersTotAll: number
	tradersNoncommLongAll: number
	tradersNoncommShortAll: number
	tradersNoncommSpreadAll: number
	tradersCommLongAll: number
	tradersCommShortAll: number
	tradersTotReptLongAll: number
	tradersTotReptShortAll: number
	tradersTotOl: number
	tradersNoncommLongOl: number
	tradersNoncommShortOl: number
	tradersNoncommSpeadOl: number
	tradersCommLongOl: number
	tradersCommShortOl: number
	tradersTotReptLongOl: number
	tradersTotReptShortOl: number
	tradersTotOther: number
	tradersNoncommLongOther: number
	tradersNoncommShortOther: number
	tradersNoncommSpreadOther: number
	tradersCommLongOther: number
	tradersCommShortOther: number
	tradersTotReptLongOther: number
	tradersTotReptShortOther: number
	concGrossLe4TdrLongAll: number
	concGrossLe4TdrShortAll: number
	concGrossLe8TdrLongAll: number
	concGrossLe8TdrShortAll: number
	concNetLe4TdrLongAll: number
	concNetLe4TdrShortAll: number
	concNetLe8TdrLongAll: number
	concNetLe8TdrShortAll: number
	concGrossLe4TdrLongOl: number
	concGrossLe4TdrShortOl: number
	concGrossLe8TdrLongOl: number
	concGrossLe8TdrShortOl: number
	concNetLe4TdrLongOl: number
	concNetLe4TdrShortOl: number
	concNetLe8TdrLongOl: number
	concNetLe8TdrShortOl: number
	concGrossLe4TdrLongOther: number
	concGrossLe4TdrShortOther: number
	concGrossLe8TdrLongOther: number
	concGrossLe8TdrShortOther: number
	concNetLe4TdrLongOther: number
	concNetLe4TdrShortOther: number
	concNetLe8TdrLongOther: number
	concNetLe8TdrShortOther: number
	contractUnits: string | null
}

export interface CotAnalysis {
	symbol: string
	date: string
	name: string
	sector: string
	exchange: string
	currentLongMarketSituation: number | null
	currentShortMarketSituation: number | null
	marketSituation: string | null
	previousLongMarketSituation: number | null
	previousShortMarketSituation: number | null
	previousMarketSituation: string | null
	netPosition: number | null
	previousNetPosition: number | null
	changeInNetPosition: number | null
	marketSentiment: string | null
	reversalTrend: boolean | null
}

export interface CotReportListItem {
	symbol: string
	name: string
}

/**
 * ========================================================================
 *           DISCOUNTED CASH FLOW (DCF) TYPES
 * ========================================================================
 */

export interface DcfValuation {
	'symbol': string
	'date': string
	'dcf': number
	'Stock Price': number
}

export interface CustomDcfAdvancedResult {
	year: string
	symbol: string
	revenue: number
	revenuePercentage: number
	ebitda: number
	ebitdaPercentage: number
	ebit: number
	ebitPercentage: number
	depreciation: number
	depreciationPercentage: number
	totalCash: number
	totalCashPercentage: number
	receivables: number
	receivablesPercentage: number
	inventories: number
	inventoriesPercentage: number
	payable: number
	payablePercentage: number
	capitalExpenditure: number
	capitalExpenditurePercentage: number
	price: number
	beta: number
	dilutedSharesOutstanding: number
	costofDebt: number
	taxRate: number
	afterTaxCostOfDebt: number
	riskFreeRate: number
	marketRiskPremium: number
	costOfEquity: number
	totalDebt: number
	totalEquity: number
	totalCapital: number
	debtWeighting: number
	equityWeighting: number
	wacc: number
	taxRateCash: number
	ebiat: number
	ufcf: number
	sumPvUfcf: number
	longTermGrowthRate: number
	terminalValue: number
	presentTerminalValue: number
	enterpriseValue: number
	netDebt: number
	equityValue: number
	equityValuePerShare: number
	freeCashFlowT1: number
}

export interface CustomDcfLeveredResult {
	year: string
	symbol: string
	revenue: number
	revenuePercentage: number
	capitalExpenditure: number
	capitalExpenditurePercentage: number
	price: number
	beta: number
	dilutedSharesOutstanding: number
	costofDebt: number
	taxRate: number
	afterTaxCostOfDebt: number
	riskFreeRate: number
	marketRiskPremium: number
	costOfEquity: number
	totalDebt: number
	totalEquity: number
	totalCapital: number
	debtWeighting: number
	equityWeighting: number
	wacc: number
	operatingCashFlow: number
	operatingCashFlowPercentage: number
	pvLfcf: number
	sumPvLfcf: number
	longTermGrowthRate: number
	freeCashFlow: number
	terminalValue: number
	presentTerminalValue: number
	enterpriseValue: number
	netDebt: number
	equityValue: number
	equityValuePerShare: number
	freeCashFlowT1: number
}

/**
 * ========================================================================
 *           ECONOMICS TYPES
 * ========================================================================
 */

export interface TreasuryRate {
	date: string
	month1: number | null
	month2: number | null
	month3: number | null
	month6: number | null
	year1: number | null
	year2: number | null
	year3: number | null
	year5: number | null
	year7: number | null
	year10: number | null
	year20: number | null
	year30: number | null
}

export type EconomicIndicatorName = 'GDP' | 'realGDP' | 'nominalPotentialGDP' | 'realGDPPerCapita' | 'federalFunds' | 'CPI' | 'inflationRate' | 'inflation' | 'retailSales' | 'consumerSentiment' | 'durableGoods' | 'unemploymentRate' | 'totalNonfarmPayroll' | 'initialClaims' | 'industrialProductionTotalIndex' | 'newPrivatelyOwnedHousingUnitsStartedTotalUnits' | 'totalVehicleSales' | 'retailMoneyFunds' | 'smoothedUSRecessionProbabilities' | '3MonthOr90DayRatesAndYieldsCertificatesOfDeposit' | 'commercialBankInterestRateOnCreditCardPlansAllAccounts' | '30YearFixedRateMortgageAverage' | '15YearFixedRateMortgageAverage'

export interface EconomicIndicator {
	name: EconomicIndicatorName
	date: string
	value: number
}

export interface EconomicCalendarRelease {
	date: string
	country: string
	event: string
	currency: string | null
	previous: number | null
	estimate: number | null
	actual: number | null
	change: number | null
	impact: string | null
	changePercentage: number | null
}

export interface MarketRiskPremiumInfo {
	country: string
	continent: string | null
	countryRiskPremium: number
	totalEquityRiskPremium: number
}

/**
 * ========================================================================
 *           ESG TYPES
 * ========================================================================
 */

export interface EsgDisclosure {
	date: string
	acceptedDate: string
	symbol: string
	cik: string | null
	companyName: string
	formType: string | null
	environmentalScore: number | null
	socialScore: number | null
	governanceScore: number | null
	ESGScore: number | null
	url: string | null
}

export interface EsgRating {
	symbol: string
	cik: string | null
	companyName: string
	industry: string | null
	fiscalYear: number | null
	ESGRiskRating: string | null
	industryRank: string | null
}

export interface EsgBenchmark {
	fiscalYear: number
	sector: string
	environmentalScore: number | null
	socialScore: number | null
	governanceScore: number | null
	ESGScore: number | null
}

/**
 * ========================================================================
 *           ETF AND MUTUAL FUNDS TYPES
 * ========================================================================
 */

export interface EtfFundHolding {
	symbol: string
	asset: string
	name: string
	isin: string | null
	securityCusip: string | null
	sharesNumber: string | number | null
	weightPercentage: string | number | null
	marketValue: string | number | null
	updatedAt: string
	updated?: string // This field was in the original example but not in bulk, making it optional
}

export interface EtfSectorExposure {
	industry: string
	exposure: number
}

export interface EtfFundInfo {
	symbol: string
	name: string
	description: string | null
	isin: string | null
	assetClass: string | null
	securityCusip: string | null
	domicile: string | null
	website: string | null
	etfCompany: string | null
	expenseRatio: number | null
	assetsUnderManagement: number | null
	avgVolume: number | null
	inceptionDate: string | null
	nav: number | null
	navCurrency: string | null
	holdingsCount: number | null
	updatedAt: string
	sectorsList: EtfSectorExposure[] | null
}

export interface EtfCountryWeighting {
	country: string
	weightPercentage: string
}

export interface EtfAssetExposureItem {
	symbol: string
	asset: string
	sharesNumber: number | null
	weightPercentage: number | null
	marketValue: number | null
}

export interface EtfSectorWeighting {
	symbol: string
	sector: string
	weightPercentage: number | null
}

export interface FundDisclosureHolder {
	cik: string
	holder: string
	shares: number | null
	dateReported: string
	change: number | null
	weightPercent: number | null
}

export interface MutualFundDisclosureItem {
	cik: string
	date: string
	acceptedDate: string
	symbol: string
	name: string
	lei: string | null
	title: string | null
	cusip: string | null
	isin: string | null
	balance: number | null
	units: string | null
	cur_cd: string | null
	valUsd: number | null
	pctVal: number | null
	payoffProfile: string | null
	assetCat: string | null
	issuerCat: string | null
	invCountry: string | null
	isRestrictedSec: string | null
	fairValLevel: string | null
	isCashCollateral: string | null
	isNonCashCollateral: string | null
	isLoanByFund: string | null
}

export interface FundDisclosureNameSearchResult {
	symbol: string | null
	cik: string
	classId: string | null
	seriesId: string | null
	entityName: string
	entityOrgType: string | null
	seriesName: string | null
	className: string | null
	reportingFileNumber: string | null
	address: string | null
	city: string | null
	zipCode: string | null
	state: string | null
}

export interface FundDisclosureDate {
	date: string
	year: number
	quarter: number
}

/**
 * ========================================================================
 *           COMMODITY TYPES
 * ========================================================================
 */

export interface CommodityListItem {
	symbol: string
	name: string
	exchange: string | null
	tradeMonth: string | null
	currency: string | null
}

export interface CommodityQuote extends BaseQuote { }

export interface CommodityQuoteShort extends BaseQuoteShort { }

/**
 * ========================================================================
 *           FUNDRAISERS TYPES
 * ========================================================================
 */

export interface CrowdfundingCampaign {
	cik: string
	companyName: string
	date: string | null
	filingDate: string
	acceptedDate: string
	formType: string | null
	formSignification: string | null
	nameOfIssuer: string
	legalStatusForm: string | null
	jurisdictionOrganization: string | null
	issuerStreet: string | null
	issuerCity: string | null
	issuerStateOrCountry: string | null
	issuerZipCode: string | null
	issuerWebsite: string | null
	intermediaryCompanyName: string | null
	intermediaryCommissionCik: string | null
	intermediaryCommissionFileNumber: string | null
	compensationAmount: string | null
	financialInterest: string | null
	securityOfferedType: string | null
	securityOfferedOtherDescription: string | null
	numberOfSecurityOffered: number | null
	offeringPrice: number | null
	offeringAmount: number | null
	overSubscriptionAccepted: string | null
	overSubscriptionAllocationType: string | null
	maximumOfferingAmount: number | null
	offeringDeadlineDate: string | null
	currentNumberOfEmployees: number | null
	totalAssetMostRecentFiscalYear: number | null
	totalAssetPriorFiscalYear: number | null
	cashAndCashEquiValentMostRecentFiscalYear: number | null
	cashAndCashEquiValentPriorFiscalYear: number | null
	accountsReceivableMostRecentFiscalYear: number | null
	accountsReceivablePriorFiscalYear: number | null
	shortTermDebtMostRecentFiscalYear: number | null
	shortTermDebtPriorFiscalYear: number | null
	longTermDebtMostRecentFiscalYear: number | null
	longTermDebtPriorFiscalYear: number | null
	revenueMostRecentFiscalYear: number | null
	revenuePriorFiscalYear: number | null
	costGoodsSoldMostRecentFiscalYear: number | null
	costGoodsSoldPriorFiscalYear: number | null
	taxesPaidMostRecentFiscalYear: number | null
	taxesPaidPriorFiscalYear: number | null
	netIncomeMostRecentFiscalYear: number | null
	netIncomePriorFiscalYear: number | null
}

export interface CrowdfundingCampaignSearchResult {
	cik: string
	name: string
	date: string | null
}

export interface EquityOfferingUpdate {
	cik: string
	companyName: string
	date: string
	filingDate: string
	acceptedDate: string
	formType: string | null
	formSignification: string | null
	entityName: string
	issuerStreet: string | null
	issuerCity: string | null
	issuerStateOrCountry: string | null
	issuerStateOrCountryDescription: string | null
	issuerZipCode: string | null
	issuerPhoneNumber: string | null
	jurisdictionOfIncorporation: string | null
	entityType: string | null
	incorporatedWithinFiveYears: boolean | null
	yearOfIncorporation: string | null
	relatedPersonFirstName: string | null
	relatedPersonLastName: string | null
	relatedPersonStreet: string | null
	relatedPersonCity: string | null
	relatedPersonStateOrCountry: string | null
	relatedPersonStateOrCountryDescription: string | null
	relatedPersonZipCode: string | null
	relatedPersonRelationship: string | null
	industryGroupType: string | null
	revenueRange: string | null
	federalExemptionsExclusions: string | null
	isAmendment: boolean | null
	dateOfFirstSale: string | null
	durationOfOfferingIsMoreThanYear: boolean | null
	securitiesOfferedAreOfEquityType: boolean | null
	isBusinessCombinationTransaction: boolean | null
	minimumInvestmentAccepted: number | null
	totalOfferingAmount: number | null
	totalAmountSold: number | null
	totalAmountRemaining: number | null
	hasNonAccreditedInvestors: boolean | null
	totalNumberAlreadyInvested: number | null
	salesCommissions: number | null
	findersFees: number | null
	grossProceedsUsed: number | null
}

export interface EquityOfferingSearchResult {
	cik: string
	name: string
	date: string
}

/**
 * ========================================================================
 *           CRYPTO TYPES
 * ========================================================================
 */

export interface CryptocurrencyListItem {
	symbol: string
	name: string
	exchange: string | null
	icoDate: string | null
	circulatingSupply: number | null
	totalSupply: number | null
}

export interface CryptocurrencyQuote extends BaseQuote { }

export interface CryptocurrencyQuoteShort extends BaseQuoteShort { }

/**
 * ========================================================================
 *           FOREX TYPES
 * ========================================================================
 */

export interface ForexPair {
	symbol: string
	fromCurrency: string
	toCurrency: string
	fromName: string | null
	toName: string | null
}

export interface ForexQuote extends BaseQuote { }

export interface ForexQuoteShort extends BaseQuoteShort { }

/**
 * ========================================================================
 *           STATEMENTS TYPES
 * ========================================================================
 */

export interface IncomeStatement {
	date: string
	symbol: string
	reportedCurrency: string | null
	cik: string | null
	filingDate: string | null
	acceptedDate: string | null
	fiscalYear: string
	period: FinancialPeriod
	revenue: number | string | null
	costOfRevenue: number | string | null
	grossProfit: number | string | null
	researchAndDevelopmentExpenses: number | string | null
	generalAndAdministrativeExpenses: number | string | null
	sellingAndMarketingExpenses: number | string | null
	sellingGeneralAndAdministrativeExpenses: number | string | null
	otherExpenses: number | string | null
	operatingExpenses: number | string | null
	costAndExpenses: number | string | null
	netInterestIncome?: number | string | null
	interestIncome: number | string | null
	interestExpense: number | string | null
	depreciationAndAmortization: number | string | null
	ebitda: number | string | null
	ebit: number | string | null
	nonOperatingIncomeExcludingInterest?: number | string | null
	operatingIncome: number | string | null
	totalOtherIncomeExpensesNet: number | string | null
	incomeBeforeTax: number | string | null
	incomeTaxExpense: number | string | null
	netIncomeFromContinuingOperations: number | string | null
	netIncomeFromDiscontinuedOperations?: number | string | null
	otherAdjustmentsToNetIncome?: number | string | null
	netIncome: number | string | null
	netIncomeDeductions?: number | string | null
	bottomLineNetIncome?: number | string | null
	eps: number | string | null
	epsDiluted: number | string | null
	weightedAverageShsOut: number | string | null
	weightedAverageShsOutDil: number | string | null
}

export interface BalanceSheetStatement {
	date: string
	symbol: string
	reportedCurrency: string | null
	cik: string | null
	filingDate: string | null
	acceptedDate: string | null
	fiscalYear: string
	period: FinancialPeriod
	cashAndCashEquivalents: number | string | null
	shortTermInvestments: number | string | null
	cashAndShortTermInvestments: number | string | null
	netReceivables: number | string | null
	accountsReceivables?: number | string | null
	otherReceivables?: number | string | null
	inventory: number | string | null
	prepaids?: number | string | null
	otherCurrentAssets: number | string | null
	totalCurrentAssets: number | string | null
	propertyPlantEquipmentNet: number | string | null
	goodwill: number | string | null
	intangibleAssets: number | string | null
	goodwillAndIntangibleAssets: number | string | null
	longTermInvestments: number | string | null
	taxAssets: number | string | null
	otherNonCurrentAssets: number | string | null
	totalNonCurrentAssets: number | string | null
	otherAssets: number | string | null
	totalAssets: number | string | null
	totalPayables?: number | string | null
	accountPayables: number | string | null
	otherPayables?: number | string | null
	accruedExpenses?: number | string | null
	shortTermDebt: number | string | null
	capitalLeaseObligationsCurrent?: number | string | null
	taxPayables: number | string | null
	deferredRevenue: number | string | null
	otherCurrentLiabilities: number | string | null
	totalCurrentLiabilities: number | string | null
	longTermDebt: number | string | null
	deferredRevenueNonCurrent?: number | string | null
	deferredTaxLiabilitiesNonCurrent: number | string | null
	otherNonCurrentLiabilities: number | string | null
	totalNonCurrentLiabilities: number | string | null
	otherLiabilities: number | string | null
	capitalLeaseObligations: number | string | null
	totalLiabilities: number | string | null
	treasuryStock?: number | string | null
	preferredStock: number | string | null
	commonStock: number | string | null
	retainedEarnings: number | string | null
	additionalPaidInCapital?: number | string | null
	accumulatedOtherComprehensiveIncomeLoss: number | string | null
	otherTotalStockholdersEquity: number | string | null
	totalStockholdersEquity: number | string | null
	totalEquity: number | string | null
	minorityInterest: number | string | null
	totalLiabilitiesAndTotalEquity: number | string | null
	totalInvestments: number | string | null
	totalDebt: number | string | null
	netDebt: number | string | null
}

export interface CashFlowStatement {
	date: string
	symbol: string
	reportedCurrency: string | null
	cik: string | null
	filingDate: string | null
	acceptedDate: string | null
	fiscalYear: string
	period: FinancialPeriod
	netIncome: number | string | null
	depreciationAndAmortization: number | string | null
	deferredIncomeTax: number | string | null
	stockBasedCompensation: number | string | null
	changeInWorkingCapital: number | string | null
	accountsReceivables: number | string | null
	inventory: number | string | null
	accountsPayables: number | string | null
	otherWorkingCapital: number | string | null
	otherNonCashItems: number | string | null
	netCashProvidedByOperatingActivities: number | string | null
	investmentsInPropertyPlantAndEquipment: number | string | null
	acquisitionsNet: number | string | null
	purchasesOfInvestments: number | string | null
	salesMaturitiesOfInvestments: number | string | null
	otherInvestingActivities: number | string | null
	netCashProvidedByInvestingActivities: number | string | null
	netDebtIssuance?: number | string | null
	longTermNetDebtIssuance?: number | string | null
	shortTermNetDebtIssuance?: number | string | null
	netStockIssuance?: number | string | null
	netCommonStockIssuance?: number | string | null
	commonStockIssuance: number | string | null
	commonStockRepurchased: number | string | null
	netPreferredStockIssuance?: number | string | null
	netDividendsPaid: number | string | null
	commonDividendsPaid?: number | string | null
	preferredDividendsPaid?: number | string | null
	otherFinancingActivities: number | string | null
	netCashProvidedByFinancingActivities: number | string | null
	effectOfForexChangesOnCash: number | string | null
	netChangeInCash: number | string | null
	cashAtEndOfPeriod: number | string | null
	cashAtBeginningOfPeriod: number | string | null
	operatingCashFlow: number | string | null
	capitalExpenditure: number | string | null
	freeCashFlow: number | string | null
	incomeTaxesPaid?: number | string | null
	interestPaid?: number | string | null
}

export interface LatestFinancialStatementMeta {
	symbol: string
	calendarYear: number
	period: string
	date: string
	dateAdded: string
}

export interface KeyMetrics {
	symbol: string
	date: string
	fiscalYear: string
	period: FinancialPeriod
	reportedCurrency: string | null
	marketCap: number | null
	enterpriseValue: number | null
	evToSales: number | null
	evToOperatingCashFlow: number | null
	evToFreeCashFlow: number | null
	evToEBITDA: number | null
	netDebtToEBITDA: number | null
	currentRatio: number | null
	incomeQuality: number | null
	grahamNumber: number | null
	grahamNetNet: number | null
	taxBurden: number | null
	interestBurden: number | null
	workingCapital: number | null
	investedCapital: number | null
	returnOnAssets: number | null
	operatingReturnOnAssets: number | null
	returnOnTangibleAssets: number | null
	returnOnEquity: number | null
	returnOnInvestedCapital: number | null
	returnOnCapitalEmployed: number | null
	earningsYield: number | null
	freeCashFlowYield: number | null
	capexToOperatingCashFlow: number | null
	capexToDepreciation: number | null
	capexToRevenue: number | null
	salesGeneralAndAdministrativeToRevenue: number | null
	researchAndDevelopementToRevenue: number | null
	stockBasedCompensationToRevenue: number | null
	intangiblesToTotalAssets: number | null
	averageReceivables: number | null
	averagePayables: number | null
	averageInventory: number | null
	daysOfSalesOutstanding: number | null
	daysOfPayablesOutstanding: number | null
	daysOfInventoryOutstanding: number | null
	operatingCycle: number | null
	cashConversionCycle: number | null
	freeCashFlowToEquity: number | null
	freeCashFlowToFirm: number | null
	tangibleAssetValue: number | null
	netCurrentAssetValue: number | null
}

export interface FinancialRatios {
	symbol: string
	date: string
	fiscalYear: string
	period: FinancialPeriod
	reportedCurrency: string | null
	grossProfitMargin: number | null
	ebitMargin: number | null
	ebitdaMargin: number | null
	operatingProfitMargin: number | null
	pretaxProfitMargin: number | null
	continuousOperationsProfitMargin: number | null
	netProfitMargin: number | null
	bottomLineProfitMargin: number | null
	receivablesTurnover: number | null
	payablesTurnover: number | null
	inventoryTurnover: number | null
	fixedAssetTurnover: number | null
	assetTurnover: number | null
	currentRatio: number | null
	quickRatio: number | null
	solvencyRatio: number | null
	cashRatio: number | null
	priceToEarningsRatio: number | null
	priceToEarningsGrowthRatio: number | null
	forwardPriceToEarningsGrowthRatio: number | null
	priceToBookRatio: number | null
	priceToSalesRatio: number | null
	priceToFreeCashFlowRatio: number | null
	priceToOperatingCashFlowRatio: number | null
	debtToAssetsRatio: number | null
	debtToEquityRatio: number | null
	debtToCapitalRatio: number | null
	longTermDebtToCapitalRatio: number | null
	financialLeverageRatio: number | null
	workingCapitalTurnoverRatio: number | null
	operatingCashFlowRatio: number | null
	operatingCashFlowSalesRatio: number | null
	freeCashFlowOperatingCashFlowRatio: number | null
	debtServiceCoverageRatio: number | null
	interestCoverageRatio: number | null
	shortTermOperatingCashFlowCoverageRatio: number | null
	operatingCashFlowCoverageRatio: number | null
	capitalExpenditureCoverageRatio: number | null
	dividendPaidAndCapexCoverageRatio: number | null
	dividendPayoutRatio: number | null
	dividendYield: number | null
	dividendYieldPercentage: number | null
	revenuePerShare: number | null
	netIncomePerShare: number | null
	interestDebtPerShare: number | null
	cashPerShare: number | null
	bookValuePerShare: number | null
	tangibleBookValuePerShare: number | null
	shareholdersEquityPerShare: number | null
	operatingCashFlowPerShare: number | null
	capexPerShare: number | null
	freeCashFlowPerShare: number | null
	netIncomePerEBT: number | null
	ebtPerEbit: number | null
	priceToFairValue: number | null
	debtToMarketCap: number | null
	effectiveTaxRate: number | null
	enterpriseValueMultiple: number | null
}

export interface KeyMetricsTTM {
	symbol: string
	marketCap?: string | number | null
	marketCapTTM?: string | number | null
	enterpriseValueTTM: string | number | null
	evToSalesTTM: string | number | null
	evToOperatingCashFlowTTM: string | number | null
	evToFreeCashFlowTTM: string | number | null
	evToEBITDATTM: string | number | null
	netDebtToEBITDATTM: string | number | null
	currentRatioTTM: string | number | null
	incomeQualityTTM: string | number | null
	grahamNumberTTM: string | number | null
	grahamNetNetTTM: string | number | null
	taxBurdenTTM: string | number | null
	interestBurdenTTM: string | number | null
	workingCapitalTTM: string | number | null
	investedCapitalTTM: string | number | null
	returnOnAssetsTTM: string | number | null
	operatingReturnOnAssetsTTM: string | number | null
	returnOnTangibleAssetsTTM: string | number | null
	returnOnEquityTTM: string | number | null
	returnOnInvestedCapitalTTM: string | number | null
	returnOnCapitalEmployedTTM: string | number | null
	earningsYieldTTM: string | number | null
	freeCashFlowYieldTTM: string | number | null
	capexToOperatingCashFlowTTM: string | number | null
	capexToDepreciationTTM: string | number | null
	capexToRevenueTTM: string | number | null
	salesGeneralAndAdministrativeToRevenueTTM: string | number | null
	researchAndDevelopementToRevenueTTM: string | number | null
	stockBasedCompensationToRevenueTTM: string | number | null
	intangiblesToTotalAssetsTTM: string | number | null
	averageReceivablesTTM: string | number | null
	averagePayablesTTM: string | number | null
	averageInventoryTTM: string | number | null
	daysOfSalesOutstandingTTM: string | number | null
	daysOfPayablesOutstandingTTM: string | number | null
	daysOfInventoryOutstandingTTM: string | number | null
	operatingCycleTTM: string | number | null
	cashConversionCycleTTM: string | number | null
	freeCashFlowToEquityTTM: string | number | null
	freeCashFlowToFirmTTM: string | number | null
	tangibleAssetValueTTM: string | number | null
	netCurrentAssetValueTTM: string | number | null
}

export interface FinancialRatiosTTM {
	symbol: string
	grossProfitMarginTTM: string | number | null
	ebitMarginTTM: string | number | null
	ebitdaMarginTTM: string | number | null
	operatingProfitMarginTTM: string | number | null
	pretaxProfitMarginTTM: string | number | null
	continuousOperationsProfitMarginTTM: string | number | null
	netProfitMarginTTM: string | number | null
	bottomLineProfitMarginTTM: string | number | null
	receivablesTurnoverTTM: string | number | null
	payablesTurnoverTTM: string | number | null
	inventoryTurnoverTTM: string | number | null
	fixedAssetTurnoverTTM: string | number | null
	assetTurnoverTTM: string | number | null
	currentRatioTTM: string | number | null
	quickRatioTTM: string | number | null
	solvencyRatioTTM: string | number | null
	cashRatioTTM: string | number | null
	priceToEarningsRatioTTM: string | number | null
	priceToEarningsGrowthRatioTTM: string | number | null
	forwardPriceToEarningsGrowthRatioTTM?: string | number | null
	priceToBookRatioTTM: string | number | null
	priceToSalesRatioTTM: string | number | null
	priceToFreeCashFlowRatioTTM: string | number | null
	priceToOperatingCashFlowRatioTTM: string | number | null
	debtToAssetsRatioTTM: string | number | null
	debtToEquityRatioTTM: string | number | null
	debtToCapitalRatioTTM: string | number | null
	longTermDebtToCapitalRatioTTM: string | number | null
	financialLeverageRatioTTM: string | number | null
	workingCapitalTurnoverRatioTTM: string | number | null
	operatingCashFlowRatioTTM: string | number | null
	operatingCashFlowSalesRatioTTM: string | number | null
	freeCashFlowOperatingCashFlowRatioTTM: string | number | null
	debtServiceCoverageRatioTTM: string | number | null
	interestCoverageRatioTTM: string | number | null
	shortTermOperatingCashFlowCoverageRatioTTM: string | number | null
	operatingCashFlowCoverageRatioTTM: string | number | null
	capitalExpenditureCoverageRatioTTM: string | number | null
	dividendPaidAndCapexCoverageRatioTTM: string | number | null
	dividendPayoutRatioTTM: string | number | null
	dividendYieldTTM: string | number | null
	dividendYieldPercentageTTM?: string | number | null
	enterpriseValueTTM?: string | number | null
	revenuePerShareTTM: string | number | null
	netIncomePerShareTTM: string | number | null
	interestDebtPerShareTTM: string | number | null
	cashPerShareTTM: string | number | null
	bookValuePerShareTTM: string | number | null
	tangibleBookValuePerShareTTM: string | number | null
	shareholdersEquityPerShareTTM: string | number | null
	operatingCashFlowPerShareTTM: string | number | null
	capexPerShareTTM: string | number | null
	freeCashFlowPerShareTTM: string | number | null
	netIncomePerEBTTTM: string | number | null
	ebtPerEbitTTM: string | number | null
	priceToFairValueTTM: string | number | null
	debtToMarketCapTTM: string | number | null
	effectiveTaxRateTTM: string | number | null
	enterpriseValueMultipleTTM: string | number | null
}

export interface FinancialScores {
	symbol: string
	reportedCurrency: string | null
	altmanZScore: string | number | null
	piotroskiScore: string | number | null
	workingCapital: string | number | null
	totalAssets: string | number | null
	retainedEarnings: string | number | null
	ebit: string | number | null
	marketCap: string | number | null
	totalLiabilities: string | number | null
	revenue: string | number | null
}

export interface OwnerEarnings {
	symbol: string
	reportedCurrency: string | null
	fiscalYear: string
	period: string
	date: string
	averagePPE: number | null
	maintenanceCapex: number | null
	ownersEarnings: number | null
	growthCapex: number | null
	ownersEarningsPerShare: number | null
}

export interface EnterpriseValue {
	symbol: string
	date: string
	stockPrice: number | null
	numberOfShares: number | null
	marketCapitalization: number | null
	minusCashAndCashEquivalents: number | null
	addTotalDebt: number | null
	enterpriseValue: number | null
}

export interface IncomeStatementGrowth {
	symbol: string
	date: string
	fiscalYear: string
	period: FinancialPeriod
	reportedCurrency: string | null
	growthRevenue: number | null
	growthCostOfRevenue: number | null
	growthGrossProfit: number | null
	growthGrossProfitRatio: number | null
	growthResearchAndDevelopmentExpenses: number | null
	growthGeneralAndAdministrativeExpenses: number | null
	growthSellingAndMarketingExpenses: number | null
	growthOtherExpenses: number | null
	growthOperatingExpenses: number | null
	growthCostAndExpenses: number | null
	growthInterestIncome?: number | null
	growthInterestExpense?: number | null
	growthDepreciationAndAmortization: number | null
	growthEBITDA: number | null
	growthOperatingIncome: number | null
	growthIncomeBeforeTax: number | null
	growthIncomeTaxExpense: number | null
	growthNetIncome: number | null
	growthEPS: number | null
	growthEPSDiluted: number | null
	growthWeightedAverageShsOut: number | null
	growthWeightedAverageShsOutDil: number | null
	growthEBIT?: number | null
	growthNonOperatingIncomeExcludingInterest?: number | null
	growthNetInterestIncome?: number | null
	growthTotalOtherIncomeExpensesNet?: number | null
	growthNetIncomeFromContinuingOperations?: number | null
	growthOtherAdjustmentsToNetIncome?: number | null
	growthNetIncomeDeductions?: number | null
}

export interface BalanceSheetStatementGrowth {
	symbol: string
	date: string
	fiscalYear: string
	period: FinancialPeriod
	reportedCurrency: string | null
	growthCashAndCashEquivalents: number | null
	growthShortTermInvestments: number | null
	growthCashAndShortTermInvestments: number | null
	growthNetReceivables: number | null
	growthInventory: number | null
	growthOtherCurrentAssets: number | null
	growthTotalCurrentAssets: number | null
	growthPropertyPlantEquipmentNet: number | null
	growthGoodwill: number | null
	growthIntangibleAssets: number | null
	growthGoodwillAndIntangibleAssets: number | null
	growthLongTermInvestments: number | null
	growthTaxAssets: number | null
	growthOtherNonCurrentAssets: number | null
	growthTotalNonCurrentAssets: number | null
	growthOtherAssets: number | null
	growthTotalAssets: number | null
	growthAccountPayables: number | null
	growthShortTermDebt: number | null
	growthTaxPayables: number | null
	growthDeferredRevenue: number | null
	growthOtherCurrentLiabilities: number | null
	growthTotalCurrentLiabilities: number | null
	growthLongTermDebt: number | null
	growthDeferredRevenueNonCurrent: number | null
	growthDeferredTaxLiabilitiesNonCurrent: number | null
	growthOtherNonCurrentLiabilities: number | null
	growthTotalNonCurrentLiabilities: number | null
	growthOtherLiabilities: number | null
	growthTotalLiabilities: number | null
	growthPreferredStock: number | null
	growthCommonStock: number | null
	growthRetainedEarnings: number | null
	growthAccumulatedOtherComprehensiveIncomeLoss: number | null
	growthOthertotalStockholdersEquity: number | null
	growthTotalStockholdersEquity: number | null
	growthMinorityInterest: number | null
	growthTotalEquity: number | null
	growthTotalLiabilitiesAndStockholdersEquity: number | null
	growthTotalInvestments: number | null
	growthTotalDebt: number | null
	growthNetDebt: number | null
	growthAccountsReceivables?: number | null
	growthOtherReceivables?: number | null
	growthPrepaids?: number | null
	growthTotalPayables?: number | null
	growthOtherPayables?: number | null
	growthAccruedExpenses?: number | null
	growthCapitalLeaseObligationsCurrent?: number | null
	growthAdditionalPaidInCapital?: number | null
	growthTreasuryStock?: number | null
}

export interface CashFlowStatementGrowth {
	symbol: string
	date: string
	fiscalYear: string
	period: FinancialPeriod
	reportedCurrency: string | null
	growthNetIncome: number | null
	growthDepreciationAndAmortization: number | null
	growthDeferredIncomeTax: number | null
	growthStockBasedCompensation: number | null
	growthChangeInWorkingCapital: number | null
	growthAccountsReceivables: number | null
	growthInventory: number | null
	growthAccountsPayables: number | null
	growthOtherWorkingCapital: number | null
	growthOtherNonCashItems: number | null
	growthNetCashProvidedByOperatingActivites: number | null
	growthInvestmentsInPropertyPlantAndEquipment: number | null
	growthAcquisitionsNet: number | null
	growthPurchasesOfInvestments: number | null
	growthSalesMaturitiesOfInvestments: number | null
	growthOtherInvestingActivites: number | null
	growthNetCashUsedForInvestingActivites: number | null
	growthDebtRepayment?: number | null
	growthCommonStockIssued?: number | null
	growthCommonStockRepurchased?: number | null
	growthDividendsPaid?: number | null
	growthOtherFinancingActivites: number | null
	growthNetCashUsedProvidedByFinancingActivities: number | null
	growthEffectOfForexChangesOnCash: number | null
	growthNetChangeInCash: number | null
	growthCashAtEndOfPeriod: number | null
	growthCashAtBeginningOfPeriod: number | null
	growthOperatingCashFlow: number | null
	growthCapitalExpenditure: number | null
	growthFreeCashFlow: number | null
	growthNetDebtIssuance?: number | null
	growthLongTermNetDebtIssuance?: number | null
	growthShortTermNetDebtIssuance?: number | null
	growthNetStockIssuance?: number | null
	growthPreferredDividendsPaid?: number | null
	growthIncomeTaxesPaid?: number | null
	growthInterestPaid?: number | null
}

export interface FinancialStatementGrowth {
	symbol: string
	date: string
	fiscalYear: string
	period: FinancialPeriod
	reportedCurrency: string | null
	revenueGrowth: number | null
	grossProfitGrowth: number | null
	ebitgrowth: number | null
	operatingIncomeGrowth: number | null
	netIncomeGrowth: number | null
	epsgrowth: number | null
	epsdilutedGrowth: number | null
	weightedAverageSharesGrowth: number | null
	weightedAverageSharesDilutedGrowth: number | null
	dividendsPerShareGrowth: number | null
	operatingCashFlowGrowth: number | null
	receivablesGrowth: number | null
	inventoryGrowth: number | null
	assetGrowth: number | null
	bookValueperShareGrowth: number | null
	debtGrowth: number | null
	rdexpenseGrowth: number | null
	sgaexpensesGrowth: number | null
	freeCashFlowGrowth: number | null
	tenYRevenueGrowthPerShare: number | null
	fiveYRevenueGrowthPerShare: number | null
	threeYRevenueGrowthPerShare: number | null
	tenYOperatingCFGrowthPerShare: number | null
	fiveYOperatingCFGrowthPerShare: number | null
	threeYOperatingCFGrowthPerShare: number | null
	tenYNetIncomeGrowthPerShare: number | null
	fiveYNetIncomeGrowthPerShare: number | null
	threeYNetIncomeGrowthPerShare: number | null
	tenYShareholdersEquityGrowthPerShare: number | null
	fiveYShareholdersEquityGrowthPerShare: number | null
	threeYShareholdersEquityGrowthPerShare: number | null
	tenYDividendperShareGrowthPerShare: number | null
	fiveYDividendperShareGrowthPerShare: number | null
	threeYDividendperShareGrowthPerShare: number | null
	ebitdaGrowth: number | null
	growthCapitalExpenditure: number | null
	tenYBottomLineNetIncomeGrowthPerShare: number | null
	fiveYBottomLineNetIncomeGrowthPerShare: number | null
	threeYBottomLineNetIncomeGrowthPerShare: number | null
}

export interface FinancialReportDateLinks {
	symbol: string
	fiscalYear: number
	period: string
	linkXlsx: string | null
	linkJson: string | null
}

export interface FinancialReportFullJson {
	symbol: string
	period: string
	year: string
	data: FullAsReportedFinancialStatementData
}

export interface RevenueSegmentation {
	symbol: string
	fiscalYear: number
	period: string
	reportedCurrency: string | null
	date: string
	data: Record<string, number> // Keys are dynamic (product/segment names)
}

// Specific data structure for As Reported Income Statement
export interface AsReportedIncomeStatementData {
	revenuefromcontractwithcustomerexcludingassessedtax?: number | null
	costofgoodsandservicessold?: number | null
	grossprofit?: number | null
	researchanddevelopmentexpense?: number | null
	sellinggeneralandadministrativeexpense?: number | null
	operatingexpenses?: number | null
	operatingincomeloss?: number | null
	nonoperatingincomeexpense?: number | null
	incomelossfromcontinuingoperationsbeforeincometaxesextraordinaryitemsnoncontrollinginterest?: number | null
	incometaxexpensebenefit?: number | null
	netincomeloss?: number | null
	earningspersharebasic?: number | null
	earningspersharediluted?: number | null
	weightedaveragenumberofsharesoutstandingbasic?: number | null
	weightedaveragenumberofdilutedsharesoutstanding?: number | null
	othercomprehensiveincomelossforeigncurrencytransactionandtranslationadjustmentnetoftax?: number | null
	othercomprehensiveincomelossderivativeinstrumentgainlossbeforereclassificationaftertax?: number | null
	othercomprehensiveincomelossderivativeinstrumentgainlossreclassificationaftertax?: number | null
	othercomprehensiveincomelossderivativeinstrumentgainlossafterreclassificationandtax?: number | null
	othercomprehensiveincomeunrealizedholdinggainlossonsecuritiesarisingduringperiodnetoftax?: number | null
	othercomprehensiveincomelossreclassificationadjustmentfromaociforsaleofsecuritiesnetoftax?: number | null
	othercomprehensiveincomelossavailableforsalesecuritiesadjustmentnetoftax?: number | null
	othercomprehensiveincomelossnetoftaxportionattributabletoparent?: number | null
	comprehensiveincomenetoftax?: number | null
	interestincome?: number | null
	interestexpense?: number | null
	depreciationandamortization?: number | null
	ebitda?: number | null
	ebit?: number | null
}

// Specific data structure for As Reported Balance Sheet Statement
export interface AsReportedBalanceSheetData {
	cashandcashequivalentsatcarryingvalue?: number | null
	marketablesecuritiescurrent?: number | null
	accountsreceivablenetcurrent?: number | null
	nontradereceivablescurrent?: number | null
	inventorynet?: number | null
	otherassetscurrent?: number | null
	assetscurrent?: number | null
	marketablesecuritiesnoncurrent?: number | null
	propertyplantandequipmentnet?: number | null
	goodwill?: number | null
	intangibleassetsnet?: number | null
	otherassetsnoncurrent?: number | null
	assetsnoncurrent?: number | null
	assets?: number | null
	accountspayablecurrent?: number | null
	otherliabilitiescurrent?: number | null
	contractwithcustomerliabilitycurrent?: number | null
	commercialpaper?: number | null
	longtermdebtcurrent?: number | null // Represents current portion of long-term debt or short-term debt
	shorttermdebt?: number | null
	liabilitiescurrent?: number | null
	longtermdebtnoncurrent?: number | null
	otherliabilitiesnoncurrent?: number | null
	liabilitiesnoncurrent?: number | null
	liabilities?: number | null
	commonstocksharesoutstanding?: number | null
	commonstocksharesissued?: number | null
	commonstockvalue?: number | null // Par value of common stock
	additionalpaidincapital?: number | null
	commonstocksincludingadditionalpaidincapital?: number | null // Sum of commonstockvalue and additionalpaidincapital
	retainedearningsaccumulateddeficit?: number | null
	treasurystockvalue?: number | null
	accumulatedothercomprehensiveincomelossnetoftax?: number | null
	stockholdersequity?: number | null // Total Equity
	liabilitiesandstockholdersequity?: number | null
	commonstockparorstatedvaluepershare?: number | null
	commonstocksharesauthorized?: number | null
	preferredstockvalue?: number | null
	deferredtaxliabilitiesnoncurrent?: number | null
}

// Specific data structure for As Reported Cash Flow Statement
export interface AsReportedCashFlowData {
	cashcashequivalentsrestrictedcashandrestrictedcashequivalents?: number | null // End of period cash
	netincomeloss?: number | null
	depreciationdepletionandamortization?: number | null
	sharebasedcompensation?: number | null
	deferredincometaxexpensebenefit?: number | null
	othernoncashincomeexpense?: number | null
	increasedecreaseinaccountsreceivable?: number | null
	increasedecreaseinotherreceivables?: number | null
	increasedecreaseininventories?: number | null
	increasedecreaseinotheroperatingassets?: number | null
	increasedecreaseinaccountspayable?: number | null
	increasedecreaseinotheroperatingliabilities?: number | null
	netcashprovidedbyusedinoperatingactivities?: number | null
	paymentstoacquirepropertyplantandequipment?: number | null // Capital Expenditures
	acquisitionsnet?: number | null
	purchaseofinvestments?: number | null
	salesmaturitiesofinvestments?: number | null
	paymentstoacquireavailableforsalesecuritiesdebt?: number | null
	proceedsfrommaturitiesprepaymentsandcallsofavailableforsalesecurities?: number | null
	proceedsfromsaleofavailableforsalesecuritiesdebt?: number | null
	paymentsforproceedsfromotherinvestingactivities?: number | null
	netcashprovidedbyusedininvestingactivities?: number | null
	proceedsfromissuanceofcommonstock?: number | null
	paymentsforrepurchaseofcommonstock?: number | null
	proceedsfromissuanceoflongtermdebt?: number | null
	repaymentsoflongtermdebt?: number | null
	proceedsfromissuanceofshorttermdebt?: number | null
	repaymentsofshorttermdebt?: number | null
	proceedsfromrepaymentsofcommercialpaper?: number | null // Can be issuance or repayment depending on sign
	paymentsofdividends?: number | null
	paymentsrelatedtotaxwithholdingforsharebasedcompensation?: number | null
	proceedsfrompaymentsforotherfinancingactivities?: number | null
	netcashprovidedbyusedinfinancingactivities?: number | null
	effectofforeigncurrencyexchangeratesoncash?: number | null
	cashcashequivalentsrestrictedcashandrestrictedcashequivalentsperiodincreasedecreaseincludingexchangerateeffect?: number | null // Net change in cash
	cashcashequivalentsrestrictedcashandrestrictedcashequivalentsatbeginningofperiod?: number | null
	incometaxespaidnet?: number | null
	interestpaidnet?: number | null
}

export interface AsReportedFinancialStatement {
	symbol: string
	fiscalYear: number | string
	period: string
	reportedCurrency: string | null
	date: string
	data: AsReportedIncomeStatementData | AsReportedBalanceSheetData | AsReportedCashFlowData
}

// Specific data structure for the "data" field in FullAsReportedFinancialStatement
export interface FullAsReportedFinancialStatementData {
	documenttype?: string | null
	documentannualreport?: string | boolean | null
	currentfiscalyearenddate?: string | null
	documentperiodenddate?: string | null
	documenttransitionreport?: string | boolean | null
	entityfilenumber?: string | null
	entityregistrantname?: string | null
	entityincorporationstatecountrycode?: string | null
	entitytaxidentificationnumber?: string | null
	entityaddressaddressline1?: string | null
	entityaddresscityortown?: string | null
	entityaddressstateorprovince?: string | null
	entityaddresspostalzipcode?: string | number | null
	cityareacode?: string | number | null
	localphonenumber?: string | null
	security12btitle?: string | null
	tradingsymbol?: string | null
	notradingsymbolflag?: string | boolean | null
	securityexchangename?: string | null
	entitywellknownseasonedissuer?: string | boolean | null
	entityvoluntaryfilers?: string | boolean | null
	entitycurrentreportingstatus?: string | boolean | null
	entityinteractivedatacurrent?: string | boolean | null
	entityfilercategory?: string | null
	entitysmallbusiness?: string | boolean | null
	entityemerginggrowthcompany?: string | boolean | null
	icfrauditorattestationflag?: string | boolean | null
	documentfinstmterrorcorrectionflag?: string | boolean | null
	entityshellcompany?: string | boolean | null
	amendmentflag?: string | boolean | null
	documentfiscalyearfocus?: number | null
	documentfiscalperiodfocus?: string | null
	entitycentralindexkey?: string | null // Standardized as string
	auditorname?: string | null
	auditorlocation?: string | null
	auditorfirmid?: string | number | null

	// Merged fields from AsReportedIncomeStatementData
	revenuefromcontractwithcustomerexcludingassessedtax?: number | null
	costofgoodsandservicessold?: number | null
	grossprofit?: number | null
	researchanddevelopmentexpense?: number | null
	sellinggeneralandadministrativeexpense?: number | null
	operatingexpenses?: number | null
	operatingincomeloss?: number | null
	nonoperatingincomeexpense?: number | null
	incomelossfromcontinuingoperationsbeforeincometaxesextraordinaryitemsnoncontrollinginterest?: number | null
	incometaxexpensebenefit?: number | null
	netincomeloss?: number | null
	earningspersharebasic?: number | null
	earningspersharediluted?: number | null
	weightedaveragenumberofsharesoutstandingbasic?: number | null
	weightedaveragenumberofdilutedsharesoutstanding?: number | null
	othercomprehensiveincomelossforeigncurrencytransactionandtranslationadjustmentnetoftax?: number | null
	othercomprehensiveincomelossderivativeinstrumentgainlossbeforereclassificationaftertax?: number | null
	othercomprehensiveincomelossderivativeinstrumentgainlossreclassificationaftertax?: number | null
	othercomprehensiveincomelossderivativeinstrumentgainlossafterreclassificationandtax?: number | null
	othercomprehensiveincomeunrealizedholdinggainlossonsecuritiesarisingduringperiodnetoftax?: number | null
	othercomprehensiveincomelossreclassificationadjustmentfromaociforsaleofsecuritiesnetoftax?: number | null
	othercomprehensiveincomelossavailableforsalesecuritiesadjustmentnetoftax?: number | null
	othercomprehensiveincomelossnetoftaxportionattributabletoparent?: number | null
	comprehensiveincomenetoftax?: number | null

	// Merged fields from AsReportedBalanceSheetData
	cashandcashequivalentsatcarryingvalue?: number | null
	marketablesecuritiescurrent?: number | null
	accountsreceivablenetcurrent?: number | null
	nontradereceivablescurrent?: number | null
	inventorynet?: number | null
	otherassetscurrent?: number | null
	assetscurrent?: number | null
	marketablesecuritiesnoncurrent?: number | null
	propertyplantandequipmentnet?: number | null
	otherassetsnoncurrent?: number | null
	assetsnoncurrent?: number | null
	assets?: number | null
	accountspayablecurrent?: number | null
	otherliabilitiescurrent?: number | null
	contractwithcustomerliabilitycurrent?: number | null
	commercialpaper?: number | null
	longtermdebtcurrent?: number | null
	liabilitiescurrent?: number | null
	longtermdebtnoncurrent?: number | null
	otherliabilitiesnoncurrent?: number | null
	liabilitiesnoncurrent?: number | null
	liabilities?: number | null
	commonstocksharesoutstanding?: number | null
	commonstocksharesissued?: number | null
	commonstocksincludingadditionalpaidincapital?: number | null
	retainedearningsaccumulateddeficit?: number | null
	accumulatedothercomprehensiveincomelossnetoftax?: number | null
	stockholdersequity?: number | null
	liabilitiesandstockholdersequity?: number | null
	commonstockparorstatedvaluepershare?: number | null
	commonstocksharesauthorized?: number | null

	// Merged fields from AsReportedCashFlowData (some are renamed/grouped in the full report)
	cashcashequivalentsrestrictedcashandrestrictedcashequivalents?: number | null // End of period cash
	// netincomeloss (already covered)
	depreciationdepletionandamortization?: number | null
	sharebasedcompensation?: number | null
	othernoncashincomeexpense?: number | null // from CF
	increasedecreaseinaccountsreceivable?: number | null
	increasedecreaseinotherreceivables?: number | null
	increasedecreaseininventories?: number | null
	increasedecreaseinotheroperatingassets?: number | null
	increasedecreaseinaccountspayable?: number | null
	increasedecreaseinotheroperatingliabilities?: number | null
	netcashprovidedbyusedinoperatingactivities?: number | null
	paymentstoacquireavailableforsalesecuritiesdebt?: number | null
	proceedsfrommaturitiesprepaymentsandcallsofavailableforsalesecurities?: number | null
	proceedsfromsaleofavailableforsalesecuritiesdebt?: number | null
	paymentstoacquirepropertyplantandequipment?: number | null
	paymentsforproceedsfromotherinvestingactivities?: number | null
	netcashprovidedbyusedininvestingactivities?: number | null
	paymentsrelatedtotaxwithholdingforsharebasedcompensation?: number | null
	paymentsofdividends?: number | null
	paymentsforrepurchaseofcommonstock?: number | null
	repaymentsoflongtermdebt?: number | null
	proceedsfromrepaymentsofcommercialpaper?: number | null
	proceedsfrompaymentsforotherfinancingactivities?: number | null
	netcashprovidedbyusedinfinancingactivities?: number | null
	cashcashequivalentsrestrictedcashandrestrictedcashequivalentsperiodincreasedecreaseincludingexchangerateeffect?: number | null
	incometaxespaidnet?: number | null

	// Additional detailed fields from the example
	stockissuedduringperiodvaluenewissues?: number | null
	adjustmentsrelatedtotaxwithholdingforsharebasedcompensation?: number | null
	adjustmentstoadditionalpaidincapitalsharebasedcompensationrequisiteserviceperiodrecognitionvalue?: number | null
	dividends?: number | null // Potentially redundant with paymentsofdividends
	stockrepurchasedandretiredduringperiodvalue?: number | null // Potentially redundant
	commonstockdividendspersharedeclared?: number | null
	commercialpapercashflowsummarytabletextblock?: string | null
	contractwithcustomerliabilityrevenuerecognized?: number | null
	contractwithcustomerliability?: number | null
	revenueremainingperformanceobligationpercentage?: number | null
	revenueremainingperformanceobligationexpectedtimingofsatisfactionperiod1?: string | null
	incrementalcommonsharesattributabletosharebasedpaymentarrangements?: number | null
	cash?: number | null
	equitysecuritiesfvnicost?: number | null
	equitysecuritiesfvniaccumulatedgrossunrealizedgainbeforetax?: number | null
	equitysecuritiesfvniaccumulatedgrossunrealizedlossbeforetax?: number | null
	equitysecuritiesfvnicurrentandnoncurrent?: number | null
	availableforsaledebtsecuritiesamortizedcostbasis?: number | null
	availableforsaledebtsecuritiesaccumulatedgrossunrealizedgainbeforetax?: number | null
	availableforsaledebtsecuritiesaccumulatedgrossunrealizedlossbeforetax?: number | null
	availableforsalesecuritiesdebtsecurities?: number | null
	cashcashequivalentsandmarketablesecuritiescost?: number | null
	cashequivalentsandmarketablesecuritiesaccumulatedgrossunrealizedgainbeforetax?: number | null
	cashequivalentsandmarketablesecuritiesaccumulatedgrossunrealizedlossbeforetax?: number | null
	cashcashequivalentsandmarketablesecurities?: number | null
	restrictedcashandcashequivalents?: number | null
	debtsecuritiesavailableforsalerestricted?: number | null
	debtsecuritiesavailableforsalematurityallocatedandsinglematuritydaterollingafteronethroughfiveyearspercentage?: number | null
	debtsecuritiesavailableforsalematurityallocatedandsinglematuritydaterollingafterfivethroughtenyearspercentage?: number | null
	debtsecuritiesavailableforsalematurityallocatedandsinglematuritydaterollingaftertenyearspercentage?: number | null
	maximumlengthoftimeforeigncurrencycashflowhedge?: string | null
	concentrationriskpercentage1?: number | null
	numberofsignificantvendors?: number | null
	derivativenotionalamount?: number | null
	hedgedassetstatementoffinancialpositionextensibleenumeration?: string | null
	hedgedliabilityfairvaluehedge?: number | null
	hedgedliabilitystatementoffinancialpositionextensibleenumeration?: string | null
	propertyplantandequipmentgross?: number | null
	accumulateddepreciationdepletionandamortizationpropertyplantandequipment?: number | null
	depreciation?: number | null // Potentially redundant
	deferredincometaxassetsnet?: number | null
	otherassetsmiscellaneousnoncurrent?: number | null
	accruedincometaxescurrent?: number | null
	otheraccruedliabilitiescurrent?: number | null
	accruedincometaxesnoncurrent?: number | null
	otheraccruedliabilitiesnoncurrent?: number | null
	totalrestrictedcashcashequivalentsandavailableforsaledebtsecurities?: number | null
	currentforeigntaxexpensebenefit?: number | null
	currentfederaltaxexpensebenefit?: number | null
	unrecognizedtaxbenefitsdecreasesresultingfromsettlementswithtaxingauthorities?: number | null
	incomelossfromcontinuingoperationsbeforeincometaxesforeign?: number | null
	effectiveincometaxratereconciliationatfederalstatutoryincometaxrate?: number | null
	deferredtaxassetstaxcreditcarryforwardsforeign?: number | null
	deferredtaxassetstaxcreditcarryforwardsresearch?: number | null
	unrecognizedtaxbenefits?: number | null
	unrecognizedtaxbenefitsthatwouldimpacteffectivetaxrate?: number | null
	decreaseinunrecognizedtaxbenefitsisreasonablypossible?: number | null
	deferredfederalincometaxexpensebenefit?: number | null
	federalincometaxexpensebenefitcontinuingoperations?: number | null
	currentstateandlocaltaxexpensebenefit?: number | null
	deferredstateandlocalincometaxexpensebenefit?: number | null
	stateandlocalincometaxexpensebenefitcontinuingoperations?: number | null
	deferredforeignincometaxexpensebenefit?: number | null
	foreignincometaxexpensebenefitcontinuingoperations?: number | null
	incometaxreconciliationincometaxexpensebenefitatfederalstatutoryincometaxrate?: number | null
	incometaxreconciliationstateandlocalincometaxes?: number | null
	effectiveincometaxratereconciliationimpactofthestateaiddecisionamount?: number | null
	incometaxreconciliationforeignincometaxratedifferential?: number | null
	incometaxreconciliationtaxcreditsresearch?: number | null
	effectiveincometaxratereconciliationsharebasedcompensationexcesstaxbenefitamount?: number | null
	incometaxreconciliationotheradjustments?: number | null
	effectiveincometaxratecontinuingoperations?: number | null
	deferredtaxassetscapitalizedresearchanddevelopment?: number | null
	deferredtaxassetstaxcreditcarryforwards?: number | null
	deferredtaxassetstaxdeferredexpensereservesandaccruals?: number | null
	deferredtaxassetsdeferredincome?: number | null
	deferredtaxassetsleaseliabilities?: number | null
	deferredtaxassetsothercomprehensiveloss?: number | null
	deferredtaxassetsother?: number | null
	deferredtaxassetsgross?: number | null
	deferredtaxassetsvaluationallowance?: number | null
	// deferredtaxassetsnet (already in AsReportedBalanceSheetData)
	deferredtaxliabilitiespropertyplantandequipment?: number | null
	deferredtaxliabilitiesleasingarrangements?: number | null
	deferredtaxliabilitiesminimumtaxonforeignearnings?: number | null
	deferredtaxliabilitiesother?: number | null
	deferredincometaxliabilities?: number | null
	deferredtaxassetsliabilitiesnet?: number | null
	unrecognizedtaxbenefitsincreasesresultingfrompriorperiodtaxpositions?: number | null
	unrecognizedtaxbenefitsdecreasesresultingfrompriorperiodtaxpositions?: number | null
	unrecognizedtaxbenefitsincreasesresultingfromcurrentperiodtaxpositions?: number | null
	unrecognizedtaxbenefitsreductionsresultingfromlapseofapplicablestatuteoflimitations?: number | null
	lesseeoperatingandfinanceleasetermofcontract?: string | null
	operatingleasecost?: number | null
	variableleasecost?: number | null
	operatingleasepayments?: number | null
	rightofuseassetsobtainedinexchangeforoperatingandfinanceleaseliabilities?: number | null
	operatingandfinanceleaseweightedaverageremainingleaseterm?: string | null
	operatingandfinanceleaseweightedaveragediscountratepercent?: number | null
	unrecordedunconditionalpurchaseobligationbalancesheetamount?: number | null
	lesseeoperatingandfinanceleaseleasenotyetcommencedtermofcontract?: string | null
	operatingleaserightofuseasset?: number | null
	operatingleaserightofuseassetstatementoffinancialpositionextensiblelist?: string | null
	financeleaserightofuseasset?: number | null
	financeleaserightofuseassetstatementoffinancialpositionextensiblelist?: string | null
	operatingandfinanceleaserightofuseasset?: number | null
	operatingleaseliabilitycurrent?: number | null
	operatingleaseliabilitycurrentstatementoffinancialpositionextensiblelist?: string | null
	operatingleaseliabilitynoncurrent?: number | null
	operatingleaseliabilitynoncurrentstatementoffinancialpositionextensiblelist?: string | null
	financeleaseliabilitycurrent?: number | null
	financeleaseliabilitycurrentstatementoffinancialpositionextensiblelist?: string | null
	financeleaseliabilitynoncurrent?: number | null
	financeleaseliabilitynoncurrentstatementoffinancialpositionextensiblelist?: string | null
	operatingandfinanceleaseliability?: number | null
	lesseeoperatingleaseliabilitypaymentsduenexttwelvemonths?: number | null
	lesseeoperatingleaseliabilitypaymentsdueyeartwo?: number | null
	lesseeoperatingleaseliabilitypaymentsdueyearthree?: number | null
	lesseeoperatingleaseliabilitypaymentsdueyearfour?: number | null
	lesseeoperatingleaseliabilitypaymentsdueyearfive?: number | null
	lesseeoperatingleaseliabilitypaymentsdueafteryearfive?: number | null
	lesseeoperatingleaseliabilitypaymentsdue?: number | null
	lesseeoperatingleaseliabilityundiscountedexcessamount?: number | null
	operatingleaseliability?: number | null // Total operating lease liability
	financeleaseliabilitypaymentsduenexttwelvemonths?: number | null
	financeleaseliabilitypaymentsdueyeartwo?: number | null
	financeleaseliabilitypaymentsdueyearthree?: number | null
	financeleaseliabilitypaymentsdueyearfour?: number | null
	financeleaseliabilitypaymentsdueyearfive?: number | null
	financeleaseliabilitypaymentsdueafteryearfive?: number | null
	financeleaseliabilitypaymentsdue?: number | null
	financeleaseliabilityundiscountedexcessamount?: number | null
	financeleaseliability?: number | null // Total finance lease liability
	lesseeoperatingandfinanceleaseliabilitytobepaidyearone?: number | null
	lesseeoperatingandfinanceleaseliabilitytobepaidyeartwo?: number | null
	lesseeoperatingandfinanceleaseliabilitytobepaidyearthree?: number | null
	lesseeoperatingandfinanceleaseliabilitytobepaidyearfour?: number | null
	lesseeoperatingandfinanceleaseliabilitytobepaidyearfive?: number | null
	lesseeoperatingandfinanceleaseliabilitytobepaidafteryearfive?: number | null
	lesseeoperatingandfinanceleaseliabilitytobepaid?: number | null
	lesseeoperatingandfinanceleaseliabilityundiscountedexcessamount?: number | null
	debtinstrumentterm?: string | null
	shorttermdebtweightedaverageinterestrate?: number | null
	longtermdebtfairvalue?: number | null
	debtinstrumentcarryingamount?: number | null
	debtinstrumentunamortizeddiscountpremiumanddebtissuancecostsnet?: number | null
	hedgeaccountingadjustmentsrelatedtolongtermdebt?: number | null
	longtermdebt?: number | null // Total long term debt
	debtinstrumentmaturityyearrangestart?: number | null
	debtinstrumentmaturityyearrangeend?: number | null
	debtinstrumentinterestratestatedpercentage?: number | null
	debtinstrumentinterestrateeffectivepercentage?: number | null
	longtermdebtmaturitiesrepaymentsofprincipalinnexttwelvemonths?: number | null
	longtermdebtmaturitiesrepaymentsofprincipalinyeartwo?: number | null
	longtermdebtmaturitiesrepaymentsofprincipalinyearthree?: number | null
	longtermdebtmaturitiesrepaymentsofprincipalinyearfour?: number | null
	longtermdebtmaturitiesrepaymentsofprincipalinyearfive?: number | null
	longtermdebtmaturitiesrepaymentsofprincipalafteryearfive?: number | null
	stockrepurchasedandretiredduringperiodshares?: number | null
	stockissuedduringperiodsharessharebasedpaymentarrangementnetofshareswithheldfortaxes?: number | null
	sharebasedcompensationarrangementbysharebasedpaymentawardawardvestingperiod1?: string | null
	sharebasedcompensationarrangementbysharebasedpaymentawardequityinstrumentsotherthanoptionsnumberofsharesofcommonstockissuedperunituponvesting?: number | null
	sharebasedcompensationarrangementbysharebasedpaymentawardequityinstrumentsotherthanoptionsvestedinperiodtotalfairvalue?: number | null
	sharespaidfortaxwithholdingforsharebasedcompensation?: number | null
	employeeservicesharebasedcompensationnonvestedawardstotalcompensationcostnotyetrecognized?: number | null
	employeeservicesharebasedcompensationnonvestedawardstotalcompensationcostnotyetrecognizedperiodforrecognition1?: string | null
	sharebasedcompensationarrangementbysharebasedpaymentawardequityinstrumentsotherthanoptionsnonvestednumber?: number | null
	sharebasedcompensationarrangementbysharebasedpaymentawardequityinstrumentsotherthanoptionsgrantsinperiod?: number | null
	sharebasedcompensationarrangementbysharebasedpaymentawardequityinstrumentsotherthanoptionsvestedinperiod?: number | null
	sharebasedcompensationarrangementbysharebasedpaymentawardequityinstrumentsotherthanoptionsforfeitedinperiod?: number | null
	sharebasedcompensationarrangementbysharebasedpaymentawardequityinstrumentsotherthanoptionsnonvestedweightedaveragegrantdatefairvalue?: number | null
	sharebasedcompensationarrangementbysharebasedpaymentawardequityinstrumentsotherthanoptionsgrantsinperiodweightedaveragegrantdatefairvalue?: number | null
	sharebasedcompensationarrangementbysharebasedpaymentawardequityinstrumentsotherthanoptionsvestedinperiodweightedaveragegrantdatefairvalue?: number | null
	sharebasedcompensationarrangementbysharebasedpaymentawardequityinstrumentsotherthanoptionsforfeituresweightedaveragegrantdatefairvalue?: number | null
	sharebasedcompensationarrangementbysharebasedpaymentawardequityinstrumentsotherthanoptionsaggregateintrinsicvaluenonvested?: number | null
	allocatedsharebasedcompensationexpense?: number | null
	employeeservicesharebasedcompensationtaxbenefitfromcompensationexpense?: number | null
	unrecordedunconditionalpurchaseobligationbalanceonfirstanniversary?: number | null
	unrecordedunconditionalpurchaseobligationbalanceonsecondanniversary?: number | null
	unrecordedunconditionalpurchaseobligationbalanceonthirdanniversary?: number | null
	unrecordedunconditionalpurchaseobligationbalanceonfourthanniversary?: number | null
	unrecordedunconditionalpurchaseobligationbalanceonfifthanniversary?: number | null
	unrecordedunconditionalpurchaseobligationdueafterfiveyears?: number | null
	othergeneralandadministrativeexpense?: number | null
	// noncurrentassets (already covered as assetsnoncurrent)
	trdarrsecuritiesaggavailamt?: number | null
	insidertrdpoliciesprocadoptedflag?: string | boolean | null
	// Allow any other string keys for future-proofing or unlisted fields
	[key: string]: any
}

export interface FullAsReportedFinancialStatement {
	symbol: string
	fiscalYear: number | string
	period: string
	reportedCurrency: string | null
	date: string
	data: FullAsReportedFinancialStatementData
}

/**
 * ========================================================================
 *           FORM 13F TYPES
 * ========================================================================
 */

export interface InstitutionalOwnershipFiling {
	cik: string
	name: string
	date: string
	filingDate: string
	acceptedDate: string
	formType: string
	link: string // the value of the original 'finalLink'
}

export interface SecFilingExtract {
	date: string
	filingDate: string
	acceptedDate: string
	cik: string
	securityCusip: string
	symbol: string
	nameOfIssuer: string
	shares: number
	titleOfClass: string
	sharesType: string
	putCallShare: string | null
	value: number
	link: string // the value of the original 'finalLink'
}

export interface Form13FFilingDate {
	date: string
	year: number
	quarter: number
}

export interface HolderAnalytics {
	date: string
	cik: string
	filingDate: string
	investorName: string
	symbol: string
	securityName: string
	typeOfSecurity: string
	securityCusip: string
	sharesType: string
	putCallShare: string | null
	investmentDiscretion: string
	industryTitle: string | null
	weight: number | null
	lastWeight: number | null
	changeInWeight: number | null
	changeInWeightPercentage: number | null
	marketValue: number | null
	lastMarketValue: number | null
	changeInMarketValue: number | null
	changeInMarketValuePercentage: number | null
	sharesNumber: number | null
	lastSharesNumber: number | null
	changeInSharesNumber: number | null
	changeInSharesNumberPercentage: number | null
	quarterEndPrice: number | null
	avgPricePaid: number | null
	isNew: boolean | null
	isSoldOut: boolean | null
	ownership: number | null
	lastOwnership: number | null
	changeInOwnership: number | null
	changeInOwnershipPercentage: number | null
	holdingPeriod: number | null
	firstAdded: string | null
	performance: number | null
	performancePercentage: number | null
	lastPerformance: number | null
	changeInPerformance: number | null
	isCountedForPerformance: boolean | null
}

export interface HolderPerformanceSummary {
	date: string
	cik: string
	investorName: string
	portfolioSize: number | null
	securitiesAdded: number | null
	securitiesRemoved: number | null
	marketValue: number | null
	previousMarketValue: number | null
	changeInMarketValue: number | null
	changeInMarketValuePercentage: number | null
	averageHoldingPeriod: number | null
	averageHoldingPeriodTop10: number | null
	averageHoldingPeriodTop20: number | null
	turnover: number | null
	turnoverAlternateSell: number | null
	turnoverAlternateBuy: number | null
	performance: number | null
	performancePercentage: number | null
	lastPerformance: number | null
	changeInPerformance: number | null
	performance1year: number | null
	performancePercentage1year: number | null
	performance3year: number | null
	performancePercentage3year: number | null
	performance5year: number | null
	performancePercentage5year: number | null
	performanceSinceInception: number | null
	performanceSinceInceptionPercentage: number | null
	performanceRelativeToSP500Percentage: number | null
	performance1yearRelativeToSP500Percentage: number | null
	performance3yearRelativeToSP500Percentage: number | null
	performance5yearRelativeToSP500Percentage: number | null
	performanceSinceInceptionRelativeToSP500Percentage: number | null
}

export interface HolderIndustryBreakdown {
	date: string
	cik: string
	investorName: string
	industryTitle: string
	weight: number | null
	lastWeight: number | null
	changeInWeight: number | null
	changeInWeightPercentage: number | null
	performance: number | null
	performancePercentage: number | null
	lastPerformance: number | null
	changeInPerformance: number | null
}

export interface SymbolPositionSummary {
	symbol: string
	cik: string
	date: string
	investorsHolding: number | null
	lastInvestorsHolding: number | null
	investorsHoldingChange: number | null
	numberOf13Fshares: number | null
	lastNumberOf13Fshares: number | null
	numberOf13FsharesChange: number | null
	totalInvested: number | null
	lastTotalInvested: number | null
	totalInvestedChange: number | null
	ownershipPercent: number | null
	lastOwnershipPercent: number | null
	ownershipPercentChange: number | null
	newPositions: number | null
	lastNewPositions: number | null
	newPositionsChange: number | null
	increasedPositions: number | null
	lastIncreasedPositions: number | null
	increasedPositionsChange: number | null
	closedPositions: number | null
	lastClosedPositions: number | null
	closedPositionsChange: number | null
	reducedPositions: number | null
	lastReducedPositions: number | null
	reducedPositionsChange: number | null
	totalCalls: number | null
	lastTotalCalls: number | null
	totalCallsChange: number | null
	totalPuts: number | null
	lastTotalPuts: number | null
	totalPutsChange: number | null
	putCallRatio: number | null
	lastPutCallRatio: number | null
	putCallRatioChange: number | null
}

export interface IndustryPerformanceSummary {
	industryTitle: string
	industryValue: number | null
	date: string
}

/**
 * ========================================================================
 *           INDEXES TYPES
 * ========================================================================
 */

export interface IndexListItem {
	symbol: string
	name: string
	exchange: string | null
	currency: string | null
}

export interface IndexQuote extends BaseQuote { }

export interface IndexQuoteShort extends BaseQuoteShort { }

export interface IndexConstituent {
	symbol: string
	name: string
	sector: string | null
	subSector: string | null
	headQuarter: string | null
	dateFirstAdded: string | null
	cik: string | null
	founded: string | null
}

export interface HistoricalIndexConstituentChange {
	dateAdded: string
	addedSecurity: string
	removedTicker: string | null
	removedSecurity: string | null
	date: string
	symbol: string
	reason: string | null
}

/**
 * ========================================================================
 *           INSIDER TRADES TYPES
 * ========================================================================
 */

export interface InsiderTrade {
	symbol: string
	filingDate: string
	transactionDate: string
	reportingCik: string
	companyCik: string
	transactionType: string
	securitiesOwned: number
	reportingName: string
	typeOfOwner: string
	acquisitionOrDisposition: string
	directOrIndirect: string
	formType: string
	securitiesTransacted: number
	price: number
	securityName: string
	url: string
}

export interface InsiderReportingName {
	reportingCik: string
	reportingName: string
}

export interface InsiderTransactionType {
	transactionType: string
}

export interface InsiderTradeStatistics {
	symbol: string
	cik: string
	year: number
	quarter: number
	acquiredTransactions: number | null
	disposedTransactions: number | null
	acquiredDisposedRatio: number | null
	totalAcquired: number | null
	totalDisposed: number | null
	averageAcquired: number | null
	averageDisposed: number | null
	totalPurchases: number | null
	totalSales: number | null
}

export interface AcquisitionOwnership {
	cik: string
	symbol: string
	filingDate: string
	acceptedDate: string
	cusip: string
	nameOfReportingPerson: string
	citizenshipOrPlaceOfOrganization: string
	soleVotingPower: string | number
	sharedVotingPower: string | number
	soleDispositivePower: string | number
	sharedDispositivePower: string | number
	amountBeneficiallyOwned: string | number
	percentOfClass: string | number
	typeOfReportingPerson: string
	url: string
}

/**
 * ========================================================================
 *           MARKET PERFORMANCE TYPES
 * ========================================================================
 */

export interface MarketSectorPerformance {
	date: string
	sector: string
	exchange: string
	averageChange: number
}

export interface MarketIndustryPerformance {
	date: string // YYYY-MM-DD
	industry: string
	exchange: string
	averageChange: number
}

export interface MarketSectorPE {
	date: string // YYYY-MM-DD
	sector: string
	exchange: string
	pe: number
}

export interface MarketIndustryPE {
	date: string // YYYY-MM-DD
	industry: string
	exchange: string
	pe: number
}

export interface MarketMover {
	symbol: string
	price: number
	name: string
	change: number
	changesPercentage: number
	exchange: string
}

/**
 * ========================================================================
 *           MARKET HOURS TYPES
 * ========================================================================
 */

export interface ExchangeMarketHours {
	exchange: string
	name: string
	openingHour: string
	closingHour: string
	timezone: string
	isMarketOpen: boolean
}

/**
 * ========================================================================
 *           NEWS TYPES
 * ========================================================================
 */

export interface FmpArticle {
	title: string
	date: string // DateTime string
	content: string // HTML content
	tickers: string | null
	image: string | null
	link: string
	author: string | null
	site: string
}

export interface GeneralNewsArticle {
	symbol: string | null
	publishedDate: string // DateTime string
	publisher: string
	title: string
	image: string | null
	site: string
	text: string
	url: string
}

/**
 * ========================================================================
 *           TECHNICAL INDICATORS TYPES
 * ========================================================================
 */

export interface SmaPoint extends BaseChartItem { sma: number }
export interface EmaPoint extends BaseChartItem { ema: number }
export interface WmaPoint extends BaseChartItem { wma: number }
export interface DemaPoint extends BaseChartItem { dema: number }
export interface TemaPoint extends BaseChartItem { tema: number }
export interface RsiPoint extends BaseChartItem { rsi: number }
export interface StandardDeviationPoint extends BaseChartItem { standardDeviation: number }
export interface WilliamsPoint extends BaseChartItem { williams: number }
export interface AdxPoint extends BaseChartItem { adx: number }

/**
 * ========================================================================
 *           QUOTE TYPES
 * ========================================================================
 */

export interface StockQuote extends BaseQuote {
	// Inherits all from BaseQuote
	// Stock-specific fields are already in BaseQuote (eps, pe, etc.)
	// Example response for /quote?symbol=AAPL
	// {
	//   "symbol": "AAPL",
	//   "name": "Apple Inc.",
	//   "price": 232.8,
	//   "changePercentage": 2.1008,
	//   "change": 4.79,
	//   "volume": 44489128,
	//   "dayLow": 226.65,
	//   "dayHigh": 233.13,
	//   "yearHigh": 260.1,
	//   "yearLow": 164.08,
	//   "marketCap": 3500823120000,
	//   "priceAvg50": 240.2278,
	//   "priceAvg200": 219.98755,
	//   "exchange": "NASDAQ",
	//   "open": 227.2,
	//   "previousClose": 228.01,
	//   "timestamp": 1738702801
	// }
	// Note: avgVolume, eps, pe, earningsAnnouncement, sharesOutstanding are not in this specific example
	// but are part of BaseQuote for broader compatibility.
}

export interface StockQuoteShort extends BaseQuoteShort { }

export interface AftermarketTrade {
	symbol: string
	price: number
	tradeSize: number
	timestamp: number
}

export interface AftermarketQuote {
	symbol: string
	bidSize: number | null
	bidPrice: number | null
	askSize: number | null
	askPrice: number | null
	volume: number | null
	timestamp: number
}

export interface StockPriceChange {
	'symbol': string
	'1D'?: number
	'5D'?: number
	'1M'?: number
	'3M'?: number
	'6M'?: number
	'ytd'?: number
	'1Y'?: number
	'3Y'?: number
	'5Y'?: number
	'10Y'?: number
	'max'?: number
}

export type ExchangeStockQuoteItem = StockQuoteShort
export type MutualFundQuoteShort = StockQuoteShort
export type EtfQuoteShort = StockQuoteShort
// Full quotes for Mutual Funds and ETFs would extend BaseQuote or be similar to StockQuote
// For batch endpoints, if short=false, they would return an array of the full quote type.

/**
 * ========================================================================
 *           EARNINGS TRANSCRIPT TYPES
 * ========================================================================
 */

export interface LatestEarningsTranscriptMeta {
	symbol: string
	period: string // e.g., "Q3"
	fiscalYear: number
	date: string // YYYY-MM-DD
}

export interface EarningsTranscript {
	symbol: string
	period: string
	year: number // or string as per doc example
	date: string // YYYY-MM-DD
	content: string
}

export interface EarningsTranscriptDate {
	quarter: number
	fiscalYear: number
	date: string // YYYY-MM-DD
}

/**
 * ========================================================================
 *           SEC FILINGS TYPES
 * ========================================================================
 */

export interface SecFiling {
	symbol: string | null
	cik: string
	filingDate: string // YYYY-MM-DD HH:MM:SS or YYYY-MM-DD
	acceptedDate: string // DateTime string
	formType: string
	hasFinancials?: boolean
	link: string // the value of the original 'finalLink'
}

export interface SecCompanySearchResult {
	symbol: string | null
	name: string
	cik: string
	sicCode: string | null
	industryTitle: string | null
	businessAddress: string | string[] | null // Can be string or array of strings
	phoneNumber: string | null
}

export interface SecCompanyFullProfile {
	symbol: string
	cik: string
	registrantName: string
	sicCode: string | null
	sicDescription: string | null
	sicGroup: string | null
	isin: string | null
	businessAddress: string | null
	mailingAddress: string | null
	phoneNumber: string | null
	postalCode: string | null
	city: string | null
	state: string | null
	country: string | null
	description: string | null
	ceo: string | null
	website: string | null
	exchange: string | null
	stateLocation: string | null
	stateOfIncorporation: string | null
	fiscalYearEnd: string | null
	ipoDate: string | null
	employees: string | null
	secFilingsUrl: string | null
	taxIdentificationNumber: string | null
	fiftyTwoWeekRange: string | null
	isActive: boolean | null
	assetType: string | null
	openFigiComposite: string | null
	priceCurrency: string | null
	marketSector: string | null
	securityType: string | null
	isEtf: boolean | null
	isAdr: boolean | null
	isFund: boolean | null
}

export interface SicListItem {
	office: string | null
	sicCode: string
	industryTitle: string
}

export interface IndustryClassificationSearchResult {
	symbol: string
	name: string
	cik: string
	sicCode: string
	industryTitle: string
	businessAddress: string | string[] // Example "['ONE APPLE PARK WAY', 'CUPERTINO CA 95014']"
	phoneNumber: string | null
}

/**
 * ========================================================================
 *           SENATE & HOUSE TRADING TYPES
 * ========================================================================
 */

export interface CongressionalDisclosure {
	symbol: string | null
	disclosureDate: string
	transactionDate: string
	firstName: string
	lastName: string
	office: string
	district: string | null
	owner: string | null
	assetDescription: string
	assetType: string
	type: string
	amount: string
	comment: string | null
	link: string
	capitalGainsOver200USD?: string | boolean | null
}

/**
 * ========================================================================
 *           BULK DATA TYPES
 * ========================================================================
 */

// For CompanyProfileBulk, the item type is CompanyProfile.
// export type BulkCompanyProfileItem = CompanyProfile; // Already defined

export interface BulkStockRating {
	symbol: string
	date: string
	rating: string | null
	ratingRecommendation: string | null
	ratingDetailsDCFRecommendation: string | null
	ratingDetailsROERecommendation: string | null
	ratingDetailsROARecommendation: string | null
	ratingDetailsDERecommendation: string | null
	ratingDetailsPERecommendation: string | null
	ratingDetailsPBRecommendation: string | null
}

export interface BulkDcfValuation {
	symbol: string
	date: string
	discountedCashFlow: number | null // Doc example has string, but likely number
	dcfPercentDiff: number | null // Doc example has string, but likely number
}

// For FinancialScoresBulk, the item type is FinancialScores.
// export type BulkFinancialScoreItem = FinancialScores; // Already defined

export interface BulkPriceTargetSummary {
	symbol: string
	lastMonth: string | number | null
	lastMonthAvgPT: string | number | null
	lastMonthAvgPTPercentDif: string | number | null
	lastQuarter: string | number | null
	lastQuarterAvgPT: string | number | null
	lastQuarterAvgPTPercentDif: string | number | null
	lastYear: string | number | null
	lastYearAvgPT: string | number | null
	lastYearAvgPTPercentDif: string | number | null
	allTime: string | number | null
	allTimeAvgPT: string | number | null
	allTimeAvgPTPercentDif: string | number | null
	publishers: string // JSON string of string[]
}

// For EtfHolderBulk, the item type is EtfFundHolding.
// Note: EtfFundHolding already accounts for string | number for sharesNumber, weightPercentage, marketValue.
// export type BulkEtfHolderItem = EtfFundHolding; // Already defined

// For UpgradesDowngradesConsensusBulk, the item type is StockGradeConsensus.
// Note: StockGradeConsensus already accounts for string | number for counts.
// export type BulkUpgradesDowngradesConsensusItem = StockGradeConsensus; // Already defined

// For KeyMetricsTTMBulk, the item type is KeyMetricsTTM.
// Note: KeyMetricsTTM already accounts for string | number for numeric fields.
// export type BulkKeyMetricsTtmItem = KeyMetricsTTM; // Already defined

// For RatiosTTMBulk, the item type is FinancialRatiosTTM.
// Note: FinancialRatiosTTM already accounts for string | number for numeric fields.
// export type BulkRatiosTtmItem = FinancialRatiosTTM; // Already defined

export interface BulkStockPeers {
	symbol: string
	peers: string // Comma-separated string
}

export interface BulkEarningsSurprise {
	symbol: string
	date: string
	epsActual: string | number | null
	epsEstimated: string | number | null
	lastUpdated: string
}

// For IncomeStatementBulk, the item type is IncomeStatement.
// Note: IncomeStatement already accounts for string | number | null for numeric fields.
// export type BulkIncomeStatementItem = IncomeStatement; // Already defined

// For IncomeStatementGrowthBulk, the item type is IncomeStatementGrowth.
// export type BulkIncomeStatementGrowthItem = IncomeStatementGrowth; // Already defined

// For BalanceSheetStatementBulk, the item type is BalanceSheetStatement.
// Note: BalanceSheetStatement already accounts for string | number | null for numeric fields.
// export type BulkBalanceSheetStatementItem = BalanceSheetStatement; // Already defined

// For BalanceSheetStatementGrowthBulk, the item type is BalanceSheetStatementGrowth.
// export type BulkBalanceSheetStatementGrowthItem = BalanceSheetStatementGrowth; // Already defined

// For CashFlowStatementBulk, the item type is CashFlowStatement.
// Note: CashFlowStatement already accounts for string | number | null for numeric fields.
// export type BulkCashFlowStatementItem = CashFlowStatement; // Already defined

// For CashFlowStatementGrowthBulk, the item type is CashFlowStatementGrowth.
// export type BulkCashFlowStatementGrowthItem = CashFlowStatementGrowth; // Already defined

export interface EodBulkItem {
	symbol: string
	date: string
	open: number
	low: number
	high: number
	close: number
	adjClose: number
	volume: number
}
