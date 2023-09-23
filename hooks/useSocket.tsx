'use client';

import { io, Socket } from 'socket.io-client';
import { useEffect, useState } from 'react';
import { Letters } from '@/types/gameSliceTypes';
import SERVER_URL from '@/utils/serverURL';

function useSocket(emoji: string) {
	const [error, setError] = useState(false);
	const [loading, setLoading] = useState(false);
	const [message, setMessage] = useState('Connecting to your room...');
	const [socket, setSocket] = useState<Socket | null>(null);
	const [socketId, setSocketId] = useState<string | null>(null);
	const [user, setUser] = useState<string>('guest');
	const [gameStarted, setGameStarted] = useState<boolean>(false);
	const [serverLetters, setServerLetters] = useState<Letters | null>(null);

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
			let newSocket = io(SERVER_URL);
			newSocket.on('connect', () => {
				// console.log('client connected')
				setSocketId(newSocket.id);
				setLoading(false);
				setMessage(`You are in room ${emoji}`);
				newSocket.emit('join-room', user, emoji, newSocket.id);
				setSocketId(newSocket.id);
			});
			newSocket.io.on('error', () => {
				setError(true);
				setLoading(false);
				setMessage('Error connecting to server. Please try again later.');
			});
			newSocket.on('game-start', (letters) => {
				// console.log('game-start', letters);
				setGameStarted(true);
				setServerLetters(letters);
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

	return { error, loading, message, socket, serverLetters, gameStarted };
}
export default useSocket;
