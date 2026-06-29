import type * as api from '../api.js'

type ApiFunctionNames = {
	[K in keyof typeof api]: (typeof api)[K] extends (...args: any[]) => any ? K : never
}[keyof typeof api]

const searchSymbol = ['symbol', 'name', 'currency', 'exchangeFullName', 'exchange'] as const

const searchName = ['symbol', 'name', 'currency', 'exchangeFullName', 'exchange'] as const

const searchCik = ['symbol', 'companyName', 'cik', 'exchangeFullName', 'exchange', 'currency'] as const

const searchCusip = ['symbol', 'companyName', 'cusip', 'marketCap'] as const

const searchIsin = ['symbol', 'name', 'isin', 'marketCap'] as const

const stockScreener = ['symbol', 'companyName', 'marketCap', 'sector', 'industry', 'beta', 'price', 'lastAnnualDividend', 'volume', 'exchange', 'exchangeShortName', 'country', 'isEtf', 'isFund', 'isActivelyTrading'] as const

const searchExchangeVariants = ['symbol', 'price', 'beta', 'volAvg', 'mktCap', 'lastDiv', 'range', 'changes', 'companyName', 'currency', 'cik', 'isin', 'cusip', 'exchange', 'exchangeShortName', 'industry', 'website', 'description', 'ceo', 'sector', 'country', 'fullTimeEmployees', 'phone', 'address', 'city', 'state', 'zip', 'dcfDiff', 'dcf', 'image', 'ipoDate', 'defaultImage', 'isEtf', 'isActivelyTrading', 'isAdr', 'isFund'] as const

const listCompanySymbols = ['symbol', 'companyName'] as const

const listFinancialStatementSymbols = ['symbol', 'companyName', 'tradingCurrency', 'reportingCurrency'] as const

const listCik = ['cik', 'companyName'] as const

const listSymbolChanges = ['date', 'companyName', 'oldSymbol', 'newSymbol'] as const

const listEtfSymbol = ['symbol', 'name'] as const

const listActivelyTrading = ['symbol', 'name'] as const

const financialEstimates = ['symbol', 'date', 'revenueLow', 'revenueHigh', 'revenueAvg', 'ebitdaLow', 'ebitdaHigh', 'ebitdaAvg', 'ebitLow', 'ebitHigh', 'ebitAvg', 'netIncomeLow', 'netIncomeHigh', 'netIncomeAvg', 'sgaExpenseLow', 'sgaExpenseHigh', 'sgaExpenseAvg', 'epsAvg', 'epsHigh', 'epsLow', 'numAnalystsRevenue', 'numAnalystsEps'] as const

const ratingsSnapshot = ['symbol', 'rating', 'overallScore', 'discountedCashFlowScore', 'returnOnEquityScore', 'returnOnAssetsScore', 'debtToEquityScore', 'priceToEarningsScore', 'priceToBookScore'] as const

const historicalRatings = ['date', 'symbol', 'rating', 'overallScore', 'discountedCashFlowScore', 'returnOnEquityScore', 'returnOnAssetsScore', 'debtToEquityScore', 'priceToEarningsScore', 'priceToBookScore'] as const

const priceTargetSummary = ['symbol', 'lastMonthCount', 'lastMonthAvgPriceTarget', 'lastQuarterCount', 'lastQuarterAvgPriceTarget', 'lastYearCount', 'lastYearAvgPriceTarget', 'allTimeCount', 'allTimeAvgPriceTarget', 'publishers'] as const

const priceTargetConsensus = ['symbol', 'targetHigh', 'targetLow', 'targetConsensus', 'targetMedian'] as const

const priceTargetNews = ['symbol', 'publishedDate', 'newsURL', 'newsTitle', 'analystName', 'priceTarget', 'adjPriceTarget', 'priceWhenPosted', 'newsPublisher', 'newsBaseURL', 'analystCompany'] as const

const latestPriceTargetNews = ['symbol', 'publishedDate', 'newsURL', 'newsTitle', 'analystName', 'priceTarget', 'adjPriceTarget', 'priceWhenPosted', 'newsPublisher', 'newsBaseURL', 'analystCompany'] as const

const stockGrades = ['symbol', 'date', 'gradingCompany', 'previousGrade', 'newGrade', 'action'] as const

const historicalStockGrades = ['symbol', 'date', 'analystRatingsBuy', 'analystRatingsHold', 'analystRatingsSell', 'analystRatingsStrongSell'] as const

const stockGradeConsensus = ['symbol', 'strongBuy', 'buy', 'hold', 'sell', 'strongSell', 'consensus'] as const

const stockGradeNews = ['symbol', 'publishedDate', 'newsURL', 'newsTitle', 'newsBaseURL', 'newsPublisher', 'newGrade', 'previousGrade', 'gradingCompany', 'action', 'priceWhenPosted'] as const

const latestStockGradeNews = ['symbol', 'publishedDate', 'newsURL', 'newsTitle', 'newsBaseURL', 'newsPublisher', 'newGrade', 'previousGrade', 'gradingCompany', 'action', 'priceWhenPosted'] as const

const companyDividends = ['symbol', 'date', 'recordDate', 'paymentDate', 'declarationDate', 'adjDividend', 'dividend', 'yield', 'frequency'] as const

const dividendsCalendar = ['symbol', 'date', 'recordDate', 'paymentDate', 'declarationDate', 'adjDividend', 'dividend', 'yield', 'frequency'] as const

const companyEarningsReports = ['symbol', 'date', 'epsActual', 'epsEstimated', 'revenueActual', 'revenueEstimated', 'lastUpdated'] as const

const earningsCalendar = ['symbol', 'date', 'epsActual', 'epsEstimated', 'revenueActual', 'revenueEstimated', 'lastUpdated'] as const

const iposCalendar = ['symbol', 'date', 'daa', 'company', 'exchange', 'actions', 'shares', 'priceRange', 'marketCap'] as const

const ipoDisclosures = ['symbol', 'filingDate', 'acceptedDate', 'effectivenessDate', 'cik', 'form', 'url'] as const

const ipoProspectus = ['symbol', 'acceptedDate', 'filingDate', 'ipoDate', 'cik', 'pricePublicPerShare', 'pricePublicTotal', 'discountsAndCommissionsPerShare', 'discountsAndCommissionsTotal', 'proceedsBeforeExpensesPerShare', 'proceedsBeforeExpensesTotal', 'form', 'url'] as const

const stockSplitDetails = ['symbol', 'date', 'numerator', 'denominator'] as const

const stockSplitsCalendar = ['symbol', 'date', 'numerator', 'denominator'] as const

const stockChartFull = ['symbol', 'change', 'changePercent', 'vwap', 'date', 'open', 'high', 'low', 'close', 'volume'] as const

const unadjustedStockChart = ['symbol', 'date', 'adjOpen', 'adjHigh', 'adjLow', 'adjClose', 'volume'] as const

const dividendAdjustedStockChart = ['symbol', 'date', 'adjOpen', 'adjHigh', 'adjLow', 'adjClose', 'volume'] as const

const historicalIntradayChart = ['date', 'open', 'high', 'low', 'close', 'volume'] as const

const stockChart1Min = ['date', 'open', 'high', 'low', 'close', 'volume'] as const

const stockChart5Min = ['date', 'open', 'high', 'low', 'close', 'volume'] as const

const stockChart15Min = ['date', 'open', 'high', 'low', 'close', 'volume'] as const

const stockChart30Min = ['date', 'open', 'high', 'low', 'close', 'volume'] as const

const stockChart1Hour = ['date', 'open', 'high', 'low', 'close', 'volume'] as const

const stockChart4Hour = ['date', 'open', 'high', 'low', 'close', 'volume'] as const

const companyProfile = ['symbol', 'price', 'marketCap', 'beta', 'lastDividend', 'range', 'change', 'changePercentage', 'volume', 'averageVolume', 'companyName', 'currency', 'cik', 'isin', 'cusip', 'exchangeFullName', 'exchange', 'industry', 'website', 'description', 'ceo', 'sector', 'country', 'fullTimeEmployees', 'phone', 'address', 'city', 'state', 'zip', 'image', 'ipoDate', 'defaultImage', 'isEtf', 'isActivelyTrading', 'isAdr', 'isFund'] as const

const companyProfileByCik = ['symbol', 'price', 'marketCap', 'beta', 'lastDividend', 'range', 'change', 'changePercentage', 'volume', 'averageVolume', 'companyName', 'currency', 'cik', 'isin', 'cusip', 'exchangeFullName', 'exchange', 'industry', 'website', 'description', 'ceo', 'sector', 'country', 'fullTimeEmployees', 'phone', 'address', 'city', 'state', 'zip', 'image', 'ipoDate', 'defaultImage', 'isEtf', 'isActivelyTrading', 'isAdr', 'isFund'] as const

const companyNotes = ['cik', 'symbol', 'title', 'exchange'] as const

const stockPeers = ['symbol', 'companyName', 'price', 'mktCap'] as const

const delistedCompanies = ['symbol', 'companyName', 'exchange', 'ipoDate', 'delistedDate'] as const

const companyEmployeeCount = ['symbol', 'cik', 'acceptanceTime', 'periodOfReport', 'companyName', 'formType', 'filingDate', 'employeeCount', 'source'] as const

const historicalCompanyEmployeeCount = ['symbol', 'cik', 'acceptanceTime', 'periodOfReport', 'companyName', 'formType', 'filingDate', 'employeeCount', 'source'] as const

const companyMarketCap = ['symbol', 'date', 'marketCap'] as const

const batchMarketCap = ['symbol', 'date', 'marketCap'] as const

const historicalMarketCap = ['symbol', 'date', 'marketCap'] as const

const companySharesFloat = ['symbol', 'date', 'freeFloat', 'floatShares', 'outstandingShares'] as const

const allSharesFloat = ['symbol', 'date', 'freeFloat', 'floatShares', 'outstandingShares'] as const

const latestMergersAcquisitions = ['symbol', 'companyName', 'cik', 'targetedCompanyName', 'targetedCik', 'targetedSymbol', 'transactionDate', 'acceptedDate', 'link'] as const

const searchMergersAcquisitions = ['symbol', 'companyName', 'cik', 'targetedCompanyName', 'targetedCik', 'targetedSymbol', 'transactionDate', 'acceptedDate', 'link'] as const

const companyExecutives = ['title', 'name', 'pay', 'currencyPay', 'gender', 'yearBorn', 'active'] as const

const executiveCompensation = ['cik', 'symbol', 'companyName', 'filingDate', 'acceptedDate', 'nameAndPosition', 'year', 'salary', 'bonus', 'stockAward', 'optionAward', 'incentivePlanCompensation', 'allOtherCompensation', 'total', 'link'] as const

const executiveCompensationBenchmark = ['industryTitle', 'year', 'averageCompensation'] as const

const cotReport = ['symbol', 'date', 'name', 'sector', 'marketAndExchangeNames', 'cftcContractMarketCode', 'cftcMarketCode', 'cftcRegionCode', 'cftcCommodityCode', 'openInterestAll', 'noncommPositionsLongAll', 'noncommPositionsShortAll', 'noncommPositionsSpreadAll', 'commPositionsLongAll', 'commPositionsShortAll', 'totReptPositionsLongAll', 'totReptPositionsShortAll', 'nonreptPositionsLongAll', 'nonreptPositionsShortAll', 'openInterestOld', 'noncommPositionsLongOld', 'noncommPositionsShortOld', 'noncommPositionsSpreadOld', 'commPositionsLongOld', 'commPositionsShortOld', 'totReptPositionsLongOld', 'totReptPositionsShortOld', 'nonreptPositionsLongOld', 'nonreptPositionsShortOld', 'openInterestOther', 'noncommPositionsLongOther', 'noncommPositionsShortOther', 'noncommPositionsSpreadOther', 'commPositionsLongOther', 'commPositionsShortOther', 'totReptPositionsLongOther', 'totReptPositionsShortOther', 'nonreptPositionsLongOther', 'nonreptPositionsShortOther', 'changeInOpenInterestAll', 'changeInNoncommLongAll', 'changeInNoncommShortAll', 'changeInNoncommSpeadAll', 'changeInCommLongAll', 'changeInCommShortAll', 'changeInTotReptLongAll', 'changeInTotReptShortAll', 'changeInNonreptLongAll', 'changeInNonreptShortAll', 'pctOfOpenInterestAll', 'pctOfOiNoncommLongAll', 'pctOfOiNoncommShortAll', 'pctOfOiNoncommSpreadAll', 'pctOfOiCommLongAll', 'pctOfOiCommShortAll', 'pctOfOiTotReptLongAll', 'pctOfOiTotReptShortAll', 'pctOfOiNonreptLongAll', 'pctOfOiNonreptShortAll', 'pctOfOpenInterestOl', 'pctOfOiNoncommLongOl', 'pctOfOiNoncommShortOl', 'pctOfOiNoncommSpreadOl', 'pctOfOiCommLongOl', 'pctOfOiCommShortOl', 'pctOfOiTotReptLongOl', 'pctOfOiTotReptShortOl', 'pctOfOiNonreptLongOl', 'pctOfOiNonreptShortOl', 'pctOfOpenInterestOther', 'pctOfOiNoncommLongOther', 'pctOfOiNoncommShortOther', 'pctOfOiNoncommSpreadOther', 'pctOfOiCommLongOther', 'pctOfOiCommShortOther', 'pctOfOiTotReptLongOther', 'pctOfOiTotReptShortOther', 'pctOfOiNonreptLongOther', 'pctOfOiNonreptShortOther', 'tradersTotAll', 'tradersNoncommLongAll', 'tradersNoncommShortAll', 'tradersNoncommSpreadAll', 'tradersCommLongAll', 'tradersCommShortAll', 'tradersTotReptLongAll', 'tradersTotReptShortAll', 'tradersTotOl', 'tradersNoncommLongOl', 'tradersNoncommShortOl', 'tradersNoncommSpeadOl', 'tradersCommLongOl', 'tradersCommShortOl', 'tradersTotReptLongOl', 'tradersTotReptShortOl', 'tradersTotOther', 'tradersNoncommLongOther', 'tradersNoncommShortOther', 'tradersNoncommSpreadOther', 'tradersCommLongOther', 'tradersCommShortOther', 'tradersTotReptLongOther', 'tradersTotReptShortOther', 'concGrossLe4TdrLongAll', 'concGrossLe4TdrShortAll', 'concGrossLe8TdrLongAll', 'concGrossLe8TdrShortAll', 'concNetLe4TdrLongAll', 'concNetLe4TdrShortAll', 'concNetLe8TdrLongAll', 'concNetLe8TdrShortAll', 'concGrossLe4TdrLongOl', 'concGrossLe4TdrShortOl', 'concGrossLe8TdrLongOl', 'concGrossLe8TdrShortOl', 'concNetLe4TdrLongOl', 'concNetLe4TdrShortOl', 'concNetLe8TdrLongOl', 'concNetLe8TdrShortOl', 'concGrossLe4TdrLongOther', 'concGrossLe4TdrShortOther', 'concGrossLe8TdrLongOther', 'concGrossLe8TdrShortOther', 'concNetLe4TdrLongOther', 'concNetLe4TdrShortOther', 'concNetLe8TdrLongOther', 'concNetLe8TdrShortOther', 'contractUnits'] as const

const cotAnalysis = ['symbol', 'date', 'name', 'sector', 'exchange', 'currentLongMarketSituation', 'currentShortMarketSituation', 'marketSituation', 'previousLongMarketSituation', 'previousShortMarketSituation', 'previousMarketSituation', 'netPosition', 'previousNetPosition', 'changeInNetPosition', 'marketSentiment', 'reversalTrend'] as const

const cotReportList = ['symbol', 'name'] as const

const dcfValuation = ['symbol', 'date', 'dcf', 'Stock Price'] as const

const leveredDcfValuation = ['symbol', 'date', 'dcf', 'Stock Price'] as const

const dcfAnalysis = ['year', 'symbol', 'revenue', 'revenuePercentage', 'ebitda', 'ebitdaPercentage', 'ebit', 'ebitPercentage', 'depreciation', 'depreciationPercentage', 'totalCash', 'totalCashPercentage', 'receivables', 'receivablesPercentage', 'inventories', 'inventoriesPercentage', 'payable', 'payablePercentage', 'capitalExpenditure', 'capitalExpenditurePercentage', 'price', 'beta', 'dilutedSharesOutstanding', 'costofDebt', 'taxRate', 'afterTaxCostOfDebt', 'riskFreeRate', 'marketRiskPremium', 'costOfEquity', 'totalDebt', 'totalEquity', 'totalCapital', 'debtWeighting', 'equityWeighting', 'wacc', 'taxRateCash', 'ebiat', 'ufcf', 'sumPvUfcf', 'longTermGrowthRate', 'terminalValue', 'presentTerminalValue', 'enterpriseValue', 'netDebt', 'equityValue', 'equityValuePerShare', 'freeCashFlowT1'] as const

const dcfLeveredAnalysis = ['year', 'symbol', 'revenue', 'revenuePercentage', 'capitalExpenditure', 'capitalExpenditurePercentage', 'price', 'beta', 'dilutedSharesOutstanding', 'costofDebt', 'taxRate', 'afterTaxCostOfDebt', 'riskFreeRate', 'marketRiskPremium', 'costOfEquity', 'totalDebt', 'totalEquity', 'totalCapital', 'debtWeighting', 'equityWeighting', 'wacc', 'operatingCashFlow', 'operatingCashFlowPercentage', 'pvLfcf', 'sumPvLfcf', 'longTermGrowthRate', 'freeCashFlow', 'terminalValue', 'presentTerminalValue', 'enterpriseValue', 'netDebt', 'equityValue', 'equityValuePerShare', 'freeCashFlowT1'] as const

const treasuryRates = ['date', 'month1', 'month2', 'month3', 'month6', 'year1', 'year2', 'year3', 'year5', 'year7', 'year10', 'year20', 'year30'] as const

const economicIndicators = ['name', 'date', 'value'] as const

const economicCalendar = ['date', 'country', 'event', 'currency', 'previous', 'estimate', 'actual', 'change', 'impact', 'changePercentage'] as const

const marketRiskPremium = ['country', 'continent', 'countryRiskPremium', 'totalEquityRiskPremium'] as const

const esgDisclosures = ['date', 'acceptedDate', 'symbol', 'cik', 'companyName', 'formType', 'environmentalScore', 'socialScore', 'governanceScore', 'ESGScore', 'url'] as const

const esgRatings = ['symbol', 'cik', 'companyName', 'industry', 'fiscalYear', 'ESGRiskRating', 'industryRank'] as const

const esgBenchmark = ['fiscalYear', 'sector', 'environmentalScore', 'socialScore', 'governanceScore', 'ESGScore'] as const

const etfFundHoldings = ['symbol', 'asset', 'name', 'isin', 'securityCusip', 'sharesNumber', 'weightPercentage', 'marketValue', 'updatedAt', 'updated'] as const

const etfFundInfo = ['symbol', 'name', 'description', 'isin', 'assetClass', 'securityCusip', 'domicile', 'website', 'etfCompany', 'expenseRatio', 'assetsUnderManagement', 'avgVolume', 'inceptionDate', 'nav', 'navCurrency', 'holdingsCount', 'updatedAt', 'sectorsList'] as const

const etfFundCountryAllocation = ['country', 'weightPercentage'] as const

const etfAssetExposure = ['symbol', 'asset', 'sharesNumber', 'weightPercentage', 'marketValue'] as const

const etfSectorWeighting = ['symbol', 'sector', 'weightPercentage'] as const

const mutualFundEtfLatestDisclosures = ['cik', 'holder', 'shares', 'dateReported', 'change', 'weightPercent'] as const

const mutualFundDisclosures = ['cik', 'date', 'acceptedDate', 'symbol', 'name', 'lei', 'title', 'cusip', 'isin', 'balance', 'units', 'cur_cd', 'valUsd', 'pctVal', 'payoffProfile', 'assetCat', 'issuerCat', 'invCountry', 'isRestrictedSec', 'fairValLevel', 'isCashCollateral', 'isNonCashCollateral', 'isLoanByFund'] as const

const searchMutualFundEtfDisclosuresByName = ['symbol', 'cik', 'classId', 'seriesId', 'entityName', 'entityOrgType', 'seriesName', 'className', 'reportingFileNumber', 'address', 'city', 'zipCode', 'state'] as const

const fundEtfDisclosuresByDate = ['date', 'year', 'quarter'] as const

const commoditiesList = ['symbol', 'name', 'exchange', 'tradeMonth', 'currency'] as const

const commodityQuote = ['symbol', 'name', 'price', 'changesPercentage', 'change', 'dayLow', 'dayHigh', 'yearHigh', 'yearLow', 'marketCap', 'priceAvg50', 'priceAvg200', 'exchange', 'volume', 'avgVolume', 'open', 'previousClose', 'eps', 'pe', 'earningsAnnouncement', 'sharesOutstanding', 'timestamp'] as const

const commodityChartFull = ['symbol', 'change', 'changePercent', 'vwap', 'date', 'open', 'high', 'low', 'close', 'volume'] as const

const commodityChart1Min = ['date', 'open', 'high', 'low', 'close', 'volume'] as const

const commodityChart5Min = ['date', 'open', 'high', 'low', 'close', 'volume'] as const

const commodityChart1Hour = ['date', 'open', 'high', 'low', 'close', 'volume'] as const

const latestCrowdfundingCampaigns = ['cik', 'companyName', 'date', 'filingDate', 'acceptedDate', 'formType', 'formSignification', 'nameOfIssuer', 'legalStatusForm', 'jurisdictionOrganization', 'issuerStreet', 'issuerCity', 'issuerStateOrCountry', 'issuerZipCode', 'issuerWebsite', 'intermediaryCompanyName', 'intermediaryCommissionCik', 'intermediaryCommissionFileNumber', 'compensationAmount', 'financialInterest', 'securityOfferedType', 'securityOfferedOtherDescription', 'numberOfSecurityOffered', 'offeringPrice', 'offeringAmount', 'overSubscriptionAccepted', 'overSubscriptionAllocationType', 'maximumOfferingAmount', 'offeringDeadlineDate', 'currentNumberOfEmployees', 'totalAssetMostRecentFiscalYear', 'totalAssetPriorFiscalYear', 'cashAndCashEquiValentMostRecentFiscalYear', 'cashAndCashEquiValentPriorFiscalYear', 'accountsReceivableMostRecentFiscalYear', 'accountsReceivablePriorFiscalYear', 'shortTermDebtMostRecentFiscalYear', 'shortTermDebtPriorFiscalYear', 'longTermDebtMostRecentFiscalYear', 'longTermDebtPriorFiscalYear', 'revenueMostRecentFiscalYear', 'revenuePriorFiscalYear', 'costGoodsSoldMostRecentFiscalYear', 'costGoodsSoldPriorFiscalYear', 'taxesPaidMostRecentFiscalYear', 'taxesPaidPriorFiscalYear', 'netIncomeMostRecentFiscalYear', 'netIncomePriorFiscalYear'] as const

const searchCrowdfundingCampaigns = ['cik', 'name', 'date'] as const

const crowdfundingCampaignsByCik = ['cik', 'companyName', 'date', 'filingDate', 'acceptedDate', 'formType', 'formSignification', 'nameOfIssuer', 'legalStatusForm', 'jurisdictionOrganization', 'issuerStreet', 'issuerCity', 'issuerStateOrCountry', 'issuerZipCode', 'issuerWebsite', 'intermediaryCompanyName', 'intermediaryCommissionCik', 'intermediaryCommissionFileNumber', 'compensationAmount', 'financialInterest', 'securityOfferedType', 'securityOfferedOtherDescription', 'numberOfSecurityOffered', 'offeringPrice', 'offeringAmount', 'overSubscriptionAccepted', 'overSubscriptionAllocationType', 'maximumOfferingAmount', 'offeringDeadlineDate', 'currentNumberOfEmployees', 'totalAssetMostRecentFiscalYear', 'totalAssetPriorFiscalYear', 'cashAndCashEquiValentMostRecentFiscalYear', 'cashAndCashEquiValentPriorFiscalYear', 'accountsReceivableMostRecentFiscalYear', 'accountsReceivablePriorFiscalYear', 'shortTermDebtMostRecentFiscalYear', 'shortTermDebtPriorFiscalYear', 'longTermDebtMostRecentFiscalYear', 'longTermDebtPriorFiscalYear', 'revenueMostRecentFiscalYear', 'revenuePriorFiscalYear', 'costGoodsSoldMostRecentFiscalYear', 'costGoodsSoldPriorFiscalYear', 'taxesPaidMostRecentFiscalYear', 'taxesPaidPriorFiscalYear', 'netIncomeMostRecentFiscalYear', 'netIncomePriorFiscalYear'] as const

const latestEquityOfferingUpdates = ['cik', 'companyName', 'date', 'filingDate', 'acceptedDate', 'formType', 'formSignification', 'entityName', 'issuerStreet', 'issuerCity', 'issuerStateOrCountry', 'issuerStateOrCountryDescription', 'issuerZipCode', 'issuerPhoneNumber', 'jurisdictionOfIncorporation', 'entityType', 'incorporatedWithinFiveYears', 'yearOfIncorporation', 'relatedPersonFirstName', 'relatedPersonLastName', 'relatedPersonStreet', 'relatedPersonCity', 'relatedPersonStateOrCountry', 'relatedPersonStateOrCountryDescription', 'relatedPersonZipCode', 'relatedPersonRelationship', 'industryGroupType', 'revenueRange', 'federalExemptionsExclusions', 'isAmendment', 'dateOfFirstSale', 'durationOfOfferingIsMoreThanYear', 'securitiesOfferedAreOfEquityType', 'isBusinessCombinationTransaction', 'minimumInvestmentAccepted', 'totalOfferingAmount', 'totalAmountSold', 'totalAmountRemaining', 'hasNonAccreditedInvestors', 'totalNumberAlreadyInvested', 'salesCommissions', 'findersFees', 'grossProceedsUsed'] as const

const searchEquityOfferings = ['cik', 'name', 'date'] as const

const equityOfferingsByCik = ['cik', 'companyName', 'date', 'filingDate', 'acceptedDate', 'formType', 'formSignification', 'entityName', 'issuerStreet', 'issuerCity', 'issuerStateOrCountry', 'issuerStateOrCountryDescription', 'issuerZipCode', 'issuerPhoneNumber', 'jurisdictionOfIncorporation', 'entityType', 'incorporatedWithinFiveYears', 'yearOfIncorporation', 'relatedPersonFirstName', 'relatedPersonLastName', 'relatedPersonStreet', 'relatedPersonCity', 'relatedPersonStateOrCountry', 'relatedPersonStateOrCountryDescription', 'relatedPersonZipCode', 'relatedPersonRelationship', 'industryGroupType', 'revenueRange', 'federalExemptionsExclusions', 'isAmendment', 'dateOfFirstSale', 'durationOfOfferingIsMoreThanYear', 'securitiesOfferedAreOfEquityType', 'isBusinessCombinationTransaction', 'minimumInvestmentAccepted', 'totalOfferingAmount', 'totalAmountSold', 'totalAmountRemaining', 'hasNonAccreditedInvestors', 'totalNumberAlreadyInvested', 'salesCommissions', 'findersFees', 'grossProceedsUsed'] as const

const cryptocurrencyList = ['symbol', 'name', 'exchange', 'icoDate', 'circulatingSupply', 'totalSupply'] as const

const cryptocurrencyQuote = ['symbol', 'name', 'price', 'changesPercentage', 'change', 'dayLow', 'dayHigh', 'yearHigh', 'yearLow', 'marketCap', 'priceAvg50', 'priceAvg200', 'exchange', 'volume', 'avgVolume', 'open', 'previousClose', 'eps', 'pe', 'earningsAnnouncement', 'sharesOutstanding', 'timestamp'] as const

const cryptocurrencyChartFull = ['symbol', 'change', 'changePercent', 'vwap', 'date', 'open', 'high', 'low', 'close', 'volume'] as const

const cryptocurrencyChart1Min = ['date', 'open', 'high', 'low', 'close', 'volume'] as const

const cryptocurrencyChart5Min = ['date', 'open', 'high', 'low', 'close', 'volume'] as const

const cryptocurrencyChart1Hour = ['date', 'open', 'high', 'low', 'close', 'volume'] as const

const forexList = ['symbol', 'fromCurrency', 'toCurrency', 'fromName', 'toName'] as const

const forexQuote = ['symbol', 'name', 'price', 'changesPercentage', 'change', 'dayLow', 'dayHigh', 'yearHigh', 'yearLow', 'marketCap', 'priceAvg50', 'priceAvg200', 'exchange', 'volume', 'avgVolume', 'open', 'previousClose', 'eps', 'pe', 'earningsAnnouncement', 'sharesOutstanding', 'timestamp'] as const

const forexChartFull = ['symbol', 'change', 'changePercent', 'vwap', 'date', 'open', 'high', 'low', 'close', 'volume'] as const

const forexChart1Min = ['date', 'open', 'high', 'low', 'close', 'volume'] as const

const forexChart5Min = ['date', 'open', 'high', 'low', 'close', 'volume'] as const

const forexChart1Hour = ['date', 'open', 'high', 'low', 'close', 'volume'] as const

const incomeStatement = ['date', 'symbol', 'reportedCurrency', 'cik', 'filingDate', 'acceptedDate', 'fiscalYear', 'period', 'revenue', 'costOfRevenue', 'grossProfit', 'researchAndDevelopmentExpenses', 'generalAndAdministrativeExpenses', 'sellingAndMarketingExpenses', 'sellingGeneralAndAdministrativeExpenses', 'otherExpenses', 'operatingExpenses', 'costAndExpenses', 'netInterestIncome', 'interestIncome', 'interestExpense', 'depreciationAndAmortization', 'ebitda', 'ebit', 'nonOperatingIncomeExcludingInterest', 'operatingIncome', 'totalOtherIncomeExpensesNet', 'incomeBeforeTax', 'incomeTaxExpense', 'netIncomeFromContinuingOperations', 'netIncomeFromDiscontinuedOperations', 'otherAdjustmentsToNetIncome', 'netIncome', 'netIncomeDeductions', 'bottomLineNetIncome', 'eps', 'epsDiluted', 'weightedAverageShsOut', 'weightedAverageShsOutDil'] as const

const balanceSheetStatement = ['date', 'symbol', 'reportedCurrency', 'cik', 'filingDate', 'acceptedDate', 'fiscalYear', 'period', 'cashAndCashEquivalents', 'shortTermInvestments', 'cashAndShortTermInvestments', 'netReceivables', 'accountsReceivables', 'otherReceivables', 'inventory', 'prepaids', 'otherCurrentAssets', 'totalCurrentAssets', 'propertyPlantEquipmentNet', 'goodwill', 'intangibleAssets', 'goodwillAndIntangibleAssets', 'longTermInvestments', 'taxAssets', 'otherNonCurrentAssets', 'totalNonCurrentAssets', 'otherAssets', 'totalAssets', 'totalPayables', 'accountPayables', 'otherPayables', 'accruedExpenses', 'shortTermDebt', 'capitalLeaseObligationsCurrent', 'taxPayables', 'deferredRevenue', 'otherCurrentLiabilities', 'totalCurrentLiabilities', 'longTermDebt', 'deferredRevenueNonCurrent', 'deferredTaxLiabilitiesNonCurrent', 'otherNonCurrentLiabilities', 'totalNonCurrentLiabilities', 'otherLiabilities', 'capitalLeaseObligations', 'totalLiabilities', 'treasuryStock', 'preferredStock', 'commonStock', 'retainedEarnings', 'additionalPaidInCapital', 'accumulatedOtherComprehensiveIncomeLoss', 'otherTotalStockholdersEquity', 'totalStockholdersEquity', 'totalEquity', 'minorityInterest', 'totalLiabilitiesAndTotalEquity', 'totalInvestments', 'totalDebt', 'netDebt'] as const

const cashFlowStatement = ['date', 'symbol', 'reportedCurrency', 'cik', 'filingDate', 'acceptedDate', 'fiscalYear', 'period', 'netIncome', 'depreciationAndAmortization', 'deferredIncomeTax', 'stockBasedCompensation', 'changeInWorkingCapital', 'accountsReceivables', 'inventory', 'accountsPayables', 'otherWorkingCapital', 'otherNonCashItems', 'netCashProvidedByOperatingActivities', 'investmentsInPropertyPlantAndEquipment', 'acquisitionsNet', 'purchasesOfInvestments', 'salesMaturitiesOfInvestments', 'otherInvestingActivities', 'netCashProvidedByInvestingActivities', 'netDebtIssuance', 'longTermNetDebtIssuance', 'shortTermNetDebtIssuance', 'netStockIssuance', 'netCommonStockIssuance', 'commonStockIssuance', 'commonStockRepurchased', 'netPreferredStockIssuance', 'netDividendsPaid', 'commonDividendsPaid', 'preferredDividendsPaid', 'otherFinancingActivities', 'netCashProvidedByFinancingActivities', 'effectOfForexChangesOnCash', 'netChangeInCash', 'cashAtEndOfPeriod', 'cashAtBeginningOfPeriod', 'operatingCashFlow', 'capitalExpenditure', 'freeCashFlow', 'incomeTaxesPaid', 'interestPaid'] as const

const latestFinancialStatements = ['symbol', 'calendarYear', 'period', 'date', 'dateAdded'] as const

const incomeStatementTtm = ['date', 'symbol', 'reportedCurrency', 'cik', 'filingDate', 'acceptedDate', 'fiscalYear', 'period', 'revenue', 'costOfRevenue', 'grossProfit', 'researchAndDevelopmentExpenses', 'generalAndAdministrativeExpenses', 'sellingAndMarketingExpenses', 'sellingGeneralAndAdministrativeExpenses', 'otherExpenses', 'operatingExpenses', 'costAndExpenses', 'netInterestIncome', 'interestIncome', 'interestExpense', 'depreciationAndAmortization', 'ebitda', 'ebit', 'nonOperatingIncomeExcludingInterest', 'operatingIncome', 'totalOtherIncomeExpensesNet', 'incomeBeforeTax', 'incomeTaxExpense', 'netIncomeFromContinuingOperations', 'netIncomeFromDiscontinuedOperations', 'otherAdjustmentsToNetIncome', 'netIncome', 'netIncomeDeductions', 'bottomLineNetIncome', 'eps', 'epsDiluted', 'weightedAverageShsOut', 'weightedAverageShsOutDil'] as const

const balanceSheetStatementTtm = ['date', 'symbol', 'reportedCurrency', 'cik', 'filingDate', 'acceptedDate', 'fiscalYear', 'period', 'cashAndCashEquivalents', 'shortTermInvestments', 'cashAndShortTermInvestments', 'netReceivables', 'accountsReceivables', 'otherReceivables', 'inventory', 'prepaids', 'otherCurrentAssets', 'totalCurrentAssets', 'propertyPlantEquipmentNet', 'goodwill', 'intangibleAssets', 'goodwillAndIntangibleAssets', 'longTermInvestments', 'taxAssets', 'otherNonCurrentAssets', 'totalNonCurrentAssets', 'otherAssets', 'totalAssets', 'totalPayables', 'accountPayables', 'otherPayables', 'accruedExpenses', 'shortTermDebt', 'capitalLeaseObligationsCurrent', 'taxPayables', 'deferredRevenue', 'otherCurrentLiabilities', 'totalCurrentLiabilities', 'longTermDebt', 'deferredRevenueNonCurrent', 'deferredTaxLiabilitiesNonCurrent', 'otherNonCurrentLiabilities', 'totalNonCurrentLiabilities', 'otherLiabilities', 'capitalLeaseObligations', 'totalLiabilities', 'treasuryStock', 'preferredStock', 'commonStock', 'retainedEarnings', 'additionalPaidInCapital', 'accumulatedOtherComprehensiveIncomeLoss', 'otherTotalStockholdersEquity', 'totalStockholdersEquity', 'totalEquity', 'minorityInterest', 'totalLiabilitiesAndTotalEquity', 'totalInvestments', 'totalDebt', 'netDebt'] as const

const cashFlowStatementTtm = ['date', 'symbol', 'reportedCurrency', 'cik', 'filingDate', 'acceptedDate', 'fiscalYear', 'period', 'netIncome', 'depreciationAndAmortization', 'deferredIncomeTax', 'stockBasedCompensation', 'changeInWorkingCapital', 'accountsReceivables', 'inventory', 'accountsPayables', 'otherWorkingCapital', 'otherNonCashItems', 'netCashProvidedByOperatingActivities', 'investmentsInPropertyPlantAndEquipment', 'acquisitionsNet', 'purchasesOfInvestments', 'salesMaturitiesOfInvestments', 'otherInvestingActivities', 'netCashProvidedByInvestingActivities', 'netDebtIssuance', 'longTermNetDebtIssuance', 'shortTermNetDebtIssuance', 'netStockIssuance', 'netCommonStockIssuance', 'commonStockIssuance', 'commonStockRepurchased', 'netPreferredStockIssuance', 'netDividendsPaid', 'commonDividendsPaid', 'preferredDividendsPaid', 'otherFinancingActivities', 'netCashProvidedByFinancingActivities', 'effectOfForexChangesOnCash', 'netChangeInCash', 'cashAtEndOfPeriod', 'cashAtBeginningOfPeriod', 'operatingCashFlow', 'capitalExpenditure', 'freeCashFlow', 'incomeTaxesPaid', 'interestPaid'] as const

const keyMetrics = ['symbol', 'date', 'fiscalYear', 'period', 'reportedCurrency', 'marketCap', 'enterpriseValue', 'evToSales', 'evToOperatingCashFlow', 'evToFreeCashFlow', 'evToEBITDA', 'netDebtToEBITDA', 'currentRatio', 'incomeQuality', 'grahamNumber', 'grahamNetNet', 'taxBurden', 'interestBurden', 'workingCapital', 'investedCapital', 'returnOnAssets', 'operatingReturnOnAssets', 'returnOnTangibleAssets', 'returnOnEquity', 'returnOnInvestedCapital', 'returnOnCapitalEmployed', 'earningsYield', 'freeCashFlowYield', 'capexToOperatingCashFlow', 'capexToDepreciation', 'capexToRevenue', 'salesGeneralAndAdministrativeToRevenue', 'researchAndDevelopementToRevenue', 'stockBasedCompensationToRevenue', 'intangiblesToTotalAssets', 'averageReceivables', 'averagePayables', 'averageInventory', 'daysOfSalesOutstanding', 'daysOfPayablesOutstanding', 'daysOfInventoryOutstanding', 'operatingCycle', 'cashConversionCycle', 'freeCashFlowToEquity', 'freeCashFlowToFirm', 'tangibleAssetValue', 'netCurrentAssetValue'] as const

const financialRatios = ['symbol', 'date', 'fiscalYear', 'period', 'reportedCurrency', 'grossProfitMargin', 'ebitMargin', 'ebitdaMargin', 'operatingProfitMargin', 'pretaxProfitMargin', 'continuousOperationsProfitMargin', 'netProfitMargin', 'bottomLineProfitMargin', 'receivablesTurnover', 'payablesTurnover', 'inventoryTurnover', 'fixedAssetTurnover', 'assetTurnover', 'currentRatio', 'quickRatio', 'solvencyRatio', 'cashRatio', 'priceToEarningsRatio', 'priceToEarningsGrowthRatio', 'forwardPriceToEarningsGrowthRatio', 'priceToBookRatio', 'priceToSalesRatio', 'priceToFreeCashFlowRatio', 'priceToOperatingCashFlowRatio', 'debtToAssetsRatio', 'debtToEquityRatio', 'debtToCapitalRatio', 'longTermDebtToCapitalRatio', 'financialLeverageRatio', 'workingCapitalTurnoverRatio', 'operatingCashFlowRatio', 'operatingCashFlowSalesRatio', 'freeCashFlowOperatingCashFlowRatio', 'debtServiceCoverageRatio', 'interestCoverageRatio', 'shortTermOperatingCashFlowCoverageRatio', 'operatingCashFlowCoverageRatio', 'capitalExpenditureCoverageRatio', 'dividendPaidAndCapexCoverageRatio', 'dividendPayoutRatio', 'dividendYield', 'dividendYieldPercentage', 'revenuePerShare', 'netIncomePerShare', 'interestDebtPerShare', 'cashPerShare', 'bookValuePerShare', 'tangibleBookValuePerShare', 'shareholdersEquityPerShare', 'operatingCashFlowPerShare', 'capexPerShare', 'freeCashFlowPerShare', 'netIncomePerEBT', 'ebtPerEbit', 'priceToFairValue', 'debtToMarketCap', 'effectiveTaxRate', 'enterpriseValueMultiple'] as const

const keyMetricsTtm = ['symbol', 'marketCap', 'marketCapTTM', 'enterpriseValueTTM', 'evToSalesTTM', 'evToOperatingCashFlowTTM', 'evToFreeCashFlowTTM', 'evToEBITDATTM', 'netDebtToEBITDATTM', 'currentRatioTTM', 'incomeQualityTTM', 'grahamNumberTTM', 'grahamNetNetTTM', 'taxBurdenTTM', 'interestBurdenTTM', 'workingCapitalTTM', 'investedCapitalTTM', 'returnOnAssetsTTM', 'operatingReturnOnAssetsTTM', 'returnOnTangibleAssetsTTM', 'returnOnEquityTTM', 'returnOnInvestedCapitalTTM', 'returnOnCapitalEmployedTTM', 'earningsYieldTTM', 'freeCashFlowYieldTTM', 'capexToOperatingCashFlowTTM', 'capexToDepreciationTTM', 'capexToRevenueTTM', 'salesGeneralAndAdministrativeToRevenueTTM', 'researchAndDevelopementToRevenueTTM', 'stockBasedCompensationToRevenueTTM', 'intangiblesToTotalAssetsTTM', 'averageReceivablesTTM', 'averagePayablesTTM', 'averageInventoryTTM', 'daysOfSalesOutstandingTTM', 'daysOfPayablesOutstandingTTM', 'daysOfInventoryOutstandingTTM', 'operatingCycleTTM', 'cashConversionCycleTTM', 'freeCashFlowToEquityTTM', 'freeCashFlowToFirmTTM', 'tangibleAssetValueTTM', 'netCurrentAssetValueTTM'] as const

const financialRatiosTtm = ['symbol', 'grossProfitMarginTTM', 'ebitMarginTTM', 'ebitdaMarginTTM', 'operatingProfitMarginTTM', 'pretaxProfitMarginTTM', 'continuousOperationsProfitMarginTTM', 'netProfitMarginTTM', 'bottomLineProfitMarginTTM', 'receivablesTurnoverTTM', 'payablesTurnoverTTM', 'inventoryTurnoverTTM', 'fixedAssetTurnoverTTM', 'assetTurnoverTTM', 'currentRatioTTM', 'quickRatioTTM', 'solvencyRatioTTM', 'cashRatioTTM', 'priceToEarningsRatioTTM', 'priceToEarningsGrowthRatioTTM', 'forwardPriceToEarningsGrowthRatioTTM', 'priceToBookRatioTTM', 'priceToSalesRatioTTM', 'priceToFreeCashFlowRatioTTM', 'priceToOperatingCashFlowRatioTTM', 'debtToAssetsRatioTTM', 'debtToEquityRatioTTM', 'debtToCapitalRatioTTM', 'longTermDebtToCapitalRatioTTM', 'financialLeverageRatioTTM', 'workingCapitalTurnoverRatioTTM', 'operatingCashFlowRatioTTM', 'operatingCashFlowSalesRatioTTM', 'freeCashFlowOperatingCashFlowRatioTTM', 'debtServiceCoverageRatioTTM', 'interestCoverageRatioTTM', 'shortTermOperatingCashFlowCoverageRatioTTM', 'operatingCashFlowCoverageRatioTTM', 'capitalExpenditureCoverageRatioTTM', 'dividendPaidAndCapexCoverageRatioTTM', 'dividendPayoutRatioTTM', 'dividendYieldTTM', 'dividendYieldPercentageTTM', 'enterpriseValueTTM', 'revenuePerShareTTM', 'netIncomePerShareTTM', 'interestDebtPerShareTTM', 'cashPerShareTTM', 'bookValuePerShareTTM', 'tangibleBookValuePerShareTTM', 'shareholdersEquityPerShareTTM', 'operatingCashFlowPerShareTTM', 'capexPerShareTTM', 'freeCashFlowPerShareTTM', 'netIncomePerEBTTTM', 'ebtPerEbitTTM', 'priceToFairValueTTM', 'debtToMarketCapTTM', 'effectiveTaxRateTTM', 'enterpriseValueMultipleTTM'] as const

const financialScores = ['symbol', 'reportedCurrency', 'altmanZScore', 'piotroskiScore', 'workingCapital', 'totalAssets', 'retainedEarnings', 'ebit', 'marketCap', 'totalLiabilities', 'revenue'] as const

const ownerEarnings = ['symbol', 'reportedCurrency', 'fiscalYear', 'period', 'date', 'averagePPE', 'maintenanceCapex', 'ownersEarnings', 'growthCapex', 'ownersEarningsPerShare'] as const

const enterpriseValues = ['symbol', 'date', 'stockPrice', 'numberOfShares', 'marketCapitalization', 'minusCashAndCashEquivalents', 'addTotalDebt', 'enterpriseValue'] as const

const incomeStatementGrowth = ['symbol', 'date', 'fiscalYear', 'period', 'reportedCurrency', 'growthRevenue', 'growthCostOfRevenue', 'growthGrossProfit', 'growthGrossProfitRatio', 'growthResearchAndDevelopmentExpenses', 'growthGeneralAndAdministrativeExpenses', 'growthSellingAndMarketingExpenses', 'growthOtherExpenses', 'growthOperatingExpenses', 'growthCostAndExpenses', 'growthInterestIncome', 'growthInterestExpense', 'growthDepreciationAndAmortization', 'growthEBITDA', 'growthOperatingIncome', 'growthIncomeBeforeTax', 'growthIncomeTaxExpense', 'growthNetIncome', 'growthEPS', 'growthEPSDiluted', 'growthWeightedAverageShsOut', 'growthWeightedAverageShsOutDil', 'growthEBIT', 'growthNonOperatingIncomeExcludingInterest', 'growthNetInterestIncome', 'growthTotalOtherIncomeExpensesNet', 'growthNetIncomeFromContinuingOperations', 'growthOtherAdjustmentsToNetIncome', 'growthNetIncomeDeductions'] as const

const balanceSheetStatementGrowth = ['symbol', 'date', 'fiscalYear', 'period', 'reportedCurrency', 'growthCashAndCashEquivalents', 'growthShortTermInvestments', 'growthCashAndShortTermInvestments', 'growthNetReceivables', 'growthInventory', 'growthOtherCurrentAssets', 'growthTotalCurrentAssets', 'growthPropertyPlantEquipmentNet', 'growthGoodwill', 'growthIntangibleAssets', 'growthGoodwillAndIntangibleAssets', 'growthLongTermInvestments', 'growthTaxAssets', 'growthOtherNonCurrentAssets', 'growthTotalNonCurrentAssets', 'growthOtherAssets', 'growthTotalAssets', 'growthAccountPayables', 'growthShortTermDebt', 'growthTaxPayables', 'growthDeferredRevenue', 'growthOtherCurrentLiabilities', 'growthTotalCurrentLiabilities', 'growthLongTermDebt', 'growthDeferredRevenueNonCurrent', 'growthDeferredTaxLiabilitiesNonCurrent', 'growthOtherNonCurrentLiabilities', 'growthTotalNonCurrentLiabilities', 'growthOtherLiabilities', 'growthTotalLiabilities', 'growthPreferredStock', 'growthCommonStock', 'growthRetainedEarnings', 'growthAccumulatedOtherComprehensiveIncomeLoss', 'growthOthertotalStockholdersEquity', 'growthTotalStockholdersEquity', 'growthMinorityInterest', 'growthTotalEquity', 'growthTotalLiabilitiesAndStockholdersEquity', 'growthTotalInvestments', 'growthTotalDebt', 'growthNetDebt', 'growthAccountsReceivables', 'growthOtherReceivables', 'growthPrepaids', 'growthTotalPayables', 'growthOtherPayables', 'growthAccruedExpenses', 'growthCapitalLeaseObligationsCurrent', 'growthAdditionalPaidInCapital', 'growthTreasuryStock'] as const

const cashFlowStatementGrowth = ['symbol', 'date', 'fiscalYear', 'period', 'reportedCurrency', 'growthNetIncome', 'growthDepreciationAndAmortization', 'growthDeferredIncomeTax', 'growthStockBasedCompensation', 'growthChangeInWorkingCapital', 'growthAccountsReceivables', 'growthInventory', 'growthAccountsPayables', 'growthOtherWorkingCapital', 'growthOtherNonCashItems', 'growthNetCashProvidedByOperatingActivites', 'growthInvestmentsInPropertyPlantAndEquipment', 'growthAcquisitionsNet', 'growthPurchasesOfInvestments', 'growthSalesMaturitiesOfInvestments', 'growthOtherInvestingActivites', 'growthNetCashUsedForInvestingActivites', 'growthDebtRepayment', 'growthCommonStockIssued', 'growthCommonStockRepurchased', 'growthDividendsPaid', 'growthOtherFinancingActivites', 'growthNetCashUsedProvidedByFinancingActivities', 'growthEffectOfForexChangesOnCash', 'growthNetChangeInCash', 'growthCashAtEndOfPeriod', 'growthCashAtBeginningOfPeriod', 'growthOperatingCashFlow', 'growthCapitalExpenditure', 'growthFreeCashFlow', 'growthNetDebtIssuance', 'growthLongTermNetDebtIssuance', 'growthShortTermNetDebtIssuance', 'growthNetStockIssuance', 'growthPreferredDividendsPaid', 'growthIncomeTaxesPaid', 'growthInterestPaid'] as const

const financialStatementGrowth = ['symbol', 'date', 'fiscalYear', 'period', 'reportedCurrency', 'revenueGrowth', 'grossProfitGrowth', 'ebitgrowth', 'operatingIncomeGrowth', 'netIncomeGrowth', 'epsgrowth', 'epsdilutedGrowth', 'weightedAverageSharesGrowth', 'weightedAverageSharesDilutedGrowth', 'dividendsPerShareGrowth', 'operatingCashFlowGrowth', 'receivablesGrowth', 'inventoryGrowth', 'assetGrowth', 'bookValueperShareGrowth', 'debtGrowth', 'rdexpenseGrowth', 'sgaexpensesGrowth', 'freeCashFlowGrowth', 'tenYRevenueGrowthPerShare', 'fiveYRevenueGrowthPerShare', 'threeYRevenueGrowthPerShare', 'tenYOperatingCFGrowthPerShare', 'fiveYOperatingCFGrowthPerShare', 'threeYOperatingCFGrowthPerShare', 'tenYNetIncomeGrowthPerShare', 'fiveYNetIncomeGrowthPerShare', 'threeYNetIncomeGrowthPerShare', 'tenYShareholdersEquityGrowthPerShare', 'fiveYShareholdersEquityGrowthPerShare', 'threeYShareholdersEquityGrowthPerShare', 'tenYDividendperShareGrowthPerShare', 'fiveYDividendperShareGrowthPerShare', 'threeYDividendperShareGrowthPerShare', 'ebitdaGrowth', 'growthCapitalExpenditure', 'tenYBottomLineNetIncomeGrowthPerShare', 'fiveYBottomLineNetIncomeGrowthPerShare', 'threeYBottomLineNetIncomeGrowthPerShare'] as const

const financialReportJson = ['symbol', 'period', 'year', 'data'] as const

const revenueProductSegmentation = ['symbol', 'fiscalYear', 'period', 'reportedCurrency', 'date', 'data'] as const

const revenueGeographicSegmentation = ['symbol', 'fiscalYear', 'period', 'reportedCurrency', 'date', 'data'] as const

const latestInstitutionalOwnershipFilings = ['cik', 'name', 'date', 'filingDate', 'acceptedDate', 'formType', 'link'] as const

const secFilingsExtract = ['date', 'filingDate', 'acceptedDate', 'cik', 'securityCusip', 'symbol', 'nameOfIssuer', 'shares', 'titleOfClass', 'sharesType', 'putCallShare', 'value', 'link'] as const

const form13FFilingDates = ['date', 'year', 'quarter'] as const

const filingsExtractAnalyticsByHolder = ['date', 'cik', 'filingDate', 'investorName', 'symbol', 'securityName', 'typeOfSecurity', 'securityCusip', 'sharesType', 'putCallShare', 'investmentDiscretion', 'industryTitle', 'weight', 'lastWeight', 'changeInWeight', 'changeInWeightPercentage', 'marketValue', 'lastMarketValue', 'changeInMarketValue', 'changeInMarketValuePercentage', 'sharesNumber', 'lastSharesNumber', 'changeInSharesNumber', 'changeInSharesNumberPercentage', 'quarterEndPrice', 'avgPricePaid', 'isNew', 'isSoldOut', 'ownership', 'lastOwnership', 'changeInOwnership', 'changeInOwnershipPercentage', 'holdingPeriod', 'firstAdded', 'performance', 'performancePercentage', 'lastPerformance', 'changeInPerformance', 'isCountedForPerformance'] as const

const holderPerformanceSummary = ['date', 'cik', 'investorName', 'portfolioSize', 'securitiesAdded', 'securitiesRemoved', 'marketValue', 'previousMarketValue', 'changeInMarketValue', 'changeInMarketValuePercentage', 'averageHoldingPeriod', 'averageHoldingPeriodTop10', 'averageHoldingPeriodTop20', 'turnover', 'turnoverAlternateSell', 'turnoverAlternateBuy', 'performance', 'performancePercentage', 'lastPerformance', 'changeInPerformance', 'performance1year', 'performancePercentage1year', 'performance3year', 'performancePercentage3year', 'performance5year', 'performancePercentage5year', 'performanceSinceInception', 'performanceSinceInceptionPercentage', 'performanceRelativeToSP500Percentage', 'performance1yearRelativeToSP500Percentage', 'performance3yearRelativeToSP500Percentage', 'performance5yearRelativeToSP500Percentage', 'performanceSinceInceptionRelativeToSP500Percentage'] as const

const holdersIndustryBreakdown = ['date', 'cik', 'investorName', 'industryTitle', 'weight', 'lastWeight', 'changeInWeight', 'changeInWeightPercentage', 'performance', 'performancePercentage', 'lastPerformance', 'changeInPerformance'] as const

const positionsSummary = ['symbol', 'cik', 'date', 'investorsHolding', 'lastInvestorsHolding', 'investorsHoldingChange', 'numberOf13Fshares', 'lastNumberOf13Fshares', 'numberOf13FsharesChange', 'totalInvested', 'lastTotalInvested', 'totalInvestedChange', 'ownershipPercent', 'lastOwnershipPercent', 'ownershipPercentChange', 'newPositions', 'lastNewPositions', 'newPositionsChange', 'increasedPositions', 'lastIncreasedPositions', 'increasedPositionsChange', 'closedPositions', 'lastClosedPositions', 'closedPositionsChange', 'reducedPositions', 'lastReducedPositions', 'reducedPositionsChange', 'totalCalls', 'lastTotalCalls', 'totalCallsChange', 'totalPuts', 'lastTotalPuts', 'totalPutsChange', 'putCallRatio', 'lastPutCallRatio', 'putCallRatioChange'] as const

const industryPerformanceSummary = ['industryTitle', 'industryValue', 'date'] as const

const indexesList = ['symbol', 'name', 'exchange', 'currency'] as const

const indexQuote = ['symbol', 'name', 'price', 'changesPercentage', 'change', 'dayLow', 'dayHigh', 'yearHigh', 'yearLow', 'marketCap', 'priceAvg50', 'priceAvg200', 'exchange', 'volume', 'avgVolume', 'open', 'previousClose', 'eps', 'pe', 'earningsAnnouncement', 'sharesOutstanding', 'timestamp'] as const

const indexChartFull = ['symbol', 'change', 'changePercent', 'vwap', 'date', 'open', 'high', 'low', 'close', 'volume'] as const

const indexChart1Min = ['date', 'open', 'high', 'low', 'close', 'volume'] as const

const indexChart5Min = ['date', 'open', 'high', 'low', 'close', 'volume'] as const

const indexChart1Hour = ['date', 'open', 'high', 'low', 'close', 'volume'] as const

const sp500Constituents = ['symbol', 'name', 'sector', 'subSector', 'headQuarter', 'dateFirstAdded', 'cik', 'founded'] as const

const nasdaqConstituents = ['symbol', 'name', 'sector', 'subSector', 'headQuarter', 'dateFirstAdded', 'cik', 'founded'] as const

const dowJonesConstituents = ['symbol', 'name', 'sector', 'subSector', 'headQuarter', 'dateFirstAdded', 'cik', 'founded'] as const

const historicalSp500Constituents = ['dateAdded', 'addedSecurity', 'removedTicker', 'removedSecurity', 'date', 'symbol', 'reason'] as const

const historicalNasdaqConstituents = ['dateAdded', 'addedSecurity', 'removedTicker', 'removedSecurity', 'date', 'symbol', 'reason'] as const

const historicalDowJonesConstituents = ['dateAdded', 'addedSecurity', 'removedTicker', 'removedSecurity', 'date', 'symbol', 'reason'] as const

const latestInsiderTrades = ['symbol', 'filingDate', 'transactionDate', 'reportingCik', 'companyCik', 'transactionType', 'securitiesOwned', 'reportingName', 'typeOfOwner', 'acquisitionOrDisposition', 'directOrIndirect', 'formType', 'securitiesTransacted', 'price', 'securityName', 'url'] as const

const searchInsiderTrades = ['symbol', 'filingDate', 'transactionDate', 'reportingCik', 'companyCik', 'transactionType', 'securitiesOwned', 'reportingName', 'typeOfOwner', 'acquisitionOrDisposition', 'directOrIndirect', 'formType', 'securitiesTransacted', 'price', 'securityName', 'url'] as const

const searchInsiderTradesByReportingName = ['reportingCik', 'reportingName'] as const

const allInsiderTransactionTypes = ['transactionType'] as const

const insiderTradeStatistics = ['symbol', 'cik', 'year', 'quarter', 'acquiredTransactions', 'disposedTransactions', 'acquiredDisposedRatio', 'totalAcquired', 'totalDisposed', 'averageAcquired', 'averageDisposed', 'totalPurchases', 'totalSales'] as const

const acquisitionOwnership = ['cik', 'symbol', 'filingDate', 'acceptedDate', 'cusip', 'nameOfReportingPerson', 'citizenshipOrPlaceOfOrganization', 'soleVotingPower', 'sharedVotingPower', 'soleDispositivePower', 'sharedDispositivePower', 'amountBeneficiallyOwned', 'percentOfClass', 'typeOfReportingPerson', 'url'] as const

const marketSectorPerformanceSnapshot = ['date', 'sector', 'exchange', 'averageChange'] as const

const marketIndustryPerformanceSnapshot = ['date', 'industry', 'exchange', 'averageChange'] as const

const historicalMarketSectorPerformance = ['date', 'sector', 'exchange', 'averageChange'] as const

const historicalMarketIndustryPerformance = ['date', 'industry', 'exchange', 'averageChange'] as const

const marketSectorPESnapshot = ['date', 'sector', 'exchange', 'pe'] as const

const marketIndustryPESnapshot = ['date', 'industry', 'exchange', 'pe'] as const

const historicalMarketSectorPE = ['date', 'sector', 'exchange', 'pe'] as const

const historicalMarketIndustryPE = ['date', 'industry', 'exchange', 'pe'] as const

const biggestStockGainers = ['symbol', 'price', 'name', 'change', 'changesPercentage', 'exchange'] as const

const biggestStockLosers = ['symbol', 'price', 'name', 'change', 'changesPercentage', 'exchange'] as const

const topTradedStocks = ['symbol', 'price', 'name', 'change', 'changesPercentage', 'exchange'] as const

const exchangeMarketHours = ['exchange', 'name', 'openingHour', 'closingHour', 'timezone', 'isMarketOpen'] as const

const allExchangeMarketHours = ['exchange', 'name', 'openingHour', 'closingHour', 'timezone', 'isMarketOpen'] as const

const fmpArticles = ['title', 'date', 'content', 'tickers', 'image', 'link', 'author', 'site'] as const

const generalNews = ['symbol', 'publishedDate', 'publisher', 'title', 'image', 'site', 'text', 'url'] as const

const pressReleases = ['symbol', 'publishedDate', 'publisher', 'title', 'image', 'site', 'text', 'url'] as const

const stockNews = ['symbol', 'publishedDate', 'publisher', 'title', 'image', 'site', 'text', 'url'] as const

const cryptoNews = ['symbol', 'publishedDate', 'publisher', 'title', 'image', 'site', 'text', 'url'] as const

const forexNews = ['symbol', 'publishedDate', 'publisher', 'title', 'image', 'site', 'text', 'url'] as const

const searchPressReleases = ['symbol', 'publishedDate', 'publisher', 'title', 'image', 'site', 'text', 'url'] as const

const searchStockNews = ['symbol', 'publishedDate', 'publisher', 'title', 'image', 'site', 'text', 'url'] as const

const searchCryptoNews = ['symbol', 'publishedDate', 'publisher', 'title', 'image', 'site', 'text', 'url'] as const

const searchForexNews = ['symbol', 'publishedDate', 'publisher', 'title', 'image', 'site', 'text', 'url'] as const

const simpleMovingAverage = ['sma', 'date', 'open', 'high', 'low', 'close', 'volume'] as const

const exponentialMovingAverage = ['ema', 'date', 'open', 'high', 'low', 'close', 'volume'] as const

const weightedMovingAverage = ['wma', 'date', 'open', 'high', 'low', 'close', 'volume'] as const

const doubleExponentialMovingAverage = ['dema', 'date', 'open', 'high', 'low', 'close', 'volume'] as const

const tripleExponentialMovingAverage = ['tema', 'date', 'open', 'high', 'low', 'close', 'volume'] as const

const relativeStrengthIndex = ['rsi', 'date', 'open', 'high', 'low', 'close', 'volume'] as const

const standardDeviation = ['standardDeviation', 'date', 'open', 'high', 'low', 'close', 'volume'] as const

const williamsPercentR = ['williams', 'date', 'open', 'high', 'low', 'close', 'volume'] as const

const averageDirectionalIndex = ['adx', 'date', 'open', 'high', 'low', 'close', 'volume'] as const

const stockQuote = ['symbol', 'name', 'price', 'changesPercentage', 'change', 'dayLow', 'dayHigh', 'yearHigh', 'yearLow', 'marketCap', 'priceAvg50', 'priceAvg200', 'exchange', 'volume', 'avgVolume', 'open', 'previousClose', 'eps', 'pe', 'earningsAnnouncement', 'sharesOutstanding', 'timestamp'] as const

const aftermarketTrade = ['symbol', 'price', 'tradeSize', 'timestamp'] as const

const aftermarketQuote = ['symbol', 'bidSize', 'bidPrice', 'askSize', 'askPrice', 'volume', 'timestamp'] as const

const stockPriceChange = ['symbol', '1D', '5D', '1M', '3M', '6M', 'ytd', '1Y', '3Y', '5Y', '10Y', 'max'] as const

const stockBatchQuote = ['symbol', 'name', 'price', 'changesPercentage', 'change', 'dayLow', 'dayHigh', 'yearHigh', 'yearLow', 'marketCap', 'priceAvg50', 'priceAvg200', 'exchange', 'volume', 'avgVolume', 'open', 'previousClose', 'eps', 'pe', 'earningsAnnouncement', 'sharesOutstanding', 'timestamp'] as const

const batchAftermarketTrade = ['symbol', 'price', 'tradeSize', 'timestamp'] as const

const batchAftermarketQuote = ['symbol', 'bidSize', 'bidPrice', 'askSize', 'askPrice', 'volume', 'timestamp'] as const

const latestEarningTranscripts = ['symbol', 'period', 'fiscalYear', 'date'] as const

const earningsTranscript = ['symbol', 'period', 'year', 'date', 'content'] as const

const earningsTranscriptDatesBySymbol = ['quarter', 'fiscalYear', 'date'] as const

const earningsTranscriptList = ['symbol', 'companyName', 'noOfTranscripts'] as const

const latest8kSecFilings = ['symbol', 'cik', 'filingDate', 'acceptedDate', 'formType', 'hasFinancials', 'link'] as const

const latestSecFilingsWithFinancials = ['symbol', 'cik', 'filingDate', 'acceptedDate', 'formType', 'hasFinancials', 'link'] as const

const searchSecFilingsByFormType = ['symbol', 'cik', 'filingDate', 'acceptedDate', 'formType', 'hasFinancials', 'link'] as const

const searchSecFilingsBySymbol = ['symbol', 'cik', 'filingDate', 'acceptedDate', 'formType', 'hasFinancials', 'link'] as const

const searchSecFilingsByCik = ['symbol', 'cik', 'filingDate', 'acceptedDate', 'formType', 'hasFinancials', 'link'] as const

const searchSecFilingsCompanyName = ['symbol', 'name', 'cik', 'sicCode', 'industryTitle', 'businessAddress', 'phoneNumber'] as const

const searchSecFilingsCompanyBySymbol = ['symbol', 'name', 'cik', 'sicCode', 'industryTitle', 'businessAddress', 'phoneNumber'] as const

const searchSecFilingsCompanyByCik = ['symbol', 'name', 'cik', 'sicCode', 'industryTitle', 'businessAddress', 'phoneNumber'] as const

const secCompanyFullProfile = ['symbol', 'cik', 'registrantName', 'sicCode', 'sicDescription', 'sicGroup', 'isin', 'businessAddress', 'mailingAddress', 'phoneNumber', 'postalCode', 'city', 'state', 'country', 'description', 'ceo', 'website', 'exchange', 'stateLocation', 'stateOfIncorporation', 'fiscalYearEnd', 'ipoDate', 'employees', 'secFilingsUrl', 'taxIdentificationNumber', 'fiftyTwoWeekRange', 'isActive', 'assetType', 'openFigiComposite', 'priceCurrency', 'marketSector', 'securityType', 'isEtf', 'isAdr', 'isFund'] as const

const industryClassificationList = ['office', 'sicCode', 'industryTitle'] as const

const searchIndustryClassification = ['symbol', 'name', 'cik', 'sicCode', 'industryTitle', 'businessAddress', 'phoneNumber'] as const

const allIndustryClassification = ['symbol', 'name', 'cik', 'sicCode', 'industryTitle', 'businessAddress', 'phoneNumber'] as const

const latestSenateFinancialDisclosures = ['symbol', 'disclosureDate', 'transactionDate', 'firstName', 'lastName', 'office', 'district', 'owner', 'assetDescription', 'assetType', 'type', 'amount', 'comment', 'link', 'capitalGainsOver200USD'] as const

const latestHouseFinancialDisclosures = ['symbol', 'disclosureDate', 'transactionDate', 'firstName', 'lastName', 'office', 'district', 'owner', 'assetDescription', 'assetType', 'type', 'amount', 'comment', 'link', 'capitalGainsOver200USD'] as const

const senateTradingActivity = ['symbol', 'disclosureDate', 'transactionDate', 'firstName', 'lastName', 'office', 'district', 'owner', 'assetDescription', 'assetType', 'type', 'amount', 'comment', 'link', 'capitalGainsOver200USD'] as const

const senateTradesByName = ['symbol', 'disclosureDate', 'transactionDate', 'firstName', 'lastName', 'office', 'district', 'owner', 'assetDescription', 'assetType', 'type', 'amount', 'comment', 'link', 'capitalGainsOver200USD'] as const

const houseTrades = ['symbol', 'disclosureDate', 'transactionDate', 'firstName', 'lastName', 'office', 'district', 'owner', 'assetDescription', 'assetType', 'type', 'amount', 'comment', 'link', 'capitalGainsOver200USD'] as const

const houseTradesByName = ['symbol', 'disclosureDate', 'transactionDate', 'firstName', 'lastName', 'office', 'district', 'owner', 'assetDescription', 'assetType', 'type', 'amount', 'comment', 'link', 'capitalGainsOver200USD'] as const

const bulkCompanyProfile = ['symbol', 'price', 'marketCap', 'beta', 'lastDividend', 'range', 'change', 'changePercentage', 'volume', 'averageVolume', 'companyName', 'currency', 'cik', 'isin', 'cusip', 'exchangeFullName', 'exchange', 'industry', 'website', 'description', 'ceo', 'sector', 'country', 'fullTimeEmployees', 'phone', 'address', 'city', 'state', 'zip', 'image', 'ipoDate', 'defaultImage', 'isEtf', 'isActivelyTrading', 'isAdr', 'isFund'] as const

const bulkStockRating = ['symbol', 'date', 'rating', 'ratingRecommendation', 'ratingDetailsDCFRecommendation', 'ratingDetailsROERecommendation', 'ratingDetailsROARecommendation', 'ratingDetailsDERecommendation', 'ratingDetailsPERecommendation', 'ratingDetailsPBRecommendation'] as const

const bulkDcfValuations = ['symbol', 'date', 'discountedCashFlow', 'dcfPercentDiff'] as const

const bulkFinancialScores = ['symbol', 'reportedCurrency', 'altmanZScore', 'piotroskiScore', 'workingCapital', 'totalAssets', 'retainedEarnings', 'ebit', 'marketCap', 'totalLiabilities', 'revenue'] as const

const bulkPriceTargetSummary = ['symbol', 'lastMonth', 'lastMonthAvgPT', 'lastMonthAvgPTPercentDif', 'lastQuarter', 'lastQuarterAvgPT', 'lastQuarterAvgPTPercentDif', 'lastYear', 'lastYearAvgPT', 'lastYearAvgPTPercentDif', 'allTime', 'allTimeAvgPT', 'allTimeAvgPTPercentDif', 'publishers'] as const

const bulkEtfHolder = ['symbol', 'asset', 'name', 'isin', 'securityCusip', 'sharesNumber', 'weightPercentage', 'marketValue', 'updatedAt', 'updated'] as const

const bulkUpgradesDowngradesConsensus = ['symbol', 'strongBuy', 'buy', 'hold', 'sell', 'strongSell', 'consensus'] as const

const bulkKeyMetricsTtm = ['symbol', 'marketCap', 'marketCapTTM', 'enterpriseValueTTM', 'evToSalesTTM', 'evToOperatingCashFlowTTM', 'evToFreeCashFlowTTM', 'evToEBITDATTM', 'netDebtToEBITDATTM', 'currentRatioTTM', 'incomeQualityTTM', 'grahamNumberTTM', 'grahamNetNetTTM', 'taxBurdenTTM', 'interestBurdenTTM', 'workingCapitalTTM', 'investedCapitalTTM', 'returnOnAssetsTTM', 'operatingReturnOnAssetsTTM', 'returnOnTangibleAssetsTTM', 'returnOnEquityTTM', 'returnOnInvestedCapitalTTM', 'returnOnCapitalEmployedTTM', 'earningsYieldTTM', 'freeCashFlowYieldTTM', 'capexToOperatingCashFlowTTM', 'capexToDepreciationTTM', 'capexToRevenueTTM', 'salesGeneralAndAdministrativeToRevenueTTM', 'researchAndDevelopementToRevenueTTM', 'stockBasedCompensationToRevenueTTM', 'intangiblesToTotalAssetsTTM', 'averageReceivablesTTM', 'averagePayablesTTM', 'averageInventoryTTM', 'daysOfSalesOutstandingTTM', 'daysOfPayablesOutstandingTTM', 'daysOfInventoryOutstandingTTM', 'operatingCycleTTM', 'cashConversionCycleTTM', 'freeCashFlowToEquityTTM', 'freeCashFlowToFirmTTM', 'tangibleAssetValueTTM', 'netCurrentAssetValueTTM'] as const

const bulkRatiosTtm = ['symbol', 'grossProfitMarginTTM', 'ebitMarginTTM', 'ebitdaMarginTTM', 'operatingProfitMarginTTM', 'pretaxProfitMarginTTM', 'continuousOperationsProfitMarginTTM', 'netProfitMarginTTM', 'bottomLineProfitMarginTTM', 'receivablesTurnoverTTM', 'payablesTurnoverTTM', 'inventoryTurnoverTTM', 'fixedAssetTurnoverTTM', 'assetTurnoverTTM', 'currentRatioTTM', 'quickRatioTTM', 'solvencyRatioTTM', 'cashRatioTTM', 'priceToEarningsRatioTTM', 'priceToEarningsGrowthRatioTTM', 'forwardPriceToEarningsGrowthRatioTTM', 'priceToBookRatioTTM', 'priceToSalesRatioTTM', 'priceToFreeCashFlowRatioTTM', 'priceToOperatingCashFlowRatioTTM', 'debtToAssetsRatioTTM', 'debtToEquityRatioTTM', 'debtToCapitalRatioTTM', 'longTermDebtToCapitalRatioTTM', 'financialLeverageRatioTTM', 'workingCapitalTurnoverRatioTTM', 'operatingCashFlowRatioTTM', 'operatingCashFlowSalesRatioTTM', 'freeCashFlowOperatingCashFlowRatioTTM', 'debtServiceCoverageRatioTTM', 'interestCoverageRatioTTM', 'shortTermOperatingCashFlowCoverageRatioTTM', 'operatingCashFlowCoverageRatioTTM', 'capitalExpenditureCoverageRatioTTM', 'dividendPaidAndCapexCoverageRatioTTM', 'dividendPayoutRatioTTM', 'dividendYieldTTM', 'dividendYieldPercentageTTM', 'enterpriseValueTTM', 'revenuePerShareTTM', 'netIncomePerShareTTM', 'interestDebtPerShareTTM', 'cashPerShareTTM', 'bookValuePerShareTTM', 'tangibleBookValuePerShareTTM', 'shareholdersEquityPerShareTTM', 'operatingCashFlowPerShareTTM', 'capexPerShareTTM', 'freeCashFlowPerShareTTM', 'netIncomePerEBTTTM', 'ebtPerEbitTTM', 'priceToFairValueTTM', 'debtToMarketCapTTM', 'effectiveTaxRateTTM', 'enterpriseValueMultipleTTM'] as const

const bulkStockPeers = ['symbol', 'peers'] as const

const bulkEarningsSurprises = ['symbol', 'date', 'epsActual', 'epsEstimated', 'lastUpdated'] as const

const bulkIncomeStatement = ['date', 'symbol', 'reportedCurrency', 'cik', 'filingDate', 'acceptedDate', 'fiscalYear', 'period', 'revenue', 'costOfRevenue', 'grossProfit', 'researchAndDevelopmentExpenses', 'generalAndAdministrativeExpenses', 'sellingAndMarketingExpenses', 'sellingGeneralAndAdministrativeExpenses', 'otherExpenses', 'operatingExpenses', 'costAndExpenses', 'netInterestIncome', 'interestIncome', 'interestExpense', 'depreciationAndAmortization', 'ebitda', 'ebit', 'nonOperatingIncomeExcludingInterest', 'operatingIncome', 'totalOtherIncomeExpensesNet', 'incomeBeforeTax', 'incomeTaxExpense', 'netIncomeFromContinuingOperations', 'netIncomeFromDiscontinuedOperations', 'otherAdjustmentsToNetIncome', 'netIncome', 'netIncomeDeductions', 'bottomLineNetIncome', 'eps', 'epsDiluted', 'weightedAverageShsOut', 'weightedAverageShsOutDil'] as const

const bulkIncomeStatementGrowth = ['symbol', 'date', 'fiscalYear', 'period', 'reportedCurrency', 'growthRevenue', 'growthCostOfRevenue', 'growthGrossProfit', 'growthGrossProfitRatio', 'growthResearchAndDevelopmentExpenses', 'growthGeneralAndAdministrativeExpenses', 'growthSellingAndMarketingExpenses', 'growthOtherExpenses', 'growthOperatingExpenses', 'growthCostAndExpenses', 'growthInterestIncome', 'growthInterestExpense', 'growthDepreciationAndAmortization', 'growthEBITDA', 'growthOperatingIncome', 'growthIncomeBeforeTax', 'growthIncomeTaxExpense', 'growthNetIncome', 'growthEPS', 'growthEPSDiluted', 'growthWeightedAverageShsOut', 'growthWeightedAverageShsOutDil', 'growthEBIT', 'growthNonOperatingIncomeExcludingInterest', 'growthNetInterestIncome', 'growthTotalOtherIncomeExpensesNet', 'growthNetIncomeFromContinuingOperations', 'growthOtherAdjustmentsToNetIncome', 'growthNetIncomeDeductions'] as const

const bulkBalanceSheetStatement = ['date', 'symbol', 'reportedCurrency', 'cik', 'filingDate', 'acceptedDate', 'fiscalYear', 'period', 'cashAndCashEquivalents', 'shortTermInvestments', 'cashAndShortTermInvestments', 'netReceivables', 'accountsReceivables', 'otherReceivables', 'inventory', 'prepaids', 'otherCurrentAssets', 'totalCurrentAssets', 'propertyPlantEquipmentNet', 'goodwill', 'intangibleAssets', 'goodwillAndIntangibleAssets', 'longTermInvestments', 'taxAssets', 'otherNonCurrentAssets', 'totalNonCurrentAssets', 'otherAssets', 'totalAssets', 'totalPayables', 'accountPayables', 'otherPayables', 'accruedExpenses', 'shortTermDebt', 'capitalLeaseObligationsCurrent', 'taxPayables', 'deferredRevenue', 'otherCurrentLiabilities', 'totalCurrentLiabilities', 'longTermDebt', 'deferredRevenueNonCurrent', 'deferredTaxLiabilitiesNonCurrent', 'otherNonCurrentLiabilities', 'totalNonCurrentLiabilities', 'otherLiabilities', 'capitalLeaseObligations', 'totalLiabilities', 'treasuryStock', 'preferredStock', 'commonStock', 'retainedEarnings', 'additionalPaidInCapital', 'accumulatedOtherComprehensiveIncomeLoss', 'otherTotalStockholdersEquity', 'totalStockholdersEquity', 'totalEquity', 'minorityInterest', 'totalLiabilitiesAndTotalEquity', 'totalInvestments', 'totalDebt', 'netDebt'] as const

const bulkBalanceSheetStatementGrowth = ['symbol', 'date', 'fiscalYear', 'period', 'reportedCurrency', 'growthCashAndCashEquivalents', 'growthShortTermInvestments', 'growthCashAndShortTermInvestments', 'growthNetReceivables', 'growthInventory', 'growthOtherCurrentAssets', 'growthTotalCurrentAssets', 'growthPropertyPlantEquipmentNet', 'growthGoodwill', 'growthIntangibleAssets', 'growthGoodwillAndIntangibleAssets', 'growthLongTermInvestments', 'growthTaxAssets', 'growthOtherNonCurrentAssets', 'growthTotalNonCurrentAssets', 'growthOtherAssets', 'growthTotalAssets', 'growthAccountPayables', 'growthShortTermDebt', 'growthTaxPayables', 'growthDeferredRevenue', 'growthOtherCurrentLiabilities', 'growthTotalCurrentLiabilities', 'growthLongTermDebt', 'growthDeferredRevenueNonCurrent', 'growthDeferredTaxLiabilitiesNonCurrent', 'growthOtherNonCurrentLiabilities', 'growthTotalNonCurrentLiabilities', 'growthOtherLiabilities', 'growthTotalLiabilities', 'growthPreferredStock', 'growthCommonStock', 'growthRetainedEarnings', 'growthAccumulatedOtherComprehensiveIncomeLoss', 'growthOthertotalStockholdersEquity', 'growthTotalStockholdersEquity', 'growthMinorityInterest', 'growthTotalEquity', 'growthTotalLiabilitiesAndStockholdersEquity', 'growthTotalInvestments', 'growthTotalDebt', 'growthNetDebt', 'growthAccountsReceivables', 'growthOtherReceivables', 'growthPrepaids', 'growthTotalPayables', 'growthOtherPayables', 'growthAccruedExpenses', 'growthCapitalLeaseObligationsCurrent', 'growthAdditionalPaidInCapital', 'growthTreasuryStock'] as const

const bulkCashFlowStatement = ['date', 'symbol', 'reportedCurrency', 'cik', 'filingDate', 'acceptedDate', 'fiscalYear', 'period', 'netIncome', 'depreciationAndAmortization', 'deferredIncomeTax', 'stockBasedCompensation', 'changeInWorkingCapital', 'accountsReceivables', 'inventory', 'accountsPayables', 'otherWorkingCapital', 'otherNonCashItems', 'netCashProvidedByOperatingActivities', 'investmentsInPropertyPlantAndEquipment', 'acquisitionsNet', 'purchasesOfInvestments', 'salesMaturitiesOfInvestments', 'otherInvestingActivities', 'netCashProvidedByInvestingActivities', 'netDebtIssuance', 'longTermNetDebtIssuance', 'shortTermNetDebtIssuance', 'netStockIssuance', 'netCommonStockIssuance', 'commonStockIssuance', 'commonStockRepurchased', 'netPreferredStockIssuance', 'netDividendsPaid', 'commonDividendsPaid', 'preferredDividendsPaid', 'otherFinancingActivities', 'netCashProvidedByFinancingActivities', 'effectOfForexChangesOnCash', 'netChangeInCash', 'cashAtEndOfPeriod', 'cashAtBeginningOfPeriod', 'operatingCashFlow', 'capitalExpenditure', 'freeCashFlow', 'incomeTaxesPaid', 'interestPaid'] as const

const bulkCashFlowStatementGrowth = ['symbol', 'date', 'fiscalYear', 'period', 'reportedCurrency', 'growthNetIncome', 'growthDepreciationAndAmortization', 'growthDeferredIncomeTax', 'growthStockBasedCompensation', 'growthChangeInWorkingCapital', 'growthAccountsReceivables', 'growthInventory', 'growthAccountsPayables', 'growthOtherWorkingCapital', 'growthOtherNonCashItems', 'growthNetCashProvidedByOperatingActivites', 'growthInvestmentsInPropertyPlantAndEquipment', 'growthAcquisitionsNet', 'growthPurchasesOfInvestments', 'growthSalesMaturitiesOfInvestments', 'growthOtherInvestingActivites', 'growthNetCashUsedForInvestingActivites', 'growthDebtRepayment', 'growthCommonStockIssued', 'growthCommonStockRepurchased', 'growthDividendsPaid', 'growthOtherFinancingActivites', 'growthNetCashUsedProvidedByFinancingActivities', 'growthEffectOfForexChangesOnCash', 'growthNetChangeInCash', 'growthCashAtEndOfPeriod', 'growthCashAtBeginningOfPeriod', 'growthOperatingCashFlow', 'growthCapitalExpenditure', 'growthFreeCashFlow', 'growthNetDebtIssuance', 'growthLongTermNetDebtIssuance', 'growthShortTermNetDebtIssuance', 'growthNetStockIssuance', 'growthPreferredDividendsPaid', 'growthIncomeTaxesPaid', 'growthInterestPaid'] as const

const bulkEod = ['symbol', 'date', 'open', 'low', 'high', 'close', 'adjClose', 'volume'] as const

export const returns: Partial<Record<ApiFunctionNames, readonly string[]>> = {
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
	cryptocurrencyChartFull,
	cryptocurrencyChart1Min,
	cryptocurrencyChart5Min,
	cryptocurrencyChart1Hour,
	forexList,
	forexQuote,
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