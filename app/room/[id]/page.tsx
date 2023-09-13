'use client';

import { useParams } from 'next/navigation';
import useSocketConnect from '@/hooks/useSocketConnect';

export async function generateStaticParams() {
	const params: string[] = [];

	const posts = await fetch(
		'https://cdn.jsdelivr.net/npm/@emoji-mart/data'
	).then((res) => res.json());

	for (const key in await posts.emojis) {
		params.push(key);
	}

	return params;

	// return posts.map((post) => ({
	// 	slug: post.slug,
	// }));
}

function Page() {
	const params = useParams();
	const id = params.id as string;
	const { message } = useSocketConnect(id);
	return <p>{message}</p>;
}

export default Page;
