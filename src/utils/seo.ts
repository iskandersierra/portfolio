export type PageType = 'website' | 'article';

export interface SeoInput {
	title?: string;
	description?: string;
	canonicalUrl?: string;
	pageType?: PageType;
	socialImage?: string;
}

export interface ResolvedSeoMetadata {
	title: string;
	description: string;
	canonicalUrl: string;
	pageType: PageType;
	socialImageUrl?: string;
	twitterCard: 'summary' | 'summary_large_image';
	siteName: string;
}

export const defaultSeo = {
	siteName: 'Iskander Sierra',
	defaultTitle: 'Iskander Sierra | ~/iskander',
	defaultDescription:
		"After 25 years in software, the most valuable thing I've learned is that there's always more to learn. This site is my living proof: a place where I share what I know, experiment with new ideas, build for the joy of building, and document the journey.",
	defaultPageType: 'website' as const,
};

const ABSOLUTE_URL_PATTERN = /^https?:\/\//i;

const resolveTitle = (title?: string) => {
	if (!title) {
		return defaultSeo.defaultTitle;
	}

	return `${title} | ${defaultSeo.siteName}`;
};

const toAbsoluteUrl = (value: string, site: URL) =>
	ABSOLUTE_URL_PATTERN.test(value) ? new URL(value).toString() : new URL(value, site).toString();

export const resolveSeoMetadata = (
	input: SeoInput,
	currentUrl: URL,
	site: URL,
): ResolvedSeoMetadata => {
	const canonicalUrl = input.canonicalUrl
		? toAbsoluteUrl(input.canonicalUrl, site)
		: new URL(currentUrl.pathname, site).toString();
	const socialImageUrl = input.socialImage ? toAbsoluteUrl(input.socialImage, site) : undefined;

	return {
		title: resolveTitle(input.title),
		description: input.description ?? defaultSeo.defaultDescription,
		canonicalUrl,
		pageType: input.pageType ?? defaultSeo.defaultPageType,
		socialImageUrl,
		twitterCard: socialImageUrl ? 'summary_large_image' : 'summary',
		siteName: defaultSeo.siteName,
	};
};
