import { expect, test } from '@playwright/test';

import { primaryRoutes } from './fixtures/routes';

test.describe('site shell', () => {
	test('home featured-content cards point to the expected detail routes', async ({ page }) => {
		await page.goto('/');

		const featuredSection = page.locator('section.recent-posts');
		const featuredBlogCard = featuredSection.locator('.brutalist-card').filter({
			has: page.getByRole('heading', {
				level: 3,
				name: 'How to stay technically current after 25 years',
			}),
		});
		const featuredToolCard = featuredSection.locator('.brutalist-card').filter({
			has: page.getByRole('heading', {
				level: 3,
				name: 'UUID / ULID generator',
			}),
		});

		await expect(featuredBlogCard).toContainText('How to stay technically current after 25 years');
		await expect(featuredToolCard).toContainText('UUID / ULID generator');

		await featuredBlogCard
			.getByRole('link', { name: 'Open featured blog post How to stay technically current after 25 years' })
			.click();
		await expect(page).toHaveURL(/\/blog\/how-to-stay-technically-current-after-25-years\/?$/);
		await expect(
			page.getByRole('heading', { level: 1, name: 'How to stay technically current after 25 years' }),
		).toBeVisible();

		await page.goto('/');

		await featuredToolCard.getByRole('link', { name: 'Open featured tool UUID / ULID generator' }).click();
		await expect(page).toHaveURL(/\/tools\/uuid-ulid-generator\/?$/);
		await expect(page.getByRole('heading', { level: 1, name: 'UUID / ULID generator' })).toBeVisible();
	});

	test('published tools open on generated detail routes', async ({ page }) => {
		await page.goto('/tools');

		await page.getByRole('link', { name: 'Open UUID / ULID generator' }).click();

		await expect(page).toHaveURL(/\/tools\/uuid-ulid-generator\/?$/);
		await expect(page.getByRole('heading', { level: 1, name: 'UUID / ULID generator' })).toBeVisible();
		await expect(page.locator('.tool-post-meta')).toContainText('Published Mar 17, 2026');
		await expect(page.locator('.tool-framework-badge')).toContainText('React island');
		await expect(page.locator('.tool-tag-list')).toContainText('UUID');
		await expect(page.locator('.tool-post-body')).toContainText(
			'A focused developer utility for generating identifiers client-side without external services.',
		);
		await expect(page.getByRole('region', { name: 'Interactive tool area' })).toContainText(
			'This reserved panel will host the live browser-based tool UI when the interactive surface is implemented.',
		);
	});

	test('published blog posts open on generated article routes', async ({ page }) => {
		await page.goto('/blog');

		await page.getByRole('link', { name: 'Vertical Slice Architecture in .NET: Why I stopped fighting the folder structure' }).click();

		await expect(page).toHaveURL(/\/blog\/vertical-slice-architecture-in-dotnet\/?$/);
		await expect(
			page.getByRole('heading', {
				level: 1,
				name: 'Vertical Slice Architecture in .NET: Why I stopped fighting the folder structure',
			}),
		).toBeVisible();
		await expect(page.locator('.blog-post-meta')).toContainText('Mar 17, 2026');
		await expect(page.locator('.blog-post-meta')).toContainText('6 min read');
		await expect(page.locator('.blog-post-body')).toContainText(
			'Feature-first structure becomes easier to defend once the codebase is large enough',
		);
		await expect(page.locator('.blog-post-tags')).toContainText('.NET');
		const authorBlock = page.locator('.blog-author-block');
		await expect(authorBlock).toContainText('Iskander Sierra');
		await expect(authorBlock.getByRole('link', { name: 'GitHub' })).toHaveAttribute(
			'href',
			'https://github.com/iskandersierra',
		);
		await expect(authorBlock.getByRole('link', { name: 'LinkedIn' })).toHaveAttribute(
			'href',
			'https://www.linkedin.com/in/iskandersierra/',
		);
	});

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

		const header = page.locator('header.terminal-header');
		const headerTop = page.locator('.terminal-header-top');
		const brand = page.locator('.brand');
		const actions = page.locator('.actions');
		const menuToggle = page.locator('[data-mobile-nav-toggle]');
		const desktopNav = page.locator('.nav-links-desktop');
		const mobileNav = page.locator('#mobile-navigation');

		await expect(headerTop).toBeVisible();
		await expect(brand).toBeVisible();
		await expect(actions).toBeVisible();
		await expect(menuToggle).toBeVisible();
		await expect(menuToggle).toHaveAttribute('aria-label', 'Open navigation menu');
		await expect(desktopNav).toBeHidden();
		await expect(mobileNav).toBeHidden();

		const [headerBox, topBox, brandBox, actionsBox] = await Promise.all([
			header.boundingBox(),
			headerTop.boundingBox(),
			brand.boundingBox(),
			actions.boundingBox(),
		]);

		expect(headerBox).not.toBeNull();
		expect(topBox).not.toBeNull();
		expect(brandBox).not.toBeNull();
		expect(actionsBox).not.toBeNull();

		if (headerBox && topBox && brandBox && actionsBox) {
			expect(brandBox.y).toBeLessThan(actionsBox.y + actionsBox.height);
			expect(actionsBox.y).toBeLessThan(brandBox.y + brandBox.height);
			expect(topBox.height).toBeLessThanOrEqual(Math.max(brandBox.height, actionsBox.height) + 18);
			expect(headerBox.height).toBeLessThan(220);
		}

		await menuToggle.click();

		await expect(menuToggle).toHaveAttribute('aria-expanded', 'true');
		await expect(menuToggle).toHaveAttribute('aria-label', 'Close navigation menu');
		await expect(mobileNav).toBeVisible();

		const mobileAboutLink = mobileNav.getByRole('link', { name: 'About' });
		await expect(mobileAboutLink).toBeVisible();
		await Promise.all([
			page.waitForURL(/\/about\/?$/),
			mobileAboutLink.click(),
		]);

		await expect(page.getByRole('heading', { level: 1, name: 'About' })).toBeVisible();
		expect(await page.locator('body').getAttribute('data-mobile-nav-open')).toBeNull();
	});

	test('desktop header keeps nav centered and theme chooser flush right', async ({ page }) => {
		await page.setViewportSize({ width: 1280, height: 900 });
		await page.goto('/');

		const header = page.locator('header.terminal-header');
		const headerTop = page.locator('.terminal-header-top');
		const brand = page.locator('.brand');
		const nav = page.locator('.nav-links-desktop');
		const actions = page.locator('.actions');
		const menuToggle = page.locator('[data-mobile-nav-toggle]');

		await expect(headerTop).toBeVisible();
		await expect(nav).toBeVisible();
		await expect(actions).toBeVisible();
		await expect(menuToggle).toBeHidden();

		const [headerBox, topBox, brandBox, navBox, actionsBox, headerPaddingRight] = await Promise.all([
			header.boundingBox(),
			headerTop.boundingBox(),
			brand.boundingBox(),
			nav.boundingBox(),
			actions.boundingBox(),
			header.evaluate((element) => Number.parseFloat(getComputedStyle(element).paddingRight)),
		]);

		expect(headerBox).not.toBeNull();
		expect(topBox).not.toBeNull();
		expect(brandBox).not.toBeNull();
		expect(navBox).not.toBeNull();
		expect(actionsBox).not.toBeNull();

		if (headerBox && topBox && brandBox && navBox && actionsBox) {
			const headerCenter = headerBox.x + headerBox.width / 2;
			const navCenter = navBox.x + navBox.width / 2;
			const headerContentRight = headerBox.x + headerBox.width - headerPaddingRight;
			const actionsRight = actionsBox.x + actionsBox.width;
			const brandCenterY = brandBox.y + brandBox.height / 2;
			const navCenterY = navBox.y + navBox.height / 2;
			const actionsCenterY = actionsBox.y + actionsBox.height / 2;
			const tallestChild = Math.max(brandBox.height, navBox.height, actionsBox.height);

			expect(Math.abs(navCenter - headerCenter)).toBeLessThanOrEqual(4);
			expect(Math.abs(actionsRight - headerContentRight)).toBeLessThanOrEqual(2);
			expect(Math.abs(brandCenterY - navCenterY)).toBeLessThanOrEqual(8);
			expect(Math.abs(actionsCenterY - navCenterY)).toBeLessThanOrEqual(8);
			expect(topBox.height).toBeLessThanOrEqual(tallestChild + 12);
			expect(headerBox.height).toBeLessThan(120);
			expect(brandBox.x + brandBox.width).toBeLessThan(navBox.x);
			expect(navBox.x + navBox.width).toBeLessThan(actionsBox.x);
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

	test('theme chooser persists the selected theme', async ({ page }) => {
		await page.emulateMedia({ colorScheme: 'light' });
		await page.goto('/');

		const toggle = page.locator('#theme-toggle');
		await toggle.click();
		await expect(page.getByRole('menu', { name: 'Color theme' })).toBeVisible();
		await page.getByRole('menuitemradio', { name: 'Dark' }).click();

		await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
		await expect(page.locator('html')).toHaveAttribute('data-theme-mode', 'dark');
		await expect(toggle).toHaveAttribute('aria-label', 'Theme: Dark. Open theme menu');
		await expect(page.evaluate(() => localStorage.getItem('theme'))).resolves.toBe('dark');

		await page.reload();

		await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
		await expect(page.locator('html')).toHaveAttribute('data-theme-mode', 'dark');
		await expect(page.getByRole('button', { name: /theme: dark/i })).toBeVisible();

		await page.locator('#theme-toggle').click();
		await expect(page.getByRole('menuitemradio', { name: 'Dark' })).toHaveAttribute('aria-checked', 'true');
	});

	test('theme stays dark across header-link navigation', async ({ page }) => {
		await page.emulateMedia({ colorScheme: 'light' });
		await page.goto('/');

		const toggle = page.locator('#theme-toggle');
		const header = page.locator('header');

		const expectDarkThemeState = async () => {
			await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
			await expect(page.locator('html')).toHaveAttribute('data-theme-mode', 'dark');
			await expect(toggle).toHaveAttribute('aria-label', 'Theme: Dark. Open theme menu');
			expect(await page.evaluate(() => localStorage.getItem('theme'))).toBe('dark');
		};

		await toggle.click();
		await page.getByRole('menuitemradio', { name: 'Dark' }).click();
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
		await page.goto('/', { waitUntil: 'domcontentloaded' });

		const initialTheme = await page.evaluate(() => ({
			theme: document.documentElement.dataset['theme'],
			mode: document.documentElement.dataset['themeMode'],
		}));
		expect(initialTheme.theme).toBe('dark');
		expect(initialTheme.mode).toBe('system');

		await page.waitForLoadState('load');

		await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
		await expect(page.locator('html')).toHaveAttribute('data-theme-mode', 'system');
		await expect(page.evaluate(() => localStorage.getItem('theme'))).resolves.toBeNull();
		await expect(page.getByRole('button', { name: /theme: system/i })).toBeVisible();

		await page.locator('#theme-toggle').click();
		await expect(page.getByRole('menuitemradio', { name: 'System' })).toHaveAttribute('aria-checked', 'true');
	});

	test('theme chooser supports keyboard access and explicit system selection', async ({ page }) => {
		await page.emulateMedia({ colorScheme: 'dark' });
		await page.goto('/');

		const toggle = page.locator('#theme-toggle');

		await toggle.focus();
		await page.keyboard.press('Enter');
		await expect(page.getByRole('menu', { name: 'Color theme' })).toBeVisible();
		await expect(page.getByRole('menuitemradio', { name: 'System' })).toBeFocused();

		await page.keyboard.press('Home');
		await expect(page.getByRole('menuitemradio', { name: 'Light' })).toBeFocused();
		await page.keyboard.press('Enter');

		await expect(page.locator('html')).toHaveAttribute('data-theme', 'light');
		await expect(page.locator('html')).toHaveAttribute('data-theme-mode', 'light');
		await expect(page.evaluate(() => localStorage.getItem('theme'))).resolves.toBe('light');

		await toggle.focus();
		await page.keyboard.press('Space');
		await expect(page.getByRole('menu', { name: 'Color theme' })).toBeVisible();
		await page.keyboard.press('Escape');
		await expect(page.locator('#theme-menu')).toBeHidden();
		await expect(toggle).toBeFocused();

		await toggle.focus();
		await page.keyboard.press('ArrowDown');
		await page.keyboard.press('End');
		await expect(page.getByRole('menuitemradio', { name: 'System' })).toBeFocused();
		await page.keyboard.press('Enter');

		await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
		await expect(page.locator('html')).toHaveAttribute('data-theme-mode', 'system');
		await expect(page.evaluate(() => localStorage.getItem('theme'))).resolves.toBeNull();

		await page.emulateMedia({ colorScheme: 'light' });
		await expect(page.locator('html')).toHaveAttribute('data-theme', 'light');
	});

	test('reduced motion disables page entrance animation patterns', async ({ page }) => {
		await page.emulateMedia({ reducedMotion: 'reduce' });
		await page.goto('/');

		const heroNoLongAnimations = await page.locator('.hero').evaluate((element) => {
			return element.getAnimations().every((a) => {
				const duration = a.effect?.getTiming().duration ?? 0;
				return typeof duration === 'number' && duration <= 1;
			});
		});

		expect(heroNoLongAnimations).toBe(true);
		await expect(page.locator('.hero')).toHaveCSS('opacity', '1');
	});

	test('reduced motion disables theme color transitions', async ({ page }) => {
		await page.emulateMedia({ reducedMotion: 'reduce', colorScheme: 'light' });
		await page.goto('/');

		const getMaxTransitionMs = () =>
			page.evaluate(() => {
				const parseMaxMs = (s: string) =>
					s
						.split(',')
						.map((v) => {
							const t = v.trim();
							return Number.parseFloat(t) * (t.endsWith('ms') ? 1 : 1000);
						})
						.reduce((a, b) => Math.max(a, b), 0);

				return {
					html: parseMaxMs(getComputedStyle(document.documentElement).transitionDuration),
					body: parseMaxMs(getComputedStyle(document.body).transitionDuration),
				};
			});

		const before = await getMaxTransitionMs();
		expect(before.html).toBe(0);
		expect(before.body).toBe(0);

		await page.locator('#theme-toggle').click();
		await page.getByRole('menuitemradio', { name: 'Dark' }).click();

		await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');

		const after = await getMaxTransitionMs();
		expect(after.html).toBe(0);
		expect(after.body).toBe(0);
	});

	test('reduced motion disables cursor blink and hover lift transforms', async ({ page }) => {
		await page.emulateMedia({ reducedMotion: 'reduce' });
		await page.goto('/');

		const cursorHasLongAnimations = await page.locator('.cursor').evaluate((element) =>
			element.getAnimations().some((a) => {
				const duration = a.effect?.getTiming().duration ?? 0;
				return typeof duration === 'number' && duration > 1;
			}),
		);
		expect(cursorHasLongAnimations).toBe(false);

		const firstCard = page.locator('.brutalist-card').first();
		await expect(firstCard).toBeVisible();

		const transformBefore = await firstCard.evaluate((el) => getComputedStyle(el).transform);
		await firstCard.hover();
		const transformAfter = await firstCard.evaluate((el) => getComputedStyle(el).transform);
		expect(transformBefore).toBe(transformAfter);
	});
});
