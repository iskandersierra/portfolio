import { defineConfig, devices } from '@playwright/test';

// Keep Playwright on its own port so local dev servers do not leak stale route manifests into E2E runs.
const port = 4331;

export default defineConfig({
	testDir: './tests/e2e',
	testMatch: '**/*.spec.ts',
	fullyParallel: true,
	forbidOnly: !!process.env.CI,
	retries: process.env.CI ? 2 : 0,
	workers: process.env.CI ? 1 : undefined,
	reporter: 'list',
	use: {
		baseURL: `http://127.0.0.1:${port}`,
		headless: true,
		trace: 'on-first-retry',
	},
	projects: [
		{
			name: 'chromium',
			use: { ...devices['Desktop Chrome'] },
		},
		{
			name: 'firefox',
			use: { ...devices['Desktop Firefox'] },
		},
		{
			name: 'webkit',
			use: { ...devices['Desktop Safari'] },
		},
	],
	webServer: {
		command: `pnpm astro dev --host 127.0.0.1 --port ${port}`,
		url: `http://127.0.0.1:${port}`,
		reuseExistingServer: false,
		timeout: 120_000,
	},
});
