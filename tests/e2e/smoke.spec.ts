import { expect, test } from '@playwright/test';

import { primaryRoutes } from './fixtures/routes';

test.describe('site shell', () => {
	test('primary navigation reaches each top-level page', async ({ page }) => {
		await page.goto('/');

		for (const route of primaryRoutes) {
			const expectedPathPattern = route.path === '/' ? '/$' : `${route.path}/?$`;
			await page.getByRole('link', { name: route.navLabel }).first().click();
			await expect(page).toHaveURL(new RegExp(expectedPathPattern));
			await expect(page.getByRole('heading', { level: 1, name: route.heading })).toBeVisible();
			await expect(page.locator('header .nav-link.active')).toHaveText(route.navLabel);
			await expect(page.locator('header .nav-link.active')).toHaveAttribute('aria-current', 'page');
		}
	});

	test('footer exposes quick links and social links on every MVP page', async ({ page }) => {
		for (const route of primaryRoutes) {
			await page.goto(route.path);

			const footer = page.locator('footer');
			await expect(footer).toBeVisible();

			for (const quickLink of primaryRoutes) {
				const footerLink = footer.getByRole('link', { name: quickLink.navLabel }).first();
				await expect(footerLink).toBeVisible();
			}

			await expect(footer.locator('.footer-link.active')).toHaveText(route.navLabel);
			await expect(footer.locator('.footer-link.active')).toHaveAttribute('aria-current', 'page');
			await expect(footer.getByRole('link', { name: 'GitHub' })).toHaveAttribute(
				'href',
				'https://github.com/iskandersierra',
			);
			await expect(footer.getByRole('link', { name: 'LinkedIn' })).toHaveAttribute(
				'href',
				'https://www.linkedin.com/in/iskandersierra/',
			);
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
