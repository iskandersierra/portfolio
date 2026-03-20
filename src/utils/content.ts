import { getCollection, type CollectionEntry } from 'astro:content';

export type BlogEntry = CollectionEntry<'blog'>;
export type ToolEntry = CollectionEntry<'tools'>;

const descendingDateOrder = (left: Date, right: Date) => right.getTime() - left.getTime();

const isPublished = <T extends { data: { draft: boolean } }>(entry: T) => !entry.data.draft;

export const sortBlogEntries = (entries: BlogEntry[]) =>
	[...entries].sort((left, right) => descendingDateOrder(left.data.date, right.data.date));

export const sortToolEntries = (entries: ToolEntry[]) =>
	[...entries].sort((left, right) => descendingDateOrder(left.data.publishedAt, right.data.publishedAt));

export const filterBlogPostsByTag = (entries: BlogEntry[], tag?: string | null) => {
	const normalizedTag = tag?.trim().toLocaleLowerCase();

	if (!normalizedTag) {
		return entries;
	}

	return entries.filter((entry) =>
		entry.data.tags.some((entryTag) => entryTag.toLocaleLowerCase() === normalizedTag),
	);
};

export const getAllBlogTags = (entries: BlogEntry[]) => {
	const tagsByNormalizedValue = new Map<string, string>();

	for (const tag of entries.flatMap((entry) => entry.data.tags)) {
		const normalizedTag = tag.trim().toLocaleLowerCase();

		if (!normalizedTag || tagsByNormalizedValue.has(normalizedTag)) {
			continue;
		}

		tagsByNormalizedValue.set(normalizedTag, tag);
	}

	return [...tagsByNormalizedValue.values()].sort((left, right) => left.localeCompare(right));
};

export const getBlogPostHref = (slug: string) => `/blog/${slug}`;

export const getToolHref = (slug: string) => `/tools/${slug}`;

export const getBlogTagHref = (tag?: string | null) =>
	tag ? `/blog?tag=${encodeURIComponent(tag)}` : '/blog';

export const getAdjacentBlogPosts = (entries: BlogEntry[], slug: string) => {
	const currentIndex = entries.findIndex((entry) => entry.id === slug);

	if (currentIndex === -1) {
		return {
			previous: undefined,
			next: undefined,
		};
	}

	return {
		previous: entries[currentIndex + 1],
		next: entries[currentIndex - 1],
	};
};

export const getFeaturedBlogPostFromEntries = (entries: BlogEntry[]) => entries[0];

export const getFeaturedToolFromEntries = (entries: ToolEntry[]) => entries[0];

export const formatContentDate = (date: Date) =>
	new Intl.DateTimeFormat('en', {
		month: 'short',
		day: 'numeric',
		year: 'numeric',
	}).format(date);

export const getPublishedBlogPosts = async () => {
	const entries = await getCollection('blog');

	return sortBlogEntries(entries.filter(isPublished));
};

export const getPublishedTools = async () => {
	const entries = await getCollection('tools');

	return sortToolEntries(entries.filter(isPublished));
};

export const getFeaturedBlogPost = async () => getFeaturedBlogPostFromEntries(await getPublishedBlogPosts());

export const getFeaturedTool = async () => getFeaturedToolFromEntries(await getPublishedTools());
