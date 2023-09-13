'use client'

import useSocketConnect from '@/hooks/useSocketConnect';

function RoomContainer({ id }: { id: string }) {
	const { error, loading } = useSocketConnect(id);
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
			<p>Room {id}</p>
			{statusMessage}
		</>
	);
}

export default RoomContainer;
