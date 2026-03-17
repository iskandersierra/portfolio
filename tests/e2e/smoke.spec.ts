import { expect, test } from '@playwright/test';

import { primaryRoutes } from './fixtures/routes';

test.describe('site shell', () => {
	test('primary navigation reaches each top-level page', async ({ page }) => {
		await page.goto('/');

		for (const route of primaryRoutes) {
			await page.getByRole('link', { name: route.navLabel }).click();
			await expect(page).toHaveURL(new RegExp(`${route.path === '/' ? '/$' : `${route.path}/?$`}`));
			await expect(page.getByRole('heading', { level: 1, name: route.heading })).toBeVisible();
		}
	});

	test('theme toggle persists the selected theme', async ({ page }) => {
		await page.goto('/');

		const toggle = page.locator('#theme-toggle');
		await toggle.click();

		await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
		await expect(toggle).toHaveAttribute('aria-label', 'Switch to light theme');
		await expect(page.evaluate(() => localStorage.getItem('theme'))).resolves.toBe('dark');

		await page.reload();

		await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
		await expect(page.getByRole('button', { name: /switch to light theme/i })).toHaveAttribute(
			'aria-pressed',
			'true',
		);
	});
});
