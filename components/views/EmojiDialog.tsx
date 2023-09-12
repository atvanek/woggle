'use client';

import {
	Dialog,
	DialogTitle,
	DialogContent,
	DialogContentText,
	Button,
} from '@mui/material';
import Picker from '@emoji-mart/react';
import { Dispatch, SetStateAction, useState, MouseEvent } from 'react';

type EmojiDialogProps = {
	data: JSX.Element;
	open: boolean;
	setOpen: Dispatch<SetStateAction<boolean>>;
};
import { useRouter } from 'next/navigation';

interface EmojiClickEvent extends MouseEvent {
	native: string;
	name: string;
}

function EmojiDialog({ data, open, setOpen }: EmojiDialogProps) {
	const [emoji, setEmoji] = useState('');
	const router = useRouter();
	function handleClose() {
		setEmoji('');
		setOpen(false);
	}
	return (
		<Dialog open={open} onClose={handleClose}>
			<DialogTitle>Choose your Room</DialogTitle>
			<DialogContent>
				<DialogContentText>Select an emoji to pick a room!</DialogContentText>
				<Picker
					data={data}
					onEmojiSelect={({ native }: EmojiClickEvent) => setEmoji(native)}
				/>
				<DialogContent>Room: {emoji}</DialogContent>
				<Button
					variant='contained'
					disabled={!emoji}
					onClick={() => router.push(`/room/${emoji}`)}>
					Join Room {emoji}
				</Button>
			</DialogContent>
		</Dialog>
	);
}

export default EmojiDialog;
