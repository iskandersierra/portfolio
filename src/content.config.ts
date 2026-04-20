import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const blog = defineCollection({
	loader: glob({ pattern: '**/*.md', base: './src/content/blog' }),
	schema: z.object({
		title: z.string(),
		date: z.coerce.date(),
		tags: z.array(z.string()),
		excerpt: z.string(),
		readTime: z.number(),
		draft: z.boolean().default(false),
		featured: z.boolean().default(false),
		coverImage: z.string().optional(),
		projectSlug: z.string().optional(),
		series: z
			.object({
				name: z.string(),
				part: z.number(),
			})
			.optional(),
		seriesSummary: z.string().optional(),
		seriesLinks: z
			.array(
				z.object({
					part: z.number(),
					title: z.string(),
					slug: z.string(),
				}),
			)
			.optional(),
	}),
});

const projects = defineCollection({
	loader: glob({ pattern: '**/*.md', base: './src/content/projects' }),
	schema: z.object({
		title: z.string(),
		description: z.string(),
		tags: z.array(z.string()),
		type: z.enum(['tool', 'repo', 'experiment']),
		publishedAt: z.coerce.date(),
		draft: z.boolean().default(false),
		featured: z.boolean().default(false),
		status: z.enum(['active', 'archived', 'wip']).optional(),
		externalUrl: z.string().url().optional(),
		hasInteractivePage: z.boolean().default(false),
		framework: z.string().optional(),
		coverImage: z.string().optional(),
	}),
});

export const collections = {
	blog,
	projects,
};
