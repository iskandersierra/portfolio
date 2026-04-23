import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const nonEmptyString = z.string().trim().min(1);
const nonEmptyTags = z.array(nonEmptyString).min(1);
const positiveInt = z.number().int().positive();

const blog = defineCollection({
	loader: glob({ pattern: '**/*.md', base: './src/content/blog' }),
	schema: z.object({
		title: nonEmptyString,
		date: z.coerce.date(),
		tags: nonEmptyTags,
		excerpt: nonEmptyString,
		readTime: positiveInt,
		draft: z.boolean().default(false),
		featured: z.boolean().default(false),
		coverImage: z.string().optional(),
		projectSlug: z.string().optional(),
		series: z
			.object({
				name: nonEmptyString,
				part: positiveInt,
			})
			.optional(),
		seriesSummary: nonEmptyString.optional(),
		seriesLinks: z
			.array(
				z.object({
					part: positiveInt,
					title: nonEmptyString,
					slug: z.string(),
				}),
			)
			.optional(),
	}),
});

const projects = defineCollection({
	loader: glob({ pattern: '**/*.md', base: './src/content/projects' }),
	schema: z.object({
		title: nonEmptyString,
		description: nonEmptyString,
		tags: nonEmptyTags,
		type: z.enum(['tool', 'repo', 'experiment']),
		publishedAt: z.coerce.date(),
		draft: z.boolean().default(false),
		featured: z.boolean().default(false),
		status: z.enum(['active', 'archived', 'wip']).optional(),
		externalUrl: z.url().optional(),
		hasInteractivePage: z.boolean().default(false),
		framework: nonEmptyString.optional(),
		coverImage: z.string().optional(),
	}),
});

export const collections = {
	blog,
	projects,
};
