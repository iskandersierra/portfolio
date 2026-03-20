import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';

const blog = defineCollection({
	type: 'content',
	schema: z.object({
		title: z.string().min(1),
		date: z.coerce.date(),
		tags: z.array(z.string().min(1)).min(1),
		excerpt: z.string().min(1),
		readTime: z.number().int().positive(),
		draft: z.boolean().default(false),
		coverImage: z.string().min(1).optional(),
	}),
});

const tools = defineCollection({
	type: 'content',
	schema: z.object({
		title: z.string().min(1),
		description: z.string().min(1),
		tags: z.array(z.string().min(1)).min(1),
		framework: z.string().min(1),
		publishedAt: z.coerce.date(),
		draft: z.boolean().default(false),
	}),
});

export const collections = {
	blog,
	tools,
};
