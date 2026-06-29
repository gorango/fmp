import * as fmp from 'fmp-sdk'
import type { SecFiling } from 'fmp-sdk/types'
import fs from 'node:fs'
import path from 'node:path'

const START_YEAR = 2015
const MAX_PAGES = 100
const MAX_RETRIES = 3
const RETRY_DELAY = 1000
const OUTPUT_DIR = './seed-data'
const FORM_TYPES = new Set(['10-K', '10-Q'])

seedFilings()

async function seedFilings() {
	const stocks = await fmp.listCompanySymbols()
	const startTime = Date.now()
	fs.mkdirSync(path.resolve(OUTPUT_DIR), { recursive: true })

	for (let i = 0; i < stocks.length; i++) {
		const stock = stocks[i]
		const outFile = path.resolve(OUTPUT_DIR, `${stock.symbol}.json`)

		if (fs.existsSync(outFile)) {
			console.log(`⏭ [${i} SKIPPED]: ${stock.symbol}`)
			continue
		}

		try {
			const filings = await fetchAllFilings(stock.symbol)
			if (filings.length > 0) {
				fs.writeFileSync(outFile, JSON.stringify(filings))
			}
			console.log(`✅ [${i} DONE]: ${stock.symbol} (${filings.length} filings)`)
		} catch (error) {
			console.error(`❌ [${i} FAILED]: ${stock.symbol}`, error)
			fs.appendFileSync(path.resolve(OUTPUT_DIR, 'failed.txt'), `${stock.symbol}\n`, 'utf8')
		}

		const elapsed = Date.now() - startTime
		const avgTimePer = elapsed / (i + 1)
		const remaining = avgTimePer * (stocks.length - i - 1)
		console.log(`⏳ Remaining: ${(remaining / 1000).toFixed(1)}s`)
	}
}

async function fetchAllFilings(symbol: string) {
	const currentYear = new Date().getFullYear()
	const seenUrls = new Set<string>()
	const allFilings: SecFiling[] = []

	for (let year = START_YEAR; year <= currentYear; year++) {
		const from = `${year}-01-01`
		const to = year === currentYear ? new Date().toISOString().split('T')[0] : `${year}-12-31`

		for (let page = 0; page <= MAX_PAGES; page++) {
			const filings = await fetchFilingsRetry(symbol, from, to, page)
			if (filings.length === 0) break

			for (const filing of filings) {
				if (seenUrls.has(filing.link)) continue
				seenUrls.add(filing.link)
				if (FORM_TYPES.has(filing.formType)) {
					allFilings.push(filing)
				}
			}
		}
	}

	fs.appendFileSync(path.resolve(OUTPUT_DIR, 'done.txt'), `${symbol}\n`, 'utf8')
	return allFilings
}

async function fetchFilingsRetry(
	symbol: string,
	from: string,
	to: string,
	page: number,
	attempt = 0,
): Promise<SecFiling[]> {
	try {
		return await fmp.searchSecFilingsBySymbol({ symbol, from, to, page })
	} catch (error) {
		if (attempt < MAX_RETRIES) {
			console.log(`🔄 Retry ${symbol} pg${page} (${attempt + 1}/${MAX_RETRIES})`)
			await new Promise((resolve) => setTimeout(resolve, RETRY_DELAY * (attempt + 1)))
			return fetchFilingsRetry(symbol, from, to, page, attempt + 1)
		}
		throw error
	}
}
