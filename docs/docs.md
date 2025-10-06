# Financial Modeling Prep DATA API

## Stock Market API and Financial Statements API Documentation

Search
------

[Stock Symbol Search API](/developer/docs/stable/search-symbol)

![Globe Flag](https://intelligence.financialmodelingprep.com/images/icons/globe_flag.png)

Easily find the ticker symbol of any stock with the FMP Stock Symbol Search API. Search by company name or symbol across multiple global markets.

Endpoint:

<https://financialmodelingprep.com/stable/search-symbol?query\=AAPL>

Parameters:

Parameter Type Example
query\* string AAPL
limit number 50
exchange string NASDAQ

(\*) Required

#### Response

`[ { "symbol": "AAPL", "name": "Apple Inc.", "currency": "USD", "exchangeFullName": "NASDAQ Global Select", "exchange": "NASDAQ" } ]`

[Company Name Search API](/developer/docs/stable/search-name)

![Globe Flag](https://intelligence.financialmodelingprep.com/images/icons/globe_flag.png)

Search for ticker symbols, company names, and exchange details for equity securities and ETFs listed on various exchanges with the FMP Name Search API. This endpoint is useful for retrieving ticker symbols when you know the full or partial company or asset name but not the symbol identifier.

Endpoint:

<https://financialmodelingprep.com/stable/search-name?query\=AA>

Parameters:

Parameter Type Example
query\* string AA
limit number 50
exchange string NASDAQ

(\*) Required

#### Response

`[ { "symbol": "AAGUSD", "name": "AAG USD", "currency": "USD", "exchangeFullName": "CCC", "exchange": "CRYPTO" } ]`

[CIK API](/developer/docs/stable/search-cik)

![USA Flag](https://intelligence.financialmodelingprep.com/images/icons/usa_flag.png)

Easily retrieve the Central Index Key (CIK) for publicly traded companies with the FMP CIK API. Access unique identifiers needed for SEC filings and regulatory documents for a streamlined compliance and financial analysis process.

Endpoint:

<https://financialmodelingprep.com/stable/search-cik?cik\=320193>

Parameters:

Parameter Type Example
cik\* string 320193
limit number 50

(\*) Required

#### Response

`[ { "symbol": "AAPL", "companyName": "Apple Inc.", "cik": "0000320193", "exchangeFullName": "NASDAQ Global Select", "exchange": "NASDAQ", "currency": "USD" } ]`

[CUSIP API](/developer/docs/stable/search-cusip)

![Globe Flag](https://intelligence.financialmodelingprep.com/images/icons/globe_flag.png)

Easily search and retrieve financial securities information by CUSIP number using the FMP CUSIP API. Find key details such as company name, stock symbol, and market capitalization associated with the CUSIP.

Endpoint:

<https://financialmodelingprep.com/stable/search-cusip?cusip\=037833100>

Parameters:

Parameter Type Example
cusip\* string 037833100

(\*) Required

#### Response

`[ { "symbol": "AAPL", "companyName": "Apple Inc.", "cusip": "037833100", "marketCap": 3542555295744 } ]`

[ISIN API](/developer/docs/stable/search-isin)

![Globe Flag](https://intelligence.financialmodelingprep.com/images/icons/globe_flag.png)

Easily search and retrieve the International Securities Identification Number (ISIN) for financial securities using the FMP ISIN API. Find key details such as company name, stock symbol, and market capitalization associated with the ISIN.

Endpoint:

<https://financialmodelingprep.com/stable/search-isin?isin\=US0378331005>

Parameters:

Parameter Type Example
isin\* string US0378331005

(\*) Required

#### Response

`[ { "symbol": "AAPL", "name": "Apple Inc.", "isin": "US0378331005", "marketCap": 3427916386000 } ]`

[Stock Screener API](/developer/docs/stable/search-company-screener)

![Globe Flag](https://intelligence.financialmodelingprep.com/images/icons/globe_flag.png)

Discover stocks that align with your investment strategy using the FMP Stock Screener API. Filter stocks based on market cap, price, volume, beta, sector, country, and more to identify the best opportunities.

Endpoint:

<https://financialmodelingprep.com/stable/company-screener>

Parameters:

Parameter Type Example
marketCapMoreThan number 1000000
marketCapLowerThan number 1000000000
sector string Technology
industry string Consumer Electronics
betaMoreThan number 0.5
betaLowerThan number 1.5
priceMoreThan number 10
priceLowerThan number 200
dividendMoreThan number 0.5
dividendLowerThan number 2
volumeMoreThan number 1000
volumeLowerThan number 1000000
exchange string NASDAQ
country string US
isEtf boolean false
isFund boolean false
isActivelyTrading boolean true
limit number 1000
includeAllShareClasses boolean false

(\*) Required

#### Response

`[ { "symbol": "AAPL", "companyName": "Apple Inc.", "marketCap": 3435062313000, "sector": "Technology", "industry": "Consumer Electronics", "beta": 1.24, "price": 225.93, "lastAnnualDividend": 1, "volume": 43010091, "exchange": "NASDAQ Global Select", "exchangeShortName": "NASDAQ", "country": "US", "isEtf": false, "isFund": false, "isActivelyTrading": true } ]`

[Exchange Variants API](/developer/docs/stable/search-exchange-variants)

![Globe Flag](https://intelligence.financialmodelingprep.com/images/icons/globe_flag.png)

Search across multiple public exchanges to find where a given stock symbol is listed using the FMP Exchange Variants API. This allows users to quickly identify all the exchanges where a security is actively traded.

Endpoint:

<https://financialmodelingprep.com/stable/search-exchange-variants?symbol\=AAPL>

Parameters:

Parameter Type Example
symbol\* string AAPL

(\*) Required

#### Response

`[ { "symbol": "AAPL", "price": 225.46, "beta": 1.24, "volAvg": 54722288, "mktCap": 3427916386000, "lastDiv": 1, "range": "164.08-237.23", "changes": -7.54, "companyName": "Apple Inc.", "currency": "USD", "cik": "0000320193", "isin": "US0378331005", "cusip": "037833100", "exchange": "NASDAQ Global Select", "exchangeShortName": "NASDAQ", "industry": "Consumer Electronics", "website": "https://www.apple.com", "description": "Apple Inc. designs, manufactures, and markets smartphones, personal computers, tablets, wearables, and accessories worldwide. The company offers iPhone, a line of smartphones; Mac, a line of personal computers; iPad, a line of multi-purpose tablets; and wearables, home, and accessories comprising AirPods, Apple TV, Apple Watch, Beats products, and HomePod. It also provides AppleCare support and cloud services; and operates various platforms, including the App Store that allow customers to discov...", "ceo": "Mr. Timothy D. Cook", "sector": "Technology", "country": "US", "fullTimeEmployees": "161000", "phone": "408 996 1010", "address": "One Apple Park Way", "city": "Cupertino", "state": "CA", "zip": "95014", "dcfDiff": 62.45842, "dcf": 161.68157666868984, "image": "https://financialmodelingprep.com/image-stock/AAPL.png", "ipoDate": "1980-12-12", "defaultImage": false, "isEtf": false, "isActivelyTrading": true, "isAdr": false, "isFund": false } ]`

Directory
---------

[Company Symbols List API](/developer/docs/stable/company-symbols-list)

![Globe Flag](https://intelligence.financialmodelingprep.com/images/icons/globe_flag.png)

Easily retrieve a comprehensive list of financial symbols with the FMP Company Symbols List API. Access a broad range of stock symbols and other tradable financial instruments from various global exchanges, helping you explore the full range of available securities.

Endpoint:

<https://financialmodelingprep.com/stable/stock-list>

#### Response

`[ { "symbol": "6898.HK", "companyName": "China Aluminum Cans Holdings Limited" } ]`

[Financial Statement Symbols List API](/developer/docs/stable/financial-symbols-list)

![Globe Flag](https://intelligence.financialmodelingprep.com/images/icons/globe_flag.png)

Access a comprehensive list of companies with available financial statements through the FMP Financial Statement Symbols List API. Find companies listed on major global exchanges and obtain up-to-date financial data including income statements, balance sheets, and cash flow statements, are provided.

Endpoint:

<https://financialmodelingprep.com/stable/financial-statement-symbol-list>

#### Response

`[ { "symbol": "6898.HK", "companyName": "China Aluminum Cans Holdings Limited", "tradingCurrency": "HKD", "reportingCurrency": "HKD" } ]`

[CIK List API](/developer/docs/stable/cik-list)

![USA Flag](https://intelligence.financialmodelingprep.com/images/icons/usa_flag.png)

Access a comprehensive database of CIK (Central Index Key) numbers for SEC-registered entities with the FMP CIK List API. This endpoint is essential for businesses, financial professionals, and individuals who need quick access to CIK numbers for regulatory compliance, financial transactions, and investment research.

Endpoint:

<https://financialmodelingprep.com/stable/cik-list>

Parameters:

Parameter Type Example
limit number 1000

(\*) Required

#### Response

`[ { "cik": "0002036063", "companyName": "LUZ Capital Partners, LLC" } ]`

[Symbol Changes List API](/developer/docs/stable/symbol-changes-list)

![USA Flag](https://intelligence.financialmodelingprep.com/images/icons/usa_flag.png)

Stay informed about the latest stock symbol changes with the FMP Stock Symbol Changes API. Track changes due to mergers, acquisitions, stock splits, and name changes to ensure accurate trading and analysis.

Endpoint:

<https://financialmodelingprep.com/stable/symbol-change>

Parameters:

Parameter Type Example
invalid string false
limit number 100

(\*) Required

#### Response

`[ { "date": "2025-02-03", "companyName": "XPLR Infrastructure, LP Common Units representing limited partner interests", "oldSymbol": "NEP", "newSymbol": "XIFR" } ]`

[ETF Symbol Search API](/developer/docs/stable/etfs-list)

![Globe Flag](https://intelligence.financialmodelingprep.com/images/icons/globe_flag.png)

Quickly find ticker symbols and company names for Exchange Traded Funds (ETFs) using the FMP ETF Symbol Search API. This tool simplifies identifying specific ETFs by their name or ticker.

Endpoint:

<https://financialmodelingprep.com/stable/etf-list>

#### Response

`[ { "symbol": "GULF", "name": "WisdomTree Middle East Dividend Fund" } ]`

[Actively Trading List API](/developer/docs/stable/actively-trading-list)

![Globe Flag](https://intelligence.financialmodelingprep.com/images/icons/globe_flag.png)

List all actively trading companies and financial instruments with the FMP Actively Trading List API. This endpoint allows users to filter and display securities that are currently being traded on public exchanges, ensuring you access real-time market activity.

Endpoint:

<https://financialmodelingprep.com/stable/actively-trading-list>

#### Response

`[ { "symbol": "6898.HK", "name": "China Aluminum Cans Holdings Limited" } ]`

[Earnings Transcript List API](/developer/docs/stable/earnings-transcript-list)

![USA Flag](https://intelligence.financialmodelingprep.com/images/icons/usa_flag.png)

Access available earnings transcripts for companies with the FMP Earnings Transcript List API. Retrieve a list of companies with earnings transcripts, along with the total number of transcripts available for each company.

Endpoint:

<https://financialmodelingprep.com/stable/earnings-transcript-list>

#### Response

`[ { "symbol": "MCUJF", "companyName": "Medicure Inc.", "noOfTranscripts": "16" } ]`

[Available Exchanges API](/developer/docs/stable/available-exchanges)

![Globe Flag](https://intelligence.financialmodelingprep.com/images/icons/globe_flag.png)

Access a complete list of supported stock exchanges using the FMP Available Exchanges API. This API provides a comprehensive overview of global stock exchanges, allowing users to identify where securities are traded and filter data by specific exchanges for further analysis.

Endpoint:

<https://financialmodelingprep.com/stable/available-exchanges>

#### Response

`[ { "exchange": "AMEX" } ]`

[Available Sectors API](/developer/docs/stable/available-sectors)

Access a complete list of industry sectors using the FMP Available Sectors API. This API helps users categorize and filter companies based on their respective sectors, enabling deeper analysis and more focused queries across different industries.

Endpoint:

<https://financialmodelingprep.com/stable/available-sectors>

#### Response

`[ { "sector": "Basic Materials" } ]`

[Available Industries API](/developer/docs/stable/available-industries)

Access a comprehensive list of industries where stock symbols are available using the FMP Available Industries API. This API helps users filter and categorize companies based on their industry for more focused research and analysis.

Endpoint:

<https://financialmodelingprep.com/stable/available-industries>

#### Response

`[ { "industry": "Steel" } ]`

[Available Countries API](/developer/docs/stable/available-countries)

Access a comprehensive list of countries where stock symbols are available with the FMP Available Countries API. This API enables users to filter and analyze stock symbols based on the country of origin or the primary market where the securities are traded.

Endpoint:

<https://financialmodelingprep.com/stable/available-countries>

#### Response

`[ { "country": "FK" } ]`

Analyst
-------

[Financial Estimates API](/developer/docs/stable/financial-estimates)

![Globe Flag](https://intelligence.financialmodelingprep.com/images/icons/globe_flag.png)

Retrieve analyst financial estimates for stock symbols with the FMP Financial Estimates API. Access projected figures like revenue, earnings per share (EPS), and other key financial metrics as forecasted by industry analysts to inform your investment decisions.

Endpoint:

<https://financialmodelingprep.com/stable/analyst-estimates?symbol\=AAPL&period\=annual&page\=0&limit\=10>

Parameters:

Parameter Type Example
symbol\* string AAPL
period\* string annual,quarter
page number 0
limit number 10

(\*) Required | Maximum 1000 records per request

#### Response

`[ { "symbol": "AAPL", "date": "2029-09-28", "revenueLow": 483092500000, "revenueHigh": 483093500000, "revenueAvg": 483093000000, "ebitdaLow": 155952166036, "ebitdaHigh": 155952488856, "ebitdaAvg": 155952327446, "ebitLow": 140628295747, "ebitHigh": 140628586847, "ebitAvg": 140628441297, "netIncomeLow": 139446957701, "netIncomeHigh": 157185372990, "netIncomeAvg": 149150359609, "sgaExpenseLow": 31694652812, "sgaExpenseHigh": 31694718420, "sgaExpenseAvg": 31694685616, "epsAvg": 9.68, "epsHigh": 10.20148, "epsLow": 9.05024, "numAnalystsRevenue": 16, "numAnalystsEps": 6 } ]`

[Ratings Snapshot API](/developer/docs/stable/ratings-snapshot)

![Globe Flag](https://intelligence.financialmodelingprep.com/images/icons/globe_flag.png)

Quickly assess the financial health and performance of companies with the FMP Ratings Snapshot API. This API provides a comprehensive snapshot of financial ratings for stock symbols in our database, based on various key financial ratios.

Endpoint:

<https://financialmodelingprep.com/stable/ratings-snapshot?symbol\=AAPL>

Parameters:

Parameter Type Example
symbol\* string AAPL
limit number 1

(\*) Required

#### Response

`[ { "symbol": "AAPL", "rating": "A-", "overallScore": 4, "discountedCashFlowScore": 3, "returnOnEquityScore": 5, "returnOnAssetsScore": 5, "debtToEquityScore": 4, "priceToEarningsScore": 2, "priceToBookScore": 1 } ]`

[Historical Ratings API](/developer/docs/stable/historical-ratings)

![Globe Flag](https://intelligence.financialmodelingprep.com/images/icons/globe_flag.png)

Track changes in financial performance over time with the FMP Historical Ratings API. This API provides access to historical financial ratings for stock symbols in our database, allowing users to view ratings and key financial metric scores for specific dates.

Endpoint:

<https://financialmodelingprep.com/stable/ratings-historical?symbol\=AAPL>

Parameters:

Parameter Type Example
symbol\* string AAPL

limit

number

1

(\*) Required | Maximum 10000 records per request

#### Response

`[ { "symbol": "AAPL", "date": "2025-02-04", "rating": "A-", "overallScore": 4, "discountedCashFlowScore": 3, "returnOnEquityScore": 5, "returnOnAssetsScore": 5, "debtToEquityScore": 4, "priceToEarningsScore": 2, "priceToBookScore": 1 } ]`

[Price Target Summary API](/developer/docs/stable/price-target-summary)

![USA Flag](https://intelligence.financialmodelingprep.com/images/icons/usa_flag.png)

Gain insights into analysts' expectations for stock prices with the FMP Price Target Summary API. This API provides access to average price targets from analysts across various timeframes, helping investors assess future stock performance based on expert opinions.

Endpoint:

<https://financialmodelingprep.com/stable/price-target-summary?symbol\=AAPL>

Parameters:

Parameter Type Example
symbol\* string AAPL

(\*) Required

#### Response

`[ { "symbol": "AAPL", "lastMonthCount": 1, "lastMonthAvgPriceTarget": 200.75, "lastQuarterCount": 3, "lastQuarterAvgPriceTarget": 204.2, "lastYearCount": 48, "lastYearAvgPriceTarget": 232.99, "allTimeCount": 167, "allTimeAvgPriceTarget": 201.21, "publishers": "[\"Benzinga\",\"StreetInsider\",\"TheFly\",\"Pulse 2.0\",\"TipRanks Contributor\",\"MarketWatch\",\"Investing\",\"Barrons\",\"Investor's Business Daily\"]" } ]`

[Price Target Consensus API](/developer/docs/stable/price-target-consensus)

![USA Flag](https://intelligence.financialmodelingprep.com/images/icons/usa_flag.png)

Access analysts' consensus price targets with the FMP Price Target Consensus API. This API provides high, low, median, and consensus price targets for stocks, offering investors a comprehensive view of market expectations for future stock prices.

Endpoint:

<https://financialmodelingprep.com/stable/price-target-consensus?symbol\=AAPL>

Parameters:

Parameter Type Example
symbol\* string AAPL

(\*) Required

#### Response

`[ { "symbol": "AAPL", "targetHigh": 300, "targetLow": 200, "targetConsensus": 251.7, "targetMedian": 258 } ]`

[Price Target News API](/developer/docs/stable/price-target-news)

![USA Flag](https://intelligence.financialmodelingprep.com/images/icons/usa_flag.png)

Stay informed with real-time updates on analysts' price targets for stocks using the FMP Price Target News API. Access the latest forecasts, stock prices at the time of the update, and direct links to trusted news sources for deeper insights.

Endpoint:

<https://financialmodelingprep.com/stable/price-target-news?symbol\=AAPL&page\=0&limit\=10>

Parameters:

Parameter Type Example
symbol\* string AAPL
limit number 10
page number 0

(\*) Required

#### Response

`[ { "symbol": "AAPL", "publishedDate": "2025-01-21T01:24:32.000Z", "newsURL": "https://www.benzinga.com/markets/equities/25/01/43087992/apple-gets-rare-downgrade-from-jefferies-analyst-warns-on-slowing-revenue-growth-missed-forecast", "newsTitle": "Apple Gets Rare Downgrade From Jefferies, Analyst Warns On Slowing Revenue Growth, Missed Forecasts, And Falling iPhone Demand", "analystName": "Edison Lee", "priceTarget": 200.75, "adjPriceTarget": 200.75, "priceWhenPosted": 229.98, "newsPublisher": "Benzinga", "newsBaseURL": "benzinga.com", "analystCompany": "Jefferies" } ]`

[Price Target Latest News API](/developer/docs/stable/price-target-latest-news)

![USA Flag](https://intelligence.financialmodelingprep.com/images/icons/usa_flag.png)

Stay updated with the most recent analyst price target updates for all stock symbols using the FMP Price Target Latest News API. Get access to detailed forecasts, stock prices at the time of the update, analyst insights, and direct links to news sources for deeper analysis.

Endpoint:

<https://financialmodelingprep.com/stable/price-target-latest-news?page\=0&limit\=10>

Parameters:

Parameter Type Example
limit number 10
page number 0

(\*) Required | Maximum 1000 records per request | Page maxed at 100

#### Response

`[ { "symbol": "OLN", "publishedDate": "2025-02-03T18:23:58.000Z", "newsURL": "https://www.benzinga.com/25/02/43444520/these-analysts-cut-their-forecasts-on-olin-after-q4-earnings", "newsTitle": "These Analysts Cut Their Forecasts On Olin After Q4 Earnings", "analystName": "Peter Osterland", "priceTarget": 32, "adjPriceTarget": 32, "priceWhenPosted": 27.76, "newsPublisher": "Benzinga", "newsBaseURL": "benzinga.com", "analystCompany": "Truist Financial" } ]`

[Stock Grades API](/developer/docs/stable/grades)

![Globe Flag](https://intelligence.financialmodelingprep.com/images/icons/globe_flag.png)

Access the latest stock grades from top analysts and financial institutions with the FMP Grades API. Track grading actions, such as upgrades, downgrades, or maintained ratings, for specific stock symbols, providing valuable insight into how experts evaluate companies over time.

Endpoint:

<https://financialmodelingprep.com/stable/grades?symbol\=AAPL>

Parameters:

Parameter Type Example
symbol\* string AAPL

(\*) Required

#### Response

`[ { "symbol": "AAPL", "date": "2025-01-31", "gradingCompany": "Morgan Stanley", "previousGrade": "Overweight", "newGrade": "Overweight", "action": "maintain" } ]`

[Historical Stock Grades API](/developer/docs/stable/historical-grades)

![Globe Flag](https://intelligence.financialmodelingprep.com/images/icons/globe_flag.png)

Access a comprehensive record of analyst grades with the FMP Historical Grades API. This tool allows you to track historical changes in analyst ratings for specific stock symbol

Endpoint:

<https://financialmodelingprep.com/stable/grades-historical?symbol\=AAPL>

Parameters:

Parameter Type Example
symbol\* string AAPL
limit number 100

(\*) Required | Maximum 1000 records per request

#### Response

`[ { "symbol": "AAPL", "date": "2025-02-01", "analystRatingsBuy": 8, "analystRatingsHold": 14, "analystRatingsSell": 2, "analystRatingsStrongSell": 2 } ]`

[Stock Grades Summary API](/developer/docs/stable/grades-summary)

![Globe Flag](https://intelligence.financialmodelingprep.com/images/icons/globe_flag.png)

Quickly access an overall view of analyst ratings with the FMP Grades Summary API. This API provides a consolidated summary of market sentiment for individual stock symbols, including the total number of strong buy, buy, hold, sell, and strong sell ratings. Understand the overall consensus on a stock’s outlook with just a few data points.

Endpoint:

<https://financialmodelingprep.com/stable/grades-consensus?symbol\=AAPL>

Parameters:

Parameter Type Example
symbol\* string AAPL

(\*) Required

#### Response

`[ { "symbol": "AAPL", "strongBuy": 1, "buy": 29, "hold": 11, "sell": 4, "strongSell": 0, "consensus": "Buy" } ]`

[Stock Grade News API](/developer/docs/stable/grade-news)

![USA Flag](https://intelligence.financialmodelingprep.com/images/icons/usa_flag.png)

Stay informed on the latest analyst grade changes with the FMP Grade News API. This API provides real-time updates on stock rating changes, including the grading company, previous and new grades, and the action taken. Direct links to trusted news sources and stock prices at the time of the update help you stay ahead of market trends and analyst opinions for specific stock symbols.

Endpoint:

<https://financialmodelingprep.com/stable/grades-news?symbol\=AAPL&page\=0&limit\=1>

Parameters:

Parameter Type Example
symbol\* string AAPL
page number 0
limit number 1

(\*) Required | Maximum 100 records per request

#### Response

`[ { "symbol": "AAPL", "publishedDate": "2025-01-31T10:11:47.000Z", "newsURL": "https://www.benzinga.com/25/01/43379061/why-apple-shares-are-trading-higher-here-are-20-stocks-moving-premarket", "newsTitle": "Why Apple Shares Are Trading Higher; Here Are 20 Stocks Moving Premarket", "newsBaseURL": "benzinga.com", "newsPublisher": "Benzinga", "newGrade": "Buy", "previousGrade": "Hold", "gradingCompany": "Maxim Group", "action": "initialise", "priceWhenPosted": 237.59 } ]`

[Stock Grade Latest News API](/developer/docs/stable/grade-latest-news)

![USA Flag](https://intelligence.financialmodelingprep.com/images/icons/usa_flag.png)

Stay informed on the latest stock rating changes with the FMP Grade Latest News API. This API provides the most recent updates on analyst ratings for all stock symbols, including links to the original news sources. Track stock price movements, grading firm actions, and market sentiment shifts in real time, sourced from trusted publishers.

Endpoint:

<https://financialmodelingprep.com/stable/grades-latest-news?page\=0&limit\=10>

Parameters:

Parameter Type Example
page number 0
limit number 10

(\*) Required | Maximum 1000 records per request | Page maxed at 100

#### Response

`[ { "symbol": "PYPL", "publishedDate": "2025-02-04T19:18:04.000Z", "newsURL": "https://www.benzinga.com/25/02/43475080/paypal-beats-q4-estimates-as-transaction-margins-and-payment-volume-drive-growth-eyes-2025-growth-with-strong-tmd", "newsTitle": "PayPal Transaction Margins and Payment Volume Drive Growth, Eyes 2025 Growth With Strong TMD Ahead of Investor Day: Analyst", "newsBaseURL": "benzinga.com", "newsPublisher": "Benzinga", "newGrade": "Overweight", "previousGrade": "Overweight", "gradingCompany": "J.P. Morgan", "action": "hold", "priceWhenPosted": 77.725 } ]`

Calendar
--------

[Dividends Company API](/developer/docs/stable/dividends-company)

![Globe Flag](https://intelligence.financialmodelingprep.com/images/icons/globe_flag.png)

Stay informed about upcoming dividend payments with the FMP Dividends Company API. This API provides essential dividend data for individual stock symbols, including record dates, payment dates, declaration dates, and more.

Endpoint:

<https://financialmodelingprep.com/stable/dividends?symbol\=AAPL>

Parameters:

Parameter Type Example
symbol\* string AAPL
limit number 100

(\*) Required | Maximum 1000 records per request

#### Response

`[ { "symbol": "AAPL", "date": "2025-02-10", "recordDate": "2025-02-10", "paymentDate": "2025-02-13", "declarationDate": "2025-01-30", "adjDividend": 0.25, "dividend": 0.25, "yield": 0.42955326460481097, "frequency": "Quarterly" } ]`

[Dividends Calendar API](/developer/docs/stable/dividends-calendar)

![Globe Flag](https://intelligence.financialmodelingprep.com/images/icons/globe_flag.png)

Stay informed on upcoming dividend events with the Dividend Events Calendar API. Access a comprehensive schedule of dividend-related dates for all stocks, including record dates, payment dates, declaration dates, and dividend yields.

Endpoint:

<https://financialmodelingprep.com/stable/dividends-calendar>

Parameters:

Parameter Type Example
from date 2025-01-10
to date 2025-04-10

(\*) Required | Maximum 4000 records per request | Max 90-day date range

#### Response

`[ { "symbol": "1D0.SI", "date": "2025-02-04", "recordDate": "", "paymentDate": "", "declarationDate": "", "adjDividend": 0.01, "dividend": 0.01, "yield": 6.25, "frequency": "Semi-Annual" } ]`

[Earnings Report API](/developer/docs/stable/earnings-company)

![Globe Flag](https://intelligence.financialmodelingprep.com/images/icons/globe_flag.png)

Retrieve in-depth earnings information with the FMP Earnings Report API. Gain access to key financial data for a specific stock symbol, including earnings report dates, EPS estimates, and revenue projections to help you stay on top of company performance.

Endpoint:

<https://financialmodelingprep.com/stable/earnings?symbol\=AAPL>

Parameters:

Parameter Type Example
symbol\* string AAPL
limit number 100

(\*) Required | Maximum 1000 records per request

#### Response

`[ { "symbol": "AAPL", "date": "2025-10-29", "epsActual": null, "epsEstimated": null, "revenueActual": null, "revenueEstimated": null, "lastUpdated": "2025-02-04" } ]`

[Earnings Calendar API](/developer/docs/stable/earnings-calendar)

![Globe Flag](https://intelligence.financialmodelingprep.com/images/icons/globe_flag.png)

Stay informed on upcoming and past earnings announcements with the FMP Earnings Calendar API. Access key data, including announcement dates, estimated earnings per share (EPS), and actual EPS for publicly traded companies.

Endpoint:

<https://financialmodelingprep.com/stable/earnings-calendar>

Parameters:

Parameter Type Example
from date 2025-01-10
to date 2025-04-10

(\*) Required | Maximum 4000 records per request | Max 90-day date range

#### Response

`[ { "symbol": "KEC.NS", "date": "2024-11-04", "epsActual": 3.32, "epsEstimated": 4.97, "revenueActual": 51133100000, "revenueEstimated": 44687400000, "lastUpdated": "2024-12-08" } ]`

[IPOs Calendar API](/developer/docs/stable/ipos-calendar)

![Globe Flag](https://intelligence.financialmodelingprep.com/images/icons/globe_flag.png)

Access a comprehensive list of all upcoming initial public offerings (IPOs) with the FMP IPO Calendar API. Stay up to date on the latest companies entering the public market, with essential details on IPO dates, company names, expected pricing, and exchange listings.

Endpoint:

<https://financialmodelingprep.com/stable/ipos-calendar>

Parameters:

Parameter Type Example
from date 2025-01-10
to date 2025-04-10

(\*) Required | Max 90-day date range

#### Response

`[ { "symbol": "PEVC", "date": "2025-02-03", "daa": "2025-02-03T05:00:00.000Z", "company": "Pacer Funds Trust", "exchange": "NYSE", "actions": "Expected", "shares": null, "priceRange": null, "marketCap": null } ]`

[IPOs Disclosure API](/developer/docs/stable/ipos-disclosure)

![USA Flag](https://intelligence.financialmodelingprep.com/images/icons/usa_flag.png)

Access a comprehensive list of disclosure filings for upcoming initial public offerings (IPOs) with the FMP IPO Disclosures API. Stay updated on regulatory filings, including filing dates, effectiveness dates, CIK numbers, and form types, with direct links to official SEC documents.

Endpoint:

<https://financialmodelingprep.com/stable/ipos-disclosure>

Parameters:

Parameter Type Example
from date 2025-01-10
to date 2025-04-10

(\*) Required

#### Response

`[ { "symbol": "SCHM", "filingDate": "2025-02-03", "acceptedDate": "2025-02-03", "effectivenessDate": "2025-02-03", "cik": "0001454889", "form": "CERT", "url": "https://www.sec.gov/Archives/edgar/data/1454889/000114336225000044/SCCR020325.pdf" } ]`

[IPOs Prospectus API](/developer/docs/stable/ipos-prospectus)

![USA Flag](https://intelligence.financialmodelingprep.com/images/icons/usa_flag.png)

Access comprehensive information on IPO prospectuses with the FMP IPO Prospectus API. Get key financial details, such as public offering prices, discounts, commissions, proceeds before expenses, and more. This API also provides links to official SEC prospectuses, helping investors stay informed on companies entering the public market.

Endpoint:

<https://financialmodelingprep.com/stable/ipos-prospectus>

Parameters:

Parameter Type Example
from date 2025-01-10
to date 2025-04-10

(\*) Required

#### Response

`[ { "symbol": "ATAK", "acceptedDate": "2025-02-03", "filingDate": "2025-02-03", "ipoDate": "2022-03-20", "cik": "0001883788", "pricePublicPerShare": 0.78, "pricePublicTotal": 4649936.72, "discountsAndCommissionsPerShare": 0.04, "discountsAndCommissionsTotal": 254909.67, "proceedsBeforeExpensesPerShare": 0.74, "proceedsBeforeExpensesTotal": 4395207.05, "form": "424B4", "url": "https://www.sec.gov/Archives/edgar/data/1883788/000149315225004604/form424b4.htm" } ]`

[Stock Split Details API](/developer/docs/stable/splits-company)

![Globe Flag](https://intelligence.financialmodelingprep.com/images/icons/globe_flag.png)

Access detailed information on stock splits for a specific company using the FMP Stock Split Details API. This API provides essential data, including the split date and the split ratio, helping users understand changes in a company's share structure after a stock split.

Endpoint:

<https://financialmodelingprep.com/stable/splits?symbol\=AAPL>

Parameters:

Parameter Type Example
symbol\* string AAPL
limit number 100

(\*) Required | Maximum 1000 records per request

#### Response

`[ { "symbol": "AAPL", "date": "2020-08-31", "numerator": 4, "denominator": 1 } ]`

[Stock Splits Calendar API](/developer/docs/stable/splits-calendar)

![Globe Flag](https://intelligence.financialmodelingprep.com/images/icons/globe_flag.png)

Stay informed about upcoming stock splits with the FMP Stock Splits Calendar API. This API provides essential data on upcoming stock splits across multiple companies, including the split date and ratio, helping you track changes in share structures before they occur.

Endpoint:

<https://financialmodelingprep.com/stable/splits-calendar>

Parameters:

Parameter Type Example
from date 2025-01-10
to date 2025-04-10

(\*) Required | Maximum 4000 records per request | Max 90-day date range

#### Response

`[ { "symbol": "EYEN", "date": "2025-02-03", "numerator": 1, "denominator": 80 } ]`

Chart
-----

[Stock Chart Light API](/developer/docs/stable/historical-price-eod-light)

![Globe Flag](https://intelligence.financialmodelingprep.com/images/icons/globe_flag.png)

Access simplified stock chart data using the FMP Basic Stock Chart API. This API provides essential charting information, including date, price, and trading volume, making it ideal for tracking stock performance with minimal data and creating basic price and volume charts.

Endpoint:

<https://financialmodelingprep.com/stable/historical-price-eod/light?symbol\=AAPL>

Parameters:

Parameter Type Example
symbol\* string AAPL
from date 2025-01-10
to date 2025-04-10

(\*) Required

#### Response

`[ { "symbol": "AAPL", "date": "2025-02-04", "price": 232.8, "volume": 44489128 } ]`

[Stock Price and Volume Data API](/developer/docs/stable/historical-price-eod-full)

![Globe Flag](https://intelligence.financialmodelingprep.com/images/icons/globe_flag.png)

Access full price and volume data for any stock symbol using the FMP Comprehensive Stock Price and Volume Data API. Get detailed insights, including open, high, low, close prices, trading volume, price changes, percentage changes, and volume-weighted average price (VWAP).

Endpoint:

<https://financialmodelingprep.com/stable/historical-price-eod/full?symbol\=AAPL>

Parameters:

Parameter Type Example
symbol\* string AAPL
from date 2025-01-10
to date 2025-04-10

(\*) Required

#### Response

`[ { "symbol": "AAPL", "date": "2025-02-04", "open": 227.2, "high": 233.13, "low": 226.65, "close": 232.8, "volume": 44489128, "change": 5.6, "changePercent": 2.46479, "vwap": 230.86 } ]`

[Unadjusted Stock Price API](/developer/docs/stable/historical-price-eod-non-split-adjusted)

![Globe Flag](https://intelligence.financialmodelingprep.com/images/icons/globe_flag.png)

Access stock price and volume data without adjustments for stock splits with the FMP Unadjusted Stock Price Chart API. Get accurate insights into stock performance, including open, high, low, and close prices, along with trading volume, without split-related changes.

Endpoint:

<https://financialmodelingprep.com/stable/historical-price-eod/non-split-adjusted?symbol\=AAPL>

Parameters:

Parameter Type Example
symbol\* string AAPL
from date 2025-01-10
to date 2025-04-10

(\*) Required

#### Response

`[ { "symbol": "AAPL", "date": "2025-02-04", "adjOpen": 227.2, "adjHigh": 233.13, "adjLow": 226.65, "adjClose": 232.8, "volume": 44489128 } ]`

[Dividend Adjusted Price Chart API](/developer/docs/stable/historical-price-eod-dividend-adjusted)

![Globe Flag](https://intelligence.financialmodelingprep.com/images/icons/globe_flag.png)

Analyze stock performance with dividend adjustments using the FMP Dividend-Adjusted Price Chart API. Access end-of-day price and volume data that accounts for dividend payouts, offering a more comprehensive view of stock trends over time.

Endpoint:

<https://financialmodelingprep.com/stable/historical-price-eod/dividend-adjusted?symbol\=AAPL>

Parameters:

Parameter Type Example
symbol\* string AAPL
from date 2025-01-10
to date 2025-04-10

(\*) Required

#### Response

`[ { "symbol": "AAPL", "date": "2025-02-04", "adjOpen": 227.2, "adjHigh": 233.13, "adjLow": 226.65, "adjClose": 232.8, "volume": 44489128 } ]`

[1 Min Interval Stock Chart API](/developer/docs/stable/intraday-1-min)

![Globe Flag](https://intelligence.financialmodelingprep.com/images/icons/globe_flag.png)

Access precise intraday stock price and volume data with the FMP 1-Minute Interval Stock Chart API. Retrieve real-time or historical stock data in 1-minute intervals, including key information such as open, high, low, and close prices, and trading volume for each minute.

Endpoint:

<https://financialmodelingprep.com/stable/historical-chart/1min?symbol\=AAPL>

Parameters:

Parameter Type Example
symbol\* string AAPL
from date 2024-01-01
to date 2024-03-01
nonadjusted boolean false

(\*) Required

#### Response

`[ { "date": "2025-02-04 15:59:00", "open": 233.01, "low": 232.72, "high": 233.13, "close": 232.79, "volume": 720121 } ]`

[5 Min Interval Stock Chart API](/developer/docs/stable/intraday-5-min)

![Globe Flag](https://intelligence.financialmodelingprep.com/images/icons/globe_flag.png)

Access stock price and volume data with the FMP 5-Minute Interval Stock Chart API. Retrieve detailed stock data in 5-minute intervals, including open, high, low, and close prices, along with trading volume for each 5-minute period. This API is perfect for short-term trading analysis and building intraday charts.

Endpoint:

<https://financialmodelingprep.com/stable/historical-chart/5min?symbol\=AAPL>

Parameters:

Parameter Type Example
symbol\* string AAPL
from date 2024-01-01
to date 2024-03-01
nonadjusted boolean false

(\*) Required

#### Response

`[ { "date": "2025-02-04 15:55:00", "open": 232.87, "low": 232.72, "high": 233.13, "close": 232.79, "volume": 1555040 } ]`

[15 Min Interval Stock Chart API](/developer/docs/stable/intraday-15-min)

![Globe Flag](https://intelligence.financialmodelingprep.com/images/icons/globe_flag.png)

Access stock price and volume data with the FMP 15-Minute Interval Stock Chart API. Retrieve detailed stock data in 15-minute intervals, including open, high, low, close prices, and trading volume. This API is ideal for creating intraday charts and analyzing medium-term price trends during the trading day.

Endpoint:

<https://financialmodelingprep.com/stable/historical-chart/15min?symbol\=AAPL>

Parameters:

Parameter Type Example
symbol\* string AAPL
from date 2024-01-01
to date 2024-03-01
nonadjusted boolean false

(\*) Required

#### Response

`[ { "date": "2025-02-04 15:45:00", "open": 232.25, "low": 232.18, "high": 233.13, "close": 232.79, "volume": 2535629 } ]`

[30 Min Interval Stock Chart API](/developer/docs/stable/intraday-30-min)

![Globe Flag](https://intelligence.financialmodelingprep.com/images/icons/globe_flag.png)

Access stock price and volume data with the FMP 30-Minute Interval Stock Chart API. Retrieve essential stock data in 30-minute intervals, including open, high, low, close prices, and trading volume. This API is perfect for creating intraday charts and tracking medium-term price movements for more strategic trading decisions.

Endpoint:

<https://financialmodelingprep.com/stable/historical-chart/30min?symbol\=AAPL>

Parameters:

Parameter Type Example
symbol\* string AAPL
from date 2024-01-01
to date 2024-03-01
nonadjusted boolean false

(\*) Required

#### Response

`[ { "date": "2025-02-04 15:30:00", "open": 232.29, "low": 232.01, "high": 233.13, "close": 232.79, "volume": 3476320 } ]`

[1 Hour Interval Stock Chart API](/developer/docs/stable/intraday-1-hour)

![Globe Flag](https://intelligence.financialmodelingprep.com/images/icons/globe_flag.png)

Track stock price movements over hourly intervals with the FMP 1-Hour Interval Stock Chart API. Access essential stock price and volume data, including open, high, low, and close prices for each hour, to analyze broader intraday trends with precision.

Endpoint:

<https://financialmodelingprep.com/stable/historical-chart/1hour?symbol\=AAPL>

Parameters

Query Parameter

Type

Example

symbol\*

string

AAPL

from

date

2024-01-01

to

date

2024-03-01

nonadjusted

boolean

false

(\*) Required

#### Response

`[ { "date": "2025-02-04 15:30:00", "open": 232.29, "low": 232.01, "high": 233.13, "close": 232.37, "volume": 15079381 } ]`

[4 Hour Interval Stock Chart API](/developer/docs/stable/intraday-4-hour)

![Globe Flag](https://intelligence.financialmodelingprep.com/images/icons/globe_flag.png)

Analyze stock price movements over extended intraday periods with the FMP 4-Hour Interval Stock Chart API. Access key stock price and volume data in 4-hour intervals, perfect for tracking longer intraday trends and understanding broader market movements.

Endpoint:

<https://financialmodelingprep.com/stable/historical-chart/4hour?symbol\=AAPL>

Parameters

Query Parameter

Type

Example

symbol\*

string

AAPL

from

date

2024-01-01

to

date

2024-03-01

nonadjusted

boolean

false

(\*) Required

#### Response

`[ { "date": "2025-02-04 12:30:00", "open": 231.79, "low": 231.37, "high": 233.13, "close": 232.37, "volume": 23781913 } ]`

Company
-------

[Company Profile Data API](/developer/docs/stable/profile-symbol)

![Globe Flag](https://intelligence.financialmodelingprep.com/images/icons/globe_flag.png)

Access detailed company profile data with the FMP Company Profile Data API. This API provides key financial and operational information for a specific stock symbol, including the company's market capitalization, stock price, industry, and much more.

Endpoint:

<https://financialmodelingprep.com/stable/profile?symbol\=AAPL>

Parameters

Query Parameter

Type

Example

symbol\*

string

AAPL

(\*) Required

#### Response

`[ { "symbol": "AAPL", "price": 232.8, "marketCap": 3500823120000, "beta": 1.24, "lastDividend": 0.99, "range": "164.08-260.1", "change": 4.79, "changePercentage": 2.1008, "volume": 0, "averageVolume": 50542058, "companyName": "Apple Inc.", "currency": "USD", "cik": "0000320193", "isin": "US0378331005", "cusip": "037833100", "exchangeFullName": "NASDAQ Global Select", "exchange": "NASDAQ", "industry": "Consumer Electronics", "website": "https://www.apple.com", "description": "Apple Inc. designs, manufactures, and markets smartphones, personal computers, tablets, wearables, and accessories worldwide. The company offers iPhone, a line of smartphones; Mac, a line of personal computers; iPad, a line of multi-purpose tablets; and wearables, home, and accessories comprising AirPods, Apple TV, Apple Watch, Beats products, and HomePod. It also provides AppleCare support and cloud services; and operates various platforms, including the App Store that allow customers to discov...", "ceo": "Mr. Timothy D. Cook", "sector": "Technology", "country": "US", "fullTimeEmployees": "164000", "phone": "(408) 996-1010", "address": "One Apple Park Way", "city": "Cupertino", "state": "CA", "zip": "95014", "image": "https://images.financialmodelingprep.com/symbol/AAPL.png", "ipoDate": "1980-12-12", "defaultImage": false, "isEtf": false, "isActivelyTrading": true, "isAdr": false, "isFund": false } ]`

[Company Profile by CIK API](/developer/docs/stable/profile-cik)

![USA Flag](https://intelligence.financialmodelingprep.com/images/icons/usa_flag.png)

Retrieve detailed company profile data by CIK (Central Index Key) with the FMP Company Profile by CIK API. This API allows users to search for companies using their unique CIK identifier and access a full range of company data, including stock price, market capitalization, industry, and much more.

Endpoint:

<https://financialmodelingprep.com/stable/profile-cik?cik\=320193>

Parameters:

Parameter Type Example
cik\* string 320193

(\*) Required

#### Response

`[ { "symbol": "AAPL", "price": 232.8, "marketCap": 3500823120000, "beta": 1.24, "lastDividend": 0.99, "range": "164.08-260.1", "change": 4.79, "changePercentage": 2.1008, "volume": 0, "averageVolume": 50542058, "companyName": "Apple Inc.", "currency": "USD", "cik": "0000320193", "isin": "US0378331005", "cusip": "037833100", "exchangeFullName": "NASDAQ Global Select", "exchange": "NASDAQ", "industry": "Consumer Electronics", "website": "https://www.apple.com", "description": "Apple Inc. designs, manufactures, and markets smartphones, personal computers, tablets, wearables, and accessories worldwide. The company offers iPhone, a line of smartphones; Mac, a line of personal computers; iPad, a line of multi-purpose tablets; and wearables, home, and accessories comprising AirPods, Apple TV, Apple Watch, Beats products, and HomePod. It also provides AppleCare support and cloud services; and operates various platforms, including the App Store that allow customers to discov...", "ceo": "Mr. Timothy D. Cook", "sector": "Technology", "country": "US", "fullTimeEmployees": "164000", "phone": "(408) 996-1010", "address": "One Apple Park Way", "city": "Cupertino", "state": "CA", "zip": "95014", "image": "https://images.financialmodelingprep.com/symbol/AAPL.png", "ipoDate": "1980-12-12", "defaultImage": false, "isEtf": false, "isActivelyTrading": true, "isAdr": false, "isFund": false } ]`

[Company Notes API](/developer/docs/stable/company-notes)

![USA Flag](https://intelligence.financialmodelingprep.com/images/icons/usa_flag.png)

Retrieve detailed information about company-issued notes with the FMP Company Notes API. Access essential data such as CIK number, stock symbol, note title, and the exchange where the notes are listed.

Endpoint:

<https://financialmodelingprep.com/stable/company-notes?symbol\=AAPL>

Parameters:

Parameter Type Example
symbol\* string AAPL

(\*) Required

#### Response

`[ { "cik": "0000320193", "symbol": "AAPL", "title": "1.000% Notes due 2022", "exchange": "NASDAQ" } ]`

[Stock Peer Comparison API](/developer/docs/stable/peers)

![Globe Flag](https://intelligence.financialmodelingprep.com/images/icons/globe_flag.png)

Identify and compare companies within the same sector and market capitalization range using the FMP Stock Peer Comparison API. Gain insights into how a company stacks up against its peers on the same exchange.

Endpoint:

<https://financialmodelingprep.com/stable/stock-peers?symbol\=AAPL>

Parameters:

Parameter Type Example
symbol\* string AAPL

(\*) Required

#### Response

`[ { "symbol": "GPRO", "companyName": "GoPro, Inc.", "price": 0.9668, "mktCap": 152173717 } ]`

[Delisted Companies API](/developer/docs/stable/delisted-companies)

![USA Flag](https://intelligence.financialmodelingprep.com/images/icons/usa_flag.png)

Stay informed with the FMP Delisted Companies API. Access a comprehensive list of companies that have been delisted from US exchanges to avoid trading in risky stocks and identify potential financial troubles.

Endpoint:

<https://financialmodelingprep.com/stable/delisted-companies?page\=0&limit\=100>

Parameters:

Parameter Type Example
page number 0
limit number 100

(\*) Required | Maximum 100 records per request

#### Response

`[ { "symbol": "BRQSF", "companyName": "Borqs Technologies, Inc.", "exchange": "PNK", "ipoDate": "2017-08-24", "delistedDate": "2025-02-03" } ]`

[Company Employee Count API](/developer/docs/stable/employee-count)

![USA Flag](https://intelligence.financialmodelingprep.com/images/icons/usa_flag.png)

Retrieve detailed workforce information for companies, including employee count, reporting period, and filing date. The FMP Company Employee Count API also provides direct links to official SEC documents for further verification and in-depth research.

Endpoint:

<https://financialmodelingprep.com/stable/employee-count?symbol\=AAPL>

Parameters:

Parameter Type Example
symbol\* string AAPL
limit number 100

(\*) Required | Maximum 10000 records per request

#### Response

`[ { "symbol": "AAPL", "cik": "0000320193", "acceptanceTime": "2024-11-01 06:01:36", "periodOfReport": "2024-09-28", "companyName": "Apple Inc.", "formType": "10-K", "filingDate": "2024-11-01", "employeeCount": 164000, "source": "https://www.sec.gov/Archives/edgar/data/320193/000032019324000123/0000320193-24-000123-index.htm" } ]`

[Company Historical Employee Count API](/developer/docs/stable/historical-employee-count)

![USA Flag](https://intelligence.financialmodelingprep.com/images/icons/usa_flag.png)

Access historical employee count data for a company based on specific reporting periods. The FMP Company Historical Employee Count API provides insights into how a company’s workforce has evolved over time, allowing users to analyze growth trends and operational changes.

Endpoint:

<https://financialmodelingprep.com/stable/historical-employee-count?symbol\=AAPL>

Parameters:

Parameter Type Example
symbol\* string AAPL
limit number 100

(\*) Required | Maximum 10000 records per request

#### Response

`[ { "symbol": "AAPL", "cik": "0000320193", "acceptanceTime": "2024-11-01 06:01:36", "periodOfReport": "2024-09-28", "companyName": "Apple Inc.", "formType": "10-K", "filingDate": "2024-11-01", "employeeCount": 164000, "source": "https://www.sec.gov/Archives/edgar/data/320193/000032019324000123/0000320193-24-000123-index.htm" } ]`

[Company Market Cap API](/developer/docs/stable/market-cap)

![Globe Flag](https://intelligence.financialmodelingprep.com/images/icons/globe_flag.png)

Retrieve the market capitalization for a specific company on any given date using the FMP Company Market Capitalization API. This API provides essential data to assess the size and value of a company in the stock market, helping users gauge its overall market standing.

Endpoint:

<https://financialmodelingprep.com/stable/market-capitalization?symbol\=AAPL>

Parameters:

Parameter Type Example
symbol\* string AAPL

(\*) Required | Currency is as Trading

#### Response

`[ { "symbol": "AAPL", "date": "2025-02-04", "marketCap": 3500823120000 } ]`

[Batch Market Cap API](/developer/docs/stable/batch-market-cap)

![Globe Flag](https://intelligence.financialmodelingprep.com/images/icons/globe_flag.png)

Retrieve market capitalization data for multiple companies in a single request with the FMP Batch Market Capitalization API. This API allows users to compare the market size of various companies simultaneously, streamlining the analysis of company valuations.

Endpoint:

<https://financialmodelingprep.com/stable/market-capitalization-batch?symbols\=AAPL,MSFT,GOOG>

Parameters:

Parameter Type Example
symbols\* string AAPL,MSFT,GOOG

(\*) Required

#### Response

`[ { "symbol": "AAPL", "date": "2025-02-04", "marketCap": 3500823120000 } ]`

[Historical Market Cap API](/developer/docs/stable/historical-market-cap)

![Globe Flag](https://intelligence.financialmodelingprep.com/images/icons/globe_flag.png)

Access historical market capitalization data for a company using the FMP Historical Market Capitalization API. This API helps track the changes in market value over time, enabling long-term assessments of a company's growth or decline.

Endpoint:

<https://financialmodelingprep.com/stable/historical-market-capitalization?symbol\=AAPL>

Parameters:

Parameter Type Example
symbol\* string AAPL
limit number 100
from date 2024-01-01
to date 2024-03-01

(\*) Required | Maximum 5000 records per request | Currency is as Trading

#### Response

`[ { "symbol": "AAPL", "date": "2024-02-29", "marketCap": 2784608472000 } ]`

[Company Share Float & Liquidity API](/developer/docs/stable/shares-float)

![Globe Flag](https://intelligence.financialmodelingprep.com/images/icons/globe_flag.png)

Understand the liquidity and volatility of a stock with the FMP Company Share Float and Liquidity API. Access the total number of publicly traded shares for any company to make informed investment decisions.

Endpoint:

<https://financialmodelingprep.com/stable/shares-float?symbol\=AAPL>

Parameters

Query Parameter

Type

Example

symbol\*

string

AAPL

(\*) Required

#### Response

`[ { "symbol": "AAPL", "date": "2025-02-04 17:01:35", "freeFloat": 99.9095, "floatShares": 15024290700, "outstandingShares": 15037900000 } ]`

[All Shares Float API](/developer/docs/stable/all-shares-float)

![Globe Flag](https://intelligence.financialmodelingprep.com/images/icons/globe_flag.png)

Access comprehensive shares float data for all available companies with the FMP All Shares Float API. Retrieve critical information such as free float, float shares, and outstanding shares to analyze liquidity across a wide range of companies.

Endpoint:

<https://financialmodelingprep.com/stable/shares-float-all?page\=0&limit\=1000>

Parameters

Query Parameter

Type

Example

limit

number

1000

page

number

0

(\*) Required | Maximum 5000 records per request

#### Response

`[ { "symbol": "6898.HK", "date": "2025-02-04 17:27:01", "freeFloat": 33.2536, "floatShares": 318128880, "outstandingShares": 956675009 } ]`

[Latest Mergers & Acquisitions API](/developer/docs/stable/latest-mergers-acquisitions)

![USA Flag](https://intelligence.financialmodelingprep.com/images/icons/usa_flag.png)

Access real-time data on the latest mergers and acquisitions with the FMP Latest Mergers and Acquisitions API. This API provides key information such as the transaction date, company names, and links to detailed filing information for further analysis.

Endpoint:

<https://financialmodelingprep.com/stable/mergers-acquisitions-latest?page\=0&limit\=100>

Parameters

Query Parameter

Type

Example

page

number

0

limit

number

100

(\*) Required | Maximum 1000 records per request

#### Response

`[ { "symbol": "NLOK", "companyName": "NortonLifeLock Inc.", "cik": "0000849399", "targetedCompanyName": "MoneyLion Inc.", "targetedCik": "0001807846", "targetedSymbol": "ML", "transactionDate": "2025-02-03", "acceptedDate": "2025-02-03 06:01:10", "link": "https://www.sec.gov/Archives/edgar/data/849399/000114036125002752/ny20039778x6_s4.htm" } ]`

[Search Mergers & Acquisitions API](/developer/docs/stable/search-mergers-acquisitions)

![USA Flag](https://intelligence.financialmodelingprep.com/images/icons/usa_flag.png)

Search for specific mergers and acquisitions data with the FMP Search Mergers and Acquisitions API. Retrieve detailed information on M&A activity, including acquiring and targeted companies, transaction dates, and links to official SEC filings.

Endpoint:

<https://financialmodelingprep.com/stable/mergers-acquisitions-search?name\=Apple>

Parameters:

Parameter Type Example
name\* string Apple

(\*) Required

#### Response

`[ { "symbol": "PEGY", "companyName": "Pineapple Energy Inc.", "cik": "0000022701", "targetedCompanyName": "Communications Systems, Inc.", "targetedCik": "0000022701", "targetedSymbol": "JCS", "transactionDate": "2021-11-12", "acceptedDate": "2021-11-12 09:54:22", "link": "https://www.sec.gov/Archives/edgar/data/22701/000089710121000932/a211292_s-4.htm" } ]`

[Company Executives API](/developer/docs/stable/company-executives)

![Globe Flag](https://intelligence.financialmodelingprep.com/images/icons/globe_flag.png)

Retrieve detailed information on company executives with the FMP Company Executives API. This API provides essential data about key executives, including their name, title, compensation, and other demographic details such as gender and year of birth.

Endpoint:

<https://financialmodelingprep.com/stable/key-executives?symbol\=AAPL>

Parameters:

Parameter Type Example
symbol\* string AAPL
active string true

(\*) Required

#### Response

`[ { "title": "Vice President of Worldwide Sales", "name": "Mr. Michael Fenger", "pay": null, "currencyPay": "USD", "gender": "male", "yearBorn": null, "active": null } ]`

[Executive Compensation API](/developer/docs/stable/executive-compensation)

![USA Flag](https://intelligence.financialmodelingprep.com/images/icons/usa_flag.png)

Retrieve comprehensive compensation data for company executives with the FMP Executive Compensation API. This API provides detailed information on salaries, stock awards, total compensation, and other relevant financial data, including filing details and links to official documents.

Endpoint:

<https://financialmodelingprep.com/stable/governance-executive-compensation?symbol\=AAPL>

Parameters:

Parameter Type Example
symbol\* string AAPL

(\*) Required

#### Response

`[ { "cik": "0000320193", "symbol": "AAPL", "companyName": "Apple Inc.", "filingDate": "2025-01-10", "acceptedDate": "2025-01-10 16:31:18", "nameAndPosition": "Kate Adams Senior Vice President, General Counsel and Secretary", "year": 2023, "salary": 1000000, "bonus": 0, "stockAward": 22323641, "optionAward": 0, "incentivePlanCompensation": 3571150, "allOtherCompensation": 46914, "total": 26941705, "link": "https://www.sec.gov/Archives/edgar/data/320193/000130817925000008/0001308179-25-000008-index.htm" } ]`

[Executive Compensation Benchmark API](/developer/docs/stable/executive-compensation-benchmark)

![USA Flag](https://intelligence.financialmodelingprep.com/images/icons/usa_flag.png)

Gain access to average executive compensation data across various industries with the FMP Executive Compensation Benchmark API. This API provides essential insights for comparing executive pay by industry, helping you understand compensation trends and benchmarks.

Endpoint:

<https://financialmodelingprep.com/stable/executive-compensation-benchmark>

Parameters:

Parameter Type Example
year string 2024

(\*) Required

#### Response

`[ { "industryTitle": "ABRASIVE, ASBESTOS & MISC NONMETALLIC MINERAL PRODS", "year": 2023, "averageCompensation": 694313.1666666666 } ]`

Commitment Of Traders
---------------------

[COT Report API](/developer/docs/stable/cot-report)

Access comprehensive Commitment of Traders (COT) reports with the FMP COT Report API. This API provides detailed information about long and short positions across various sectors, helping you assess market sentiment and track positions in commodities, indices, and financial instruments.

Endpoint:

<https://financialmodelingprep.com/stable/commitment-of-traders-report>

Parameters:

Parameter Type Example
symbol string AAPL
from date 2024-01-01
to date 2024-03-01

(\*) Required

#### Response

`[ { "symbol": "KC", "date": "2024-02-27 00:00:00", "name": "Coffee (KC)", "sector": "SOFTS", "marketAndExchangeNames": "COFFEE C - ICE FUTURES U.S.", "cftcContractMarketCode": "083731", "cftcMarketCode": "ICUS", "cftcRegionCode": "1", "cftcCommodityCode": "83", "openInterestAll": 209453, "noncommPositionsLongAll": 75330, "noncommPositionsShortAll": 23630, "noncommPositionsSpreadAll": 47072, "commPositionsLongAll": 79690, "commPositionsShortAll": 132114, "totReptPositionsLongAll": 202092, "totReptPositionsShortAll": 202816, "nonreptPositionsLongAll": 7361, "nonreptPositionsShortAll": 6637, "openInterestOld": 179986, "noncommPositionsLongOld": 75483, "noncommPositionsShortOld": 35395, "noncommPositionsSpreadOld": 27067, "commPositionsLongOld": 70693, "commPositionsShortOld": 111666, "totReptPositionsLongOld": 173243, "totReptPositionsShortOld": 174128, "nonreptPositionsLongOld": 6743, "nonreptPositionsShortOld": 5858, "openInterestOther": 29467, "noncommPositionsLongOther": 18754, "noncommPositionsShortOther": 7142, "noncommPositionsSpreadOther": 1098, "commPositionsLongOther": 8997, "commPositionsShortOther": 20448, "totReptPositionsLongOther": 28849, "totReptPositionsShortOther": 28688, "nonreptPositionsLongOther": 618, "nonreptPositionsShortOther": 779, "changeInOpenInterestAll": 2957, "changeInNoncommLongAll": -3545, "changeInNoncommShortAll": 618, "changeInNoncommSpeadAll": 1575, "changeInCommLongAll": 4978, "changeInCommShortAll": 802, "changeInTotReptLongAll": 3008, "changeInTotReptShortAll": 2995, "changeInNonreptLongAll": -51, "changeInNonreptShortAll": -38, "pctOfOpenInterestAll": 100, "pctOfOiNoncommLongAll": 36, "pctOfOiNoncommShortAll": 11.3, "pctOfOiNoncommSpreadAll": 22.5, "pctOfOiCommLongAll": 38, "pctOfOiCommShortAll": 63.1, "pctOfOiTotReptLongAll": 96.5, "pctOfOiTotReptShortAll": 96.8, "pctOfOiNonreptLongAll": 3.5, "pctOfOiNonreptShortAll": 3.2, "pctOfOpenInterestOl": 100, "pctOfOiNoncommLongOl": 41.9, "pctOfOiNoncommShortOl": 19.7, "pctOfOiNoncommSpreadOl": 15, "pctOfOiCommLongOl": 39.3, "pctOfOiCommShortOl": 62, "pctOfOiTotReptLongOl": 96.3, "pctOfOiTotReptShortOl": 96.7, "pctOfOiNonreptLongOl": 3.7, "pctOfOiNonreptShortOl": 3.3, "pctOfOpenInterestOther": 100, "pctOfOiNoncommLongOther": 63.6, "pctOfOiNoncommShortOther": 24.2, "pctOfOiNoncommSpreadOther": 3.7, "pctOfOiCommLongOther": 30.5, "pctOfOiCommShortOther": 69.4, "pctOfOiTotReptLongOther": 97.9, "pctOfOiTotReptShortOther": 97.4, "pctOfOiNonreptLongOther": 2.1, "pctOfOiNonreptShortOther": 2.6, "tradersTotAll": 357, "tradersNoncommLongAll": 132, "tradersNoncommShortAll": 77, "tradersNoncommSpreadAll": 94, "tradersCommLongAll": 106, "tradersCommShortAll": 119, "tradersTotReptLongAll": 286, "tradersTotReptShortAll": 250, "tradersTotOl": 351, "tradersNoncommLongOl": 136, "tradersNoncommShortOl": 72, "tradersNoncommSpeadOl": 88, "tradersCommLongOl": 94, "tradersCommShortOl": 114, "tradersTotReptLongOl": 269, "tradersTotReptShortOl": 239, "tradersTotOther": 164, "tradersNoncommLongOther": 31, "tradersNoncommShortOther": 34, "tradersNoncommSpreadOther": 16, "tradersCommLongOther": 59, "tradersCommShortOther": 68, "tradersTotReptLongOther": 102, "tradersTotReptShortOther": 106, "concGrossLe4TdrLongAll": 16, "concGrossLe4TdrShortAll": 23.7, "concGrossLe8TdrLongAll": 25.8, "concGrossLe8TdrShortAll": 38.9, "concNetLe4TdrLongAll": 9.8, "concNetLe4TdrShortAll": 16.2, "concNetLe8TdrLongAll": 17.7, "concNetLe8TdrShortAll": 25.4, "concGrossLe4TdrLongOl": 13.6, "concGrossLe4TdrShortOl": 24.7, "concGrossLe8TdrLongOl": 23.2, "concGrossLe8TdrShortOl": 40.3, "concNetLe4TdrLongOl": 11.3, "concNetLe4TdrShortOl": 18.2, "concNetLe8TdrLongOl": 20.3, "concNetLe8TdrShortOl": 31.9, "concGrossLe4TdrLongOther": 68.2, "concGrossLe4TdrShortOther": 29.1, "concGrossLe8TdrLongOther": 77.8, "concGrossLe8TdrShortOther": 47.3, "concNetLe4TdrLongOther": 64.7, "concNetLe4TdrShortOther": 26.7, "concNetLe8TdrLongOther": 73.9, "concNetLe8TdrShortOther": 44.2, "contractUnits": "(CONTRACTS OF 37,500 POUNDS)" } ]`

[COT Analysis By Dates API](/developer/docs/stable/cot-report-analysis)

Gain in-depth insights into market sentiment with the FMP COT Report Analysis API. Analyze the Commitment of Traders (COT) reports for a specific date range to evaluate market dynamics, sentiment, and potential reversals across various sectors.

Endpoint:

<https://financialmodelingprep.com/stable/commitment-of-traders-analysis>

Parameters:

Parameter Type Example
symbol string AAPL
from date 2024-01-01
to date 2024-03-01

(\*) Required | Max 90-day date range

#### Response

`[ { "symbol": "B6", "date": "2024-02-27 00:00:00", "name": "British Pound (B6)", "sector": "CURRENCIES", "exchange": "BRITISH POUND - CHICAGO MERCANTILE EXCHANGE", "currentLongMarketSituation": 66.85, "currentShortMarketSituation": 33.15, "marketSituation": "Bullish", "previousLongMarketSituation": 67.97, "previousShortMarketSituation": 32.03, "previousMarketSituation": "Bullish", "netPostion": 46358, "previousNetPosition": 46312, "changeInNetPosition": 0.1, "marketSentiment": "Increasing Bullish", "reversalTrend": false } ]`

[COT Report List API](/developer/docs/stable/cot-report-list)

Access a comprehensive list of available Commitment of Traders (COT) reports by commodity or futures contract using the FMP COT Report List API. This API provides an overview of different market segments, allowing users to retrieve and explore COT reports for a wide variety of commodities and financial instruments.

Endpoint:

<https://financialmodelingprep.com/stable/commitment-of-traders-list>

#### Response

`[ { "symbol": "NG", "name": "Natural Gas (NG)" } ]`

Discounted Cash Flow
--------------------

[DCF Valuation API](/developer/docs/stable/dcf-advanced)

![Globe Flag](https://intelligence.financialmodelingprep.com/images/icons/globe_flag.png)

Estimate the intrinsic value of a company with the FMP Discounted Cash Flow Valuation API. Calculate the DCF valuation based on expected future cash flows and discount rates.

Endpoint:

<https://financialmodelingprep.com/stable/discounted-cash-flow?symbol\=AAPL>

Parameters:

Parameter Type Example
symbol\* string AAPL

(\*) Required

#### Response

`[ { "symbol": "AAPL", "date": "2025-02-04", "dcf": 147.2669883190846, "Stock Price": 231.795 } ]`

[Levered DCF API](/developer/docs/stable/dcf-levered)

![Globe Flag](https://intelligence.financialmodelingprep.com/images/icons/globe_flag.png)

Analyze a company’s value with the FMP Levered Discounted Cash Flow (DCF) API, which incorporates the impact of debt. This API provides post-debt company valuation, offering investors a more accurate measure of a company's true worth by accounting for its debt obligations.

Endpoint:

<https://financialmodelingprep.com/stable/levered-discounted-cash-flow?symbol\=AAPL>

Parameters:

Parameter Type Example
symbol\* string AAPL

(\*) Required

#### Response

`[ { "symbol": "AAPL", "date": "2025-02-04", "dcf": 147.2669883190846, "Stock Price": 231.795 } ]`

[Custom DCF Advanced API](/developer/docs/stable/custom-dcf-advanced)

![Globe Flag](https://intelligence.financialmodelingprep.com/images/icons/globe_flag.png)

Run a tailored Discounted Cash Flow (DCF) analysis using the FMP Custom DCF Advanced API. With detailed inputs, this API allows users to fine-tune their assumptions and variables, offering a more personalized and precise valuation for a company.

Endpoint:

<https://financialmodelingprep.com/stable/custom-discounted-cash-flow?symbol\=AAPL>

Parameters:

Parameter Type Example
symbol\* string AAPL
revenueGrowthPct number 0.1094119804597946
ebitdaPct number 0.31273548388
depreciationAndAmortizationPct number 0.0345531631720999
cashAndShortTermInvestmentsPct number 0.2344222126801843
receivablesPct number 0.1533770531229388
inventoriesPct number 0.0155245674227653
payablePct number 0.1614868903169657
ebitPct number 0.2781823207138459
capitalExpenditurePct number 0.0306025847141713
operatingCashFlowPct number 0.2886333485760204
sellingGeneralAndAdministrativeExpensesPct number 0.0662854095187211
taxRate number 0.14919579658453103
longTermGrowthRate number 4
costOfDebt number 3.64
costOfEquity number 9.51168
marketRiskPremium number 4.72
beta number 1.244
riskFreeRate number 3.64

(\*) Required

#### Response

`[ { "year": "2029", "symbol": "AAPL", "revenue": 657173266965, "revenuePercentage": 10.94, "ebitda": 205521399637, "ebitdaPercentage": 31.27, "ebit": 182813984515, "ebitPercentage": 27.82, "depreciation": 22707415125, "depreciationPercentage": 3.46, "totalCash": 154056011356, "totalCashPercentage": 23.44, "receivables": 100795299078, "receivablesPercentage": 15.34, "inventories": 10202330691, "inventoriesPercentage": 1.55, "payable": 106124867281, "payablePercentage": 16.15, "capitalExpenditure": 20111200574, "capitalExpenditurePercentage": 3.06, "price": 232.8, "beta": 1.244, "dilutedSharesOutstanding": 15408095000, "costofDebt": 3.64, "taxRate": 24.09, "afterTaxCostOfDebt": 2.76, "riskFreeRate": 3.64, "marketRiskPremium": 4.72, "costOfEquity": 9.51, "totalDebt": 106629000000, "totalEquity": 3587004516000, "totalCapital": 3693633516000, "debtWeighting": 2.89, "equityWeighting": 97.11, "wacc": 9.33, "taxRateCash": 14919580, "ebiat": 155538906468, "ufcf": 197876962552, "sumPvUfcf": 616840860880, "longTermGrowthRate": 4, "terminalValue": 3863553224578, "presentTerminalValue": 2473772391290, "enterpriseValue": 3090613252170, "netDebt": 76686000000, "equityValue": 3013927252170, "equityValuePerShare": 195.61, "freeCashFlowT1": 205792041054 } ]`

[Custom DCF Levered API](/developer/docs/stable/custom-dcf-levered)

![Globe Flag](https://intelligence.financialmodelingprep.com/images/icons/globe_flag.png)

Run a tailored Discounted Cash Flow (DCF) analysis using the FMP Custom DCF Advanced API. With detailed inputs, this API allows users to fine-tune their assumptions and variables, offering a more personalized and precise valuation for a company.

Endpoint:

<https://financialmodelingprep.com/stable/custom-levered-discounted-cash-flow?symbol\=AAPL>

Parameters:

Parameter Type Example
symbol\* string AAPL
revenueGrowthPct number 0.1094119804597946
ebitdaPct number 0.31273548388
depreciationAndAmortizationPct number 0.0345531631720999
cashAndShortTermInvestmentsPct number 0.2344222126801843
receivablesPct number 0.1533770531229388
inventoriesPct number 0.0155245674227653
payablePct number 0.1614868903169657
ebitPct number 0.2781823207138459
capitalExpenditurePct number 0.0306025847141713
operatingCashFlowPct number 0.2886333485760204
sellingGeneralAndAdministrativeExpensesPct number 0.0662854095187211
taxRate number 0.14919579658453103
longTermGrowthRate number 4
costOfDebt number 3.64
costOfEquity number 9.51168
marketRiskPremium number 4.72
beta number 1.244
riskFreeRate number 3.64

(\*) Required

#### Response

`[ { "year": "2029", "symbol": "AAPL", "revenue": 657173266965, "revenuePercentage": 10.94, "capitalExpenditure": 20111200574, "capitalExpenditurePercentage": 3.06, "price": 232.8, "beta": 1.244, "dilutedSharesOutstanding": 15408095000, "costofDebt": 3.64, "taxRate": 24.09, "afterTaxCostOfDebt": 2.76, "riskFreeRate": 3.64, "marketRiskPremium": 4.72, "costOfEquity": 9.51, "totalDebt": 106629000000, "totalEquity": 3587004516000, "totalCapital": 3693633516000, "debtWeighting": 2.89, "equityWeighting": 97.11, "wacc": 9.33, "operatingCashFlow": 189682120638, "pvLfcf": 134327365439, "sumPvLfcf": 652368547936, "longTermGrowthRate": 4, "freeCashFlow": 209793321212, "terminalValue": 4096220460472, "presentTerminalValue": 2622745564702, "enterpriseValue": 3275114112638, "netDebt": 76686000000, "equityValue": 3198428112638, "equityValuePerShare": 207.58, "freeCashFlowT1": 218185054060, "operatingCashFlowPercentage": 28.86 } ]`

Economics
---------

[Treasury Rates API](/developer/docs/stable/treasury-rates)

Access real-time and historical Treasury rates for all maturities with the FMP Treasury Rates API. Track key benchmarks for interest rates across the economy.

Endpoint:

<https://financialmodelingprep.com/stable/treasury-rates>

Parameters:

Parameter Type Example
from date 2025-01-10
to date 2025-04-10

(\*) Required | Max 90-day date range

#### Response

`[ { "date": "2024-02-29", "month1": 5.53, "month2": 5.5, "month3": 5.45, "month6": 5.3, "year1": 5.01, "year2": 4.64, "year3": 4.43, "year5": 4.26, "year7": 4.28, "year10": 4.25, "year20": 4.51, "year30": 4.38 } ]`

[Economics Indicators API](/developer/docs/stable/economics-indicators)

Access real-time and historical economic data for key indicators like GDP, unemployment, and inflation with the FMP Economic Indicators API. Use this data to measure economic performance and identify growth trends.

Endpoint:

<https://financialmodelingprep.com/stable/economic-indicators?name\=GDP>

Parameters:

Parameter Type Example
name\* string GDP,realGDP,nominalPotentialGDP,realGDPPerCapita,federalFunds,CPI,inflationRate,inflation,retailSales,consumerSentiment,durableGoods,unemploymentRate,totalNonfarmPayroll,initialClaims,industrialProductionTotalIndex,newPrivatelyOwnedHousingUnitsStartedTotalUnits,totalVehicleSales,retailMoneyFunds,smoothedUSRecessionProbabilities,3MonthOr90DayRatesAndYieldsCertificatesOfDeposit,commercialBankInterestRateOnCreditCardPlansAllAccounts,30YearFixedRateMortgageAverage,15YearFixedRateMortgageAverage
from date 2025-01-10
to date 2025-04-10

(\*) Required | Max 90-day date range

#### Response

`[ { "name": "GDP", "date": "2024-01-01", "value": 28624.069 } ]`

[Economic Data Releases Calendar API](/developer/docs/stable/economics-calendar)

Stay informed with the FMP Economic Data Releases Calendar API. Access a comprehensive calendar of upcoming economic data releases to prepare for market impacts and make informed investment decisions.

Endpoint:

<https://financialmodelingprep.com/stable/economic-calendar>

Parameters:

Parameter Type Example
from date 2025-01-10
to date 2025-04-10

(\*) Required | Max 90-day date range

#### Response

`[ { "date": "2024-03-01 03:35:00", "country": "JP", "event": "3-Month Bill Auction", "currency": "JPY", "previous": -0.112, "estimate": null, "actual": -0.096, "change": 0.016, "impact": "Low", "changePercentage": 14.286 } ]`

[Market Risk Premium API](/developer/docs/stable/market-risk-premium)

Access the market risk premium for specific dates with the FMP Market Risk Premium API. Use this key financial metric to assess the additional return expected from investing in the stock market over a risk-free investment.

Endpoint:

<https://financialmodelingprep.com/stable/market-risk-premium>

#### Response

`[ { "country": "Zimbabwe", "continent": "Africa", "countryRiskPremium": 13.17, "totalEquityRiskPremium": 17.77 } ]`

ESG
---

[ESG Investment Search API](/developer/docs/stable/esg-search)

![USA Flag](https://intelligence.financialmodelingprep.com/images/icons/usa_flag.png)

Align your investments with your values using the FMP ESG Investment Search API. Discover companies and funds based on Environmental, Social, and Governance (ESG) scores, performance, controversies, and business involvement criteria.

Endpoint:

<https://financialmodelingprep.com/stable/esg-disclosures?symbol\=AAPL>

Parameters:

Parameter Type Example
symbol\* string AAPL

(\*) Required

#### Response

`[ { "date": "2024-12-28", "acceptedDate": "2025-01-30", "symbol": "AAPL", "cik": "0000320193", "companyName": "Apple Inc.", "formType": "8-K", "environmentalScore": 52.52, "socialScore": 45.18, "governanceScore": 60.74, "ESGScore": 52.81, "url": "https://www.sec.gov/Archives/edgar/data/320193/000032019325000007/0000320193-25-000007-index.htm" } ]`

[ESG Ratings API](/developer/docs/stable/esg-ratings)

![USA Flag](https://intelligence.financialmodelingprep.com/images/icons/usa_flag.png)

Access comprehensive ESG ratings for companies and funds with the FMP ESG Ratings API. Make informed investment decisions based on environmental, social, and governance (ESG) performance data.

Endpoint:

<https://financialmodelingprep.com/stable/esg-ratings?symbol\=AAPL>

Parameters:

Parameter Type Example
symbol\* string AAPL

(\*) Required

#### Response

`[ { "symbol": "AAPL", "cik": "0000320193", "companyName": "Apple Inc.", "industry": "CONSUMER ELECTRONICS", "fiscalYear": 2024, "ESGRiskRating": "B", "industryRank": "4 out of 5" } ]`

[ESG Benchmark Comparison API](/developer/docs/stable/esg-benchmark)

![USA Flag](https://intelligence.financialmodelingprep.com/images/icons/usa_flag.png)

Evaluate the ESG performance of companies and funds with the FMP ESG Benchmark Comparison API. Compare ESG leaders and laggards within industries to make informed and responsible investment decisions.

Endpoint:

<https://financialmodelingprep.com/stable/esg-benchmark>

Parameters:

Parameter Type Example
year string 2023

(\*) Required

#### Response

`[ { "fiscalYear": 2023, "sector": "APPAREL RETAIL", "environmentalScore": 61.36, "socialScore": 67.44, "governanceScore": 68.1, "ESGScore": 65.63 } ]`

Etf And Mutual Funds
--------------------

[ETF & Fund Holdings API](/developer/docs/stable/holdings)

![Globe Flag](https://intelligence.financialmodelingprep.com/images/icons/globe_flag.png)

Get a detailed breakdown of the assets held within ETFs and mutual funds using the FMP ETF & Fund Holdings API. Access real-time data on the specific securities and their weights in the portfolio, providing insights into asset composition and fund strategies.

Endpoint:

<https://financialmodelingprep.com/stable/etf/holdings?symbol\=SPY>

Parameters:

Parameter Type Example
symbol\* string SPY

(\*) Required

#### Response

`[ { "symbol": "SPY", "asset": "AAPL", "name": "APPLE INC", "isin": "US0378331005", "securityCusip": "037833100", "sharesNumber": 188106081, "weightPercentage": 7.137, "marketValue": 44744793487.47, "updatedAt": "2025-01-16 05:01:09", "updated": "2025-02-04 19:02:31" } ]`

[ETF & Mutual Fund Information API](/developer/docs/stable/information)

![Globe Flag](https://intelligence.financialmodelingprep.com/images/icons/globe_flag.png)

Access comprehensive data on ETFs and mutual funds with the FMP ETF & Mutual Fund Information API. Retrieve essential details such as ticker symbol, fund name, expense ratio, assets under management, and more.

Endpoint:

<https://financialmodelingprep.com/stable/etf/info?symbol\=SPY>

Parameters:

Parameter Type Example
symbol\* string SPY

(\*) Required

#### Response

`[ { "symbol": "SPY", "name": "SPDR S&P 500 ETF Trust", "description": "The Trust seeks to achieve its investment objective by holding a portfolio of the common stocks that are included in the index (the “Portfolio”), with the weight of each stock in the Portfolio substantially corresponding to the weight of such stock in the index.", "isin": "US78462F1030", "assetClass": "Equity", "securityCusip": "78462F103", "domicile": "US", "website": "https://www.ssga.com/us/en/institutional/etfs/spdr-sp-500-etf-trust-spy", "etfCompany": "SPDR", "expenseRatio": 0.0945, "assetsUnderManagement": 633120180000, "avgVolume": 46396400, "inceptionDate": "1993-01-22", "nav": 603.64, "navCurrency": "USD", "holdingsCount": 503, "updatedAt": "2024-12-03T20:32:48.873Z", "sectorsList": [ { "industry": "Basic Materials", "exposure": 1.97 }, { "industry": "Communication Services", "exposure": 8.87 }, { "industry": "Consumer Cyclical", "exposure": 9.84 } ] } ]`

[ETF & Fund Country Allocation API](/developer/docs/stable/country-weighting)

![Globe Flag](https://intelligence.financialmodelingprep.com/images/icons/globe_flag.png)

Gain insight into how ETFs and mutual funds distribute assets across different countries with the FMP ETF & Fund Country Allocation API. This tool provides detailed information on the percentage of assets allocated to various regions, helping you make informed investment decisions.

Endpoint:

<https://financialmodelingprep.com/stable/etf/country-weightings?symbol\=SPY>

Parameters:

Parameter Type Example
symbol\* string SPY

(\*) Required

#### Response

`[ { "country": "United States", "weightPercentage": "97.29%" } ]`

[ETF Asset Exposure API](/developer/docs/stable/etf-asset-exposure)

![Globe Flag](https://intelligence.financialmodelingprep.com/images/icons/globe_flag.png)

Discover which ETFs hold specific stocks with the FMP ETF Asset Exposure API. Access detailed information on market value, share numbers, and weight percentages for assets within ETFs.

Endpoint:

<https://financialmodelingprep.com/stable/etf/asset-exposure?symbol\=AAPL>

Parameters:

Parameter Type Example
symbol\* string AAPL

(\*) Required

#### Response

`[ { "symbol": "ZECP", "asset": "AAPL", "sharesNumber": 5482, "weightPercentage": 5.86, "marketValue": 0 } ]`

[ETF Sector Weighting API](/developer/docs/stable/sector-weighting)

![Globe Flag](https://intelligence.financialmodelingprep.com/images/icons/globe_flag.png)

The FMP ETF Sector Weighting API provides a breakdown of the percentage of an ETF's assets that are invested in each sector. For example, an investor may want to invest in an ETF that has a high exposure to the technology sector if they believe that the technology sector is poised for growth.

Endpoint:

<https://financialmodelingprep.com/stable/etf/sector-weightings?symbol\=SPY>

Parameters:

Parameter Type Example
symbol\* string SPY

(\*) Required

#### Response

`[ { "symbol": "SPY", "sector": "Basic Materials", "weightPercentage": 1.97 } ]`

[Mutual Fund & ETF Disclosure API](/developer/docs/stable/latest-disclosures)

![USA Flag](https://intelligence.financialmodelingprep.com/images/icons/usa_flag.png)

Access the latest disclosures from mutual funds and ETFs with the FMP Mutual Fund & ETF Disclosure API. This API provides updates on filings, changes in holdings, and other critical disclosure data for mutual funds and ETFs.

Endpoint:

<https://financialmodelingprep.com/stable/funds/disclosure-holders-latest?symbol\=AAPL>

Parameters:

Parameter Type Example
symbol\* string AAPL

(\*) Required

#### Response

`[ { "cik": "0000106444", "holder": "VANGUARD FIXED INCOME SECURITIES FUNDS", "shares": 67030000, "dateReported": "2024-07-31", "change": 0, "weightPercent": 0.03840197 } ]`

[Mutual Fund Disclosures API](/developer/docs/stable/mutual-fund-disclosures)

![USA Flag](https://intelligence.financialmodelingprep.com/images/icons/usa_flag.png)

Access comprehensive disclosure data for mutual funds with the FMP Mutual Fund Disclosures API. Analyze recent filings, balance sheets, and financial reports to gain insights into mutual fund portfolios.

Endpoint:

<https://financialmodelingprep.com/stable/funds/disclosure?symbol\=VWO&year\=2023&quarter\=4>

Parameters:

Parameter Type Example
symbol\* string VWO
year\* string 2023
quarter\* string 4
cik string 0000857489

(\*) Required

#### Response

`[ { "cik": "0000857489", "date": "2023-10-31", "acceptedDate": "2023-12-28 09:26:13", "symbol": "000089.SZ", "name": "Shenzhen Airport Co Ltd", "lei": "3003009W045RIKRBZI44", "title": "SHENZ AIRPORT-A", "cusip": "N/A", "isin": "CNE000000VK1", "balance": 2438784, "units": "NS", "cur_cd": "CNY", "valUsd": 2255873.6, "pctVal": 0.0023838966190458215, "payoffProfile": "Long", "assetCat": "EC", "issuerCat": "CORP", "invCountry": "CN", "isRestrictedSec": "N", "fairValLevel": "2", "isCashCollateral": "N", "isNonCashCollateral": "N", "isLoanByFund": "N" } ]`

[Mutual Fund & ETF Disclosure Name Search API](/developer/docs/stable/disclosures-name-search)

![USA Flag](https://intelligence.financialmodelingprep.com/images/icons/usa_flag.png)

Easily search for mutual fund and ETF disclosures by name using the Mutual Fund & ETF Disclosure Name Search API. This API allows you to find specific reports and filings based on the fund or ETF name, providing essential details like CIK number, entity information, and reporting file number.

Endpoint:

<https://financialmodelingprep.com/stable/funds/disclosure-holders-search?name\=Federated%20HermesGovernment%20Income%20Securities,%20Inc.>

Parameters:

Parameter Type Example
name\* string Federated Hermes Government Income Securities, Inc.

(\*) Required

#### Response

`[ { "symbol": "FGOAX", "cik": "0000355691", "classId": "C000024574", "seriesId": "S000009042", "entityName": "Federated Hermes Government Income Securities, Inc.", "entityOrgType": "30", "seriesName": "Federated Hermes Government Income Securities, Inc.", "className": "Class A Shares", "reportingFileNumber": "811-03266", "address": "4000 ERICSSON DRIVE", "city": "WARRENDALE", "zipCode": "15086-7561", "state": "PA" } ]`

[Fund & ETF Disclosures by Date API](/developer/docs/stable/disclosures-dates)

![USA Flag](https://intelligence.financialmodelingprep.com/images/icons/usa_flag.png)

Retrieve detailed disclosures for mutual funds and ETFs based on filing dates with the FMP Fund & ETF Disclosures by Date API. Stay current with the latest filings and track regulatory updates effectively.

Endpoint:

<https://financialmodelingprep.com/stable/funds/disclosure-dates?symbol\=VWO>

Parameters:

Parameter Type Example
symbol\* string VWO
cik string 0000036405

(\*) Required

#### Response

`[ { "date": "2024-10-31", "year": 2024, "quarter": 4 } ]`

Commodity
---------

[Commodities List API](/developer/docs/stable/commodities-list)

Access an extensive list of tracked commodities across various sectors, including energy, metals, and agricultural products. The FMP Commodities List API provides essential data on tradable commodities, giving investors the ability to explore market options in real-time.

Endpoint:

<https://financialmodelingprep.com/stable/commodities-list>

#### Response

`[ { "symbol": "HEUSX", "name": "Lean Hogs Futures", "exchange": null, "tradeMonth": "Dec", "currency": "USX" } ]`

[Commodities Quote API](/developer/docs/stable/commodities-quote)

![USA Flag](https://intelligence.financialmodelingprep.com/images/icons/usa_flag.png)

Access real-time price quotes for all commodities traded worldwide with the FMP Global Commodities Quotes API. Track market movements and identify investment opportunities with comprehensive price data.

Endpoint:

<https://financialmodelingprep.com/stable/quote?symbol\=GCUSD>

Parameters:

Parameter Type Example
symbol\* string GCUSD

(\*) Required

#### Response

`[ { "symbol": "GCUSD", "name": "Gold Futures", "price": 2872.2, "changePercentage": -0.12518, "change": -3.6, "volume": 1989, "dayLow": 2871.2, "dayHigh": 2874.2, "yearHigh": 2874.2, "yearLow": 1984.8, "marketCap": null, "priceAvg50": 2682.898, "priceAvg200": 2531.528, "exchange": "COMMODITY", "open": 2873.7, "previousClose": 2875.8, "timestamp": 1738714802 } ]`

[Commodities Quote Short API](/developer/docs/stable/commodities-quote-short)

![USA Flag](https://intelligence.financialmodelingprep.com/images/icons/usa_flag.png)

Get fast and accurate quotes for commodities with the FMP Commodities Quick Quote API. Instantly access the current price, recent changes, and trading volume for various commodities in real-time.

Endpoint:

<https://financialmodelingprep.com/stable/quote-short?symbol\=GCUSD>

Parameters:

Parameter Type Example
symbol\* string GCUSD

(\*) Required

#### Response

`[ { "symbol": "GCUSD", "price": 2872.2, "change": -3.6, "volume": 1989 } ]`

[All Commodities Quotes API](/developer/docs/stable/all-commodities-quotes)

Access real-time quotes for multiple commodities at once with the FMP Real-Time Batch Commodities Quotes API. Instantly track price changes, volume, and other key metrics for a broad range of commodities.

Endpoint:

<https://financialmodelingprep.com/stable/batch-commodity-quotes>

Parameters:

Parameter Type Example
short boolean true

(\*) Required

#### Response

`[ { "symbol": "DCUSD", "price": 19.89, "change": 0.23, "volume": 442 } ]`

[Light Chart API](/developer/docs/stable/commodities-historical-price-eod-light)

Access historical end-of-day prices for various commodities with the FMP Historical Commodities Price API. Analyze past price movements, trading volume, and trends to support informed decision-making.

Endpoint:

<https://financialmodelingprep.com/stable/historical-price-eod/light?symbol\=GCUSD>

Parameters:

Parameter Type Example
symbol\* string GCUSD
from date 2025-01-10
to date 2025-04-10

(\*) Required

#### Response

`[ { "symbol": "GCUSD", "date": "2025-02-04", "price": 2873.7, "volume": 137844 } ]`

[Full Chart API](/developer/docs/stable/commodities-historical-price-eod-full)

Access full historical end-of-day price data for commodities with the FMP Comprehensive Commodities Price API. This API enables users to analyze long-term price trends, patterns, and market movements in great detail.

Endpoint:

<https://financialmodelingprep.com/stable/historical-price-eod/full?symbol\=GCUSD>

Parameters:

Parameter Type Example
symbol\* string GCUSD
from date 2025-01-10
to date 2025-04-10

(\*) Required

#### Response

`[ { "symbol": "GCUSD", "date": "2025-02-04", "open": 2850.4, "high": 2877.1, "low": 2837.4, "close": 2873.7, "volume": 137844, "change": 23.3, "changePercent": 0.81743, "vwap": 2859.65 } ]`

[1-Minute Interval Commodities Chart API](/developer/docs/stable/commodities-intraday-1-min)

Track real-time, short-term price movements for commodities with the FMP 1-Minute Interval Commodities Chart API. This API provides detailed 1-minute interval data, enabling precise monitoring of intraday market changes.

Endpoint:

<https://financialmodelingprep.com/stable/historical-chart/1min?symbol\=GCUSD>

Parameters:

Parameter Type Example
symbol\* string GCUSD
from date 2024-01-01
to date 2024-03-01

(\*) Required

#### Response

`[ { "date": "2025-02-04 19:19:00", "open": 2872, "low": 2872, "high": 2872.1, "close": 2872.1, "volume": 4 } ]`

[5-Minute Interval Commodities Chart API](/developer/docs/stable/commodities-intraday-5-min)

Monitor short-term price movements with the FMP 5-Minute Interval Commodities Chart API. This API provides detailed 5-minute interval data, enabling users to track near-term price trends for more strategic trading and investment decisions.

Endpoint:

<https://financialmodelingprep.com/stable/historical-chart/5min?symbol\=GCUSD>

Parameters:

Parameter Type Example
symbol\* string GCUSD
from date 2024-01-01
to date 2024-03-01

(\*) Required

#### Response

`[ { "date": "2025-02-04 19:15:00", "open": 2871.8, "low": 2871.7, "high": 2872.3, "close": 2871.8, "volume": 93 } ]`

[1-Hour Interval Commodities Chart API](/developer/docs/stable/commodities-intraday-1-hour)

Monitor hourly price movements and trends with the FMP 1-Hour Interval Commodities Chart API. This API provides hourly data, offering a detailed look at price fluctuations throughout the trading day to support mid-term trading strategies and market analysis.

Endpoint:

<https://financialmodelingprep.com/stable/historical-chart/1hour?symbol\=GCUSD>

Parameters:

Parameter Type Example
symbol\* string GCUSD
from date 2024-01-01
to date 2024-03-01

(\*) Required

#### Response

`[ { "date": "2025-02-04 19:00:00", "open": 2872.1, "low": 2872, "high": 2872.4, "close": 2872.4, "volume": 66 } ]`

Fundraisers
-----------

[Latest Crowdfunding Campaigns API](/developer/docs/stable/latest-crowdfunding)

![USA Flag](https://intelligence.financialmodelingprep.com/images/icons/usa_flag.png)

Discover the most recent crowdfunding campaigns with the FMP Latest Crowdfunding Campaigns API. Stay informed on which companies and projects are actively raising funds, their financial details, and offering terms.

Endpoint:

<https://financialmodelingprep.com/stable/crowdfunding-offerings-latest?page\=0&limit\=100>

Parameters:

Parameter Type Example
page number 0
limit number 100

(\*) Required

#### Response

`[ { "cik": "0002050877", "companyName": "PowerGreen Capital Corp", "date": "01-27-2025", "filingDate": "2025-02-04 00:00:00", "acceptedDate": "2025-02-04 16:17:49", "formType": "C/A", "formSignification": "Offering Statement Amendement", "nameOfIssuer": "PowerGreen Capital Corp", "legalStatusForm": "Limited Liability Company", "jurisdictionOrganization": "PA", "issuerStreet": "1614 PUGHTOWN RD", "issuerCity": "PHOENIXVILLE", "issuerStateOrCountry": "PA", "issuerZipCode": "19460", "issuerWebsite": "www.powergreencapital.com", "intermediaryCompanyName": "Honeycomb Portal LLC", "intermediaryCommissionCik": "0001705726", "intermediaryCommissionFileNumber": "007-00119", "compensationAmount": "Applied at marginal rate based upon amount of total offering: up to $50,000 = 8.0%, $50,001 - $100,000 = 7.0%, $100,001+ = 6.0%. $250 posting fee. 2.85% investment fee capped at $37.25.", "financialInterest": "None", "securityOfferedType": "Other", "securityOfferedOtherDescription": "SAFE (Simple Agreement for Future Equity)", "numberOfSecurityOffered": 124000, "offeringPrice": 1, "offeringAmount": 60000, "overSubscriptionAccepted": "Y", "overSubscriptionAllocationType": "First-come, first-served basis", "maximumOfferingAmount": 124000, "offeringDeadlineDate": "03-13-2025", "currentNumberOfEmployees": 2, "totalAssetMostRecentFiscalYear": 193070, "totalAssetPriorFiscalYear": 0, "cashAndCashEquiValentMostRecentFiscalYear": 5957, "cashAndCashEquiValentPriorFiscalYear": 0, "accountsReceivableMostRecentFiscalYear": 0, "accountsReceivablePriorFiscalYear": 0, "shortTermDebtMostRecentFiscalYear": 0, "shortTermDebtPriorFiscalYear": 0, "longTermDebtMostRecentFiscalYear": 0, "longTermDebtPriorFiscalYear": 0, "revenueMostRecentFiscalYear": 2112, "revenuePriorFiscalYear": 0, "costGoodsSoldMostRecentFiscalYear": 0, "costGoodsSoldPriorFiscalYear": 0, "taxesPaidMostRecentFiscalYear": 0, "taxesPaidPriorFiscalYear": 0, "netIncomeMostRecentFiscalYear": -192010, "netIncomePriorFiscalYear": 0 } ]`

[Crowdfunding Campaign Search API](/developer/docs/stable/crowdfunding-search)

![USA Flag](https://intelligence.financialmodelingprep.com/images/icons/usa_flag.png)

Search for crowdfunding campaigns by company name, campaign name, or platform with the FMP Crowdfunding Campaign Search API. Access detailed information to track and analyze crowdfunding activities.

Endpoint:

<https://financialmodelingprep.com/stable/crowdfunding-offerings-search?name\=enotap>

Parameters:

Parameter Type Example
name\* string enotap

(\*) Required

#### Response

`[ { "cik": "0001912939", "name": "Enotap LLC", "date": null } ]`

[Crowdfunding By CIK API](/developer/docs/stable/crowdfunding-by-cik)

![USA Flag](https://intelligence.financialmodelingprep.com/images/icons/usa_flag.png)

Access detailed information on all crowdfunding campaigns launched by a specific company with the FMP Crowdfunding By CIK API.

Endpoint:

<https://financialmodelingprep.com/stable/crowdfunding-offerings?cik\=0001916078>

Parameters:

Parameter Type Example
cik\* string 0001916078

(\*) Required

#### Response

`[ { "cik": "0001916078", "companyName": "OYO Fitness, Inc", "date": "12-31-2021", "filingDate": "2022-07-21 00:00:00", "acceptedDate": "2022-07-21 17:28:54", "formType": "C-U", "formSignification": "Progress Update", "nameOfIssuer": "OYO Fitness, Inc", "legalStatusForm": "Corporation", "jurisdictionOrganization": "DE", "issuerStreet": "374 N. 750TH RD", "issuerCity": "OVERBROOK", "issuerStateOrCountry": "KS", "issuerZipCode": "66524", "issuerWebsite": "https://www.oyofitness.com/", "intermediaryCompanyName": "StartEngine Capital, LLC", "intermediaryCommissionCik": "0001665160", "intermediaryCommissionFileNumber": "007-00007", "compensationAmount": "7 - 13 percent", "financialInterest": "Two percent (2%) of securities of the total amount of investments raised in the offering, along the same terms as investors.", "securityOfferedType": "Other", "securityOfferedOtherDescription": "Non-Voting Common Stock", "numberOfSecurityOffered": 5000, "offeringPrice": 2, "offeringAmount": 10000, "overSubscriptionAccepted": "Y", "overSubscriptionAllocationType": "Other", "maximumOfferingAmount": 1070000, "offeringDeadlineDate": "07-19-2022", "currentNumberOfEmployees": 5, "totalAssetMostRecentFiscalYear": 497717, "totalAssetPriorFiscalYear": 248472, "cashAndCashEquiValentMostRecentFiscalYear": 150142, "cashAndCashEquiValentPriorFiscalYear": 54571, "accountsReceivableMostRecentFiscalYear": 0, "accountsReceivablePriorFiscalYear": 0, "shortTermDebtMostRecentFiscalYear": 3286745, "shortTermDebtPriorFiscalYear": 2214117, "longTermDebtMostRecentFiscalYear": 82243, "longTermDebtPriorFiscalYear": 105850, "revenueMostRecentFiscalYear": 4344154, "revenuePriorFiscalYear": 11078510, "costGoodsSoldMostRecentFiscalYear": 2445024, "costGoodsSoldPriorFiscalYear": 5737776, "taxesPaidMostRecentFiscalYear": 0, "taxesPaidPriorFiscalYear": 0, "netIncomeMostRecentFiscalYear": -964551, "netIncomePriorFiscalYear": -10860 } ]`

[Equity Offering Updates API](/developer/docs/stable/latest-equity-offering)

![USA Flag](https://intelligence.financialmodelingprep.com/images/icons/usa_flag.png)

Stay informed about the latest equity offerings with the FMP Equity Offering Updates API. Track new shares being issued by companies and get insights into exempt offerings and amendments.

Endpoint:

<https://financialmodelingprep.com/stable/fundraising-latest?page\=0&limit\=10>

Parameters:

Parameter Type Example
page number 0
limit number 10
cik string 0002013736

(\*) Required

#### Response

`[ { "cik": "0002013736", "companyName": "XO Generation Fund LP", "date": "2024-03-01", "filingDate": "2024-08-08 00:00:00", "acceptedDate": "2024-08-08 17:29:48", "formType": "D/A", "formSignification": "Notice of Exempt Offering of Securities Amendement", "entityName": "XO Generation Fund LP", "issuerStreet": "842 S HIGHLAND AVE", "issuerCity": "LOS ANGELES", "issuerStateOrCountry": "CA", "issuerStateOrCountryDescription": "CALIFORNIA", "issuerZipCode": "90036", "issuerPhoneNumber": "201-961-3356", "jurisdictionOfIncorporation": "DELAWARE", "entityType": "Limited Partnership", "incorporatedWithinFiveYears": true, "yearOfIncorporation": "2024", "relatedPersonFirstName": "-", "relatedPersonLastName": "XO Capital LLC", "relatedPersonStreet": "842 S Highland Ave", "relatedPersonCity": "Los Angeles", "relatedPersonStateOrCountry": "CA", "relatedPersonStateOrCountryDescription": "CALIFORNIA", "relatedPersonZipCode": "90036", "relatedPersonRelationship": "Promoter", "industryGroupType": "Pooled Investment Fund", "revenueRange": null, "federalExemptionsExclusions": "06b, 3C, 3C.1", "isAmendment": true, "dateOfFirstSale": "2024-03-01", "durationOfOfferingIsMoreThanYear": true, "securitiesOfferedAreOfEquityType": true, "isBusinessCombinationTransaction": false, "minimumInvestmentAccepted": 100000, "totalOfferingAmount": 0, "totalAmountSold": 5000, "totalAmountRemaining": 0, "hasNonAccreditedInvestors": false, "totalNumberAlreadyInvested": 1, "salesCommissions": 0, "findersFees": 0, "grossProceedsUsed": 0 } ]`

[Equity Offering Search API](/developer/docs/stable/equity-offering-search)

![USA Flag](https://intelligence.financialmodelingprep.com/images/icons/usa_flag.png)

Easily search for equity offerings by company name or stock symbol with the FMP Equity Offering Search API. Access detailed information about recent share issuances to stay informed on company fundraising activities.

Endpoint:

<https://financialmodelingprep.com/stable/fundraising-search?name\=NJOY>

Parameters:

Parameter Type Example
name\* string NJOY

(\*) Required

#### Response

`[ { "cik": "0001547416", "name": "NJOY INC", "date": "2014-02-28 16:00:25" } ]`

[Equity Offering By CIK API](/developer/docs/stable/equity-offering-by-cik)

![USA Flag](https://intelligence.financialmodelingprep.com/images/icons/usa_flag.png)

Access detailed information on equity offerings announced by specific companies with the FMP Company Equity Offerings by CIK API. Track offering activity and identify potential investment opportunities.

Endpoint:

<https://financialmodelingprep.com/stable/fundraising?cik\=0001547416>

Parameters:

Parameter Type Example
cik\* string 0001547416

(\*) Required

#### Response

`[ { "cik": "0001547416", "companyName": "NJOY INC", "date": "2014-02-28", "filingDate": "2014-02-28 00:00:00", "acceptedDate": "2014-02-28 16:00:25", "formType": "D", "formSignification": "Notice of Exempt Offering of Securities", "entityName": "NJOY INC", "issuerStreet": "15211 N. KIERLAND BLVD., SUITE 200", "issuerCity": "SCOTTSDALE", "issuerStateOrCountry": "AZ", "issuerStateOrCountryDescription": "ARIZONA", "issuerZipCode": "85254", "issuerPhoneNumber": "480-397-2300", "jurisdictionOfIncorporation": "DELAWARE", "entityType": "Corporation", "incorporatedWithinFiveYears": null, "yearOfIncorporation": "", "relatedPersonFirstName": "CRAIG", "relatedPersonLastName": "WEISS", "relatedPersonStreet": "c/o NJOY, INC.", "relatedPersonCity": "SCOTTSDALE", "relatedPersonStateOrCountry": "AZ", "relatedPersonStateOrCountryDescription": "ARIZONA", "relatedPersonZipCode": "85254", "relatedPersonRelationship": "Executive Officer, Director", "industryGroupType": "Other", "revenueRange": "Decline to Disclose", "federalExemptionsExclusions": "06b", "isAmendment": false, "dateOfFirstSale": "2014-02-14", "durationOfOfferingIsMoreThanYear": false, "securitiesOfferedAreOfEquityType": true, "isBusinessCombinationTransaction": false, "minimumInvestmentAccepted": 0, "totalOfferingAmount": 71999990, "totalAmountSold": 71999990, "totalAmountRemaining": 0, "hasNonAccreditedInvestors": false, "totalNumberAlreadyInvested": 24, "salesCommissions": 0, "findersFees": 0, "grossProceedsUsed": 0 } ]`

Crypto
------

[Cryptocurrency List API](/developer/docs/stable/cryptocurrency-list)

Access a comprehensive list of all cryptocurrencies traded on exchanges worldwide with the FMP Cryptocurrencies Overview API. Get detailed information on each cryptocurrency to inform your investment strategies.

Endpoint:

<https://financialmodelingprep.com/stable/cryptocurrency-list>

#### Response

`[ { "symbol": "ALIENUSD", "name": "Alien Inu USD", "exchange": "CCC", "icoDate": "2021-11-22", "circulatingSupply": 0, "totalSupply": null } ]`

[Full Cryptocurrency Quote API](/developer/docs/stable/cryptocurrency-quote)

Access real-time quotes for all cryptocurrencies with the FMP Full Cryptocurrency Quote API. Obtain comprehensive price data including current, high, low, and open prices.

Endpoint:

<https://financialmodelingprep.com/stable/quote?symbol\=BTCUSD>

Parameters:

Parameter Type Example
symbol\* string BTCUSD

(\*) Required

#### Response

`[ { "symbol": "BTCUSD", "name": "Bitcoin USD", "price": 97812.29, "changePercentage": -3.60433, "change": -3657.296, "volume": 73145409536, "dayLow": 96330.78, "dayHigh": 101708.66, "yearHigh": 109114.88, "yearLow": 42529.02, "marketCap": 1931426811723, "priceAvg50": 99134.11, "priceAvg200": 78056.95, "exchange": "CRYPTO", "open": 101469.586, "previousClose": 101469.586, "timestamp": 1738713602 } ]`

[Cryptocurrency Quote Short API](/developer/docs/stable/cryptocurrency-quote-short)

Access real-time cryptocurrency quotes with the FMP Cryptocurrency Quick Quote API. Get a concise overview of current crypto prices, changes, and trading volume for a wide range of digital assets.

Endpoint:

<https://financialmodelingprep.com/stable/quote-short?symbol\=BTCUSD>

Parameters:

Parameter Type Example
symbol\* string BTCUSD

(\*) Required

#### Response

`[ { "symbol": "BTCUSD", "price": 97812.29, "change": -3657.296, "volume": 73145409536 } ]`

[All Cryptocurrencies Quotes API](/developer/docs/stable/all-cryptocurrency-quotes)

Access live price data for a wide range of cryptocurrencies with the FMP Real-Time Cryptocurrency Batch Quotes API. Get real-time updates on prices, market changes, and trading volumes for digital assets in a single request.

Endpoint:

<https://financialmodelingprep.com/stable/batch-crypto-quotes>

Parameters:

Parameter Type Example
short boolean true

(\*) Required

#### Response

`[ { "symbol": "00USD", "price": 0.03071157, "change": -0.0026034, "volume": 169600 } ]`

[Historical Cryptocurrency Light Chart API](/developer/docs/stable/cryptocurrency-historical-price-eod-light)

Access historical end-of-day prices for a variety of cryptocurrencies with the Historical Cryptocurrency Price Snapshot API. Track trends in price and trading volume over time to better understand market behavior.

Endpoint:

<https://financialmodelingprep.com/stable/historical-price-eod/light?symbol\=BTCUSD>

Parameters:

Parameter Type Example
symbol\* string BTCUSD
from date 2025-01-10
to date 2025-04-10

(\*) Required

#### Response

`[ { "symbol": "BTCUSD", "date": "2025-02-04", "price": 97347.18, "volume": 70745931776 } ]`

[Historical Cryptocurrency Full Chart API](/developer/docs/stable/cryptocurrency-historical-price-eod-full)

Access comprehensive end-of-day (EOD) price data for cryptocurrencies with the Full Historical Cryptocurrency Data API. Analyze long-term price trends, market movements, and trading volumes to inform strategic decisions.

Endpoint:

<https://financialmodelingprep.com/stable/historical-price-eod/full?symbol\=BTCUSD>

Parameters:

Parameter Type Example
symbol\* string BTCUSD
from date 2025-01-10
to date 2025-04-10

(\*) Required

#### Response

`[ { "symbol": "BTCUSD", "date": "2025-02-04", "open": 101460.15, "high": 101812.23, "low": 97321.18, "close": 97347.18, "volume": 70745931776, "change": -4112.97, "changePercent": -4.05378, "vwap": 99485.185 } ]`

[1-Minute Interval Cryptocurrency Data API](/developer/docs/stable/cryptocurrency-intraday-1-min)

Get real-time, 1-minute interval price data for cryptocurrencies with the 1-Minute Cryptocurrency Intraday Data API. Monitor short-term price fluctuations and trading volume to stay updated on market movements.

Endpoint:

<https://financialmodelingprep.com/stable/historical-chart/1min?symbol\=BTCUSD>

Parameters:

Parameter Type Example
symbol\* string BTCUSD
from date 2024-01-01
to date 2024-03-01

(\*) Required

#### Response

`[ { "date": "2025-02-04 19:28:00", "open": 98137.6, "low": 98098, "high": 98263.08, "close": 98220.44, "volume": 815015.7848495352 } ]`

[5-Minute Interval Cryptocurrency Data API](/developer/docs/stable/cryptocurrency-intraday-5-min)

Analyze short-term price trends with the 5-Minute Interval Cryptocurrency Data API. Access real-time, intraday price data for cryptocurrencies to monitor rapid market movements and optimize trading strategies.

Endpoint:

<https://financialmodelingprep.com/stable/historical-chart/5min?symbol\=BTCUSD>

Parameters:

Parameter Type Example
symbol\* string BTCUSD
from date 2024-01-01
to date 2024-03-01

(\*) Required

#### Response

`[ { "date": "2025-02-04 19:25:00", "open": 97960.14, "low": 97896, "high": 98263.08, "close": 98220.44, "volume": 1699027.774190811 } ]`

[1-Hour Interval Cryptocurrency Data API](/developer/docs/stable/cryptocurrency-intraday-1-hour)

Access detailed 1-hour intraday price data for cryptocurrencies with the 1-Hour Interval Cryptocurrency Data API. Track hourly price movements to gain insights into market trends and make informed trading decisions throughout the day.

Endpoint:

<https://financialmodelingprep.com/stable/historical-chart/1hour?symbol\=BTCUSD>

Parameters:

Parameter Type Example
symbol\* string BTCUSD
from date 2024-01-01
to date 2024-03-01

(\*) Required

#### Response

`[ { "date": "2025-02-04 19:00:00", "open": 97795.06, "low": 97761, "high": 97919.26, "close": 97898.8, "volume": 1829413.547367432 } ]`

Forex
-----

[Forex Currency Pairs API](/developer/docs/stable/forex-list)

Access a comprehensive list of all currency pairs traded on the forex market with the FMP Forex Currency Pairs API. Analyze and track the performance of currency pairs to make informed investment decisions.

Endpoint:

<https://financialmodelingprep.com/stable/forex-list>

#### Response

`[ { "symbol": "ARSMXN", "fromCurrency": "ARS", "toCurrency": "MXN", "fromName": "Argentine Peso", "toName": "Mexican Peso" } ]`

[Forex Quote API](/developer/docs/stable/forex-quote)

![USA Flag](https://intelligence.financialmodelingprep.com/images/icons/usa_flag.png)

Access real-time forex quotes for currency pairs with the Forex Quote API. Retrieve up-to-date information on exchange rates and price changes to help monitor market movements.

Endpoint:

<https://financialmodelingprep.com/stable/quote?symbol\=EURUSD>

Parameters:

Parameter Type Example
symbol\* string EURUSD

(\*) Required

#### Response

`[ { "symbol": "EURUSD", "name": "EUR/USD", "price": 1.03717, "changePercentage": -0.05877932, "change": -0.00061, "volume": 5453, "dayLow": 1.03706, "dayHigh": 1.03835, "yearHigh": 1.12138, "yearLow": 1.01766, "marketCap": null, "priceAvg50": 1.03863, "priceAvg200": 1.07491, "exchange": "FOREX", "open": 1.03778, "previousClose": 1.03778, "timestamp": 1738713601 } ]`

[Forex Short Quote API](/developer/docs/stable/forex-quote-short)

![USA Flag](https://intelligence.financialmodelingprep.com/images/icons/usa_flag.png)

Quickly access concise forex pair quotes with the Forex Quote Snapshot API. Get a fast look at live currency exchange rates, price changes, and volume in real time.

Endpoint:

<https://financialmodelingprep.com/stable/quote-short?symbol\=EURUSD>

Parameters:

Parameter Type Example
symbol\* string EURUSD

(\*) Required

#### Response

`[ { "symbol": "EURUSD", "price": 1.03717, "change": -0.00061, "volume": 5453 } ]`

[Batch Forex Quotes API](/developer/docs/stable/all-forex-quotes)

Easily access real-time quotes for multiple forex pairs simultaneously with the Batch Forex Quotes API. Stay updated on global currency exchange rates and monitor price changes across different markets.

Endpoint:

<https://financialmodelingprep.com/stable/batch-forex-quotes>

Parameters:

Parameter Type Example
short boolean true

(\*) Required

#### Response

`[ { "symbol": "AEDAUD", "price": 0.43575, "change": 0.0009547891, "volume": 344 } ]`

[Historical Forex Light Chart API](/developer/docs/stable/forex-historical-price-eod-light)

Access historical end-of-day forex prices with the Historical Forex Light Chart API. Track long-term price trends across different currency pairs to enhance your trading and analysis strategies.

Endpoint:

<https://financialmodelingprep.com/stable/historical-price-eod/light?symbol\=EURUSD>

Parameters:

Parameter Type Example
symbol\* string EURUSD
from date 2025-01-10
to date 2025-04-10

(\*) Required

#### Response

`[ { "symbol": "EURUSD", "date": "2025-02-04", "price": 1.03791, "volume": 297683 } ]`

[Historical Forex Full Chart API](/developer/docs/stable/forex-historical-price-eod-full)

Access comprehensive historical end-of-day forex price data with the Full Historical Forex Chart API. Gain detailed insights into currency pair movements, including open, high, low, close (OHLC) prices, volume, and percentage changes.

Endpoint:

<https://financialmodelingprep.com/stable/historical-price-eod/full?symbol\=EURUSD>

Parameters:

Parameter Type Example
symbol\* string EURUSD
from date 2025-01-10
to date 2025-04-10

(\*) Required

#### Response

`[ { "symbol": "EURUSD", "date": "2025-02-04", "open": 1.03432, "high": 1.03873, "low": 1.02713, "close": 1.03791, "volume": 297683, "change": 0.00359, "changePercent": 0.34709, "vwap": 1.03452 } ]`

[1-Minute Interval Forex Chart API](/developer/docs/stable/forex-intraday-1-min)

Access real-time 1-minute intraday forex data with the 1-Minute Forex Interval Chart API. Track short-term price movements for precise, up-to-the-minute insights on currency pair fluctuations.

Endpoint:

<https://financialmodelingprep.com/stable/historical-chart/1min?symbol\=EURUSD>

Parameters:

Parameter Type Example
symbol\* string EURUSD
from date 2024-01-01
to date 2024-03-01

(\*) Required

#### Response

`[ { "date": "2025-02-04 19:29:00", "open": 1.03751, "low": 1.03737, "high": 1.0376, "close": 1.0376, "volume": 30 } ]`

[5-Minute Interval Forex Chart API](/developer/docs/stable/forex-intraday-5-min)

Track short-term forex trends with the 5-Minute Forex Interval Chart API. Access detailed 5-minute intraday data to monitor currency pair price movements and market conditions in near real-time.

Endpoint:

<https://financialmodelingprep.com/stable/historical-chart/5min?symbol\=EURUSD>

Parameters:

Parameter Type Example
symbol\* string EURUSD
from date 2024-01-01
to date 2024-03-01

(\*) Required

#### Response

`[ { "date": "2025-02-04 19:25:00", "open": 1.03711, "low": 1.03709, "high": 1.0376, "close": 1.0376, "volume": 113 } ]`

[1-Hour Interval Forex Chart API](/developer/docs/stable/forex-intraday-1-hour)

Track forex price movements over the trading day with the 1-Hour Forex Interval Chart API. This tool provides hourly intraday data for currency pairs, giving a detailed view of trends and market shifts.

Endpoint:

<https://financialmodelingprep.com/stable/historical-chart/1hour?symbol\=EURUSD>

Parameters:

Parameter Type Example
symbol\* string EURUSD
from date 2024-01-01
to date 2024-03-01

(\*) Required

#### Response

`[ { "date": "2025-02-04 19:00:00", "open": 1.03716, "low": 1.03715, "high": 1.03743, "close": 1.03737, "volume": 45 } ]`

Statements
----------

[Income Statement API](/developer/docs/stable/income-statement)

![Globe Flag](https://intelligence.financialmodelingprep.com/images/icons/globe_flag.png)

Access real-time income statement data for public companies, private companies, and ETFs with the FMP Real-Time Income Statements API. Track profitability, compare competitors, and identify business trends with up-to-date financial data.

Endpoint:

<https://financialmodelingprep.com/stable/income-statement?symbol\=AAPL>

Parameters:

Parameter Type Example
symbol\* string AAPL
limit number 5
period string Q1,Q2,Q3,Q4,FY

(\*) Required | Maximum 1000 records per request | Currency is as Reported in Financials

#### Response

`[ { "date": "2024-09-28", "symbol": "AAPL", "reportedCurrency": "USD", "cik": "0000320193", "filingDate": "2024-11-01", "acceptedDate": "2024-11-01 06:01:36", "fiscalYear": "2024", "period": "FY", "revenue": 391035000000, "costOfRevenue": 210352000000, "grossProfit": 180683000000, "researchAndDevelopmentExpenses": 31370000000, "generalAndAdministrativeExpenses": 0, "sellingAndMarketingExpenses": 0, "sellingGeneralAndAdministrativeExpenses": 26097000000, "otherExpenses": 0, "operatingExpenses": 57467000000, "costAndExpenses": 267819000000, "netInterestIncome": 0, "interestIncome": 0, "interestExpense": 0, "depreciationAndAmortization": 11445000000, "ebitda": 134661000000, "ebit": 123216000000, "nonOperatingIncomeExcludingInterest": 0, "operatingIncome": 123216000000, "totalOtherIncomeExpensesNet": 269000000, "incomeBeforeTax": 123485000000, "incomeTaxExpense": 29749000000, "netIncomeFromContinuingOperations": 93736000000, "netIncomeFromDiscontinuedOperations": 0, "otherAdjustmentsToNetIncome": 0, "netIncome": 93736000000, "netIncomeDeductions": 0, "bottomLineNetIncome": 93736000000, "eps": 6.11, "epsDiluted": 6.08, "weightedAverageShsOut": 15343783000, "weightedAverageShsOutDil": 15408095000 } ]`

[Balance Sheet Statement API](/developer/docs/stable/balance-sheet-statement)

![Globe Flag](https://intelligence.financialmodelingprep.com/images/icons/globe_flag.png)

Access detailed balance sheet statements for publicly traded companies with the Balance Sheet Data API. Analyze assets, liabilities, and shareholder equity to gain insights into a company's financial health.

Endpoint:

<https://financialmodelingprep.com/stable/balance-sheet-statement?symbol\=AAPL>

Parameters:

Parameter Type Example
symbol\* string AAPL
limit number 5
period string Q1,Q2,Q3,Q4,FY

(\*) Required | Maximum 1000 records per request | Currency is as Reported in Financials

#### Response

`[ { "date": "2024-09-28", "symbol": "AAPL", "reportedCurrency": "USD", "cik": "0000320193", "filingDate": "2024-11-01", "acceptedDate": "2024-11-01 06:01:36", "fiscalYear": "2024", "period": "FY", "cashAndCashEquivalents": 29943000000, "shortTermInvestments": 35228000000, "cashAndShortTermInvestments": 65171000000, "netReceivables": 66243000000, "accountsReceivables": 33410000000, "otherReceivables": 32833000000, "inventory": 7286000000, "prepaids": 0, "otherCurrentAssets": 14287000000, "totalCurrentAssets": 152987000000, "propertyPlantEquipmentNet": 45680000000, "goodwill": 0, "intangibleAssets": 0, "goodwillAndIntangibleAssets": 0, "longTermInvestments": 91479000000, "taxAssets": 19499000000, "otherNonCurrentAssets": 55335000000, "totalNonCurrentAssets": 211993000000, "otherAssets": 0, "totalAssets": 364980000000, "totalPayables": 95561000000, "accountPayables": 68960000000, "otherPayables": 26601000000, "accruedExpenses": 0, "shortTermDebt": 20879000000, "capitalLeaseObligationsCurrent": 1632000000, "taxPayables": 26601000000, "deferredRevenue": 8249000000, "otherCurrentLiabilities": 50071000000, "totalCurrentLiabilities": 176392000000, "longTermDebt": 85750000000, "deferredRevenueNonCurrent": 10798000000, "deferredTaxLiabilitiesNonCurrent": 0, "otherNonCurrentLiabilities": 35090000000, "totalNonCurrentLiabilities": 131638000000, "otherLiabilities": 0, "capitalLeaseObligations": 12430000000, "totalLiabilities": 308030000000, "treasuryStock": 0, "preferredStock": 0, "commonStock": 83276000000, "retainedEarnings": -19154000000, "additionalPaidInCapital": 0, "accumulatedOtherComprehensiveIncomeLoss": -7172000000, "otherTotalStockholdersEquity": 0, "totalStockholdersEquity": 56950000000, "totalEquity": 56950000000, "minorityInterest": 0, "totalLiabilitiesAndTotalEquity": 364980000000, "totalInvestments": 126707000000, "totalDebt": 106629000000, "netDebt": 76686000000 } ]`

[Cash Flow Statement API](/developer/docs/stable/cashflow-statement)

![Globe Flag](https://intelligence.financialmodelingprep.com/images/icons/globe_flag.png)

Gain insights into a company's cash flow activities with the Cash Flow Statements API. Analyze cash generated and used from operations, investments, and financing activities to evaluate the financial health and sustainability of a business.

Endpoint:

<https://financialmodelingprep.com/stable/cash-flow-statement?symbol\=AAPL>

Parameters:

Parameter Type Example
symbol\* string AAPL
limit number 5
period string Q1,Q2,Q3,Q4,FY

(\*) Required | Maximum 1000 records per request | Currency is as Reported in Financials

#### Response

`[ { "date": "2024-09-28", "symbol": "AAPL", "reportedCurrency": "USD", "cik": "0000320193", "filingDate": "2024-11-01", "acceptedDate": "2024-11-01 06:01:36", "fiscalYear": "2024", "period": "FY", "netIncome": 93736000000, "depreciationAndAmortization": 11445000000, "deferredIncomeTax": 0, "stockBasedCompensation": 11688000000, "changeInWorkingCapital": 3651000000, "accountsReceivables": -5144000000, "inventory": -1046000000, "accountsPayables": 6020000000, "otherWorkingCapital": 3821000000, "otherNonCashItems": -2266000000, "netCashProvidedByOperatingActivities": 118254000000, "investmentsInPropertyPlantAndEquipment": -9447000000, "acquisitionsNet": 0, "purchasesOfInvestments": -48656000000, "salesMaturitiesOfInvestments": 62346000000, "otherInvestingActivities": -1308000000, "netCashProvidedByInvestingActivities": 2935000000, "netDebtIssuance": -5998000000, "longTermNetDebtIssuance": -9958000000, "shortTermNetDebtIssuance": 3960000000, "netStockIssuance": -94949000000, "netCommonStockIssuance": -94949000000, "commonStockIssuance": 0, "commonStockRepurchased": -94949000000, "netPreferredStockIssuance": 0, "netDividendsPaid": -15234000000, "commonDividendsPaid": -15234000000, "preferredDividendsPaid": 0, "otherFinancingActivities": -5802000000, "netCashProvidedByFinancingActivities": -121983000000, "effectOfForexChangesOnCash": 0, "netChangeInCash": -794000000, "cashAtEndOfPeriod": 29943000000, "cashAtBeginningOfPeriod": 30737000000, "operatingCashFlow": 118254000000, "capitalExpenditure": -9447000000, "freeCashFlow": 108807000000, "incomeTaxesPaid": 26102000000, "interestPaid": 0 } ]`

[Latest Financial Statements API](/developer/docs/stable/latest-financial-statements)

![Globe Flag](https://intelligence.financialmodelingprep.com/images/icons/globe_flag.png)

Endpoint:

<https://financialmodelingprep.com/stable/latest-financial-statements?page\=0&limit\=250>

Parameters:

Parameter Type Example
page number 0
limit number 250

(\*) Required | Maximum 250 records per request | Page maxed at 100 | Currency is as Reported in Financials

#### Response

`[ { "symbol": "FGFI", "calendarYear": 2024, "period": "Q4", "date": "2024-12-31", "dateAdded": "2025-03-13 17:03:59" } ]`

[Income Statements TTM API](/developer/docs/stable/income-statements-ttm)

![Globe Flag](https://intelligence.financialmodelingprep.com/images/icons/globe_flag.png)

Endpoint:

<https://financialmodelingprep.com/stable/income-statement-ttm?symbol\=AAPL>

Parameters:

Parameter Type Example
symbol\* string AAPL
limit number 5

(\*) Required | Maximum 1000 records per request | Currency is as Reported in Financials

#### Response

`[ { "date": "2024-12-28", "symbol": "AAPL", "reportedCurrency": "USD", "cik": "0000320193", "filingDate": "2025-01-31", "acceptedDate": "2025-01-31 06:01:27", "fiscalYear": "2025", "period": "Q1", "revenue": 395760000000, "costOfRevenue": 211657000000, "grossProfit": 184103000000, "researchAndDevelopmentExpenses": 31942000000, "generalAndAdministrativeExpenses": 0, "sellingAndMarketingExpenses": 0, "sellingGeneralAndAdministrativeExpenses": 26486000000, "otherExpenses": 0, "operatingExpenses": 58428000000, "costAndExpenses": 270085000000, "netInterestIncome": 0, "interestIncome": 0, "interestExpense": 0, "depreciationAndAmortization": 11677000000, "ebitda": 137352000000, "ebit": 125675000000, "nonOperatingIncomeExcludingInterest": 0, "operatingIncome": 125675000000, "totalOtherIncomeExpensesNet": 71000000, "incomeBeforeTax": 125746000000, "incomeTaxExpense": 29596000000, "netIncomeFromContinuingOperations": 96150000000, "netIncomeFromDiscontinuedOperations": 0, "otherAdjustmentsToNetIncome": 0, "netIncome": 96150000000, "netIncomeDeductions": 0, "bottomLineNetIncome": 96150000000, "eps": 6.31, "epsDiluted": 6.3, "weightedAverageShsOut": 15081724000, "weightedAverageShsOutDil": 15150865000 } ]`

[Balance Sheet Statements TTM API](/developer/docs/stable/balance-sheet-statements-ttm)

![Globe Flag](https://intelligence.financialmodelingprep.com/images/icons/globe_flag.png)

Endpoint:

<https://financialmodelingprep.com/stable/balance-sheet-statement-ttm?symbol\=AAPL>

Parameters:

Parameter Type Example
symbol\* string AAPL
limit number 5

(\*) Required | Maximum 1000 records per request | Currency is as Reported in Financials

#### Response

`[ { "date": "2024-12-28", "symbol": "AAPL", "reportedCurrency": "USD", "cik": "0000320193", "filingDate": "2025-01-31", "acceptedDate": "2025-01-31 06:01:27", "fiscalYear": "2025", "period": "Q1", "cashAndCashEquivalents": 30299000000, "shortTermInvestments": 23476000000, "cashAndShortTermInvestments": 53775000000, "netReceivables": 59306000000, "accountsReceivables": 29639000000, "otherReceivables": 29667000000, "inventory": 6911000000, "prepaids": 0, "otherCurrentAssets": 13248000000, "totalCurrentAssets": 133240000000, "propertyPlantEquipmentNet": 46069000000, "goodwill": 0, "intangibleAssets": 0, "goodwillAndIntangibleAssets": 0, "longTermInvestments": 87593000000, "taxAssets": 0, "otherNonCurrentAssets": 77183000000, "totalNonCurrentAssets": 210845000000, "otherAssets": 0, "totalAssets": 344085000000, "totalPayables": 61910000000, "accountPayables": 61910000000, "otherPayables": 0, "accruedExpenses": 0, "shortTermDebt": 12843000000, "capitalLeaseObligationsCurrent": 0, "taxPayables": 0, "deferredRevenue": 8461000000, "otherCurrentLiabilities": 61151000000, "totalCurrentLiabilities": 144365000000, "longTermDebt": 83956000000, "deferredRevenueNonCurrent": 0, "deferredTaxLiabilitiesNonCurrent": 0, "otherNonCurrentLiabilities": 49006000000, "totalNonCurrentLiabilities": 132962000000, "otherLiabilities": 0, "capitalLeaseObligations": 0, "totalLiabilities": 277327000000, "treasuryStock": 0, "preferredStock": 0, "commonStock": 84768000000, "retainedEarnings": -11221000000, "additionalPaidInCapital": 0, "accumulatedOtherComprehensiveIncomeLoss": -6789000000, "otherTotalStockholdersEquity": 0, "totalStockholdersEquity": 66758000000, "totalEquity": 66758000000, "minorityInterest": 0, "totalLiabilitiesAndTotalEquity": 344085000000, "totalInvestments": 111069000000, "totalDebt": 96799000000, "netDebt": 66500000000 } ]`

[Cashflow Statements TTM API](/developer/docs/stable/cashflow-statements-ttm)

![Globe Flag](https://intelligence.financialmodelingprep.com/images/icons/globe_flag.png)

Endpoint:

<https://financialmodelingprep.com/stable/cash-flow-statement-ttm?symbol\=AAPL>

Parameters:

Parameter Type Example
symbol\* string AAPL
limit number 5

(\*) Required | Maximum 1000 records per request | Currency is as Reported in Financials

#### Response

`[ { "date": "2024-12-28", "symbol": "AAPL", "reportedCurrency": "USD", "cik": "0000320193", "filingDate": "2025-01-31", "acceptedDate": "2025-01-31 06:01:27", "fiscalYear": "2025", "period": "Q1", "netIncome": 96150000000, "depreciationAndAmortization": 11677000000, "deferredIncomeTax": 0, "stockBasedCompensation": 11977000000, "changeInWorkingCapital": -8224000000, "accountsReceivables": -9505000000, "inventory": -694000000, "accountsPayables": 3891000000, "otherWorkingCapital": -1916000000, "otherNonCashItems": -3286000000, "netCashProvidedByOperatingActivities": 108294000000, "investmentsInPropertyPlantAndEquipment": -9995000000, "acquisitionsNet": 0, "purchasesOfInvestments": -45000000000, "salesMaturitiesOfInvestments": 67422000000, "otherInvestingActivities": -1627000000, "netCashProvidedByInvestingActivities": 10800000000, "netDebtIssuance": -10967000000, "longTermNetDebtIssuance": -10967000000, "shortTermNetDebtIssuance": 0, "netStockIssuance": -98416000000, "netCommonStockIssuance": -98416000000, "commonStockIssuance": 0, "commonStockRepurchased": -98416000000, "netPreferredStockIssuance": 0, "netDividendsPaid": -15265000000, "commonDividendsPaid": -15265000000, "preferredDividendsPaid": 0, "otherFinancingActivities": -6121000000, "netCashProvidedByFinancingActivities": -130769000000, "effectOfForexChangesOnCash": 0, "netChangeInCash": -11675000000, "cashAtEndOfPeriod": 30299000000, "cashAtBeginningOfPeriod": 41974000000, "operatingCashFlow": 108294000000, "capitalExpenditure": -9995000000, "freeCashFlow": 98299000000, "incomeTaxesPaid": 37498000000, "interestPaid": 0 } ]`

[Key Metrics API](/developer/docs/stable/key-metrics)

![Globe Flag](https://intelligence.financialmodelingprep.com/images/icons/globe_flag.png)

Access essential financial metrics for a company with the FMP Financial Key Metrics API. Evaluate revenue, net income, P/E ratio, and more to assess performance and compare it to competitors.

Endpoint:

<https://financialmodelingprep.com/stable/key-metrics?symbol\=AAPL>

Parameters:

Parameter Type Example
symbol\* string AAPL
limit number 5
period string Q1,Q2,Q3,Q4,FY

(\*) Required | Maximum 1000 records per request | Currency is as Reported in Financials

#### Response

`[ { "symbol": "AAPL", "date": "2024-09-28", "fiscalYear": "2024", "period": "FY", "reportedCurrency": "USD", "marketCap": 3495160329570, "enterpriseValue": 3571846329570, "evToSales": 9.134339201273542, "evToOperatingCashFlow": 30.204866893043786, "evToFreeCashFlow": 32.82735788662494, "evToEBITDA": 26.524727497716487, "netDebtToEBITDA": 0.5694744580836323, "currentRatio": 0.8673125765340832, "incomeQuality": 1.2615643936161134, "grahamNumber": 22.587017267616833, "grahamNetNet": -12.352478525015636, "taxBurden": 0.7590881483581001, "interestBurden": 1.0021831580314244, "workingCapital": -23405000000, "investedCapital": 22275000000, "returnOnAssets": 0.25682503150857583, "operatingReturnOnAssets": 0.3434290787011036, "returnOnTangibleAssets": 0.25682503150857583, "returnOnEquity": 1.6459350307287095, "returnOnInvestedCapital": 0.4430708117427921, "returnOnCapitalEmployed": 0.6533607652660827, "earningsYield": 0.026818798327209237, "freeCashFlowYield": 0.03113076074921754, "capexToOperatingCashFlow": 0.07988736110406414, "capexToDepreciation": 0.8254259501965924, "capexToRevenue": 0.02415896275269477, "salesGeneralAndAdministrativeToRevenue": 0, "researchAndDevelopementToRevenue": 0.08022299794136074, "stockBasedCompensationToRevenue": 0.02988990755303234, "intangiblesToTotalAssets": 0, "averageReceivables": 63614000000, "averagePayables": 65785500000, "averageInventory": 6808500000, "daysOfSalesOutstanding": 61.83255974529134, "daysOfPayablesOutstanding": 119.65847721913745, "daysOfInventoryOutstanding": 12.642570548414087, "operatingCycle": 74.47513029370543, "cashConversionCycle": -45.18334692543202, "freeCashFlowToEquity": 32121000000, "freeCashFlowToFirm": 117192805288.09166, "tangibleAssetValue": 56950000000, "netCurrentAssetValue": -155043000000 } ]`

[Financial Ratios API](/developer/docs/stable/metrics-ratios)

![Globe Flag](https://intelligence.financialmodelingprep.com/images/icons/globe_flag.png)

Analyze a company's financial performance using the Financial Ratios API. This API provides detailed profitability, liquidity, and efficiency ratios, enabling users to assess a company's operational and financial health across various metrics.

Endpoint:

<https://financialmodelingprep.com/stable/ratios?symbol\=AAPL>

Parameters:

Parameter Type Example
symbol\* string AAPL
limit number 5
period string Q1,Q2,Q3,Q4,FY

(\*) Required | Maximum 1000 records per request | Currency is as Reported in Financials

#### Response

`[ { "symbol": "AAPL", "date": "2024-09-28", "fiscalYear": "2024", "period": "FY", "reportedCurrency": "USD", "grossProfitMargin": 0.4620634981523393, "ebitMargin": 0.31510222870075566, "ebitdaMargin": 0.3443707085043538, "operatingProfitMargin": 0.31510222870075566, "pretaxProfitMargin": 0.3157901466620635, "continuousOperationsProfitMargin": 0.23971255769943867, "netProfitMargin": 0.23971255769943867, "bottomLineProfitMargin": 0.23971255769943867, "receivablesTurnover": 5.903038811648023, "payablesTurnover": 3.0503480278422272, "inventoryTurnover": 28.870710952511665, "fixedAssetTurnover": 8.560310858143607, "assetTurnover": 1.0713874732862074, "currentRatio": 0.8673125765340832, "quickRatio": 0.8260068483831466, "solvencyRatio": 0.3414634938155374, "cashRatio": 0.16975259648963673, "priceToEarningsRatio": 37.287278415656736, "priceToEarningsGrowthRatio": -45.93792700808932, "forwardPriceToEarningsGrowthRatio": -45.93792700808932, "priceToBookRatio": 61.37243774486391, "priceToSalesRatio": 8.93822887866815, "priceToFreeCashFlowRatio": 32.12256867269569, "priceToOperatingCashFlowRatio": 29.55638142954995, "debtToAssetsRatio": 0.29215025480848267, "debtToEquityRatio": 1.872326602282704, "debtToCapitalRatio": 0.6518501763673821, "longTermDebtToCapitalRatio": 0.6009110021023125, "financialLeverageRatio": 6.408779631255487, "workingCapitalTurnoverRatio": -31.099932397502684, "operatingCashFlowRatio": 0.6704045534944896, "operatingCashFlowSalesRatio": 0.3024128274962599, "freeCashFlowOperatingCashFlowRatio": 0.9201126388959359, "debtServiceCoverageRatio": 5.024761722304708, "interestCoverageRatio": 0, "shortTermOperatingCashFlowCoverageRatio": 5.663777000814215, "operatingCashFlowCoverageRatio": 1.109022873702276, "capitalExpenditureCoverageRatio": 12.517624642743728, "dividendPaidAndCapexCoverageRatio": 4.7912969490701345, "dividendPayoutRatio": 0.16252026969360758, "dividendYield": 0.0043585983369965175, "dividendYieldPercentage": 0.43585983369965176, "revenuePerShare": 25.484914639368924, "netIncomePerShare": 6.109054070954992, "interestDebtPerShare": 6.949329249507765, "cashPerShare": 4.247388013764271, "bookValuePerShare": 3.711600978715614, "tangibleBookValuePerShare": 3.711600978715614, "shareholdersEquityPerShare": 3.711600978715614, "operatingCashFlowPerShare": 7.706965094592383, "capexPerShare": 0.6156891035281195, "freeCashFlowPerShare": 7.091275991064264, "netIncomePerEBT": 0.7590881483581001, "ebtPerEbit": 1.0021831580314244, "priceToFairValue": 61.37243774486391, "debtToMarketCap": 0.03050761336980449, "effectiveTaxRate": 0.24091185164189982, "enterpriseValueMultiple": 26.524727497716487 } ]`

[Key Metrics TTM API](/developer/docs/stable/key-metrics-ttm)

![Globe Flag](https://intelligence.financialmodelingprep.com/images/icons/globe_flag.png)

Retrieve a comprehensive set of trailing twelve-month (TTM) key performance metrics with the TTM Key Metrics API. Access data related to a company's profitability, capital efficiency, and liquidity, allowing for detailed analysis of its financial health over the past year.

Endpoint:

<https://financialmodelingprep.com/stable/key-metrics-ttm?symbol\=AAPL>

Parameters:

Parameter Type Example
symbol\* string AAPL

(\*) Required | Currency is as Reported in Financials

#### Response

`[ { "symbol": "AAPL", "marketCap": 3149833928000, "enterpriseValueTTM": 3216333928000, "evToSalesTTM": 8.126980816656559, "evToOperatingCashFlowTTM": 29.70001965021146, "evToFreeCashFlowTTM": 32.71990486169747, "evToEBITDATTM": 23.41672438697653, "netDebtToEBITDATTM": 0.48415749315627005, "currentRatioTTM": 0.9229383853427077, "incomeQualityTTM": 1.1263026521060842, "grahamNumberTTM": 25.198029099282905, "grahamNetNetTTM": -11.64435843011051, "taxBurdenTTM": 0.7646366484818603, "interestBurdenTTM": 1.0005649492739208, "workingCapitalTTM": -11125000000, "investedCapitalTTM": 34944000000, "returnOnAssetsTTM": 0.27943676707790227, "operatingReturnOnAssetsTTM": 0.35448090090471257, "returnOnTangibleAssetsTTM": 0.27943676707790227, "returnOnEquityTTM": 1.4534598087751787, "returnOnInvestedCapitalTTM": 0.45208108089346594, "returnOnCapitalEmployedTTM": 0.6292559583416784, "earningsYieldTTM": 0.030404739849149914, "freeCashFlowYieldTTM": 0.03120767705439485, "capexToOperatingCashFlowTTM": 0.09229504866382256, "capexToDepreciationTTM": 0.855956153121521, "capexToRevenueTTM": 0.025255205174853447, "salesGeneralAndAdministrativeToRevenueTTM": 0, "researchAndDevelopementToRevenueTTM": 0.08071053163533455, "stockBasedCompensationToRevenueTTM": 0.030263290883363655, "intangiblesToTotalAssetsTTM": 0, "averageReceivablesTTM": 62774500000, "averagePayablesTTM": 65435000000, "averageInventoryTTM": 7098500000, "daysOfSalesOutstandingTTM": 54.69650798463715, "daysOfPayablesOutstandingTTM": 106.76306476988712, "daysOfInventoryOutstandingTTM": 11.917937984569374, "operatingCycleTTM": 66.61444596920653, "cashConversionCycleTTM": -40.148618800680595, "freeCashFlowToEquityTTM": 31799000000, "freeCashFlowToFirmTTM": 85497710797.9578, "tangibleAssetValueTTM": 66758000000, "netCurrentAssetValueTTM": -144087000000 } ]`

[Financial Ratios TTM API](/developer/docs/stable/metrics-ratios-ttm)

![Globe Flag](https://intelligence.financialmodelingprep.com/images/icons/globe_flag.png)

Gain access to trailing twelve-month (TTM) financial ratios with the TTM Ratios API. This API provides key performance metrics over the past year, including profitability, liquidity, and efficiency ratios.

Endpoint:

<https://financialmodelingprep.com/stable/ratios-ttm?symbol\=AAPL>

Parameters:

Parameter Type Example
symbol\* string AAPL

(\*) Required | Currency is as Reported in Financials

#### Response

`[ { "symbol": "AAPL", "grossProfitMarginTTM": 0.46518849807964424, "ebitMarginTTM": 0.3175535678188801, "ebitdaMarginTTM": 0.34705882352941175, "operatingProfitMarginTTM": 0.3175535678188801, "pretaxProfitMarginTTM": 0.31773296947645036, "continuousOperationsProfitMarginTTM": 0.24295027289266222, "netProfitMarginTTM": 0.24295027289266222, "bottomLineProfitMarginTTM": 0.24295027289266222, "receivablesTurnoverTTM": 6.673186524129093, "payablesTurnoverTTM": 3.4187853335486995, "inventoryTurnoverTTM": 30.626103313558097, "fixedAssetTurnoverTTM": 8.590592372311098, "assetTurnoverTTM": 1.1501809145995903, "currentRatioTTM": 0.9229383853427077, "quickRatioTTM": 0.8750666712845911, "solvencyRatioTTM": 0.3888081578786054, "cashRatioTTM": 0.20987774044955496, "priceToEarningsRatioTTM": 32.889608822880916, "priceToEarningsGrowthRatioTTM": 9.104441715061135, "forwardPriceToEarningsGrowthRatioTTM": 9.104441715061135, "priceToBookRatioTTM": 47.370141231313106, "priceToSalesRatioTTM": 7.958949686678795, "priceToFreeCashFlowRatioTTM": 32.04339747098139, "priceToOperatingCashFlowRatioTTM": 29.201395167968677, "debtToAssetsRatioTTM": 0.28132292892744526, "debtToEquityRatioTTM": 1.4499985020521886, "debtToCapitalRatioTTM": 0.5918364851397372, "longTermDebtToCapitalRatioTTM": 0.557055084464615, "financialLeverageRatioTTM": 5.154213727193745, "workingCapitalTurnoverRatioTTM": -22.92267593397046, "operatingCashFlowRatioTTM": 0.7501402694558931, "operatingCashFlowSalesRatioTTM": 0.2736355366889024, "freeCashFlowOperatingCashFlowRatioTTM": 0.9077049513361775, "debtServiceCoverageRatioTTM": 8.390251498870981, "interestCoverageRatioTTM": 0, "shortTermOperatingCashFlowCoverageRatioTTM": 8.432142022891847, "operatingCashFlowCoverageRatioTTM": 1.1187512267688715, "capitalExpenditureCoverageRatioTTM": 10.834817408704351, "dividendPaidAndCapexCoverageRatioTTM": 4.287173396674584, "dividendPayoutRatioTTM": 0.15876235049401977, "dividendYieldTTM": 0.0047691720717283476, "enterpriseValueTTM": 3216333928000, "revenuePerShareTTM": 26.24103186081379, "netIncomePerShareTTM": 6.375265851569754, "interestDebtPerShareTTM": 6.418298067250137, "cashPerShareTTM": 3.565573803101025, "bookValuePerShareTTM": 4.426417032959892, "tangibleBookValuePerShareTTM": 4.426417032959892, "shareholdersEquityPerShareTTM": 4.426417032959892, "operatingCashFlowPerShareTTM": 7.180478836504368, "capexPerShareTTM": 0.6627226436447186, "freeCashFlowPerShareTTM": 6.5177561928596495, "netIncomePerEBTTTM": 0.7646366484818603, "ebtPerEbitTTM": 1.0005649492739208, "priceToFairValueTTM": 47.370141231313106, "debtToMarketCapTTM": 0.030731461471514124, "effectiveTaxRateTTM": 0.23536335151813975, "enterpriseValueMultipleTTM": 23.41672438697653 } ]`

[Financial Scores API](/developer/docs/stable/financial-scores)

![Globe Flag](https://intelligence.financialmodelingprep.com/images/icons/globe_flag.png)

Assess a company's financial strength using the Financial Health Scores API. This API provides key metrics such as the Altman Z-Score and Piotroski Score, giving users insights into a company’s overall financial health and stability.

Endpoint:

<https://financialmodelingprep.com/stable/financial-scores?symbol\=AAPL>

Parameters:

Parameter Type Example
symbol\* string AAPL

(\*) Required | Currency is as Reported in Financials

#### Response

`[ { "symbol": "AAPL", "reportedCurrency": "USD", "altmanZScore": 9.322985825443649, "piotroskiScore": 8, "workingCapital": -11125000000, "totalAssets": 344085000000, "retainedEarnings": -11221000000, "ebit": 125675000000, "marketCap": 3259495258000, "totalLiabilities": 277327000000, "revenue": 395760000000 } ]`

[Owner Earnings API](/developer/docs/stable/owner-earnings)

![Globe Flag](https://intelligence.financialmodelingprep.com/images/icons/globe_flag.png)

Retrieve a company's owner earnings with the Owner Earnings API, which provides a more accurate representation of cash available to shareholders by adjusting net income. This metric is crucial for evaluating a company’s profitability from the perspective of investors.

Endpoint:

<https://financialmodelingprep.com/stable/owner-earnings?symbol\=AAPL>

Parameters:

Parameter Type Example
symbol\* string AAPL
limit number 5

(\*) Required | Currency is as Reported in Financials

#### Response

`[ { "symbol": "AAPL", "reportedCurrency": "USD", "fiscalYear": "2025", "period": "Q1", "date": "2024-12-28", "averagePPE": 0.13969, "maintenanceCapex": -2279964750, "ownersEarnings": 27655035250, "growthCapex": -660035250, "ownersEarningsPerShare": 1.83 } ]`

[Enterprise Values API](/developer/docs/stable/enterprise-values)

![Globe Flag](https://intelligence.financialmodelingprep.com/images/icons/globe_flag.png)

Access a company's enterprise value using the Enterprise Values API. This metric offers a comprehensive view of a company's total market value by combining both its equity (market capitalization) and debt, providing a better understanding of its worth.

Endpoint:

<https://financialmodelingprep.com/stable/enterprise-values?symbol\=AAPL>

Parameters:

Parameter Type Example
symbol\* string AAPL
limit number 5
period string Q1,Q2,Q3,Q4,FY

(\*) Required | Maximum 1000 records per request | Currency is as Reported in Financials

#### Response

`[ { "symbol": "AAPL", "date": "2024-09-28", "stockPrice": 227.79, "numberOfShares": 15343783000, "marketCapitalization": 3495160329570, "minusCashAndCashEquivalents": 29943000000, "addTotalDebt": 106629000000, "enterpriseValue": 3571846329570 } ]`

[Income Statement Growth API](/developer/docs/stable/income-statement-growth)

![Globe Flag](https://intelligence.financialmodelingprep.com/images/icons/globe_flag.png)

Track key financial growth metrics with the Income Statement Growth API. Analyze how revenue, profits, and expenses have evolved over time, offering insights into a company’s financial health and operational efficiency.

Endpoint:

<https://financialmodelingprep.com/stable/income-statement-growth?symbol\=AAPL>

Parameters:

Parameter Type Example
symbol\* string AAPL
limit number 5
period string Q1,Q2,Q3,Q4,FY

(\*) Required | Maximum 1000 records per request | Currency is as Reported in Financials

#### Response

`[ { "symbol": "AAPL", "date": "2024-09-28", "fiscalYear": "2024", "period": "FY", "reportedCurrency": "USD", "growthRevenue": 0.020219940775141214, "growthCostOfRevenue": -0.017675600199872046, "growthGrossProfit": 0.06819471705252206, "growthGrossProfitRatio": 0.04776303446712012, "growthResearchAndDevelopmentExpenses": 0.04863780712017383, "growthGeneralAndAdministrativeExpenses": 0, "growthSellingAndMarketingExpenses": 0, "growthOtherExpenses": -1, "growthOperatingExpenses": 0.04776924900176856, "growthCostAndExpenses": -0.004331112631234571, "growthInterestIncome": -1, "growthInterestExpense": -1, "growthDepreciationAndAmortization": -0.006424168764649709, "growthEBITDA": 0.07026704816404387, "growthOperatingIncome": 0.07799581805933456, "growthIncomeBeforeTax": 0.08571604417246959, "growthIncomeTaxExpense": 0.7770145152619318, "growthNetIncome": -0.033599670086086914, "growthEPS": -0.008116883116883088, "growthEPSDiluted": -0.008156606851549727, "growthWeightedAverageShsOut": -0.02543458616683152, "growthWeightedAverageShsOutDil": -0.02557791606880283, "growthEBIT": 0.0471407082579099, "growthNonOperatingIncomeExcludingInterest": 1, "growthNetInterestIncome": 1, "growthTotalOtherIncomeExpensesNet": 1.4761061946902654, "growthNetIncomeFromContinuingOperations": -0.033599670086086914, "growthOtherAdjustmentsToNetIncome": 0, "growthNetIncomeDeductions": 0 } ]`

[Balance Sheet Statement Growth API](/developer/docs/stable/balance-sheet-statement-growth)

![Globe Flag](https://intelligence.financialmodelingprep.com/images/icons/globe_flag.png)

Analyze the growth of key balance sheet items over time with the Balance Sheet Statement Growth API. Track changes in assets, liabilities, and equity to understand the financial evolution of a company.

Endpoint:

<https://financialmodelingprep.com/stable/balance-sheet-statement-growth?symbol\=AAPL>

Parameters:

Parameter Type Example
symbol\* string AAPL
limit number 5
period string Q1,Q2,Q3,Q4,FY

(\*) Required | Maximum 1000 records per request | Currency is as Reported in Financials

#### Response

`[ { "symbol": "AAPL", "date": "2024-09-28", "fiscalYear": "2024", "period": "FY", "reportedCurrency": "USD", "growthCashAndCashEquivalents": -0.0007341898882029034, "growthShortTermInvestments": 0.11516302627413738, "growthCashAndShortTermInvestments": 0.058744212492892536, "growthNetReceivables": 0.08621792243994425, "growthInventory": 0.15084504817564365, "growthOtherCurrentAssets": -0.02776454576386526, "growthTotalCurrentAssets": 0.06562138667929733, "growthPropertyPlantEquipmentNet": -0.15992349565984992, "growthGoodwill": 0, "growthIntangibleAssets": 0, "growthGoodwillAndIntangibleAssets": 0, "growthLongTermInvestments": -0.09015953214513049, "growthTaxAssets": 0.09225857046829487, "growthOtherNonCurrentAssets": 0.5266933370120016, "growthTotalNonCurrentAssets": 0.014238076328719674, "growthOtherAssets": 0, "growthTotalAssets": 0.035160515396374756, "growthAccountPayables": 0.1014039066617687, "growthShortTermDebt": 0.32087050041121024, "growthTaxPayables": 2.01632838190271, "growthDeferredRevenue": 0.023322168465450935, "growthOtherCurrentLiabilities": -0.1254584832500786, "growthTotalCurrentLiabilities": 0.21391802240757563, "growthLongTermDebt": -0.10003043628845205, "growthDeferredRevenueNonCurrent": 0, "growthDeferredTaxLiabilitiesNonCurrent": 0, "growthOtherNonCurrentLiabilities": -0.09048495373370312, "growthTotalNonCurrentLiabilities": -0.09295867814151548, "growthOtherLiabilities": 0, "growthTotalLiabilities": 0.060574238130816666, "growthPreferredStock": 0, "growthCommonStock": 0.12821763398905328, "growthRetainedEarnings": -88.50467289719626, "growthAccumulatedOtherComprehensiveIncomeLoss": 0.3737338456164862, "growthOthertotalStockholdersEquity": 0, "growthTotalStockholdersEquity": -0.0836095645737457, "growthMinorityInterest": 0, "growthTotalEquity": -0.0836095645737457, "growthTotalLiabilitiesAndStockholdersEquity": 0.035160515396374756, "growthTotalInvestments": -0.04107194211936368, "growthTotalDebt": -0.0401393489845888, "growthNetDebt": -0.05469472282829777, "growthAccountsReceivables": 0.13223532601328453, "growthOtherReceivables": 0.04307907360930203, "growthPrepaids": 0, "growthTotalPayables": 0.5262653527335452, "growthOtherPayables": 0, "growthAccruedExpenses": 0, "growthCapitalLeaseObligationsCurrent": 0.03619047619047619, "growthAdditionalPaidInCapital": 0, "growthTreasuryStock": 0 } ]`

[Cashflow Statement Growth API](/developer/docs/stable/cashflow-statement-growth)

![Globe Flag](https://intelligence.financialmodelingprep.com/images/icons/globe_flag.png)

Measure the growth rate of a company’s cash flow with the FMP Cashflow Statement Growth API. Determine how quickly a company’s cash flow is increasing or decreasing over time.

Endpoint:

<https://financialmodelingprep.com/stable/cash-flow-statement-growth?symbol\=AAPL>

Parameters:

Parameter Type Example
symbol\* string AAPL
limit number 5
period string Q1,Q2,Q3,Q4,FY

(\*) Required | Maximum 1000 records per request | Currency is as Reported in Financials

#### Response

`[ { "symbol": "AAPL", "date": "2024-09-28", "fiscalYear": "2024", "period": "FY", "reportedCurrency": "USD", "growthNetIncome": -0.033599670086086914, "growthDepreciationAndAmortization": -0.006424168764649709, "growthDeferredIncomeTax": 0, "growthStockBasedCompensation": 0.07892550540016616, "growthChangeInWorkingCapital": 1.555116314429071, "growthAccountsReceivables": -2.0473933649289098, "growthInventory": 0.3535228677379481, "growthAccountsPayables": 4.1868713605082055, "growthOtherWorkingCapital": 2.4402563136072373, "growthOtherNonCashItems": -0.017512348450830714, "growthNetCashProvidedByOperatingActivites": 0.06975566069312394, "growthInvestmentsInPropertyPlantAndEquipment": 0.13796879277306323, "growthAcquisitionsNet": 0, "growthPurchasesOfInvestments": -0.6486294175448107, "growthSalesMaturitiesOfInvestments": 0.3698202750801951, "growthOtherInvestingActivites": 0.02169035153328347, "growthNetCashUsedForInvestingActivites": -0.2078272604588394, "growthDebtRepayment": -0.012662502110417018, "growthCommonStockIssued": 0, "growthCommonStockRepurchased": -0.2243584784010316, "growthDividendsPaid": -0.013910149750415973, "growthOtherFinancingActivites": 0.03493013972055888, "growthNetCashUsedProvidedByFinancingActivities": -0.12439163778482412, "growthEffectOfForexChangesOnCash": 0, "growthNetChangeInCash": -1.1378472222222222, "growthCashAtEndOfPeriod": -0.02583205908188828, "growthCashAtBeginningOfPeriod": 0.23061216319013492, "growthOperatingCashFlow": 0.06975566069312394, "growthCapitalExpenditure": 0.13796879277306323, "growthFreeCashFlow": 0.092615279562982, "growthNetDebtIssuance": 0.3942026057973942, "growthLongTermNetDebtIssuance": -0.6812426135404356, "growthShortTermNetDebtIssuance": 1.995475113122172, "growthNetStockIssuance": -0.2243584784010316, "growthPreferredDividendsPaid": -0.013910149750415973, "growthIncomeTaxesPaid": 0.3973981476524439, "growthInterestPaid": -1 } ]`

[Financial Statement Growth API](/developer/docs/stable/financial-statement-growth)

![Globe Flag](https://intelligence.financialmodelingprep.com/images/icons/globe_flag.png)

Analyze the growth of key financial statement items across income, balance sheet, and cash flow statements with the Financial Statement Growth API. Track changes over time to understand trends in financial performance.

Endpoint:

<https://financialmodelingprep.com/stable/financial-growth?symbol\=AAPL>

Parameters:

Parameter Type Example
symbol\* string AAPL
limit number 5
period string Q1,Q2,Q3,Q4,FY

(\*) Required | Maximum 1000 records per request | Currency is as Reported in Financials

#### Response

`[ { "symbol": "AAPL", "date": "2024-09-28", "fiscalYear": "2024", "period": "FY", "reportedCurrency": "USD", "revenueGrowth": 0.020219940775141214, "grossProfitGrowth": 0.06819471705252206, "ebitgrowth": 0.07799581805933456, "operatingIncomeGrowth": 0.07799581805933456, "netIncomeGrowth": -0.033599670086086914, "epsgrowth": -0.008116883116883088, "epsdilutedGrowth": -0.008156606851549727, "weightedAverageSharesGrowth": -0.02543458616683152, "weightedAverageSharesDilutedGrowth": -0.02557791606880283, "dividendsPerShareGrowth": 0.040371570095532654, "operatingCashFlowGrowth": 0.06975566069312394, "receivablesGrowth": 0.08621792243994425, "inventoryGrowth": 0.15084504817564365, "assetGrowth": 0.035160515396374756, "bookValueperShareGrowth": -0.059693251557224776, "debtGrowth": -0.0401393489845888, "rdexpenseGrowth": 0.04863780712017383, "sgaexpensesGrowth": 0.04672709770575967, "freeCashFlowGrowth": 0.092615279562982, "tenYRevenueGrowthPerShare": 2.3937532854122625, "fiveYRevenueGrowthPerShare": 0.8093292228858464, "threeYRevenueGrowthPerShare": 0.163506592883552, "tenYOperatingCFGrowthPerShare": 2.1417809176982403, "fiveYOperatingCFGrowthPerShare": 1.051533221923415, "threeYOperatingCFGrowthPerShare": 0.23720294833900227, "tenYNetIncomeGrowthPerShare": 2.76381558093543, "fiveYNetIncomeGrowthPerShare": 1.0421744314966246, "threeYNetIncomeGrowthPerShare": 0.07761907162786884, "tenYShareholdersEquityGrowthPerShare": -0.19003774225234785, "fiveYShareholdersEquityGrowthPerShare": -0.24235004889283715, "threeYShareholdersEquityGrowthPerShare": -0.017459858915902907, "tenYDividendperShareGrowthPerShare": 1.1722201809466772, "fiveYDividendperShareGrowthPerShare": 0.29890046876764864, "threeYDividendperShareGrowthPerShare": 0.14617932692103452, "ebitdaGrowth": null, "growthCapitalExpenditure": null, "tenYBottomLineNetIncomeGrowthPerShare": null, "fiveYBottomLineNetIncomeGrowthPerShare": null, "threeYBottomLineNetIncomeGrowthPerShare": null } ]`

[Financial Reports Dates API](/developer/docs/stable/financial-reports-dates)

Endpoint:

<https://financialmodelingprep.com/stable/financial-reports-dates?symbol\=AAPL>

Parameters:

Parameter Type Example
symbol\* string AAPL

(\*) Required

#### Response

`[ { "symbol": "AAPL", "fiscalYear": 2025, "period": "Q1", "linkXlsx": "https://financialmodelingprep.com/stable/financial-reports-json?symbol=AAPL&year=2025&period=Q1&apikey=YOUR_API_KEY", "linkJson": "https://financialmodelingprep.com/stable/financial-reports-xlsx?symbol=AAPL&year=2025&period=Q1&apikey=YOUR_API_KEY" } ]`

[Financial Reports Form 10-K JSON API](/developer/docs/stable/financial-reports-form-10-k-json)

Access comprehensive annual reports with the FMP Annual Reports on Form 10-K API. Obtain detailed information about a company’s financial performance, business operations, and risk factors as reported to the SEC.

Endpoint:

<https://financialmodelingprep.com/stable/financial-reports-json?symbol\=AAPL&year\=2022&period\=FY>

Parameters:

Parameter Type Example
symbol\* string AAPL
year\* number 2022
period\* string Q1,Q2,Q3,Q4,FY

(\*) Required

#### Response

`[ { "symbol": "AAPL", "period": "FY", "year": "2022", "Cover Page": [ { "Cover Page - USD ($) shares in Thousands, $ in Millions": [ "12 Months Ended" ] }, { "items": [ "Sep. 24, 2022", "Oct. 14, 2022", "Mar. 25, 2022" ] }, { "Entity Information [Line Items]": [ " ", " ", " " ] } ], "Auditor Information": [ { "Auditor Information": [ "12 Months Ended" ] }, { "items": [ "Sep. 24, 2022" ] }, { "Auditor Information [Abstract]": [ " " ] } ], "CONSOLIDATED STATEMENTS OF OPER": [ { "CONSOLIDATED STATEMENTS OF OPERATIONS - USD ($) shares in Thousands, $ in Millions": [ "12 Months Ended" ] }, { "items": [ "Sep. 24, 2022", "Sep. 25, 2021", "Sep. 26, 2020" ] }, { "Net sales": [ 394328, 365817, 274515 ] } ], "CONSOLIDATED STATEMENTS OF COMP": [ { "CONSOLIDATED STATEMENTS OF COMPREHENSIVE INCOME - USD ($) $ in Millions": [ "12 Months Ended" ] }, { "items": [ "Sep. 24, 2022", "Sep. 25, 2021", "Sep. 26, 2020" ] }, { "Statement of Comprehensive Income [Abstract]": [ " ", " ", " " ] } ], "CONSOLIDATED BALANCE SHEETS": [ { "CONSOLIDATED BALANCE SHEETS - USD ($) $ in Millions": [ "Sep. 24, 2022", "Sep. 25, 2021" ] }, { "Current assets:": [ " ", " " ] }, { "Cash and cash equivalents": [ 23646, 34940 ] } ], "CONSOLIDATED BALANCE SHEETS (Pa": [ { "CONSOLIDATED BALANCE SHEETS (Parenthetical) - $ / shares": [ "Sep. 24, 2022", "Sep. 25, 2021" ] }, { "Statement of Financial Position [Abstract]": [ " ", " " ] }, { "Common stock, par value (in dollars per share)": [ 0.00001, 0.00001 ] } ], "CONSOLIDATED STATEMENTS OF SHAR": [ { "CONSOLIDATED STATEMENTS OF SHAREHOLDERS' EQUITY - USD ($) $ in Millions": [ "Total", "Common stock and additional paid-in capital", "Retained earnings/(Accumulated deficit)", "Retained earnings/(Accumulated deficit) Cumulative effect of change in accounting principle", "Accumulated other comprehensive income/(loss)", "Accumulated other comprehensive income/(loss) Cumulative effect of change in accounting principle" ] }, { "Beginning balances at Sep. 28, 2019": [ 90488, 45174, 45898, -136, -584, 136 ] }, { "Increase (Decrease) in Stockholders' Equity [Roll Forward]": [ " ", " ", " ", " ", " ", " " ] } ], "CONSOLIDATED STATEMENTS OF CASH": [ { "CONSOLIDATED STATEMENTS OF CASH FLOWS - USD ($) $ in Millions": [ "12 Months Ended" ] }, { "items": [ "Sep. 24, 2022", "Sep. 25, 2021", "Sep. 26, 2020" ] }, { "Statement of Cash Flows [Abstract]": [ " ", " ", " " ] } ], "Summary of Significant Accounti": [ { "Summary of Significant Accounting Policies": [ "12 Months Ended" ] }, { "items": [ "Sep. 24, 2022" ] }, { "Accounting Policies [Abstract]": [ " " ] } ], "Revenue": [ { "Revenue": [ "12 Months Ended" ] }, { "items": [ "Sep. 24, 2022" ] }, { "Revenue from Contract with Customer [Abstract]": [ " " ] } ], "Financial Instruments": [ { "Financial Instruments": [ "12 Months Ended" ] }, { "items": [ "Sep. 24, 2022" ] }, { "Investments, All Other Investments [Abstract]": [ " " ] } ], "Consolidated Financial Statemen": [ { "Consolidated Financial Statement Details": [ "12 Months Ended" ] }, { "items": [ "Sep. 24, 2022" ] }, { "Organization, Consolidation and Presentation of Financial Statements [Abstract]": [ " " ] } ], "Income Taxes": [ { "Income Taxes": [ "12 Months Ended" ] }, { "items": [ "Sep. 24, 2022" ] }, { "Income Tax Disclosure [Abstract]": [ " " ] } ], "Leases": [ { "Leases": [ "12 Months Ended" ] }, { "items": [ "Sep. 24, 2022" ] }, { "Leases [Abstract]": [ " " ] } ], "Debt": [ { "Debt": [ "12 Months Ended" ] }, { "items": [ "Sep. 24, 2022" ] }, { "Debt Disclosure [Abstract]": [ " " ] } ], "Shareholders' Equity": [ { "Shareholders' Equity": [ "12 Months Ended" ] }, { "items": [ "Sep. 24, 2022" ] }, { "Equity [Abstract]": [ " " ] } ], "Benefit Plans": [ { "Benefit Plans": [ "12 Months Ended" ] }, { "items": [ "Sep. 24, 2022" ] }, { "Share-Based Payment Arrangement [Abstract]": [ " " ] } ], "Commitments and Contingencies": [ { "Commitments and Contingencies": [ "12 Months Ended" ] }, { "items": [ "Sep. 24, 2022" ] }, { "Commitments and Contingencies Disclosure [Abstract]": [ " " ] } ], "Segment Information and Geograp": [ { "Segment Information and Geographic Data": [ "12 Months Ended" ] }, { "items": [ "Sep. 24, 2022" ] }, { "Segment Reporting [Abstract]": [ " " ] } ], "Summary of Significant Accoun_2": [ { "Summary of Significant Accounting Policies (Policies)": [ "12 Months Ended" ] }, { "items": [ "Sep. 24, 2022" ] }, { "Accounting Policies [Abstract]": [ " " ] } ], "Summary of Significant Accoun_3": [ { "Summary of Significant Accounting Policies (Tables)": [ "12 Months Ended" ] }, { "items": [ "Sep. 24, 2022" ] }, { "Accounting Policies [Abstract]": [ " " ] } ], "Revenue (Tables)": [ { "Revenue (Tables)": [ "12 Months Ended" ] }, { "items": [ "Sep. 24, 2022" ] }, { "Revenue from Contract with Customer [Abstract]": [ " " ] } ], "Financial Instruments (Tables)": [ { "Financial Instruments (Tables)": [ "12 Months Ended" ] }, { "items": [ "Sep. 24, 2022" ] }, { "Investments, All Other Investments [Abstract]": [ " " ] } ], "Consolidated Financial Statem_2": [ { "Consolidated Financial Statement Details (Tables)": [ "12 Months Ended" ] }, { "items": [ "Sep. 24, 2022" ] }, { "Organization, Consolidation and Presentation of Financial Statements [Abstract]": [ " " ] } ], "Income Taxes (Tables)": [ { "Income Taxes (Tables)": [ "12 Months Ended" ] }, { "items": [ "Sep. 24, 2022" ] }, { "Income Tax Disclosure [Abstract]": [ " " ] } ], "Leases (Tables)": [ { "Leases (Tables)": [ "12 Months Ended" ] }, { "items": [ "Sep. 24, 2022" ] }, { "Leases [Abstract]": [ " " ] } ], "Debt (Tables)": [ { "Debt (Tables)": [ "12 Months Ended" ] }, { "items": [ "Sep. 24, 2022" ] }, { "Debt Disclosure [Abstract]": [ " " ] } ], "Shareholders' Equity (Tables)": [ { "Shareholders' Equity (Tables)": [ "12 Months Ended" ] }, { "items": [ "Sep. 24, 2022" ] }, { "Equity [Abstract]": [ " " ] } ], "Benefit Plans (Tables)": [ { "Benefit Plans (Tables)": [ "12 Months Ended" ] }, { "items": [ "Sep. 24, 2022" ] }, { "Share-Based Payment Arrangement [Abstract]": [ " " ] } ], "Commitments and Contingencies (": [ { "Commitments and Contingencies (Tables)": [ "12 Months Ended" ] }, { "items": [ "Sep. 24, 2022" ] }, { "Commitments and Contingencies Disclosure [Abstract]": [ " " ] } ], "Segment Information and Geogr_2": [ { "Segment Information and Geographic Data (Tables)": [ "12 Months Ended" ] }, { "items": [ "Sep. 24, 2022" ] }, { "Segment Reporting [Abstract]": [ " " ] } ], "Summary of Significant Accoun_4": [ { "Summary of Significant Accounting Policies - Additional Information (Details) $ in Billions": [ "12 Months Ended" ] }, { "items": [ "Sep. 24, 2022 USD ($) performanceObligation", "Sep. 25, 2021 USD ($)", "Sep. 26, 2020 USD ($)" ] }, { "Significant Accounting Policies [Line Items]": [ " ", " ", " " ] } ], "Summary of Significant Accoun_5": [ { "Summary of Significant Accounting Policies - Computation of Basic and Diluted Earnings Per Share (Details) - USD ($) $ / shares in Units, shares in Thousands, $ in Millions": [ "12 Months Ended" ] }, { "items": [ "Sep. 24, 2022", "Sep. 25, 2021", "Sep. 26, 2020" ] }, { "Numerator:": [ " ", " ", " " ] } ], "Revenue - Net Sales Disaggregat": [ { "Revenue - Net Sales Disaggregated by Significant Products and Services (Details) - USD ($) $ in Millions": [ "12 Months Ended" ] }, { "items": [ "Sep. 24, 2022", "Sep. 25, 2021", "Sep. 26, 2020" ] }, { "Disaggregation of Revenue [Line Items]": [ " ", " ", " " ] } ], "Revenue - Additional Informatio": [ { "Revenue - Additional Information (Details) - USD ($) $ in Billions": [ "Sep. 24, 2022", "Sep. 25, 2021" ] }, { "Revenue from Contract with Customer [Abstract]": [ " ", " " ] }, { "Total deferred revenue": [ 12.4, 11.9 ] } ], "Revenue - Deferred Revenue, Exp": [ { "Revenue - Deferred Revenue, Expected Timing of Realization (Details)": [ "Sep. 24, 2022" ] }, { "Revenue, Remaining Performance Obligation, Expected Timing of Satisfaction, Start Date [Axis]: 2022-09-25": [ " " ] }, { "Revenue, Remaining Performance Obligation, Expected Timing of Satisfaction [Line Items]": [ " " ] } ], "Financial Instruments - Cash, C": [ { "Financial Instruments - Cash, Cash Equivalents and Marketable Securities (Details) - USD ($) $ in Millions": [ "Sep. 24, 2022", "Sep. 25, 2021" ] }, { "Debt Securities, Available-for-sale [Line Items]": [ " ", " " ] }, { "Cash, Cash Equivalents and Marketable Securities, Adjusted Cost": [ 183061, 189961 ] } ], "Financial Instruments - Non-Cur": [ { "Financial Instruments - Non-Current Marketable Debt Securities by Contractual Maturity (Details) $ in Millions": [ "Sep. 24, 2022 USD ($)" ] }, { "Fair value of non-current marketable debt securities by contractual maturity": [ " " ] }, { "Due after 1 year through 5 years": [ 87031 ] } ], "Financial Instruments - Additio": [ { "Financial Instruments - Additional Information (Details) $ in Millions": [ "12 Months Ended" ] }, { "items": [ "Sep. 24, 2022 USD ($) Customer Vendor", "Sep. 25, 2021 Vendor" ] }, { "Financial Instruments [Line Items]": [ " ", " " ] } ], "Financial Instruments - Notiona": [ { "Financial Instruments - Notional Amounts Associated with Derivative Instruments (Details) - USD ($) $ in Millions": [ "Sep. 24, 2022", "Sep. 25, 2021" ] }, { "Derivatives designated as accounting hedges | Foreign exchange contracts": [ " ", " " ] }, { "Derivative [Line Items]": [ " ", " " ] } ], "Financial Instruments - Gross F": [ { "Financial Instruments - Gross Fair Values of Derivative Assets and Liabilities (Details) - Level 2 $ in Millions": [ "Sep. 24, 2022 USD ($)" ] }, { "Other current assets and other non-current assets | Foreign exchange contracts": [ " " ] }, { "Derivative assets:": [ " " ] } ], "Financial Instruments - Derivat": [ { "Financial Instruments - Derivative Instruments Designated as Fair Value Hedges and Related Hedged Items (Details) - USD ($) $ in Millions": [ "Sep. 24, 2022", "Sep. 25, 2021" ] }, { "Current and non-current marketable securities": [ " ", " " ] }, { "Derivatives, Fair Value [Line Items]": [ " ", " " ] } ], "Consolidated Financial Statem_3": [ { "Consolidated Financial Statement Details - Property, Plant and Equipment, Net (Details) - USD ($) $ in Millions": [ "Sep. 24, 2022", "Sep. 25, 2021" ] }, { "Property, Plant and Equipment [Line Items]": [ " ", " " ] }, { "Gross property, plant and equipment": [ 114457, 109723 ] } ], "Consolidated Financial Statem_4": [ { "Consolidated Financial Statement Details - Other Non-Current Liabilities (Details) - USD ($) $ in Millions": [ "Sep. 24, 2022", "Sep. 25, 2021" ] }, { "Organization, Consolidation and Presentation of Financial Statements [Abstract]": [ " ", " " ] }, { "Long-term taxes payable": [ 16657, 24689 ] } ], "Consolidated Financial Statem_5": [ { "Consolidated Financial Statement Details - Other Income/(Expense), Net (Details) - USD ($) $ in Millions": [ "12 Months Ended" ] }, { "items": [ "Sep. 24, 2022", "Sep. 25, 2021", "Sep. 26, 2020" ] }, { "Organization, Consolidation and Presentation of Financial Statements [Abstract]": [ " ", " ", " " ] } ], "Income Taxes - Provision for In": [ { "Income Taxes - Provision for Income Taxes (Details) - USD ($) $ in Millions": [ "12 Months Ended" ] }, { "items": [ "Sep. 24, 2022", "Sep. 25, 2021", "Sep. 26, 2020" ] }, { "Federal:": [ " ", " ", " " ] } ], "Income Taxes - Additional Infor": [ { "Income Taxes - Additional Information (Details) $ in Millions, € in Billions": [ null, "12 Months Ended" ] }, { "items": [ "Aug. 30, 2016 EUR (€) Subsidiary", "Sep. 24, 2022 USD ($)", "Sep. 25, 2021 USD ($)", "Sep. 26, 2020 USD ($)", "Sep. 24, 2022 EUR (€)", "Sep. 28, 2019 USD ($)" ] }, { "Income Tax Contingency [Line Items]": [ " ", " ", " ", " ", " ", " " ] } ], "Income Taxes - Reconciliation o": [ { "Income Taxes - Reconciliation of Provision for Income Taxes to Amount Computed by Applying the Statutory Federal Income Tax Rate to Income Before Provision for Income Taxes (Details) - USD ($) $ in Millions": [ "12 Months Ended" ] }, { "items": [ "Sep. 24, 2022", "Sep. 25, 2021", "Sep. 26, 2020" ] }, { "Income Tax Disclosure [Abstract]": [ " ", " ", " " ] } ], "Income Taxes - Significant Comp": [ { "Income Taxes - Significant Components of Deferred Tax Assets and Liabilities (Details) - USD ($) $ in Millions": [ "Sep. 24, 2022", "Sep. 25, 2021" ] }, { "Deferred tax assets:": [ " ", " " ] }, { "Amortization and depreciation": [ 1496, 5575 ] } ], "Income Taxes - Aggregate Change": [ { "Income Taxes - Aggregate Changes in Gross Unrecognized Tax Benefits (Details) - USD ($) $ in Millions": [ "12 Months Ended" ] }, { "items": [ "Sep. 24, 2022", "Sep. 25, 2021", "Sep. 26, 2020" ] }, { "Reconciliation of Unrecognized Tax Benefits, Excluding Amounts Pertaining to Examined Tax Returns [Roll Forward]": [ " ", " ", " " ] } ], "Leases - Additional Information": [ { "Leases - Additional Information (Details) - USD ($) $ in Billions": [ "12 Months Ended" ] }, { "items": [ "Sep. 24, 2022", "Sep. 25, 2021", "Sep. 26, 2020" ] }, { "Lessee, Lease, Description [Line Items]": [ " ", " ", " " ] } ], "Leases - ROU Assets and Lease L": [ { "Leases - ROU Assets and Lease Liabilities (Details) - USD ($) $ in Millions": [ "Sep. 24, 2022", "Sep. 25, 2021" ] }, { "Lease-Related Assets and Liabilities": [ " ", " " ] }, { "Operating lease right-of-use assets": [ 10417, 10087 ] } ], "Leases - Lease Liability Maturi": [ { "Leases - Lease Liability Maturities (Details) - USD ($) $ in Millions": [ "Sep. 24, 2022", "Sep. 25, 2021" ] }, { "Operating Leases": [ " ", " " ] }, { "2023": [ 1758, " " ] } ], "Debt - Additional Information (": [ { "Debt - Additional Information (Details) - USD ($) $ in Millions": [ "12 Months Ended" ] }, { "items": [ "Sep. 24, 2022", "Sep. 25, 2021", "Sep. 26, 2020" ] }, { "Debt Instrument [Line Items]": [ " ", " ", " " ] } ], "Debt - Summary of Cash Flows As": [ { "Debt - Summary of Cash Flows Associated with Commercial Paper (Details) - USD ($) $ in Millions": [ "12 Months Ended" ] }, { "items": [ "Sep. 24, 2022", "Sep. 25, 2021", "Sep. 26, 2020" ] }, { "Maturities 90 days or less:": [ " ", " ", " " ] } ], "Debt - Summary of Term Debt (De": [ { "Debt - Summary of Term Debt (Details) - USD ($) $ in Millions": [ "12 Months Ended" ] }, { "items": [ "Sep. 24, 2022", "Sep. 25, 2021" ] }, { "Debt Instrument [Line Items]": [ " ", " " ] } ], "Debt - Future Principal Payment": [ { "Debt - Future Principal Payments for Term Debt (Details) - USD ($) $ in Millions": [ "Sep. 24, 2022", "Sep. 25, 2021" ] }, { "Debt Disclosure [Abstract]": [ " ", " " ] }, { "2023": [ 11139, " " ] } ], "Shareholders' Equity - Addition": [ { "Shareholders' Equity - Additional Information (Details) shares in Millions, $ in Billions": [ "12 Months Ended" ] }, { "items": [ "Sep. 24, 2022 USD ($) shares" ] }, { "Stockholders' Equity Note [Abstract]": [ " " ] } ], "Shareholders' Equity - Shares o": [ { "Shareholders' Equity - Shares of Common Stock (Details) - shares shares in Thousands": [ "12 Months Ended" ] }, { "items": [ "Sep. 24, 2022", "Sep. 25, 2021", "Sep. 26, 2020" ] }, { "Increase (Decrease) in Shares of Common Stock Outstanding [Roll Forward]": [ " ", " ", " " ] } ], "Benefit Plans - Additional Info": [ { "Benefit Plans - Additional Information (Details) shares in Millions": [ "12 Months Ended" ] }, { "items": [ "Sep. 24, 2022 USD ($) shares", "Sep. 25, 2021 USD ($) shares", "Sep. 26, 2020 USD ($) shares", "Mar. 04, 2022 shares", "Nov. 09, 2021 shares", "Mar. 10, 2015 shares" ] }, { "Share-based Compensation Arrangement by Share-based Payment Award [Line Items]": [ " ", " ", " ", " ", " ", " " ] } ], "Benefit Plans - Restricted Stoc": [ { "Benefit Plans - Restricted Stock Units Activity and Related Information (Details) - Restricted stock units - USD ($) $ / shares in Units, shares in Thousands, $ in Millions": [ "12 Months Ended" ] }, { "items": [ "Sep. 24, 2022", "Sep. 25, 2021", "Sep. 26, 2020" ] }, { "Number of Restricted Stock Units": [ " ", " ", " " ] } ], "Benefit Plans - Summary of Shar": [ { "Benefit Plans - Summary of Share-Based Compensation Expense and the Related Income Tax Benefit (Details) - USD ($) $ in Millions": [ "12 Months Ended" ] }, { "items": [ "Sep. 24, 2022", "Sep. 25, 2021", "Sep. 26, 2020" ] }, { "Share-Based Payment Arrangement [Abstract]": [ " ", " ", " " ] } ], "Commitments and Contingencies -": [ { "Commitments and Contingencies - Future Payments Under Unconditional Purchase Obligations (Details) $ in Millions": [ "Sep. 24, 2022 USD ($)" ] }, { "Unconditional Purchase Obligation, Fiscal Year Maturity [Abstract]": [ " " ] }, { "2023": [ 13488 ] } ], "Segment Information and Geogr_3": [ { "Segment Information and Geographic Data - Information by Reportable Segment (Details) - USD ($) $ in Millions": [ "12 Months Ended" ] }, { "items": [ "Sep. 24, 2022", "Sep. 25, 2021", "Sep. 26, 2020" ] }, { "Segment Reporting Information [Line Items]": [ " ", " ", " " ] } ], "Segment Information and Geogr_4": [ { "Segment Information and Geographic Data - Reconciliation of Segment Operating Income to the Consolidated Statements of Operations (Details) - USD ($) $ in Millions": [ "12 Months Ended" ] }, { "items": [ "Sep. 24, 2022", "Sep. 25, 2021", "Sep. 26, 2020" ] }, { "Segment Reporting, Reconciling Item for Operating Profit (Loss) from Segment to Consolidated [Line Items]": [ " ", " ", " " ] } ], "Segment Information and Geogr_5": [ { "Segment Information and Geographic Data - Net Sales (Details) - USD ($) $ in Millions": [ "12 Months Ended" ] }, { "items": [ "Sep. 24, 2022", "Sep. 25, 2021", "Sep. 26, 2020" ] }, { "Revenues from External Customers and Long-Lived Assets [Line Items]": [ " ", " ", " " ] } ], "Segment Information and Geogr_6": [ { "Segment Information and Geographic Data - Long-Lived Assets (Details) - USD ($) $ in Millions": [ "Sep. 24, 2022", "Sep. 25, 2021" ] }, { "Revenues from External Customers and Long-Lived Assets [Line Items]": [ " ", " " ] }, { "Long-lived assets": [ 42117, 39440 ] } ] } ]`

[Financial Reports Form 10-K XLSX API](/developer/docs/stable/financial-reports-form-10-k-xlsx)

Download detailed 10-K reports in XLSX format with the Financial Reports Form 10-K XLSX API. Effortlessly access and analyze annual financial data for companies in a spreadsheet-friendly format.

Endpoint:

<https://financialmodelingprep.com/stable/financial-reports-xlsx?symbol\=AAPL&year\=2022&period\=FY>

Parameters:

Parameter Type Example
symbol\* string AAPL
year\* number 2022
period\* string Q1,Q2,Q3,Q4,FY

(\*) Required

#### Response

`[ { "symbol": "AAPL", "period": "FY", "year": "2022", "Cover Page": [ { "Cover Page - USD ($) shares in Thousands, $ in Millions": [ "12 Months Ended" ] }, { "items": [ "Sep. 24, 2022", "Oct. 14, 2022", "Mar. 25, 2022" ] }, { "Entity Information [Line Items]": [ " ", " ", " " ] } ], "Auditor Information": [ { "Auditor Information": [ "12 Months Ended" ] }, { "items": [ "Sep. 24, 2022" ] }, { "Auditor Information [Abstract]": [ " " ] } ], "CONSOLIDATED STATEMENTS OF OPER": [ { "CONSOLIDATED STATEMENTS OF OPERATIONS - USD ($) shares in Thousands, $ in Millions": [ "12 Months Ended" ] }, { "items": [ "Sep. 24, 2022", "Sep. 25, 2021", "Sep. 26, 2020" ] }, { "Net sales": [ 394328, 365817, 274515 ] } ], "CONSOLIDATED STATEMENTS OF COMP": [ { "CONSOLIDATED STATEMENTS OF COMPREHENSIVE INCOME - USD ($) $ in Millions": [ "12 Months Ended" ] }, { "items": [ "Sep. 24, 2022", "Sep. 25, 2021", "Sep. 26, 2020" ] }, { "Statement of Comprehensive Income [Abstract]": [ " ", " ", " " ] } ], "CONSOLIDATED BALANCE SHEETS": [ { "CONSOLIDATED BALANCE SHEETS - USD ($) $ in Millions": [ "Sep. 24, 2022", "Sep. 25, 2021" ] }, { "Current assets:": [ " ", " " ] }, { "Cash and cash equivalents": [ 23646, 34940 ] } ], "CONSOLIDATED BALANCE SHEETS (Pa": [ { "CONSOLIDATED BALANCE SHEETS (Parenthetical) - $ / shares": [ "Sep. 24, 2022", "Sep. 25, 2021" ] }, { "Statement of Financial Position [Abstract]": [ " ", " " ] }, { "Common stock, par value (in dollars per share)": [ 0.00001, 0.00001 ] } ], "CONSOLIDATED STATEMENTS OF SHAR": [ { "CONSOLIDATED STATEMENTS OF SHAREHOLDERS' EQUITY - USD ($) $ in Millions": [ "Total", "Common stock and additional paid-in capital", "Retained earnings/(Accumulated deficit)", "Retained earnings/(Accumulated deficit) Cumulative effect of change in accounting principle", "Accumulated other comprehensive income/(loss)", "Accumulated other comprehensive income/(loss) Cumulative effect of change in accounting principle" ] }, { "Beginning balances at Sep. 28, 2019": [ 90488, 45174, 45898, -136, -584, 136 ] }, { "Increase (Decrease) in Stockholders' Equity [Roll Forward]": [ " ", " ", " ", " ", " ", " " ] } ], "CONSOLIDATED STATEMENTS OF CASH": [ { "CONSOLIDATED STATEMENTS OF CASH FLOWS - USD ($) $ in Millions": [ "12 Months Ended" ] }, { "items": [ "Sep. 24, 2022", "Sep. 25, 2021", "Sep. 26, 2020" ] }, { "Statement of Cash Flows [Abstract]": [ " ", " ", " " ] } ], "Summary of Significant Accounti": [ { "Summary of Significant Accounting Policies": [ "12 Months Ended" ] }, { "items": [ "Sep. 24, 2022" ] }, { "Accounting Policies [Abstract]": [ " " ] } ], "Revenue": [ { "Revenue": [ "12 Months Ended" ] }, { "items": [ "Sep. 24, 2022" ] }, { "Revenue from Contract with Customer [Abstract]": [ " " ] } ], "Financial Instruments": [ { "Financial Instruments": [ "12 Months Ended" ] }, { "items": [ "Sep. 24, 2022" ] }, { "Investments, All Other Investments [Abstract]": [ " " ] } ], "Consolidated Financial Statemen": [ { "Consolidated Financial Statement Details": [ "12 Months Ended" ] }, { "items": [ "Sep. 24, 2022" ] }, { "Organization, Consolidation and Presentation of Financial Statements [Abstract]": [ " " ] } ], "Income Taxes": [ { "Income Taxes": [ "12 Months Ended" ] }, { "items": [ "Sep. 24, 2022" ] }, { "Income Tax Disclosure [Abstract]": [ " " ] } ], "Leases": [ { "Leases": [ "12 Months Ended" ] }, { "items": [ "Sep. 24, 2022" ] }, { "Leases [Abstract]": [ " " ] } ], "Debt": [ { "Debt": [ "12 Months Ended" ] }, { "items": [ "Sep. 24, 2022" ] }, { "Debt Disclosure [Abstract]": [ " " ] } ], "Shareholders' Equity": [ { "Shareholders' Equity": [ "12 Months Ended" ] }, { "items": [ "Sep. 24, 2022" ] }, { "Equity [Abstract]": [ " " ] } ], "Benefit Plans": [ { "Benefit Plans": [ "12 Months Ended" ] }, { "items": [ "Sep. 24, 2022" ] }, { "Share-Based Payment Arrangement [Abstract]": [ " " ] } ], "Commitments and Contingencies": [ { "Commitments and Contingencies": [ "12 Months Ended" ] }, { "items": [ "Sep. 24, 2022" ] }, { "Commitments and Contingencies Disclosure [Abstract]": [ " " ] } ], "Segment Information and Geograp": [ { "Segment Information and Geographic Data": [ "12 Months Ended" ] }, { "items": [ "Sep. 24, 2022" ] }, { "Segment Reporting [Abstract]": [ " " ] } ], "Summary of Significant Accoun_2": [ { "Summary of Significant Accounting Policies (Policies)": [ "12 Months Ended" ] }, { "items": [ "Sep. 24, 2022" ] }, { "Accounting Policies [Abstract]": [ " " ] } ], "Summary of Significant Accoun_3": [ { "Summary of Significant Accounting Policies (Tables)": [ "12 Months Ended" ] }, { "items": [ "Sep. 24, 2022" ] }, { "Accounting Policies [Abstract]": [ " " ] } ], "Revenue (Tables)": [ { "Revenue (Tables)": [ "12 Months Ended" ] }, { "items": [ "Sep. 24, 2022" ] }, { "Revenue from Contract with Customer [Abstract]": [ " " ] } ], "Financial Instruments (Tables)": [ { "Financial Instruments (Tables)": [ "12 Months Ended" ] }, { "items": [ "Sep. 24, 2022" ] }, { "Investments, All Other Investments [Abstract]": [ " " ] } ], "Consolidated Financial Statem_2": [ { "Consolidated Financial Statement Details (Tables)": [ "12 Months Ended" ] }, { "items": [ "Sep. 24, 2022" ] }, { "Organization, Consolidation and Presentation of Financial Statements [Abstract]": [ " " ] } ], "Income Taxes (Tables)": [ { "Income Taxes (Tables)": [ "12 Months Ended" ] }, { "items": [ "Sep. 24, 2022" ] }, { "Income Tax Disclosure [Abstract]": [ " " ] } ], "Leases (Tables)": [ { "Leases (Tables)": [ "12 Months Ended" ] }, { "items": [ "Sep. 24, 2022" ] }, { "Leases [Abstract]": [ " " ] } ], "Debt (Tables)": [ { "Debt (Tables)": [ "12 Months Ended" ] }, { "items": [ "Sep. 24, 2022" ] }, { "Debt Disclosure [Abstract]": [ " " ] } ], "Shareholders' Equity (Tables)": [ { "Shareholders' Equity (Tables)": [ "12 Months Ended" ] }, { "items": [ "Sep. 24, 2022" ] }, { "Equity [Abstract]": [ " " ] } ], "Benefit Plans (Tables)": [ { "Benefit Plans (Tables)": [ "12 Months Ended" ] }, { "items": [ "Sep. 24, 2022" ] }, { "Share-Based Payment Arrangement [Abstract]": [ " " ] } ], "Commitments and Contingencies (": [ { "Commitments and Contingencies (Tables)": [ "12 Months Ended" ] }, { "items": [ "Sep. 24, 2022" ] }, { "Commitments and Contingencies Disclosure [Abstract]": [ " " ] } ], "Segment Information and Geogr_2": [ { "Segment Information and Geographic Data (Tables)": [ "12 Months Ended" ] }, { "items": [ "Sep. 24, 2022" ] }, { "Segment Reporting [Abstract]": [ " " ] } ], "Summary of Significant Accoun_4": [ { "Summary of Significant Accounting Policies - Additional Information (Details) $ in Billions": [ "12 Months Ended" ] }, { "items": [ "Sep. 24, 2022 USD ($) performanceObligation", "Sep. 25, 2021 USD ($)", "Sep. 26, 2020 USD ($)" ] }, { "Significant Accounting Policies [Line Items]": [ " ", " ", " " ] } ], "Summary of Significant Accoun_5": [ { "Summary of Significant Accounting Policies - Computation of Basic and Diluted Earnings Per Share (Details) - USD ($) $ / shares in Units, shares in Thousands, $ in Millions": [ "12 Months Ended" ] }, { "items": [ "Sep. 24, 2022", "Sep. 25, 2021", "Sep. 26, 2020" ] }, { "Numerator:": [ " ", " ", " " ] } ], "Revenue - Net Sales Disaggregat": [ { "Revenue - Net Sales Disaggregated by Significant Products and Services (Details) - USD ($) $ in Millions": [ "12 Months Ended" ] }, { "items": [ "Sep. 24, 2022", "Sep. 25, 2021", "Sep. 26, 2020" ] }, { "Disaggregation of Revenue [Line Items]": [ " ", " ", " " ] } ], "Revenue - Additional Informatio": [ { "Revenue - Additional Information (Details) - USD ($) $ in Billions": [ "Sep. 24, 2022", "Sep. 25, 2021" ] }, { "Revenue from Contract with Customer [Abstract]": [ " ", " " ] }, { "Total deferred revenue": [ 12.4, 11.9 ] } ], "Revenue - Deferred Revenue, Exp": [ { "Revenue - Deferred Revenue, Expected Timing of Realization (Details)": [ "Sep. 24, 2022" ] }, { "Revenue, Remaining Performance Obligation, Expected Timing of Satisfaction, Start Date [Axis]: 2022-09-25": [ " " ] }, { "Revenue, Remaining Performance Obligation, Expected Timing of Satisfaction [Line Items]": [ " " ] } ], "Financial Instruments - Cash, C": [ { "Financial Instruments - Cash, Cash Equivalents and Marketable Securities (Details) - USD ($) $ in Millions": [ "Sep. 24, 2022", "Sep. 25, 2021" ] }, { "Debt Securities, Available-for-sale [Line Items]": [ " ", " " ] }, { "Cash, Cash Equivalents and Marketable Securities, Adjusted Cost": [ 183061, 189961 ] } ], "Financial Instruments - Non-Cur": [ { "Financial Instruments - Non-Current Marketable Debt Securities by Contractual Maturity (Details) $ in Millions": [ "Sep. 24, 2022 USD ($)" ] }, { "Fair value of non-current marketable debt securities by contractual maturity": [ " " ] }, { "Due after 1 year through 5 years": [ 87031 ] } ], "Financial Instruments - Additio": [ { "Financial Instruments - Additional Information (Details) $ in Millions": [ "12 Months Ended" ] }, { "items": [ "Sep. 24, 2022 USD ($) Customer Vendor", "Sep. 25, 2021 Vendor" ] }, { "Financial Instruments [Line Items]": [ " ", " " ] } ], "Financial Instruments - Notiona": [ { "Financial Instruments - Notional Amounts Associated with Derivative Instruments (Details) - USD ($) $ in Millions": [ "Sep. 24, 2022", "Sep. 25, 2021" ] }, { "Derivatives designated as accounting hedges | Foreign exchange contracts": [ " ", " " ] }, { "Derivative [Line Items]": [ " ", " " ] } ], "Financial Instruments - Gross F": [ { "Financial Instruments - Gross Fair Values of Derivative Assets and Liabilities (Details) - Level 2 $ in Millions": [ "Sep. 24, 2022 USD ($)" ] }, { "Other current assets and other non-current assets | Foreign exchange contracts": [ " " ] }, { "Derivative assets:": [ " " ] } ], "Financial Instruments - Derivat": [ { "Financial Instruments - Derivative Instruments Designated as Fair Value Hedges and Related Hedged Items (Details) - USD ($) $ in Millions": [ "Sep. 24, 2022", "Sep. 25, 2021" ] }, { "Current and non-current marketable securities": [ " ", " " ] }, { "Derivatives, Fair Value [Line Items]": [ " ", " " ] } ], "Consolidated Financial Statem_3": [ { "Consolidated Financial Statement Details - Property, Plant and Equipment, Net (Details) - USD ($) $ in Millions": [ "Sep. 24, 2022", "Sep. 25, 2021" ] }, { "Property, Plant and Equipment [Line Items]": [ " ", " " ] }, { "Gross property, plant and equipment": [ 114457, 109723 ] } ], "Consolidated Financial Statem_4": [ { "Consolidated Financial Statement Details - Other Non-Current Liabilities (Details) - USD ($) $ in Millions": [ "Sep. 24, 2022", "Sep. 25, 2021" ] }, { "Organization, Consolidation and Presentation of Financial Statements [Abstract]": [ " ", " " ] }, { "Long-term taxes payable": [ 16657, 24689 ] } ], "Consolidated Financial Statem_5": [ { "Consolidated Financial Statement Details - Other Income/(Expense), Net (Details) - USD ($) $ in Millions": [ "12 Months Ended" ] }, { "items": [ "Sep. 24, 2022", "Sep. 25, 2021", "Sep. 26, 2020" ] }, { "Organization, Consolidation and Presentation of Financial Statements [Abstract]": [ " ", " ", " " ] } ], "Income Taxes - Provision for In": [ { "Income Taxes - Provision for Income Taxes (Details) - USD ($) $ in Millions": [ "12 Months Ended" ] }, { "items": [ "Sep. 24, 2022", "Sep. 25, 2021", "Sep. 26, 2020" ] }, { "Federal:": [ " ", " ", " " ] } ], "Income Taxes - Additional Infor": [ { "Income Taxes - Additional Information (Details) $ in Millions, € in Billions": [ null, "12 Months Ended" ] }, { "items": [ "Aug. 30, 2016 EUR (€) Subsidiary", "Sep. 24, 2022 USD ($)", "Sep. 25, 2021 USD ($)", "Sep. 26, 2020 USD ($)", "Sep. 24, 2022 EUR (€)", "Sep. 28, 2019 USD ($)" ] }, { "Income Tax Contingency [Line Items]": [ " ", " ", " ", " ", " ", " " ] } ], "Income Taxes - Reconciliation o": [ { "Income Taxes - Reconciliation of Provision for Income Taxes to Amount Computed by Applying the Statutory Federal Income Tax Rate to Income Before Provision for Income Taxes (Details) - USD ($) $ in Millions": [ "12 Months Ended" ] }, { "items": [ "Sep. 24, 2022", "Sep. 25, 2021", "Sep. 26, 2020" ] }, { "Income Tax Disclosure [Abstract]": [ " ", " ", " " ] } ], "Income Taxes - Significant Comp": [ { "Income Taxes - Significant Components of Deferred Tax Assets and Liabilities (Details) - USD ($) $ in Millions": [ "Sep. 24, 2022", "Sep. 25, 2021" ] }, { "Deferred tax assets:": [ " ", " " ] }, { "Amortization and depreciation": [ 1496, 5575 ] } ], "Income Taxes - Aggregate Change": [ { "Income Taxes - Aggregate Changes in Gross Unrecognized Tax Benefits (Details) - USD ($) $ in Millions": [ "12 Months Ended" ] }, { "items": [ "Sep. 24, 2022", "Sep. 25, 2021", "Sep. 26, 2020" ] }, { "Reconciliation of Unrecognized Tax Benefits, Excluding Amounts Pertaining to Examined Tax Returns [Roll Forward]": [ " ", " ", " " ] } ], "Leases - Additional Information": [ { "Leases - Additional Information (Details) - USD ($) $ in Billions": [ "12 Months Ended" ] }, { "items": [ "Sep. 24, 2022", "Sep. 25, 2021", "Sep. 26, 2020" ] }, { "Lessee, Lease, Description [Line Items]": [ " ", " ", " " ] } ], "Leases - ROU Assets and Lease L": [ { "Leases - ROU Assets and Lease Liabilities (Details) - USD ($) $ in Millions": [ "Sep. 24, 2022", "Sep. 25, 2021" ] }, { "Lease-Related Assets and Liabilities": [ " ", " " ] }, { "Operating lease right-of-use assets": [ 10417, 10087 ] } ], "Leases - Lease Liability Maturi": [ { "Leases - Lease Liability Maturities (Details) - USD ($) $ in Millions": [ "Sep. 24, 2022", "Sep. 25, 2021" ] }, { "Operating Leases": [ " ", " " ] }, { "2023": [ 1758, " " ] } ], "Debt - Additional Information (": [ { "Debt - Additional Information (Details) - USD ($) $ in Millions": [ "12 Months Ended" ] }, { "items": [ "Sep. 24, 2022", "Sep. 25, 2021", "Sep. 26, 2020" ] }, { "Debt Instrument [Line Items]": [ " ", " ", " " ] } ], "Debt - Summary of Cash Flows As": [ { "Debt - Summary of Cash Flows Associated with Commercial Paper (Details) - USD ($) $ in Millions": [ "12 Months Ended" ] }, { "items": [ "Sep. 24, 2022", "Sep. 25, 2021", "Sep. 26, 2020" ] }, { "Maturities 90 days or less:": [ " ", " ", " " ] } ], "Debt - Summary of Term Debt (De": [ { "Debt - Summary of Term Debt (Details) - USD ($) $ in Millions": [ "12 Months Ended" ] }, { "items": [ "Sep. 24, 2022", "Sep. 25, 2021" ] }, { "Debt Instrument [Line Items]": [ " ", " " ] } ], "Debt - Future Principal Payment": [ { "Debt - Future Principal Payments for Term Debt (Details) - USD ($) $ in Millions": [ "Sep. 24, 2022", "Sep. 25, 2021" ] }, { "Debt Disclosure [Abstract]": [ " ", " " ] }, { "2023": [ 11139, " " ] } ], "Shareholders' Equity - Addition": [ { "Shareholders' Equity - Additional Information (Details) shares in Millions, $ in Billions": [ "12 Months Ended" ] }, { "items": [ "Sep. 24, 2022 USD ($) shares" ] }, { "Stockholders' Equity Note [Abstract]": [ " " ] } ], "Shareholders' Equity - Shares o": [ { "Shareholders' Equity - Shares of Common Stock (Details) - shares shares in Thousands": [ "12 Months Ended" ] }, { "items": [ "Sep. 24, 2022", "Sep. 25, 2021", "Sep. 26, 2020" ] }, { "Increase (Decrease) in Shares of Common Stock Outstanding [Roll Forward]": [ " ", " ", " " ] } ], "Benefit Plans - Additional Info": [ { "Benefit Plans - Additional Information (Details) shares in Millions": [ "12 Months Ended" ] }, { "items": [ "Sep. 24, 2022 USD ($) shares", "Sep. 25, 2021 USD ($) shares", "Sep. 26, 2020 USD ($) shares", "Mar. 04, 2022 shares", "Nov. 09, 2021 shares", "Mar. 10, 2015 shares" ] }, { "Share-based Compensation Arrangement by Share-based Payment Award [Line Items]": [ " ", " ", " ", " ", " ", " " ] } ], "Benefit Plans - Restricted Stoc": [ { "Benefit Plans - Restricted Stock Units Activity and Related Information (Details) - Restricted stock units - USD ($) $ / shares in Units, shares in Thousands, $ in Millions": [ "12 Months Ended" ] }, { "items": [ "Sep. 24, 2022", "Sep. 25, 2021", "Sep. 26, 2020" ] }, { "Number of Restricted Stock Units": [ " ", " ", " " ] } ], "Benefit Plans - Summary of Shar": [ { "Benefit Plans - Summary of Share-Based Compensation Expense and the Related Income Tax Benefit (Details) - USD ($) $ in Millions": [ "12 Months Ended" ] }, { "items": [ "Sep. 24, 2022", "Sep. 25, 2021", "Sep. 26, 2020" ] }, { "Share-Based Payment Arrangement [Abstract]": [ " ", " ", " " ] } ], "Commitments and Contingencies -": [ { "Commitments and Contingencies - Future Payments Under Unconditional Purchase Obligations (Details) $ in Millions": [ "Sep. 24, 2022 USD ($)" ] }, { "Unconditional Purchase Obligation, Fiscal Year Maturity [Abstract]": [ " " ] }, { "2023": [ 13488 ] } ], "Segment Information and Geogr_3": [ { "Segment Information and Geographic Data - Information by Reportable Segment (Details) - USD ($) $ in Millions": [ "12 Months Ended" ] }, { "items": [ "Sep. 24, 2022", "Sep. 25, 2021", "Sep. 26, 2020" ] }, { "Segment Reporting Information [Line Items]": [ " ", " ", " " ] } ], "Segment Information and Geogr_4": [ { "Segment Information and Geographic Data - Reconciliation of Segment Operating Income to the Consolidated Statements of Operations (Details) - USD ($) $ in Millions": [ "12 Months Ended" ] }, { "items": [ "Sep. 24, 2022", "Sep. 25, 2021", "Sep. 26, 2020" ] }, { "Segment Reporting, Reconciling Item for Operating Profit (Loss) from Segment to Consolidated [Line Items]": [ " ", " ", " " ] } ], "Segment Information and Geogr_5": [ { "Segment Information and Geographic Data - Net Sales (Details) - USD ($) $ in Millions": [ "12 Months Ended" ] }, { "items": [ "Sep. 24, 2022", "Sep. 25, 2021", "Sep. 26, 2020" ] }, { "Revenues from External Customers and Long-Lived Assets [Line Items]": [ " ", " ", " " ] } ], "Segment Information and Geogr_6": [ { "Segment Information and Geographic Data - Long-Lived Assets (Details) - USD ($) $ in Millions": [ "Sep. 24, 2022", "Sep. 25, 2021" ] }, { "Revenues from External Customers and Long-Lived Assets [Line Items]": [ " ", " " ] }, { "Long-lived assets": [ 42117, 39440 ] } ] } ]`

[Revenue Product Segmentation API](/developer/docs/stable/revenue-product-segmentation)

Access detailed revenue breakdowns by product line with the Revenue Product Segmentation API. Understand which products drive a company's earnings and get insights into the performance of individual product segments.

Endpoint:

<https://financialmodelingprep.com/stable/revenue-product-segmentation?symbol\=AAPL>

Parameters:

Parameter Type Example
symbol\* string AAPL
period string annual,quarter
structure string flat

(\*) Required | Maximum 1000 records per request | Currency is as Reported in Financials

#### Response

`[ { "symbol": "AAPL", "fiscalYear": 2024, "period": "FY", "reportedCurrency": null, "date": "2024-09-28", "data": { "Mac": 29984000000, "Service": 96169000000, "Wearables, Home and Accessories": 37005000000, "iPad": 26694000000, "iPhone": 201183000000 } } ]`

[Revenue Geographic Segments API](/developer/docs/stable/revenue-geographic-segments)

Access detailed revenue breakdowns by geographic region with the Revenue Geographic Segments API. Analyze how different regions contribute to a company’s total revenue and identify key markets for growth.

Endpoint:

<https://financialmodelingprep.com/stable/revenue-geographic-segmentation?symbol\=AAPL>

Parameters:

Parameter Type Example
symbol\* string AAPL
period string annual,quarter
structure string flat

(\*) Required | Maximum 1000 records per request | Currency is as Reported in Financials

#### Response

`[ { "symbol": "AAPL", "fiscalYear": 2024, "period": "FY", "reportedCurrency": null, "date": "2024-09-28", "data": { "Americas Segment": 167045000000, "Europe Segment": 101328000000, "Greater China Segment": 66952000000, "Japan Segment": 25052000000, "Rest of Asia Pacific": 30658000000 } } ]`

[As Reported Income Statements API](/developer/docs/stable/as-reported-income-statements)

Retrieve income statements as they were reported by the company with the As Reported Income Statements API. Access raw financial data directly from official company filings, including revenue, expenses, and net income.

Endpoint:

<https://financialmodelingprep.com/stable/income-statement-as-reported?symbol\=AAPL>

Parameters:

Parameter Type Example
symbol\* string AAPL
limit number 5
period string annual,quarter

(\*) Required | Maximum 1000 records per request | Currency is as Reported in Financials

#### Response

`[ { "symbol": "AAPL", "fiscalYear": 2024, "period": "FY", "reportedCurrency": null, "date": "2024-09-27", "data": { "revenuefromcontractwithcustomerexcludingassessedtax": 391035000000, "costofgoodsandservicessold": 210352000000, "grossprofit": 180683000000, "researchanddevelopmentexpense": 31370000000, "sellinggeneralandadministrativeexpense": 26097000000, "operatingexpenses": 57467000000, "operatingincomeloss": 123216000000, "nonoperatingincomeexpense": 269000000, "incomelossfromcontinuingoperationsbeforeincometaxesextraordinaryitemsnoncontrollinginterest": 123485000000, "incometaxexpensebenefit": 29749000000, "netincomeloss": 93736000000, "earningspersharebasic": 6.11, "earningspersharediluted": 6.08, "weightedaveragenumberofsharesoutstandingbasic": 15343783000, "weightedaveragenumberofdilutedsharesoutstanding": 15408095000, "othercomprehensiveincomelossforeigncurrencytransactionandtranslationadjustmentnetoftax": 395000000, "othercomprehensiveincomelossderivativeinstrumentgainlossbeforereclassificationaftertax": -832000000, "othercomprehensiveincomelossderivativeinstrumentgainlossreclassificationaftertax": 1337000000, "othercomprehensiveincomelossderivativeinstrumentgainlossafterreclassificationandtax": -2169000000, "othercomprehensiveincomeunrealizedholdinggainlossonsecuritiesarisingduringperiodnetoftax": 5850000000, "othercomprehensiveincomelossreclassificationadjustmentfromaociforsaleofsecuritiesnetoftax": -204000000, "othercomprehensiveincomelossavailableforsalesecuritiesadjustmentnetoftax": 6054000000, "othercomprehensiveincomelossnetoftaxportionattributabletoparent": 4280000000, "comprehensiveincomenetoftax": 98016000000 } } ]`

[As Reported Balance Statements API](/developer/docs/stable/as-reported-balance-statements)

Access balance sheets as reported by the company with the As Reported Balance Statements API. View detailed financial data on assets, liabilities, and equity directly from official filings.

Endpoint:

<https://financialmodelingprep.com/stable/balance-sheet-statement-as-reported?symbol\=AAPL>

Parameters:

Parameter Type Example
symbol\* string AAPL
limit number 5
period string annual,quarter

(\*) Required | Maximum 1000 records per request | Currency is as Reported in Financials

#### Response

`[ { "symbol": "AAPL", "fiscalYear": 2024, "period": "FY", "reportedCurrency": null, "date": "2024-09-27", "data": { "cashandcashequivalentsatcarryingvalue": 29943000000, "marketablesecuritiescurrent": 35228000000, "accountsreceivablenetcurrent": 33410000000, "nontradereceivablescurrent": 32833000000, "inventorynet": 7286000000, "otherassetscurrent": 14287000000, "assetscurrent": 152987000000, "marketablesecuritiesnoncurrent": 91479000000, "propertyplantandequipmentnet": 45680000000, "otherassetsnoncurrent": 74834000000, "assetsnoncurrent": 211993000000, "assets": 364980000000, "accountspayablecurrent": 68960000000, "otherliabilitiescurrent": 78304000000, "contractwithcustomerliabilitycurrent": 8249000000, "commercialpaper": 10000000000, "longtermdebtcurrent": 10912000000, "liabilitiescurrent": 176392000000, "longtermdebtnoncurrent": 85750000000, "otherliabilitiesnoncurrent": 45888000000, "liabilitiesnoncurrent": 131638000000, "liabilities": 308030000000, "commonstocksharesoutstanding": 15116786000, "commonstocksharesissued": 15116786000, "commonstocksincludingadditionalpaidincapital": 83276000000, "retainedearningsaccumulateddeficit": -19154000000, "accumulatedothercomprehensiveincomelossnetoftax": -7172000000, "stockholdersequity": 56950000000, "liabilitiesandstockholdersequity": 364980000000, "commonstockparorstatedvaluepershare": 0.00001, "commonstocksharesauthorized": 50400000000 } } ]`

[As Reported Cashflow Statements API](/developer/docs/stable/as-reported-cashflow-statements)

View cash flow statements as reported by the company with the As Reported Cash Flow Statements API. Analyze a company's cash flows related to operations, investments, and financing directly from official reports.

Endpoint:

<https://financialmodelingprep.com/stable/cash-flow-statement-as-reported?symbol\=AAPL>

Parameters:

Parameter Type Example
symbol\* string AAPL
limit number 5
period string annual,quarter

(\*) Required | Maximum 1000 records per request | Currency is as Reported in Financials

#### Response

`[ { "symbol": "AAPL", "fiscalYear": 2024, "period": "FY", "reportedCurrency": null, "date": "2024-09-27", "data": { "cashcashequivalentsrestrictedcashandrestrictedcashequivalents": 29943000000, "netincomeloss": 93736000000, "depreciationdepletionandamortization": 11445000000, "sharebasedcompensation": 11688000000, "othernoncashincomeexpense": 2266000000, "increasedecreaseinaccountsreceivable": 3788000000, "increasedecreaseinotherreceivables": 1356000000, "increasedecreaseininventories": 1046000000, "increasedecreaseinotheroperatingassets": 11731000000, "increasedecreaseinaccountspayable": 6020000000, "increasedecreaseinotheroperatingliabilities": 15552000000, "netcashprovidedbyusedinoperatingactivities": 118254000000, "paymentstoacquireavailableforsalesecuritiesdebt": 48656000000, "proceedsfrommaturitiesprepaymentsandcallsofavailableforsalesecurities": 51211000000, "proceedsfromsaleofavailableforsalesecuritiesdebt": 11135000000, "paymentstoacquirepropertyplantandequipment": 9447000000, "paymentsforproceedsfromotherinvestingactivities": 1308000000, "netcashprovidedbyusedininvestingactivities": 2935000000, "paymentsrelatedtotaxwithholdingforsharebasedcompensation": 5600000000, "paymentsofdividends": 15234000000, "paymentsforrepurchaseofcommonstock": 94949000000, "repaymentsoflongtermdebt": 9958000000, "proceedsfromrepaymentsofcommercialpaper": 3960000000, "proceedsfrompaymentsforotherfinancingactivities": -361000000, "netcashprovidedbyusedinfinancingactivities": -121983000000, "cashcashequivalentsrestrictedcashandrestrictedcashequivalentsperiodincreasedecreaseincludingexchangerateeffect": -794000000, "incometaxespaidnet": 26102000000 } } ]`

[As Reported Financial Statements API](/developer/docs/stable/as-reported-financial-statements)

Retrieve comprehensive financial statements as reported by companies with FMP As Reported Financial Statements API. Access complete data across income, balance sheet, and cash flow statements in their original form for detailed analysis.

Endpoint:

<https://financialmodelingprep.com/stable/financial-statement-full-as-reported?symbol\=AAPL>

Parameters:

Parameter Type Example
symbol\* string AAPL
limit number 5
period string annual,quarter

(\*) Required | Maximum 1000 records per request | Currency is as Reported in Financials

#### Response

`[ { "symbol": "AAPL", "fiscalYear": 2024, "period": "FY", "reportedCurrency": null, "date": "2024-09-27", "data": { "documenttype": "10-K", "documentannualreport": "true", "currentfiscalyearenddate": "--09-28", "documentperiodenddate": "2024-09-28", "documenttransitionreport": "false", "entityfilenumber": "001-36743", "entityregistrantname": "Apple Inc.", "entityincorporationstatecountrycode": "CA", "entitytaxidentificationnumber": "94-2404110", "entityaddressaddressline1": "One Apple Park Way", "entityaddresscityortown": "Cupertino", "entityaddressstateorprovince": "CA", "entityaddresspostalzipcode": 95014, "cityareacode": 408, "localphonenumber": "996-1010", "security12btitle": "3.600% Notes due 2042", "tradingsymbol": "AAPL", "notradingsymbolflag": "true", "securityexchangename": "NASDAQ", "entitywellknownseasonedissuer": "Yes", "entityvoluntaryfilers": "No", "entitycurrentreportingstatus": "Yes", "entityinteractivedatacurrent": "Yes", "entityfilercategory": "Large Accelerated Filer", "entitysmallbusiness": "false", "entityemerginggrowthcompany": "false", "icfrauditorattestationflag": "true", "documentfinstmterrorcorrectionflag": "false", "entityshellcompany": "false", "amendmentflag": "false", "documentfiscalyearfocus": 2024, "documentfiscalperiodfocus": "FY", "entitycentralindexkey": 320193, "auditorname": "Ernst & Young LLP", "auditorlocation": "San Jose, California", "auditorfirmid": 42, "revenuefromcontractwithcustomerexcludingassessedtax": 391035000000, "costofgoodsandservicessold": 210352000000, "grossprofit": 180683000000, "researchanddevelopmentexpense": 31370000000, "sellinggeneralandadministrativeexpense": 26097000000, "operatingexpenses": 57467000000, "operatingincomeloss": 123216000000, "nonoperatingincomeexpense": 269000000, "incomelossfromcontinuingoperationsbeforeincometaxesextraordinaryitemsnoncontrollinginterest": 123485000000, "incometaxexpensebenefit": 29749000000, "netincomeloss": 93736000000, "earningspersharebasic": 6.11, "earningspersharediluted": 6.08, "weightedaveragenumberofsharesoutstandingbasic": 15343783000, "weightedaveragenumberofdilutedsharesoutstanding": 15408095000, "othercomprehensiveincomelossforeigncurrencytransactionandtranslationadjustmentnetoftax": 395000000, "othercomprehensiveincomelossderivativeinstrumentgainlossbeforereclassificationaftertax": -832000000, "othercomprehensiveincomelossderivativeinstrumentgainlossreclassificationaftertax": 1337000000, "othercomprehensiveincomelossderivativeinstrumentgainlossafterreclassificationandtax": -2169000000, "othercomprehensiveincomeunrealizedholdinggainlossonsecuritiesarisingduringperiodnetoftax": 5850000000, "othercomprehensiveincomelossreclassificationadjustmentfromaociforsaleofsecuritiesnetoftax": -204000000, "othercomprehensiveincomelossavailableforsalesecuritiesadjustmentnetoftax": 6054000000, "othercomprehensiveincomelossnetoftaxportionattributabletoparent": 4280000000, "comprehensiveincomenetoftax": 98016000000, "cashandcashequivalentsatcarryingvalue": 29943000000, "marketablesecuritiescurrent": 35228000000, "accountsreceivablenetcurrent": 33410000000, "nontradereceivablescurrent": 32833000000, "inventorynet": 7286000000, "otherassetscurrent": 14287000000, "assetscurrent": 152987000000, "marketablesecuritiesnoncurrent": 91479000000, "propertyplantandequipmentnet": 45680000000, "otherassetsnoncurrent": 74834000000, "assetsnoncurrent": 211993000000, "assets": 364980000000, "accountspayablecurrent": 68960000000, "otherliabilitiescurrent": 78304000000, "contractwithcustomerliabilitycurrent": 8249000000, "commercialpaper": 10000000000, "longtermdebtcurrent": 10912000000, "liabilitiescurrent": 176392000000, "longtermdebtnoncurrent": 85750000000, "otherliabilitiesnoncurrent": 45888000000, "liabilitiesnoncurrent": 131638000000, "liabilities": 308030000000, "commonstocksharesoutstanding": 15116786000, "commonstocksharesissued": 15116786000, "commonstocksincludingadditionalpaidincapital": 83276000000, "retainedearningsaccumulateddeficit": -19154000000, "accumulatedothercomprehensiveincomelossnetoftax": -7172000000, "stockholdersequity": 56950000000, "liabilitiesandstockholdersequity": 364980000000, "commonstockparorstatedvaluepershare": 0.00001, "commonstocksharesauthorized": 50400000000, "stockissuedduringperiodvaluenewissues": 1423000000, "adjustmentsrelatedtotaxwithholdingforsharebasedcompensation": 1612000000, "adjustmentstoadditionalpaidincapitalsharebasedcompensationrequisiteserviceperiodrecognitionvalue": 12034000000, "dividends": 15218000000, "stockrepurchasedandretiredduringperiodvalue": 95000000000, "commonstockdividendspersharedeclared": 0.98, "cashcashequivalentsrestrictedcashandrestrictedcashequivalents": 29943000000, "depreciationdepletionandamortization": 11445000000, "sharebasedcompensation": 11688000000, "othernoncashincomeexpense": 2266000000, "increasedecreaseinaccountsreceivable": 3788000000, "increasedecreaseinotherreceivables": 1356000000, "increasedecreaseininventories": 1046000000, "increasedecreaseinotheroperatingassets": 11731000000, "increasedecreaseinaccountspayable": 6020000000, "increasedecreaseinotheroperatingliabilities": 15552000000, "netcashprovidedbyusedinoperatingactivities": 118254000000, "paymentstoacquireavailableforsalesecuritiesdebt": 48656000000, "proceedsfrommaturitiesprepaymentsandcallsofavailableforsalesecurities": 51211000000, "proceedsfromsaleofavailableforsalesecuritiesdebt": 11135000000, "paymentstoacquirepropertyplantandequipment": 9447000000, "paymentsforproceedsfromotherinvestingactivities": 1308000000, "netcashprovidedbyusedininvestingactivities": 2935000000, "paymentsrelatedtotaxwithholdingforsharebasedcompensation": 5600000000, "paymentsofdividends": 15234000000, "paymentsforrepurchaseofcommonstock": 94949000000, "repaymentsoflongtermdebt": 9958000000, "proceedsfromrepaymentsofcommercialpaper": 3960000000, "proceedsfrompaymentsforotherfinancingactivities": -361000000, "netcashprovidedbyusedinfinancingactivities": -121983000000, "cashcashequivalentsrestrictedcashandrestrictedcashequivalentsperiodincreasedecreaseincludingexchangerateeffect": -794000000, "incometaxespaidnet": 26102000000, "commercialpapercashflowsummarytabletextblock": "The following table provides a summary of cash flows associated with the issuance and maturities of commercial paper for 2024, 2023 and 2022 (in millions):", "contractwithcustomerliabilityrevenuerecognized": 7700000000, "contractwithcustomerliability": 12800000000, "revenueremainingperformanceobligationpercentage": 0.02, "revenueremainingperformanceobligationexpectedtimingofsatisfactionperiod1": "P1Y", "incrementalcommonsharesattributabletosharebasedpaymentarrangements": 64312000, "cash": 27199000000, "equitysecuritiesfvnicost": 1293000000, "equitysecuritiesfvniaccumulatedgrossunrealizedgainbeforetax": 105000000, "equitysecuritiesfvniaccumulatedgrossunrealizedlossbeforetax": 3000000, "equitysecuritiesfvnicurrentandnoncurrent": 1395000000, "availableforsaledebtsecuritiesamortizedcostbasis": 132108000000, "availableforsaledebtsecuritiesaccumulatedgrossunrealizedgainbeforetax": 583000000, "availableforsaledebtsecuritiesaccumulatedgrossunrealizedlossbeforetax": 4635000000, "availableforsalesecuritiesdebtsecurities": 128056000000, "cashcashequivalentsandmarketablesecuritiescost": 160600000000, "cashequivalentsandmarketablesecuritiesaccumulatedgrossunrealizedgainbeforetax": 688000000, "cashequivalentsandmarketablesecuritiesaccumulatedgrossunrealizedlossbeforetax": 4638000000, "cashcashequivalentsandmarketablesecurities": 156650000000, "restrictedcashandcashequivalents": 2600000000, "debtsecuritiesavailableforsalerestricted": 13200000000, "debtsecuritiesavailableforsalematurityallocatedandsinglematuritydaterollingafteronethroughfiveyearspercentage": 0.14, "debtsecuritiesavailableforsalematurityallocatedandsinglematuritydaterollingafterfivethroughtenyearspercentage": 0.09, "debtsecuritiesavailableforsalematurityallocatedandsinglematuritydaterollingaftertenyearspercentage": 0.77, "maximumlengthoftimeforeigncurrencycashflowhedge": "P18Y", "concentrationriskpercentage1": 0.23, "numberofsignificantvendors": 2, "derivativenotionalamount": 91493000000, "hedgedassetstatementoffinancialpositionextensibleenumeration": "http://fasb.org/us-gaap/2024#MarketableSecuritiesCurrent http://fasb.org/us-gaap/2024#MarketableSecuritiesNoncurrent", "hedgedliabilityfairvaluehedge": 13505000000, "hedgedliabilitystatementoffinancialpositionextensibleenumeration": "http://fasb.org/us-gaap/2024#LongTermDebtCurrent http://fasb.org/us-gaap/2024#LongTermDebtNoncurrent", "propertyplantandequipmentgross": 119128000000, "accumulateddepreciationdepletionandamortizationpropertyplantandequipment": 73448000000, "depreciation": 8200000000, "deferredincometaxassetsnet": 19499000000, "otherassetsmiscellaneousnoncurrent": 55335000000, "accruedincometaxescurrent": 1200000000, "otheraccruedliabilitiescurrent": 51703000000, "accruedincometaxesnoncurrent": 9254000000, "otheraccruedliabilitiesnoncurrent": 36634000000, "totalrestrictedcashcashequivalentsandavailableforsaledebtsecurities": 15800000000, "currentforeigntaxexpensebenefit": 25483000000, "currentfederaltaxexpensebenefit": 5571000000, "unrecognizedtaxbenefitsdecreasesresultingfromsettlementswithtaxingauthorities": 1070000000, "incomelossfromcontinuingoperationsbeforeincometaxesforeign": 77300000000, "effectiveincometaxratereconciliationatfederalstatutoryincometaxrate": 0.21, "deferredtaxassetstaxcreditcarryforwardsforeign": 5100000000, "deferredtaxassetstaxcreditcarryforwardsresearch": 3600000000, "unrecognizedtaxbenefits": 22038000000, "unrecognizedtaxbenefitsthatwouldimpacteffectivetaxrate": 10800000000, "decreaseinunrecognizedtaxbenefitsisreasonablypossible": 13000000000, "deferredfederalincometaxexpensebenefit": -3080000000, "federalincometaxexpensebenefitcontinuingoperations": 2491000000, "currentstateandlocaltaxexpensebenefit": 1726000000, "deferredstateandlocalincometaxexpensebenefit": -298000000, "stateandlocalincometaxexpensebenefitcontinuingoperations": 1428000000, "deferredforeignincometaxexpensebenefit": 347000000, "foreignincometaxexpensebenefitcontinuingoperations": 25830000000, "incometaxreconciliationincometaxexpensebenefitatfederalstatutoryincometaxrate": 25932000000, "incometaxreconciliationstateandlocalincometaxes": 1162000000, "effectiveincometaxratereconciliationimpactofthestateaiddecisionamount": 10246000000, "incometaxreconciliationforeignincometaxratedifferential": -5311000000, "incometaxreconciliationtaxcreditsresearch": 1397000000, "effectiveincometaxratereconciliationsharebasedcompensationexcesstaxbenefitamount": -893000000, "incometaxreconciliationotheradjustments": 10000000, "effectiveincometaxratecontinuingoperations": 0.241, "deferredtaxassetscapitalizedresearchanddevelopment": 10739000000, "deferredtaxassetstaxcreditcarryforwards": 8856000000, "deferredtaxassetstaxdeferredexpensereservesandaccruals": 6114000000, "deferredtaxassetsdeferredincome": 3413000000, "deferredtaxassetsleaseliabilities": 2410000000, "deferredtaxassetsothercomprehensiveloss": 1173000000, "deferredtaxassetsother": 2168000000, "deferredtaxassetsgross": 34873000000, "deferredtaxassetsvaluationallowance": 8866000000, "deferredtaxassetsnet": 26007000000, "deferredtaxliabilitiespropertyplantandequipment": 2551000000, "deferredtaxliabilitiesleasingarrangements": 2125000000, "deferredtaxliabilitiesminimumtaxonforeignearnings": 1674000000, "deferredtaxliabilitiesother": 455000000, "deferredincometaxliabilities": 6805000000, "deferredtaxassetsliabilitiesnet": 19202000000, "unrecognizedtaxbenefitsincreasesresultingfrompriorperiodtaxpositions": 1727000000, "unrecognizedtaxbenefitsdecreasesresultingfrompriorperiodtaxpositions": 386000000, "unrecognizedtaxbenefitsincreasesresultingfromcurrentperiodtaxpositions": 2542000000, "unrecognizedtaxbenefitsreductionsresultingfromlapseofapplicablestatuteoflimitations": 229000000, "lesseeoperatingandfinanceleasetermofcontract": "P10Y", "operatingleasecost": 2000000000, "variableleasecost": 13800000000, "operatingleasepayments": 1900000000, "rightofuseassetsobtainedinexchangeforoperatingandfinanceleaseliabilities": 1000000000, "operatingandfinanceleaseweightedaverageremainingleaseterm": "P10Y3M18D", "operatingandfinanceleaseweightedaveragediscountratepercent": 0.031, "unrecordedunconditionalpurchaseobligationbalancesheetamount": 11226000000, "lesseeoperatingandfinanceleaseleasenotyetcommencedtermofcontract": "P21Y", "operatingleaserightofuseasset": 10234000000, "operatingleaserightofuseassetstatementoffinancialpositionextensiblelist": "http://fasb.org/us-gaap/2024#OtherAssetsNoncurrent", "financeleaserightofuseasset": 1069000000, "financeleaserightofuseassetstatementoffinancialpositionextensiblelist": "http://fasb.org/us-gaap/2024#PropertyPlantAndEquipmentNet", "operatingandfinanceleaserightofuseasset": 11303000000, "operatingleaseliabilitycurrent": 1488000000, "operatingleaseliabilitycurrentstatementoffinancialpositionextensiblelist": "http://fasb.org/us-gaap/2024#OtherLiabilitiesCurrent", "operatingleaseliabilitynoncurrent": 10046000000, "operatingleaseliabilitynoncurrentstatementoffinancialpositionextensiblelist": "http://fasb.org/us-gaap/2024#OtherLiabilitiesNoncurrent", "financeleaseliabilitycurrent": 144000000, "financeleaseliabilitycurrentstatementoffinancialpositionextensiblelist": "http://fasb.org/us-gaap/2024#OtherLiabilitiesCurrent", "financeleaseliabilitynoncurrent": 752000000, "financeleaseliabilitynoncurrentstatementoffinancialpositionextensiblelist": "http://fasb.org/us-gaap/2024#OtherLiabilitiesNoncurrent", "operatingandfinanceleaseliability": 12430000000, "lesseeoperatingleaseliabilitypaymentsduenexttwelvemonths": 1820000000, "lesseeoperatingleaseliabilitypaymentsdueyeartwo": 1914000000, "lesseeoperatingleaseliabilitypaymentsdueyearthree": 1674000000, "lesseeoperatingleaseliabilitypaymentsdueyearfour": 1360000000, "lesseeoperatingleaseliabilitypaymentsdueyearfive": 1187000000, "lesseeoperatingleaseliabilitypaymentsdueafteryearfive": 5563000000, "lesseeoperatingleaseliabilitypaymentsdue": 13518000000, "lesseeoperatingleaseliabilityundiscountedexcessamount": 1984000000, "operatingleaseliability": 11534000000, "financeleaseliabilitypaymentsduenexttwelvemonths": 171000000, "financeleaseliabilitypaymentsdueyeartwo": 131000000, "financeleaseliabilitypaymentsdueyearthree": 59000000, "financeleaseliabilitypaymentsdueyearfour": 38000000, "financeleaseliabilitypaymentsdueyearfive": 36000000, "financeleaseliabilitypaymentsdueafteryearfive": 837000000, "financeleaseliabilitypaymentsdue": 1272000000, "financeleaseliabilityundiscountedexcessamount": 376000000, "financeleaseliability": 896000000, "lesseeoperatingandfinanceleaseliabilitytobepaidyearone": 1991000000, "lesseeoperatingandfinanceleaseliabilitytobepaidyeartwo": 2045000000, "lesseeoperatingandfinanceleaseliabilitytobepaidyearthree": 1733000000, "lesseeoperatingandfinanceleaseliabilitytobepaidyearfour": 1398000000, "lesseeoperatingandfinanceleaseliabilitytobepaidyearfive": 1223000000, "lesseeoperatingandfinanceleaseliabilitytobepaidafteryearfive": 6400000000, "lesseeoperatingandfinanceleaseliabilitytobepaid": 14790000000, "lesseeoperatingandfinanceleaseliabilityundiscountedexcessamount": 2360000000, "debtinstrumentterm": "P9M", "shorttermdebtweightedaverageinterestrate": 0.05, "longtermdebtfairvalue": 88400000000, "proceedsfromrepaymentsofshorttermdebtmaturinginthreemonthsorless": 3960000000, "debtinstrumentcarryingamount": 97341000000, "debtinstrumentunamortizeddiscountpremiumanddebtissuancecostsnet": 321000000, "hedgeaccountingadjustmentsrelatedtolongtermdebt": 358000000, "longtermdebt": 96662000000, "debtinstrumentmaturityyearrangestart": 2024, "debtinstrumentmaturityyearrangeend": 2062, "debtinstrumentinterestratestatedpercentage": 0.0485, "debtinstrumentinterestrateeffectivepercentage": 0.0665, "longtermdebtmaturitiesrepaymentsofprincipalinnexttwelvemonths": 10930000000, "longtermdebtmaturitiesrepaymentsofprincipalinyeartwo": 12342000000, "longtermdebtmaturitiesrepaymentsofprincipalinyearthree": 9936000000, "longtermdebtmaturitiesrepaymentsofprincipalinyearfour": 7800000000, "longtermdebtmaturitiesrepaymentsofprincipalinyearfive": 5153000000, "longtermdebtmaturitiesrepaymentsofprincipalafteryearfive": 51180000000, "stockrepurchasedandretiredduringperiodshares": 499372000, "stockissuedduringperiodsharessharebasedpaymentarrangementnetofshareswithheldfortaxes": 66097000, "sharebasedcompensationarrangementbysharebasedpaymentawardawardvestingperiod1": "P4Y", "sharebasedcompensationarrangementbysharebasedpaymentawardequityinstrumentsotherthanoptionsnumberofsharesofcommonstockissuedperunituponvesting": 1, "sharebasedcompensationarrangementbysharebasedpaymentawardequityinstrumentsotherthanoptionsvestedinperiodtotalfairvalue": 15800000000, "sharespaidfortaxwithholdingforsharebasedcompensation": 31000000, "employeeservicesharebasedcompensationnonvestedawardstotalcompensationcostnotyetrecognized": 19400000000, "employeeservicesharebasedcompensationnonvestedawardstotalcompensationcostnotyetrecognizedperiodforrecognition1": "P2Y4M24D", "sharebasedcompensationarrangementbysharebasedpaymentawardequityinstrumentsotherthanoptionsnonvestednumber": 163326000, "sharebasedcompensationarrangementbysharebasedpaymentawardequityinstrumentsotherthanoptionsgrantsinperiod": 80456000, "sharebasedcompensationarrangementbysharebasedpaymentawardequityinstrumentsotherthanoptionsvestedinperiod": 87633000, "sharebasedcompensationarrangementbysharebasedpaymentawardequityinstrumentsotherthanoptionsforfeitedinperiod": 9744000, "sharebasedcompensationarrangementbysharebasedpaymentawardequityinstrumentsotherthanoptionsnonvestedweightedaveragegrantdatefairvalue": 158.73, "sharebasedcompensationarrangementbysharebasedpaymentawardequityinstrumentsotherthanoptionsgrantsinperiodweightedaveragegrantdatefairvalue": 173.78, "sharebasedcompensationarrangementbysharebasedpaymentawardequityinstrumentsotherthanoptionsvestedinperiodweightedaveragegrantdatefairvalue": 127.59, "sharebasedcompensationarrangementbysharebasedpaymentawardequityinstrumentsotherthanoptionsforfeituresweightedaveragegrantdatefairvalue": 140.8, "sharebasedcompensationarrangementbysharebasedpaymentawardequityinstrumentsotherthanoptionsaggregateintrinsicvaluenonvested": 37204000000, "allocatedsharebasedcompensationexpense": 11688000000, "employeeservicesharebasedcompensationtaxbenefitfromcompensationexpense": 3350000000, "unrecordedunconditionalpurchaseobligationbalanceonfirstanniversary": 3206000000, "unrecordedunconditionalpurchaseobligationbalanceonsecondanniversary": 2440000000, "unrecordedunconditionalpurchaseobligationbalanceonthirdanniversary": 1156000000, "unrecordedunconditionalpurchaseobligationbalanceonfourthanniversary": 3121000000, "unrecordedunconditionalpurchaseobligationbalanceonfifthanniversary": 633000000, "unrecordedunconditionalpurchaseobligationdueafterfiveyears": 670000000, "othergeneralandadministrativeexpense": 7458000000, "noncurrentassets": 45680000000, "trdarrsecuritiesaggavailamt": 100000, "insidertrdpoliciesprocadoptedflag": "true" } } ]`

Form 13F
--------

[Institutional Ownership Filings API](/developer/docs/stable/latest-filings)

![USA Flag](https://intelligence.financialmodelingprep.com/images/icons/usa_flag.png)

Stay up to date with the most recent SEC filings related to institutional ownership using the Institutional Ownership Filings API. This tool allows you to track the latest reports and disclosures from institutional investors, giving you a real-time view of major holdings and regulatory submissions.

Endpoint:

<https://financialmodelingprep.com/stable/institutional-ownership/latest?page\=0&limit\=100>

Parameters:

Parameter Type Example
page number 0
limit number 100

(\*) Required

#### Response

`[ { "cik": "0001963967", "name": "CPA ASSET MANAGEMENT LLC", "date": "2024-12-31", "filingDate": "2025-02-04 00:00:00", "acceptedDate": "2025-02-04 17:28:36", "formType": "13F-HR", "link": "https://www.sec.gov/Archives/edgar/data/1963967/000196396725000001/0001963967-25-000001-index.htm", "finalLink": "https://www.sec.gov/Archives/edgar/data/1963967/000196396725000001/boc2024q413f.xml" } ]`

[SEC Filings Extract API](/developer/docs/stable/filings-extract)

![USA Flag](https://intelligence.financialmodelingprep.com/images/icons/usa_flag.png)

The SEC Filings Extract API allows users to extract detailed data directly from official SEC filings. This API provides access to key information such as company shares, security details, and filing links, making it easier to analyze corporate disclosures.

Endpoint:

<https://financialmodelingprep.com/stable/institutional-ownership/extract?cik\=0001388838&year\=2023&quarter\=3>

Parameters:

Parameter Type Example
cik\* string 0001388838
year\* string 2023
quarter\* string 3

(\*) Required

#### Response

`[ { "date": "2023-09-30", "filingDate": "2023-11-13", "acceptedDate": "2023-11-13", "cik": "0001388838", "securityCusip": "674215207", "symbol": "CHRD", "nameOfIssuer": "CHORD ENERGY CORPORATION", "shares": 13280, "titleOfClass": "COM NEW", "sharesType": "SH", "putCallShare": "", "value": 2152290, "link": "https://www.sec.gov/Archives/edgar/data/1388838/000117266123003760/0001172661-23-003760-index.htm", "finalLink": "https://www.sec.gov/Archives/edgar/data/1388838/000117266123003760/infotable.xml" } ]`

[Form 13F Filings Dates API](/developer/docs/stable/form-13f-filings-dates)

![USA Flag](https://intelligence.financialmodelingprep.com/images/icons/usa_flag.png)

The Form 13F Filings Dates API allows you to retrieve dates associated with Form 13F filings by institutional investors. This is crucial for tracking stock holdings of institutional investors at specific points in time, providing valuable insights into their investment strategies.

Endpoint:

<https://financialmodelingprep.com/stable/institutional-ownership/dates?cik\=0001067983>

Parameters:

Parameter Type Example
cik\* string 0001067983

(\*) Required

#### Response

`[ { "date": "2024-09-30", "year": 2024, "quarter": 3 } ]`

[Filings Extract With Analytics By Holder API](/developer/docs/stable/filings-extract-with-analytics-by-holder)

![USA Flag](https://intelligence.financialmodelingprep.com/images/icons/usa_flag.png)

The Filings Extract With Analytics By Holder API provides an analytical breakdown of institutional filings. This API offers insight into stock movements, strategies, and portfolio changes by major institutional holders, helping you understand their investment behavior and track significant changes in stock ownership.

Endpoint:

<https://financialmodelingprep.com/stable/institutional-ownership/extract-analytics/holder?symbol\=AAPL&year\=2023&quarter\=3&page\=0&limit\=10>

Parameters:

Parameter Type Example
symbol\* string AAPL
year\* string 2023
quarter\* string 3
page number 0
limit number 10

(\*) Required

#### Response

`[ { "date": "2023-09-30", "cik": "0000102909", "filingDate": "2023-12-18", "investorName": "VANGUARD GROUP INC", "symbol": "AAPL", "securityName": "APPLE INC", "typeOfSecurity": "COM", "securityCusip": "037833100", "sharesType": "SH", "putCallShare": "Share", "investmentDiscretion": "SOLE", "industryTitle": "ELECTRONIC COMPUTERS", "weight": 5.4673, "lastWeight": 5.996, "changeInWeight": -0.5287, "changeInWeightPercentage": -8.8175, "marketValue": 222572509140, "lastMarketValue": 252876459509, "changeInMarketValue": -30303950369, "changeInMarketValuePercentage": -11.9837, "sharesNumber": 1299997133, "lastSharesNumber": 1303688506, "changeInSharesNumber": -3691373, "changeInSharesNumberPercentage": -0.2831, "quarterEndPrice": 171.21, "avgPricePaid": 95.86, "isNew": false, "isSoldOut": false, "ownership": 8.3336, "lastOwnership": 8.305, "changeInOwnership": 0.0286, "changeInOwnershipPercentage": 0.3445, "holdingPeriod": 42, "firstAdded": "2013-06-30", "performance": -29671950396, "performancePercentage": -11.7338, "lastPerformance": 38078179274, "changeInPerformance": -67750129670, "isCountedForPerformance": true } ]`

[Holder Performance Summary API](/developer/docs/stable/holder-performance-summary)

![USA Flag](https://intelligence.financialmodelingprep.com/images/icons/usa_flag.png)

The Holder Performance Summary API provides insights into the performance of institutional investors based on their stock holdings. This data helps track how well institutional holders are performing, their portfolio changes, and how their performance compares to benchmarks like the S&P 500.

Endpoint:

<https://financialmodelingprep.com/stable/institutional-ownership/holder-performance-summary?cik\=0001067983&page\=0>

Parameters:

Parameter Type Example
cik\* string 0001067983
page number 0

(\*) Required

#### Response

`[ { "date": "2024-09-30", "cik": "0001067983", "investorName": "BERKSHIRE HATHAWAY INC", "portfolioSize": 40, "securitiesAdded": 3, "securitiesRemoved": 4, "marketValue": 266378900503, "previousMarketValue": 279969062343, "changeInMarketValue": -13590161840, "changeInMarketValuePercentage": -4.8542, "averageHoldingPeriod": 18, "averageHoldingPeriodTop10": 31, "averageHoldingPeriodTop20": 27, "turnover": 0.175, "turnoverAlternateSell": 13.9726, "turnoverAlternateBuy": 1.1974, "performance": 17707926874, "performancePercentage": 6.325, "lastPerformance": 38318168662, "changeInPerformance": -20610241788, "performance1year": 89877376224, "performancePercentage1year": 28.5368, "performance3year": 91730847239, "performancePercentage3year": 31.2597, "performance5year": 157058602844, "performancePercentage5year": 73.1617, "performanceSinceInception": 182067479115, "performanceSinceInceptionPercentage": 198.2138, "performanceRelativeToSP500Percentage": 6.325, "performance1yearRelativeToSP500Percentage": 28.5368, "performance3yearRelativeToSP500Percentage": 36.5632, "performance5yearRelativeToSP500Percentage": 36.1296, "performanceSinceInceptionRelativeToSP500Percentage": 37.0968 } ]`

[Holders Industry Breakdown API](/developer/docs/stable/holders-industry-breakdown)

![USA Flag](https://intelligence.financialmodelingprep.com/images/icons/usa_flag.png)

The Holders Industry Breakdown API provides an overview of the sectors and industries that institutional holders are investing in. This API helps analyze how institutional investors distribute their holdings across different industries and track changes in their investment strategies over time.

Endpoint:

<https://financialmodelingprep.com/stable/institutional-ownership/holder-industry-breakdown?cik\=0001067983&year\=2023&quarter\=3>

Parameters:

Parameter Type Example
cik\* string 0001067983
year\* string 2023
quarter\* string 3

(\*) Required

#### Response

`[ { "date": "2023-09-30", "cik": "0001067983", "investorName": "BERKSHIRE HATHAWAY INC", "industryTitle": "ELECTRONIC COMPUTERS", "weight": 49.7704, "lastWeight": 51.0035, "changeInWeight": -1.2332, "changeInWeightPercentage": -2.4178, "performance": -20838154294, "performancePercentage": -178.2938, "lastPerformance": 26615340304, "changeInPerformance": -47453494598 } ]`

[Positions Summary API](/developer/docs/stable/positions-summary)

![USA Flag](https://intelligence.financialmodelingprep.com/images/icons/usa_flag.png)

The Positions Summary API provides a comprehensive snapshot of institutional holdings for a specific stock symbol. It tracks key metrics like the number of investors holding the stock, changes in the number of shares, total investment value, and ownership percentages over time.

Endpoint:

<https://financialmodelingprep.com/stable/institutional-ownership/symbol-positions-summary?symbol\=AAPL&year\=2023&quarter\=3>

Parameters:

Parameter Type Example
symbol\* string AAPL
year\* string 2023
quarter\* string 3

(\*) Required

#### Response

`[ { "symbol": "AAPL", "cik": "0000320193", "date": "2023-09-30", "investorsHolding": 4805, "lastInvestorsHolding": 4749, "investorsHoldingChange": 56, "numberOf13Fshares": 9247670386, "lastNumberOf13Fshares": 9345671472, "numberOf13FsharesChange": -98001086, "totalInvested": 1613733330618, "lastTotalInvested": 1825154796061, "totalInvestedChange": -211421465443, "ownershipPercent": 59.2821, "lastOwnershipPercent": 59.5356, "ownershipPercentChange": -0.2535, "newPositions": 158, "lastNewPositions": 188, "newPositionsChange": -30, "increasedPositions": 1921, "lastIncreasedPositions": 1775, "increasedPositionsChange": 146, "closedPositions": 156, "lastClosedPositions": 122, "closedPositionsChange": 34, "reducedPositions": 2375, "lastReducedPositions": 2506, "reducedPositionsChange": -131, "totalCalls": 173528138, "lastTotalCalls": 198746782, "totalCallsChange": -25218644, "totalPuts": 192878290, "lastTotalPuts": 177007062, "totalPutsChange": 15871228, "putCallRatio": 1.1115, "lastPutCallRatio": 0.8906, "putCallRatioChange": 22.0894 } ]`

[Industry Performance Summary API](/developer/docs/stable/industry-summary)

![USA Flag](https://intelligence.financialmodelingprep.com/images/icons/usa_flag.png)

The Industry Performance Summary API provides an overview of how various industries are performing financially. By analyzing the value of industries over a specific period, this API helps investors and analysts understand the health of entire sectors and make informed decisions about sector-based investments.

Endpoint:

<https://financialmodelingprep.com/stable/institutional-ownership/industry-summary?year\=2023&quarter\=3>

Parameters:

Parameter Type Example
year\* string 2023
quarter\* string 3

(\*) Required

#### Response

`[ { "industryTitle": "ABRASIVE, ASBESTOS & MISC NONMETALLIC MINERAL PRODS", "industryValue": 10979226300, "date": "2023-09-30" } ]`

Indexes
-------

[Stock Market Indexes List API](/developer/docs/stable/indexes-list)

Retrieve a comprehensive list of stock market indexes across global exchanges using the FMP Stock Market Indexes List API. This API provides essential information such as the symbol, name, exchange, and currency for each index, helping analysts and investors keep track of various market benchmarks.

Endpoint:

<https://financialmodelingprep.com/stable/index-list>

#### Response

`[ { "symbol": "^TTIN", "name": "S&P/TSX Capped Industrials Index", "exchange": "TSX", "currency": "CAD" } ]`

[Index Quote API](/developer/docs/stable/index-quote)

![USA Flag](https://intelligence.financialmodelingprep.com/images/icons/usa_flag.png)

Access real-time stock index quotes with the Stock Index Quote API. Stay updated with the latest price changes, daily highs and lows, volume, and other key metrics for major stock indices around the world.

Endpoint:

<https://financialmodelingprep.com/stable/quote?symbol\=^GSPC>

Parameters:

Parameter Type Example
symbol\* string ^GSPC

(\*) Required

#### Response

`[ { "symbol": "^GSPC", "name": "S&P 500", "price": 6037.88, "changePercentage": 0.7225, "change": 43.3101, "volume": 3054209000, "dayLow": 5990.87, "dayHigh": 6042.48, "yearHigh": 6128.18, "yearLow": 4920.31, "marketCap": null, "priceAvg50": 5992.1245, "priceAvg200": 5634.6694, "exchange": "INDEX", "open": 5998.14, "previousClose": 5994.57, "timestamp": 1738705513 } ]`

[Index Short Quote API](/developer/docs/stable/index-quote-short)

![USA Flag](https://intelligence.financialmodelingprep.com/images/icons/usa_flag.png)

Access concise stock index quotes with the Stock Index Short Quote API. This API provides a snapshot of the current price, change, and volume for stock indexes, making it ideal for users who need a quick overview of market movements.

Endpoint:

<https://financialmodelingprep.com/stable/quote-short?symbol\=^GSPC>

Parameters:

Parameter Type Example
symbol\* string ^GSPC

(\*) Required

#### Response

`[ { "symbol": "^GSPC", "price": 6037.88, "change": 43.3101, "volume": 3054209000 } ]`

[All Index Quotes API](/developer/docs/stable/all-index-quotes)

The All Index Quotes API provides real-time quotes for a wide range of stock indexes, from major market benchmarks to niche indexes. This API allows users to track market performance across multiple indexes in a single request, giving them a broad view of the financial markets.

Endpoint:

<https://financialmodelingprep.com/stable/batch-index-quotes>

Parameters:

Parameter Type Example
short boolean true

(\*) Required

#### Response

`[ { "symbol": "^DJBGIE", "price": 4277.52, "change": -15.7, "volume": 0 } ]`

[Historical Index Light Chart API](/developer/docs/stable/index-historical-price-eod-light)

Retrieve end-of-day historical prices for stock indexes using the Historical Price Data API. This API provides essential data such as date, price, and volume, enabling detailed analysis of price movements over time.

Endpoint:

<https://financialmodelingprep.com/stable/historical-price-eod/light?symbol\=^GSPC>

Parameters:

Parameter Type Example
symbol\* string ^GSPC
from date 2025-01-10
to date 2025-04-10

(\*) Required

#### Response

`[ { "symbol": "^GSPC", "date": "2025-02-04", "price": 6037.89, "volume": 3020009000 } ]`

[Historical Index Full Chart API](/developer/docs/stable/index-historical-price-eod-full)

Access full historical end-of-day prices for stock indexes using the Detailed Historical Price Data API. This API provides comprehensive information, including open, high, low, close prices, volume, and additional metrics for detailed financial analysis.

Endpoint:

<https://financialmodelingprep.com/stable/historical-price-eod/full?symbol\=^GSPC>

Parameters:

Parameter Type Example
symbol\* string ^GSPC
from date 2025-01-10
to date 2025-04-10

(\*) Required

#### Response

`[ { "symbol": "^GSPC", "date": "2025-02-04", "open": 5998.14, "high": 6042.48, "low": 5990.87, "close": 6037.89, "volume": 3020009000, "change": 39.75, "changePercent": 0.66271, "vwap": 6017.345 } ]`

[1-Minute Interval Index Price API](/developer/docs/stable/index-intraday-1-min)

Retrieve 1-minute interval intraday data for stock indexes using the Intraday 1-Minute Price Data API. This API provides granular price information, helping users track short-term price movements and trading volume within each minute.

Endpoint:

<https://financialmodelingprep.com/stable/historical-chart/1min?symbol\=^GSPC>

Parameters:

Parameter Type Example
symbol\* string ^GSPC
from date 2024-01-01
to date 2024-03-01

(\*) Required

#### Response

`[ { "date": "2025-02-04 15:59:00", "open": 6040.47, "low": 6037.08, "high": 6041.71, "close": 6037.08, "volume": 70033000 } ]`

[5-Minute Interval Index Price API](/developer/docs/stable/index-intraday-5-min)

Retrieve 5-minute interval intraday price data for stock indexes using the Intraday 5-Minute Price Data API. This API provides crucial insights into price movements and trading volume within 5-minute windows, ideal for traders who require short-term data.

Endpoint:

<https://financialmodelingprep.com/stable/historical-chart/5min?symbol\=^GSPC>

Parameters:

Parameter Type Example
symbol\* string ^GSPC
from date 2024-01-01
to date 2024-03-01

(\*) Required

#### Response

`[ { "date": "2025-02-04 15:55:00", "open": 6038.16, "low": 6037.02, "high": 6041.71, "close": 6037.08, "volume": 179921000 } ]`

[1-Hour Interval Index Price API](/developer/docs/stable/index-intraday-1-hour)

Access 1-hour interval intraday data for stock indexes using the Intraday 1-Hour Price Data API. This API provides detailed price movements and volume within hourly intervals, making it ideal for tracking medium-term market trends during the trading day.

Endpoint:

<https://financialmodelingprep.com/stable/historical-chart/1hour?symbol\=^GSPC>

Parameters:

Parameter Type Example
symbol\* string ^GSPC
from date 2024-01-01
to date 2024-03-01

(\*) Required

#### Response

`[ { "date": "2025-02-04 15:30:00", "open": 6030.14, "low": 6030.14, "high": 6041.71, "close": 6037.88, "volume": 930623000 } ]`

[S&P 500 Index API](/developer/docs/stable/sp-500)

Access detailed data on the S&P 500 index using the S&P 500 Index API. Track the performance and key information of the companies that make up this major stock market index.

Endpoint:

<https://financialmodelingprep.com/stable/sp500-constituent>

#### Response

`[ { "symbol": "APO", "name": "Apollo Global Management", "sector": "Financial Services", "subSector": "Asset Management - Global", "headQuarter": "New York City, New York", "dateFirstAdded": "2024-12-23", "cik": "0001858681", "founded": "1990" } ]`

[Nasdaq Index API](/developer/docs/stable/nasdaq)

Access comprehensive data for the Nasdaq index with the Nasdaq Index API. Monitor real-time movements and track the historical performance of companies listed on this prominent stock exchange.

Endpoint:

<https://financialmodelingprep.com/stable/nasdaq-constituent>

#### Response

`[ { "symbol": "AAPL", "name": "Apple Inc.", "sector": "Technology", "subSector": "Consumer Electronics", "headQuarter": "Cupertino, CA", "dateFirstAdded": null, "cik": "0000320193", "founded": "1976-04-01" } ]`

[Dow Jones API](/developer/docs/stable/dow-jones)

Access data on the Dow Jones Industrial Average using the Dow Jones API. Track current values, analyze trends, and get detailed information about the companies that make up this important stock index.

Endpoint:

<https://financialmodelingprep.com/stable/dowjones-constituent>

#### Response

`[ { "symbol": "NVDA", "name": "Nvidia", "sector": "Technology", "subSector": "Semiconductors", "headQuarter": "Santa Clara, CA", "dateFirstAdded": "2024-11-08", "cik": "0001045810", "founded": "1993-04-05" } ]`

[Historical S&P 500 API](/developer/docs/stable/historical-sp-500)

Retrieve historical data for the S&P 500 index using the Historical S&P 500 API. Analyze past changes in the index, including additions and removals of companies, to understand trends and performance over time.

Endpoint:

<https://financialmodelingprep.com/stable/historical-sp500-constituent>

#### Response

`[ { "dateAdded": "December 23, 2024", "addedSecurity": "Workday, Inc.", "removedTicker": "AMTM", "removedSecurity": "Amentum", "date": "2024-12-22", "symbol": "WDAY", "reason": "Market capitalization change." } ]`

[Historical Nasdaq API](/developer/docs/stable/historical-nasdaq)

Access historical data for the Nasdaq index using the Historical Nasdaq API. Analyze changes in the index composition and view how it has evolved over time, including company additions and removals.

Endpoint:

<https://financialmodelingprep.com/stable/historical-nasdaq-constituent>

#### Response

`[ { "dateAdded": "December 23, 2024", "addedSecurity": "Axon Enterprise Inc.", "removedTicker": "SMCI", "removedSecurity": "Super Micro Computer Inc", "date": "2024-12-22", "symbol": "AXON", "reason": "Annual Re-ranking" } ]`

[Historical Dow Jones API](/developer/docs/stable/historical-dow-jones)

Access historical data for the Dow Jones Industrial Average using the Historical Dow Jones API. Analyze changes in the index’s composition and study its performance across different periods.

Endpoint:

<https://financialmodelingprep.com/stable/historical-dowjones-constituent>

#### Response

`[ { "dateAdded": "November 8, 2024", "addedSecurity": "Nvidia", "removedTicker": "INTC", "removedSecurity": "Intel Corporation", "date": "2024-11-07", "symbol": "NVDA", "reason": "Market capitalization change" } ]`

Insider Trades
--------------

[Latest Insider Trading API](/developer/docs/stable/latest-insider-trade)

![USA Flag](https://intelligence.financialmodelingprep.com/images/icons/usa_flag.png)

Access the latest insider trading activity using the Latest Insider Trading API. Track which company insiders are buying or selling stocks and analyze their transactions.

Endpoint:

<https://financialmodelingprep.com/stable/insider-trading/latest?page\=0&limit\=100>

Parameters:

Parameter Type Example
date date 2025-01-10
page number 0
limit number 100

(\*) Required | Maximum 1000 records per request | Page maxed at 100

#### Response

`[ { "symbol": "APA", "filingDate": "2025-02-04", "transactionDate": "2025-02-01", "reportingCik": "0001380034", "companyCik": "0001841666", "transactionType": "M-Exempt", "securitiesOwned": 104398, "reportingName": "Hoyt Rebecca A", "typeOfOwner": "officer: Sr. VP, Chief Acct Officer", "acquisitionOrDisposition": "A", "directOrIndirect": "D", "formType": "4", "securitiesTransacted": 3450, "price": 0, "securityName": "Common Stock", "url": "https://www.sec.gov/Archives/edgar/data/1841666/000194906025000035/0001949060-25-000035-index.htm" } ]`

[Search Insider Trades API](/developer/docs/stable/search-insider-trades)

![USA Flag](https://intelligence.financialmodelingprep.com/images/icons/usa_flag.png)

Search insider trading activity by company or symbol using the Search Insider Trades API. Find specific trades made by corporate insiders, including executives and directors.

Endpoint:

<https://financialmodelingprep.com/stable/insider-trading/search?page\=0&limit\=100>

Parameters:

Parameter Type Example
symbol string AAPL
page number 0
limit number 100
reportingCik string 0001496686
companyCik string 0000320193
transactionType string S-Sale

(\*) Required | Maximum 1000 records per request | Page maxed at 100

#### Response

`[ { "symbol": "AAPL", "filingDate": "2025-02-04", "transactionDate": "2025-02-03", "reportingCik": "0001214128", "companyCik": "0000320193", "transactionType": "S-Sale", "securitiesOwned": 4159576, "reportingName": "LEVINSON ARTHUR D", "typeOfOwner": "director", "acquisitionOrDisposition": "D", "directOrIndirect": "D", "formType": "4", "securitiesTransacted": 1516, "price": 226.3501, "securityName": "Common Stock", "url": "https://www.sec.gov/Archives/edgar/data/320193/000032019325000019/0000320193-25-000019-index.htm" } ]`

[Search Insider Trades by Reporting Name API](/developer/docs/stable/search-reporting-name)

![USA Flag](https://intelligence.financialmodelingprep.com/images/icons/usa_flag.png)

Search for insider trading activity by reporting name using the Search Insider Trades by Reporting Name API. Track trading activities of specific individuals or groups involved in corporate insider transactions.

Endpoint:

<https://financialmodelingprep.com/stable/insider-trading/reporting-name?name\=Zuckerberg>

Parameters:

Parameter Type Example
name\* string Zuckerberg

(\*) Required

#### Response

`[ { "reportingCik": "0001548760", "reportingName": "Zuckerberg Mark" } ]`

[All Insider Transaction Types API](/developer/docs/stable/all-transaction-types)

![USA Flag](https://intelligence.financialmodelingprep.com/images/icons/usa_flag.png)

Access a comprehensive list of insider transaction types with the All Insider Transaction Types API. This API provides details on various transaction actions, including purchases, sales, and other corporate actions involving insider trading.

Endpoint:

<https://financialmodelingprep.com/stable/insider-trading-transaction-type>

#### Response

`[ { "transactionType": "A-Award" } ]`

[Insider Trade Statistics API](/developer/docs/stable/insider-trade-statistics)

![USA Flag](https://intelligence.financialmodelingprep.com/images/icons/usa_flag.png)

Analyze insider trading activity with the Insider Trade Statistics API. This API provides key statistics on insider transactions, including total purchases, sales, and trends for specific companies or stock symbols.

Endpoint:

<https://financialmodelingprep.com/stable/insider-trading/statistics?symbol\=AAPL>

Parameters:

Parameter Type Example
symbol\* string AAPL

(\*) Required

#### Response

`[ { "symbol": "AAPL", "cik": "0000320193", "year": 2024, "quarter": 4, "acquiredTransactions": 6, "disposedTransactions": 38, "acquiredDisposedRatio": 0.1579, "totalAcquired": 994544, "totalDisposed": 2297088, "averageAcquired": 165757.3333, "averageDisposed": 60449.6842, "totalPurchases": 0, "totalSales": 22 } ]`

[Acquisition Ownership API](/developer/docs/stable/acquisition-ownership)

![USA Flag](https://intelligence.financialmodelingprep.com/images/icons/usa_flag.png)

Track changes in stock ownership during acquisitions using the Acquisition Ownership API. This API provides detailed information on how mergers, takeovers, or beneficial ownership changes impact the stock ownership structure of a company.

Endpoint:

<https://financialmodelingprep.com/stable/acquisition-of-beneficial-ownership?symbol\=AAPL>

Parameters:

Parameter Type Example
symbol\* string AAPL
limit number 2000

(\*) Required

#### Response

`[ { "cik": "0000320193", "symbol": "AAPL", "filingDate": "2024-02-14", "acceptedDate": "2024-02-14", "cusip": "037833100", "nameOfReportingPerson": "National Indemnity Company", "citizenshipOrPlaceOfOrganization": "State of Nebraska", "soleVotingPower": "0", "sharedVotingPower": "755059877", "soleDispositivePower": "0", "sharedDispositivePower": "755059877", "amountBeneficiallyOwned": "755059877", "percentOfClass": "4.8", "typeOfReportingPerson": "IC, EP, IN, CO", "url": "https://www.sec.gov/Archives/edgar/data/320193/000119312524036431/d751537dsc13ga.htm" } ]`

Market Performance
------------------

[Market Sector Performance Snapshot API](/developer/docs/stable/sector-performance-snapshot)

![Globe Flag](https://intelligence.financialmodelingprep.com/images/icons/globe_flag.png)

Get a snapshot of sector performance using the Market Sector Performance Snapshot API. Analyze how different industries are performing in the market based on average changes across sectors.

Endpoint:

<https://financialmodelingprep.com/stable/sector-performance-snapshot?date\=2024-02-01>

Parameters:

Parameter Type Example
date\* string 2024-02-01
exchange string NASDAQ
sector string Energy

(\*) Required

#### Response

`[ { "date": "2024-02-01", "sector": "Basic Materials", "exchange": "NASDAQ", "averageChange": -0.31481377464310634 } ]`

[Industry Performance Snapshot API](/developer/docs/stable/industry-performance-snapshot)

![Globe Flag](https://intelligence.financialmodelingprep.com/images/icons/globe_flag.png)

Access detailed performance data by industry using the Industry Performance Snapshot API. Analyze trends, movements, and daily performance metrics for specific industries across various stock exchanges.

Endpoint:

<https://financialmodelingprep.com/stable/industry-performance-snapshot?date\=2024-02-01>

Parameters:

Parameter Type Example
date\* string 2024-02-01
exchange string NASDAQ
industry string Biotechnology

(\*) Required

#### Response

`[ { "date": "2024-02-01", "industry": "Advertising Agencies", "exchange": "NASDAQ", "averageChange": 3.8660194344955996 } ]`

[Historical Market Sector Performance API](/developer/docs/stable/historical-sector-performance)

![Globe Flag](https://intelligence.financialmodelingprep.com/images/icons/globe_flag.png)

Access historical sector performance data using the Historical Market Sector Performance API. Review how different sectors have performed over time across various stock exchanges.

Endpoint:

<https://financialmodelingprep.com/stable/historical-sector-performance?sector\=Energy>

Parameters:

Parameter Type Example
from string 2024-02-01
exchange string NASDAQ
sector\* string Energy
to string 2024-03-01

(\*) Required

#### Response

`[ { "date": "2024-02-01", "sector": "Energy", "exchange": "NASDAQ", "averageChange": 0.6397534025664513 } ]`

[Historical Industry Performance API](/developer/docs/stable/historical-industry-performance)

![Globe Flag](https://intelligence.financialmodelingprep.com/images/icons/globe_flag.png)

Access historical performance data for industries using the Historical Industry Performance API. Track long-term trends and analyze how different industries have evolved over time across various stock exchanges.

Endpoint:

<https://financialmodelingprep.com/stable/historical-industry-performance?industry\=Biotechnology>

Parameters:

Parameter Type Example
industry\* string Biotechnology
exchange string NASDAQ
from string 2024-02-01
to string 2024-03-01

(\*) Required

#### Response

`[ { "date": "2024-02-01", "industry": "Biotechnology", "exchange": "NASDAQ", "averageChange": 1.1479066960358322 } ]`

[Sector PE Snapshot API](/developer/docs/stable/sector-pe-snapshot)

![Globe Flag](https://intelligence.financialmodelingprep.com/images/icons/globe_flag.png)

Retrieve the price-to-earnings (P/E) ratios for various sectors using the Sector P/E Snapshot API. Compare valuation levels across sectors to better understand market valuations.

Endpoint:

<https://financialmodelingprep.com/stable/sector-pe-snapshot?date\=2024-02-01>

Parameters:

Parameter Type Example
date\* string 2024-02-01
exchange string NASDAQ
sector string Energy

(\*) Required

#### Response

`[ { "date": "2024-02-01", "sector": "Basic Materials", "exchange": "NASDAQ", "pe": 15.687711758428254 } ]`

[Industry PE Snapshot API](/developer/docs/stable/industry-pe-snapshot)

![Globe Flag](https://intelligence.financialmodelingprep.com/images/icons/globe_flag.png)

View price-to-earnings (P/E) ratios for different industries using the Industry P/E Snapshot API. Analyze valuation levels across various industries to understand how each is priced relative to its earnings.

Endpoint:

<https://financialmodelingprep.com/stable/industry-pe-snapshot?date\=2024-02-01>

Parameters:

Parameter Type Example
date\* string 2024-02-01
exchange string NASDAQ
industry string Biotechnology

(\*) Required

#### Response

`[ { "date": "2024-02-01", "industry": "Advertising Agencies", "exchange": "NASDAQ", "pe": 71.09601665201151 } ]`

[Historical Sector PE API](/developer/docs/stable/historical-sector-pe)

![Globe Flag](https://intelligence.financialmodelingprep.com/images/icons/globe_flag.png)

Access historical price-to-earnings (P/E) ratios for various sectors using the Historical Sector P/E API. Analyze how sector valuations have evolved over time to understand long-term trends and market shifts.

Endpoint:

<https://financialmodelingprep.com/stable/historical-sector-pe?sector\=Energy>

Parameters:

Parameter Type Example
from string 2024-02-01
exchange string NASDAQ
sector\* string Energy
to string 2024-03-01

(\*) Required

#### Response

`[ { "date": "2024-02-01", "sector": "Energy", "exchange": "NASDAQ", "pe": 14.411400922841464 } ]`

[Historical Industry PE API](/developer/docs/stable/historical-industry-pe)

![Globe Flag](https://intelligence.financialmodelingprep.com/images/icons/globe_flag.png)

Access historical price-to-earnings (P/E) ratios by industry using the Historical Industry P/E API. Track valuation trends across various industries to understand how market sentiment and valuations have evolved over time.

Endpoint:

<https://financialmodelingprep.com/stable/historical-industry-pe?industry\=Biotechnology>

Parameters:

Parameter Type Example
industry\* string Biotechnology
exchange string NASDAQ
from string 2024-02-01
to string 2024-03-01

(\*) Required

#### Response

`[ { "date": "2024-02-01", "industry": "Biotechnology", "exchange": "NASDAQ", "pe": 10.181600321811821 } ]`

[Biggest Stock Gainers API](/developer/docs/stable/biggest-gainers)

![Globe Flag](https://intelligence.financialmodelingprep.com/images/icons/globe_flag.png)

Track the stocks with the largest price increases using the Top Stock Gainers API. Identify the companies that are leading the market with significant price surges, offering potential growth opportunities.

Endpoint:

<https://financialmodelingprep.com/stable/biggest-gainers>

#### Response

`[ { "symbol": "LTRY", "price": 0.5876, "name": "Lottery.com Inc.", "change": 0.2756, "changesPercentage": 88.3333, "exchange": "NASDAQ" } ]`

[Biggest Stock Losers API](/developer/docs/stable/biggest-losers)

![Globe Flag](https://intelligence.financialmodelingprep.com/images/icons/globe_flag.png)

Access data on the stocks with the largest price drops using the Biggest Stock Losers API. Identify companies experiencing significant declines and track the stocks that are falling the fastest in the market.

Endpoint:

<https://financialmodelingprep.com/stable/biggest-losers>

#### Response

`[ { "symbol": "IDEX", "price": 0.0021, "name": "Ideanomics, Inc.", "change": -0.0029, "changesPercentage": -58, "exchange": "NASDAQ" } ]`

[Top Traded Stocks API](/developer/docs/stable/most-active)

![Globe Flag](https://intelligence.financialmodelingprep.com/images/icons/globe_flag.png)

View the most actively traded stocks using the Top Traded Stocks API. Identify the companies experiencing the highest trading volumes in the market and track where the most trading activity is happening.

Endpoint:

<https://financialmodelingprep.com/stable/most-actives>

#### Response

`[ { "symbol": "LUCY", "price": 5.03, "name": "Innovative Eyewear, Inc.", "change": -0.01, "changesPercentage": -0.1984, "exchange": "NASDAQ" } ]`

Market Hours
------------

[Global Exchange Market Hours API](/developer/docs/stable/exchange-market-hours)

![Globe Flag](https://intelligence.financialmodelingprep.com/images/icons/globe_flag.png)

Retrieve trading hours for specific stock exchanges using the Global Exchange Market Hours API. Find out the opening and closing times of global exchanges to plan your trading strategies effectively.

Endpoint:

<https://financialmodelingprep.com/stable/exchange-market-hours?exchange\=NASDAQ>

Parameters:

Parameter Type Example
exchange\* string NASDAQ

(\*) Required

#### Response

`[ { "exchange": "NASDAQ", "name": "NASDAQ Global Market", "openingHour": "09:30 AM -04:00", "closingHour": "04:00 PM -04:00", "timezone": "America/New_York", "isMarketOpen": true } ]`

[All Exchange Market Hours API](/developer/docs/stable/all-exchange-market-hours)

![Globe Flag](https://intelligence.financialmodelingprep.com/images/icons/globe_flag.png)

View the market hours for all exchanges. Check when different markets are active.

Endpoint:

<https://financialmodelingprep.com/stable/all-exchange-market-hours>

#### Response

`[ { "exchange": "ASX", "name": "Australian Stock Exchange", "openingHour": "10:00 AM +10:00", "closingHour": "04:00 PM +10:00", "timezone": "Australia/Sydney", "isMarketOpen": false } ]`

News
----

[FMP Articles API](/developer/docs/stable/fmp-articles)

![USA Flag](https://intelligence.financialmodelingprep.com/images/icons/usa_flag.png)

Access the latest articles from Financial Modeling Prep with the FMP Articles API. Get comprehensive updates including headlines, snippets, and publication URLs.

Endpoint:

<https://financialmodelingprep.com/stable/fmp-articles?page\=0&limit\=20>

Parameters:

Parameter Type Example
page number 0
limit number 20

(\*) Required

#### Response

`[ { "title": "Merck Shares Plunge 8% as Weak Guidance Overshadows Strong Revenue Growth", "date": "2025-02-04 09:33:00", "content": "<p><a href='https://financialmodelingprep.com/financial-summary/MRK'>Merck & Co (NYSE:MRK)</a> saw its stock sink over 8% in pre-market today after delivering mixed fourth-quarter results, with earnings missing expectations, revenue exceeding forecasts, and full-year guidance coming in below analyst estimates.</p>\n<p>For Q4, the pharmaceutical giant reported adjusted earnings per share (EPS) of $1.72, falling short of the $1.81 consensus estimate. However, revenue climbed 7% year-over-year to $1...", "tickers": "NYSE:MRK", "image": "https://cdn.financialmodelingprep.com/images/fmp-1738679603793.jpg", "link": "https://financialmodelingprep.com/market-news/fmp-merck-shares-plunge-8-as-weak-guidance-overshadows-strong-revenue-growth", "author": "Davit Kirakosyan", "site": "Financial Modeling Prep" } ]`

[General News API](/developer/docs/stable/general-news)

![Globe Flag](https://intelligence.financialmodelingprep.com/images/icons/globe_flag.png)

Access the latest general news articles from a variety of sources with the FMP General News API. Obtain headlines, snippets, and publication URLs for comprehensive news coverage.

Endpoint:

<https://financialmodelingprep.com/stable/news/general-latest?page\=0&limit\=20>

Parameters:

Parameter Type Example
from date 2025-01-10
to date 2025-04-11
page number 0
limit number 20

(\*) Required | Maximum 250 records per request | Page maxed at 100

#### Response

`[ { "symbol": null, "publishedDate": "2025-02-03 23:51:37", "publisher": "CNBC", "title": "Asia tech stocks rise after Trump pauses tariffs on China and Mexico", "image": "https://images.financialmodelingprep.com/news/asia-tech-stocks-rise-after-trump-pauses-tariffs-on-20250203.jpg", "site": "cnbc.com", "text": "Gains in Asian tech companies were broad-based, with stocks in Japan, South Korea and Hong Kong advancing. Semiconductor players Advantest and Lasertec led gains among Japanese tech stocks.", "url": "https://www.cnbc.com/2025/02/04/asia-tech-stocks-rise-after-trump-pauses-tariffs-on-china-and-mexico.html" } ]`

[Press Releases API](/developer/docs/stable/press-releases)

![USA Flag](https://intelligence.financialmodelingprep.com/images/icons/usa_flag.png)

Access official company press releases with the FMP Press Releases API. Get real-time updates on corporate announcements, earnings reports, mergers, and more.

Endpoint:

<https://financialmodelingprep.com/stable/news/press-releases-latest?page\=0&limit\=20>

Parameters:

Parameter Type Example
from date 2025-01-10
to date 2025-04-11
page number 0
limit number 20

(\*) Required | Maximum 250 records per request | Page maxed at 100

#### Response

`[ { "symbol": "LNW", "publishedDate": "2025-02-03 23:32:00", "publisher": "PRNewsWire", "title": "Rosen Law Firm Encourages Light & Wonder, Inc. Investors to Inquire About Securities Class Action Investigation - LNW", "image": "https://images.financialmodelingprep.com/news/rosen-law-firm-encourages-light-wonder-inc-investors-to-20250203.jpg", "site": "prnewswire.com", "text": "NEW YORK , Feb. 3, 2025 /PRNewswire/ -- Why: Rosen Law Firm, a global investor rights law firm, continues to investigate potential securities claims on behalf of shareholders of Light & Wonder, Inc. (NASDAQ: LNW) resulting from allegations that Light & Wonder may have issued materially misleading business information to the investing public. So What: If you purchased Light & Wonder securities you may be entitled to compensation without payment of any out of pocket fees or costs through a contingency fee arrangement.", "url": "https://www.prnewswire.com/news-releases/rosen-law-firm-encourages-light--wonder-inc-investors-to-inquire-about-securities-class-action-investigation--lnw-302366877.html" } ]`

[Stock News API](/developer/docs/stable/stock-news)

Stay informed with the latest stock market news using the FMP Stock News Feed API. Access headlines, snippets, publication URLs, and ticker symbols for the most recent articles from a variety of sources.

Endpoint:

<https://financialmodelingprep.com/stable/news/stock-latest?page\=0&limit\=20>

Parameters:

Parameter Type Example
from date 2025-01-10
to date 2025-04-11
page number 0
limit number 20

(\*) Required | Maximum 250 records per request | Page maxed at 100

#### Response

`[ { "symbol": "INSG", "publishedDate": "2025-02-03 23:53:40", "publisher": "Seeking Alpha", "title": "Q4 Earnings Release Looms For Inseego, But Don't Expect Miracles", "image": "https://images.financialmodelingprep.com/news/q4-earnings-release-looms-for-inseego-but-dont-expect-20250203.jpg", "site": "seekingalpha.com", "text": "Inseego's Q3 beat was largely due to a one-time debt restructuring gain, not sustainable earnings growth, raising concerns about future performance. The sale of its telematics business for $52 million allows INSG to focus on North America, but it remains to be seen if this was wise. Despite improved margins and reduced debt, Inseego's revenue growth is insufficient, and its high stock price remains unjustifiable for new investors.", "url": "https://seekingalpha.com/article/4754485-inseego-stock-q4-earnings-preview-monitor-growth-margins-closely" } ]`

[Crypto News API](/developer/docs/stable/crypto-news)

Stay informed with the latest cryptocurrency news using the FMP Crypto News API. Access a curated list of articles from various sources, including headlines, snippets, and publication URLs.

Endpoint:

<https://financialmodelingprep.com/stable/news/crypto-latest?page\=0&limit\=20>

Parameters:

Parameter Type Example
from date 2025-01-10
to date 2025-04-11
page number 0
limit number 20

(\*) Required | Maximum 250 records per request | Page maxed at 100

#### Response

`[ { "symbol": "BTCUSD", "publishedDate": "2025-02-03 23:32:19", "publisher": "Coingape", "title": "Crypto Prices Today Feb 4: BTC & Altcoins Recover Amid Pause On Trump's Tariffs", "image": "https://images.financialmodelingprep.com/news/crypto-prices-today-feb-4-btc-altcoins-recover-amid-20250203.webp", "site": "coingape.com", "text": "Crypto prices today have shown signs of recovery as U.S. President Donald Trump's newly announced import tariffs on Canada and Mexico were paused for 30 days. Bitcoin (BTC) price regained its value, hitting a $102K high amid broader market recovery.", "url": "https://coingape.com/crypto-prices-today-feb-4-btc-altcoins-recover-amid-pause-on-trumps-tariffs/" } ]`

[Forex News API](/developer/docs/stable/forex-news)

Stay updated with the latest forex news articles from various sources using the FMP Forex News API. Access headlines, snippets, and publication URLs for comprehensive market insights.

Endpoint:

<https://financialmodelingprep.com/stable/news/forex-latest?page\=0&limit\=20>

Parameters:

Parameter Type Example
from date 2025-01-10
to date 2025-04-11
page number 0
limit number 20

(\*) Required | Maximum 250 records per request | Page maxed at 100

#### Response

`[ { "symbol": "XAUUSD", "publishedDate": "2025-02-03 23:55:44", "publisher": "FX Street", "title": "United Arab Emirates Gold price today: Gold steadies, according to FXStreet data", "image": "https://images.financialmodelingprep.com/news/united-arab-emirates-gold-price-today-gold-steadies-according-20250203.jpg", "site": "fxstreet.com", "text": "Gold prices remained broadly unchanged in United Arab Emirates on Tuesday, according to data compiled by FXStreet.", "url": "https://www.fxstreet.com/news/united-arab-emirates-gold-price-today-gold-steadies-according-to-fxstreet-data-202502040455" } ]`

[Search Press Releases API](/developer/docs/stable/search-press-releases)

![USA Flag](https://intelligence.financialmodelingprep.com/images/icons/usa_flag.png)

Search for company press releases with the FMP Search Press Releases API. Find specific corporate announcements and updates by entering a stock symbol or company name.

Endpoint:

<https://financialmodelingprep.com/stable/news/press-releases?symbols\=AAPL>

Parameters:

Parameter Type Example
symbols\* string AAPL
from date 2025-01-10
to date 2025-04-11
page number 0
limit number 20

(\*) Required | Maximum 250 records per request | Page maxed at 100

#### Response

`[ { "symbol": "AAPL", "publishedDate": "2025-01-30 16:30:00", "publisher": "Business Wire", "title": "Apple reports first quarter results", "image": "https://images.financialmodelingprep.com/news/apple-reports-first-quarter-results-20250130.jpg", "site": "businesswire.com", "text": "CUPERTINO, Calif.--(BUSINESS WIRE)--Apple® today announced financial results for its fiscal 2025 first quarter ended December 28, 2024. The Company posted quarterly revenue of $124.3 billion, up 4 percent year over year, and quarterly diluted earnings per share of $2.40, up 10 percent year over year. “Today Apple is reporting our best quarter ever, with revenue of $124.3 billion, up 4 percent from a year ago,” said Tim Cook, Apple's CEO. “We were thrilled to bring customers our best-ever lineup.", "url": "https://www.businesswire.com/news/home/20250130261281/en/Apple-reports-first-quarter-results/" } ]`

[Search Stock News API](/developer/docs/stable/search-stock-news)

Search for stock-related news using the FMP Search Stock News API. Find specific stock news by entering a ticker symbol or company name to track the latest developments.

Endpoint:

<https://financialmodelingprep.com/stable/news/stock?symbols\=AAPL>

Parameters:

Parameter Type Example
symbols\* string AAPL
from date 2025-01-10
to date 2025-04-11
page number 0
limit number 20

(\*) Required | Maximum 250 records per request | Page maxed at 100

#### Response

`[ { "symbol": "AAPL", "publishedDate": "2025-02-03 21:05:14", "publisher": "Zacks Investment Research", "title": "Apple & China Tariffs: A Closer Look", "image": "https://images.financialmodelingprep.com/news/apple-china-tariffs-a-closer-look-20250203.jpg", "site": "zacks.com", "text": "Tariffs have been the talk of the town over recent weeks, regularly overshadowing other important developments and causing volatility spikes.", "url": "https://www.zacks.com/stock/news/2408814/apple-china-tariffs-a-closer-look?cid=CS-STOCKNEWSAPI-FT-stocks_in_the_news-2408814" } ]`

[Search Crypto News API](/developer/docs/stable/search-crypto-news)

Search for cryptocurrency news using the FMP Search Crypto News API. Retrieve news related to specific coins or tokens by entering their name or symbol.

Endpoint:

<https://financialmodelingprep.com/stable/news/crypto?symbols\=BTCUSD>

Parameters:

Parameter Type Example
symbols\* string BTCUSD
from date 2025-01-10
to date 2025-04-11
page number 0
limit number 20

(\*) Required | Maximum 250 records per request | Page maxed at 100

#### Response

`[ { "symbol": "BTCUSD", "publishedDate": "2025-02-03 23:32:19", "publisher": "Coingape", "title": "Crypto Prices Today Feb 4: BTC & Altcoins Recover Amid Pause On Trump's Tariffs", "image": "https://images.financialmodelingprep.com/news/crypto-prices-today-feb-4-btc-altcoins-recover-amid-20250203.webp", "site": "coingape.com", "text": "Crypto prices today have shown signs of recovery as U.S. President Donald Trump's newly announced import tariffs on Canada and Mexico were paused for 30 days. Bitcoin (BTC) price regained its value, hitting a $102K high amid broader market recovery.", "url": "https://coingape.com/crypto-prices-today-feb-4-btc-altcoins-recover-amid-pause-on-trumps-tariffs/" } ]`

[Search Forex News API](/developer/docs/stable/search-forex-news)

Search for foreign exchange news using the FMP Search Forex News API. Find targeted news on specific currency pairs by entering their symbols for focused updates.

Endpoint:

<https://financialmodelingprep.com/stable/news/forex?symbols\=EURUSD>

Parameters:

Parameter Type Example
symbols\* string EURUSD
from date 2025-01-10
to date 2025-04-11
page number 0
limit number 20

(\*) Required | Maximum 250 records per request | Page maxed at 100

#### Response

`[ { "symbol": "EURUSD", "publishedDate": "2025-02-03 18:43:01", "publisher": "FX Street", "title": "EUR/USD trims losses but still sheds weight", "image": "https://images.financialmodelingprep.com/news/eurusd-trims-losses-but-still-sheds-weight-20250203.jpg", "site": "fxstreet.com", "text": "EUR/USD dropped sharply following fresh tariff threats from US President Donald Trump, impacting the markets. However, significant declines in global risk markets eased as the Trump administration offered 30-day concessions on impending tariffs for Canada and Mexico.", "url": "https://www.fxstreet.com/news/eur-usd-trims-losses-but-still-sheds-weight-202502032343" } ]`

Technical Indicators
--------------------

[Simple Moving Average API](/developer/docs/stable/simple-moving-average)

![Globe Flag](https://intelligence.financialmodelingprep.com/images/icons/globe_flag.png)

Endpoint:

<https://financialmodelingprep.com/stable/technical-indicators/sma?symbol\=AAPL&periodLength\=10&timeframe\=1day>

Parameters:

Parameter Type Example
symbol\* string AAPL
periodLength\* number 10
timeframe\* string 1min,5min,15min,30min,1hour,4hour,1day
from date 2025-01-10
to date 2025-04-10

(\*) Required

#### Response

`[ { "date": "2025-02-04 00:00:00", "open": 227.2, "high": 233.13, "low": 226.65, "close": 232.8, "volume": 44489128, "sma": 231.215 } ]`

[Exponential Moving Average API](/developer/docs/stable/exponential-moving-average)

![Globe Flag](https://intelligence.financialmodelingprep.com/images/icons/globe_flag.png)

Endpoint:

<https://financialmodelingprep.com/stable/technical-indicators/ema?symbol\=AAPL&periodLength\=10&timeframe\=1day>

Parameters:

Parameter Type Example
symbol\* string AAPL
periodLength\* number 10
timeframe\* string 1min,5min,15min,30min,1hour,4hour,1day
from date 2025-01-10
to date 2025-04-10

(\*) Required

#### Response

`[ { "date": "2025-02-04 00:00:00", "open": 227.2, "high": 233.13, "low": 226.65, "close": 232.8, "volume": 44489128, "ema": 232.8406611792779 } ]`

[Weighted Moving Average API](/developer/docs/stable/weighted-moving-average)

![Globe Flag](https://intelligence.financialmodelingprep.com/images/icons/globe_flag.png)

Endpoint:

<https://financialmodelingprep.com/stable/technical-indicators/wma?symbol\=AAPL&periodLength\=10&timeframe\=1day>

Parameters:

Parameter Type Example
symbol\* string AAPL
periodLength\* number 10
timeframe\* string 1min,5min,15min,30min,1hour,4hour,1day
from date 2025-01-10
to date 2025-04-10

(\*) Required

#### Response

`[ { "date": "2025-02-04 00:00:00", "open": 227.2, "high": 233.13, "low": 226.65, "close": 232.8, "volume": 44489128, "wma": 233.04745454545454 } ]`

[Double Exponential Moving Average API](/developer/docs/stable/double-exponential-moving-average)

![Globe Flag](https://intelligence.financialmodelingprep.com/images/icons/globe_flag.png)

Endpoint:

<https://financialmodelingprep.com/stable/technical-indicators/dema?symbol\=AAPL&periodLength\=10&timeframe\=1day>

Parameters:

Parameter Type Example
symbol\* string AAPL
periodLength\* number 10
timeframe\* string 1min,5min,15min,30min,1hour,4hour,1day
from date 2025-01-10
to date 2025-04-10

(\*) Required

#### Response

`[ { "date": "2025-02-04 00:00:00", "open": 227.2, "high": 233.13, "low": 226.65, "close": 232.8, "volume": 44489128, "dema": 232.10592058582725 } ]`

[Triple Exponential Moving Average API](/developer/docs/stable/triple-exponential-moving-average)

![Globe Flag](https://intelligence.financialmodelingprep.com/images/icons/globe_flag.png)

Endpoint:

<https://financialmodelingprep.com/stable/technical-indicators/tema?symbol\=AAPL&periodLength\=10&timeframe\=1day>

Parameters:

Parameter Type Example
symbol\* string AAPL
periodLength\* number 10
timeframe\* string 1min,5min,15min,30min,1hour,4hour,1day
from date 2025-01-10
to date 2025-04-10

(\*) Required

#### Response

`[ { "date": "2025-02-04 00:00:00", "open": 227.2, "high": 233.13, "low": 226.65, "close": 232.8, "volume": 44489128, "tema": 233.66383715917516 } ]`

[Relative Strength Index API](/developer/docs/stable/relative-strength-index)

![Globe Flag](https://intelligence.financialmodelingprep.com/images/icons/globe_flag.png)

Endpoint:

<https://financialmodelingprep.com/stable/technical-indicators/rsi?symbol\=AAPL&periodLength\=10&timeframe\=1day>

Parameters:

Parameter Type Example
symbol\* string AAPL
periodLength\* number 10
timeframe\* string 1min,5min,15min,30min,1hour,4hour,1day
from date 2025-01-10
to date 2025-04-10

(\*) Required

#### Response

`[ { "date": "2025-02-04 00:00:00", "open": 227.2, "high": 233.13, "low": 226.65, "close": 232.8, "volume": 44489128, "rsi": 47.64507340768903 } ]`

[Standard Deviation API](/developer/docs/stable/standard-deviation)

![Globe Flag](https://intelligence.financialmodelingprep.com/images/icons/globe_flag.png)

Endpoint:

<https://financialmodelingprep.com/stable/technical-indicators/standarddeviation?symbol\=AAPL&periodLength\=10&timeframe\=1day>

Parameters:

Parameter Type Example
symbol\* string AAPL
periodLength\* number 10
timeframe\* string 1min,5min,15min,30min,1hour,4hour,1day
from date 2025-01-10
to date 2025-04-10

(\*) Required

#### Response

`[ { "date": "2025-02-04 00:00:00", "open": 227.2, "high": 233.13, "low": 226.65, "close": 232.8, "volume": 44489128, "standardDeviation": 6.139182763202282 } ]`

[Williams API](/developer/docs/stable/williams)

![Globe Flag](https://intelligence.financialmodelingprep.com/images/icons/globe_flag.png)

Endpoint:

<https://financialmodelingprep.com/stable/technical-indicators/williams?symbol\=AAPL&periodLength\=10&timeframe\=1day>

Parameters:

Parameter Type Example
symbol\* string AAPL
periodLength\* number 10
timeframe\* string 1min,5min,15min,30min,1hour,4hour,1day
from date 2025-01-10
to date 2025-04-10

(\*) Required

#### Response

`[ { "date": "2025-02-04 00:00:00", "open": 227.2, "high": 233.13, "low": 226.65, "close": 232.8, "volume": 44489128, "williams": -52.51824817518242 } ]`

[Average Directional Index API](/developer/docs/stable/average-directional-index)

![Globe Flag](https://intelligence.financialmodelingprep.com/images/icons/globe_flag.png)

Endpoint:

<https://financialmodelingprep.com/stable/technical-indicators/adx?symbol\=AAPL&periodLength\=10&timeframe\=1day>

Parameters:

Parameter Type Example
symbol\* string AAPL
periodLength\* number 10
timeframe\* string 1min,5min,15min,30min,1hour,4hour,1day
from date 2025-01-10
to date 2025-04-10

(\*) Required

#### Response

`[ { "date": "2025-02-04 00:00:00", "open": 227.2, "high": 233.13, "low": 226.65, "close": 232.8, "volume": 44489128, "adx": 26.414065772772613 } ]`

Quote
-----

[Stock Quote API](/developer/docs/stable/quote)

![Globe Flag](https://intelligence.financialmodelingprep.com/images/icons/globe_flag.png)

Access real-time stock quotes with the FMP Stock Quote API. Get up-to-the-minute prices, changes, and volume data for individual stocks.

Endpoint:

<https://financialmodelingprep.com/stable/quote?symbol\=AAPL>

Parameters:

Parameter Type Example
symbol\* string AAPL

(\*) Required

#### Response

`[ { "symbol": "AAPL", "name": "Apple Inc.", "price": 232.8, "changePercentage": 2.1008, "change": 4.79, "volume": 44489128, "dayLow": 226.65, "dayHigh": 233.13, "yearHigh": 260.1, "yearLow": 164.08, "marketCap": 3500823120000, "priceAvg50": 240.2278, "priceAvg200": 219.98755, "exchange": "NASDAQ", "open": 227.2, "previousClose": 228.01, "timestamp": 1738702801 } ]`

[Stock Quote Short API](/developer/docs/stable/quote-short)

![Globe Flag](https://intelligence.financialmodelingprep.com/images/icons/globe_flag.png)

Get quick snapshots of real-time stock quotes with the FMP Stock Quote Short API. Access key stock data like current price, volume, and price changes for instant market insights.

Endpoint:

<https://financialmodelingprep.com/stable/quote-short?symbol\=AAPL>

Parameters:

Parameter Type Example
symbol\* string AAPL

(\*) Required

#### Response

`[ { "symbol": "AAPL", "price": 232.8, "change": 4.79, "volume": 44489128 } ]`

[Aftermarket Trade API](/developer/docs/stable/aftermarket-trade)

![USA Flag](https://intelligence.financialmodelingprep.com/images/icons/usa_flag.png)

Track real-time trading activity occurring after regular market hours with the FMP Aftermarket Trade API. Access key details such as trade prices, sizes, and timestamps for trades executed during the post-market session.

Endpoint:

<https://financialmodelingprep.com/stable/aftermarket-trade?symbol\=AAPL>

Parameters:

Parameter Type Example
symbol\* string AAPL

(\*) Required

#### Response

`[ { "symbol": "AAPL", "price": 232.53, "tradeSize": 132, "timestamp": 1738715334311 } ]`

[Aftermarket Quote API](/developer/docs/stable/aftermarket-quote)

![USA Flag](https://intelligence.financialmodelingprep.com/images/icons/usa_flag.png)

Access real-time aftermarket quotes for stocks with the FMP Aftermarket Quote API. Track bid and ask prices, volume, and other relevant data outside of regular trading hours.

Endpoint:

<https://financialmodelingprep.com/stable/aftermarket-quote?symbol\=AAPL>

Parameters:

Parameter Type Example
symbol\* string AAPL

(\*) Required

#### Response

`[ { "symbol": "AAPL", "bidSize": 1, "bidPrice": 232.45, "askSize": 3, "askPrice": 232.64, "volume": 41647042, "timestamp": 1738715334311 } ]`

[Stock Price Change API](/developer/docs/stable/quote-change)

![Globe Flag](https://intelligence.financialmodelingprep.com/images/icons/globe_flag.png)

Track stock price fluctuations in real-time with the FMP Stock Price Change API. Monitor percentage and value changes over various time periods, including daily, weekly, monthly, and long-term.

Endpoint:

<https://financialmodelingprep.com/stable/stock-price-change?symbol\=AAPL>

Parameters:

Parameter Type Example
symbol\* string AAPL

(\*) Required

#### Response

`[ { "symbol": "AAPL", "1D": 2.1008, "5D": -2.45946, "1M": -4.33925, "3M": 4.86014, "6M": 5.88556, "ytd": -4.53147, "1Y": 24.04092, "3Y": 35.04264, "5Y": 192.05871, "10Y": 678.8558, "max": 181279.04168 } ]`

[Stock Batch Quote API](/developer/docs/stable/batch-quote)

![Globe Flag](https://intelligence.financialmodelingprep.com/images/icons/globe_flag.png)

Retrieve multiple real-time stock quotes in a single request with the FMP Stock Batch Quote API. Access current prices, volume, and detailed data for multiple companies at once, making it easier to track large portfolios or monitor multiple stocks simultaneously.

Endpoint:

<https://financialmodelingprep.com/stable/batch-quote?symbols\=AAPL>

Parameters:

Parameter Type Example
symbols\* string AAPL

(\*) Required

#### Response

`[ { "symbol": "AAPL", "name": "Apple Inc.", "price": 232.8, "changePercentage": 2.1008, "change": 4.79, "volume": 44489128, "dayLow": 226.65, "dayHigh": 233.13, "yearHigh": 260.1, "yearLow": 164.08, "marketCap": 3500823120000, "priceAvg50": 240.2278, "priceAvg200": 219.98755, "exchange": "NASDAQ", "open": 227.2, "previousClose": 228.01, "timestamp": 1738702801 } ]`

[Stock Batch Quote Short API](/developer/docs/stable/batch-quote-short)

![Globe Flag](https://intelligence.financialmodelingprep.com/images/icons/globe_flag.png)

Access real-time, short-form quotes for multiple stocks with the FMP Stock Batch Quote Short API. Get a quick snapshot of key stock data such as current price, change, and volume for several companies in one streamlined request.

Endpoint:

<https://financialmodelingprep.com/stable/batch-quote-short?symbols\=AAPL>

Parameters:

Parameter Type Example
symbols\* string AAPL

(\*) Required

#### Response

`[ { "symbol": "AAPL", "price": 232.8, "change": 4.79, "volume": 44489128 } ]`

[Batch Aftermarket Trade API](/developer/docs/stable/batch-aftermarket-trade)

![USA Flag](https://intelligence.financialmodelingprep.com/images/icons/usa_flag.png)

Retrieve real-time aftermarket trading data for multiple stocks with the FMP Batch Aftermarket Trade API. Track post-market trade prices, volumes, and timestamps across several companies simultaneously.

Endpoint:

<https://financialmodelingprep.com/stable/batch-aftermarket-trade?symbols\=AAPL>

Parameters:

Parameter Type Example
symbols\* string AAPL

(\*) Required

#### Response

`[ { "symbol": "AAPL", "price": 232.53, "tradeSize": 132, "timestamp": 1738715334311 } ]`

[Batch Aftermarket Quote API](/developer/docs/stable/batch-aftermarket-quote)

![USA Flag](https://intelligence.financialmodelingprep.com/images/icons/usa_flag.png)

Retrieve real-time aftermarket quotes for multiple stocks with the FMP Batch Aftermarket Quote API. Access bid and ask prices, volume, and other relevant data for several companies during post-market trading.

Endpoint:

<https://financialmodelingprep.com/stable/batch-aftermarket-quote?symbols\=AAPL>

Parameters:

Parameter Type Example
symbols\* string AAPL

(\*) Required

#### Response

`[ { "symbol": "AAPL", "bidSize": 1, "bidPrice": 232.45, "askSize": 3, "askPrice": 232.64, "volume": 41647042, "timestamp": 1738715334311 } ]`

[Exchange Stock Quotes API](/developer/docs/stable/full-exchange-quotes)

![Globe Flag](https://intelligence.financialmodelingprep.com/images/icons/globe_flag.png)

Retrieve real-time stock quotes for all listed stocks on a specific exchange with the FMP Exchange Stock Quotes API. Track price changes and trading activity across the entire exchange.

Endpoint:

<https://financialmodelingprep.com/stable/batch-exchange-quote?exchange\=NASDAQ>

Parameters:

Parameter Type Example
exchange\* string NASDAQ
short boolean true

(\*) Required

#### Response

`[ { "symbol": "AAACX", "price": 6.38, "change": 0, "volume": 0 } ]`

[Mutual Fund Price Quotes API](/developer/docs/stable/full-mutualfund-quotes)

![USA Flag](https://intelligence.financialmodelingprep.com/images/icons/usa_flag.png)

Access real-time quotes for mutual funds with the FMP Mutual Fund Price Quotes API. Track current prices, performance changes, and key data for various mutual funds.

Endpoint:

<https://financialmodelingprep.com/stable/batch-mutualfund-quotes>

Parameters:

Parameter Type Example
short boolean true

(\*) Required

#### Response

`[ { "symbol": "ARCFX", "price": 9.84, "change": 0.01, "volume": 0 } ]`

[ETF Price Quotes API](/developer/docs/stable/full-etf-quotes)

![Globe Flag](https://intelligence.financialmodelingprep.com/images/icons/globe_flag.png)

Get real-time price quotes for exchange-traded funds (ETFs) with the FMP ETF Price Quotes API. Track current prices, performance changes, and key data for a wide variety of ETFs.

Endpoint:

<https://financialmodelingprep.com/stable/batch-etf-quotes>

Parameters:

Parameter Type Example
short boolean true

(\*) Required

#### Response

`[ { "symbol": "GULF", "price": 16.335, "change": 0.13, "volume": 3032 } ]`

[Full Commodities Quotes API](/developer/docs/stable/full-commodities-quotes)

Get up-to-the-minute quotes for commodities with the FMP Real-Time Commodities Quotes API. Track the latest prices, changes, and volumes for a wide range of commodities, including oil, gold, and agricultural products.

Endpoint:

<https://financialmodelingprep.com/stable/batch-commodity-quotes>

Parameters:

Parameter Type Example
short boolean true

(\*) Required

#### Response

`[ { "symbol": "DCUSD", "price": 19.89, "change": 0.23, "volume": 442 } ]`

[Full Cryptocurrency Quotes API](/developer/docs/stable/full-cryptocurrency-quotes)

Access real-time cryptocurrency quotes with the FMP Full Cryptocurrency Quotes API. Track live prices, trading volumes, and price changes for a wide range of digital assets.

Endpoint:

<https://financialmodelingprep.com/stable/batch-crypto-quotes>

Parameters:

Parameter Type Example
short boolean true

(\*) Required

#### Response

`[ { "symbol": "00USD", "price": 0.03071157, "change": -0.0026034, "volume": 169600 } ]`

[Full Forex Quote API](/developer/docs/stable/full-forex-quotes)

Retrieve real-time quotes for multiple forex currency pairs with the FMP Batch Forex Quote API. Get real-time price changes and updates for a variety of forex pairs in a single request.

Endpoint:

<https://financialmodelingprep.com/stable/batch-forex-quotes>

Parameters:

Parameter Type Example
short boolean true

(\*) Required

#### Response

`[ { "symbol": "AEDAUD", "price": 0.43575, "change": 0.0009547891, "volume": 344 } ]`

[Full Index Quotes API](/developer/docs/stable/full-index-quotes)

Track real-time movements of major stock market indexes with the FMP Stock Market Index Quotes API. Access live quotes for global indexes and monitor changes in their performance.

Endpoint:

<https://financialmodelingprep.com/stable/batch-index-quotes>

Parameters:

Parameter Type Example
short boolean true

(\*) Required

#### Response

`[ { "symbol": "^DJBGIE", "price": 4277.52, "change": -15.7, "volume": 0 } ]`

Earnings Transcript
-------------------

[Latest Earning Transcripts API](/developer/docs/stable/latest-transcripts)

![Globe Flag](https://intelligence.financialmodelingprep.com/images/icons/globe_flag.png)

Access available earnings transcripts for companies with the FMP Latest Earning Transcripts API. Retrieve a list of companies with earnings transcripts, along with the total number of transcripts available for each company.

Endpoint:

<https://financialmodelingprep.com/stable/earning-call-transcript-latest>

Parameters:

Parameter Type Example
limit number 100
page number 0

(\*) Required

#### Response

`[ { "symbol": "CSWC", "period": "Q3", "fiscalYear": 2025, "date": "2025-02-04" } ]`

[Earnings Transcript API](/developer/docs/stable/search-transcripts)

![Globe Flag](https://intelligence.financialmodelingprep.com/images/icons/globe_flag.png)

Access the full transcript of a company’s earnings call with the FMP Earnings Transcript API. Stay informed about a company’s financial performance, future plans, and overall strategy by analyzing management's communication.

Endpoint:

<https://financialmodelingprep.com/stable/earning-call-transcript?symbol\=AAPL&year\=2020&quarter\=3>

Parameters:

Parameter Type Example
symbol\* string AAPL
year\* string 2020
quarter\* string 3
limit number 1

(\*) Required

#### Response

`[ { "symbol": "AAPL", "period": "Q3", "year": 2020, "date": "2020-07-30", "content": "Operator: Good day, everyone. Welcome to the Apple Incorporated Third Quarter Fiscal Year 2020 Earnings Conference Call. Today's call is being recorded. At this time, for opening remarks and introductions, I would like to turn things over to Mr. Tejas Gala, Senior Manager, Corporate Finance and Investor Relations. Please go ahead, sir.\nTejas Gala: Thank you. Good afternoon and thank you for joining us. Speaking first today is Apple's CEO, Tim Cook; and he'll be followed by CFO, Luca Maestri. Aft..." } ]`

[Transcripts Dates By Symbol API](/developer/docs/stable/transcripts-dates-by-symbol)

![Globe Flag](https://intelligence.financialmodelingprep.com/images/icons/globe_flag.png)

Access earnings call transcript dates for specific companies with the FMP Transcripts Dates By Symbol API. Get a comprehensive overview of earnings call schedules based on fiscal year and quarter.

Endpoint:

<https://financialmodelingprep.com/stable/earning-call-transcript-dates?symbol\=AAPL>

Parameters:

Parameter Type Example
symbol\* string AAPL

(\*) Required

#### Response

`[ { "quarter": 1, "fiscalYear": 2025, "date": "2025-01-30" } ]`

[Available Transcript Symbols API](/developer/docs/stable/available-transcript-symbols)

![Globe Flag](https://intelligence.financialmodelingprep.com/images/icons/globe_flag.png)

Access a complete list of stock symbols with available earnings call transcripts using the FMP Available Earnings Transcript Symbols API. Retrieve information on which companies have earnings transcripts and how many are accessible for detailed financial analysis.

Endpoint:

<https://financialmodelingprep.com/stable/earnings-transcript-list>

#### Response

`[ { "symbol": "MCUJF", "companyName": "Medicure Inc.", "noOfTranscripts": "16" } ]`

Sec Filings
-----------

[Latest 8-K SEC Filings API](/developer/docs/stable/8k-latest)

![USA Flag](https://intelligence.financialmodelingprep.com/images/icons/usa_flag.png)

Stay up-to-date with the most recent 8-K filings from publicly traded companies using the FMP Latest 8-K SEC Filings API. Get real-time access to significant company events such as mergers, acquisitions, leadership changes, and other material events that may impact the market.

Endpoint:

<https://financialmodelingprep.com/stable/sec-filings-8k?from\=2024-01-01&to\=2024-03-01&page\=0&limit\=100>

Parameters:

Parameter Type Example
from\* string 2024-01-01
to\* string 2024-03-01
page number 0
limit number 100

(\*) Required | Maximum 1000 records per request | Page maxed at 100 | Max 90-day date range

#### Response

`[ { "symbol": "BROS", "cik": "0001866581", "filingDate": "2024-03-01 00:00:00", "acceptedDate": "2024-02-29 21:43:41", "formType": "8-K", "hasFinancials": false, "link": "https://www.sec.gov/Archives/edgar/data/1866581/000162828024008098/0001628280-24-008098-index.htm", "finalLink": "https://www.sec.gov/Archives/edgar/data/1866581/000162828024008098/exhibit11-8xkfeb2024.htm" } ]`

[Latest SEC Filings API](/developer/docs/stable/financials-latest)

![USA Flag](https://intelligence.financialmodelingprep.com/images/icons/usa_flag.png)

Stay updated with the most recent SEC filings from publicly traded companies using the FMP Latest SEC Filings API. Access essential regulatory documents, including financial statements, annual reports, 8-K, 10-K, and 10-Q forms.

Endpoint:

<https://financialmodelingprep.com/stable/sec-filings-financials?from\=2024-01-01&to\=2024-03-01&page\=0&limit\=100>

Parameters:

Parameter Type Example
from\* string 2024-01-01
to\* string 2024-03-01
page number 0
limit number 100

(\*) Required | Maximum 1000 records per request | Page maxed at 100 | Max 90-day date range

#### Response

`[ { "symbol": "MTZ", "cik": "0000015615", "filingDate": "2024-03-01 00:00:00", "acceptedDate": "2024-02-29 21:24:32", "formType": "8-K", "hasFinancials": true, "link": "https://www.sec.gov/Archives/edgar/data/15615/000119312524054015/0001193125-24-054015-index.htm", "finalLink": "https://www.sec.gov/Archives/edgar/data/15615/000119312524054015/d775448dex991.htm" } ]`

[SEC Filings By Form Type API](/developer/docs/stable/search-by-form-type)

![USA Flag](https://intelligence.financialmodelingprep.com/images/icons/usa_flag.png)

Search for specific SEC filings by form type with the FMP SEC Filings By Form Type API. Retrieve filings such as 10-K, 10-Q, 8-K, and others, filtered by the exact type of document you're looking for.

Endpoint:

<https://financialmodelingprep.com/stable/sec-filings-search/form-type?formType\=8-K&from\=2024-01-01&to\=2024-03-01&page\=0&limit\=100>

Parameters:

Parameter Type Example
formType\* string 8-K
from\* string 2024-01-01
to\* string 2024-03-01
page number 0
limit number 100

(\*) Required | Maximum 1000 records per request | Page maxed at 100

#### Response

`[ { "symbol": "BROS", "cik": "0001866581", "filingDate": "2024-03-01 00:00:00", "acceptedDate": "2024-02-29 21:43:41", "formType": "8-K", "link": "https://www.sec.gov/Archives/edgar/data/1866581/000162828024008098/0001628280-24-008098-index.htm", "finalLink": "https://www.sec.gov/Archives/edgar/data/1866581/000162828024008098/exhibit11-8xkfeb2024.htm" } ]`

[SEC Filings By Symbol API](/developer/docs/stable/search-by-symbol)

![USA Flag](https://intelligence.financialmodelingprep.com/images/icons/usa_flag.png)

Search and retrieve SEC filings by company symbol using the FMP SEC Filings By Symbol API. Gain direct access to regulatory filings such as 8-K, 10-K, and 10-Q reports for publicly traded companies.

Endpoint:

<https://financialmodelingprep.com/stable/sec-filings-search/symbol?symbol\=AAPL&from\=2024-01-01&to\=2024-03-01&page\=0&limit\=100>

Parameters:

Parameter Type Example
symbol\* string AAPL
from\* string 2024-01-01
to\* string 2024-03-01
page number 0
limit number 100

(\*) Required | Maximum 1000 records per request | Page maxed at 100

#### Response

`[ { "symbol": "AAPL", "cik": "0000320193", "filingDate": "2024-02-28 00:00:00", "acceptedDate": "2024-02-28 17:09:05", "formType": "8-K", "link": "https://www.sec.gov/Archives/edgar/data/320193/000114036124010155/0001140361-24-010155-index.htm", "finalLink": "https://www.sec.gov/Archives/edgar/data/320193/000114036124010155/ny20022580x1_image01.jpg" } ]`

[SEC Filings By CIK API](/developer/docs/stable/search-by-cik)

![USA Flag](https://intelligence.financialmodelingprep.com/images/icons/usa_flag.png)

Search for SEC filings using the FMP SEC Filings By CIK API. Access detailed regulatory filings by Central Index Key (CIK) number, enabling you to track all filings related to a specific company or entity.

Endpoint:

<https://financialmodelingprep.com/stable/sec-filings-search/cik?cik\=0000320193&from\=2024-01-01&to\=2024-03-01&page\=0&limit\=100>

Parameters:

Parameter Type Example
cik\* string 0000320193
from\* string 2024-01-01
to\* string 2024-03-01
page number 0
limit number 100

(\*) Required | Maximum 1000 records per request | Page maxed at 100

#### Response

`[ { "symbol": "AAPL", "cik": "0000320193", "filingDate": "2024-02-28 00:00:00", "acceptedDate": "2024-02-28 17:09:05", "formType": "8-K", "link": "https://www.sec.gov/Archives/edgar/data/320193/000114036124010155/0001140361-24-010155-index.htm", "finalLink": "https://www.sec.gov/Archives/edgar/data/320193/000114036124010155/ny20022580x1_image01.jpg" } ]`

[SEC Filings By Name API](/developer/docs/stable/search-by-name)

![USA Flag](https://intelligence.financialmodelingprep.com/images/icons/usa_flag.png)

Search for SEC filings by company or entity name using the FMP SEC Filings By Name API. Quickly retrieve official filings for any organization based on its name.

Endpoint:

<https://financialmodelingprep.com/stable/sec-filings-company-search/name?company\=Berkshire>

Parameters:

Parameter Type Example
company\* string Berkshire

(\*) Required

#### Response

`[ { "symbol": "None", "name": "BERKSHIRE MULTIFAMILY VALUE FUND II LP", "cik": "0001418405", "sicCode": "", "industryTitle": "", "businessAddress": "c/o Berkshire Property Advisors LLC, Boston MA 02108", "phoneNumber": "(617) 646-2300" } ]`

[SEC Filings Company Search By Symbol API](/developer/docs/stable/company-search-by-symbol)

![USA Flag](https://intelligence.financialmodelingprep.com/images/icons/usa_flag.png)

Find company information and regulatory filings using a stock symbol with the FMP SEC Filings Company Search By Symbol API. Quickly access essential company details based on stock ticker symbols.

Endpoint:

<https://financialmodelingprep.com/stable/sec-filings-company-search/symbol?symbol\=AAPL>

Parameters:

Parameter Type Example
symbol\* string AAPL

(\*) Required

#### Response

`[ { "symbol": "AAPL", "name": "APPLE INC.", "cik": "0000320193", "sicCode": "3571", "industryTitle": "ELECTRONIC COMPUTERS", "businessAddress": "ONE APPLE PARK WAY, CUPERTINO CA 95014", "phoneNumber": "(408) 996-1010" } ]`

[SEC Filings Company Search By CIK API](/developer/docs/stable/company-search-by-cik)

![USA Flag](https://intelligence.financialmodelingprep.com/images/icons/usa_flag.png)

Easily find company information using a CIK (Central Index Key) with the FMP SEC Filings Company Search By CIK API. Access essential company details and filings linked to a specific CIK number.

Endpoint:

<https://financialmodelingprep.com/stable/sec-filings-company-search/cik?cik\=0000320193>

Parameters:

Parameter Type Example
cik\* string 0000320193

(\*) Required

#### Response

`[ { "symbol": "AAPL", "name": "APPLE INC.", "cik": "0000320193", "sicCode": "3571", "industryTitle": "ELECTRONIC COMPUTERS", "businessAddress": "ONE APPLE PARK WAY, CUPERTINO CA 95014", "phoneNumber": "(408) 996-1010" } ]`

[SEC Company Full Profile API](/developer/docs/stable/sec-company-full-profile)

![USA Flag](https://intelligence.financialmodelingprep.com/images/icons/usa_flag.png)

Retrieve detailed company profiles, including business descriptions, executive details, contact information, and financial data with the FMP SEC Company Full Profile API.

Endpoint:

<https://financialmodelingprep.com/stable/sec-profile?symbol\=AAPL>

Parameters:

Parameter Type Example
symbol\* string AAPL
cik-A string 320193

(\*) Required

#### Response

`[ { "symbol": "AAPL", "cik": "0000320193", "registrantName": "Apple Inc.", "sicCode": "3571", "sicDescription": "Electronic Computers", "sicGroup": "Consumer Electronics", "isin": "US0378331005", "businessAddress": "ONE APPLE PARK WAY,CUPERTINO CA 95014,(408) 996-1010", "mailingAddress": "ONE APPLE PARK WAY,CUPERTINO CA 95014", "phoneNumber": "(408) 996-1010", "postalCode": "95014", "city": "Cupertino", "state": "CA", "country": "US", "description": "Apple Inc. designs, manufactures, and markets smartphones, personal computers, tablets, wearables, and accessories worldwide. The company offers iPhone, a line of smartphones; Mac, a line of personal computers; iPad, a line of multi-purpose tablets; and wearables, home, and accessories comprising AirPods, Apple TV, Apple Watch, Beats products, and HomePod. It also provides AppleCare support and cloud services; and operates various platforms, including the App Store that allow customers to discov...", "ceo": "Mr. Timothy D. Cook", "website": "https://www.apple.com", "exchange": "NASDAQ", "stateLocation": "CA", "stateOfIncorporation": "CA", "fiscalYearEnd": "09-28", "ipoDate": "1980-12-12", "employees": "164000", "secFilingsUrl": "https://www.sec.gov/cgi-bin/browse-edgar?CIK=0000320193", "taxIdentificationNumber": "94-2404110", "fiftyTwoWeekRange": "164.08 - 260.1", "isActive": true, "assetType": "stock", "openFigiComposite": "BBG000B9XRY4", "priceCurrency": "USD", "marketSector": "Technology", "securityType": null, "isEtf": false, "isAdr": false, "isFund": false } ]`

[Industry Classification List API](/developer/docs/stable/industry-classification-list)

![USA Flag](https://intelligence.financialmodelingprep.com/images/icons/usa_flag.png)

Retrieve a comprehensive list of industry classifications, including Standard Industrial Classification (SIC) codes and industry titles with the FMP Industry Classification List API.

Endpoint:

<https://financialmodelingprep.com/stable/standard-industrial-classification-list>

Parameters:

Parameter Type Example
industryTitle string SERVICES
sicCode string 7371

(\*) Required

#### Response

`[ { "office": "Office of Life Sciences", "sicCode": "100", "industryTitle": "AGRICULTURAL PRODUCTION-CROPS" } ]`

[Industry Classification Search API](/developer/docs/stable/industry-classification-search)

![USA Flag](https://intelligence.financialmodelingprep.com/images/icons/usa_flag.png)

Search and retrieve industry classification details for companies, including SIC codes, industry titles, and business information, with the FMP Industry Classification Search API.

Endpoint:

<https://financialmodelingprep.com/stable/industry-classification-search>

Parameters:

Parameter Type Example
symbol string AAPL
cik string 320193
sicCode string 7371

(\*) Required

#### Response

`[ { "symbol": "AAPL", "name": "APPLE INC.", "cik": "0000320193", "sicCode": "3571", "industryTitle": "ELECTRONIC COMPUTERS", "businessAddress": "['ONE APPLE PARK WAY', 'CUPERTINO CA 95014']", "phoneNumber": "(408) 996-1010" } ]`

[All Industry Classification API](/developer/docs/stable/all-industry-classification)

![USA Flag](https://intelligence.financialmodelingprep.com/images/icons/usa_flag.png)

Access comprehensive industry classification data for companies across all sectors with the FMP All Industry Classification API. Retrieve key details such as SIC codes, industry titles, and business contact information.

Endpoint:

<https://financialmodelingprep.com/stable/all-industry-classification>

Parameters:

Parameter Type Example
page number 0
limit number 100

(\*) Required

#### Response

`[ { "symbol": "0Q16.L", "name": "BANK OF AMERICA CORP /DE/", "cik": "0000070858", "sicCode": "6021", "industryTitle": "NATIONAL COMMERCIAL BANKS", "businessAddress": "['BANK OF AMERICA CORPORATE CENTER', 'CHARLOTTE NC 28255']", "phoneNumber": "7043868486" } ]`

Senate
------

[Latest Senate Financial Disclosures API](/developer/docs/stable/senate-latest)

![USA Flag](https://intelligence.financialmodelingprep.com/images/icons/usa_flag.png)

Access the latest financial disclosures from U.S. Senate members with the FMP Latest Senate Financial Disclosures API. Track recent trades, asset ownership, and transaction details for enhanced transparency in government financial activities.

Endpoint:

<https://financialmodelingprep.com/stable/senate-latest?page\=0&limit\=100>

Parameters:

Parameter Type Example
page number 0
limit number 100

(\*) Required | Maximum 250 records per request | Page maxed at 100

#### Response

`[ { "symbol": "LRN", "disclosureDate": "2025-01-31", "transactionDate": "2025-01-02", "firstName": "Markwayne", "lastName": "Mullin", "office": "Markwayne Mullin", "district": "OK", "owner": "Self", "assetDescription": "Stride Inc", "assetType": "Stock", "type": "Purchase", "amount": "$15,001 - $50,000", "comment": "", "link": "https://efdsearch.senate.gov/search/view/ptr/446c7588-5f97-42c0-8983-3ca975b91793/" } ]`

[Latest House Financial Disclosures API](/developer/docs/stable/house-latest)

![USA Flag](https://intelligence.financialmodelingprep.com/images/icons/usa_flag.png)

Access real-time financial disclosures from U.S. House members with the FMP Latest House Financial Disclosures API. Track recent trades, asset ownership, and financial holdings for enhanced visibility into political figures' financial activities.

Endpoint:

<https://financialmodelingprep.com/stable/house-latest?page\=0&limit\=100>

Parameters:

Parameter Type Example
page number 0
limit number 100

(\*) Required | Maximum 250 records per request | Page maxed at 100

#### Response

`[ { "symbol": "$VIRTUALUSD", "disclosureDate": "2025-02-03", "transactionDate": "2025-01-03", "firstName": "Michael", "lastName": "Collins", "office": "Michael Collins", "district": "GA10", "owner": "", "assetDescription": "VIRTUALS PROTOCOL", "assetType": "Cryptocurrency", "type": "Purchase", "amount": "$1,001 - $15,000", "capitalGainsOver200USD": "False", "comment": "", "link": "https://disclosures-clerk.house.gov/public_disc/ptr-pdfs/2025/20026696.pdf" } ]`

[Senate Trading Activity API](/developer/docs/stable/senate-trading)

![USA Flag](https://intelligence.financialmodelingprep.com/images/icons/usa_flag.png)

Monitor the trading activity of US Senators with the FMP Senate Trading Activity API. Access detailed information on trades made by Senators, including trade dates, assets, amounts, and potential conflicts of interest.

Endpoint:

<https://financialmodelingprep.com/stable/senate-trades?symbol\=AAPL>

Parameters:

Parameter Type Example
symbol\* string AAPL

(\*) Required

#### Response

`[ { "symbol": "AAPL", "disclosureDate": "2025-01-08", "transactionDate": "2024-12-19", "firstName": "Sheldon", "lastName": "Whitehouse", "office": "Sheldon Whitehouse", "district": "RI", "owner": "Self", "assetDescription": "Apple Inc", "assetType": "Stock", "type": "Sale (Partial)", "amount": "$15,001 - $50,000", "capitalGainsOver200USD": "False", "comment": "--", "link": "https://efdsearch.senate.gov/search/view/ptr/70c80513-d89a-4382-afa6-d80f6c1fcbf1/" } ]`

[Senate Trades By Name API](/developer/docs/stable/senate-trading-by-name)

![USA Flag](https://intelligence.financialmodelingprep.com/images/icons/usa_flag.png)

Endpoint:

<https://financialmodelingprep.com/stable/senate-trades-by-name?name\=Jerry>

Parameters:

Parameter Type Example
name\* string Jerry

(\*) Required

#### Response

`[ { "symbol": "BRK/B", "disclosureDate": "2025-01-18", "transactionDate": "2024-12-16", "firstName": "Jerry", "lastName": "Moran", "office": "Jerry Moran", "district": "KS", "owner": "Self", "assetDescription": "Berkshire Hathaway Inc", "assetType": "Stock", "type": "Purchase", "amount": "$1,001 - $15,000", "capitalGainsOver200USD": "False", "comment": "", "link": "https://efdsearch.senate.gov/search/view/ptr/e37322e3-0829-4e3c-9faf-7a4a1a957e09/" } ]`

[U.S. House Trades API](/developer/docs/stable/house-trading)

![USA Flag](https://intelligence.financialmodelingprep.com/images/icons/usa_flag.png)

Track the financial trades made by U.S. House members and their families with the FMP U.S. House Trades API. Access real-time information on stock sales, purchases, and other investment activities to gain insight into their financial decisions.

Endpoint:

<https://financialmodelingprep.com/stable/house-trades?symbol\=AAPL>

Parameters:

Parameter Type Example
symbol\* string AAPL

(\*) Required

#### Response

`[ { "symbol": "AAPL", "disclosureDate": "2025-01-20", "transactionDate": "2024-12-31", "firstName": "Nancy", "lastName": "Pelosi", "office": "Nancy Pelosi", "district": "CA11", "owner": "Spouse", "assetDescription": "Apple Inc", "assetType": "Stock", "type": "Sale", "amount": "$10,000,001 - $25,000,000", "capitalGainsOver200USD": "False", "comment": "", "link": "https://disclosures-clerk.house.gov/public_disc/ptr-pdfs/2025/20026590.pdf" } ]`

[House Trades By Name API](/developer/docs/stable/house-trading-by-name)

![USA Flag](https://intelligence.financialmodelingprep.com/images/icons/usa_flag.png)

Endpoint:

<https://financialmodelingprep.com/stable/house-trades-by-name?name\=James>

Parameters:

Parameter Type Example
name\* string James

(\*) Required

#### Response

`[ { "symbol": "LUV", "disclosureDate": "2025-01-13", "transactionDate": "2024-12-31", "firstName": "James", "lastName": "Comer", "office": "James Comer", "district": "KY01", "owner": "", "assetDescription": "Southwest Airlines Co", "assetType": "Stock", "type": "Sale", "amount": "$1,001 - $15,000", "capitalGainsOver200USD": "False", "comment": "", "link": "https://disclosures-clerk.house.gov/public_disc/ptr-pdfs/2025/20018054.pdf" } ]`

Bulk
----

[Company Profile Bulk API](/developer/docs/stable/profile-bulk)

![Globe Flag](https://intelligence.financialmodelingprep.com/images/icons/globe_flag.png)

The FMP Profile Bulk API allows users to retrieve comprehensive company profile data in bulk. Access essential information, such as company details, stock price, market cap, sector, industry, and more for multiple companies in a single request.

Endpoint:

<https://financialmodelingprep.com/stable/profile-bulk?part\=0>

Parameters:

Parameter Type Example
part\* string 0

(\*) Required

#### Response

`[ { "symbol": "AGO.WA", "price": 10.6, "marketCap": 493756480, "beta": 0.96, "lastDividend": 0, "range": "8.3-12.1", "change": -0.08, "changePercentage": -0.74906, "volume": 7929, "averageVolume": 35490, "companyName": "Agora S.A.", "currency": "PLN", "cik": null, "isin": "PLAGORA00067", "cusip": null, "exchangeFullName": "Warsaw Stock Exchange", "exchange": "WSE", "industry": "Publishing", "website": "https://www.agora.pl", "description": "Agora S.A., together with its subsidiaries, primarily publishes magazines, periodicals, and books in Poland. The company operates through five segments: Movies and Books, Press, Outdoor, Internet, and Radio. Its Movies and Books segment engages in cinema management, including film distribution, production, and gastronomic activities. The Press segment is involved in publishing of the daily and special editions of Gazeta Wyborcza magazines, as well as publishing of the periodicals and printing activities. The company's Outdoor provides advertising services on various forms of outdoor advertising panels. Its Internet segment offers Internet and multi-media products and services primarily in the Internet department and other companies. The Radio segment operates local radio stations and super-regional TOK FM news radio. This segment operates 24 Golden Hits local radio stations, 4 local radio stations under the brand Rock Radio, 8 local stations broadcasting under the brand Radio Pogoda in 23 metropolitan areas. In addition, the company operates restaurants. The company was founded in 1989 and is headquartered in Warsaw, Poland. Agora S.A. operates as a subsidiary of Agora S.A. Group.", "ceo": "Mr. Bartosz Hojka", "sector": "Communication Services", "country": "PL", "fullTimeEmployees": "2376", "phone": "48 22 555 6000", "address": "8/10 Czerska Street", "city": "Warsaw", "state": null, "zip": "00-732", "image": "https://images.financialmodelingprep.com/symbol/AGO.WA.png", "ipoDate": "2000-01-03", "defaultImage": false, "isEtf": false, "isActivelyTrading": true, "isAdr": false, "isFund": false } ]`

[Stock Rating Bulk API](/developer/docs/stable/rating-bulk)

![Globe Flag](https://intelligence.financialmodelingprep.com/images/icons/globe_flag.png)

The FMP Rating Bulk API provides users with comprehensive rating data for multiple stocks in a single request. Retrieve key financial ratings and recommendations such as overall ratings, DCF recommendations, and more for multiple companies at once.

Endpoint:

<https://financialmodelingprep.com/stable/rating-bulk>

#### Response

`[ { "symbol": "000001.SZ", "date": "2024-09-20", "rating": "B-", "ratingRecommendation": "Strong Sell", "ratingDetailsDCFRecommendation": "Strong Sell", "ratingDetailsROERecommendation": "Strong Sell", "ratingDetailsROARecommendation": "Strong Sell", "ratingDetailsDERecommendation": "Strong Sell", "ratingDetailsPERecommendation": "Strong Sell", "ratingDetailsPBRecommendation": "Strong Sell" } ]`

[DCF Valuations Bulk API](/developer/docs/stable/dcf-bulk)

![Globe Flag](https://intelligence.financialmodelingprep.com/images/icons/globe_flag.png)

The FMP DCF Bulk API enables users to quickly retrieve discounted cash flow (DCF) valuations for multiple symbols in one request. Access the implied price movement and percentage differences for all listed companies.

Endpoint:

<https://financialmodelingprep.com/stable/dcf-bulk>

#### Response

`[ { "symbol": "000004.SZ", "date": "2024-09-20", "discountedCashFlow": "-4.23043079357507", "dcfPercentDiff": "-445.118516586387" } ]`

[Financial Scores Bulk API](/developer/docs/stable/scores-bulk)

![Globe Flag](https://intelligence.financialmodelingprep.com/images/icons/globe_flag.png)

The FMP Scores Bulk API allows users to quickly retrieve a wide range of key financial scores and metrics for multiple symbols. These scores provide valuable insights into company performance, financial health, and operational efficiency.

Endpoint:

<https://financialmodelingprep.com/stable/scores-bulk>

#### Response

`[ { "symbol": "000001.SZ", "reportedCurrency": "CNY", "altmanZScore": "-0.150113561918801", "piotroskiScore": "7", "workingCapital": "-1379120000000", "totalAssets": "5761787000000", "retainedEarnings": "230986000000", "ebit": "41329000000", "marketCap": "190371879000", "totalLiabilities": "5329909000000", "revenue": "206777000000" } ]`

[Price Target Summary Bulk API](/developer/docs/stable/price-target-summary-bulk)

![Globe Flag](https://intelligence.financialmodelingprep.com/images/icons/globe_flag.png)

The Price Target Summary Bulk API provides a comprehensive overview of price targets for all listed symbols over multiple timeframes. With this API, users can quickly retrieve price target data, helping investors and analysts compare current prices to projected targets across different periods.

Endpoint:

<https://financialmodelingprep.com/stable/price-target-summary-bulk>

#### Response

`[ { "symbol": "", "lastMonth": "1.0", "lastMonthAvgPT": "130.0", "lastMonthAvgPTPercentDif": "0.0", "lastQuarter": "1.0", "lastQuarterAvgPT": "130.0", "lastQuarterAvgPTPercentDif": "0.0", "lastYear": "1.0", "lastYearAvgPT": "130.0", "lastYearAvgPTPercentDif": "0.0", "allTime": "1.0", "allTimeAvgPT": "130.0", "allTimeAvgPTPercentDif": "0.0", "publishers": "['Investing']" } ]`

[ETF Holder Bulk API](/developer/docs/stable/etf-holder-bulk)

![Globe Flag](https://intelligence.financialmodelingprep.com/images/icons/globe_flag.png)

The ETF Holder Bulk API allows users to quickly retrieve detailed information about the assets and shares held by Exchange-Traded Funds (ETFs). This API provides insights into the weight each asset carries within the ETF, along with key financial information related to these holdings.

Endpoint:

<https://financialmodelingprep.com/stable/etf-holder-bulk?part\=1>

Parameters:

Parameter Type Example
part\* string 1

(\*) Required

#### Response

`[ { "symbol": "36B7.DE", "sharesNumber": "0", "asset": "MIZUHO", "weightPercentage": "0.00722", "cusip": "", "isin": "XS2329143510", "name": "MIZUHO FINANCIAL GROUP INC MTN RegS", "marketValue": "279767.83", "updatedAt": "2024-05-23T22:17:15.667Z" } ]`

[Upgrades Downgrades Consensus Bulk API](/developer/docs/stable/upgrades-downgrades-consensus-bulk)

![Globe Flag](https://intelligence.financialmodelingprep.com/images/icons/globe_flag.png)

The Upgrades Downgrades Consensus Bulk API provides a comprehensive view of analyst ratings across all symbols. Retrieve bulk data for analyst upgrades, downgrades, and consensus recommendations to gain insights into the market's outlook on individual stocks.

Endpoint:

<https://financialmodelingprep.com/stable/upgrades-downgrades-consensus-bulk>

#### Response

`[ { "symbol": "AADI", "strongBuy": "0", "buy": "0", "hold": "4", "sell": "0", "strongSell": "0", "consensus": "Hold" } ]`

[Key Metrics TTM Bulk API](/developer/docs/stable/key-metrics-ttm-bulk)

![Globe Flag](https://intelligence.financialmodelingprep.com/images/icons/globe_flag.png)

The Key Metrics TTM Bulk API allows users to retrieve trailing twelve months (TTM) data for all companies available in the database. The API provides critical financial ratios and metrics based on each company’s latest financial report, offering insights into company performance and financial health.

Endpoint:

<https://financialmodelingprep.com/stable/key-metrics-ttm-bulk>

#### Response

`[ { "symbol": "000001.SZ", "marketCapTTM": "216376900000", "enterpriseValueTTM": "952663000000", "evToSalesTTM": "0", "evToOperatingCashFlowTTM": "0", "evToFreeCashFlowTTM": "0", "evToEBITDATTM": "2.5431703161160704e-11", "netDebtToEBITDATTM": "24.227842628620838", "currentRatioTTM": "8.486097906158145", "incomeQualityTTM": "0.7414858645627876", "grahamNumberTTM": "34.89353801732945", "grahamNetNetTTM": "-256.87627537874886", "taxBurdenTTM": "", "interestBurdenTTM": "", "workingCapitalTTM": "1031472000000", "investedCapitalTTM": "1060468000000", "returnOnAssetsTTM": "", "operatingReturnOnAssetsTTM": "", "returnOnTangibleAssetsTTM": "0.008185790231011276", "returnOnEquityTTM": "0.10249495302451576", "returnOnInvestedCapitalTTM": "0.02296268564451771", "returnOnCapitalEmployedTTM": "", "earningsYieldTTM": "0.21621993844999166", "freeCashFlowYieldTTM": "1.5918272699165206", "capexToOperatingCashFlowTTM": "0.08698350771413371", "capexToDepreciationTTM": "1.9745051995974505", "capexToRevenueTTM": "0.01586907875225796", "salesGeneralAndAdministrativeToRevenueTTM": "0.24039254805748025", "researchAndDevelopementToRevenueTTM": "0", "stockBasedCompensationToRevenueTTM": "0", "intangiblesToTotalAssetsTTM": "0.0024445849284689247", "averageReceivablesTTM": "0", "averagePayablesTTM": "5196500000", "averageInventoryTTM": "0", "daysOfSalesOutstandingTTM": "0", "daysOfPayablesOutstandingTTM": "0", "daysOfInventoryOutstandingTTM": "0", "operatingCycleTTM": "", "cashConversionCycleTTM": "", "freeCashFlowToEquityTTM": "", "freeCashFlowToFirmTTM": "", "tangibleAssetValueTTM": "421579000000", "netCurrentAssetValueTTM": "-4124556000000" } ]`

[Ratios TTM Bulk API](/developer/docs/stable/ratios-ttm-bulk)

![Globe Flag](https://intelligence.financialmodelingprep.com/images/icons/globe_flag.png)

The Ratios TTM Bulk API offers an efficient way to retrieve trailing twelve months (TTM) financial ratios for stocks. It provides users with detailed insights into a company’s profitability, liquidity, efficiency, leverage, and valuation ratios, all based on the most recent financial report.

Endpoint:

<https://financialmodelingprep.com/stable/ratios-ttm-bulk>

#### Response

`[ { "symbol": "000001.SZ", "grossProfitMarginTTM": "1", "ebitMarginTTM": "", "ebitdaMarginTTM": "", "operatingProfitMarginTTM": "0.31223747000620095", "pretaxProfitMarginTTM": "0.31207570569679977", "continuousOperationsProfitMarginTTM": "", "netProfitMarginTTM": "0.2522714405111752", "bottomLineProfitMarginTTM": "", "receivablesTurnoverTTM": "0", "payablesTurnoverTTM": "0", "inventoryTurnoverTTM": "0", "fixedAssetTurnoverTTM": "12.371914609739827", "assetTurnoverTTM": "0.03236902027054151", "currentRatioTTM": "8.486097906158145", "quickRatioTTM": "8.486097906158145", "solvencyRatioTTM": "", "cashRatioTTM": "4.7626374423921325", "priceToEarningsRatioTTM": "0.4147910655124506", "priceToEarningsGrowthRatioTTM": "0.6860298564354681", "priceToBookRatioTTM": "0.4967501176578625", "priceToSalesRatioTTM": "1.1667293143889355", "priceToFreeCashFlowTTM": "3.237188825224175e-11", "priceToOperatingCashFlowRatioTTM": "0.5735650529053614", "debtToAssetsRatioTTM": "0.2797688343522304", "debtToEquityRatioTTM": "3.6798948540468563", "debtToCapitalRatioTTM": "0.7863199855579517", "longTermDebtToCapitalRatioTTM": "0.7792599582221402", "financialLeverageRatioTTM": "13.153340909351792", "workingCapitalTurnoverRatioTTM": "", "operatingCashFlowRatioTTM": "", "operatingCashFlowSalesRatioTTM": "0.1824377881426761", "freeCashFlowOperatingCashFlowRatioTTM": "0.9130164922858663", "debtServiceCoverageRatioTTM": "", "interestCoverageRatioTTM": "0.520451910372907", "shortTermOperatingCashFlowCoverageRatioTTM": "0.5189422988435228", "operatingCashFlowCoverageRatioTTM": "0.02110789958494161", "capitalExpenditureCoverageRatioTTM": "11.496432212028543", "dividendPaidAndCapexCoverageRatioTTM": "2.969197016235191", "dividendPayoutRatioTTM": "0.18065619322432405", "dividendYieldTTM": "0.06448430493273542", "dividendYieldPercentageTTM": "6.448430493273542", "revenuePerShareTTM": "", "netIncomePerShareTTM": "", "interestDebtPerShareTTM": "", "cashPerShareTTM": "15.916314541894259", "bookValuePerShareTTM": "", "tangibleBookValuePerShareTTM": "", "shareholdersEquityPerShareTTM": "", "operatingCashFlowPerShareTTM": "1.743481397505926", "capexPerShareTTM": "", "freeCashFlowPerShareTTM": "1.5918272699165206", "netIncomePerEBTTTM": "0.808366162139747", "ebtPerEbitTTM": "0.9994819189721272", "priceToFairValueTTM": "0.04455158005900112", "debtToMarketCapTTM": "0", "effectiveTaxRateTTM": "0.19163383786025295", "enterpriseValueMultipleTTM": "0" } ]`

[Stock Peers Bulk API](/developer/docs/stable/peers-bulk)

![Globe Flag](https://intelligence.financialmodelingprep.com/images/icons/globe_flag.png)

The Stock Peers Bulk API allows you to quickly retrieve a comprehensive list of peer companies for all stocks in the database. By accessing this data, you can easily compare a stock’s performance with its closest competitors or similar companies within the same industry or sector.

Endpoint:

<https://financialmodelingprep.com/stable/peers-bulk>

#### Response

`[ { "symbol": "000001.SZ", "peers": "600036.SS,600000.SS,000002.SZ,600016.SS,601166.SS" } ]`

[Earnings Surprises Bulk API](/developer/docs/stable/earnings-surprises-bulk)

![Globe Flag](https://intelligence.financialmodelingprep.com/images/icons/globe_flag.png)

The Earnings Surprises Bulk API allows users to retrieve bulk data on annual earnings surprises, enabling quick analysis of which companies have beaten, missed, or met their earnings estimates. This API provides actual versus estimated earnings per share (EPS) for multiple companies at once, offering valuable insights for investors and analysts.

Endpoint:

<https://financialmodelingprep.com/stable/earnings-surprises-bulk?year\=YEAR>

Parameters:

Parameter Type Example
year\* string YEAR

(\*) Required

#### Response

`[ { "symbol": "CALM", "date": "2012-12-31", "epsActual": "0.3", "epsEstimated": "0.45", "lastUpdated": "2024-09-20" } ]`

[Income Statement Bulk API](/developer/docs/stable/income-statement-bulk)

![Globe Flag](https://intelligence.financialmodelingprep.com/images/icons/globe_flag.png)

The Bulk Income Statement API allows users to retrieve detailed income statement data in bulk. This API is designed for large-scale data analysis, providing comprehensive insights into a company's financial performance, including revenue, gross profit, expenses, and net income.

Endpoint:

<https://financialmodelingprep.com/stable/income-statement-bulk?year\=YEAR&period\=Q1>

Parameters:

Parameter Type Example
year\* string YEAR
period\* string Q1,Q2,Q3,Q4,FY

(\*) Required

#### Response

`[ { "date": "2023-10-31", "symbol": "0118.KL", "reportedCurrency": "MYR", "cik": "0000000000", "filingDate": "2023-10-31", "acceptedDate": "2023-10-30 20:00:00", "fiscalYear": "2024", "period": "Q1", "revenue": "840000", "costOfRevenue": "0", "grossProfit": "840000", "researchAndDevelopmentExpenses": "0", "generalAndAdministrativeExpenses": "0", "sellingAndMarketingExpenses": "0", "sellingGeneralAndAdministrativeExpenses": "0", "otherExpenses": "0", "operatingExpenses": "808000", "costAndExpenses": "808000", "netInterestIncome": "", "interestIncome": "0", "interestExpense": "2000", "depreciationAndAmortization": "0", "ebitda": "32000", "ebit": "", "nonOperatingIncomeExcludingInterest": "", "operatingIncome": "32000", "totalOtherIncomeExpensesNet": "-2000", "incomeBeforeTax": "30000", "incomeTaxExpense": "0", "netIncomeFromContinuingOperations": "", "netIncomeFromDiscontinuedOperations": "", "otherAdjustmentsToNetIncome": "", "netIncome": "30000", "netIncomeDeductions": "", "bottomLineNetIncome": "", "eps": "0", "epsDiluted": "0", "weightedAverageShsOut": "1263622000", "weightedAverageShsOutDil": "1790141000" } ]`

[Income Statement Growth Bulk API](/developer/docs/stable/income-statement-growth-bulk)

![Globe Flag](https://intelligence.financialmodelingprep.com/images/icons/globe_flag.png)

The Bulk Income Statement Growth API provides access to growth data for income statements across multiple companies. Track and analyze growth trends over time for key financial metrics such as revenue, net income, and operating income, enabling a better understanding of corporate performance trends.

Endpoint:

<https://financialmodelingprep.com/stable/income-statement-growth-bulk?year\=YEAR&period\=Q1>

Parameters:

Parameter Type Example
year\* string YEAR
period\* string Q1,Q2,Q3,Q4,FY

(\*) Required

#### Response

`[ { "symbol": "000001.SZ", "date": "2024-03-31", "fiscalYear": "2024", "period": "Q1", "reportedCurrency": "CNY", "growthRevenue": "0.7843121349772875", "growthCostOfRevenue": "0", "growthGrossProfit": "0.7843121349772875", "growthGrossProfitRatio": "0", "growthResearchAndDevelopmentExpenses": "0", "growthGeneralAndAdministrativeExpenses": "-0.135945654875321", "growthSellingAndMarketingExpenses": "0", "growthOtherExpenses": "-72.5", "growthOperatingExpenses": "-0.08301343570057582", "growthCostAndExpenses": "2.7988643634037107", "growthInterestIncome": "-0.023654458307416488", "growthInterestExpense": "0.006636694497966175", "growthDepreciationAndAmortization": "-13.448842670244884", "growthEBITDA": "-1.0034383954154729", "growthOperatingIncome": "1.126647564469914", "growthIncomeBeforeTax": "1.1232091690544412", "growthIncomeTaxExpense": "0.8860892388451443", "growthNetIncome": "1.1894428152492669", "growthEPS": "0.8857142857142859", "growthEPSDiluted": "0.8857142857142859", "growthWeightedAverageShsOut": "0.000004215312007675608", "growthWeightedAverageShsOutDil": "0.000004215312007675608" } ]`

[Balance Sheet Statement Bulk API](/developer/docs/stable/balance-sheet-statement-bulk)

![Globe Flag](https://intelligence.financialmodelingprep.com/images/icons/globe_flag.png)

The Bulk Balance Sheet Statement API provides comprehensive access to balance sheet data across multiple companies. It enables users to analyze financial positions by retrieving key figures such as total assets, liabilities, and equity. Ideal for comparing the financial health and stability of different companies on a large scale.

Endpoint:

<https://financialmodelingprep.com/stable/balance-sheet-statement-bulk?year\=YEAR&period\=Q1>

Parameters:

Parameter Type Example
year\* string YEAR
period\* string Q1,Q2,Q3,Q4,FY

(\*) Required

#### Response

`[ { "date": "2023-10-31", "symbol": "0118.KL", "reportedCurrency": "MYR", "cik": "0000000000", "filingDate": "2023-10-31", "acceptedDate": "2023-10-30 20:00:00", "fiscalYear": "2024", "period": "Q1", "cashAndCashEquivalents": "2497000", "shortTermInvestments": "15042000", "cashAndShortTermInvestments": "17539000", "netReceivables": "0", "accountsReceivables": "", "otherReceivables": "", "inventory": "0", "prepaids": "", "otherCurrentAssets": "0", "totalCurrentAssets": "28541000", "propertyPlantEquipmentNet": "310000", "goodwill": "4809000", "intangibleAssets": "0", "goodwillAndIntangibleAssets": "4809000", "longTermInvestments": "0", "taxAssets": "0", "otherNonCurrentAssets": "90500000", "totalNonCurrentAssets": "95619000", "otherAssets": "0", "totalAssets": "124160000", "totalPayables": "", "accountPayables": "922000", "otherPayables": "", "accruedExpenses": "", "shortTermDebt": "157000", "capitalLeaseObligationsCurrent": "", "taxPayables": "75000", "deferredRevenue": "0", "otherCurrentLiabilities": "1369000", "totalCurrentLiabilities": "2448000", "longTermDebt": "130000", "deferredRevenueNonCurrent": "", "deferredTaxLiabilitiesNonCurrent": "2530000", "otherNonCurrentLiabilities": "0", "totalNonCurrentLiabilities": "2660000", "otherLiabilities": "0", "capitalLeaseObligations": "287000", "totalLiabilities": "5108000", "treasuryStock": "", "preferredStock": "0", "commonStock": "180218000", "retainedEarnings": "-76984000", "additionalPaidInCapital": "", "accumulatedOtherComprehensiveIncomeLoss": "0", "otherTotalStockholdersEquity": "15818000", "totalStockholdersEquity": "119052000", "totalEquity": "119052000", "minorityInterest": "0", "totalLiabilitiesAndTotalEquity": "124160000", "totalInvestments": "15042000", "totalDebt": "287000", "netDebt": "-2210000" } ]`

[Balance Sheet Statement Growth Bulk API](/developer/docs/stable/balance-sheet-statement-growth-bulk)

![Globe Flag](https://intelligence.financialmodelingprep.com/images/icons/globe_flag.png)

The Balance Sheet Growth Bulk API allows users to retrieve growth data across multiple companies’ balance sheets, enabling detailed analysis of how financial positions have changed over time.

Endpoint:

<https://financialmodelingprep.com/stable/balance-sheet-statement-growth-bulk?year\=YEAR&period\=Q1>

Parameters:

Parameter Type Example
year\* string YEAR
period\* string Q1,Q2,Q3,Q4,FY

(\*) Required

#### Response

`[ { "symbol": "000001.SZ", "date": "2024-03-31", "fiscalYear": "2024", "period": "Q1", "reportedCurrency": "CNY", "growthCashAndCashEquivalents": "0.09617186756135085", "growthShortTermInvestments": "0", "growthCashAndShortTermInvestments": "-0.4840498657806687", "growthNetReceivables": "0", "growthInventory": "0", "growthOtherCurrentAssets": "-0.02884018006943637", "growthTotalCurrentAssets": "0.9531660561232246", "growthPropertyPlantEquipmentNet": "-0.03848620910840282", "growthGoodwill": "0", "growthIntangibleAssets": "-0.02778616732105104", "growthGoodwillAndIntangibleAssets": "-0.012966878083157152", "growthLongTermInvestments": "-0.970301643256445", "growthTaxAssets": "-0.11612040934389276", "growthOtherNonCurrentAssets": "89.65778292006623", "growthTotalNonCurrentAssets": "2.1208063750080415", "growthOtherAssets": "-1", "growthTotalAssets": "0.02546609019751872", "growthAccountPayables": "-1", "growthShortTermDebt": "-0.9536532259268395", "growthTaxPayables": "0.20831556503198295", "growthDeferredRevenue": "-1", "growthOtherCurrentLiabilities": "-0.9447454218407333", "growthTotalCurrentLiabilities": "-0.9495796136016663", "growthLongTermDebt": "0.9623722398120462", "growthDeferredRevenueNonCurrent": "-1", "growthDeferredTaxLiabilitiesNonCurrent": "-1", "growthOtherNonCurrentLiabilities": "577.4408156762785", "growthTotalNonCurrentLiabilities": "5.579948621549087", "growthOtherLiabilities": "1", "growthTotalLiabilities": "5.755785180392472", "growthPreferredStock": "0", "growthCommonStock": "0", "growthRetainedEarnings": "0.05772524914691193", "growthAccumulatedOtherComprehensiveIncomeLoss": "1.0033966552209679", "growthOthertotalStockholdersEquity": "-1", "growthTotalStockholdersEquity": "-0.0777912806354906", "growthMinorityInterest": "0", "growthTotalEquity": "-0.0777912806354906", "growthTotalLiabilitiesAndStockholdersEquity": "0.02546609019751872", "growthTotalInvestments": "-0.970301643256445", "growthTotalDebt": "1.0532020924020893", "growthNetDebt": "4.1509218707758855" } ]`

[Cash Flow Statement Bulk API](/developer/docs/stable/cash-flow-statement-bulk)

![Globe Flag](https://intelligence.financialmodelingprep.com/images/icons/globe_flag.png)

The Cash Flow Statement Bulk API provides access to detailed cash flow reports for a wide range of companies. This API enables users to retrieve bulk cash flow statement data, helping to analyze companies’ operating, investing, and financing activities over time.

Endpoint:

<https://financialmodelingprep.com/stable/cash-flow-statement-bulk?year\=YEAR&period\=Q1>

Parameters:

Parameter Type Example
year\* string YEAR
period\* string Q1,Q2,Q3,Q4,FY

(\*) Required

#### Response

`[ { "date": "2023-10-31", "symbol": "0118.KL", "reportedCurrency": "MYR", "cik": "0000000000", "filingDate": "2023-10-31", "acceptedDate": "2023-10-30 20:00:00", "fiscalYear": "2024", "period": "Q1", "netIncome": "30000", "depreciationAndAmortization": "0", "deferredIncomeTax": "0", "stockBasedCompensation": "0", "changeInWorkingCapital": "1680000", "accountsReceivables": "0", "inventory": "0", "accountsPayables": "0", "otherWorkingCapital": "0", "otherNonCashItems": "-148000", "netCashProvidedByOperatingActivities": "1562000", "investmentsInPropertyPlantAndEquipment": "-277000", "acquisitionsNet": "0", "purchasesOfInvestments": "0", "salesMaturitiesOfInvestments": "0", "otherInvestingActivities": "90000", "netCashProvidedByInvestingActivities": "-187000", "netDebtIssuance": "", "longTermNetDebtIssuance": "", "shortTermNetDebtIssuance": "", "netStockIssuance": "", "netCommonStockIssuance": "", "commonStockIssuance": "0", "commonStockRepurchased": "0", "netPreferredStockIssuance": "", "netDividendsPaid": "0", "commonDividendsPaid": "", "preferredDividendsPaid": "", "otherFinancingActivities": "0", "netCashProvidedByFinancingActivities": "211000", "effectOfForexChangesOnCash": "0", "netChangeInCash": "1586000", "cashAtEndOfPeriod": "2497000", "cashAtBeginningOfPeriod": "911000", "operatingCashFlow": "1562000", "capitalExpenditure": "-277000", "freeCashFlow": "1285000", "incomeTaxesPaid": "", "interestPaid": "" } ]`

[Cash Flow Statement Growth Bulk API](/developer/docs/stable/cash-flow-statement-growth-bulk)

![Globe Flag](https://intelligence.financialmodelingprep.com/images/icons/globe_flag.png)

The Cash Flow Statement Growth Bulk API allows you to retrieve bulk growth data for cash flow statements, enabling you to track changes in cash flows over time. This API is ideal for analyzing the cash flow growth trends of multiple companies simultaneously.

Endpoint:

<https://financialmodelingprep.com/stable/cash-flow-statement-growth-bulk?year\=YEAR&period\=Q1>

Parameters:

Parameter Type Example
year\* string YEAR
period\* string Q1,Q2,Q3,Q4,FY

(\*) Required

#### Response

`[ { "symbol": "000001.SZ", "date": "2024-03-31", "fiscalYear": "2024", "period": "Q1", "reportedCurrency": "CNY", "growthNetIncome": "1.0200879765395894", "growthDepreciationAndAmortization": "-0.10164374371016438", "growthDeferredIncomeTax": "0", "growthStockBasedCompensation": "0", "growthChangeInWorkingCapital": "1", "growthAccountsReceivables": "0", "growthInventory": "0", "growthAccountsPayables": "0", "growthOtherWorkingCapital": "1", "growthOtherNonCashItems": "-0.447009878047863", "growthNetCashProvidedByOperatingActivites": "3.153010354084111", "growthInvestmentsInPropertyPlantAndEquipment": "0.7388949079089924", "growthAcquisitionsNet": "-0.7671232876712328", "growthPurchasesOfInvestments": "0.15144028203731835", "growthSalesMaturitiesOfInvestments": "0.17813042250110972", "growthOtherInvestingActivites": "-0.1445486923240485", "growthNetCashUsedForInvestingActivites": "-0.5438290162922897", "growthDebtRepayment": "0.9984010850567615", "growthCommonStockIssued": "0", "growthCommonStockRepurchased": "0", "growthDividendsPaid": "-1.474390243902439", "growthOtherFinancingActivites": "-1.0024041427398063", "growthNetCashUsedProvidedByFinancingActivities": "-0.22515941561062233", "growthEffectOfForexChangesOnCash": "1.4690040650406504", "growthNetChangeInCash": "5.268028846153846", "growthCashAtEndOfPeriod": "0.03572207002236611", "growthCashAtBeginningOfPeriod": "-0.008300217814209468", "growthOperatingCashFlow": "3.153010354084111", "growthCapitalExpenditure": "0.7388949079089924", "growthFreeCashFlow": "3.061659560511643" } ]`

[Eod Bulk API](/developer/docs/stable/eod-bulk)

![Globe Flag](https://intelligence.financialmodelingprep.com/images/icons/globe_flag.png)

The EOD Bulk API allows users to retrieve end-of-day stock price data for multiple symbols in bulk. This API is ideal for financial analysts, traders, and investors who need to assess valuations for a large number of companies.

Endpoint:

<https://financialmodelingprep.com/stable/eod-bulk?date\=2024-10-22>

Parameters:

Parameter Type Example
date\* string 2024-10-22

(\*) Required

#### Response

`[ { "symbol": "600352.SS", "date": "2024-10-22", "open": 9.74, "low": 9.74, "high": 9.86, "close": 9.85, "adjClose": 9.85, "volume": 17604664 } ]`
