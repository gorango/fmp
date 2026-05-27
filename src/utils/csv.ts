import type { Readable } from 'node:stream'
import Papa from 'papaparse'

/**
 * A simple CSV to JSON converter.
 * Assumes the first line is headers.
 * Tries to convert numeric and boolean strings to their respective types.
 *
 * @param csvString The CSV content as a string.
 * @returns An array of objects.
 */
export function csvToJson<T extends Record<string, any>>(csvString: string): T[] {
	const result = Papa.parse<T>(csvString, {
		header: true, // Assumes first row is header
		dynamicTyping: true, // Attempts to convert numbers, booleans
		skipEmptyLines: true,
	})
	if (result.errors.length > 0) {
		console.error('CSV Parsing errors:', result.errors)
		// Decide how to handle errors: throw, return partial, return empty...
		return []
	}
	return result.data
}

/**
 * A streaming CSV to JSON converter.
 * Consumes a ReadableStream and yields parsed objects one by one.
 *
 * @param csvStream A ReadableStream containing CSV data.
 * @returns An async generator that yields parsed objects.
 */
export async function* csvStreamToJson<T extends Record<string, any>>(
	csvStream: Readable,
): AsyncGenerator<T> {
	const originalConsoleWarn = console.warn
	const knownRedundantWarning = 'Duplicate headers found'
	try {
		console.warn = (...args: any[]) => {
			if (typeof args[0] === 'string' && args[0].includes(knownRedundantWarning)) return
			originalConsoleWarn.apply(console, args)
		}

		const parserStream = Papa.parse(Papa.NODE_STREAM_INPUT, {
			header: true,
			dynamicTyping: true,
			skipEmptyLines: true,
		})
		const objectStream = csvStream.pipe(parserStream)
		for await (const row of objectStream) yield row as T
	} finally {
		console.warn = originalConsoleWarn
	}
}
