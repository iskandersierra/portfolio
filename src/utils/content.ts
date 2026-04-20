import { getCollection, type CollectionEntry } from 'astro:content';

export type BlogEntry = CollectionEntry<'blog'>;
export type ProjectEntry = CollectionEntry<'projects'>;
export type ToolEntry = ProjectEntry;

const descendingDateOrder = (left: Date, right: Date) => right.getTime() - left.getTime();
const caseInsensitiveSortOrder = (left: string, right: string) =>
	left.localeCompare(right, undefined, { sensitivity: 'accent' });

const isPublished = <T extends { data: { draft: boolean } }>(entry: T) => !entry.data.draft;

export const sortBlogEntries = (entries: BlogEntry[]) =>
	[...entries].sort((left, right) => descendingDateOrder(left.data.date, right.data.date));

export const sortProjectEntries = (entries: ProjectEntry[]) =>
	[...entries].sort((left, right) => descendingDateOrder(left.data.publishedAt, right.data.publishedAt));

export const sortToolEntries = (entries: ToolEntry[]) => sortProjectEntries(entries);

export const filterBlogPostsByTag = (entries: BlogEntry[], tag?: string | null) => {
	const normalizedTag = tag?.trim().toLocaleLowerCase();

	if (!normalizedTag) {
		return entries;
	}

	return entries.filter((entry) =>
		entry.data.tags.some((entryTag) => entryTag.trim().toLocaleLowerCase() === normalizedTag),
	);
};

export const getAllBlogTags = (entries: BlogEntry[]) => {
	const tagsByNormalizedValue = new Map<string, string>();

	for (const tag of entries.flatMap((entry) => entry.data.tags)) {
		const displayTag = tag.trim();
		const normalizedTag = displayTag.toLocaleLowerCase();

		if (!normalizedTag || tagsByNormalizedValue.has(normalizedTag)) {
			continue;
		}

		tagsByNormalizedValue.set(normalizedTag, displayTag);
	}

	return [...tagsByNormalizedValue.values()].sort(caseInsensitiveSortOrder);
};

export const getBlogPostHref = (slug: string) => `/blog/${slug}`;

export const getProjectHref = (slug: string) => `/projects/${slug}`;

export const getToolHref = (slug: string) => getProjectHref(slug);

export const getBlogTagHref = (tag?: string | null) =>
	tag ? `/blog?tag=${encodeURIComponent(tag)}` : '/blog';

const getAdjacentEntries = <T extends { id: string }>(entries: T[], slug: string) => {
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

export const getAdjacentBlogPosts = (entries: BlogEntry[], slug: string) =>
	getAdjacentEntries(entries, slug);

export const getAdjacentProjects = (entries: ProjectEntry[], slug: string) =>
	getAdjacentEntries(entries, slug);

export const getAdjacentTools = (entries: ToolEntry[], slug: string) => getAdjacentProjects(entries, slug);

export const getFeaturedBlogPostsFromEntries = (entries: BlogEntry[], limit = 3) =>
	sortBlogEntries(entries.filter((entry) => entry.data.featured)).slice(0, limit);

export const getFeaturedBlogPostFromEntries = (entries: BlogEntry[]) =>
	getFeaturedBlogPostsFromEntries(entries, 1)[0];

export const getFeaturedProjectsFromEntries = (entries: ProjectEntry[], limit = 3) =>
	sortProjectEntries(entries.filter((entry) => entry.data.featured)).slice(0, limit);

export const getFeaturedProjectFromEntries = (entries: ProjectEntry[]) =>
	getFeaturedProjectsFromEntries(entries, 1)[0];

export const getFeaturedToolFromEntries = (entries: ToolEntry[]) => getFeaturedProjectFromEntries(entries);

export const formatContentDate = (date: Date) =>
	new Intl.DateTimeFormat('en', {
		month: 'short',
		day: 'numeric',
		year: 'numeric',
		timeZone: 'UTC',
	}).format(date);

export const getPublishedBlogPosts = async () => {
	const entries = await getCollection('blog');

	return sortBlogEntries(entries.filter(isPublished));
};

export const getPublishedProjects = async () => {
	const entries = await getCollection('projects');

	return sortProjectEntries(entries.filter(isPublished));
};

export const getPublishedTools = async () => getPublishedProjects();

export const getFeaturedBlogPosts = async (limit = 3) =>
	getFeaturedBlogPostsFromEntries(await getPublishedBlogPosts(), limit);

export const getFeaturedBlogPost = async () => getFeaturedBlogPostFromEntries(await getPublishedBlogPosts());

export const getFeaturedProjects = async (limit = 3) =>
	getFeaturedProjectsFromEntries(await getPublishedProjects(), limit);

export const getFeaturedProject = async () => getFeaturedProjectFromEntries(await getPublishedProjects());

export const getFeaturedTool = async () => getFeaturedProject();
