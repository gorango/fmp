import { secApi } from '../utils/sec-ky.js'

export async function getSecFiling(url: string) {
	const response = await secApi.get(url)
	return response.text()
}
