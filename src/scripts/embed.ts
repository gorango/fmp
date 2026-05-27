import type { ToolDoc } from './docs'
import fs from 'node:fs'
import path from 'node:path'
import process from 'node:process'
import { createOpenAI } from '@ai-sdk/openai'
import { generateText } from 'ai'
import 'dotenv/config'

const OPENAI_KEY = process.env.OPENAI_KEY

if (!OPENAI_KEY) {
	throw new Error('Missing environment variable: OPENAI_KEY')
}

const openai = createOpenAI({ apiKey: OPENAI_KEY })

async function enrichWithKeywords(toolDoc: ToolDoc): Promise<string> {
	const prompt = `
		Given the following financial data tool:
		Name: ${toolDoc.tool_name}
		Description: ${toolDoc.description}
		Parameters: ${toolDoc.parameters_summary}
		Returnable Data Summary: ${toolDoc.return_keys_summary}

		Generate a concise list of relevant keywords, synonyms, and common use-case phrases for this tool.
		Focus on terms a user might use when searching for this functionality.
		For example:
		- a tool like 'getCompanyProfile', keywords might include 'company overview', 'stock details', 'MSFT info', 'Apple fundamentals', 'corporate profile'.
		- a tool like 'getCommodyQuote' might have keywords like 'stock prices', 'stock analysis', 'price data'.
		- tools like 'getSimpleMovingAverage', 'getRelativeStrengthIndex' might have keywords like 'technical indicators', 'technical analysis', 'charting tools', 'quantitative analysis'.

		Output ONLY a comma-separated list of these terms. Do not add any other explanatory text.
	`
		.replace(/\t/g, '')
		.trim()
	try {
		const { text } = await generateText({
			model: openai('gpt-3.5-turbo'),
			prompt,
			maxOutputTokens: 150,
			temperature: 0.3,
		})
		return text.trim()
	} catch (error) {
		console.error(`Error enriching keywords for ${toolDoc.tool_name}:`, error)
		return ''
	}
}

async function main() {
	try {
		const docsPath = path.join(process.cwd(), 'src/generated', 'docs.json')
		if (!fs.existsSync(docsPath)) {
			console.error(`${docsPath} not found. Run 'npm run generate:docs' first.`)
			return
		}
		const toolDocs: ToolDoc[] = JSON.parse(fs.readFileSync(docsPath, 'utf-8'))

		console.log(`Processing ${toolDocs.length} tool documents for embedding...`)

		const embeddingsData: Array<{ tool_name: string; contentForEmbedding: string }> = []

		await Promise.all(
			toolDocs.map(async (toolDoc) => {
				const keywordsEnriched = await enrichWithKeywords(toolDoc)

				const contentForEmbedding = `
				Tool Name: ${toolDoc.tool_name}
				Description: ${toolDoc.description}${
					toolDoc.parameters_summary === 'No parameters.'
						? ''
						: `\nParameters: ${toolDoc.parameters_summary}`
				}
				Returns: ${toolDoc.return_keys_summary}
				Keywords: ${keywordsEnriched}
			`
					.replace(/\t/g, '')
					.trim()

				/* const { embedding } = await embed({
				model: openai.embedding('text-embedding-3-small'),
				value: contentForEmbedding,
			}) */

				embeddingsData.push({
					tool_name: toolDoc.tool_name,
					contentForEmbedding,
				})

				console.log(`\nProcessing: ${toolDoc.tool_name}`)
				console.log(`Embedded: ${contentForEmbedding}`)
			}),
		)

		const embeddingsPath = path.join(process.cwd(), 'src/generated', 'embeddings.json')
		fs.writeFileSync(embeddingsPath, JSON.stringify(embeddingsData, null, 2))
		console.log(`\nAll tools processed and embeddings saved to ${embeddingsPath}.`)
	} catch (error) {
		console.error('\nError generating embeddings:', error)
	}
}

main()
