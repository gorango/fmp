import { z } from 'zod'

// Helper for nullable strings/numbers/booleans often seen in APIs
const zNullableString = z.string().nullable()
const zNullableNumber = z.number().nullable()
const zNullableBoolean = z.boolean().nullable()

// Helper for optional + nullable fields
const zOptionalNullableString = zNullableString.optional()
const zOptionalNullableNumber = zNullableNumber.optional()
const zOptionalNullableBoolean = zNullableBoolean.optional()

// Enums from TypeScript types
export const FinancialPeriodSchema = z.enum(['Q1', 'Q2', 'Q3', 'Q4', 'FY'])
export const StatementPeriodOptionSchema = z.enum(['quarter', 'annual'])
export const IntradayTimeframeSchema = z.enum(['1min', '5min', '15min', '30min', '1hour', '4hour'])
export const ExtendedTimeframeSchema = z.enum(['1day', '1week', '1month'])
export const IndicatorTimeframeSchema = z.union([IntradayTimeframeSchema, z.literal('1day')]) // As per docs
export const RecommendationSchema = z.enum([
	'Strong Sell',
	'Sell',
	'Hold',
	'Underweight',
	'Underperform',
	'Neutral',
	'Perform',
	'Market Perform',
	'Outperform',
	'Overweight',
	'Buy',
	'Strong Buy',
]).nullable().optional()

// --- SHARED BASE SCHEMAS ---
export const BaseQuoteSchema = z.object({
	symbol: z.string(),
	name: zOptionalNullableString,
	price: zOptionalNullableNumber,
	changesPercentage: zOptionalNullableNumber,
	change: zOptionalNullableNumber,
	dayLow: zOptionalNullableNumber,
	dayHigh: zOptionalNullableNumber,
	yearHigh: zOptionalNullableNumber,
	yearLow: zOptionalNullableNumber,
	marketCap: zOptionalNullableNumber,
	priceAvg50: zOptionalNullableNumber,
	priceAvg200: zOptionalNullableNumber,
	exchange: zOptionalNullableString,
	volume: zOptionalNullableNumber,
	avgVolume: zOptionalNullableNumber,
	open: zOptionalNullableNumber,
	previousClose: zOptionalNullableNumber,
	eps: zOptionalNullableNumber,
	pe: zOptionalNullableNumber,
	earningsAnnouncement: zOptionalNullableString,
	sharesOutstanding: zOptionalNullableNumber,
	timestamp: zOptionalNullableNumber,
})

export const BaseChartItemSchema = z.object({
	date: z.string(),
	open: z.number(),
	high: z.number(),
	low: z.number(),
	close: z.number(),
	volume: z.number(),
})

// --- SEARCH SCHEMAS ---
export const SymbolSearchResultSchema = z.object({
	symbol: z.string(),
	name: z.string(),
	currency: z.string(),
	exchangeFullName: z.string(),
	exchange: z.string(),
})
export const SymbolSearchResultArraySchema = z.array(SymbolSearchResultSchema)

export const NameSearchResultSchema = z.object({
	symbol: z.string(),
	name: z.string(),
	currency: z.string(),
	exchangeFullName: z.string(),
	exchange: z.string(),
})
export const NameSearchResultArraySchema = z.array(NameSearchResultSchema)

export const CikSearchResultSchema = z.object({
	symbol: z.string(),
	companyName: z.string(),
	cik: z.string(),
	exchangeFullName: z.string(),
	exchange: z.string(),
	currency: z.string(),
})
export const CikSearchResultArraySchema = z.array(CikSearchResultSchema)

export const CusipSearchResultSchema = z.object({
	symbol: z.string(),
	companyName: z.string(),
	cusip: z.string(),
	marketCap: zNullableNumber,
})
export const CusipSearchResultArraySchema = z.array(CusipSearchResultSchema)

export const IsinSearchResultSchema = z.object({
	symbol: z.string(),
	name: z.string(),
	isin: z.string(),
	marketCap: zNullableNumber,
})
export const IsinSearchResultArraySchema = z.array(IsinSearchResultSchema)

export const StockScreenerResultSchema = z.object({
	symbol: z.string(),
	companyName: z.string(),
	marketCap: zNullableNumber,
	sector: zNullableString,
	industry: zNullableString,
	beta: zNullableNumber,
	price: zNullableNumber,
	lastAnnualDividend: zNullableNumber,
	volume: zNullableNumber,
	exchange: zNullableString,
	exchangeShortName: zNullableString,
	country: zNullableString,
	isEtf: zNullableBoolean,
	isFund: zNullableBoolean,
	isActivelyTrading: zNullableBoolean,
})
export const StockScreenerResultArraySchema = z.array(StockScreenerResultSchema)

export const ExchangeVariantSchema = z.object({
	symbol: z.string(),
	price: zNullableNumber,
	beta: zNullableNumber,
	volAvg: zNullableNumber,
	mktCap: zNullableNumber,
	lastDiv: zNullableNumber,
	range: zNullableString,
	changes: zNullableNumber,
	companyName: z.string(),
	currency: zNullableString,
	cik: zNullableString,
	isin: zNullableString,
	cusip: zNullableString,
	exchange: z.string(),
	exchangeShortName: zNullableString,
	industry: zNullableString,
	website: zNullableString,
	description: zNullableString,
	ceo: zNullableString,
	sector: zNullableString,
	country: zNullableString,
	fullTimeEmployees: zNullableString,
	phone: zNullableString,
	address: zNullableString,
	city: zNullableString,
	state: zNullableString,
	zip: zNullableString,
	dcfDiff: zNullableNumber,
	dcf: zNullableNumber,
	image: zNullableString,
	ipoDate: zNullableString,
	defaultImage: zNullableBoolean,
	isEtf: zNullableBoolean,
	isActivelyTrading: zNullableBoolean,
	isAdr: zNullableBoolean,
	isFund: zNullableBoolean,
})
export const ExchangeVariantArraySchema = z.array(ExchangeVariantSchema)

// --- DIRECTORY SCHEMAS ---
export const CompanySymbolSchema = z.object({
	symbol: z.string(),
	companyName: z.string(),
})
export const CompanySymbolArraySchema = z.array(CompanySymbolSchema)

export const FinancialStatementSymbolSchema = z.object({
	symbol: z.string(),
	companyName: z.string(),
	tradingCurrency: zNullableString,
	reportingCurrency: zNullableString,
})
export const FinancialStatementSymbolArraySchema = z.array(FinancialStatementSymbolSchema)

export const CikListItemSchema = z.object({
	cik: z.string(),
	companyName: z.string(),
})
export const CikListItemArraySchema = z.array(CikListItemSchema)

export const SymbolChangeSchema = z.object({
	date: z.string(),
	companyName: z.string(),
	oldSymbol: z.string(),
	newSymbol: z.string(),
})
export const SymbolChangeArraySchema = z.array(SymbolChangeSchema)

export const EtfSymbolSchema = z.object({
	symbol: z.string(),
	name: z.string(),
})
export const EtfSymbolArraySchema = z.array(EtfSymbolSchema)

export const ActivelyTradingItemSchema = z.object({
	symbol: z.string(),
	name: z.string(),
})
export const ActivelyTradingItemArraySchema = z.array(ActivelyTradingItemSchema)

export const EarningsTranscriptListItemSchema = z.object({
	symbol: z.string(),
	companyName: z.string(),
	noOfTranscripts: zNullableString,
})
export const EarningsTranscriptListItemArraySchema = z.array(EarningsTranscriptListItemSchema)

export const AvailableExchangeSchema = z.object({ exchange: z.string() })
export const AvailableExchangeArraySchema = z.array(AvailableExchangeSchema)

export const AvailableSectorSchema = z.object({ sector: z.string() })
export const AvailableSectorArraySchema = z.array(AvailableSectorSchema)

export const AvailableIndustrySchema = z.object({ industry: z.string() })
export const AvailableIndustryArraySchema = z.array(AvailableIndustrySchema)

export const AvailableCountrySchema = z.object({ country: z.string() })
export const AvailableCountryArraySchema = z.array(AvailableCountrySchema)

// --- ANALYST SCHEMAS ---
export const FinancialEstimateSchema = z.object({
	symbol: z.string(),
	date: z.string(),
	revenueLow: zNullableNumber,
	revenueHigh: zNullableNumber,
	revenueAvg: zNullableNumber,
	ebitdaLow: zNullableNumber,
	ebitdaHigh: zNullableNumber,
	ebitdaAvg: zNullableNumber,
	ebitLow: zNullableNumber,
	ebitHigh: zNullableNumber,
	ebitAvg: zNullableNumber,
	netIncomeLow: zNullableNumber,
	netIncomeHigh: zNullableNumber,
	netIncomeAvg: zNullableNumber,
	sgaExpenseLow: zNullableNumber,
	sgaExpenseHigh: zNullableNumber,
	sgaExpenseAvg: zNullableNumber,
	epsAvg: zNullableNumber,
	epsHigh: zNullableNumber,
	epsLow: zNullableNumber,
	numAnalystsRevenue: zNullableNumber,
	numAnalystsEps: zNullableNumber,
})
export const FinancialEstimateArraySchema = z.array(FinancialEstimateSchema)

export const RatingSnapshotSchema = z.object({
	symbol: z.string(),
	rating: zNullableString,
	overallScore: zNullableNumber,
	discountedCashFlowScore: zNullableNumber,
	returnOnEquityScore: zNullableNumber,
	returnOnAssetsScore: zNullableNumber,
	debtToEquityScore: zNullableNumber,
	priceToEarningsScore: zNullableNumber,
	priceToBookScore: zNullableNumber,
})
export const RatingSnapshotArraySchema = z.array(RatingSnapshotSchema)

export const HistoricalRatingSchema = RatingSnapshotSchema.extend({ date: z.string() })
export const HistoricalRatingArraySchema = z.array(HistoricalRatingSchema)

export const PriceTargetSummarySchema = z.object({
	symbol: z.string(),
	lastMonthCount: zNullableNumber,
	lastMonthAvgPriceTarget: zNullableNumber,
	lastQuarterCount: zNullableNumber,
	lastQuarterAvgPriceTarget: zNullableNumber,
	lastYearCount: zNullableNumber,
	lastYearAvgPriceTarget: zNullableNumber,
	allTimeCount: zNullableNumber,
	allTimeAvgPriceTarget: zNullableNumber,
	publishers: z.string(), // Expecting JSON string
})
export const PriceTargetSummaryArraySchema = z.array(PriceTargetSummarySchema)

export const PriceTargetConsensusSchema = z.object({
	symbol: z.string(),
	targetHigh: zNullableNumber,
	targetLow: zNullableNumber,
	targetConsensus: zNullableNumber,
	targetMedian: zNullableNumber,
})
export const PriceTargetConsensusArraySchema = z.array(PriceTargetConsensusSchema)

export const PriceTargetNewsItemSchema = z.object({
	symbol: z.string(),
	publishedDate: z.string(),
	newsURL: zNullableString,
	newsTitle: zNullableString,
	analystName: zNullableString,
	priceTarget: zNullableNumber,
	adjPriceTarget: zNullableNumber,
	priceWhenPosted: zNullableNumber,
	newsPublisher: zNullableString,
	newsBaseURL: zNullableString,
	analystCompany: zNullableString,
})
export const PriceTargetNewsItemArraySchema = z.array(PriceTargetNewsItemSchema)

export const StockGradeSchema = z.object({
	symbol: z.string(),
	date: z.string(),
	gradingCompany: zNullableString,
	previousGrade: zNullableString,
	newGrade: zNullableString,
	action: zNullableString,
})
export const StockGradeArraySchema = z.array(StockGradeSchema)

export const HistoricalStockGradeSummarySchema = z.object({
	symbol: z.string(),
	date: z.string(),
	analystRatingsBuy: zNullableNumber,
	analystRatingsHold: zNullableNumber,
	analystRatingsSell: zNullableNumber,
	analystRatingsStrongSell: zNullableNumber,
})
export const HistoricalStockGradeSummaryArraySchema = z.array(HistoricalStockGradeSummarySchema)

export const StockGradeConsensusSchema = z.object({
	symbol: z.string(),
	strongBuy: z.union([z.string(), z.number()]).nullable(),
	buy: z.union([z.string(), z.number()]).nullable(),
	hold: z.union([z.string(), z.number()]).nullable(),
	sell: z.union([z.string(), z.number()]).nullable(),
	strongSell: z.union([z.string(), z.number()]).nullable(),
	consensus: zNullableString,
})
export const StockGradeConsensusArraySchema = z.array(StockGradeConsensusSchema)

export const StockGradeNewsItemSchema = z.object({
	symbol: z.string(),
	publishedDate: z.string(),
	newsURL: zNullableString,
	newsTitle: zNullableString,
	newsBaseURL: zNullableString,
	newsPublisher: zNullableString,
	newGrade: zNullableString,
	previousGrade: zNullableString,
	gradingCompany: zNullableString,
	action: zNullableString,
	priceWhenPosted: zNullableNumber,
})
export const StockGradeNewsItemArraySchema = z.array(StockGradeNewsItemSchema)

// --- CALENDAR SCHEMAS ---
export const CompanyDividendSchema = z.object({
	symbol: z.string(),
	date: z.string(),
	recordDate: zNullableString,
	paymentDate: zNullableString,
	declarationDate: zNullableString,
	adjDividend: zNullableNumber,
	dividend: zNullableNumber,
	yield: zNullableNumber,
	frequency: zNullableString,
})
export const CompanyDividendArraySchema = z.array(CompanyDividendSchema)
export const CalendarDividendArraySchema = z.array(CompanyDividendSchema) // Same structure

export const CompanyEarningsReportSchema = z.object({
	symbol: z.string(),
	date: z.string(),
	epsActual: zNullableNumber,
	epsEstimated: zNullableNumber,
	revenueActual: zNullableNumber,
	revenueEstimated: zNullableNumber,
	lastUpdated: z.string(),
})
export const CompanyEarningsReportArraySchema = z.array(CompanyEarningsReportSchema)

export const IpoCalendarItemSchema = z.object({
	symbol: zNullableString,
	date: z.string(),
	daa: zNullableString,
	company: z.string(),
	exchange: zNullableString,
	actions: zNullableString,
	shares: zNullableNumber,
	priceRange: zNullableString,
	marketCap: zNullableNumber,
})
export const IpoCalendarItemArraySchema = z.array(IpoCalendarItemSchema)

export const IpoDisclosureSchema = z.object({
	symbol: zNullableString,
	filingDate: z.string(),
	acceptedDate: z.string(),
	effectivenessDate: zNullableString,
	cik: zNullableString,
	form: zNullableString,
	url: zNullableString,
})
export const IpoDisclosureArraySchema = z.array(IpoDisclosureSchema)

export const IpoProspectusSchema = z.object({
	symbol: zNullableString,
	acceptedDate: z.string(),
	filingDate: z.string(),
	ipoDate: zNullableString,
	cik: zNullableString,
	pricePublicPerShare: zNullableNumber,
	pricePublicTotal: zNullableNumber,
	discountsAndCommissionsPerShare: zNullableNumber,
	discountsAndCommissionsTotal: zNullableNumber,
	proceedsBeforeExpensesPerShare: zNullableNumber,
	proceedsBeforeExpensesTotal: zNullableNumber,
	form: zNullableString,
	url: zNullableString,
})
export const IpoProspectusArraySchema = z.array(IpoProspectusSchema)

export const StockSplitDetailSchema = z.object({
	symbol: z.string(),
	date: z.string(),
	numerator: z.number(),
	denominator: z.number(),
})
export const StockSplitDetailArraySchema = z.array(StockSplitDetailSchema)

// --- CHART SCHEMAS ---
export const StockChartLightItemSchema = z.object({
	symbol: z.string(),
	date: z.string(),
	price: z.number(),
	volume: z.number(),
})
export const StockChartLightItemArraySchema = z.array(StockChartLightItemSchema)

export const StockChartFullItemSchema = BaseChartItemSchema.extend({
	symbol: z.string(),
	change: zNullableNumber,
	changePercent: zNullableNumber,
	vwap: zNullableNumber,
})
export const StockChartFullItemArraySchema = z.array(StockChartFullItemSchema)

export const UnadjustedStockChartItemSchema = z.object({
	symbol: z.string(),
	date: z.string(),
	adjOpen: z.number(),
	adjHigh: z.number(),
	adjLow: z.number(),
	adjClose: z.number(),
	volume: z.number(),
})
export const UnadjustedStockChartItemArraySchema = z.array(UnadjustedStockChartItemSchema)
export const IntradayStockChartItemArraySchema = z.array(BaseChartItemSchema)

// --- COMPANY SCHEMAS ---
export const CompanyProfileSchema = z.object({
	symbol: z.string(),
	price: zNullableNumber,
	marketCap: zNullableNumber,
	beta: zNullableNumber,
	lastDividend: zNullableNumber,
	range: zNullableString,
	change: zNullableNumber,
	changePercentage: zNullableNumber,
	volume: zNullableNumber,
	averageVolume: zNullableNumber,
	companyName: z.string(),
	currency: zNullableString,
	cik: zNullableString,
	isin: zNullableString,
	cusip: zNullableString,
	exchangeFullName: zNullableString,
	exchange: zNullableString,
	industry: zNullableString,
	website: zNullableString,
	description: zNullableString,
	ceo: zNullableString,
	sector: zNullableString,
	country: zNullableString,
	fullTimeEmployees: zNullableString,
	phone: zNullableString,
	address: zNullableString,
	city: zNullableString,
	state: zNullableString,
	zip: zNullableString,
	image: zNullableString,
	ipoDate: zNullableString,
	defaultImage: zNullableBoolean,
	isEtf: zNullableBoolean,
	isActivelyTrading: zNullableBoolean,
	isAdr: zNullableBoolean,
	isFund: zNullableBoolean,
})
export const CompanyProfileArraySchema = z.array(CompanyProfileSchema)

export const CompanyNoteSchema = z.object({
	cik: zNullableString,
	symbol: z.string(),
	title: zNullableString,
	exchange: zNullableString,
})
export const CompanyNoteArraySchema = z.array(CompanyNoteSchema)

export const StockPeerSchema = z.object({
	symbol: z.string(),
	companyName: z.string(),
	price: zNullableNumber,
	mktCap: zNullableNumber,
})
export const StockPeerArraySchema = z.array(StockPeerSchema)

export const DelistedCompanySchema = z.object({
	symbol: z.string(),
	companyName: z.string(),
	exchange: zNullableString,
	ipoDate: zNullableString,
	delistedDate: zNullableString,
})
export const DelistedCompanyArraySchema = z.array(DelistedCompanySchema)

export const CompanyEmployeeCountSchema = z.object({
	symbol: z.string(),
	cik: zNullableString,
	acceptanceTime: z.string(),
	periodOfReport: z.string(),
	companyName: z.string(),
	formType: zNullableString,
	filingDate: z.string(),
	employeeCount: zNullableNumber,
	source: zNullableString,
})
export const CompanyEmployeeCountArraySchema = z.array(CompanyEmployeeCountSchema)

export const CompanyMarketCapSchema = z.object({
	symbol: z.string(),
	date: z.string(),
	marketCap: z.number(),
})
export const CompanyMarketCapArraySchema = z.array(CompanyMarketCapSchema)

export const CompanySharesFloatSchema = z.object({
	symbol: z.string(),
	date: z.string(),
	freeFloat: zNullableNumber,
	floatShares: zNullableNumber,
	outstandingShares: zNullableNumber,
})
export const CompanySharesFloatArraySchema = z.array(CompanySharesFloatSchema)

export const MergerAcquisitionSchema = z.object({
	symbol: zNullableString,
	companyName: zNullableString,
	cik: zNullableString,
	targetedCompanyName: zNullableString,
	targetedCik: zNullableString,
	targetedSymbol: zNullableString,
	transactionDate: z.string(),
	acceptedDate: z.string(),
	link: zNullableString,
})
export const MergerAcquisitionArraySchema = z.array(MergerAcquisitionSchema)

export const CompanyExecutiveSchema = z.object({
	title: zNullableString,
	name: z.string(),
	pay: zNullableNumber,
	currencyPay: zNullableString,
	gender: zNullableString,
	yearBorn: zNullableNumber,
	active: zNullableBoolean,
})
export const CompanyExecutiveArraySchema = z.array(CompanyExecutiveSchema)

export const ExecutiveCompensationSchema = z.object({
	cik: zNullableString,
	symbol: z.string(),
	companyName: z.string(),
	filingDate: z.string(),
	acceptedDate: z.string(),
	nameAndPosition: z.string(),
	year: z.number(),
	salary: zNullableNumber,
	bonus: zNullableNumber,
	stockAward: zNullableNumber,
	optionAward: zNullableNumber,
	incentivePlanCompensation: zNullableNumber,
	allOtherCompensation: zNullableNumber,
	total: zNullableNumber,
	link: zNullableString,
})
export const ExecutiveCompensationArraySchema = z.array(ExecutiveCompensationSchema)

export const ExecutiveCompensationBenchmarkSchema = z.object({
	industryTitle: z.string(),
	year: z.number(),
	averageCompensation: z.number(),
})
export const ExecutiveCompensationBenchmarkArraySchema = z.array(ExecutiveCompensationBenchmarkSchema)

// --- COT SCHEMAS ---
export const CotReportSchema = z.object({
	symbol: z.string(),
	date: z.string(),
	name: z.string(),
	sector: z.string(),
	marketAndExchangeNames: z.string(),
	cftcContractMarketCode: z.string(),
	cftcMarketCode: z.string(),
	cftcRegionCode: z.string(),
	cftcCommodityCode: z.string(),
	openInterestAll: z.number(),
	noncommPositionsLongAll: z.number(),
	noncommPositionsShortAll: z.number(),
	noncommPositionsSpreadAll: z.number(),
	commPositionsLongAll: z.number(),
	commPositionsShortAll: z.number(),
	totReptPositionsLongAll: z.number(),
	totReptPositionsShortAll: z.number(),
	nonreptPositionsLongAll: z.number(),
	nonreptPositionsShortAll: z.number(),
	openInterestOld: z.number(),
	noncommPositionsLongOld: z.number(),
	noncommPositionsShortOld: z.number(),
	noncommPositionsSpreadOld: z.number(),
	commPositionsLongOld: z.number(),
	commPositionsShortOld: z.number(),
	totReptPositionsLongOld: z.number(),
	totReptPositionsShortOld: z.number(),
	nonreptPositionsLongOld: z.number(),
	nonreptPositionsShortOld: z.number(),
	openInterestOther: z.number(),
	noncommPositionsLongOther: z.number(),
	noncommPositionsShortOther: z.number(),
	noncommPositionsSpreadOther: z.number(),
	commPositionsLongOther: z.number(),
	commPositionsShortOther: z.number(),
	totReptPositionsLongOther: z.number(),
	totReptPositionsShortOther: z.number(),
	nonreptPositionsLongOther: z.number(),
	nonreptPositionsShortOther: z.number(),
	changeInOpenInterestAll: z.number(),
	changeInNoncommLongAll: z.number(),
	changeInNoncommShortAll: z.number(),
	changeInNoncommSpeadAll: z.number(),
	changeInCommLongAll: z.number(),
	changeInCommShortAll: z.number(),
	changeInTotReptLongAll: z.number(),
	changeInTotReptShortAll: z.number(),
	changeInNonreptLongAll: z.number(),
	changeInNonreptShortAll: z.number(),
	pctOfOpenInterestAll: z.number(),
	pctOfOiNoncommLongAll: z.number(),
	pctOfOiNoncommShortAll: z.number(),
	pctOfOiNoncommSpreadAll: z.number(),
	pctOfOiCommLongAll: z.number(),
	pctOfOiCommShortAll: z.number(),
	pctOfOiTotReptLongAll: z.number(),
	pctOfOiTotReptShortAll: z.number(),
	pctOfOiNonreptLongAll: z.number(),
	pctOfOiNonreptShortAll: z.number(),
	pctOfOpenInterestOl: z.number(),
	pctOfOiNoncommLongOl: z.number(),
	pctOfOiNoncommShortOl: z.number(),
	pctOfOiNoncommSpreadOl: z.number(),
	pctOfOiCommLongOl: z.number(),
	pctOfOiCommShortOl: z.number(),
	pctOfOiTotReptLongOl: z.number(),
	pctOfOiTotReptShortOl: z.number(),
	pctOfOiNonreptLongOl: z.number(),
	pctOfOiNonreptShortOl: z.number(),
	pctOfOpenInterestOther: z.number(),
	pctOfOiNoncommLongOther: z.number(),
	pctOfOiNoncommShortOther: z.number(),
	pctOfOiNoncommSpreadOther: z.number(),
	pctOfOiCommLongOther: z.number(),
	pctOfOiCommShortOther: z.number(),
	pctOfOiTotReptLongOther: z.number(),
	pctOfOiTotReptShortOther: z.number(),
	pctOfOiNonreptLongOther: z.number(),
	pctOfOiNonreptShortOther: z.number(),
	tradersTotAll: z.number(),
	tradersNoncommLongAll: z.number(),
	tradersNoncommShortAll: z.number(),
	tradersNoncommSpreadAll: z.number(),
	tradersCommLongAll: z.number(),
	tradersCommShortAll: z.number(),
	tradersTotReptLongAll: z.number(),
	tradersTotReptShortAll: z.number(),
	tradersTotOl: z.number(),
	tradersNoncommLongOl: z.number(),
	tradersNoncommShortOl: z.number(),
	tradersNoncommSpeadOl: z.number(),
	tradersCommLongOl: z.number(),
	tradersCommShortOl: z.number(),
	tradersTotReptLongOl: z.number(),
	tradersTotReptShortOl: z.number(),
	tradersTotOther: z.number(),
	tradersNoncommLongOther: z.number(),
	tradersNoncommShortOther: z.number(),
	tradersNoncommSpreadOther: z.number(),
	tradersCommLongOther: z.number(),
	tradersCommShortOther: z.number(),
	tradersTotReptLongOther: z.number(),
	tradersTotReptShortOther: z.number(),
	concGrossLe4TdrLongAll: z.number(),
	concGrossLe4TdrShortAll: z.number(),
	concGrossLe8TdrLongAll: z.number(),
	concGrossLe8TdrShortAll: z.number(),
	concNetLe4TdrLongAll: z.number(),
	concNetLe4TdrShortAll: z.number(),
	concNetLe8TdrLongAll: z.number(),
	concNetLe8TdrShortAll: z.number(),
	concGrossLe4TdrLongOl: z.number(),
	concGrossLe4TdrShortOl: z.number(),
	concGrossLe8TdrLongOl: z.number(),
	concGrossLe8TdrShortOl: z.number(),
	concNetLe4TdrLongOl: z.number(),
	concNetLe4TdrShortOl: z.number(),
	concNetLe8TdrLongOl: z.number(),
	concNetLe8TdrShortOl: z.number(),
	concGrossLe4TdrLongOther: z.number(),
	concGrossLe4TdrShortOther: z.number(),
	concGrossLe8TdrLongOther: z.number(),
	concGrossLe8TdrShortOther: z.number(),
	concNetLe4TdrLongOther: z.number(),
	concNetLe4TdrShortOther: z.number(),
	concNetLe8TdrLongOther: z.number(),
	concNetLe8TdrShortOther: z.number(),
	contractUnits: zNullableString,
})
export const CotReportArraySchema = z.array(CotReportSchema)

export const CotAnalysisSchema = z.object({
	symbol: z.string(),
	date: z.string(),
	name: z.string(),
	sector: z.string(),
	exchange: z.string(),
	currentLongMarketSituation: zNullableNumber,
	currentShortMarketSituation: zNullableNumber,
	marketSituation: zNullableString,
	previousLongMarketSituation: zNullableNumber,
	previousShortMarketSituation: zNullableNumber,
	previousMarketSituation: zNullableString,
	netPosition: zOptionalNullableNumber,
	previousNetPosition: zNullableNumber,
	changeInNetPosition: zNullableNumber,
	marketSentiment: zNullableString,
	reversalTrend: zNullableBoolean,
})
export const CotAnalysisArraySchema = z.array(CotAnalysisSchema)

export const CotReportListItemSchema = z.object({
	symbol: z.string(),
	name: z.string(),
})
export const CotReportListItemArraySchema = z.array(CotReportListItemSchema)

// --- DCF SCHEMAS ---
export const DcfValuationSchema = z.object({
	'symbol': z.string(),
	'date': z.string(),
	'dcf': z.number(),
	'Stock Price': z.number(),
})
export const DcfValuationArraySchema = z.array(DcfValuationSchema)

export const CustomDcfAdvancedResultSchema = z.object({
	year: z.string(),
	symbol: z.string(),
	revenue: z.number(),
	revenuePercentage: z.number(),
	ebitda: z.number(),
	ebitdaPercentage: z.number(),
	ebit: z.number(),
	ebitPercentage: z.number(),
	depreciation: z.number(),
	depreciationPercentage: z.number(),
	totalCash: z.number(),
	totalCashPercentage: z.number(),
	receivables: z.number(),
	receivablesPercentage: z.number(),
	inventories: z.number(),
	inventoriesPercentage: z.number(),
	payable: z.number(),
	payablePercentage: z.number(),
	capitalExpenditure: z.number(),
	capitalExpenditurePercentage: z.number(),
	price: z.number(),
	beta: z.number(),
	dilutedSharesOutstanding: z.number(),
	costofDebt: z.number(),
	taxRate: z.number(),
	afterTaxCostOfDebt: z.number(),
	riskFreeRate: z.number(),
	marketRiskPremium: z.number(),
	costOfEquity: z.number(),
	totalDebt: z.number(),
	totalEquity: z.number(),
	totalCapital: z.number(),
	debtWeighting: z.number(),
	equityWeighting: z.number(),
	wacc: z.number(),
	taxRateCash: z.number(),
	ebiat: z.number(),
	ufcf: z.number(),
	sumPvUfcf: z.number(),
	longTermGrowthRate: z.number(),
	terminalValue: z.number(),
	presentTerminalValue: z.number(),
	enterpriseValue: z.number(),
	netDebt: z.number(),
	equityValue: z.number(),
	equityValuePerShare: z.number(),
	freeCashFlowT1: z.number(),
})
export const CustomDcfAdvancedResultArraySchema = z.array(CustomDcfAdvancedResultSchema)

export const CustomDcfLeveredResultSchema = z.object({
	year: z.string(),
	symbol: z.string(),
	revenue: z.number(),
	revenuePercentage: z.number(),
	capitalExpenditure: z.number(),
	capitalExpenditurePercentage: z.number(),
	price: z.number(),
	beta: z.number(),
	dilutedSharesOutstanding: z.number(),
	costofDebt: z.number(),
	taxRate: z.number(),
	afterTaxCostOfDebt: z.number(),
	riskFreeRate: z.number(),
	marketRiskPremium: z.number(),
	costOfEquity: z.number(),
	totalDebt: z.number(),
	totalEquity: z.number(),
	totalCapital: z.number(),
	debtWeighting: z.number(),
	equityWeighting: z.number(),
	wacc: z.number(),
	operatingCashFlow: z.number(),
	operatingCashFlowPercentage: z.number(),
	pvLfcf: z.number(),
	sumPvLfcf: z.number(),
	longTermGrowthRate: z.number(),
	freeCashFlow: z.number(),
	terminalValue: z.number(),
	presentTerminalValue: z.number(),
	enterpriseValue: z.number(),
	netDebt: z.number(),
	equityValue: z.number(),
	equityValuePerShare: z.number(),
	freeCashFlowT1: z.number(),
})
export const CustomDcfLeveredResultArraySchema = z.array(CustomDcfLeveredResultSchema)

// --- ECONOMICS SCHEMAS ---
export const TreasuryRateSchema = z.object({
	date: z.string(),
	month1: zNullableNumber,
	month2: zNullableNumber,
	month3: zNullableNumber,
	month6: zNullableNumber,
	year1: zNullableNumber,
	year2: zNullableNumber,
	year3: zNullableNumber,
	year5: zNullableNumber,
	year7: zNullableNumber,
	year10: zNullableNumber,
	year20: zNullableNumber,
	year30: zNullableNumber,
})
export const TreasuryRateArraySchema = z.array(TreasuryRateSchema)

export const EconomicIndicatorSchema = z.object({
	name: z.string(),
	date: z.string(),
	value: z.number(),
})
export const EconomicIndicatorArraySchema = z.array(EconomicIndicatorSchema)

export const EconomicCalendarReleaseSchema = z.object({
	date: z.string(),
	country: z.string(),
	event: z.string(),
	currency: zNullableString,
	previous: zNullableNumber,
	estimate: zNullableNumber,
	actual: zNullableNumber,
	change: zNullableNumber,
	impact: zNullableString,
	changePercentage: zNullableNumber,
})
export const EconomicCalendarReleaseArraySchema = z.array(EconomicCalendarReleaseSchema)

export const MarketRiskPremiumInfoSchema = z.object({
	country: z.string(),
	continent: zNullableString,
	countryRiskPremium: z.number(),
	totalEquityRiskPremium: z.number(),
})
export const MarketRiskPremiumInfoArraySchema = z.array(MarketRiskPremiumInfoSchema)

// --- ESG SCHEMAS ---
export const EsgDisclosureSchema = z.object({
	date: z.string(),
	acceptedDate: z.string(),
	symbol: z.string(),
	cik: zNullableString,
	companyName: z.string(),
	formType: zNullableString,
	environmentalScore: zNullableNumber,
	socialScore: zNullableNumber,
	governanceScore: zNullableNumber,
	ESGScore: zNullableNumber,
	url: zNullableString,
})
export const EsgDisclosureArraySchema = z.array(EsgDisclosureSchema)

export const EsgRatingSchema = z.object({
	symbol: z.string(),
	cik: zNullableString,
	companyName: z.string(),
	industry: zNullableString,
	fiscalYear: zNullableNumber,
	ESGRiskRating: zNullableString,
	industryRank: zNullableString,
})
export const EsgRatingArraySchema = z.array(EsgRatingSchema)

export const EsgBenchmarkSchema = z.object({
	fiscalYear: z.number(),
	sector: z.string(),
	environmentalScore: zNullableNumber,
	socialScore: zNullableNumber,
	governanceScore: zNullableNumber,
	ESGScore: zNullableNumber,
})
export const EsgBenchmarkArraySchema = z.array(EsgBenchmarkSchema)

// --- ETF AND MUTUAL FUND SCHEMAS ---
export const EtfFundHoldingSchema = z.object({
	symbol: z.string(),
	asset: z.string(),
	name: z.string(),
	isin: zNullableString,
	securityCusip: zNullableString,
	sharesNumber: z.union([z.string(), z.number()]).nullable(),
	weightPercentage: z.union([z.string(), z.number()]).nullable(),
	marketValue: z.union([z.string(), z.number()]).nullable(),
	updatedAt: z.string(),
	updated: zOptionalNullableString,
})
export const EtfFundHoldingArraySchema = z.array(EtfFundHoldingSchema)

export const EtfSectorExposureSchema = z.object({
	industry: z.string(),
	exposure: z.number(),
})

export const EtfFundInfoSchema = z.object({
	symbol: z.string(),
	name: z.string(),
	description: zNullableString,
	isin: zNullableString,
	assetClass: zNullableString,
	securityCusip: zNullableString,
	domicile: zNullableString,
	website: zNullableString,
	etfCompany: zNullableString,
	expenseRatio: zNullableNumber,
	assetsUnderManagement: zNullableNumber,
	avgVolume: zNullableNumber,
	inceptionDate: zNullableString,
	nav: zNullableNumber,
	navCurrency: zNullableString,
	holdingsCount: zNullableNumber,
	updatedAt: z.string(),
	sectorsList: z.array(EtfSectorExposureSchema).nullable(),
})
export const EtfFundInfoArraySchema = z.array(EtfFundInfoSchema)

export const EtfCountryWeightingSchema = z.object({
	country: z.string(),
	weightPercentage: z.string(),
})
export const EtfCountryWeightingArraySchema = z.array(EtfCountryWeightingSchema)

export const EtfAssetExposureItemSchema = z.object({
	symbol: z.string(),
	asset: z.string(),
	sharesNumber: zNullableNumber,
	weightPercentage: zNullableNumber,
	marketValue: zNullableNumber,
})
export const EtfAssetExposureItemArraySchema = z.array(EtfAssetExposureItemSchema)

export const EtfSectorWeightingSchema = z.object({
	symbol: z.string(),
	sector: z.string(),
	weightPercentage: zNullableNumber,
})
export const EtfSectorWeightingArraySchema = z.array(EtfSectorWeightingSchema)

export const FundDisclosureHolderSchema = z.object({
	cik: z.string(),
	holder: z.string(),
	shares: zNullableNumber,
	dateReported: z.string(),
	change: zNullableNumber,
	weightPercent: zNullableNumber,
})
export const FundDisclosureHolderArraySchema = z.array(FundDisclosureHolderSchema)

export const MutualFundDisclosureItemSchema = z.object({
	cik: z.string(),
	date: z.string(),
	acceptedDate: z.string(),
	symbol: z.string(),
	name: z.string(),
	lei: zNullableString,
	title: zNullableString,
	cusip: zNullableString,
	isin: zNullableString,
	balance: zNullableNumber,
	units: zNullableString,
	cur_cd: zNullableString,
	valUsd: zNullableNumber,
	pctVal: zNullableNumber,
	payoffProfile: zNullableString,
	assetCat: zNullableString,
	issuerCat: zNullableString,
	invCountry: zNullableString,
	isRestrictedSec: zNullableString,
	fairValLevel: zNullableString,
	isCashCollateral: zNullableString,
	isNonCashCollateral: zNullableString,
	isLoanByFund: zNullableString,
})
export const MutualFundDisclosureItemArraySchema = z.array(MutualFundDisclosureItemSchema)

export const FundDisclosureNameSearchResultSchema = z.object({
	symbol: zNullableString,
	cik: z.string(),
	classId: zNullableString,
	seriesId: zNullableString,
	entityName: z.string(),
	entityOrgType: zNullableString,
	seriesName: zNullableString,
	className: zNullableString,
	reportingFileNumber: zNullableString,
	address: zNullableString,
	city: zNullableString,
	zipCode: zNullableString,
	state: zNullableString,
})
export const FundDisclosureNameSearchResultArraySchema = z.array(FundDisclosureNameSearchResultSchema)

export const FundDisclosureDateSchema = z.object({
	date: z.string(),
	year: z.number(),
	quarter: z.number(),
})
export const FundDisclosureDateArraySchema = z.array(FundDisclosureDateSchema)

// --- COMMODITY SCHEMAS ---
export const CommodityListItemSchema = z.object({
	symbol: z.string(),
	name: z.string(),
	exchange: zNullableString,
	tradeMonth: zNullableString,
	currency: zNullableString,
})
export const CommodityListItemArraySchema = z.array(CommodityListItemSchema)

export const CommodityQuoteSchema = BaseQuoteSchema
export const CommodityQuoteArraySchema = z.array(CommodityQuoteSchema)

export const CommodityQuoteShortSchema = z.object({
	symbol: z.string(),
	price: z.number(),
	change: zNullableNumber,
	volume: zNullableNumber,
})
export const CommodityQuoteShortArraySchema = z.array(CommodityQuoteShortSchema)
export const AllCommoditiesQuotesArraySchema = z.union([CommodityQuoteShortArraySchema, CommodityQuoteArraySchema])

// --- FUNDRAISERS SCHEMAS ---
export const CrowdfundingCampaignSchema = z.object({
	cik: z.string(),
	companyName: z.string(),
	date: zNullableString,
	filingDate: z.string(),
	acceptedDate: z.string(),
	formType: zNullableString,
	formSignification: zNullableString,
	nameOfIssuer: z.string(),
	legalStatusForm: zNullableString,
	jurisdictionOrganization: zNullableString,
	issuerStreet: zNullableString,
	issuerCity: zNullableString,
	issuerStateOrCountry: zNullableString,
	issuerZipCode: zNullableString,
	issuerWebsite: zNullableString,
	intermediaryCompanyName: zNullableString,
	intermediaryCommissionCik: zNullableString,
	intermediaryCommissionFileNumber: zNullableString,
	compensationAmount: zNullableString,
	financialInterest: zNullableString,
	securityOfferedType: zNullableString,
	securityOfferedOtherDescription: zNullableString,
	numberOfSecurityOffered: zNullableNumber,
	offeringPrice: zNullableNumber,
	offeringAmount: zNullableNumber,
	overSubscriptionAccepted: zNullableString,
	overSubscriptionAllocationType: zNullableString,
	maximumOfferingAmount: zNullableNumber,
	offeringDeadlineDate: zNullableString,
	currentNumberOfEmployees: zNullableNumber,
	totalAssetMostRecentFiscalYear: zNullableNumber,
	totalAssetPriorFiscalYear: zNullableNumber,
	cashAndCashEquiValentMostRecentFiscalYear: zNullableNumber,
	cashAndCashEquiValentPriorFiscalYear: zNullableNumber,
	accountsReceivableMostRecentFiscalYear: zNullableNumber,
	accountsReceivablePriorFiscalYear: zNullableNumber,
	shortTermDebtMostRecentFiscalYear: zNullableNumber,
	shortTermDebtPriorFiscalYear: zNullableNumber,
	longTermDebtMostRecentFiscalYear: zNullableNumber,
	longTermDebtPriorFiscalYear: zNullableNumber,
	revenueMostRecentFiscalYear: zNullableNumber,
	revenuePriorFiscalYear: zNullableNumber,
	costGoodsSoldMostRecentFiscalYear: zNullableNumber,
	costGoodsSoldPriorFiscalYear: zNullableNumber,
	taxesPaidMostRecentFiscalYear: zNullableNumber,
	taxesPaidPriorFiscalYear: zNullableNumber,
	netIncomeMostRecentFiscalYear: zNullableNumber,
	netIncomePriorFiscalYear: zNullableNumber,
})
export const CrowdfundingCampaignArraySchema = z.array(CrowdfundingCampaignSchema)

export const CrowdfundingCampaignSearchResultSchema = z.object({
	cik: z.string(),
	name: z.string(),
	date: zNullableString,
})
export const CrowdfundingCampaignSearchResultArraySchema = z.array(CrowdfundingCampaignSearchResultSchema)

export const EquityOfferingUpdateSchema = z.object({
	cik: z.string(),
	companyName: z.string(),
	date: z.string(),
	filingDate: z.string(),
	acceptedDate: z.string(),
	formType: zNullableString,
	formSignification: zNullableString,
	entityName: z.string(),
	issuerStreet: zNullableString,
	issuerCity: zNullableString,
	issuerStateOrCountry: zNullableString,
	issuerStateOrCountryDescription: zNullableString,
	issuerZipCode: zNullableString,
	issuerPhoneNumber: zNullableString,
	jurisdictionOfIncorporation: zNullableString,
	entityType: zNullableString,
	incorporatedWithinFiveYears: zNullableBoolean,
	yearOfIncorporation: zNullableString,
	relatedPersonFirstName: zNullableString,
	relatedPersonLastName: zNullableString,
	relatedPersonStreet: zNullableString,
	relatedPersonCity: zNullableString,
	relatedPersonStateOrCountry: zNullableString,
	relatedPersonStateOrCountryDescription: zNullableString,
	relatedPersonZipCode: zNullableString,
	relatedPersonRelationship: zNullableString,
	industryGroupType: zNullableString,
	revenueRange: zNullableString,
	federalExemptionsExclusions: zNullableString,
	isAmendment: zNullableBoolean,
	dateOfFirstSale: zNullableString,
	durationOfOfferingIsMoreThanYear: zNullableBoolean,
	securitiesOfferedAreOfEquityType: zNullableBoolean,
	isBusinessCombinationTransaction: zNullableBoolean,
	minimumInvestmentAccepted: zNullableNumber,
	totalOfferingAmount: zNullableNumber,
	totalAmountSold: zNullableNumber,
	totalAmountRemaining: zNullableNumber,
	hasNonAccreditedInvestors: zNullableBoolean,
	totalNumberAlreadyInvested: zNullableNumber,
	salesCommissions: zNullableNumber,
	findersFees: zNullableNumber,
	grossProceedsUsed: zNullableNumber,
})
export const EquityOfferingUpdateArraySchema = z.array(EquityOfferingUpdateSchema)

export const EquityOfferingSearchResultSchema = z.object({
	cik: z.string(),
	name: z.string(),
	date: z.string(),
})
export const EquityOfferingSearchResultArraySchema = z.array(EquityOfferingSearchResultSchema)

// --- CRYPTO SCHEMAS ---
export const CryptocurrencyListItemSchema = z.object({
	symbol: z.string(),
	name: z.string(),
	exchange: zNullableString,
	icoDate: zNullableString,
	circulatingSupply: zNullableNumber,
	totalSupply: zNullableNumber,
})
export const CryptocurrencyListItemArraySchema = z.array(CryptocurrencyListItemSchema)

export const CryptocurrencyQuoteSchema = BaseQuoteSchema
export const CryptocurrencyQuoteArraySchema = z.array(CryptocurrencyQuoteSchema)

export const CryptocurrencyQuoteShortSchema = z.object({
	symbol: z.string(),
	price: z.number(),
	change: zNullableNumber,
	volume: zNullableNumber,
})
export const CryptocurrencyQuoteShortArraySchema = z.array(CryptocurrencyQuoteShortSchema)
export const AllCryptocurrenciesQuotesArraySchema = z.union([CryptocurrencyQuoteShortArraySchema, CryptocurrencyQuoteArraySchema])

// --- FOREX SCHEMAS ---
export const ForexPairSchema = z.object({
	symbol: z.string(),
	fromCurrency: z.string(),
	toCurrency: z.string(),
	fromName: zNullableString,
	toName: zNullableString,
})
export const ForexPairArraySchema = z.array(ForexPairSchema)

export const ForexQuoteSchema = BaseQuoteSchema
export const ForexQuoteArraySchema = z.array(ForexQuoteSchema)

export const ForexQuoteShortSchema = z.object({
	symbol: z.string(),
	price: z.number(),
	change: zNullableNumber,
	volume: zNullableNumber,
})
export const ForexQuoteShortArraySchema = z.array(ForexQuoteShortSchema)
export const AllForexQuotesArraySchema = z.union([ForexQuoteShortArraySchema, ForexQuoteArraySchema])

// --- STATEMENTS SCHEMAS ---
const zStringOrNumberNullable = z.union([z.string(), z.number()]).nullable()

export const IncomeStatementSchema = z.object({
	date: z.string(),
	symbol: z.string(),
	reportedCurrency: zNullableString,
	cik: zNullableString,
	filingDate: zNullableString,
	acceptedDate: zNullableString,
	fiscalYear: z.string(),
	period: FinancialPeriodSchema,
	revenue: zStringOrNumberNullable,
	costOfRevenue: zStringOrNumberNullable,
	grossProfit: zStringOrNumberNullable,
	researchAndDevelopmentExpenses: zStringOrNumberNullable,
	generalAndAdministrativeExpenses: zStringOrNumberNullable,
	sellingAndMarketingExpenses: zStringOrNumberNullable,
	sellingGeneralAndAdministrativeExpenses: zStringOrNumberNullable,
	otherExpenses: zStringOrNumberNullable,
	operatingExpenses: zStringOrNumberNullable,
	costAndExpenses: zStringOrNumberNullable,
	netInterestIncome: zStringOrNumberNullable.optional(),
	interestIncome: zStringOrNumberNullable,
	interestExpense: zStringOrNumberNullable,
	depreciationAndAmortization: zStringOrNumberNullable,
	ebitda: zStringOrNumberNullable,
	ebit: zStringOrNumberNullable,
	nonOperatingIncomeExcludingInterest: zStringOrNumberNullable.optional(),
	operatingIncome: zStringOrNumberNullable,
	totalOtherIncomeExpensesNet: zStringOrNumberNullable,
	incomeBeforeTax: zStringOrNumberNullable,
	incomeTaxExpense: zStringOrNumberNullable,
	netIncomeFromContinuingOperations: zStringOrNumberNullable,
	netIncomeFromDiscontinuedOperations: zStringOrNumberNullable.optional(),
	otherAdjustmentsToNetIncome: zStringOrNumberNullable.optional(),
	netIncome: zStringOrNumberNullable,
	netIncomeDeductions: zStringOrNumberNullable.optional(),
	bottomLineNetIncome: zStringOrNumberNullable.optional(),
	eps: zStringOrNumberNullable,
	epsDiluted: zStringOrNumberNullable,
	weightedAverageShsOut: zStringOrNumberNullable,
	weightedAverageShsOutDil: zStringOrNumberNullable,
})
export const IncomeStatementArraySchema = z.array(IncomeStatementSchema)

export const BalanceSheetStatementSchema = z.object({
	date: z.string(),
	symbol: z.string(),
	reportedCurrency: zNullableString,
	cik: zNullableString,
	filingDate: zNullableString,
	acceptedDate: zNullableString,
	fiscalYear: z.string(),
	period: FinancialPeriodSchema,
	cashAndCashEquivalents: zStringOrNumberNullable,
	shortTermInvestments: zStringOrNumberNullable,
	cashAndShortTermInvestments: zStringOrNumberNullable,
	netReceivables: zStringOrNumberNullable,
	accountsReceivables: zStringOrNumberNullable.optional(),
	otherReceivables: zStringOrNumberNullable.optional(),
	inventory: zStringOrNumberNullable,
	prepaids: zStringOrNumberNullable.optional(),
	otherCurrentAssets: zStringOrNumberNullable,
	totalCurrentAssets: zStringOrNumberNullable,
	propertyPlantEquipmentNet: zStringOrNumberNullable,
	goodwill: zStringOrNumberNullable,
	intangibleAssets: zStringOrNumberNullable,
	goodwillAndIntangibleAssets: zStringOrNumberNullable,
	longTermInvestments: zStringOrNumberNullable,
	taxAssets: zStringOrNumberNullable,
	otherNonCurrentAssets: zStringOrNumberNullable,
	totalNonCurrentAssets: zStringOrNumberNullable,
	otherAssets: zStringOrNumberNullable,
	totalAssets: zStringOrNumberNullable,
	totalPayables: zStringOrNumberNullable.optional(),
	accountPayables: zStringOrNumberNullable,
	otherPayables: zStringOrNumberNullable.optional(),
	accruedExpenses: zStringOrNumberNullable.optional(),
	shortTermDebt: zStringOrNumberNullable,
	capitalLeaseObligationsCurrent: zStringOrNumberNullable.optional(),
	taxPayables: zStringOrNumberNullable,
	deferredRevenue: zStringOrNumberNullable,
	otherCurrentLiabilities: zStringOrNumberNullable,
	totalCurrentLiabilities: zStringOrNumberNullable,
	longTermDebt: zStringOrNumberNullable,
	deferredRevenueNonCurrent: zStringOrNumberNullable.optional(),
	deferredTaxLiabilitiesNonCurrent: zStringOrNumberNullable,
	otherNonCurrentLiabilities: zStringOrNumberNullable,
	totalNonCurrentLiabilities: zStringOrNumberNullable,
	otherLiabilities: zStringOrNumberNullable,
	capitalLeaseObligations: zStringOrNumberNullable,
	totalLiabilities: zStringOrNumberNullable,
	treasuryStock: zStringOrNumberNullable.optional(),
	preferredStock: zStringOrNumberNullable,
	commonStock: zStringOrNumberNullable,
	retainedEarnings: zStringOrNumberNullable,
	additionalPaidInCapital: zStringOrNumberNullable.optional(),
	accumulatedOtherComprehensiveIncomeLoss: zStringOrNumberNullable,
	otherTotalStockholdersEquity: zStringOrNumberNullable,
	totalStockholdersEquity: zStringOrNumberNullable,
	totalEquity: zStringOrNumberNullable,
	minorityInterest: zStringOrNumberNullable,
	totalLiabilitiesAndTotalEquity: zStringOrNumberNullable,
	totalInvestments: zStringOrNumberNullable,
	totalDebt: zStringOrNumberNullable,
	netDebt: zStringOrNumberNullable,
})
export const BalanceSheetStatementArraySchema = z.array(BalanceSheetStatementSchema)

export const CashFlowStatementSchema = z.object({
	date: z.string(),
	symbol: z.string(),
	reportedCurrency: zNullableString,
	cik: zNullableString,
	filingDate: zNullableString,
	acceptedDate: zNullableString,
	fiscalYear: z.string(),
	period: FinancialPeriodSchema,
	netIncome: zStringOrNumberNullable,
	depreciationAndAmortization: zStringOrNumberNullable,
	deferredIncomeTax: zStringOrNumberNullable,
	stockBasedCompensation: zStringOrNumberNullable,
	changeInWorkingCapital: zStringOrNumberNullable,
	accountsReceivables: zStringOrNumberNullable,
	inventory: zStringOrNumberNullable,
	accountsPayables: zStringOrNumberNullable,
	otherWorkingCapital: zStringOrNumberNullable,
	otherNonCashItems: zStringOrNumberNullable,
	netCashProvidedByOperatingActivities: zStringOrNumberNullable,
	investmentsInPropertyPlantAndEquipment: zStringOrNumberNullable,
	acquisitionsNet: zStringOrNumberNullable,
	purchasesOfInvestments: zStringOrNumberNullable,
	salesMaturitiesOfInvestments: zStringOrNumberNullable,
	otherInvestingActivities: zStringOrNumberNullable,
	netCashProvidedByInvestingActivities: zStringOrNumberNullable,
	netDebtIssuance: zStringOrNumberNullable.optional(),
	longTermNetDebtIssuance: zStringOrNumberNullable.optional(),
	shortTermNetDebtIssuance: zStringOrNumberNullable.optional(),
	netStockIssuance: zStringOrNumberNullable.optional(),
	netCommonStockIssuance: zStringOrNumberNullable.optional(),
	commonStockIssuance: zStringOrNumberNullable,
	commonStockRepurchased: zStringOrNumberNullable,
	netPreferredStockIssuance: zStringOrNumberNullable.optional(),
	netDividendsPaid: zStringOrNumberNullable,
	commonDividendsPaid: zStringOrNumberNullable.optional(),
	preferredDividendsPaid: zStringOrNumberNullable.optional(),
	otherFinancingActivities: zStringOrNumberNullable,
	netCashProvidedByFinancingActivities: zStringOrNumberNullable,
	effectOfForexChangesOnCash: zStringOrNumberNullable,
	netChangeInCash: zStringOrNumberNullable,
	cashAtEndOfPeriod: zStringOrNumberNullable,
	cashAtBeginningOfPeriod: zStringOrNumberNullable,
	operatingCashFlow: zStringOrNumberNullable,
	capitalExpenditure: zStringOrNumberNullable,
	freeCashFlow: zStringOrNumberNullable,
	incomeTaxesPaid: zStringOrNumberNullable.optional(),
	interestPaid: zStringOrNumberNullable.optional(),
})
export const CashFlowStatementArraySchema = z.array(CashFlowStatementSchema)

export const LatestFinancialStatementMetaSchema = z.object({
	symbol: z.string(),
	calendarYear: z.number(),
	period: z.string(),
	date: z.string(),
	dateAdded: z.string(),
})
export const LatestFinancialStatementMetaArraySchema = z.array(LatestFinancialStatementMetaSchema)

export const KeyMetricsSchema = z.object({
	symbol: z.string(),
	date: z.string(),
	fiscalYear: z.string(),
	period: FinancialPeriodSchema,
	reportedCurrency: zNullableString,
	marketCap: zNullableNumber,
	enterpriseValue: zNullableNumber,
	evToSales: zNullableNumber,
	evToOperatingCashFlow: zNullableNumber,
	evToFreeCashFlow: zNullableNumber,
	evToEBITDA: zNullableNumber,
	netDebtToEBITDA: zNullableNumber,
	currentRatio: zNullableNumber,
	incomeQuality: zNullableNumber,
	grahamNumber: zNullableNumber,
	grahamNetNet: zNullableNumber,
	taxBurden: zNullableNumber,
	interestBurden: zNullableNumber,
	workingCapital: zNullableNumber,
	investedCapital: zNullableNumber,
	returnOnAssets: zNullableNumber,
	operatingReturnOnAssets: zNullableNumber,
	returnOnTangibleAssets: zNullableNumber,
	returnOnEquity: zNullableNumber,
	returnOnInvestedCapital: zNullableNumber,
	returnOnCapitalEmployed: zNullableNumber,
	earningsYield: zNullableNumber,
	freeCashFlowYield: zNullableNumber,
	capexToOperatingCashFlow: zNullableNumber,
	capexToDepreciation: zNullableNumber,
	capexToRevenue: zNullableNumber,
	salesGeneralAndAdministrativeToRevenue: zNullableNumber,
	researchAndDevelopementToRevenue: zNullableNumber,
	stockBasedCompensationToRevenue: zNullableNumber,
	intangiblesToTotalAssets: zNullableNumber,
	averageReceivables: zNullableNumber,
	averagePayables: zNullableNumber,
	averageInventory: zNullableNumber,
	daysOfSalesOutstanding: zNullableNumber,
	daysOfPayablesOutstanding: zNullableNumber,
	daysOfInventoryOutstanding: zNullableNumber,
	operatingCycle: zNullableNumber,
	cashConversionCycle: zNullableNumber,
	freeCashFlowToEquity: zNullableNumber,
	freeCashFlowToFirm: zNullableNumber,
	tangibleAssetValue: zNullableNumber,
	netCurrentAssetValue: zNullableNumber,
})
export const KeyMetricsArraySchema = z.array(KeyMetricsSchema)

export const FinancialRatiosSchema = z.object({
	symbol: z.string(),
	date: z.string(),
	fiscalYear: z.string(),
	period: FinancialPeriodSchema,
	reportedCurrency: zNullableString,
	grossProfitMargin: zNullableNumber,
	ebitMargin: zNullableNumber,
	ebitdaMargin: zNullableNumber,
	operatingProfitMargin: zNullableNumber,
	pretaxProfitMargin: zNullableNumber,
	continuousOperationsProfitMargin: zNullableNumber,
	netProfitMargin: zNullableNumber,
	bottomLineProfitMargin: zNullableNumber,
	receivablesTurnover: zNullableNumber,
	payablesTurnover: zNullableNumber,
	inventoryTurnover: zNullableNumber,
	fixedAssetTurnover: zNullableNumber,
	assetTurnover: zNullableNumber,
	currentRatio: zNullableNumber,
	quickRatio: zNullableNumber,
	solvencyRatio: zNullableNumber,
	cashRatio: zNullableNumber,
	priceToEarningsRatio: zNullableNumber,
	priceToEarningsGrowthRatio: zNullableNumber,
	forwardPriceToEarningsGrowthRatio: zNullableNumber,
	priceToBookRatio: zNullableNumber,
	priceToSalesRatio: zNullableNumber,
	priceToFreeCashFlowRatio: zNullableNumber,
	priceToOperatingCashFlowRatio: zNullableNumber,
	debtToAssetsRatio: zNullableNumber,
	debtToEquityRatio: zNullableNumber,
	debtToCapitalRatio: zNullableNumber,
	longTermDebtToCapitalRatio: zNullableNumber,
	financialLeverageRatio: zNullableNumber,
	workingCapitalTurnoverRatio: zNullableNumber,
	operatingCashFlowRatio: zNullableNumber,
	operatingCashFlowSalesRatio: zNullableNumber,
	freeCashFlowOperatingCashFlowRatio: zNullableNumber,
	debtServiceCoverageRatio: zNullableNumber,
	interestCoverageRatio: zNullableNumber,
	shortTermOperatingCashFlowCoverageRatio: zNullableNumber,
	operatingCashFlowCoverageRatio: zNullableNumber,
	capitalExpenditureCoverageRatio: zNullableNumber,
	dividendPaidAndCapexCoverageRatio: zNullableNumber,
	dividendPayoutRatio: zNullableNumber,
	dividendYield: zNullableNumber,
	dividendYieldPercentage: zNullableNumber,
	revenuePerShare: zNullableNumber,
	netIncomePerShare: zNullableNumber,
	interestDebtPerShare: zNullableNumber,
	cashPerShare: zNullableNumber,
	bookValuePerShare: zNullableNumber,
	tangibleBookValuePerShare: zNullableNumber,
	shareholdersEquityPerShare: zNullableNumber,
	operatingCashFlowPerShare: zNullableNumber,
	capexPerShare: zNullableNumber,
	freeCashFlowPerShare: zNullableNumber,
	netIncomePerEBT: zNullableNumber,
	ebtPerEbit: zNullableNumber,
	priceToFairValue: zNullableNumber,
	debtToMarketCap: zNullableNumber,
	effectiveTaxRate: zNullableNumber,
	enterpriseValueMultiple: zNullableNumber,
})
export const FinancialRatiosArraySchema = z.array(FinancialRatiosSchema)

export const KeyMetricsTTMSchema = z.object({
	symbol: z.string(),
	marketCap: zStringOrNumberNullable.optional(), // From your type, but not in example
	marketCapTTM: zStringOrNumberNullable.optional(), // From your type
	enterpriseValueTTM: zStringOrNumberNullable,
	evToSalesTTM: zStringOrNumberNullable,
	evToOperatingCashFlowTTM: zStringOrNumberNullable,
	evToFreeCashFlowTTM: zStringOrNumberNullable,
	evToEBITDATTM: zStringOrNumberNullable,
	netDebtToEBITDATTM: zStringOrNumberNullable,
	currentRatioTTM: zStringOrNumberNullable,
	incomeQualityTTM: zStringOrNumberNullable,
	grahamNumberTTM: zStringOrNumberNullable,
	grahamNetNetTTM: zStringOrNumberNullable,
	taxBurdenTTM: zStringOrNumberNullable,
	interestBurdenTTM: zStringOrNumberNullable,
	workingCapitalTTM: zStringOrNumberNullable,
	investedCapitalTTM: zStringOrNumberNullable,
	returnOnAssetsTTM: zStringOrNumberNullable,
	operatingReturnOnAssetsTTM: zStringOrNumberNullable,
	returnOnTangibleAssetsTTM: zStringOrNumberNullable,
	returnOnEquityTTM: zStringOrNumberNullable,
	returnOnInvestedCapitalTTM: zStringOrNumberNullable,
	returnOnCapitalEmployedTTM: zStringOrNumberNullable,
	earningsYieldTTM: zStringOrNumberNullable,
	freeCashFlowYieldTTM: zStringOrNumberNullable,
	capexToOperatingCashFlowTTM: zStringOrNumberNullable,
	capexToDepreciationTTM: zStringOrNumberNullable,
	capexToRevenueTTM: zStringOrNumberNullable,
	salesGeneralAndAdministrativeToRevenueTTM: zStringOrNumberNullable,
	researchAndDevelopementToRevenueTTM: zStringOrNumberNullable,
	stockBasedCompensationToRevenueTTM: zStringOrNumberNullable,
	intangiblesToTotalAssetsTTM: zStringOrNumberNullable,
	averageReceivablesTTM: zStringOrNumberNullable,
	averagePayablesTTM: zStringOrNumberNullable,
	averageInventoryTTM: zStringOrNumberNullable,
	daysOfSalesOutstandingTTM: zStringOrNumberNullable,
	daysOfPayablesOutstandingTTM: zStringOrNumberNullable,
	daysOfInventoryOutstandingTTM: zStringOrNumberNullable,
	operatingCycleTTM: zStringOrNumberNullable,
	cashConversionCycleTTM: zStringOrNumberNullable,
	freeCashFlowToEquityTTM: zStringOrNumberNullable,
	freeCashFlowToFirmTTM: zStringOrNumberNullable,
	tangibleAssetValueTTM: zStringOrNumberNullable,
	netCurrentAssetValueTTM: zStringOrNumberNullable,
})
export const KeyMetricsTTMArraySchema = z.array(KeyMetricsTTMSchema)

export const FinancialRatiosTTMSchema = z.object({
	symbol: z.string(),
	grossProfitMarginTTM: zStringOrNumberNullable,
	ebitMarginTTM: zStringOrNumberNullable,
	ebitdaMarginTTM: zStringOrNumberNullable,
	operatingProfitMarginTTM: zStringOrNumberNullable,
	pretaxProfitMarginTTM: zStringOrNumberNullable,
	continuousOperationsProfitMarginTTM: zStringOrNumberNullable,
	netProfitMarginTTM: zStringOrNumberNullable,
	bottomLineProfitMarginTTM: zStringOrNumberNullable,
	receivablesTurnoverTTM: zStringOrNumberNullable,
	payablesTurnoverTTM: zStringOrNumberNullable,
	inventoryTurnoverTTM: zStringOrNumberNullable,
	fixedAssetTurnoverTTM: zStringOrNumberNullable,
	assetTurnoverTTM: zStringOrNumberNullable,
	currentRatioTTM: zStringOrNumberNullable,
	quickRatioTTM: zStringOrNumberNullable,
	solvencyRatioTTM: zStringOrNumberNullable,
	cashRatioTTM: zStringOrNumberNullable,
	priceToEarningsRatioTTM: zStringOrNumberNullable,
	priceToEarningsGrowthRatioTTM: zStringOrNumberNullable,
	forwardPriceToEarningsGrowthRatioTTM: zStringOrNumberNullable.optional(),
	priceToBookRatioTTM: zStringOrNumberNullable,
	priceToSalesRatioTTM: zStringOrNumberNullable,
	priceToFreeCashFlowRatioTTM: zStringOrNumberNullable,
	priceToOperatingCashFlowRatioTTM: zStringOrNumberNullable,
	debtToAssetsRatioTTM: zStringOrNumberNullable,
	debtToEquityRatioTTM: zStringOrNumberNullable,
	debtToCapitalRatioTTM: zStringOrNumberNullable,
	longTermDebtToCapitalRatioTTM: zStringOrNumberNullable,
	financialLeverageRatioTTM: zStringOrNumberNullable,
	workingCapitalTurnoverRatioTTM: zStringOrNumberNullable,
	operatingCashFlowRatioTTM: zStringOrNumberNullable,
	operatingCashFlowSalesRatioTTM: zStringOrNumberNullable,
	freeCashFlowOperatingCashFlowRatioTTM: zStringOrNumberNullable,
	debtServiceCoverageRatioTTM: zStringOrNumberNullable,
	interestCoverageRatioTTM: zStringOrNumberNullable,
	shortTermOperatingCashFlowCoverageRatioTTM: zStringOrNumberNullable,
	operatingCashFlowCoverageRatioTTM: zStringOrNumberNullable,
	capitalExpenditureCoverageRatioTTM: zStringOrNumberNullable,
	dividendPaidAndCapexCoverageRatioTTM: zStringOrNumberNullable,
	dividendPayoutRatioTTM: zStringOrNumberNullable,
	dividendYieldTTM: zStringOrNumberNullable,
	dividendYieldPercentageTTM: zStringOrNumberNullable.optional(),
	enterpriseValueTTM: zStringOrNumberNullable.optional(),
	revenuePerShareTTM: zStringOrNumberNullable,
	netIncomePerShareTTM: zStringOrNumberNullable,
	interestDebtPerShareTTM: zStringOrNumberNullable,
	cashPerShareTTM: zStringOrNumberNullable,
	bookValuePerShareTTM: zStringOrNumberNullable,
	tangibleBookValuePerShareTTM: zStringOrNumberNullable,
	shareholdersEquityPerShareTTM: zStringOrNumberNullable,
	operatingCashFlowPerShareTTM: zStringOrNumberNullable,
	capexPerShareTTM: zStringOrNumberNullable,
	freeCashFlowPerShareTTM: zStringOrNumberNullable,
	netIncomePerEBTTTM: zStringOrNumberNullable,
	ebtPerEbitTTM: zStringOrNumberNullable,
	priceToFairValueTTM: zStringOrNumberNullable,
	debtToMarketCapTTM: zStringOrNumberNullable,
	effectiveTaxRateTTM: zStringOrNumberNullable,
	enterpriseValueMultipleTTM: zStringOrNumberNullable,
})
export const FinancialRatiosTTMArraySchema = z.array(FinancialRatiosTTMSchema)

export const FinancialScoresSchema = z.object({
	symbol: z.string(),
	reportedCurrency: zNullableString,
	altmanZScore: zStringOrNumberNullable,
	piotroskiScore: zStringOrNumberNullable,
	workingCapital: zStringOrNumberNullable,
	totalAssets: zStringOrNumberNullable,
	retainedEarnings: zStringOrNumberNullable,
	ebit: zStringOrNumberNullable,
	marketCap: zStringOrNumberNullable,
	totalLiabilities: zStringOrNumberNullable,
	revenue: zStringOrNumberNullable,
})
export const FinancialScoresArraySchema = z.array(FinancialScoresSchema)

export const OwnerEarningsSchema = z.object({
	symbol: z.string(),
	reportedCurrency: zNullableString,
	fiscalYear: z.string(),
	period: z.string(),
	date: z.string(),
	averagePPE: zNullableNumber,
	maintenanceCapex: zNullableNumber,
	ownersEarnings: zNullableNumber,
	growthCapex: zNullableNumber,
	ownersEarningsPerShare: zNullableNumber,
})
export const OwnerEarningsArraySchema = z.array(OwnerEarningsSchema)

export const EnterpriseValueSchema = z.object({
	symbol: z.string(),
	date: z.string(),
	stockPrice: zNullableNumber,
	numberOfShares: zNullableNumber,
	marketCapitalization: zNullableNumber,
	minusCashAndCashEquivalents: zNullableNumber,
	addTotalDebt: zNullableNumber,
	enterpriseValue: zNullableNumber,
})
export const EnterpriseValueArraySchema = z.array(EnterpriseValueSchema)

export const IncomeStatementGrowthSchema = z.object({
	symbol: z.string(),
	date: z.string(),
	fiscalYear: z.string(),
	period: FinancialPeriodSchema,
	reportedCurrency: zNullableString,
	growthRevenue: zNullableNumber,
	growthCostOfRevenue: zNullableNumber,
	growthGrossProfit: zNullableNumber,
	growthGrossProfitRatio: zNullableNumber,
	growthResearchAndDevelopmentExpenses: zNullableNumber,
	growthGeneralAndAdministrativeExpenses: zNullableNumber,
	growthSellingAndMarketingExpenses: zNullableNumber,
	growthOtherExpenses: zNullableNumber,
	growthOperatingExpenses: zNullableNumber,
	growthCostAndExpenses: zNullableNumber,
	growthInterestIncome: zNullableNumber.optional(),
	growthInterestExpense: zNullableNumber.optional(),
	growthDepreciationAndAmortization: zNullableNumber,
	growthEBITDA: zNullableNumber,
	growthOperatingIncome: zNullableNumber,
	growthIncomeBeforeTax: zNullableNumber,
	growthIncomeTaxExpense: zNullableNumber,
	growthNetIncome: zNullableNumber,
	growthEPS: zNullableNumber,
	growthEPSDiluted: zNullableNumber,
	growthWeightedAverageShsOut: zNullableNumber,
	growthWeightedAverageShsOutDil: zNullableNumber,
	growthEBIT: zNullableNumber.optional(),
	growthNonOperatingIncomeExcludingInterest: zNullableNumber.optional(),
	growthNetInterestIncome: zNullableNumber.optional(),
	growthTotalOtherIncomeExpensesNet: zNullableNumber.optional(),
	growthNetIncomeFromContinuingOperations: zNullableNumber.optional(),
	growthOtherAdjustmentsToNetIncome: zNullableNumber.optional(),
	growthNetIncomeDeductions: zNullableNumber.optional(),
})
export const IncomeStatementGrowthArraySchema = z.array(IncomeStatementGrowthSchema)

export const BalanceSheetStatementGrowthSchema = z.object({
	symbol: z.string(),
	date: z.string(),
	fiscalYear: z.string(),
	period: FinancialPeriodSchema,
	reportedCurrency: zNullableString,
	growthCashAndCashEquivalents: zNullableNumber,
	growthShortTermInvestments: zNullableNumber,
	growthCashAndShortTermInvestments: zNullableNumber,
	growthNetReceivables: zNullableNumber,
	growthInventory: zNullableNumber,
	growthOtherCurrentAssets: zNullableNumber,
	growthTotalCurrentAssets: zNullableNumber,
	growthPropertyPlantEquipmentNet: zNullableNumber,
	growthGoodwill: zNullableNumber,
	growthIntangibleAssets: zNullableNumber,
	growthGoodwillAndIntangibleAssets: zNullableNumber,
	growthLongTermInvestments: zNullableNumber,
	growthTaxAssets: zNullableNumber,
	growthOtherNonCurrentAssets: zNullableNumber,
	growthTotalNonCurrentAssets: zNullableNumber,
	growthOtherAssets: zNullableNumber,
	growthTotalAssets: zNullableNumber,
	growthAccountPayables: zNullableNumber,
	growthShortTermDebt: zNullableNumber,
	growthTaxPayables: zNullableNumber,
	growthDeferredRevenue: zNullableNumber,
	growthOtherCurrentLiabilities: zNullableNumber,
	growthTotalCurrentLiabilities: zNullableNumber,
	growthLongTermDebt: zNullableNumber,
	growthDeferredRevenueNonCurrent: zNullableNumber,
	growthDeferredTaxLiabilitiesNonCurrent: zNullableNumber,
	growthOtherNonCurrentLiabilities: zNullableNumber,
	growthTotalNonCurrentLiabilities: zNullableNumber,
	growthOtherLiabilities: zNullableNumber,
	growthTotalLiabilities: zNullableNumber,
	growthPreferredStock: zNullableNumber,
	growthCommonStock: zNullableNumber,
	growthRetainedEarnings: zNullableNumber,
	growthAccumulatedOtherComprehensiveIncomeLoss: zNullableNumber,
	growthOthertotalStockholdersEquity: zNullableNumber,
	growthTotalStockholdersEquity: zNullableNumber,
	growthMinorityInterest: zNullableNumber,
	growthTotalEquity: zNullableNumber,
	growthTotalLiabilitiesAndStockholdersEquity: zNullableNumber,
	growthTotalInvestments: zNullableNumber,
	growthTotalDebt: zNullableNumber,
	growthNetDebt: zNullableNumber,
	growthAccountsReceivables: zNullableNumber.optional(),
	growthOtherReceivables: zNullableNumber.optional(),
	growthPrepaids: zNullableNumber.optional(),
	growthTotalPayables: zNullableNumber.optional(),
	growthOtherPayables: zNullableNumber.optional(),
	growthAccruedExpenses: zNullableNumber.optional(),
	growthCapitalLeaseObligationsCurrent: zNullableNumber.optional(),
	growthAdditionalPaidInCapital: zNullableNumber.optional(),
	growthTreasuryStock: zNullableNumber.optional(),
})
export const BalanceSheetStatementGrowthArraySchema = z.array(BalanceSheetStatementGrowthSchema)

export const CashFlowStatementGrowthSchema = z.object({
	symbol: z.string(),
	date: z.string(),
	fiscalYear: z.string(),
	period: FinancialPeriodSchema,
	reportedCurrency: zNullableString,
	growthNetIncome: zNullableNumber,
	growthDepreciationAndAmortization: zNullableNumber,
	growthDeferredIncomeTax: zNullableNumber,
	growthStockBasedCompensation: zNullableNumber,
	growthChangeInWorkingCapital: zNullableNumber,
	growthAccountsReceivables: zNullableNumber,
	growthInventory: zNullableNumber,
	growthAccountsPayables: zNullableNumber,
	growthOtherWorkingCapital: zNullableNumber,
	growthOtherNonCashItems: zNullableNumber,
	growthNetCashProvidedByOperatingActivites: zNullableNumber,
	growthInvestmentsInPropertyPlantAndEquipment: zNullableNumber,
	growthAcquisitionsNet: zNullableNumber,
	growthPurchasesOfInvestments: zNullableNumber,
	growthSalesMaturitiesOfInvestments: zNullableNumber,
	growthOtherInvestingActivites: zNullableNumber,
	growthNetCashUsedForInvestingActivites: zNullableNumber,
	growthDebtRepayment: zNullableNumber.optional(),
	growthCommonStockIssued: zNullableNumber.optional(),
	growthCommonStockRepurchased: zNullableNumber.optional(),
	growthDividendsPaid: zNullableNumber.optional(),
	growthOtherFinancingActivites: zNullableNumber,
	growthNetCashUsedProvidedByFinancingActivities: zNullableNumber,
	growthEffectOfForexChangesOnCash: zNullableNumber,
	growthNetChangeInCash: zNullableNumber,
	growthCashAtEndOfPeriod: zNullableNumber,
	growthCashAtBeginningOfPeriod: zNullableNumber,
	growthOperatingCashFlow: zNullableNumber,
	growthCapitalExpenditure: zNullableNumber,
	growthFreeCashFlow: zNullableNumber,
	growthNetDebtIssuance: zNullableNumber.optional(),
	growthLongTermNetDebtIssuance: zNullableNumber.optional(),
	growthShortTermNetDebtIssuance: zNullableNumber.optional(),
	growthNetStockIssuance: zNullableNumber.optional(),
	growthPreferredDividendsPaid: zNullableNumber.optional(),
	growthIncomeTaxesPaid: zNullableNumber.optional(),
	growthInterestPaid: zNullableNumber.optional(),
})
export const CashFlowStatementGrowthArraySchema = z.array(CashFlowStatementGrowthSchema)

export const FinancialStatementGrowthSchema = z.object({
	symbol: z.string(),
	date: z.string(),
	fiscalYear: z.string(),
	period: FinancialPeriodSchema,
	reportedCurrency: zNullableString,
	revenueGrowth: zNullableNumber,
	grossProfitGrowth: zNullableNumber,
	ebitgrowth: zNullableNumber,
	operatingIncomeGrowth: zNullableNumber,
	netIncomeGrowth: zNullableNumber,
	epsgrowth: zNullableNumber,
	epsdilutedGrowth: zNullableNumber,
	weightedAverageSharesGrowth: zNullableNumber,
	weightedAverageSharesDilutedGrowth: zNullableNumber,
	dividendsPerShareGrowth: zNullableNumber,
	operatingCashFlowGrowth: zNullableNumber,
	receivablesGrowth: zNullableNumber,
	inventoryGrowth: zNullableNumber,
	assetGrowth: zNullableNumber,
	bookValueperShareGrowth: zNullableNumber,
	debtGrowth: zNullableNumber,
	rdexpenseGrowth: zNullableNumber,
	sgaexpensesGrowth: zNullableNumber,
	freeCashFlowGrowth: zNullableNumber,
	tenYRevenueGrowthPerShare: zNullableNumber,
	fiveYRevenueGrowthPerShare: zNullableNumber,
	threeYRevenueGrowthPerShare: zNullableNumber,
	tenYOperatingCFGrowthPerShare: zNullableNumber,
	fiveYOperatingCFGrowthPerShare: zNullableNumber,
	threeYOperatingCFGrowthPerShare: zNullableNumber,
	tenYNetIncomeGrowthPerShare: zNullableNumber,
	fiveYNetIncomeGrowthPerShare: zNullableNumber,
	threeYNetIncomeGrowthPerShare: zNullableNumber,
	tenYShareholdersEquityGrowthPerShare: zNullableNumber,
	fiveYShareholdersEquityGrowthPerShare: zNullableNumber,
	threeYShareholdersEquityGrowthPerShare: zNullableNumber,
	tenYDividendperShareGrowthPerShare: zNullableNumber,
	fiveYDividendperShareGrowthPerShare: zNullableNumber,
	threeYDividendperShareGrowthPerShare: zNullableNumber,
	ebitdaGrowth: zNullableNumber,
	growthCapitalExpenditure: zNullableNumber,
	tenYBottomLineNetIncomeGrowthPerShare: zNullableNumber,
	fiveYBottomLineNetIncomeGrowthPerShare: zNullableNumber,
	threeYBottomLineNetIncomeGrowthPerShare: zNullableNumber,
})
export const FinancialStatementGrowthArraySchema = z.array(FinancialStatementGrowthSchema)

export const FinancialReportDateLinksSchema = z.object({
	symbol: z.string(),
	fiscalYear: z.number(),
	period: z.string(),
	linkXlsx: zNullableString,
	linkJson: zNullableString,
})
export const FinancialReportDateLinksArraySchema = z.array(FinancialReportDateLinksSchema)

export const FinancialReportFullJsonSchema = z.object({
	symbol: z.string(),
	period: z.string(),
	year: z.string(),
}).catchall(z.any()) // For dynamic keys
export const FinancialReportFullJsonArraySchema = z.array(FinancialReportFullJsonSchema)

export const RevenueSegmentationSchema = z.object({
	symbol: z.string(),
	fiscalYear: z.number(),
	period: z.string(),
	reportedCurrency: zNullableString,
	date: z.string(),
	data: z.record(z.string(), z.number()),
})
export const RevenueSegmentationArraySchema = z.array(RevenueSegmentationSchema)

export const AsReportedFinancialStatementSchema = z.object({
	symbol: z.string(),
	fiscalYear: z.union([z.number(), z.string()]),
	period: z.string(),
	reportedCurrency: zNullableString,
	date: z.string(),
	data: z.record(z.string(), z.union([z.number(), z.string(), z.boolean()]).nullable()),
})
export const AsReportedFinancialStatementArraySchema = z.array(AsReportedFinancialStatementSchema)

export const FullAsReportedFinancialStatementSchema = z.object({
	symbol: z.string(),
	fiscalYear: z.union([z.number(), z.string()]),
	period: z.string(),
	reportedCurrency: zNullableString,
	date: z.string(),
	data: z.record(z.string(), z.any()),
})
export const FullAsReportedFinancialStatementArraySchema = z.array(FullAsReportedFinancialStatementSchema)

// --- FORM 13F SCHEMAS ---
export const InstitutionalOwnershipFilingSchema = z.object({
	cik: z.string(),
	name: z.string(),
	date: z.string(),
	filingDate: z.string(),
	acceptedDate: z.string(),
	formType: z.string(),
	link: z.string(),
	finalLink: z.string(),
})
export const InstitutionalOwnershipFilingArraySchema = z.array(InstitutionalOwnershipFilingSchema)

export const SecFilingExtractSchema = z.object({
	date: z.string(),
	filingDate: z.string(),
	acceptedDate: z.string(),
	cik: z.string(),
	securityCusip: z.string(),
	symbol: z.string(),
	nameOfIssuer: z.string(),
	shares: z.number(),
	titleOfClass: z.string(),
	sharesType: z.string(),
	putCallShare: zNullableString,
	value: z.number(),
	link: z.string(),
	finalLink: z.string(),
})
export const SecFilingExtractArraySchema = z.array(SecFilingExtractSchema)

export const Form13FFilingDateSchema = z.object({
	date: z.string(),
	year: z.number(),
	quarter: z.number(),
})
export const Form13FFilingDateArraySchema = z.array(Form13FFilingDateSchema)

export const HolderAnalyticsSchema = z.object({
	date: z.string(),
	cik: z.string(),
	filingDate: z.string(),
	investorName: z.string(),
	symbol: z.string(),
	securityName: z.string(),
	typeOfSecurity: z.string(),
	securityCusip: z.string(),
	sharesType: z.string(),
	putCallShare: zNullableString,
	investmentDiscretion: z.string(),
	industryTitle: zNullableString,
	weight: zNullableNumber,
	lastWeight: zNullableNumber,
	changeInWeight: zNullableNumber,
	changeInWeightPercentage: zNullableNumber,
	marketValue: zNullableNumber,
	lastMarketValue: zNullableNumber,
	changeInMarketValue: zNullableNumber,
	changeInMarketValuePercentage: zNullableNumber,
	sharesNumber: zNullableNumber,
	lastSharesNumber: zNullableNumber,
	changeInSharesNumber: zNullableNumber,
	changeInSharesNumberPercentage: zNullableNumber,
	quarterEndPrice: zNullableNumber,
	avgPricePaid: zNullableNumber,
	isNew: zNullableBoolean,
	isSoldOut: zNullableBoolean,
	ownership: zNullableNumber,
	lastOwnership: zNullableNumber,
	changeInOwnership: zNullableNumber,
	changeInOwnershipPercentage: zNullableNumber,
	holdingPeriod: zNullableNumber,
	firstAdded: zNullableString,
	performance: zNullableNumber,
	performancePercentage: zNullableNumber,
	lastPerformance: zNullableNumber,
	changeInPerformance: zNullableNumber,
	isCountedForPerformance: zNullableBoolean,
})
export const HolderAnalyticsArraySchema = z.array(HolderAnalyticsSchema)

export const HolderPerformanceSummarySchema = z.object({
	date: z.string(),
	cik: z.string(),
	investorName: z.string(),
	portfolioSize: zNullableNumber,
	securitiesAdded: zNullableNumber,
	securitiesRemoved: zNullableNumber,
	marketValue: zNullableNumber,
	previousMarketValue: zNullableNumber,
	changeInMarketValue: zNullableNumber,
	changeInMarketValuePercentage: zNullableNumber,
	averageHoldingPeriod: zNullableNumber,
	averageHoldingPeriodTop10: zNullableNumber,
	averageHoldingPeriodTop20: zNullableNumber,
	turnover: zNullableNumber,
	turnoverAlternateSell: zNullableNumber,
	turnoverAlternateBuy: zNullableNumber,
	performance: zNullableNumber,
	performancePercentage: zNullableNumber,
	lastPerformance: zNullableNumber,
	changeInPerformance: zNullableNumber,
	performance1year: zNullableNumber,
	performancePercentage1year: zNullableNumber,
	performance3year: zNullableNumber,
	performancePercentage3year: zNullableNumber,
	performance5year: zNullableNumber,
	performancePercentage5year: zNullableNumber,
	performanceSinceInception: zNullableNumber,
	performanceSinceInceptionPercentage: zNullableNumber,
	performanceRelativeToSP500Percentage: zNullableNumber,
	performance1yearRelativeToSP500Percentage: zNullableNumber,
	performance3yearRelativeToSP500Percentage: zNullableNumber,
	performance5yearRelativeToSP500Percentage: zNullableNumber,
	performanceSinceInceptionRelativeToSP500Percentage: zNullableNumber,
})
export const HolderPerformanceSummaryArraySchema = z.array(HolderPerformanceSummarySchema)

export const HolderIndustryBreakdownSchema = z.object({
	date: z.string(),
	cik: z.string(),
	investorName: z.string(),
	industryTitle: z.string(),
	weight: zNullableNumber,
	lastWeight: zNullableNumber,
	changeInWeight: zNullableNumber,
	changeInWeightPercentage: zNullableNumber,
	performance: zNullableNumber,
	performancePercentage: zNullableNumber,
	lastPerformance: zNullableNumber,
	changeInPerformance: zNullableNumber,
})
export const HolderIndustryBreakdownArraySchema = z.array(HolderIndustryBreakdownSchema)

export const SymbolPositionSummarySchema = z.object({
	symbol: z.string(),
	cik: z.string(),
	date: z.string(),
	investorsHolding: zNullableNumber,
	lastInvestorsHolding: zNullableNumber,
	investorsHoldingChange: zNullableNumber,
	numberOf13Fshares: zNullableNumber,
	lastNumberOf13Fshares: zNullableNumber,
	numberOf13FsharesChange: zNullableNumber,
	totalInvested: zNullableNumber,
	lastTotalInvested: zNullableNumber,
	totalInvestedChange: zNullableNumber,
	ownershipPercent: zNullableNumber,
	lastOwnershipPercent: zNullableNumber,
	ownershipPercentChange: zNullableNumber,
	newPositions: zNullableNumber,
	lastNewPositions: zNullableNumber,
	newPositionsChange: zNullableNumber,
	increasedPositions: zNullableNumber,
	lastIncreasedPositions: zNullableNumber,
	increasedPositionsChange: zNullableNumber,
	closedPositions: zNullableNumber,
	lastClosedPositions: zNullableNumber,
	closedPositionsChange: zNullableNumber,
	reducedPositions: zNullableNumber,
	lastReducedPositions: zNullableNumber,
	reducedPositionsChange: zNullableNumber,
	totalCalls: zNullableNumber,
	lastTotalCalls: zNullableNumber,
	totalCallsChange: zNullableNumber,
	totalPuts: zNullableNumber,
	lastTotalPuts: zNullableNumber,
	totalPutsChange: zNullableNumber,
	putCallRatio: zNullableNumber,
	lastPutCallRatio: zNullableNumber,
	putCallRatioChange: zNullableNumber,
})
export const SymbolPositionSummaryArraySchema = z.array(SymbolPositionSummarySchema) // API returns array

export const IndustryPerformanceSummarySchema = z.object({
	industryTitle: z.string(),
	industryValue: zNullableNumber,
	date: z.string(),
})
export const IndustryPerformanceSummaryArraySchema = z.array(IndustryPerformanceSummarySchema)

// --- INDEXES SCHEMAS ---
export const IndexListItemSchema = z.object({
	symbol: z.string(),
	name: z.string(),
	exchange: zNullableString,
	currency: zNullableString,
})
export const IndexListItemArraySchema = z.array(IndexListItemSchema)

export const IndexQuoteSchema = BaseQuoteSchema
export const IndexQuoteArraySchema = z.array(IndexQuoteSchema)

export const IndexQuoteShortSchema = z.object({
	symbol: z.string(),
	price: z.number(),
	change: zNullableNumber,
	volume: zNullableNumber,
})
export const IndexQuoteShortArraySchema = z.array(IndexQuoteShortSchema)
export const AllIndexQuotesArraySchema = z.union([IndexQuoteShortArraySchema, IndexQuoteArraySchema])

export const IndexConstituentSchema = z.object({
	symbol: z.string(),
	name: z.string(),
	sector: zNullableString,
	subSector: zNullableString,
	headQuarter: zNullableString,
	dateFirstAdded: zNullableString,
	cik: zNullableString,
	founded: zNullableString,
})
export const IndexConstituentArraySchema = z.array(IndexConstituentSchema)

export const HistoricalIndexConstituentChangeSchema = z.object({
	dateAdded: z.string(),
	addedSecurity: z.string(),
	removedTicker: zNullableString,
	removedSecurity: zNullableString,
	date: z.string(),
	symbol: z.string(),
	reason: zNullableString,
})
export const HistoricalIndexConstituentChangeArraySchema = z.array(HistoricalIndexConstituentChangeSchema)

// --- INSIDER TRADES SCHEMAS ---
export const InsiderTradeSchema = z.object({
	symbol: z.string(),
	filingDate: z.string(),
	transactionDate: z.string(),
	reportingCik: z.string(),
	companyCik: z.string(),
	transactionType: z.string(),
	securitiesOwned: z.number(),
	reportingName: z.string(),
	typeOfOwner: z.string(),
	acquisitionOrDisposition: z.string(),
	directOrIndirect: z.string(),
	formType: z.string(),
	securitiesTransacted: z.number(),
	price: z.number(),
	securityName: z.string(),
	url: z.string(),
})
export const InsiderTradeArraySchema = z.array(InsiderTradeSchema)

export const InsiderReportingNameSchema = z.object({
	reportingCik: z.string(),
	reportingName: z.string(),
})
export const InsiderReportingNameArraySchema = z.array(InsiderReportingNameSchema)

export const InsiderTransactionTypeSchema = z.object({ transactionType: z.string() })
export const InsiderTransactionTypeArraySchema = z.array(InsiderTransactionTypeSchema)

export const InsiderTradeStatisticsSchema = z.object({
	symbol: z.string(),
	cik: z.string(),
	year: z.number(),
	quarter: z.number(),
	acquiredTransactions: zNullableNumber,
	disposedTransactions: zNullableNumber,
	acquiredDisposedRatio: zNullableNumber,
	totalAcquired: zNullableNumber,
	totalDisposed: zNullableNumber,
	averageAcquired: zNullableNumber,
	averageDisposed: zNullableNumber,
	totalPurchases: zNullableNumber,
	totalSales: zNullableNumber,
})
export const InsiderTradeStatisticsArraySchema = z.array(InsiderTradeStatisticsSchema)

export const AcquisitionOwnershipSchema = z.object({
	cik: z.string(),
	symbol: z.string(),
	filingDate: z.string(),
	acceptedDate: z.string(),
	cusip: z.string(),
	nameOfReportingPerson: z.string(),
	citizenshipOrPlaceOfOrganization: z.string(),
	soleVotingPower: z.union([z.string(), z.number()]),
	sharedVotingPower: z.union([z.string(), z.number()]),
	soleDispositivePower: z.union([z.string(), z.number()]),
	sharedDispositivePower: z.union([z.string(), z.number()]),
	amountBeneficiallyOwned: z.union([z.string(), z.number()]),
	percentOfClass: z.union([z.string(), z.number()]),
	typeOfReportingPerson: z.string(),
	url: z.string(),
})
export const AcquisitionOwnershipArraySchema = z.array(AcquisitionOwnershipSchema)

// --- MARKET PERFORMANCE SCHEMAS ---
export const MarketSectorPerformanceSchema = z.object({
	date: z.string(),
	sector: z.string(),
	exchange: z.string(),
	averageChange: z.number(),
})
export const MarketSectorPerformanceArraySchema = z.array(MarketSectorPerformanceSchema)

export const MarketIndustryPerformanceSchema = z.object({
	date: z.string(),
	industry: z.string(),
	exchange: z.string(),
	averageChange: z.number(),
})
export const MarketIndustryPerformanceArraySchema = z.array(MarketIndustryPerformanceSchema)

export const MarketSectorPESchema = z.object({
	date: z.string(),
	sector: z.string(),
	exchange: z.string(),
	pe: z.number(),
})
export const MarketSectorPEArraySchema = z.array(MarketSectorPESchema)

export const MarketIndustryPESchema = z.object({
	date: z.string(),
	industry: z.string(),
	exchange: z.string(),
	pe: z.number(),
})
export const MarketIndustryPEArraySchema = z.array(MarketIndustryPESchema)

export const MarketMoverSchema = z.object({
	symbol: z.string(),
	price: z.number(),
	name: z.string(),
	change: z.number(),
	changesPercentage: z.number(),
	exchange: z.string(),
})
export const MarketMoverArraySchema = z.array(MarketMoverSchema)

// --- MARKET HOURS SCHEMAS ---
export const ExchangeMarketHoursSchema = z.object({
	exchange: z.string(),
	name: z.string(),
	openingHour: z.string(),
	closingHour: z.string(),
	timezone: z.string(),
	isMarketOpen: z.boolean(),
})
export const ExchangeMarketHoursArraySchema = z.array(ExchangeMarketHoursSchema)

// --- NEWS SCHEMAS ---
export const FmpArticleSchema = z.object({
	title: z.string(),
	date: z.string(),
	content: z.string(),
	tickers: zNullableString,
	image: zNullableString,
	link: z.string(),
	author: zNullableString,
	site: z.string(),
})
export const FmpArticleArraySchema = z.array(FmpArticleSchema)

export const GeneralNewsArticleSchema = z.object({
	symbol: zNullableString,
	publishedDate: z.string(),
	publisher: z.string(),
	title: z.string(),
	image: zNullableString,
	site: z.string(),
	text: z.string(),
	url: z.string(),
})
export const GeneralNewsArticleArraySchema = z.array(GeneralNewsArticleSchema)

// --- TECHNICAL INDICATORS SCHEMAS ---
export const SmaPointSchema = BaseChartItemSchema.extend({ sma: z.number() })
export const SmaPointArraySchema = z.array(SmaPointSchema)
export const EmaPointSchema = BaseChartItemSchema.extend({ ema: z.number() })
export const EmaPointArraySchema = z.array(EmaPointSchema)
export const WmaPointSchema = BaseChartItemSchema.extend({ wma: z.number() })
export const WmaPointArraySchema = z.array(WmaPointSchema)
export const DemaPointSchema = BaseChartItemSchema.extend({ dema: z.number() })
export const DemaPointArraySchema = z.array(DemaPointSchema)
export const TemaPointSchema = BaseChartItemSchema.extend({ tema: z.number() })
export const TemaPointArraySchema = z.array(TemaPointSchema)
export const RsiPointSchema = BaseChartItemSchema.extend({ rsi: z.number() })
export const RsiPointArraySchema = z.array(RsiPointSchema)
export const StandardDeviationPointSchema = BaseChartItemSchema.extend({ standardDeviation: z.number() })
export const StandardDeviationPointArraySchema = z.array(StandardDeviationPointSchema)
export const WilliamsPointSchema = BaseChartItemSchema.extend({ williams: z.number() })
export const WilliamsPointArraySchema = z.array(WilliamsPointSchema)
export const AdxPointSchema = BaseChartItemSchema.extend({ adx: z.number() })
export const AdxPointArraySchema = z.array(AdxPointSchema)

// --- QUOTE SCHEMAS ---
export const StockQuoteSchema = BaseQuoteSchema
export const StockQuoteArraySchema = z.array(StockQuoteSchema)

export const StockQuoteShortSchema = z.object({
	symbol: z.string(),
	price: z.number(),
	change: zNullableNumber,
	volume: zNullableNumber,
})
export const StockQuoteShortArraySchema = z.array(StockQuoteShortSchema)

export const AftermarketTradeSchema = z.object({
	symbol: z.string(),
	price: z.number(),
	tradeSize: z.number(),
	timestamp: z.number(),
})
export const AftermarketTradeArraySchema = z.array(AftermarketTradeSchema)

export const AftermarketQuoteSchema = z.object({
	symbol: z.string(),
	bidSize: zNullableNumber,
	bidPrice: zNullableNumber,
	askSize: zNullableNumber,
	askPrice: zNullableNumber,
	volume: zNullableNumber,
	timestamp: z.number(),
})
export const AftermarketQuoteArraySchema = z.array(AftermarketQuoteSchema)

export const StockPriceChangeSchema = z.object({
	'symbol': z.string(),
	'1D': zOptionalNullableNumber,
	'5D': zOptionalNullableNumber,
	'1M': zOptionalNullableNumber,
	'3M': zOptionalNullableNumber,
	'6M': zOptionalNullableNumber,
	'ytd': zOptionalNullableNumber,
	'1Y': zOptionalNullableNumber,
	'3Y': zOptionalNullableNumber,
	'5Y': zOptionalNullableNumber,
	'10Y': zOptionalNullableNumber,
	'max': zOptionalNullableNumber,
})
export const StockPriceChangeArraySchema = z.array(StockPriceChangeSchema)

export const ExchangeStockQuotesArraySchema = z.union([StockQuoteShortArraySchema, StockQuoteArraySchema])
export const MutualFundQuotesArraySchema = z.union([StockQuoteShortArraySchema, StockQuoteArraySchema])
export const EtfQuotesArraySchema = z.union([StockQuoteShortArraySchema, StockQuoteArraySchema])

// --- EARNINGS TRANSCRIPT SCHEMAS ---
export const LatestEarningsTranscriptMetaSchema = z.object({
	symbol: z.string(),
	period: z.string(),
	fiscalYear: z.number(),
	date: z.string(),
})
export const LatestEarningsTranscriptMetaArraySchema = z.array(LatestEarningsTranscriptMetaSchema)

export const EarningsTranscriptSchema = z.object({
	symbol: z.string(),
	period: z.string(),
	year: z.union([z.number(), z.string()]), // year can be string in docs
	date: z.string(),
	content: z.string(),
})
export const EarningsTranscriptArraySchema = z.array(EarningsTranscriptSchema)

export const EarningsTranscriptDateSchema = z.object({
	quarter: z.number(),
	fiscalYear: z.number(),
	date: z.string(),
})
export const EarningsTranscriptDateArraySchema = z.array(EarningsTranscriptDateSchema)

// --- SEC FILINGS SCHEMAS ---
export const SecFilingSchema = z.object({
	symbol: zNullableString,
	cik: z.string(),
	filingDate: z.string(),
	acceptedDate: z.string(),
	formType: z.string(),
	hasFinancials: zOptionalNullableBoolean,
	link: z.string(),
	finalLink: z.string(),
})
export const SecFilingArraySchema = z.array(SecFilingSchema)

export const SecCompanySearchResultSchema = z.object({
	symbol: zNullableString,
	name: z.string(),
	cik: z.string(),
	sicCode: zNullableString,
	industryTitle: zNullableString,
	businessAddress: z.union([z.string(), z.array(z.string())]).nullable(),
	phoneNumber: zNullableString,
})
export const SecCompanySearchResultArraySchema = z.array(SecCompanySearchResultSchema)

export const SecCompanyFullProfileSchema = z.object({
	symbol: z.string(),
	cik: z.string(),
	registrantName: z.string(),
	sicCode: zNullableString,
	sicDescription: zNullableString,
	sicGroup: zNullableString,
	isin: zNullableString,
	businessAddress: zNullableString,
	mailingAddress: zNullableString,
	phoneNumber: zNullableString,
	postalCode: zNullableString,
	city: zNullableString,
	state: zNullableString,
	country: zNullableString,
	description: zNullableString,
	ceo: zNullableString,
	website: zNullableString,
	exchange: zNullableString,
	stateLocation: zNullableString,
	stateOfIncorporation: zNullableString,
	fiscalYearEnd: zNullableString,
	ipoDate: zNullableString,
	employees: zNullableString,
	secFilingsUrl: zNullableString,
	taxIdentificationNumber: zNullableString,
	fiftyTwoWeekRange: zNullableString,
	isActive: zNullableBoolean,
	assetType: zNullableString,
	openFigiComposite: zNullableString,
	priceCurrency: zNullableString,
	marketSector: zNullableString,
	securityType: zNullableString,
	isEtf: zNullableBoolean,
	isAdr: zNullableBoolean,
	isFund: zNullableBoolean,
})
export const SecCompanyFullProfileArraySchema = z.array(SecCompanyFullProfileSchema) // API returns array

export const SicListItemSchema = z.object({
	office: zNullableString,
	sicCode: z.string(),
	industryTitle: z.string(),
})
export const SicListItemArraySchema = z.array(SicListItemSchema)

export const IndustryClassificationSearchResultSchema = z.object({
	symbol: z.string(),
	name: z.string(),
	cik: z.string(),
	sicCode: z.string(),
	industryTitle: z.string(),
	businessAddress: z.union([z.string(), z.array(z.string())]),
	phoneNumber: zNullableString,
})
export const IndustryClassificationSearchResultArraySchema = z.array(IndustryClassificationSearchResultSchema)

// --- SENATE & HOUSE TRADING SCHEMAS ---
export const CongressionalDisclosureSchema = z.object({
	symbol: zNullableString,
	disclosureDate: z.string(),
	transactionDate: z.string(),
	firstName: z.string(),
	lastName: z.string(),
	office: z.string(),
	district: zNullableString,
	owner: zNullableString,
	assetDescription: z.string(),
	assetType: z.string(),
	type: z.string(),
	amount: z.string(),
	comment: zNullableString,
	link: z.string(),
	capitalGainsOver200USD: z.union([z.string(), z.boolean()]).nullable().optional(),
})
export const CongressionalDisclosureArraySchema = z.array(CongressionalDisclosureSchema)

// --- BULK DATA SCHEMAS ---
export const BulkStockRatingSchema = z.object({
	symbol: z.string(),
	date: z.string(),
	rating: zNullableString,
	ratingRecommendation: zNullableString,
	ratingDetailsDCFRecommendation: zNullableString,
	ratingDetailsROERecommendation: zNullableString,
	ratingDetailsROARecommendation: zNullableString,
	ratingDetailsDERecommendation: zNullableString,
	ratingDetailsPERecommendation: zNullableString,
	ratingDetailsPBRecommendation: zNullableString,
})
export const BulkStockRatingArraySchema = z.array(BulkStockRatingSchema)

export const BulkDcfValuationSchema = z.object({
	symbol: z.string(),
	date: z.string(),
	discountedCashFlow: zNullableNumber,
	dcfPercentDiff: zNullableNumber,
})
export const BulkDcfValuationArraySchema = z.array(BulkDcfValuationSchema)

export const BulkPriceTargetSummarySchema = z.object({
	symbol: z.string(),
	lastMonth: z.union([z.string(), z.number()]).nullable(),
	lastMonthAvgPT: z.union([z.string(), z.number()]).nullable(),
	lastMonthAvgPTPercentDif: z.union([z.string(), z.number()]).nullable(),
	lastQuarter: z.union([z.string(), z.number()]).nullable(),
	lastQuarterAvgPT: z.union([z.string(), z.number()]).nullable(),
	lastQuarterAvgPTPercentDif: z.union([z.string(), z.number()]).nullable(),
	lastYear: z.union([z.string(), z.number()]).nullable(),
	lastYearAvgPT: z.union([z.string(), z.number()]).nullable(),
	lastYearAvgPTPercentDif: z.union([z.string(), z.number()]).nullable(),
	allTime: z.union([z.string(), z.number()]).nullable(),
	allTimeAvgPT: z.union([z.string(), z.number()]).nullable(),
	allTimeAvgPTPercentDif: z.union([z.string(), z.number()]).nullable(),
	publishers: z.string(),
})
export const BulkPriceTargetSummaryArraySchema = z.array(BulkPriceTargetSummarySchema)

export const BulkStockPeersSchema = z.object({
	symbol: z.string(),
	peers: z.string(),
})
export const BulkStockPeersArraySchema = z.array(BulkStockPeersSchema)

export const BulkEarningsSurpriseSchema = z.object({
	symbol: z.string(),
	date: z.string(),
	epsActual: z.union([z.string(), z.number()]).nullable(),
	epsEstimated: z.union([z.string(), z.number()]).nullable(),
	lastUpdated: z.string(),
})
export const BulkEarningsSurpriseArraySchema = z.array(BulkEarningsSurpriseSchema)

export const EodBulkItemSchema = z.object({
	symbol: z.string(),
	date: z.string(),
	open: z.number(),
	low: z.number(),
	high: z.number(),
	close: z.number(),
	adjClose: z.number(),
	volume: z.number(),
})
export const EodBulkItemArraySchema = z.array(EodBulkItemSchema)

// For other bulk endpoints, their item types are already defined (e.g., CompanyProfileArraySchema)
