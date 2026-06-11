interface TransformationRule {
	pattern: RegExp
	transform: (data: any) => any
	description?: string
}

/**
 * Configuration for data transformations based on API path.
 * Transformations are applied to the JSON response body.
 */
export const TRANSFORMATION_CONFIG: TransformationRule[] = [
	{
		pattern:
			/^(institutional-ownership\/(latest|extract)|sec-filings-8k|sec-filings-financials|sec-filings-search\/(form-type|symbol|cik))$/,
		description:
			'Remove `link` and rename `finalLink` to `link` for institutional ownership filings.',
		transform: (data: any) => {
			if (Array.isArray(data)) {
				return data.map((item: any) => {
					if (typeof item === 'object' && item !== null && 'link' in item && 'finalLink' in item) {
						const { link: _link, finalLink: _finalLink, ...rest } = item
						return { ...rest, link: item.finalLink }
					}
					return item
				})
			}
			return data
		},
	},
]
