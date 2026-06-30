import type { Readable } from 'node:stream'
import Papa from 'papaparse'

/**
 * CSV to JSON converter.
 * Assumes the first line is headers.
 *
 * @param csvString The CSV content as a string.
 * @returns An array of objects.
 */
export function csvToJson<T extends Record<string, any>>(csvString: string): T[] {
	const result = Papa.parse<T>(csvString, {
		header: true,
		dynamicTyping: true,
		skipEmptyLines: true,
	})
	if (result.errors.length > 0) {
		console.error('CSV Parsing errors:', result.errors)
		return []
	}
	return result.data
}

/**
 * Streaming CSV to JSON converter.
 * Consumes a ReadableStream and yields parsed objects one by one.
 *
 * @param csvStream A ReadableStream containing CSV data.
 * @returns An async generator that yields parsed objects.
 */
export async function* csvStreamToJson<T extends Record<string, any>>(
	csvStream: Readable,
): AsyncGenerator<T> {
	const parserStream = Papa.parse(Papa.NODE_STREAM_INPUT, {
		header: true,
		dynamicTyping: true,
		skipEmptyLines: true,
	})
	const objectStream = csvStream.pipe(parserStream)
	for await (const row of objectStream) {
		yield row as T
	}
}
