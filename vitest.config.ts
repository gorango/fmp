// vitest.config.ts
import { defineConfig } from 'vitest/config'

export default defineConfig({
	test: {
		globals: true,
		environment: 'node',
		setupFiles: ['dotenv/config'],
		testTimeout: 0,
		// configure coverage
		// coverage: {
		//   provider: 'v8',
		//   reporter: ['text', 'json', 'html'],
		// },
	},
})
