'use client';

import { useParams } from 'next/navigation';
import { io } from 'socket.io-client';
import { useEffect } from 'react';

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
	const WS_SERVER_URL = (
		process.env.NODE_ENV === 'production'
			? process.env.NEXT_PUBLIC_PROD_WS_SERVER
			: process.env.NEXT_PUBLIC_DEV_WS_SERVER
	) as string;
	console.log(WS_SERVER_URL);
	const params = useParams();
	const id = params.id as string;
	const socket = io(WS_SERVER_URL);
	useEffect(() => {
		socket.on('connect', () => {
			console.log('connected');
		});
		return () => {
			socket.removeAllListeners();
			socket.disconnect();
		};
	}, [socket]);
	return <p>You are in room {decodeURI(id)}</p>;
}

export default Page;
