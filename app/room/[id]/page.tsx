'use client';

import { useParams } from 'next/navigation';
import { io } from 'socket.io-client';
import { useEffect } from 'react';

function Page() {
	const params = useParams();
	const id = params.id as string;
	const socket = io('http://localhost:8080/');
	useEffect(() => {
		socket.on('connect', () => {
			console.log('connected')
		});
		return () => {
			socket.removeAllListeners();
			socket.disconnect();
		};
	}, [socket]);
	return <p>You are in room {decodeURI(id)}</p>;
}

export default Page;
