import { getCollection } from 'astro:content';

export interface Cheatsheet {
	id: string;
	title: string;
	description: string;
	thumbnail: string;
	tags: string[];
	categories: string[];
	href: string;
	color: string;
}

export async function getCheatsheets(): Promise<Cheatsheet[]> {
	const docs = await getCollection('docs');

	const cheatsheetFiles = docs
		.filter((entry) => {
			const parts = entry.id.split('/');

			// entry.id example: 'cheatsheet/docker', 'cheatsheet/docker.md'
			// parts[0] = 'cheatsheet', parts[1] = 'docker' or 'docker.md'
			const isCheatsheet = parts[0] === 'cheatsheet';

			return isCheatsheet;
		})
		.map((entry) => {
			const entryId = entry.id;
			const data = entry.data as Record<string, unknown>;
			const parts = entryId.split('/');
			const fileName = parts[1] ? parts[1].replace(/\.(mdx|md)$/, '') : '';
			const id = `cheatsheet/${fileName}`;
			return {
				id,
				title: (data.title as string) || fileName,
				description: (data.description as string) || '',
				thumbnail: '/cheatsheet-placeholder.png',
				tags: (data.tags as string[]) || [],
				categories: (data.categories as string[]) || ["Technology"],
				href: `/${id}`,
				color: (data.color as string) || '#10b981',
			};
		});

	return cheatsheetFiles.sort((a, b) => a.title.localeCompare(b.title));
}