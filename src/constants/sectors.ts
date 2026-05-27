export const sectors = [
	'Basic Materials',
	'Communication Services',
	'Consumer Cyclical',
	'Consumer Defensive',
	'Energy',
	'Financial Services',
	'Healthcare',
	'Industrials',
	'Real Estate',
	'Technology',
	'Utilities',
] as const

export const sectorEtfs = {
	'Basic Materials': [
		{ ticker: 'XLB', focus: 'broad materials' },
		{ ticker: 'VAW', focus: 'broad materials' },
		{ ticker: 'IYM', focus: 'U.S. materials' },
		{ ticker: 'MXI', focus: 'global materials' },
	],
	'Communication Services': [
		{ ticker: 'XLC', focus: 'broad U.S.' },
		{ ticker: 'VOX', focus: 'broad U.S.' },
		{ ticker: 'FCOM', focus: 'internet & media' },
		{ ticker: 'IYZ', focus: 'U.S. telecom & comm.' },
	],
	'Consumer Cyclical': [
		{ ticker: 'XLY', focus: 'broad U.S.' },
		{ ticker: 'VCR', focus: 'broad U.S.' },
		{ ticker: 'RCD', focus: 'retail' },
		{ ticker: 'PEJ', focus: 'consumer discretionary' },
	],
	'Consumer Defensive': [
		{ ticker: 'XLP', focus: 'broad U.S.' },
		{ ticker: 'VDC', focus: 'broad U.S.' },
		{ ticker: 'KXI', focus: 'consumer staples' },
		{ ticker: 'FXG', focus: 'food & staples' },
	],
	Energy: [
		{ ticker: 'XLE', focus: 'broad energy' },
		{ ticker: 'VDE', focus: 'broad energy' },
		{ ticker: 'IXC', focus: 'global energy' },
		{ ticker: 'FENY', focus: 'clean energy & ETFs' },
	],
	'Financial Services': [
		{ ticker: 'XLF', focus: 'broad financials' },
		{ ticker: 'VFH', focus: 'broad financials' },
		{ ticker: 'KBE', focus: 'U.S. banks' },
		{ ticker: 'IYF', focus: 'U.S. financials' },
	],
	Healthcare: [
		{ ticker: 'XLV', focus: 'broad healthcare' },
		{ ticker: 'VHT', focus: 'broad healthcare' },
		{ ticker: 'IYH', focus: 'U.S. healthcare' },
		{ ticker: 'XBI', focus: 'biotech' },
	],
	Industrials: [
		{ ticker: 'XLI', focus: 'broad industrials' },
		{ ticker: 'VIS', focus: 'U.S. industrials' },
		{ ticker: 'IYJ', focus: 'U.S. industrials' },
		{ ticker: 'PPA', focus: 'industrial ETFs' },
	],
	'Real Estate': [
		{ ticker: 'XLRE', focus: 'U.S. REITs' },
		{ ticker: 'VNQ', focus: 'broad U.S. REITs' },
		{ ticker: 'IYR', focus: 'broad U.S. REITs' },
		{ ticker: 'SCHH', focus: 'U.S. REITs' },
	],
	Technology: [
		{ ticker: 'XLK', focus: 'broad U.S.' },
		{ ticker: 'VGT', focus: 'broad U.S.' },
		{ ticker: 'QQQ', focus: 'large-cap tech & NASDAQ 100' },
		{ ticker: 'SMH', focus: 'semiconductors' },
		{ ticker: 'IGV', focus: 'software & tech growth' },
	],
	Utilities: [
		{ ticker: 'XLU', focus: 'broad U.S. utilities' },
		{ ticker: 'VPU', focus: 'broad U.S. utilities' },
		{ ticker: 'IDU', focus: 'U.S. utilities' },
		{ ticker: 'FXU', focus: 'global utilities' },
	],
} as const
