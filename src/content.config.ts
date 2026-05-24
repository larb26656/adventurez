import { defineCollection, z } from 'astro:content';
import { docsLoader } from '@astrojs/starlight/loaders';
import { docsSchema } from '@astrojs/starlight/schema';

export const collections = {
	docs: defineCollection({
		loader: docsLoader(),
		schema: docsSchema({
			extend: z.object({
				thumbnail: z.string().optional(),
				tags: z.array(z.string()).optional(),
				categories: z.array(z.enum(["Technology", "AI", "Design", "Data"])).min(1).optional(),
				comingSoon: z.boolean().optional(),
				color: z.string().optional(),
				level: z.string().optional(),
			}),
		}),
	}),
};
