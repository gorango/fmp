#!/usr/bin/env bun
import toolDefs from 'fmp-tools'
import type { z } from 'zod'

type FmpTool = {
	description: string
	inputSchema: z.ZodType
	execute: (args: Record<string, unknown>) => Promise<unknown>
}

const tools = toolDefs as unknown as Record<string, FmpTool>
const toolNames = Object.keys(tools).toSorted()

function showHelp() {
	console.error(`Usage: fmp <tool> [args...]

Call a financial data tool and print the result as JSON.

Tools:
${toolNames.map((name) => `  ${name}`).join('\n')}

Pass arguments as a single JSON object:
  fmp searchSymbol '{"query": "AAPL"}'
  fmp companyProfile '{"symbol": "AAPL", "values": ["symbol", "companyName", "marketCap"]}'
`)
	process.exit(0)
}

async function main() {
	const args = process.argv.slice(2)

	if (args.length === 0 || args[0] === '--help' || args[0] === '-h') {
		showHelp()
	}

	if (args[0] === '--list' || args[0] === '-l') {
		console.log(JSON.stringify(toolNames, null, 2))
		process.exit(0)
	}

	const toolName = args[0]
	const tool = tools[toolName]
	if (!tool) {
		console.error(`Unknown tool: "${toolName}". Use --help to list available tools.`)
		process.exit(1)
	}

	let toolArgs: Record<string, unknown> = {}
	if (args.length > 1) {
		const jsonInput = args.slice(1).join(' ')
		try {
			toolArgs = JSON.parse(jsonInput)
		} catch {
			console.error('Error: arguments must be valid JSON')
			process.exit(1)
		}
	}

	try {
		const result = await tool.execute(toolArgs)
		console.log(JSON.stringify(result, null, 2))
		process.exit(0)
	} catch (error: any) {
		console.error(JSON.stringify({ error: error.message || 'Unexpected error' }, null, 2))
		process.exit(1)
	}
}

await main()
