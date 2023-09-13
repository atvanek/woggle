'use client';

import { io } from 'socket.io-client';
import { useEffect, useState } from 'react';

function useSocketConnect(id: string) {
	const [error, setError] = useState(false);
	const [loading, setLoading] = useState(false);
	const [message, setMessage] = useState('');

	const WS_SERVER_URL = (
		process.env.NODE_ENV === 'production'
			? process.env.NEXT_PUBLIC_PROD_WS_SERVER
			: process.env.NEXT_PUBLIC_DEV_WS_SERVER
	) as string;

	const socket = io(WS_SERVER_URL);
	useEffect(() => {
		setLoading(true);
		setMessage('Connecting to your room...');
		return () => {
			setLoading(false);
		};
	}, []);

	useEffect(() => {
		socket.on('connect', () => {
			console.log('connected');
			setLoading(false);
			setMessage(`You are in room ${id}`);
		});
		socket.io.on('error', () => {
			setError(true);
			setLoading(false);
			setMessage('Error connecting to server. Please try again later.');
		});
		return () => {
			socket.removeAllListeners();
			socket.disconnect();
		};
	}, [socket, id]);
	return { error, loading, message };
}
export default useSocketConnect;
