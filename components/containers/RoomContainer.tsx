'use client'

import useSocketConnect from '@/hooks/useSocketConnect';

function RoomContainer({ emoji}: { emoji: string }) {
	const { error, loading } = useSocketConnect(emoji);
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
		</>
	);
}

export default RoomContainer;
