import { expect, test } from '@playwright/test';

import { defaultSeo } from '../../src/utils/seo';
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
			defaultSeo.siteName,
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

		await expect(page.locator('meta[property="og:image"]')).toHaveAttribute(
			'content',
			route.socialImageUrl,
		);
		await expect(page.locator('meta[name="twitter:image"]')).toHaveAttribute(
			'content',
			route.socialImageUrl,
		);

		const socialImageAlt = route.socialImageAlt;
		const hasSocialImageAlt = socialImageAlt !== undefined;

		if (hasSocialImageAlt) {
			await expect(page.locator('meta[property="og:image:alt"]')).toHaveAttribute(
				'content',
				socialImageAlt,
			);
			await expect(page.locator('meta[name="twitter:image:alt"]')).toHaveAttribute(
				'content',
				socialImageAlt,
			);
		} else {
			await expect(page.locator('meta[property="og:image:alt"]')).toHaveCount(0);
			await expect(page.locator('meta[name="twitter:image:alt"]')).toHaveCount(0);
		}
	});
}
