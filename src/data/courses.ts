import { getCollection } from 'astro:content';

export interface Course {
	id: string;
	title: string;
	description: string;
	thumbnail: string;
	tags: string[];
	href: string;
}

export async function getCourses(): Promise<Course[]> {
	const docs = await getCollection('docs');

	const courseFolders = docs
		.filter((entry) => {
			const parts = entry.id.split('/');

			// entry.id example: 'react-adventure', 'react-adventure/01-getting-started', 'cheatsheet/docker'
			// - parts.length === 1  means it's a top-level folder (e.g., 'react-adventure', 'n8n-adventure')
			// - parts.length === 2  means it's a nested file (e.g., 'react-adventure/01-getting-started')
			// We only want top-level folders that represent courses
			const isTopLevelFolder = parts.length === 1;

			// Only include entries that have a thumbnail defined
			// This distinguishes courses (which have thumbnails) from other sections like 'cheatsheet'
			const data = entry.data as Record<string, unknown>;
			const hasThumbnail = !!data.thumbnail;

			return isTopLevelFolder && hasThumbnail;
		})
		.map((entry) => {
			const folderName = entry.id;
			const data = entry.data as Record<string, unknown>;
			return {
				id: folderName,
				title: (data.title as string) || folderName,
				description: (data.description as string) || '',
				thumbnail: (data.thumbnail as string) || '/placeholder.png',
				tags: (data.tags as string[]) || [],
				href: `/${folderName}`,
			};
		});

	return courseFolders;
}
