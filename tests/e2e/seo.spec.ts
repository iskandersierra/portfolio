import { expect, test } from '@playwright/test';

import { seoExpectations } from './fixtures/routes';

for (const route of seoExpectations) {
	test(`renders expected SEO metadata for ${route.name}`, async ({ page }) => {
		await page.goto(route.path);

		await expect(page).toHaveTitle(route.title);
		await expect(page.locator('meta[name="description"]')).toHaveAttribute(
			'content',
			route.description,
		);
		await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
			'href',
			route.canonicalUrl,
		);

		await expect(page.locator('meta[property="og:title"]')).toHaveAttribute(
			'content',
			route.title,
		);
		await expect(page.locator('meta[property="og:description"]')).toHaveAttribute(
			'content',
			route.description,
		);
		await expect(page.locator('meta[property="og:url"]')).toHaveAttribute(
			'content',
			route.canonicalUrl,
		);
		await expect(page.locator('meta[property="og:type"]')).toHaveAttribute(
			'content',
			route.pageType,
		);
		await expect(page.locator('meta[property="og:site_name"]')).toHaveAttribute(
			'content',
			'Iskander Sierra',
		);

		await expect(page.locator('meta[name="twitter:title"]')).toHaveAttribute(
			'content',
			route.title,
		);
		await expect(page.locator('meta[name="twitter:description"]')).toHaveAttribute(
			'content',
			route.description,
		);
		await expect(page.locator('meta[name="twitter:card"]')).toHaveAttribute(
			'content',
			route.twitterCard,
		);

		if (route.socialImageUrl) {
			await expect(page.locator('meta[property="og:image"]')).toHaveAttribute(
				'content',
				route.socialImageUrl,
			);
			await expect(page.locator('meta[name="twitter:image"]')).toHaveAttribute(
				'content',
				route.socialImageUrl,
			);
		} else {
			await expect(page.locator('meta[property="og:image"]')).toHaveCount(0);
			await expect(page.locator('meta[name="twitter:image"]')).toHaveCount(0);
		}
	});
}
