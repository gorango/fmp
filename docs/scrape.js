import fs from 'node:fs'
import process from 'node:process'
import puppeteer from 'puppeteer'

const URL_TO_SCRAPE = 'https://site.financialmodelingprep.com/developer/docs/stable'
const COOKIES = [
	{
		name: '__refresh___token',
		value: process.env.FMP_REFRESH_TOKEN,
		domain: '.financialmodelingprep.com',
		path: '/',
		expires: new Date().valueOf() + 1000 * 60 * 30,
		httpOnly: true,
		secure: true,
	},
]
const WRAPPER_SELECTOR = '.documentations_documentationWrapper__Rmzqr'
const DIVIDER_CLASS = 'widgets_udocDivider__cD2Kg'
const WAIT_FOR_INTERNAL_CONTENT_MS = 5000

async function main() {
	const browser = await puppeteer.launch({
		headless: false,
		args: ['--window-size=1366,768'],
	})
	const page = await browser.newPage()
	await page.setViewport({ width: 1366, height: 768 })
	console.log('Setting cookies...')
	for (const cookie of COOKIES) {
		await page.setCookie(cookie)
	}
	console.log(`Navigating to ${URL_TO_SCRAPE}...`)
	await page.goto(URL_TO_SCRAPE, { waitUntil: 'networkidle2' })
	console.log('Page loaded.')
	const allCollectedItemsHTML = []

	try {
		console.log('Identifying all target div containers...')
		const targetDivHandles = await page.evaluateHandle((wrapperSelector, dividerClass) => {
			const wrapperElement = document.querySelector(wrapperSelector)
			if (!wrapperElement) {
				console.error('[Browser] WRAPPER element not found.')
				return []
			}
			const targetDivs = []
			let foundDivider = false
			const directChildren = wrapperElement.children
			for (let i = 0; i < directChildren.length; i++) {
				const child = directChildren[i]
				if (!foundDivider) {
					if (child.classList.contains(dividerClass)) {
						foundDivider = true
					}
					continue
				}
				if (child.tagName === 'DIV') {
					targetDivs.push(child)
				}
			}
			if (!foundDivider && directChildren.length > 0 && wrapperElement.children.length > 0) {
				console.warn('[Browser] Single divider was NOT found among wrapper children. All DIV children of wrapper will be targeted (if any). This might be incorrect.')
				for (let i = 0; i < directChildren.length; i++) {
					const child = directChildren[i]
					if (child.tagName === 'DIV') {
						targetDivs.push(child)
					}
				}
			}
			return targetDivs
		}, WRAPPER_SELECTOR, DIVIDER_CLASS)

		const properties = await targetDivHandles.getProperties()
		const targetDivsArray = []
		for (const property of properties.values()) {
			const elementHandle = property.asElement()
			if (elementHandle) {
				targetDivsArray.push(elementHandle)
			}
		}
		await targetDivHandles.dispose()
		console.log(`Found ${targetDivsArray.length} target div containers to process.`)
		if (targetDivsArray.length === 0) {
			console.error('No target div containers identified after the divider. Check selectors and page structure.')
		}

		for (let i = 0; i < targetDivsArray.length; i++) {
			const targetDivHandle = targetDivsArray[i]
			console.log(`\nProcessing target div container ${i + 1}/${targetDivsArray.length}...`)
			await page.evaluate((el) => {
				if (el) {
					el.scrollIntoView({ block: 'center', behavior: 'smooth' })
				}
			}, targetDivHandle)
			await new Promise(resolve => setTimeout(resolve, WAIT_FOR_INTERNAL_CONTENT_MS))
			const itemHTML = await page.evaluate(el => el ? el.outerHTML : null, targetDivHandle)
			if (itemHTML) {
				allCollectedItemsHTML.push(itemHTML)
				console.log(`Collected HTML for div container ${i + 1}. Total collected: ${allCollectedItemsHTML.length}`)
			}
			else {
				console.warn(`Could not get HTML for div container ${i + 1}. It might have been removed or is invalid.`)
			}
			await targetDivHandle.dispose()
		}
	}
	catch (error) {
		console.error('Error during processing items:', error)
		if (error.message.includes('Node is detached')) {
			console.error('An element handle became stale. This can happen if the DOM changes rapidly.')
		}
	}

	console.log(`\n--- Collected HTML for ${allCollectedItemsHTML.length} div containers ---`)
	fs.writeFileSync('docs.html', allCollectedItemsHTML.join('\n\n<!-- ITEM SEPARATOR -->\n\n'))
	console.log('\nCollected HTML saved to docs.html')

	console.log(`Browser will close in 5 seconds...`)
	await new Promise(resolve => setTimeout(resolve, 5000))
	await browser.close()
}

main()
