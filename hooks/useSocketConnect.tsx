'use client';

import { io, Socket } from 'socket.io-client';
import { useEffect, useState } from 'react';

function useSocketConnect(id: string) {
	const WS_SERVER_URL = (
		process.env.NODE_ENV === 'production'
			? process.env.NEXT_PUBLIC_PROD_WS_SERVER
			: process.env.NEXT_PUBLIC_DEV_WS_SERVER
	) as string;

	const [error, setError] = useState(false);
	const [loading, setLoading] = useState(false);
	const [message, setMessage] = useState('Connecting to your room...');
	const [socket, setSocket] = useState<Socket | null>(null);
	const [socketId, setSocketId] = useState<string | null>(null);
	const [user, setUser] = useState<string>('guest');

	//handles loading state
	useEffect(() => {
		setLoading(true);
		return () => {
			setLoading(false);
		};
	}, []);

	//checks for ws connection & adds listeners
	useEffect(() => {
		if (!socket) {
			let newSocket = io(WS_SERVER_URL);
			newSocket.on('connect', () => {
				console.log('client connected')
				setSocketId(newSocket.id);
				setLoading(false);
				setMessage(`You are in room ${id}`);
				newSocket.emit('join-room', user, id, newSocket.id);
				setSocketId(newSocket.id);
			});
			newSocket.io.on('error', () => {
				setError(true);
				setLoading(false);
				setMessage('Error connecting to server. Please try again later.');
			});

			setSocket(newSocket);
		}
		//cleans up listeners and closes socket
		return () => {
			if (socket) {
				console.log('client disconnected');
				socket?.removeAllListeners();
				socket?.disconnect();
			}
		};
	}, [socket]);

	return { error, loading, message };
}
export default useSocketConnect;
