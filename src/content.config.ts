import { defineCollection, z } from 'astro:content';
import { docsLoader } from '@astrojs/starlight/loaders';
import { docsSchema } from '@astrojs/starlight/schema';

const workaroundSchema = z.object({
	title: z.string().trim().min(1),
	description: z.string().trim().min(1),
	tags: z.array(z.string().trim().min(1)).min(1),
	publishedAt: z.string().refine((value) => {
		if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
		const date = new Date(`${value}T00:00:00Z`);
		return !Number.isNaN(date.getTime()) && date.toISOString().slice(0, 10) === value;
	}, 'must be a valid publication date (YYYY-MM-DD)'),
});

const starlightLoader = docsLoader();
const loader = {
	...starlightLoader,
	async load(context: Parameters<typeof starlightLoader.load>[0]) {
		await starlightLoader.load({
			...context,
			parseData: async (entry) => {
				if (entry.id.startsWith('workaround/')) {
					const result = workaroundSchema.safeParse(entry.data);
					if (!result.success) {
						throw new Error(`Invalid Workaround "${entry.id}": ${result.error.issues.map((issue) => `${issue.path.join('.')}: ${issue.message}`).join('; ')}`);
					}
				}
				return context.parseData(entry);
			},
		});
	},
};

export const collections = {
	docs: defineCollection({
		loader,
		schema: docsSchema({
			extend: z.object({
				thumbnail: z.string().optional(),
				tags: z.array(z.string()).optional(),
				publishedAt: z.unknown().optional(),
				categories: z.array(z.enum(["Technology", "AI", "Design", "Data"])).min(1).optional(),
				comingSoon: z.boolean().optional(),
				color: z.string().optional(),
				level: z.string().optional(),
			}),
		}),
	}),
};
