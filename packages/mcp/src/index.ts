#!/usr/bin/env bun
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js'
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js'
import type { z } from 'zod'
import toolDefs from '@financialmodelingprep/tools'

type FmpTool = {
	description: string
	inputSchema: z.ZodType
	execute: (args: Record<string, unknown>) => Promise<unknown>
}

const tools = toolDefs as unknown as Record<string, FmpTool>

function createServer() {
	const server = new McpServer(
		{ name: 'fmp-mcp', version: '0.0.1' },
		{ capabilities: { tools: {} } },
	)

	for (const [name, toolDef] of Object.entries(tools)) {
		server.registerTool(
			name,
			{
				description: toolDef.description,
				inputSchema: toolDef.inputSchema,
			},
			async (args) => {
				try {
					const result = await toolDef.execute(args as Record<string, unknown>)
					return {
						content: [{ type: 'text', text: JSON.stringify(result) }],
					}
				} catch (error: any) {
					return {
						content: [{ type: 'text', text: error.message || 'An unexpected error occurred' }],
						isError: true,
					}
				}
			},
		)
	}

	return server
}

export async function startMCPServer() {
	const server = createServer()
	const transport = new StdioServerTransport()
	await server.connect(transport)
}

await startMCPServer()
