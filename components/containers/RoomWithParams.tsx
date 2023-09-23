'use client';

import useSocket from '@/hooks/useSocket';
import { Button } from '@mui/material';
import Board from './Board';
import Grid from '../views/Grid';

function RoomWithParams({ emoji }: { emoji: string }) {
	const { error, loading, socket, serverLetters } = useSocket(emoji);
	let statusMessage: JSX.Element;
	if (loading) {
		statusMessage = <p>Connecting to your room...</p>;
	} else if (!error) {
		statusMessage = <p>Welcome to the multiplayer room!</p>;
	} else {
		statusMessage = <p>Error connecting to server. Please try again later.</p>;
	}

	return (
		<>
			<p>Room {decodeURIComponent(emoji)}</p>
			{statusMessage}
			<Button
				variant='contained'
				onClick={() => {
					socket?.emit('start-request', emoji);
				}}>
				Start Game
			</Button>
			{serverLetters && <Board letters={serverLetters} />}
		</>
	);
}

export default RoomWithParams;
