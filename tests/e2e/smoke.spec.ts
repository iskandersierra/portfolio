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

	test('mobile navigation works at 320px width', async ({ page }) => {
		await page.setViewportSize({ width: 320, height: 720 });
		await page.goto('/');

		const menuToggle = page.locator('[data-mobile-nav-toggle]');
		const desktopNav = page.locator('.nav-links-desktop');
		const mobileNav = page.locator('#mobile-navigation');

		await expect(menuToggle).toBeVisible();
		await expect(menuToggle).toHaveAttribute('aria-label', 'Open navigation menu');
		await expect(desktopNav).toBeHidden();
		await expect(mobileNav).toBeHidden();

		await menuToggle.click();

		await expect(menuToggle).toHaveAttribute('aria-expanded', 'true');
		await expect(menuToggle).toHaveAttribute('aria-label', 'Close navigation menu');
		await expect(mobileNav).toBeVisible();

		await mobileNav.getByRole('link', { name: 'About' }).click();

		await expect(page).toHaveURL(/\/about\/?$/);
		await expect(page.getByRole('heading', { level: 1, name: 'About' })).toBeVisible();
		await expect(page.locator('body')).not.toHaveAttribute('data-mobile-nav-open', 'true');
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
		await page.emulateMedia({ colorScheme: 'light' });
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

	test('theme stays dark across header-link navigation', async ({ page }) => {
		await page.emulateMedia({ colorScheme: 'light' });
		await page.goto('/');

		const toggle = page.locator('#theme-toggle');
		const header = page.locator('header');

		const expectDarkThemeState = async () => {
			await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
			await expect(toggle).toHaveAttribute('aria-pressed', 'true');
			await expect(toggle).toHaveAttribute('aria-label', 'Switch to light theme');
			expect(await page.evaluate(() => localStorage.getItem('theme'))).toBe('dark');
		};

		await toggle.click();
		await expectDarkThemeState();

		await header.getByRole('link', { name: 'About' }).first().click();
		await expect(page).toHaveURL(/\/about\/?$/);
		await expect(page.getByRole('heading', { level: 1, name: 'About' })).toBeVisible();
		await expectDarkThemeState();

		await header.getByRole('link', { name: 'Home' }).first().click();
		await expect(page).toHaveURL(/\/$/);
		await expect(page.getByRole('heading', { level: 1, name: /never stop learning/i })).toBeVisible();
		await expectDarkThemeState();
	});

	test('theme defaults to the system preference when no selection is saved', async ({ page }) => {
		await page.emulateMedia({ colorScheme: 'dark' });
		await page.goto('/');

		await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
		await expect(page.locator('html')).toHaveAttribute('data-theme-mode', 'system');
		await expect(page.evaluate(() => localStorage.getItem('theme'))).resolves.toBeNull();
		await expect(page.getByRole('button', { name: /switch to light theme/i })).toHaveAttribute(
			'aria-pressed',
			'true',
		);
	});

	test('reduced motion disables page entrance animation patterns', async ({ page }) => {
		await page.emulateMedia({ reducedMotion: 'reduce' });
		await page.goto('/');

		const heroAnimation = await page.locator('.hero').evaluate((element) => {
			const styles = globalThis.getComputedStyle(element);

			return {
				animationName: styles.animationName,
				opacity: styles.opacity,
				transform: styles.transform,
			};
		});

		expect(heroAnimation.animationName).toBe('none');
		expect(heroAnimation.opacity).toBe('1');
		expect(heroAnimation.transform).toBe('none');
	});

	test('reduced motion disables theme color transitions', async ({ page }) => {
		await page.emulateMedia({ reducedMotion: 'reduce', colorScheme: 'light' });
		await page.goto('/');

		const getThemeTransitionStyles = () =>
			page.evaluate(() => {
				const htmlStyles = globalThis.getComputedStyle(document.documentElement);
				const bodyStyles = globalThis.getComputedStyle(document.body);

				return {
					html: {
						transitionDuration: htmlStyles.transitionDuration,
						transitionProperty: htmlStyles.transitionProperty,
					},
					body: {
						transitionDuration: bodyStyles.transitionDuration,
						transitionProperty: bodyStyles.transitionProperty,
					},
				};
			});

		expect(await getThemeTransitionStyles()).toEqual({
			html: {
				transitionDuration: '0s',
				transitionProperty: 'none',
			},
			body: {
				transitionDuration: '0s',
				transitionProperty: 'none',
			},
		});

		await page.locator('#theme-toggle').click();

		await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
		expect(await getThemeTransitionStyles()).toEqual({
			html: {
				transitionDuration: '0s',
				transitionProperty: 'none',
			},
			body: {
				transitionDuration: '0s',
				transitionProperty: 'none',
			},
		});
	});

	test('reduced motion disables cursor blink and hover lift transforms', async ({ page }) => {
		await page.emulateMedia({ reducedMotion: 'reduce' });
		await page.goto('/');

		const cursorStyles = await page.locator('.cursor').evaluate((element) => {
			const styles = globalThis.getComputedStyle(element);

			return {
				animationName: styles.animationName,
				animationDuration: styles.animationDuration,
			};
		});

		expect(cursorStyles).toEqual({
			animationName: 'none',
			animationDuration: '0s',
		});

		const firstCard = page.locator('.brutalist-card').first();
		await expect(firstCard).toBeVisible();

		const hoverMotionBeforeHover = await firstCard.evaluate((element) => {
			const styles = globalThis.getComputedStyle(element);

			return {
				transitionDuration: styles.transitionDuration,
				transitionProperty: styles.transitionProperty,
			};
		});

		expect(hoverMotionBeforeHover).toEqual({
			transitionDuration: '0s',
			transitionProperty: 'none',
		});

		await firstCard.hover();

		await expect(firstCard).toHaveCSS('transform', 'none');
	});
});
