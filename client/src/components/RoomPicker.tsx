import EmojiPicker from 'emoji-picker-react';
import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Context from '../context/context';
import {
	Dialog,
	DialogTitle,
	DialogContent,
	DialogContentText,
} from '@mui/material';

function RoomPicker() {
	const { room, setRoom } = useContext(Context)!;
	const [open, setOpen] = useState(false);
	const navigate = useNavigate();
	function handleJoinRoom() {
		navigate(`room/${room.id}/`);
	}
	return (
		<>
			<button onClick={() => setOpen(true)}>Join Room</button>
			<Dialog open={open} onClose={() => setOpen(false)}>
				<DialogTitle>Choose your Room</DialogTitle>
				<DialogContent>
					<DialogContentText>Select an emoji to pick a room!</DialogContentText>
					<EmojiPicker
						// id='emoji'
						lazyLoadEmojis={true}
						onEmojiClick={({ emoji, unified }) => {
							setRoom({ emoji, id: unified });
						}}
					/>
					<DialogContent>Room: {room.emoji}</DialogContent>
					<button onClick={handleJoinRoom}>Join Room {room.emoji}</button>
				</DialogContent>
			</Dialog>
		</>
	);
}

export default RoomPicker;
