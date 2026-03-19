export type PageType = 'website' | 'article';

export interface SeoInput {
	title?: string;
	description?: string;
	canonicalUrl?: string;
	pageType?: PageType;
	socialImage?: string;
	socialImageAlt?: string;
}

interface SeoDefaults {
	siteName: string;
	siteUrl: string;
	defaultTitle: string;
	defaultDescription: string;
	defaultPageType: PageType;
	defaultSocialImage: string;
}

export interface ResolvedSeoMetadata {
	title: string;
	description: string;
	canonicalUrl: string;
	pageType: PageType;
	socialImageUrl: string;
	socialImageAlt?: string;
	twitterCard: 'summary' | 'summary_large_image';
	siteName: string;
}

export const defaultSeo: SeoDefaults = {
	siteName: 'Iskander Sierra',
	siteUrl: 'https://isksz.com',
	defaultTitle: 'Iskander Sierra | ~/iskander',
	defaultDescription:
		"After 25 years in software, the most valuable thing I've learned is that there's always more to learn. This site is my living proof: a place where I share what I know, experiment with new ideas, build for the joy of building, and document the journey.",
	defaultPageType: 'website',
	defaultSocialImage: '/social-card.png',
};

const ABSOLUTE_URL_PATTERN = /^https?:\/\//i;

const resolveTitle = (title?: string) => {
	if (!title) {
		return defaultSeo.defaultTitle;
	}

	return `${title} | ${defaultSeo.siteName}`;
};

const resolveSiteUrl = (site?: URL) => site ?? new URL(defaultSeo.siteUrl);

const toAbsoluteUrl = (value: string, site: URL) => {
	if (ABSOLUTE_URL_PATTERN.test(value)) {
		try {
			return new URL(value).toString();
		} catch {
			return new URL(value, site).toString();
		}
	}

	return new URL(value, site).toString();
};

export const resolveSeoMetadata = (
	input: SeoInput | undefined,
	currentUrl: URL,
	site?: URL,
): ResolvedSeoMetadata => {
	const resolvedInput = input ?? {};
	const resolvedSite = resolveSiteUrl(site);
	let normalizedPathname = currentUrl.pathname;

	if (normalizedPathname !== '/' && !normalizedPathname.endsWith('/')) {
		normalizedPathname = `${normalizedPathname}/`;
	}

	const canonicalUrl = resolvedInput.canonicalUrl
		? toAbsoluteUrl(resolvedInput.canonicalUrl, resolvedSite)
		: new URL(normalizedPathname, resolvedSite).toString();
	const socialImageUrl = toAbsoluteUrl(
		resolvedInput.socialImage ?? defaultSeo.defaultSocialImage,
		resolvedSite,
	);

	return {
		title: resolveTitle(resolvedInput.title),
		description: resolvedInput.description ?? defaultSeo.defaultDescription,
		canonicalUrl,
		pageType: resolvedInput.pageType ?? defaultSeo.defaultPageType,
		socialImageUrl,
		socialImageAlt: resolvedInput.socialImageAlt,
		twitterCard: 'summary_large_image',
		siteName: defaultSeo.siteName,
	};
};
